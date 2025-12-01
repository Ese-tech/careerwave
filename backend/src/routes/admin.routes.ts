// backend/src/routes/admin.routes.ts
import { Elysia, t } from "elysia";
import { adminAuthGuard } from "../middleware/auth.middleware";
import { 
    getUsersController, 
    getEmployersController, 
    getJobsAdminController,
    verifyEmployerController
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
    
    // Employer management
    .get("/employers", getEmployersController, {
        detail: { tags: ['Admin'], summary: 'Get all employers' }
    })
    .patch("/employers/:id/verify", verifyEmployerController, {
        params: t.Object({ id: t.String() }),
        body: t.Object({
            verified: t.Boolean(),
            notes: t.Optional(t.String())
        }),
        detail: { tags: ['Admin'], summary: 'Verify an employer' }
    })
    
    // Job management
    .get("/jobs", getJobsAdminController, {
        detail: { tags: ['Admin'], summary: 'Get all jobs' }
    })

    // Application management
    .get("/applications", async ({ set }) => {
        try {
            // Mock applications data for now
            return {
                success: true,
                data: [
                    {
                        id: '1',
                        jobId: 'job1',
                        candidateId: 'user1',
                        status: 'pending',
                        appliedAt: new Date().toISOString(),
                        job: {
                            title: 'Software Developer',
                            companyName: 'Tech Corp'
                        },
                        candidate: {
                            displayName: 'John Doe',
                            email: 'john@example.com'
                        }
                    }
                ]
            };
        } catch (error: any) {
            set.status = 500;
            return {
                success: false,
                error: error.message
            };
        }
    }, {
        detail: { tags: ['Admin'], summary: 'Get all job applications' }
    })

    // Analytics
    .get("/stats", async ({ set }) => {
        try {
            // Mock analytics data
            return {
                success: true,
                data: {
                    totalUsers: 150,
                    totalEmployers: 25,
                    totalJobs: 45,
                    totalApplications: 320,
                    monthlyApplications: [
                        { month: 'Jan', count: 45 },
                        { month: 'Feb', count: 52 },
                        { month: 'Mar', count: 48 },
                        { month: 'Apr', count: 61 },
                        { month: 'May', count: 55 },
                        { month: 'Jun', count: 67 }
                    ]
                }
            };
        } catch (error: any) {
            set.status = 500;
            return {
                success: false,
                error: error.message
            };
        }
    }, {
        detail: { tags: ['Admin'], summary: 'Get site analytics' }
    });