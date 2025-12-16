// backend/src/controllers/jobAlert.controller.ts
import { db } from '../config/firebase';
import type { JobAlert } from '../models/jobAlert.model';

export const addJobAlertController = async ({ user, body }: any) => {
  try {
    const newAlert = {
      userId: user.uid,
      keywords: body.keywords,
      location: body.location,
      email: body.email,
      createdAt: new Date()
    };
    const docRef = await db.collection('job_alerts').add(newAlert);
    return { success: true, id: docRef.id };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
};

export const getJobAlertsController = async ({ user }: any) => {
  try {
    const snapshot = await db.collection('job_alerts').where('userId', '==', user.uid).get();
    const alerts: JobAlert[] = [];
    snapshot.forEach(doc => {
      const data = doc.data();
      alerts.push({
        id: doc.id,
        userId: data.userId,
        keywords: data.keywords,
        location: data.location,
        email: data.email,
        createdAt: data.createdAt?.toDate ? data.createdAt.toDate() : new Date()
      });
    });
    return { success: true, alerts };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
};

export const removeJobAlertController = async ({ user, params }: any) => {
  try {
    const alertRef = db.collection('job_alerts').doc(params.id);
    const alertDoc = await alertRef.get();
    const alertData = alertDoc.data();
    if (!alertDoc.exists || !alertData || alertData.userId !== user?.uid) {
      return { success: false, error: 'Not found or not allowed' };
    }
    await alertRef.delete();
    return { success: true };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
};
