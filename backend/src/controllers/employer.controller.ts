// backend/src/controllers/employer.controller.ts

import { db } from '@/config/firebase';
import { emailService } from '../services/email.service';

export const createJobController = async ({ user, body }: any) => {
  if (user.role !== 'employer') return { success: false, error: 'Unauthorized' };
  const jobData = { ...body, employerId: user.uid, postedAt: new Date(), updatedAt: new Date() };
  const jobRef = await db.collection('jobs').add(jobData);
  const job = { id: jobRef.id, ...jobData };
  return { success: true, job };
};

export const updateJobController = async ({ user, params, body }: any) => {
  if (user.role !== 'employer') return { success: false, error: 'Unauthorized' };
  const jobDoc = await db.collection('jobs').doc(params.id).get();
  if (!jobDoc.exists) return { success: false, error: 'Not found' };
  const jobData = jobDoc.data();
  if (!jobData || jobData.employerId !== user.uid) return { success: false, error: 'Not found' };
  await db.collection('jobs').doc(params.id).update({ ...body, updatedAt: new Date() });
  const updatedJob = (await db.collection('jobs').doc(params.id).get()).data();
  return { success: true, job: { id: params.id, ...updatedJob } };
};

export const deleteJobController = async ({ user, params }: any) => {
  if (user.role !== 'employer') return { success: false, error: 'Unauthorized' };
  const jobDoc = await db.collection('jobs').doc(params.id).get();
  if (!jobDoc.exists) return { success: false, error: 'Not found' };
  const jobData = jobDoc.data();
  if (!jobData || jobData.employerId !== user.uid) return { success: false, error: 'Not found' };
  await db.collection('jobs').doc(params.id).delete();
  return { success: true };
};

export const getOwnJobsController = async ({ user }: any) => {
  if (user.role !== 'employer') return { success: false, error: 'Unauthorized' };
  const snapshot = await db.collection('jobs').where('employerId', '==', user.uid).get();
  const jobs = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  return { success: true, jobs };
};

export const getJobApplicationsController = async ({ user, params }: any) => {
  if (user.role !== 'employer') return { success: false, error: 'Unauthorized' };
  const jobDoc = await db.collection('jobs').doc(params.id).get();
  if (!jobDoc.exists) return { success: false, error: 'Not found' };
  const jobData = jobDoc.data();
  if (!jobData || jobData.employerId !== user.uid) return { success: false, error: 'Not found' };
  const appsSnap = await db.collection('applications').where('jobId', '==', params.id).get();
  
  // Fetch applications with candidate details
  const applications = await Promise.all(
    appsSnap.docs.map(async (doc) => {
      const appData = doc.data();
      const candidateDoc = await db.collection('users').doc(appData.candidateId).get();
      const candidateData = candidateDoc.exists ? candidateDoc.data() : null;
      
      return {
        id: doc.id,
        ...appData,
        candidate: candidateData ? {
          id: appData.candidateId,
          firstName: candidateData.firstName,
          lastName: candidateData.lastName,
          email: candidateData.email,
          profile: candidateData.profile,
        } : null,
        job: {
          id: params.id,
          title: jobData.title,
        }
      };
    })
  );
  
  return { success: true, applications };
};

/**
 * Get all applications for employer (across all jobs)
 */
export const getAllEmployerApplicationsController = async ({ user }: any) => {
  if (user.role !== 'employer') return { success: false, error: 'Unauthorized' };
  
  // Get all jobs for this employer
  const jobsSnap = await db.collection('jobs').where('employerId', '==', user.uid).get();
  const jobIds = jobsSnap.docs.map(doc => doc.id);
  
  if (jobIds.length === 0) {
    return { success: true, applications: [] };
  }
  
  // Get all applications for these jobs
  const applicationsPromises = jobIds.map(async (jobId) => {
    const appsSnap = await db.collection('applications').where('jobId', '==', jobId).get();
    const jobDoc = jobsSnap.docs.find(doc => doc.id === jobId);
    const jobData = jobDoc?.data();
    
    return Promise.all(
      appsSnap.docs.map(async (doc) => {
        const appData = doc.data();
        const candidateDoc = await db.collection('users').doc(appData.candidateId).get();
        const candidateData = candidateDoc.exists ? candidateDoc.data() : null;
        
        return {
          id: doc.id,
          ...appData,
          candidate: candidateData ? {
            id: appData.candidateId,
            firstName: candidateData.firstName,
            lastName: candidateData.lastName,
            email: candidateData.email,
            profile: candidateData.profile,
          } : null,
          job: jobData ? {
            id: jobId,
            title: jobData.title,
          } : null
        };
      })
    );
  });
  
  const applicationsArrays = await Promise.all(applicationsPromises);
  const applications = applicationsArrays.flat();
  
  return { success: true, applications };
};

/**
 * Update application status
 */
export const updateApplicationStatusController = async ({ user, params, body }: any) => {
  if (user.role !== 'employer') return { success: false, error: 'Unauthorized' };
  
  const appDoc = await db.collection('applications').doc(params.id).get();
  if (!appDoc.exists) return { success: false, error: 'Application not found' };
  
  const appData = appDoc.data();
  
  // Verify employer owns the job
  const jobDoc = await db.collection('jobs').doc(appData?.jobId).get();
  if (!jobDoc.exists) return { success: false, error: 'Job not found' };
  
  const jobData = jobDoc.data();
  if (jobData?.employerId !== user.uid) {
    return { success: false, error: 'Unauthorized' };
  }
  
  // Update application
  await db.collection('applications').doc(params.id).update({
    ...body,
    updatedAt: new Date(),
  });
  
  // Send email notification if status changed
  if (body.status && ['reviewing', 'accepted', 'rejected'].includes(body.status)) {
    const candidateDoc = await db.collection('users').doc(appData?.candidateId).get();
    if (candidateDoc.exists) {
      const candidateData = candidateDoc.data();
      await emailService.sendApplicationStatusUpdate(
        candidateData?.email || appData?.email || '',
        candidateData?.firstName || appData?.name || 'Kandidat',
        jobData?.title || 'Position',
        body.status as 'reviewing' | 'accepted' | 'rejected'
      );
    }
  }
  
  const updatedApp = (await db.collection('applications').doc(params.id).get()).data();
  return { success: true, application: { id: params.id, ...updatedApp } };
};
