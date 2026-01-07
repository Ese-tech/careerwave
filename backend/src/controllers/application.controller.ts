// backend/src/controllers/application.controller.ts
import { db } from '../config/firebase';
import { emailService } from '../services/email.service';
import type { CreateApplicationPayload, Application } from '../types/application';

export const createApplicationController = async ({ body }: { body: CreateApplicationPayload }) => {
  try {
    const newApp: Omit<Application, 'id' | 'createdAt'> = {
      jobId: body.jobId,
      name: body.name,
      email: body.email,
      nachricht: body.nachricht,
      telefon: body.telefon
    };
    const docRef = await db.collection('applications').add({
      ...newApp,
      createdAt: new Date(),
      status: 'applied'
    });
    
    // Get job details for email
    const jobDoc = await db.collection('jobs').doc(body.jobId).get();
    if (jobDoc.exists) {
      const jobData = jobDoc.data();
      
      // Send confirmation email to candidate
      await emailService.sendApplicationConfirmation(
        body.email,
        body.name,
        jobData?.title || 'Position',
        jobData?.company?.display_name || jobData?.arbeitgeber || 'Unternehmen'
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
      id: docRef.id
    };
  } catch (error: any) {
    return {
      success: false,
      error: error.message
    };
  }
};

export const getApplicationsByJobController = async ({ params }: { params: { jobId: string } }) => {
  try {
    const snapshot = await db.collection('applications').where('jobId', '==', params.jobId).get();
    const applications: Application[] = [];
    snapshot.forEach(doc => {
      const data = doc.data();
      applications.push({
        id: doc.id,
        jobId: data.jobId,
        name: data.name,
        email: data.email,
        nachricht: data.nachricht,
        telefon: data.telefon,
        createdAt: data.createdAt?.toDate ? data.createdAt.toDate() : new Date()
      });
    });
    return { success: true, applications };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
};
