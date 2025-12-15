// backend/src/controllers/application.controller.ts
import { db } from '../config/firebase';
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
      createdAt: new Date()
    });
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
