// backend/src/models/jobAlert.model.ts
export interface JobAlert {
  id: string;
  userId: string;
  keywords: string;
  location?: string;
  email: string;
  createdAt: Date;
}
