// frontend/src/types/application.ts
export interface Application {
  id: string;
  jobId: string;
  candidateId: string;
  employerId: string;
  status: ApplicationStatus;
  coverLetter?: string;
  resumeUrl?: string;
  appliedAt: Date;
  updatedAt: Date;
  
  // Populated fields
  job?: {
    id: string;
    title: string;
    companyName: string;
    location: string;
  };
  
  candidate?: {
    id: string;
    displayName?: string;
    email: string;
  };
  
  employer?: {
    id: string;
    companyName: string;
    email: string;
  };
}

export type ApplicationStatus = 
  | 'pending' 
  | 'reviewing' 
  | 'shortlisted' 
  | 'interview_scheduled' 
  | 'interview_completed' 
  | 'offered' 
  | 'accepted' 
  | 'rejected' 
  | 'withdrawn';

export interface CreateApplicationRequest {
  jobId: string;
  coverLetter?: string;
  resumeUrl?: string;
}

export interface UpdateApplicationRequest {
  status?: ApplicationStatus;
  coverLetter?: string;
  resumeUrl?: string;
  notes?: string;
}

export interface ApplicationFilters {
  status?: ApplicationStatus;
  jobId?: string;
  candidateId?: string;
  employerId?: string;
  page?: number;
  limit?: number;
  sortBy?: 'appliedAt' | 'updatedAt' | 'status';
  sortOrder?: 'asc' | 'desc';
}

export const APPLICATION_STATUS_LABELS: Record<ApplicationStatus, string> = {
  pending: 'Pending Review',
  reviewing: 'Under Review',
  shortlisted: 'Shortlisted',
  interview_scheduled: 'Interview Scheduled',
  interview_completed: 'Interview Completed',
  offered: 'Offer Extended',
  accepted: 'Offer Accepted',
  rejected: 'Application Rejected',
  withdrawn: 'Application Withdrawn'
};

export const APPLICATION_STATUS_COLORS: Record<ApplicationStatus, string> = {
  pending: 'yellow',
  reviewing: 'blue',
  shortlisted: 'purple',
  interview_scheduled: 'orange',
  interview_completed: 'orange',
  offered: 'green',
  accepted: 'green',
  rejected: 'red',
  withdrawn: 'gray'
};