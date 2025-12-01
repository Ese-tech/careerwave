// backend/src/routes/job.routes.ts
import { Elysia, t } from 'elysia';
import { authGuard } from '../middleware/auth.middleware';
import * as jobController from '../controllers/job.controller.functions';

export default new Elysia({ prefix: '/jobs' })
  // Public routes
  .get('/', jobController.getJobsController)
  .get('/:id', jobController.getJobByIdController, {
    params: t.Object({
      id: t.String()
    })
  })
  
  // Protected routes (employer/admin) 
  .use(authGuard('employer'))
  .post('/', jobController.createJobController, {
    body: t.Object({
      title: t.String(),
      companyName: t.String(),
      description: t.String(),
      location: t.String(),
      salaryRange: t.String(),
      jobType: t.Union([
        t.Literal('Full-time'),
        t.Literal('Part-time'), 
        t.Literal('Contract'),
        t.Literal('Internship')
      ]),
      requirements: t.Array(t.String())
    })
  })
  .put('/:id', jobController.updateJobController, {
    params: t.Object({
      id: t.String()
    }),
    body: t.Partial(t.Object({
      title: t.String(),
      companyName: t.String(),
      description: t.String(),
      location: t.String(),
      salaryRange: t.String(),
      jobType: t.Union([
        t.Literal('Full-time'),
        t.Literal('Part-time'),
        t.Literal('Contract'), 
        t.Literal('Internship')
      ]),
      requirements: t.Array(t.String())
    }))
  })
  .delete('/:id', async ({ params, user, set }) => {
    try {
      // Implementation would delete job from database
      return {
        success: true,
        message: 'Job deleted successfully'
      };
    } catch (error: any) {
      set.status = 500;
      return {
        success: false,
        error: error.message
      };
    }
  }, {
    params: t.Object({
      id: t.String()
    })
  });
