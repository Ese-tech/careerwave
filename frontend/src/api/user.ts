// frontend/src/api/user.ts
import { api, type ApiResponse } from '../services/api';
import type { User } from '../types/user';

export interface UpdateUserRequest {
  displayName?: string;
  email?: string;
  role?: 'candidate' | 'employer' | 'admin';
}

export interface UserProfileRequest extends UpdateUserRequest {
  bio?: string;
  skills?: string[];
  experience?: string;
  education?: string;
  resumeUrl?: string;
  portfolioUrl?: string;
  linkedinUrl?: string;
  githubUrl?: string;
}

export const userApi = {
  async getProfile(token: string): Promise<ApiResponse<User>> {
    return api.get<User>('/users/profile', token);
  },

  async updateProfile(data: UserProfileRequest, token: string): Promise<ApiResponse<User>> {
    return api.put<User>('/users/profile', data, token);
  },

  async uploadAvatar(file: File, token: string): Promise<ApiResponse<{ avatarUrl: string }>> {
    const formData = new FormData();
    formData.append('avatar', file);

    try {
      const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/users/avatar`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
        body: formData,
      });

      if (!response.ok) {
        return {
          success: false,
          error: `Upload failed with status ${response.status}`
        };
      }

      return await response.json();
    } catch (error) {
      return {
        success: false,
        error: 'Upload failed'
      };
    }
  },

  async uploadResume(file: File, token: string): Promise<ApiResponse<{ resumeUrl: string }>> {
    const formData = new FormData();
    formData.append('resume', file);

    try {
      const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/users/resume`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
        body: formData,
      });

      if (!response.ok) {
        return {
          success: false,
          error: `Upload failed with status ${response.status}`
        };
      }

      return await response.json();
    } catch (error) {
      return {
        success: false,
        error: 'Upload failed'
      };
    }
  },

  async deleteAccount(token: string): Promise<ApiResponse<void>> {
    return api.delete<void>('/users/profile', token);
  },

  async changePassword(currentPassword: string, newPassword: string, token: string): Promise<ApiResponse<void>> {
    return api.post<void>('/users/change-password', {
      currentPassword,
      newPassword
    }, token);
  },

  async getApplications(token: string): Promise<ApiResponse<any[]>> {
    return api.get<any[]>('/users/applications', token);
  },

  async getSavedJobs(token: string): Promise<ApiResponse<any[]>> {
    return api.get<any[]>('/users/saved-jobs', token);
  },

  async saveJob(jobId: string, token: string): Promise<ApiResponse<void>> {
    return api.post<void>('/users/saved-jobs', { jobId }, token);
  },

  async unsaveJob(jobId: string, token: string): Promise<ApiResponse<void>> {
    return api.delete<void>(`/users/saved-jobs/${jobId}`, token);
  }
};