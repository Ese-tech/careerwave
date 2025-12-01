// backend/src/types/job.ts

// Definition des Job-Status (aus den Admin-Konstanten)
export type JobStatus = 'draft' | 'published' | 'archived';

// Definition der Art der Beschäftigung
export type JobType = 'Full-time' | 'Part-time' | 'Contract' | 'Internship';

// Basale Struktur für die Job-Inhalte
interface JobCore {
    title: string;
    companyName: string;
    location: string;
    salaryRange: string;
    jobType: JobType;
    description: string;
    requirements: string[];
    companyLogoUrl?: string;
    status: JobStatus;
}

// Das vollständige Job-Objekt, wie es von der API zurückgegeben wird (mit Metadaten)
export interface Job extends JobCore {
    id: string;
    employerId: string;
    postedAt: string; // ISO 8601 string
    updatedAt: string; // ISO 8601 string
}

// Payload für die Erstellung eines neuen Jobs (Status wird vom Service gesetzt)
// Matcht dem CreateJobSchema (ohne 'status')
export type CreateJobPayload = Omit<JobCore, 'status'>;

// Payload für die Aktualisierung eines vorhandenen Jobs (alle Felder optional)
// Matcht dem UpdateJobSchema
export type UpdateJobPayload = Partial<JobCore>;