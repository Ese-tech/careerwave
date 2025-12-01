// frontend/src/services/auth.ts
import type { User } from '../types/user';

const API_BASE = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080/api/v1';

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterData {
  email: string;
  password: string;
  role?: 'candidate' | 'employer';
  displayName?: string;
}

export interface AuthResponse {
  success: boolean;
  data?: {
    user: User;
    token: string;
  };
  error?: string;
}

export const authService = {
  async login(credentials: LoginCredentials): Promise<AuthResponse> {
    try {
      const response = await fetch(`${API_BASE}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(credentials),
      });
      
      return await response.json();
    } catch (error) {
      return {
        success: false,
        error: 'Network error occurred'
      };
    }
  },

  async register(data: RegisterData): Promise<AuthResponse> {
    try {
      const response = await fetch(`${API_BASE}/auth/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      
      return await response.json();
    } catch (error) {
      return {
        success: false,
        error: 'Network error occurred'
      };
    }
  },

  async getProfile(token: string): Promise<AuthResponse> {
    try {
      const response = await fetch(`${API_BASE}/users/profile`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });
      
      return await response.json();
    } catch (error) {
      return {
        success: false,
        error: 'Network error occurred'
      };
    }
  },

  async updateProfile(token: string, data: Partial<User>): Promise<AuthResponse> {
    try {
      const response = await fetch(`${API_BASE}/users/profile`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      
      return await response.json();
    } catch (error) {
      return {
        success: false,
        error: 'Network error occurred'
      };
    }
  },

  async logout(token: string): Promise<{ success: boolean }> {
    try {
      await fetch(`${API_BASE}/auth/logout`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      
      return { success: true };
    } catch (error) {
      return { success: true }; // Always succeed locally
    }
  }
};