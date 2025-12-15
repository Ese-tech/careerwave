// backend/src/routes/application.routes.ts
import { Elysia, t } from 'elysia';
import { createApplicationController, getApplicationsByJobController } from '../controllers/application.controller';
import { CreateApplicationSchema } from '../schemas/application.schema';

export default new Elysia({ prefix: '/applications' })
  .post('/', createApplicationController, {
    body: CreateApplicationSchema
  })
  .get('/by-job/:jobId', getApplicationsByJobController, {
    params: t.Object({ jobId: t.String() })
  });
