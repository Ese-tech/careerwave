// backend/src/routes/settings.routes.ts
import { Elysia } from 'elysia';
import { adminAuthGuard } from '@/middleware/auth.middleware';
import { 
  getSettingsController, 
  updateSettingsController 
} from '@/controllers/settings.controller';

export const settingsRoutes = new Elysia({ prefix: '/settings' })
  .use(adminAuthGuard)
  .get('/', async ({ user }) => {
    return await getSettingsController({ user });
  })
  .put('/', async ({ user, body }) => {
    return await updateSettingsController({ user, body });
  });
