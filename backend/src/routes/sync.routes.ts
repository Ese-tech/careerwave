// backend/src/routes/sync.routes.ts
import { Elysia } from 'elysia';
import { jobSyncService } from '../services/job-sync.service';
import { schedulerService } from '../services/scheduler.service';
import { authGuard } from '../middleware/auth.middleware';

export const syncRoutes = new Elysia({ prefix: '/sync' })
  .use(authGuard())
  .get('/stats', async () => {
    try {
      const stats = await jobSyncService.getStats();
      const nextSync = schedulerService.getNextSyncTime();

      return {
        success: true,
        data: {
          ...stats,
          nextSync: nextSync?.toISOString() || null
        }
      };
    } catch (error: any) {
      return {
        success: false,
        error: error.message || 'Failed to get sync stats'
      };
    }
  })
  .post('/trigger', async ({ user }) => {
    try {
      // Only admin can trigger manual sync
      if (user.role !== 'admin') {
        return {
          success: false,
          error: 'Unauthorized: Admin access required'
        };
      }

      console.log(`🔧 Manual sync triggered by admin: ${user.email}`);
      const stats = await jobSyncService.triggerManualSync();

      return {
        success: true,
        message: 'Job sync completed',
        data: stats
      };
    } catch (error: any) {
      return {
        success: false,
        error: error.message || 'Failed to trigger sync'
      };
    }
  });
