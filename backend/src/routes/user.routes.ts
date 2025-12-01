//backend/src/routes/user.routes.ts
import { Elysia, t } from "elysia";
import { authGuard } from "../middleware/auth.middleware";

export default new Elysia({ prefix: "/users" })
    .use(authGuard())
    
    // Get user profile
    .get('/profile', async ({ user, set }) => {
        try {
            return {
                success: true,
                data: user
            };
        } catch (error: any) {
            set.status = 500;
            return {
                success: false,
                error: error.message
            };
        }
    })
    
    // Update user profile
    .put('/profile', async ({ body, user, set }) => {
        try {
            // Implementation would update user in database
            const updatedUser = {
                ...user,
                ...body,
                updatedAt: new Date()
            };
            
            return {
                success: true,
                data: updatedUser,
                message: 'Profile updated successfully'
            };
        } catch (error: any) {
            set.status = 500;
            return {
                success: false,
                error: error.message
            };
        }
    }, {
        body: t.Partial(t.Object({
            displayName: t.String(),
            bio: t.String(),
            skills: t.Array(t.String()),
            experience: t.String(),
            education: t.String(),
            linkedinUrl: t.String(),
            githubUrl: t.String(),
            portfolioUrl: t.String()
        }))
    })
    
    // Get user applications
    .get('/applications', async ({ user, set }) => {
        try {
            // Mock applications data
            const applications = [
                {
                    id: '1',
                    jobId: 'job1',
                    status: 'pending',
                    appliedAt: new Date().toISOString(),
                    job: {
                        title: 'Software Developer',
                        companyName: 'Tech Corp',
                        location: 'Berlin'
                    }
                }
            ];
            
            return {
                success: true,
                data: applications
            };
        } catch (error: any) {
            set.status = 500;
            return {
                success: false,
                error: error.message
            };
        }
    });
