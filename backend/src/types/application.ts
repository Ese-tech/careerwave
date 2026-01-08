// backend/src/types/application.ts

export interface Application {
  id: string;
  jobId: string;
  candidateId?: string; // User ID if candidate is logged in
  name: string;
  email: string;
  telefon?: string;
  nachricht: string;
  resumeUrl?: string; // CV/Resume URL
  status: 'applied' | 'reviewing' | 'interview' | 'accepted' | 'rejected';
  createdAt: Date;
  updatedAt?: Date;
}

export type CreateApplicationPayload = Omit<Application, 'id' | 'createdAt' | 'updatedAt' | 'status'>;
