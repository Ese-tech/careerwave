import { JobStatus } from '../types/job';
import { t } from 'elysia';

// Definiert das Schema für den Job-Status, basierend auf den Frontend-Konstanten
export const jobStatusSchema = t.Enum({
    draft: 'draft',
    published: 'published',
    archived: 'archived'
});

// Definiert das Core-Schema für die Erstellung und Aktualisierung eines Jobs
const jobCoreSchema = t.Object({
    title: t.String({ minLength: 5, maxLength: 100, description: 'Jobtitel' }),
    companyName: t.String({ minLength: 3, maxLength: 100, description: 'Name des Unternehmens' }),
    location: t.String({ minLength: 3, maxLength: 100, description: 'Standort (Stadt, Land, Remote)' }),
    salaryRange: t.String({ maxLength: 50, description: 'Gehaltsspanne als String (z.B. 60k - 80k EUR)' }),
    jobType: t.Union([
        t.Literal('Full-time'),
        t.Literal('Part-time'),
        t.Literal('Contract'),
        t.Literal('Internship')
    ], { description: 'Art der Beschäftigung' }),
    description: t.String({ minLength: 50, description: 'Ausführliche Jobbeschreibung' }),
    requirements: t.Array(t.String(), { description: 'Liste der erforderlichen Fähigkeiten/Anforderungen' }),
    companyLogoUrl: t.Optional(t.String({ format: 'url', description: 'URL zum Unternehmenslogo' })),
    status: jobStatusSchema,
});

// ----------------------------------------------------
// SCHEMAS FÜR API VALIDIERUNG
// ----------------------------------------------------

// Schema für die Erstellung eines Jobs (ohne ID, postedAt, etc.)
export const CreateJobSchema = t.Omit(jobCoreSchema, ['status']);

// Schema für die Aktualisierung eines Jobs (alle Felder sind optional)
export const UpdateJobSchema = t.Partial(jobCoreSchema);

// Schema für die Antwort (enthält alle Felder, einschließlich ID und Metadaten)
export const JobResponseSchema = t.Composite([
    jobCoreSchema,
    t.Object({
        id: t.String({ description: 'Eindeutige ID des Jobs' }),
        employerId: t.String({ description: 'ID des erstellenden Arbeitgebers' }),
        postedAt: t.Date({ description: 'Erstellungsdatum des Jobs' }),
        updatedAt: t.Date({ description: 'Datum der letzten Aktualisierung' }),
    })
]);

// Array-Schema für die Liste der Jobs
export const JobsListResponseSchema = t.Array(JobResponseSchema);