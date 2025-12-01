// backend/src/controllers/admin.controller.ts

import { db, auth } from "@/config/firebase";
import { AdminUser } from "../types/admin";
import { UserRole } from "@/models/user.model";

/**
 * Holt alle Benutzer (mit Paginierung und Filterung)
 */
export const getUsersController = async ({ set }: any) => {
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
    } catch (err: any) {
        console.error("Admin: Failed to fetch users:", err);
        set.status = 500;
        return { error: 'Failed to fetch users' };
    }
};

/**
 * Holt alle Arbeitgeber
 */
export const getEmployersController = async ({ set }: any) => {
    try {
        // Beispiel: Holt alle Dokumente aus der 'employers' Collection
        const snapshot = await db.collection('employers').get();
        const employers = snapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data(),
        }));
        return employers;
    } catch (err: any) {
        console.error("Admin: Failed to fetch employers:", err);
        set.status = 500;
        return { error: 'Failed to fetch employers' };
    }
};

/**
 * Verifiziert einen Arbeitgeber.
 */
export const verifyEmployerController = async ({ params, set }: any) => {
    const { id } = params;
    try {
        await db.collection('employers').doc(id).update({
            verified: true,
            verifiedAt: new Date(),
        });
        return { message: `Employer ${id} verified.` };
    } catch (err: any) {
        console.error("Admin: Failed to verify employer:", err);
        set.status = 500;
        return { error: 'Failed to verify employer' };
    }
};

/**
 * Holt alle Job-Anzeigen
 */
export const getJobsAdminController = async ({ set }: any) => {
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
    } catch (err: any) {
        console.error("Admin: Failed to fetch jobs:", err);
        set.status = 500;
        return { error: 'Failed to fetch jobs' };
    }
};

/**
 * Holt alle Bewerbungen
 */
export const getApplicationsController = async ({ set }: any) => {
    try {
        // Beispiel: Holt alle Dokumente aus der 'applications' Collection
        const snapshot = await db.collection('applications').get();
        const applications = snapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data(),
            submittedAt: getFormattedDate(doc.data().createdAt?.toDate() || new Date()),
        }));
        return applications;
    } catch (err: any) {
        console.error("Admin: Failed to fetch applications:", err);
        set.status = 500;
        return { error: 'Failed to fetch applications' };
    }
};


/**
 * Holt Analytikdaten (Mocked)
 */
export const getAnalyticsController = async () => {
    // Generiert Mock-Daten für die Übersicht
    const monthlyApplications = Array.from({ length: 6 }).map((_, i) => {
        const date = new Date();
        date.setMonth(date.getMonth() - i);
        return {
            month: date.toLocaleString('en-US', { month: 'short', year: 'numeric' }),
            count: Math.floor(Math.random() * 50) + 50,
        };
    }).reverse(); // Vom ältesten zum neuesten

    return {
        totalUsers: 1250,
        totalEmployers: 85,
        totalJobs: 340,
        totalApplications: 6780,
        monthlyApplications: {
            labels: monthlyApplications.map(m => m.month),
            values: monthlyApplications.map(m => m.count)
        }
    };
};

/**
 * Hilfsfunktion zum Formatieren von Daten (wird im Admin Controller verwendet)
 */
export const getFormattedDate = (date: Date): string => {
    return date.toISOString().split('T')[0];
};