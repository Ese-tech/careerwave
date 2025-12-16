// backend/src/controllers/employer.controller.ts

import { db } from '@/config/firebase';

export const createJobController = async (ctx: any) => {
  const { user, body } = ctx;
  if (user.role !== 'employer') return { success: false, error: 'Unauthorized' };
  const jobData = { ...body, employerId: user.uid, postedAt: new Date(), updatedAt: new Date() };
  const jobRef = await db.collection('jobs').add(jobData);
  const job = { id: jobRef.id, ...jobData };
  return { success: true, job };
};

export const updateJobController = async (ctx: any) => {
  const { user, params, body } = ctx;
  if (user.role !== 'employer') return { success: false, error: 'Unauthorized' };
  const jobDoc = await db.collection('jobs').doc(params.id).get();
  if (!jobDoc.exists) return { success: false, error: 'Not found' };
  const jobData = jobDoc.data();
  if (!jobData || jobData.employerId !== user.uid) return { success: false, error: 'Not found' };
  await db.collection('jobs').doc(params.id).update({ ...body, updatedAt: new Date() });
  const updatedJob = (await db.collection('jobs').doc(params.id).get()).data();
  return { success: true, job: { id: params.id, ...updatedJob } };
};

export const deleteJobController = async (ctx: any) => {
  const { user, params } = ctx;
  if (user.role !== 'employer') return { success: false, error: 'Unauthorized' };
  const jobDoc = await db.collection('jobs').doc(params.id).get();
  if (!jobDoc.exists) return { success: false, error: 'Not found' };
  const jobData = jobDoc.data();
  if (!jobData || jobData.employerId !== user.uid) return { success: false, error: 'Not found' };
  await db.collection('jobs').doc(params.id).delete();
  return { success: true };
};

export const getOwnJobsController = async (ctx: any) => {
  const { user } = ctx;
  if (user.role !== 'employer') return { success: false, error: 'Unauthorized' };
  const snapshot = await db.collection('jobs').where('employerId', '==', user.uid).get();
  const jobs = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  return { success: true, jobs };
};

export const getJobApplicationsController = async (ctx: any) => {
  const { user, params } = ctx;
  if (user.role !== 'employer') return { success: false, error: 'Unauthorized' };
  const jobDoc = await db.collection('jobs').doc(params.id).get();
  if (!jobDoc.exists) return { success: false, error: 'Not found' };
  const jobData = jobDoc.data();
  if (!jobData || jobData.employerId !== user.uid) return { success: false, error: 'Not found' };
  const appsSnap = await db.collection('applications').where('jobId', '==', params.id).get();
  const applications = appsSnap.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  return { success: true, applications };
};
