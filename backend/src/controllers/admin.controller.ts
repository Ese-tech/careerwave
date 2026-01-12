// backend/src/controllers/admin.controller.ts

import { db, auth } from "@/config/firebase";
import { AdminUser } from "../types/admin";
import { UserRole } from "@/models/user.model";

interface ElysiaContext {
  params: Record<string, string>;
  set: {
    status?: number;
  };
}

/**
 * Löscht einen Benutzer (User) aus Firestore und Auth
 */
export const deleteUserController = async ({ params, set }: ElysiaContext) => {
    try {
        const { id } = params;
        // Lösche aus Auth
        await auth.deleteUser(id);
        // Lösche aus Firestore
        await db.collection('users').doc(id).delete();
        return { success: true, message: `User ${id} deleted.` };
    } catch (err) {
        set.status = 500;
        return { success: false, error: err instanceof Error ? err.message : 'Unknown error' };
    }
};

/**
 * Löscht einen Job aus Firestore
 */
export const deleteJobController = async ({ params, set }: ElysiaContext) => {
    try {
        const { id } = params;
        await db.collection('jobs').doc(id).delete();
        return { success: true, message: `Job ${id} deleted.` };
    } catch (err) {
        set.status = 500;
        return { success: false, error: err instanceof Error ? err.message : 'Unknown error' };
    }
};

/**
 * Löscht eine Bewerbung aus Firestore
 */
export const deleteApplicationController = async ({ params, set }: ElysiaContext) => {
    try {
        const { id } = params;
        await db.collection('applications').doc(id).delete();
        return { success: true, message: `Application ${id} deleted.` };
    } catch (err) {
        set.status = 500;
        return { success: false, error: err instanceof Error ? err.message : 'Unknown error' };
    }
};

/**
 * Holt alle Benutzer (mit Paginierung und Filterung)
 */
export const getUsersController = async ({ set }: Pick<ElysiaContext, 'set'>) => {
    try {
        // Verwende Firebase Admin SDK zum Abrufen der Auth-Benutzer
        const listUsersResult = await auth.listUsers(1000); // Max 1000 für Demo

        const users: AdminUser[] = listUsersResult.users.map(userRecord => ({
            uid: userRecord.uid,
            email: userRecord.email || 'N/A',
            displayName: userRecord.displayName || 'N/A',
            role: (userRecord.customClaims?.role as UserRole) || 'candidate',
            emailVerified: userRecord.emailVerified,
            disabled: userRecord.disabled,
            createdAt: userRecord.metadata.creationTime,
        }));

        // In einer echten App würde man hier die Firestore-Daten mergen,
        // um die 'role' und andere Profilfelder zu erhalten.

        return users;
    } catch (err) {
        console.error("Admin: Failed to fetch users:", err);
        set.status = 500;
        return { error: 'Failed to fetch users' };
    }
};

/**
 * Holt alle Arbeitgeber
 */
export const getEmployersController = async ({ set }: Pick<ElysiaContext, 'set'>) => {
    try {
        // Beispiel: Holt alle Dokumente aus der 'employers' Collection
        const snapshot = await db.collection('employers').get();
        const employers = snapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data(),
        }));
        return employers;
    } catch (err) {
        console.error("Admin: Failed to fetch employers:", err);
        set.status = 500;
        return { error: 'Failed to fetch employers' };
    }
};

/**
 * Verifiziert einen Arbeitgeber.
 */
export const verifyEmployerController = async ({ params, set }: ElysiaContext) => {
    const { id } = params;
    try {
        await db.collection('employers').doc(id).update({
            verified: true,
            verifiedAt: new Date(),
        });
        return { message: `Employer ${id} verified.` };
    } catch (err) {
        console.error("Admin: Failed to verify employer:", err);
        set.status = 500;
        return { error: 'Failed to verify employer' };
    }
};

/**
 * Holt alle Job-Anzeigen
 */
export const getJobsAdminController = async ({ set }: Pick<ElysiaContext, 'set'>) => {
    try {
        // Beispiel: Holt alle Dokumente aus der 'jobs' Collection
        const snapshot = await db.collection('jobs').get();
        const jobs = snapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data(),
            companyName: 'Mock Company', // Muss mit Employer-Daten gemergt werden
            postedAt: getFormattedDate(doc.data().createdAt?.toDate() || new Date()),
        }));
        return jobs;
    } catch (err) {
        console.error("Admin: Failed to fetch jobs:", err);
        set.status = 500;
        return { error: 'Failed to fetch jobs' };
    }
};

/**
 * Holt alle Bewerbungen
 */
export const getApplicationsController = async ({ set }: Pick<ElysiaContext, 'set'>) => {
    try {
        // Beispiel: Holt alle Dokumente aus der 'applications' Collection
        const snapshot = await db.collection('applications').get();
        const applications = snapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data(),
            submittedAt: getFormattedDate(doc.data().createdAt?.toDate() || new Date()),
        }));
        return applications;
    } catch (err) {
        console.error("Admin: Failed to fetch applications:", err);
        set.status = 500;
        return { error: 'Failed to fetch applications' };
    }
};


/**
 * Holt Analytikdaten (Mocked)
 */
export const getAnalyticsController = async () => {
    try {
        // Count users
        const usersSnap = await db.collection('users').get();
        const totalUsers = usersSnap.size;

        // Count employers
        const employersSnap = await db.collection('employers').get();
        const totalEmployers = employersSnap.size;

        // Count jobs
        const jobsSnap = await db.collection('jobs').get();
        const totalJobs = jobsSnap.size;

        // Count applications
        const applicationsSnap = await db.collection('applications').get();
        const totalApplications = applicationsSnap.size;

        // Monthly applications (last 6 months)
        const now = new Date();
        const monthlyApplications = [];
        for (let i = 5; i >= 0; i--) {
            const start = new Date(now.getFullYear(), now.getMonth() - i, 1);
            const end = new Date(now.getFullYear(), now.getMonth() - i + 1, 1);
            const monthSnap = await db.collection('applications')
                .where('createdAt', '>=', start)
                .where('createdAt', '<', end)
                .get();
            monthlyApplications.push({
                month: start.toLocaleString('en-US', { month: 'short', year: 'numeric' }),
                count: monthSnap.size
            });
        }

        return {
            totalUsers,
            totalEmployers,
            totalJobs,
            totalApplications,
            monthlyApplications: {
                labels: monthlyApplications.map(m => m.month),
                values: monthlyApplications.map(m => m.count)
            }
        };
    } catch (err) {
        console.error('Admin: Failed to fetch analytics:', err);
        return { error: 'Failed to fetch analytics' };
    }
};

/**
 * Hilfsfunktion zum Formatieren von Daten (wird im Admin Controller verwendet)
 */
export const getFormattedDate = (date: Date): string => {
    return date.toISOString().split('T')[0];
};