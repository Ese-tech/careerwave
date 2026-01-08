// backend/src/services/cloudinary.service.ts
import { v2 as cloudinary } from 'cloudinary';

// Cloudinary Configuration for CareerWave
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true
});

export interface UploadOptions {
  folder?: string;
  resource_type?: 'image' | 'raw' | 'video' | 'auto';
  format?: string;
  transformation?: any[];
}

export class CloudinaryService {
  /**
   * Upload file to Cloudinary
   * @param buffer File buffer
   * @param options Upload options
   * @returns Upload result with URL
   */
  async uploadFile(buffer: Buffer, options: UploadOptions = {}): Promise<{ url: string; publicId: string; resourceType: string }> {
    return new Promise((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        {
          folder: options.folder || 'careerwave',
          resource_type: options.resource_type || 'auto',
          format: options.format,
          transformation: options.transformation,
        },
        (error, result) => {
          if (error) {
            console.error('Cloudinary upload error:', error);
            return reject(error);
          }
          if (!result) {
            return reject(new Error('Upload failed - no result'));
          }
          resolve({
            url: result.secure_url,
            publicId: result.public_id,
            resourceType: result.resource_type,
          });
        }
      );

      uploadStream.end(buffer);
    });
  }

  /**
   * Upload CV (PDF)
   * @param buffer File buffer
   * @param userId User ID for folder organization
   * @returns Upload result
   */
  async uploadCV(buffer: Buffer, userId: string): Promise<{ url: string; publicId: string }> {
    const result = await this.uploadFile(buffer, {
      folder: `careerwave/cv/${userId}`,
      resource_type: 'raw', // PDF as raw file
    });
    return { url: result.url, publicId: result.publicId };
  }

  /**
   * Upload avatar image
   * @param buffer File buffer
   * @param userId User ID for folder organization
   * @returns Upload result
   */
  async uploadAvatar(buffer: Buffer, userId: string): Promise<{ url: string; publicId: string }> {
    const result = await this.uploadFile(buffer, {
      folder: `careerwave/avatars/${userId}`,
      resource_type: 'image',
      transformation: [
        { width: 400, height: 400, crop: 'fill', gravity: 'face' },
        { quality: 'auto', fetch_format: 'auto' }
      ]
    });
    return { url: result.url, publicId: result.publicId };
  }

  /**
   * Upload company logo
   * @param buffer File buffer
   * @param companyId Company ID for folder organization
   * @returns Upload result
   */
  async uploadCompanyLogo(buffer: Buffer, companyId: string): Promise<{ url: string; publicId: string }> {
    const result = await this.uploadFile(buffer, {
      folder: `careerwave/logos/${companyId}`,
      resource_type: 'image',
      transformation: [
        { width: 300, height: 300, crop: 'fit' },
        { quality: 'auto', fetch_format: 'auto' }
      ]
    });
    return { url: result.url, publicId: result.publicId };
  }

  /**
   * Upload job image
   * @param buffer File buffer
   * @param userId User ID for folder organization
   * @returns Upload result
   */
  async uploadJobImage(buffer: Buffer, userId: string): Promise<{ url: string; publicId: string }> {
    const result = await this.uploadFile(buffer, {
      folder: `careerwave/jobs/${userId}`,
      resource_type: 'image',
      transformation: [
        { width: 1200, height: 630, crop: 'fill' },
        { quality: 'auto', fetch_format: 'auto' }
      ]
    });
    return { url: result.url, publicId: result.publicId };
  }

  /**
   * Delete file from Cloudinary
   * @param publicId Public ID of the file
   * @param resourceType Resource type (image, raw, video)
   * @returns Deletion result
   */
  async deleteFile(publicId: string, resourceType: 'image' | 'raw' | 'video' = 'image'): Promise<{ result: string }> {
    try {
      const result = await cloudinary.uploader.destroy(publicId, { resource_type: resourceType });
      return result;
    } catch (error) {
      console.error('Cloudinary delete error:', error);
      throw error;
    }
  }

  /**
   * Get optimized URL for image
   * @param publicId Public ID of the image
   * @param options Transformation options
   * @returns Optimized URL
   */
  getOptimizedUrl(publicId: string, options?: { width?: number; height?: number; quality?: string }): string {
    return cloudinary.url(publicId, {
      width: options?.width,
      height: options?.height,
      crop: 'fill',
      quality: options?.quality || 'auto',
      fetch_format: 'auto',
    });
  }
}

export const cloudinaryService = new CloudinaryService();
