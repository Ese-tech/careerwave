import { create } from 'zustand';

export interface Job {
  id: string;
  title: string;
  company: string;
  location: string;
  type: 'full-time' | 'part-time' | 'contract' | 'internship';
  level: 'entry' | 'mid' | 'senior' | 'lead';
  salary: {
    min?: number;
    max?: number;
    currency: string;
  };
  description: string;
  requirements: string[];
  benefits: string[];
  remote: boolean;
  tags: string[];
  publishedAt: string;
  expiresAt: string;
  employerId: string;
  status: 'active' | 'paused' | 'expired';
}

export interface JobFilters {
  query?: string;
  location?: string;
  type?: string[];
  level?: string[];
  remote?: boolean;
  salaryMin?: number;
  salaryMax?: number;
  tags?: string[];
}

interface JobState {
  jobs: Job[];
  currentJob: Job | null;
  filters: JobFilters;
  isLoading: boolean;
  error: string | null;
  totalCount: number;
  currentPage: number;
  pageSize: number;

  // Actions
  setJobs: (jobs: Job[]) => void;
  setCurrentJob: (job: Job | null) => void;
  setFilters: (filters: JobFilters) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  setCurrentPage: (page: number) => void;
  
  // API Actions
  fetchJobs: () => Promise<void>;
  fetchJobById: (id: string) => Promise<void>;
  searchJobs: (filters: JobFilters) => Promise<void>;
  applyToJob: (jobId: string) => Promise<void>;
  clearError: () => void;
  clearFilters: () => void;
}

export const useJobStore = create<JobState>()((set, get) => ({
  jobs: [],
  currentJob: null,
  filters: {},
  isLoading: false,
  error: null,
  totalCount: 0,
  currentPage: 1,
  pageSize: 20,

  setJobs: (jobs: Job[]) => set({ jobs }),
  setCurrentJob: (currentJob: Job | null) => set({ currentJob }),
  setFilters: (filters: JobFilters) => set({ filters }),
  setLoading: (isLoading: boolean) => set({ isLoading }),
  setError: (error: string | null) => set({ error }),
  setCurrentPage: (currentPage: number) => set({ currentPage }),
  clearError: () => set({ error: null }),
  clearFilters: () => set({ filters: {}, currentPage: 1 }),

  fetchJobs: async () => {
    set({ isLoading: true, error: null });
    
    try {
      const { currentPage, pageSize } = get();
      const response = await fetch(
        `/api/jobs?page=${currentPage}&limit=${pageSize}`
      );

      if (!response.ok) {
        throw new Error('Fehler beim Laden der Jobs');
      }

      const data = await response.json();
      set({ 
        jobs: data.jobs,
        totalCount: data.total,
        isLoading: false 
      });
    } catch (error) {
      set({ 
        isLoading: false, 
        error: error instanceof Error ? error.message : 'Ein unbekannter Fehler ist aufgetreten' 
      });
    }
  },

  fetchJobById: async (id: string) => {
    set({ isLoading: true, error: null });
    
    try {
      const response = await fetch(`/api/jobs/${id}`);

      if (!response.ok) {
        throw new Error('Job nicht gefunden');
      }

      const job = await response.json();
      set({ 
        currentJob: job,
        isLoading: false 
      });
    } catch (error) {
      set({ 
        isLoading: false, 
        error: error instanceof Error ? error.message : 'Ein unbekannter Fehler ist aufgetreten' 
      });
    }
  },

  searchJobs: async (filters: JobFilters) => {
    set({ isLoading: true, error: null, filters, currentPage: 1 });
    
    try {
      const { pageSize } = get();
      const queryParams = new URLSearchParams({
        page: '1',
        limit: pageSize.toString(),
        ...Object.entries(filters).reduce((acc, [key, value]) => {
          if (value !== undefined && value !== null) {
            if (Array.isArray(value)) {
              acc[key] = value.join(',');
            } else {
              acc[key] = value.toString();
            }
          }
          return acc;
        }, {} as Record<string, string>)
      });

      const response = await fetch(`/api/jobs/search?${queryParams}`);

      if (!response.ok) {
        throw new Error('Fehler bei der Jobsuche');
      }

      const data = await response.json();
      set({ 
        jobs: data.jobs,
        totalCount: data.total,
        isLoading: false 
      });
    } catch (error) {
      set({ 
        isLoading: false, 
        error: error instanceof Error ? error.message : 'Ein unbekannter Fehler ist aufgetreten' 
      });
    }
  },

  applyToJob: async (jobId: string) => {
    set({ isLoading: true, error: null });
    
    try {
      const response = await fetch(`/api/jobs/${jobId}/apply`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('auth-token')}`,
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Bewerbung fehlgeschlagen');
      }

      set({ isLoading: false });
    } catch (error) {
      set({ 
        isLoading: false, 
        error: error instanceof Error ? error.message : 'Ein unbekannter Fehler ist aufgetreten' 
      });
      throw error;
    }
  },
}));