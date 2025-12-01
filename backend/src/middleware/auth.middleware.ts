// backend/src/middleware/auth.middleware.ts

import { Elysia, t } from "elysia";
import { auth, db } from "@/config/firebase";
import { UserRole } from "@/models/user.model";

// Firebase ID Token verification
async function verifyFirebaseIdToken(idToken: string) {
  try {
    const decodedToken = await auth.verifyIdToken(idToken);
    return decodedToken;
  } catch (error) {
    throw new Error('Invalid Firebase ID token');
  }
}

// Get user role from database
async function getUserRoleFromDb(uid: string): Promise<UserRole> {
  try {
    const userDoc = await db.collection('users').doc(uid).get();
    if (!userDoc.exists) {
      return 'candidate'; // default role
    }
    return userDoc.data()?.role || 'candidate';
  } catch (error) {
    console.error('Error getting user role:', error);
    return 'candidate';
  }
}

// Definiert den Typ der Benutzerdaten, die in den Kontext injiziert werden
export interface AuthenticatedUser {
    uid: string;
    email: string;
    role: UserRole;
}

/**
 * Autorisierungshook, um den Token zu validieren und die Benutzerrolle zu prüfen.
 * @param requiredRole Die erforderliche Rolle ('candidate', 'employer', 'admin', oder undefined für nur Authentifizierung)
 */
export const authGuard = (requiredRole?: UserRole) => (app: Elysia) =>
    app.derive(async ({ headers, set }) => {
        const token = headers['authorization'];

        if (!token) {
            set.status = 401;
            return { user: null, error: 'Authentication required' };
        }

        const decodedToken = await verifyFirebaseIdToken(token);

        if (!decodedToken) {
            set.status = 401;
            return { user: null, error: 'Invalid or expired token' };
        }

        // Holen der Rolle aus der Datenbank (alternativ könnte man Custom Claims verwenden)
        const role = await getUserRoleFromDb(decodedToken.uid);

        if (!role) {
            set.status = 403;
            return { user: null, error: 'User role not found' };
        }

        const user: AuthenticatedUser = {
            uid: decodedToken.uid,
            email: decodedToken.email || '',
            role: role,
        };

        // Prüfen, ob die erforderliche Rolle erfüllt ist
        if (requiredRole && role !== requiredRole) {
            set.status = 403;
            return { user: null, error: 'Forbidden access: Insufficient privileges' };
        }

        // Benutzer im Kontext speichern
        return { user, error: null };
    });

/**
 * Spezieller Hook, um sicherzustellen, dass nur Admins auf die Route zugreifen.
 */
export const adminAuthGuard = authGuard('admin');