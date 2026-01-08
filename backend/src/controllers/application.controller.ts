// backend/src/controllers/application.controller.ts
import { db } from '../config/firebase';
import { emailService } from '../services/email.service';
import type { CreateApplicationPayload, Application } from '../types/application';

// Create new application (public or authenticated)
export const createApplicationController = async ({ user, body }: any) => {
  try {
    const newApp: any = {
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
    
    const docRef = await db.collection('applications').add(newApp);
    
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
  } catch (error: any) {
    console.error('Application creation error:', error);
    return {
      success: false,
      error: error.message
    };
  }
};

// Get applications by job ID
export const getApplicationsByJobController = async ({ params }: any) => {
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
  } catch (error: any) {
    return { success: false, error: error.message };
  }
};

// Get all applications for logged-in candidate
export const getCandidateApplicationsController = async ({ user }: any) => {
  try {
    if (!user) {
      return { success: false, error: 'Authentication required' };
    }

    const snapshot = await db.collection('applications')
      .where('candidateId', '==', user.uid)
      .get();
    
    const applications: any[] = [];
    
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
            company: jobDoc.data()?.company,
            location: jobDoc.data()?.location
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
        updatedAt: data.updatedAt?.toDate ? data.updatedAt.toDate() : new Date(),
        job: jobData
      });
    }
    
    return { success: true, applications };
  } catch (error: any) {
    console.error('Get candidate applications error:', error);
    return { success: false, error: error.message };
  }
};

// Update application (for candidates to update their own applications)
export const updateApplicationController = async ({ user, params, body }: any) => {
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
    let updateData: any = { updatedAt: new Date() };
    
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
  } catch (error: any) {
    console.error('Update application error:', error);
    return { success: false, error: error.message };
  }
};

// Delete application
export const deleteApplicationController = async ({ user, params }: any) => {
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
  } catch (error: any) {
    console.error('Delete application error:', error);
    return { success: false, error: error.message };
  }
};

// Get all applications (Admin only)
export const getAllApplicationsController = async ({ user }: any) => {
  try {
    if (user.role !== 'admin') {
      return { success: false, error: 'Unauthorized' };
    }
    
    const snapshot = await db.collection('applications').get();
    const applications: any[] = [];
    
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
        ...data,
        createdAt: data.createdAt?.toDate ? data.createdAt.toDate() : new Date(),
        updatedAt: data.updatedAt?.toDate ? data.updatedAt.toDate() : new Date(),
        job: jobData
      });
    }
    
    return { success: true, applications };
  } catch (error: any) {
    console.error('Get all applications error:', error);
    return { success: false, error: error.message };
  }
};
