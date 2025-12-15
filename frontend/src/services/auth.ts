// frontend/src/services/auth.ts
import type { User } from '../store/authStore';

const API_BASE = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080/api/v1';

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterData {
  email: string;
  password: string;
  role?: 'candidate' | 'employer';
  name?: string;
  company?: string;
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
      console.log('🔐 Attempting login with:', { email: credentials.email });
      
      const response = await fetch(`${API_BASE}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(credentials),
      });
      
      console.log('📡 Login response status:', response.status, response.statusText);
      
      if (!response.ok) {
        const errorText = await response.text();
        console.error('❌ Login failed with status', response.status, ':', errorText);
        
        let errorMessage = 'Login fehlgeschlagen';
        try {
          const errorData = JSON.parse(errorText);
          errorMessage = errorData.message || errorMessage;
        } catch (e) {
          console.error('Failed to parse error response:', e);
        }
        
        return {
          success: false,
          error: errorMessage
        };
      }
      
      const result = await response.json();
      console.log('✅ Login successful:', { success: result.success, hasUser: !!result.user, hasToken: !!result.token });
      
      // Backend sendet: { success, message, user, token }
      // Frontend erwartet: { success, data: { user, token }, error }
      if (result.success) {
        return {
          success: true,
          data: {
            user: result.user,
            token: result.token
          }
        };
      } else {
        return {
          success: false,
          error: result.message || 'Login failed'
        };
      }
    } catch (error) {
      console.error('🚨 Network error during login:', error);
      return {
        success: false,
        error: 'Netzwerkfehler: Verbindung zum Server fehlgeschlagen'
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
      
      const result = await response.json();
      
      // Backend sendet: { success, message, user, token }
      // Frontend erwartet: { success, data: { user, token }, error }
      if (result.success) {
        return {
          success: true,
          data: {
            user: result.user,
            token: result.token
          }
        };
      } else {
        return {
          success: false,
          error: result.message || 'Registration failed'
        };
      }
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