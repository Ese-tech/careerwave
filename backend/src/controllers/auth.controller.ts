import { Elysia, t } from 'elysia';
import { AuthService } from '../services/auth.service';

const authService = new AuthService();

export const authController = new Elysia({ prefix: '/auth' })
  .get('/', () => ({
    message: 'Auth API is working',
    endpoints: [
      'POST /register - Register new user',
      'POST /login - Login user', 
      'POST /logout - Logout user',
      'GET /me - Get current user'
    ]
  }))
  .post('/register', async ({ body, set }) => {
    try {
      // Convert displayName to firstName/lastName
      const { name, email, password, role, company } = body;
      const nameParts = name.trim().split(' ');
      const firstName = nameParts[0] || name;
      const lastName = nameParts.slice(1).join(' ') || '';
      
      const registerData = {
        email,
        password,
        firstName,
        lastName,
        role,
        company
      };
      
      const result = await authService.register(registerData);
      return {
        success: true,
        message: 'Registrierung erfolgreich',
        ...result
      };
    } catch (error) {
      set.status = 400;
      return {
        success: false,
        message: error instanceof Error ? error.message : 'Registrierung fehlgeschlagen'
      };
    }
  }, {
    body: t.Object({
      name: t.String(),
      email: t.String(),
      password: t.String(),
      role: t.Union([t.Literal('candidate'), t.Literal('employer')]),
      company: t.Optional(t.String())
    })
  })
  .post('/login', async ({ body, set }) => {
    try {
      const result = await authService.login(body);
      return {
        success: true,
        message: 'Anmeldung erfolgreich',
        ...result
      };
    } catch (error) {
      set.status = 401;
      return {
        success: false,
        message: error instanceof Error ? error.message : 'Anmeldung fehlgeschlagen'
      };
    }
  }, {
    body: t.Object({
      email: t.String(),
      password: t.String()
    })
  })
  .get('/me', async ({ headers, set }) => {
    try {
      const authHeader = headers.authorization;
      if (!authHeader || !authHeader.startsWith('Bearer ')) {
        set.status = 401;
        return {
          success: false,
          message: 'Token erforderlich'
        };
      }

      const token = authHeader.replace('Bearer ', '');
      const payload = await authService.verifyToken(token);
      const user = await authService.getUserById(payload.userId);

      return {
        success: true,
        user
      };
    } catch (error) {
      set.status = 401;
      return {
        success: false,
        message: 'Ungültiger Token'
      };
    }
  })
  .post('/logout', () => {
    return {
      success: true,
      message: 'Erfolgreich abgemeldet'
    };
  });