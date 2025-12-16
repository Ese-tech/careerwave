// backend/src/routes/admin.routes.ts
import { Elysia, t } from "elysia";
import { adminAuthGuard } from "../middleware/auth.middleware";
import {
    getUsersController,
    getEmployersController,
    getJobsAdminController,
    getApplicationsController,
    verifyEmployerController,
    getAnalyticsController,
    deleteUserController,
    deleteJobController,
    deleteApplicationController
} from '../controllers/admin.controller';

export default new Elysia({ prefix: "/admin" })
    // Apply admin guard to all admin routes
    .use(adminAuthGuard)
    .get("/", () => ({ message: "Admin API OK" }), {
        detail: { tags: ['Admin'], summary: 'Admin API status check' }
    })
    
    // User management
    .get("/users", getUsersController, {
        detail: { tags: ['Admin'], summary: 'Get all users' }
    })
    .delete("/users/:id", deleteUserController, {
        params: t.Object({ id: t.String() }),
        detail: { tags: ['Admin'], summary: 'Delete user' }
    })
    
    // Employer management
    .get("/employers", getEmployersController, {
        detail: { tags: ['Admin'], summary: 'Get all employers' }
    })
    .patch("/employers/:id/verify", verifyEmployerController, {
        params: t.Object({ id: t.String() }),
        body: t.Object({
            verified: t.Boolean(),
        }),
        detail: { tags: ['Admin'], summary: 'Verify employer' }
    })
    
    // Job management
    .get("/jobs", getJobsAdminController, {
        detail: { tags: ['Admin'], summary: 'Get all jobs' }
    })
    .delete("/jobs/:id", deleteJobController, {
        params: t.Object({ id: t.String() }),
        detail: { tags: ['Admin'], summary: 'Delete job' }
    })
    
    // Application management
    .get("/applications", getApplicationsController, {
        detail: { tags: ['Admin'], summary: 'Get all applications' }
    })
    .delete("/applications/:id", deleteApplicationController, {
        params: t.Object({ id: t.String() }),
        detail: { tags: ['Admin'], summary: 'Delete application' }
    })
    
    // Analytics
    .get("/analytics", getAnalyticsController, {
        detail: { tags: ['Admin'], summary: 'Get analytics overview' }
    });
    