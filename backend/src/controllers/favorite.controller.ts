// backend/src/controllers/favorite.controller.ts
import { db } from '../config/firebase';
import type { Favorite } from '../models/favorite.model';

export const addFavoriteController = async ({ user, body }: any) => {
  try {
    const newFav = {
      userId: user.uid,
      jobId: body.jobId,
      createdAt: new Date()
    };
    const docRef = await db.collection('favorites').add(newFav);
    return { success: true, id: docRef.id };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
};

export const getFavoritesController = async ({ user }: any) => {
  try {
    const snapshot = await db.collection('favorites').where('userId', '==', user.uid).get();
    const favorites: Favorite[] = [];
    snapshot.forEach(doc => {
      const data = doc.data();
      favorites.push({
        id: doc.id,
        userId: data.userId,
        jobId: data.jobId,
        createdAt: data.createdAt?.toDate ? data.createdAt.toDate() : new Date()
      });
    });
    return { success: true, favorites };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
};

export const removeFavoriteController = async ({ user, params }: any) => {
  try {
    const favRef = db.collection('favorites').doc(params.id);
    const favDoc = await favRef.get();
    const favData = favDoc.data();
    if (!favDoc.exists || !favData || favData.userId !== user?.uid) {
      return { success: false, error: 'Not found or not allowed' };
    }
    await favRef.delete();
    return { success: true };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
};
