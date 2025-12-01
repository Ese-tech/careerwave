import { Elysia, t } from 'elysia';
import { JobService } from '../services/job.service';
import { AuthService } from '../services/auth.service';

const jobService = new JobService();
const authService = new AuthService();

// Middleware für Authentifizierung
const authMiddleware = async ({ headers, set }: any) => {
  try {
    const authHeader = headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      set.status = 401;
      throw new Error('Token erforderlich');
    }

    const token = authHeader.replace('Bearer ', '');
    const payload = await authService.verifyToken(token);
    const user = await authService.getUserById(payload.userId);
    
    return { user };
  } catch (error) {
    set.status = 401;
    throw new Error('Ungültiger Token');
  }
};

export const jobController = new Elysia({ prefix: '/jobs' })
  .get('/', async ({ query }) => {
    try {
      const page = parseInt(query.page as string) || 1;
      const limit = parseInt(query.limit as string) || 20;
      const result = await jobService.getJobs({ page, limit });
      
      return {
        success: true,
        jobs: result.jobs,
        total: result.total,
        page,
        limit
      };
    } catch (error) {
      throw new Error('Fehler beim Laden der Jobs');
    }
  })
  .get('/:id', async ({ params, set }) => {
    try {
      const job = await jobService.getJobById(params.id);
      return {
        success: true,
        job
      };
    } catch (error) {
      set.status = 404;
      return {
        success: false,
        message: 'Job nicht gefunden'
      };
    }
  })
  .post('/', async ({ body, headers, set }) => {
    try {
      const { user } = await authMiddleware({ headers, set });
      
      if (user.role !== 'employer' && user.role !== 'admin') {
        set.status = 403;
        return {
          success: false,
          message: 'Keine Berechtigung zum Erstellen von Jobs'
        };
      }

      const jobData = {
        ...body,
        employerId: user.id,
        company: user.company || body.company
      };

      const job = await jobService.createJob(jobData);
      return {
        success: true,
        message: 'Job erfolgreich erstellt',
        job
      };
    } catch (error) {
      set.status = 400;
      return {
        success: false,
        message: error instanceof Error ? error.message : 'Fehler beim Erstellen des Jobs'
      };
    }
  }, {
    body: t.Object({
      title: t.String(),
      description: t.String(),
      requirements: t.Array(t.String()),
      location: t.String(),
      type: t.Union([
        t.Literal('full-time'),
        t.Literal('part-time'),
        t.Literal('contract'),
        t.Literal('internship')
      ]),
      level: t.Union([
        t.Literal('entry'),
        t.Literal('mid'),
        t.Literal('senior'),
        t.Literal('lead')
      ]),
      salary: t.Object({
        min: t.Optional(t.Number()),
        max: t.Optional(t.Number()),
        currency: t.String()
      }),
      company: t.Optional(t.String()),
      benefits: t.Optional(t.Array(t.String())),
      remote: t.Boolean(),
      tags: t.Array(t.String()),
      expiresAt: t.String()
    })
  })
  .put('/:id', async ({ params, body, headers, set }) => {
    try {
      const { user } = await authMiddleware({ headers, set });
      
      const existingJob = await jobService.getJobById(params.id);
      if (existingJob.employerId !== user.id && user.role !== 'admin') {
        set.status = 403;
        return {
          success: false,
          message: 'Keine Berechtigung zum Bearbeiten dieses Jobs'
        };
      }

      const job = await jobService.updateJob(params.id, body);
      return {
        success: true,
        message: 'Job erfolgreich aktualisiert',
        job
      };
    } catch (error) {
      set.status = 400;
      return {
        success: false,
        message: error instanceof Error ? error.message : 'Fehler beim Aktualisieren des Jobs'
      };
    }
  })
  .delete('/:id', async ({ params, headers, set }) => {
    try {
      const { user } = await authMiddleware({ headers, set });
      
      const existingJob = await jobService.getJobById(params.id);
      if (existingJob.employerId !== user.id && user.role !== 'admin') {
        set.status = 403;
        return {
          success: false,
          message: 'Keine Berechtigung zum Löschen dieses Jobs'
        };
      }

      await jobService.deleteJob(params.id);
      return {
        success: true,
        message: 'Job erfolgreich gelöscht'
      };
    } catch (error) {
      set.status = 400;
      return {
        success: false,
        message: error instanceof Error ? error.message : 'Fehler beim Löschen des Jobs'
      };
    }
  })
  .post('/search', async ({ body }) => {
    try {
      const result = await jobService.searchJobs(body);
      return {
        success: true,
        jobs: result.jobs,
        total: result.total
      };
    } catch (error) {
      throw new Error('Fehler bei der Jobsuche');
    }
  }, {
    body: t.Object({
      query: t.Optional(t.String()),
      location: t.Optional(t.String()),
      type: t.Optional(t.Array(t.String())),
      level: t.Optional(t.Array(t.String())),
      remote: t.Optional(t.Boolean()),
      salaryMin: t.Optional(t.Number()),
      salaryMax: t.Optional(t.Number()),
      tags: t.Optional(t.Array(t.String())),
      page: t.Optional(t.Number()),
      limit: t.Optional(t.Number())
    })
  })
  .post('/:id/apply', async ({ params, headers, set }) => {
    try {
      const { user } = await authMiddleware({ headers, set });
      
      if (user.role !== 'candidate') {
        set.status = 403;
        return {
          success: false,
          message: 'Nur Kandidaten können sich bewerben'
        };
      }

      await jobService.applyToJob(params.id, user.id);
      return {
        success: true,
        message: 'Bewerbung erfolgreich eingereicht'
      };
    } catch (error) {
      set.status = 400;
      return {
        success: false,
        message: error instanceof Error ? error.message : 'Fehler bei der Bewerbung'
      };
    }
  });