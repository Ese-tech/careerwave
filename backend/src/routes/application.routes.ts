// backend/src/routes/application.routes.ts
import { Elysia, t } from 'elysia';
import { authGuard } from '../middleware/auth.middleware';
import { 
  createApplicationController, 
  getApplicationsByJobController,
  getCandidateApplicationsController,
  updateApplicationController,
  deleteApplicationController,
  getAllApplicationsController
} from '../controllers/application.controller';
import { CreateApplicationSchema } from '../schemas/application.schema';

export default new Elysia({ prefix: '/applications' })
  // Get applications by job (public)
  .get('/by-job/:jobId', getApplicationsByJobController, {
    params: t.Object({ jobId: t.String() })
  })
  
  // Protected routes - require authentication
  .use(authGuard())
  
  // Create application (requires login)
  .post('/', createApplicationController, {
    body: CreateApplicationSchema
  })
  
  // Get candidate's own applications
  .get('/my-applications', getCandidateApplicationsController)
  
  // Update application
  .patch('/:id', updateApplicationController, {
    params: t.Object({ id: t.String() })
  })
  
  // Delete application
  .delete('/:id', deleteApplicationController, {
    params: t.Object({ id: t.String() })
  })
  
  // Get all applications (Admin only)
  .get('/all', getAllApplicationsController);
