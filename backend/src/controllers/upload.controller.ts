// backend/src/controllers/upload.controller.ts
// Removed invalid imports: Elysia does not export Request/Response types
import { db } from '../config/firebase';
import { v4 as uuidv4 } from 'uuid';
import { getStorage } from 'firebase-admin/storage';

export const uploadFileController = async ({ user, file, body }: any) => {
  try {
    if (!file) {
      return { success: false, error: 'No file uploaded' };
    }
    const bucket = getStorage().bucket();
    const ext = file.name.split('.').pop();
    const filename = `uploads/${user.uid}/${uuidv4()}.${ext}`;
    const fileUpload = bucket.file(filename);
    await fileUpload.save(file.data, {
      metadata: { contentType: file.type }
    });
    const fileUrl = `https://storage.googleapis.com/${bucket.name}/${filename}`;
    // Optionally: Save file info in DB
    await db.collection('uploads').add({
      userId: user.uid,
      fileUrl,
      type: body.type || 'cv',
      createdAt: new Date()
    });
    return { success: true, fileUrl };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
};
