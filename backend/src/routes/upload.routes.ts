// backend/src/routes/upload.routes.ts
import { Elysia, t } from 'elysia';
import { authGuard } from '../middleware/auth.middleware';
import { uploadFileController } from '../controllers/upload.controller';

export default new Elysia({ prefix: '/upload' })
  .use(authGuard())
  .post('/cv', uploadFileController, {
    body: t.Object({ type: t.Optional(t.String()) }),
    files: t.Object({ file: t.File() })
  })
  .post('/cover-letter', uploadFileController, {
    body: t.Object({ type: t.Optional(t.String()) }),
    files: t.Object({ file: t.File() })
  });
