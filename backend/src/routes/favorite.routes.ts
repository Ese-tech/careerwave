// backend/src/routes/favorite.routes.ts
import { Elysia, t } from 'elysia';
import { authGuard } from '../middleware/auth.middleware';
import { addFavoriteController, getFavoritesController, removeFavoriteController } from '../controllers/favorite.controller';

export default new Elysia({ prefix: '/favorites' })
  .use(authGuard())
  .post('/', addFavoriteController, {
    body: t.Object({ jobId: t.String() })
  })
  .get('/', getFavoritesController)
  .delete('/:id', removeFavoriteController, {
    params: t.Object({ id: t.String() })
  });
