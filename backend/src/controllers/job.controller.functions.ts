// backend/src/controllers/job.controller.functions.ts
import { db } from '../config/firebase';
import { JobResponseSchema } from '../models/job.model';
import type { Job } from '../types/job';

export const getJobsController = async () => {
  try {
    const snapshot = await db.collection('jobs').where('status', '==', 'published').get();
    const jobs: Job[] = [];
    
    snapshot.forEach(doc => {
      const data = doc.data();
      jobs.push({
        id: doc.id,
        ...data,
        postedAt: data.postedAt?.toDate() || new Date(),
        updatedAt: data.updatedAt?.toDate() || new Date()
      } as Job);
    });

    return { success: true, jobs };
  } catch (error) {
    throw new Error('Fehler beim Laden der Jobs');
  }
};

export const getJobByIdController = async ({ params }: { params: { id: string } }) => {
  try {
    const doc = await db.collection('jobs').doc(params.id).get();
    
    if (!doc.exists) {
      throw new Error('Job nicht gefunden');
    }

    const data = doc.data()!;
    const job: Job = {
      id: doc.id,
      ...data,
      postedAt: data.postedAt?.toDate() || new Date(),
      updatedAt: data.updatedAt?.toDate() || new Date()
    } as Job;

    return { success: true, job };
  } catch (error) {
    throw new Error('Job nicht gefunden');
  }
};

export const createJobController = async ({ body, user }: { body: any, user: any }) => {
  try {
    if (user.role !== 'employer' && user.role !== 'admin') {
      throw new Error('Keine Berechtigung zum Erstellen von Jobs');
    }

    const jobData = {
      ...body,
      employerId: user.uid,
      status: 'draft',
      postedAt: new Date(),
      updatedAt: new Date()
    };

    const docRef = await db.collection('jobs').add(jobData);
    
    return { 
      success: true, 
      message: 'Job erfolgreich erstellt',
      jobId: docRef.id 
    };
  } catch (error) {
    throw new Error(error instanceof Error ? error.message : 'Fehler beim Erstellen des Jobs');
  }
};

export const updateJobController = async ({ params, body, user }: { params: { id: string }, body: any, user: any }) => {
  try {
    const doc = await db.collection('jobs').doc(params.id).get();
    
    if (!doc.exists) {
      throw new Error('Job nicht gefunden');
    }

    const jobData = doc.data()!;
    if (jobData.employerId !== user.uid && user.role !== 'admin') {
      throw new Error('Keine Berechtigung zum Bearbeiten dieses Jobs');
    }

    await db.collection('jobs').doc(params.id).update({
      ...body,
      updatedAt: new Date()
    });

    return { 
      success: true, 
      message: 'Job erfolgreich aktualisiert' 
    };
  } catch (error) {
    throw new Error(error instanceof Error ? error.message : 'Fehler beim Aktualisieren des Jobs');
  }
};

export const deleteJobController = async ({ params, user }: { params: { id: string }, user: any }) => {
  try {
    const doc = await db.collection('jobs').doc(params.id).get();
    
    if (!doc.exists) {
      throw new Error('Job nicht gefunden');
    }

    const jobData = doc.data()!;
    if (jobData.employerId !== user.uid && user.role !== 'admin') {
      throw new Error('Keine Berechtigung zum Löschen dieses Jobs');
    }

    await db.collection('jobs').doc(params.id).delete();

    return { 
      success: true, 
      message: 'Job erfolgreich gelöscht' 
    };
  } catch (error) {
    throw new Error(error instanceof Error ? error.message : 'Fehler beim Löschen des Jobs');
  }
};