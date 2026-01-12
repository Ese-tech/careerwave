// backend/src/controllers/application.controller.ts
import { db } from '../config/firebase';
import { emailService } from '../services/email.service';
import type { CreateApplicationPayload, Application } from '../types/application';
import type { AuthenticatedUser } from '@/middleware/auth.middleware';

interface ApplicationBody {
  jobId: string;
  name: string;
  email: string;
  nachricht: string;
  telefon?: string;
  resumeUrl?: string;
}

interface UpdateApplicationBody {
  name?: string;
  email?: string;
  telefon?: string;
  nachricht?: string;
  resumeUrl?: string;
  status?: 'applied' | 'reviewing' | 'accepted' | 'rejected';
}

// Create new application (public or authenticated)
export const createApplicationController = async ({ user, body }: { user?: AuthenticatedUser; body: ApplicationBody }) => {
  try {
    console.log('📝 Creating application:', {
      userId: user?.uid,
      jobId: body.jobId,
      email: body.email
    });

    const newApp = {
      jobId: body.jobId,
      candidateId: user?.uid || null, // Optional: user ID if logged in
      name: body.name,
      email: body.email,
      nachricht: body.nachricht,
      telefon: body.telefon || '',
      resumeUrl: body.resumeUrl || '',
      status: 'applied',
      createdAt: new Date(),
      updatedAt: new Date()
    };
    
    console.log('💾 Saving application to database:', newApp);
    
    const docRef = await db.collection('applications').add(newApp);
    
    console.log('✅ Application saved with ID:', docRef.id);
    
    // Get job details for email
    const jobDoc = await db.collection('jobs').doc(body.jobId).get();
    if (jobDoc.exists) {
      const jobData = jobDoc.data();
      
      // Send confirmation email to candidate
      await emailService.sendApplicationConfirmation(
        body.email,
        body.name,
        jobData?.title || 'Position',
        jobData?.company?.display_name || jobData?.arbeitgeber || jobData?.company || 'Unternehmen'
      );
      
      // Send notification to employer
      if (jobData?.employerId) {
        const employerDoc = await db.collection('users').doc(jobData.employerId).get();
        if (employerDoc.exists) {
          const employerData = employerDoc.data();
          await emailService.sendNewApplicationNotification(
            employerData?.email || '',
            employerData?.firstName || 'Arbeitgeber',
            body.name,
            jobData?.title || 'Position'
          );
        }
      }
    }
    
    return {
      success: true,
      application: { id: docRef.id, ...newApp }
    };
  } catch (error) {
    console.error('Application creation error:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error'
    };
  }
};

// Get applications by job ID
export const getApplicationsByJobController = async ({ params }: { params: { jobId: string } }) => {
  try {
    const snapshot = await db.collection('applications').where('jobId', '==', params.jobId).get();
    const applications: Application[] = [];
    snapshot.forEach(doc => {
      const data = doc.data();
      applications.push({
        id: doc.id,
        jobId: data.jobId,
        candidateId: data.candidateId,
        name: data.name,
        email: data.email,
        nachricht: data.nachricht,
        telefon: data.telefon,
        resumeUrl: data.resumeUrl,
        status: data.status || 'applied',
        createdAt: data.createdAt?.toDate ? data.createdAt.toDate() : new Date(),
        updatedAt: data.updatedAt?.toDate ? data.updatedAt.toDate() : new Date()
      });
    });
    return { success: true, applications };
  } catch (error) {
    return { success: false, error: error instanceof Error ? error.message : 'Unknown error' };
  }
};

// Get all applications for logged-in candidate
export const getCandidateApplicationsController = async ({ user }: { user: AuthenticatedUser }) => {
  try {
    if (!user) {
      return { success: false, error: 'Authentication required' };
    }

    console.log('📋 Fetching applications for user:', user.uid);

    const snapshot = await db.collection('applications')
      .where('candidateId', '==', user.uid)
      .get();
    
    console.log('📋 Found applications:', snapshot.size);
    
    const applications: Application[] = [];
    
    for (const doc of snapshot.docs) {
      const data = doc.data();
      
      // Get job details if exists in our database
      let jobData = null;
      if (data.jobId) {
        const jobDoc = await db.collection('jobs').doc(data.jobId).get();
        if (jobDoc.exists) {
          jobData = {
            id: data.jobId,
            title: jobDoc.data()?.title,
            company: jobDoc.data()?.company,
            location: jobDoc.data()?.location
          };
        } else {
          // External job (e.g., from Arbeitsagentur) - use placeholder
          jobData = {
            id: data.jobId,
            title: 'Externe Stellenanzeige',
            company: 'Unternehmen',
            location: 'Standort'
          };
        }
      }
      
      applications.push({
        id: doc.id,
        jobId: data.jobId,
        candidateId: data.candidateId,
        name: data.name,
        email: data.email,
        nachricht: data.nachricht,
        telefon: data.telefon,
        resumeUrl: data.resumeUrl,
        status: data.status || 'applied',
        createdAt: data.createdAt?.toDate ? data.createdAt.toDate() : new Date(),
        updatedAt: data.updatedAt?.toDate ? data.updatedAt.toDate() : new Date()
      });
    }
    
    return { success: true, applications };
  } catch (error) {
    console.error('Get candidate applications error:', error);
    return { success: false, error: error instanceof Error ? error.message : 'Unknown error' };
  }
};

