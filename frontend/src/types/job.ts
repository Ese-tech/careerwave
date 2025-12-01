// frontend/src/types/job.ts
// Definiert die Struktur für ein einzelnes Job-Listing
export interface Job {
    id: string;
    title: string;
    companyName: string;
    location: string;
    salaryRange: string; // Z.B. "80,000 - 100,000 EUR"
    jobType: 'Full-time' | 'Part-time' | 'Contract' | 'Internship';
    description: string; // Ausführliche Jobbeschreibung
    requirements: string[];
    postedAt: Date; // Datum, an dem der Job gepostet wurde
    // Optional: Ein Link zum Unternehmenslogo
    companyLogoUrl?: string; 
    // Referenz auf den Arbeitgeber (später mit Backend-Integration)
    employerId: string;
}