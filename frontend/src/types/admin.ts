// frontend/src/types/admin.ts

export type AdminUser = {
  uid: string;
  email: string;
  displayName?: string;
  role?: 'admin' | 'employer' | 'candidate';
  createdAt?: string;
  verified?: boolean;
};

export type AdminEmployer = {
  id: string;
  companyName: string;
  verified: boolean;
  website?: string;
  logoUrl?: string;
  createdAt?: string;
};

export type JobAdmin = {
  id: string;
  title: string;
  companyId: string;
  companyName?: string;
  location?: string;
  contractType?: string;
  postedAt?: string;
  status?: 'open' | 'closed' | 'paused';
  published?: boolean;
  createdAt?: string;
};

export type AdminApplication = {
  id: string;
  jobId: string;
  userId: string;
  resumeUrl?: string;
  coverLetter?: string;
  status?: 'applied'|'reviewing'|'rejected'|'accepted';
  submittedAt?: string;
};
export type AdminStore = {
  users: AdminUser[];
  employers: AdminEmployer[];
  jobs: JobAdmin[];
  applications: AdminApplication[];
  loading: boolean;
  error?: string;
};  
export type AdminAnalytics = {
  totalUsers: number;
  totalEmployers: number;
  totalJobs: number;
  totalApplications: number;
  jobsByStatus: Record<string, number>;
  applicationsByStatus: Record<string, number>;
};  
export type AdminSettings = {
  siteTitle: string;
  siteDescription: string;
  contactEmail: string;
};  
export type AdminState = {
  store: AdminStore;
  analytics: AdminAnalytics;
  settings: AdminSettings;
};
export type AdminAction =
  | { type: 'SET_USERS'; payload: AdminUser[] }
  | { type: 'SET_EMPLOYERS'; payload: AdminEmployer[] }
  | { type: 'SET_JOBS'; payload: JobAdmin[] }
  | { type: 'SET_APPLICATIONS'; payload: AdminApplication[] }
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'SET_ERROR'; payload?: string }
  | { type: 'SET_ANALYTICS'; payload: AdminAnalytics }
  | { type: 'SET_SETTINGS'; payload: AdminSettings };   
export type AdminContextType = {
  state: AdminState;
  dispatch: React.Dispatch<AdminAction>;
};
