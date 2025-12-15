// backend/src/types/application.ts

export interface Application {
  id: string;
  jobId: string;
  name: string;
  email: string;
  telefon?: string;
  nachricht: string;
  createdAt: Date;
  // Optionally: fileUrl?: string;
}

export type CreateApplicationPayload = Omit<Application, 'id' | 'createdAt'>;
