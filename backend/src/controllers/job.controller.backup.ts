// backend/src/controllers/job.controller.ts

import { Elysia, t } from 'elysia';
import { JobService } from '../services/job.service';
import { JobResponseSchema, JobsListResponseSchema, CreateJobSchema, UpdateJobSchema } from '../models/job.model';
import { userAuthGuard } from '../middlewares/auth.middleware'; // Für Authentifizierung und Rollenprüfung

// Wir instanziieren den Service, der mit der Datenbank spricht
const jobService = new JobService();

/**
 * Der JobController verwaltet alle Routen für Jobs.
 */
export const jobController = new Elysia({ prefix: '/jobs' })
    
    // Anwenden des Auth Guards auf alle Routen in diesem Controller
    // und Überprüfung, ob der Benutzer angemeldet ist
    .use(userAuthGuard) 

    // ------------------------------------------------------------------
    // ÖFFENTLICHE ENDPUNKTE (GET-Anfragen für alle)
    // ------------------------------------------------------------------
    
    // Ruft alle veröffentlichten Jobs ab (für die Haupt-Jobliste des Kandidaten)
    .get('/all', async ({ set }) => {
        try {
            const jobs = await jobService.getAllPublishedJobs();
            return jobs;
        } catch (error) {
            console.error("Error fetching published jobs:", error);
            set.status = 500;
            return { message: 'Internal Server Error fetching published jobs' };
        }
    }, {
        // Validation der Antwort für öffentliche Liste
        response: {
            200: JobsListResponseSchema,
        },
        detail: {
            summary: 'Ruft alle veröffentlichten Jobs ab',
            tags: ['Jobs'],
        }
    })

    // Ruft einen einzelnen Job anhand der ID ab (öffentlich zugänglich, wenn veröffentlicht)
    .get('/:id', async ({ params, set }) => {
        const job = await jobService.getJobById(params.id);

        if (!job) {
            set.status = 404;
            return { message: 'Job not found' };
        }

        // Optional: Überprüfen, ob der Job veröffentlicht ist, wenn er öffentlich sein soll
        // if (job.status !== 'published') {
        //     set.status = 403;
        //     return { message: 'Job is not published' };
        // }

        return job;
    }, {
        params: t.Object({ id: t.String() }),
        response: {
            200: JobResponseSchema,
            404: t.Object({ message: t.String() }),
        },
        detail: {
            summary: 'Ruft einen einzelnen Job ab',
            tags: ['Jobs'],
        }
    })


    // ------------------------------------------------------------------
    // GESCHÜTZTE ENDPUNKTE (Employer/Admin, Auth erforderlich)
    // ------------------------------------------------------------------

    // Erstellt einen neuen Job (Nur für Employer oder Admin)
    .post('/', async ({ body, user, set }) => {
        // userAuthGuard stellt sicher, dass user definiert ist
        if (user.role !== 'employer' && user.role !== 'admin') {
            set.status = 403;
            return { message: 'Forbidden: Only employers or admins can create jobs' };
        }
        
        try {
            const createdJob = await jobService.createJob(body, user.id);
            set.status = 201; // Created
            return createdJob;
        } catch (error) {
            console.error("Error creating job:", error);
            set.status = 500;
            return { message: 'Internal Server Error creating job' };
        }
    }, {
        body: CreateJobSchema,
        response: {
            201: JobResponseSchema,
            400: t.Object({ message: t.String() }),
            403: t.Object({ message: t.String() }),
        },
        detail: {
            summary: 'Erstellt einen neuen Job',
            tags: ['Jobs', 'Protected'],
        }
    })

    // Aktualisiert einen vorhandenen Job (Nur für den Job-Besitzer oder Admin)
    .put('/:id', async ({ params, body, user, set }) => {
        const existingJob = await jobService.getJobById(params.id);

        if (!existingJob) {
            set.status = 404;
            return { message: 'Job not found' };
        }

        // Berechtigungsprüfung: Nur Admin ODER der Besitzer des Jobs darf aktualisieren
        if (user.role !== 'admin' && existingJob.employerId !== user.id) {
            set.status = 403;
            return { message: 'Forbidden: You do not have permission to update this job' };
        }

        try {
            const updatedJob = await jobService.updateJob(params.id, body);
            return updatedJob;
        } catch (error) {
            console.error("Error updating job:", error);
            set.status = 500;
            return { message: 'Internal Server Error updating job' };
        }
    }, {
        params: t.Object({ id: t.String() }),
        body: UpdateJobSchema,
        response: {
            200: JobResponseSchema,
            400: t.Object({ message: t.String() }),
            403: t.Object({ message: t.String() }),
            404: t.Object({ message: t.String() }),
        },
        detail: {
            summary: 'Aktualisiert einen Job',
            tags: ['Jobs', 'Protected'],
        }
    })

    // Löscht einen Job (Nur für Admin oder den Job-Besitzer)
    .delete('/:id', async ({ params, user, set }) => {
        const existingJob = await jobService.getJobById(params.id);

        if (!existingJob) {
            // Wenn der Job nicht existiert, betrachten wir den Löschvorgang als erfolgreich (idempotent)
            return { message: 'Job deleted or not found' };
        }

        // Berechtigungsprüfung: Nur Admin ODER der Besitzer des Jobs darf löschen
        if (user.role !== 'admin' && existingJob.employerId !== user.id) {
            set.status = 403;
            return { message: 'Forbidden: You do not have permission to delete this job' };
        }

        try {
            await jobService.deleteJob(params.id);
            return { message: 'Job successfully deleted' };
        } catch (error) {
            console.error("Error deleting job:", error);
            set.status = 500;
            return { message: 'Internal Server Error deleting job' };
        }
    }, {
        params: t.Object({ id: t.String() }),
        response: {
            200: t.Object({ message: t.String() }),
            403: t.Object({ message: t.String() }),
            404: t.Object({ message: t.String() }),
        },
        detail: {
            summary: 'Löscht einen Job',
            tags: ['Jobs', 'Protected'],
        }
    });