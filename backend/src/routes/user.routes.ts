//backend/src/routes/user.routes.ts
import { Elysia, t } from "elysia";
import { db } from "../config/firebase";
import { authGuard } from "../middleware/auth.middleware";

export default new Elysia({ prefix: "/users" })
    .use(authGuard())
    
    // Get user profile
    .get('/profile', async ({ user, set }) => {
        try {
            if (!user) {
                set.status = 401;
                return {
                    success: false,
                    error: 'Nicht authentifiziert'
                };
            }
            
            // Fetch complete profile data from Firestore
            const userDoc = await db.collection('users').doc(user.uid).get();
            
            if (!userDoc.exists) {
                // Return basic user data if document doesn't exist
                return {
                    success: true,
                    data: user
                };
            }
            
            // Merge auth data with Firestore data
            const firestoreData = userDoc.data();
            const completeProfile = {
                uid: user.uid,
                email: user.email,
                role: user.role,
                ...firestoreData
            };
            
            console.log('📦 Sending profile data:', completeProfile);
            
            return {
                success: true,
                data: completeProfile
            };
        } catch (error: any) {
            console.error('Error fetching profile:', error);
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
            if (!user || !user.uid) {
                set.status = 401;
                return {
                    success: false,
                    error: 'Nicht autorisiert'
                };
            }
            // Fetch applications for the current user from Firestore
            const snapshot = await db.collection('applications').where('userId', '==', user.uid).get();
            const applications = snapshot.docs.map((doc: any) => ({
                id: doc.id,
                ...doc.data(),
            }));
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
