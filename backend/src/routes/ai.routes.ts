// backend/src/routes/ai.routes.ts
import { Elysia } from 'elysia';
import { generateCoverLetterController } from '../controllers/ai.controller';
import { authGuard } from '../middleware/auth';

export const aiRoutes = new Elysia({ prefix: '/ai' })
  .use(authGuard)
  .post('/cover-letter', async ({ user, body }) => {
    return await generateCoverLetterController({ user, body });
  });
