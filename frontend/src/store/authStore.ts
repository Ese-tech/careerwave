import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { authService } from '../services/auth';

export interface User {
  name: any;
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  role: 'viewer' | 'candidate' | 'employer' | 'admin';
  company?: string;
  avatar?: string;
  createdAt?: string;
}

interface AuthState {
  user: User | null;
  token: string | null;
  isLoading: boolean;
  error: string | null;
  
  // Actions
  setUser: (user: User) => void;
  setToken: (token: string) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  login: (email: string, password: string) => Promise<void>;
  register: (userData: RegisterData) => Promise<void>;
  logout: () => void;
  clearError: () => void;
}

interface RegisterData {
  name: string;
  email: string;
  password: string;
  role: 'candidate' | 'employer';
  company?: string;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      token: null,
      isLoading: false,
      error: null,

      setUser: (user: User) => set({ user }),
      setToken: (token: string) => set({ token }),
      setLoading: (isLoading: boolean) => set({ isLoading }),
      setError: (error: string | null) => set({ error }),
      clearError: () => set({ error: null }),

      login: async (email: string, password: string) => {
        set({ isLoading: true, error: null });
        
        try {
          const response = await authService.login({ email, password });

          if (!response.success) {
            throw new Error(response.error || 'Login fehlgeschlagen');
          }

          const { user, token } = response.data || {};
          
          if (!user || !token) {
            throw new Error('Unvollständige Antwort vom Server');
          }

          // Ensure user has a name field for backward compatibility
          const userWithName = {
            ...user,
            name: user.name || `${user.firstName || ''} ${user.lastName || ''}`.trim() || user.email
          };
          
          set({ 
            user: userWithName, 
            token, 
            isLoading: false, 
            error: null 
          });
        } catch (error) {
          set({ 
            isLoading: false, 
            error: error instanceof Error ? error.message : 'Ein unbekannter Fehler ist aufgetreten' 
          });
          throw error;
        }
      },

      register: async (userData: RegisterData) => {
        set({ isLoading: true, error: null });
        
        try {
          const response = await authService.register(userData);

          if (!response.success) {
            throw new Error(response.error || 'Registrierung fehlgeschlagen');
          }

          const { user, token } = response.data || {};
          
          if (!user || !token) {
            throw new Error('Unvollständige Antwort vom Server');
          }
          
          set({ 
            user, 
            token, 
            isLoading: false, 
            error: null 
          });
        } catch (error) {
          set({ 
            isLoading: false, 
            error: error instanceof Error ? error.message : 'Ein unbekannter Fehler ist aufgetreten' 
          });
          throw error;
        }
      },

      logout: () => {
        set({ 
          user: null, 
          token: null, 
          error: null 
        });
      },
    }),
    {
      name: 'auth-storage',
      partialize: (state) => ({
        user: state.user,
        token: state.token,
      }),
    }
  )
);