// backend/src/routes/jobAlert.routes.ts
import { Elysia, t } from 'elysia';
import { authGuard } from '../middleware/auth.middleware';
import { addJobAlertController, getJobAlertsController, removeJobAlertController } from '../controllers/jobAlert.controller';

export default new Elysia({ prefix: '/job-alerts' })
  .use(authGuard())
  .post('/', addJobAlertController, {
    body: t.Object({
      keywords: t.String(),
      location: t.Optional(t.String()),
      email: t.String()
    })
  })
  .get('/', getJobAlertsController)
  .delete('/:id', removeJobAlertController, {
    params: t.Object({ id: t.String() })
  });
