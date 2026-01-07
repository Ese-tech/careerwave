// backend/src/controllers/upload.controller.ts
import { db } from '../config/firebase';
import { cloudinaryService } from '../services/cloudinary.service';

// Validate file type
const ALLOWED_IMAGE_TYPES = ['image/jpeg', 'image/png', 'image/webp', 'image/jpg'];
const ALLOWED_CV_TYPES = ['application/pdf'];
const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB

// Upload CV Controller
export const uploadCVController = async (ctx: any) => {
  try {
    const { user, body } = ctx;
    const file = body?.file;
    
    if (!file) {
      return { success: false, error: 'No file uploaded' };
    }

    // Validate file type
    if (!ALLOWED_CV_TYPES.includes(file.type)) {
      return { success: false, error: 'Invalid file type. Only PDF files are allowed.' };
    }

    // Validate file size
    if (file.size > MAX_FILE_SIZE) {
      return { success: false, error: 'File too large. Maximum size is 10MB.' };
    }

    // Convert file to buffer
    const buffer = Buffer.from(await file.arrayBuffer());

    // Upload to Cloudinary
    const { url, publicId } = await cloudinaryService.uploadCV(buffer, user.uid);

    // Save to database
    await db.collection('users').doc(user.uid).update({
      'profile.resumeUrl': url,
      'profile.resumePublicId': publicId,
      updatedAt: new Date(),
    });

    // Track upload in uploads collection
    await db.collection('uploads').add({
      userId: user.uid,
      fileUrl: url,
      publicId,
      type: 'cv',
      fileName: file.name,
      fileSize: file.size,
      createdAt: new Date(),
    });

    return { success: true, resumeUrl: url, publicId };
  } catch (error: any) {
    console.error('CV upload error:', error);
    return { success: false, error: error.message || 'Upload failed' };
  }
};

// Upload Avatar Controller
export const uploadAvatarController = async (ctx: any) => {
  try {
    const { user, body } = ctx;
    const file = body?.file;
    
    console.log('📸 Avatar Upload Request:', { 
      userId: user?.uid, 
      hasFile: !!file,
      fileType: file?.type,
      fileSize: file?.size 
    });
    
    if (!file) {
      return { success: false, error: 'No file uploaded' };
    }

    // Validate file type
    if (!ALLOWED_IMAGE_TYPES.includes(file.type)) {
      return { success: false, error: 'Invalid file type. Only JPEG, PNG, and WebP images are allowed.' };
    }

    // Validate file size
    if (file.size > MAX_FILE_SIZE) {
      return { success: false, error: 'File too large. Maximum size is 10MB.' };
    }

    // Convert file to buffer
    const buffer = Buffer.from(await file.arrayBuffer());

    // Delete old avatar if exists
    const userDoc = await db.collection('users').doc(user.uid).get();
    const userData = userDoc.data();
    if (userData?.profile?.avatarPublicId) {
      try {
        await cloudinaryService.deleteFile(userData.profile.avatarPublicId, 'image');
        console.log('🗑️ Old avatar deleted:', userData.profile.avatarPublicId);
      } catch (err) {
        console.error('Error deleting old avatar:', err);
      }
    }

    // Upload to Cloudinary
    console.log('☁️ Uploading to Cloudinary...');
    const { url, publicId } = await cloudinaryService.uploadAvatar(buffer, user.uid);
    console.log('✅ Cloudinary Upload Success:', { url, publicId });

    // Save to database
    await db.collection('users').doc(user.uid).update({
      'profile.avatar': url,
      'profile.avatarPublicId': publicId,
      updatedAt: new Date(),
    });
    console.log('💾 Database updated with avatar URL');

    // Track upload in uploads collection
    await db.collection('uploads').add({
      userId: user.uid,
      fileUrl: url,
      publicId,
      type: 'avatar',
      fileName: file.name,
      fileSize: file.size,
      createdAt: new Date(),
    });

    const response = { success: true, url, avatarUrl: url, publicId };
    console.log('📤 Sending response:', response);
    return response;
  } catch (error: any) {
    console.error('❌ Avatar upload error:', error);
    return { success: false, error: error.message || 'Upload failed' };
  }
};

// Upload Company Logo Controller
export const uploadCompanyLogoController = async (ctx: any) => {
  try {
    const { user, body } = ctx;
    const file = body?.file;
    
    if (!file) {
      return { success: false, error: 'No file uploaded' };
    }

    // Validate file type
    if (!ALLOWED_IMAGE_TYPES.includes(file.type)) {
      return { success: false, error: 'Invalid file type. Only JPEG, PNG, and WebP images are allowed.' };
    }

    // Validate file size
    if (file.size > MAX_FILE_SIZE) {
      return { success: false, error: 'File too large. Maximum size is 10MB.' };
    }

    // Only employers can upload company logos
    if (user.role !== 'employer') {
      return { success: false, error: 'Unauthorized. Only employers can upload company logos.' };
    }

    const companyId = body.companyId || user.uid;

    // Convert file to buffer
    const buffer = Buffer.from(await file.arrayBuffer());

    // Upload to Cloudinary
    const { url, publicId } = await cloudinaryService.uploadCompanyLogo(buffer, companyId);

    // Save to database (employers collection)
    await db.collection('employers').doc(companyId).update({
      logoUrl: url,
      logoPublicId: publicId,
      updatedAt: new Date(),
    });

    return { success: true, logoUrl: url, publicId };
  } catch (error: any) {
    console.error('Logo upload error:', error);
    return { success: false, error: error.message || 'Upload failed' };
  }
};
