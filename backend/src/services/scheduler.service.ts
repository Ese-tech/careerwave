// backend/src/services/scheduler.service.ts
import { jobSyncService } from './job-sync.service';

export class SchedulerService {
  private syncInterval: Timer | null = null;
  private readonly SYNC_INTERVAL = 24 * 60 * 60 * 1000; // 24 hours in milliseconds

  /**
   * Start the daily job synchronization scheduler
   */
  start(): void {
    console.log('⏰ Starting job sync scheduler...');
    console.log(`📅 Jobs will sync every 24 hours`);

    // Run initial sync immediately on startup
    this.runSync();

    // Schedule daily sync
    this.syncInterval = setInterval(() => {
      this.runSync();
    }, this.SYNC_INTERVAL);

    console.log('✅ Scheduler started successfully');
  }

  /**
   * Stop the scheduler
   */
  stop(): void {
    if (this.syncInterval) {
      clearInterval(this.syncInterval);
      this.syncInterval = null;
      console.log('⏹️ Scheduler stopped');
    }
  }

  /**
   * Execute the sync job
   */
  private async runSync(): Promise<void> {
    const startTime = new Date();
    console.log(`\n${'='.repeat(60)}`);
    console.log(`🕐 Job Sync Started at: ${startTime.toISOString()}`);
    console.log(`${'='.repeat(60)}\n`);

    try {
      const stats = await jobSyncService.syncJobs();
      
      const endTime = new Date();
      const duration = endTime.getTime() - startTime.getTime();
      
      console.log(`\n${'='.repeat(60)}`);
      console.log(`✅ Job Sync Completed Successfully`);
      console.log(`⏱️ Duration: ${duration}ms`);
      console.log(`📊 Results:`);
      console.log(`   - Fetched: ${stats.fetched}`);
      console.log(`   - Saved: ${stats.saved}`);
      console.log(`   - Deleted: ${stats.deleted}`);
      console.log(`   - Errors: ${stats.errors}`);
      console.log(`🕐 Next sync in 24 hours`);
      console.log(`${'='.repeat(60)}\n`);
    } catch (error) {
      console.error(`\n${'='.repeat(60)}`);
      console.error(`❌ Job Sync Failed`);
      console.error(`Error:`, error);
      console.error(`🔄 Will retry in 24 hours`);
      console.error(`${'='.repeat(60)}\n`);
    }
  }

  /**
   * Trigger manual sync (for testing or admin endpoints)
   */
  async triggerManualSync(): Promise<void> {
    console.log('🔧 Manual sync triggered by admin');
    await this.runSync();
  }

  /**
   * Get next sync time
   */
  getNextSyncTime(): Date | null {
    if (!this.syncInterval) {
      return null;
    }
    return new Date(Date.now() + this.SYNC_INTERVAL);
  }
}

export const schedulerService = new SchedulerService();
