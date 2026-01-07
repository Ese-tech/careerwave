// backend/src/routes/employer.routes.ts

import { Elysia } from 'elysia';
import { authGuard } from '../middleware/auth.middleware';
import {
	createJobController,
	updateJobController,
	deleteJobController,
	getOwnJobsController,
	getJobApplicationsController,
	getAllEmployerApplicationsController,
	updateApplicationStatusController
} from '../controllers/employer.controller';

const employerRoutes = new Elysia({ prefix: '/employer' })
	.use(authGuard())
	.post('/jobs', createJobController)
	.put('/jobs/:id', updateJobController)
	.delete('/jobs/:id', deleteJobController)
	.get('/jobs', getOwnJobsController)
	.get('/jobs/:id/applications', getJobApplicationsController)
	.get('/applications', getAllEmployerApplicationsController)
	.patch('/applications/:id', updateApplicationStatusController);

export default employerRoutes;
