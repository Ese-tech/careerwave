// backend/src/middleware/auth.middleware.ts

import { Elysia, t } from "elysia";
import { auth, db } from "@/config/firebase";
import { UserRole } from "@/models/user.model";
import jwt from 'jsonwebtoken';

// Verify JWT token (from our login system)
async function verifyJWT(token: string) {
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as {
      userId: string;
      email: string;
      role: UserRole;
    };
    return {
      uid: decoded.userId,
      email: decoded.email,
      role: decoded.role
    };
  } catch (error) {
    return null;
  }
}

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
        let token = headers['authorization'];

        if (!token) {
            set.status = 401;
            throw new Error('Authentication required');
        }

        // Remove "Bearer " prefix if present
        if (token.startsWith('Bearer ')) {
            token = token.substring(7);
        }

        // Try JWT first (our own auth system)
        const jwtUser = await verifyJWT(token);
        if (jwtUser) {
            const user: AuthenticatedUser = {
                uid: jwtUser.uid,
                email: jwtUser.email,
                role: jwtUser.role,
            };

            // Check required role
            if (requiredRole && jwtUser.role !== requiredRole) {
                set.status = 403;
                throw new Error('Forbidden access: Insufficient privileges');
            }

            return { user };
        }

        // Try Firebase ID Token as fallback
        let decodedToken;
        try {
            decodedToken = await verifyFirebaseIdToken(token);
        } catch (error) {
            set.status = 401;
            throw new Error('Invalid or expired token');
        }

        if (!decodedToken) {
            set.status = 401;
            throw new Error('Invalid or expired token');
        }

        // Holen der Rolle aus der Datenbank (alternativ könnte man Custom Claims verwenden)
        const role = await getUserRoleFromDb(decodedToken.uid);

        if (!role) {
            set.status = 403;
            throw new Error('User role not found');
        }

        const user: AuthenticatedUser = {
            uid: decodedToken.uid,
            email: decodedToken.email || '',
            role: role,
        };

        // Prüfen, ob die erforderliche Rolle erfüllt ist
        if (requiredRole && role !== requiredRole) {
            set.status = 403;
            throw new Error('Forbidden access: Insufficient privileges');
        }

        // Benutzer im Kontext speichern
        return { user };
    });

/**
 * Spezieller Hook, um sicherzustellen, dass nur Admins auf die Route zugreifen.
 */
export const adminAuthGuard = authGuard('admin');