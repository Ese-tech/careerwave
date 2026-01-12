// backend/src/controllers/settings.controller.ts
import { db } from '@/config/firebase';
import type { AuthenticatedUser } from '@/middleware/auth.middleware';

interface SettingsData {
  siteName: string;
  adminEmail: string;
  maintenanceMode: boolean;
  updatedAt: Date;
  updatedBy: string;
}

interface UpdateSettingsBody {
  siteName?: string;
  adminEmail?: string;
  maintenanceMode?: boolean;
}

/**
 * Get application settings (Admin only)
 */
export const getSettingsController = async ({ user }: { user: AuthenticatedUser }) => {
  try {
    if (user.role !== 'admin') {
      return { success: false, error: 'Unauthorized' };
    }

    const settingsDoc = await db.collection('settings').doc('app').get();
    
    if (!settingsDoc.exists) {
      // Return default settings
      const defaultSettings: SettingsData = {
        siteName: 'CareerWave',
        adminEmail: 'admin@careerwave.com',
        maintenanceMode: false,
        updatedAt: new Date(),
        updatedBy: 'system'
      };
      return { success: true, settings: defaultSettings };
    }

    return { success: true, settings: settingsDoc.data() };
  } catch (error) {
    return { 
      success: false, 
      error: error instanceof Error ? error.message : 'Failed to fetch settings' 
    };
  }
};

/**
 * Update application settings (Admin only)
 */
export const updateSettingsController = async ({ 
  user, 
  body 
}: { 
  user: AuthenticatedUser; 
  body: UpdateSettingsBody 
}) => {
  try {
    if (user.role !== 'admin') {
      return { success: false, error: 'Unauthorized' };
    }

    // Validate input
    if (body.siteName && body.siteName.trim().length === 0) {
      return { success: false, error: 'Site name cannot be empty' };
    }

    if (body.adminEmail && !isValidEmail(body.adminEmail)) {
      return { success: false, error: 'Invalid email format' };
    }

    const updateData: Partial<SettingsData> & { updatedAt: Date; updatedBy: string } = {
      ...body,
      updatedAt: new Date(),
      updatedBy: user.uid
    };

    await db.collection('settings').doc('app').set(updateData, { merge: true });

    const updatedDoc = await db.collection('settings').doc('app').get();
    
    return { 
      success: true, 
      settings: updatedDoc.data(),
      message: 'Settings updated successfully' 
    };
  } catch (error) {
    return { 
      success: false, 
      error: error instanceof Error ? error.message : 'Failed to update settings' 
    };
  }
};

/**
 * Simple email validation
 */
function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}
