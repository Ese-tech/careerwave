import { Elysia, t } from 'elysia';
import { AuthService } from '../services/auth.service';
import { authSchemas } from '../schemas/auth.schema';

const authService = new AuthService();

export const authController = new Elysia({ prefix: '/auth' })
  .post('/register', async ({ body }) => {
    try {
      const result = await authService.register(body);
      return {
        success: true,
        message: 'Registrierung erfolgreich',
        ...result
      };
    } catch (error) {
      throw new Error(error instanceof Error ? error.message : 'Registrierung fehlgeschlagen');
    }
  }, {
    body: authSchemas.registerInput,
    response: t.Object({
      success: t.Boolean(),
      message: t.String(),
      user: t.Object({
        id: t.String(),
        name: t.String(),
        email: t.String(),
        role: t.String(),
        company: t.Optional(t.String()),
        createdAt: t.String()
      }),
      token: t.String()
    })
  })
  .post('/login', async ({ body }) => {
    try {
      const result = await authService.login(body);
      return {
        success: true,
        message: 'Anmeldung erfolgreich',
        ...result
      };
    } catch (error) {
      throw new Error(error instanceof Error ? error.message : 'Anmeldung fehlgeschlagen');
    }
  }, {
    body: authSchemas.loginInput
        
        const user = userDoc.data();
        
        return { 
            uid: uid,
            email: decodedToken.email,
            role: user?.role,
            token: idToken, // Wir geben das ID Token zurück, das für API-Aufrufe verwendet wird
        };

    } catch (err: any) {
        console.error("Firebase Auth Error during login:", err);
        set.status = 401;
        return { error: "Authentication failed: Invalid token or credentials" };
    }
};

/**
 * Controller zum Abrufen der aktuellen Benutzerdaten basierend auf dem Token.
 */
export const getCurrentUserController = async ({ user, set }: any) => {
    if (!user) {
        set.status = 401;
        return { error: "Unauthorized" };
    }
    
    // Holt die detaillierten Benutzerdaten aus Firestore
    try {
        const userDoc = await db.collection("users").doc(user.uid).get();
        
        if (!userDoc.exists) {
            set.status = 404;
            return { error: "User profile not found" };
        }
        
        const userData = userDoc.data();
        
        return {
            uid: user.uid,
            email: user.email,
            role: user.role,
            displayName: userData?.displayName || '',
            // Fügen Sie hier alle relevanten Profilinformationen hinzu
        };
    } catch (err) {
        set.status = 500;
        return { error: "Failed to fetch user profile" };
    }
};