// Update application (for candidates to update their own applications)
export const updateApplicationController = async ({ user, params, body }: { user: AuthenticatedUser; params: { id: string }; body: UpdateApplicationBody }) => {
  try {
    const appDoc = await db.collection('applications').doc(params.id).get();
    
    if (!appDoc.exists) {
      return { success: false, error: 'Application not found' };
    }
    
    const appData = appDoc.data();
    
    // Check permissions
    const isCandidate = user.role === 'candidate' && appData?.candidateId === user.uid;
    const isEmployer = user.role === 'employer'; // Employer can update status
    const isAdmin = user.role === 'admin';
    
    if (!isCandidate && !isEmployer && !isAdmin) {
      return { success: false, error: 'Unauthorized' };
    }
    
    // Candidates can only update certain fields
    let updateData: Partial<UpdateApplicationBody> & { updatedAt: Date } = { updatedAt: new Date() };
    
    if (isCandidate) {
      // Candidates can update their info but not status
      if (body.name) updateData.name = body.name;
      if (body.email) updateData.email = body.email;
      if (body.telefon) updateData.telefon = body.telefon;
      if (body.nachricht) updateData.nachricht = body.nachricht;
      if (body.resumeUrl) updateData.resumeUrl = body.resumeUrl;
    } else {
      // Employer/Admin can update everything including status
      updateData = { ...body, updatedAt: new Date() };
    }
    
    await db.collection('applications').doc(params.id).update(updateData);
    
    const updatedDoc = await db.collection('applications').doc(params.id).get();
    
    return { 
      success: true, 
      application: { id: params.id, ...updatedDoc.data() } 
    };
  } catch (error) {
    console.error('Update application error:', error);
    return { success: false, error: error instanceof Error ? error.message : 'Unknown error' };
  }
};

// Delete application
export const deleteApplicationController = async ({ user, params }: { user: AuthenticatedUser; params: { id: string } }) => {
  try {
    const appDoc = await db.collection('applications').doc(params.id).get();
    
    if (!appDoc.exists) {
      return { success: false, error: 'Application not found' };
    }
    
    const appData = appDoc.data();
    
    // Check permissions
    const isCandidate = user.role === 'candidate' && appData?.candidateId === user.uid;
    const isEmployer = user.role === 'employer';
    const isAdmin = user.role === 'admin';
    
    if (!isCandidate && !isEmployer && !isAdmin) {
      return { success: false, error: 'Unauthorized' };
    }
    
    await db.collection('applications').doc(params.id).delete();
    
    return { success: true, message: 'Application deleted' };
  } catch (error) {
    console.error('Delete application error:', error);
    return { success: false, error: error instanceof Error ? error.message : 'Unknown error' };
  }
};

// Get all applications (Admin only)
export const getAllApplicationsController = async ({ user }: { user: AuthenticatedUser }) => {
  try {
    if (user.role !== 'admin') {
      return { success: false, error: 'Unauthorized' };
    }
    
    const snapshot = await db.collection('applications').get();
    const applications: Application[] = [];
    
    for (const doc of snapshot.docs) {
      const data = doc.data();
      
      // Get job details
      let jobData = null;
      if (data.jobId) {
        const jobDoc = await db.collection('jobs').doc(data.jobId).get();
        if (jobDoc.exists) {
          jobData = {
            id: data.jobId,
            title: jobDoc.data()?.title,
            company: jobDoc.data()?.company
          };
        }
      }
      
      applications.push({
        id: doc.id,
        jobId: data.jobId,
        candidateId: data.candidateId || null,
        name: data.name,
        email: data.email,
        nachricht: data.nachricht,
        telefon: data.telefon,
        resumeUrl: data.resumeUrl,
        status: data.status || 'applied',
        createdAt: data.createdAt?.toDate ? data.createdAt.toDate() : new Date(),
        updatedAt: data.updatedAt?.toDate ? data.updatedAt.toDate() : new Date()
      });
    }
    
    return { success: true, applications };
  } catch (error) {
    console.error('Get all applications error:', error);
    return { success: false, error: error instanceof Error ? error.message : 'Unknown error' };
  }
};
