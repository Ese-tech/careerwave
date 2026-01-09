// backend/src/services/job-sync.service.ts
import { db } from '../config/firebase';
import { adzunaService } from './adzuna.service';
import axios from 'axios';

interface SyncStats {
  fetched: number;
  saved: number;
  deleted: number;
  errors: number;
  sources: {
    adzuna: number;
    arbeitsagentur: number;
  };
}

export class JobSyncService {
  private readonly MAX_JOBS = 200;
  private readonly COLLECTION_NAME = 'jobs';
  private readonly BA_API_URL = process.env.BA_API_URL || 'https://rest.arbeitsagentur.de/jobboerse/jobsuche-service';
  private readonly BA_API_KEY = process.env.BA_API_KEY || 'jobboerse-jobsuche';

  /**
   * Synchronize jobs from both Adzuna and Arbeitsagentur APIs
   * Fetches new jobs and maintains only the 200 most recent ones
   */
  async syncJobs(): Promise<SyncStats> {
    console.log('🔄 Starting job synchronization from multiple sources...');
    const stats: SyncStats = {
      fetched: 0,
      saved: 0,
      deleted: 0,
      errors: 0,
      sources: {
        adzuna: 0,
        arbeitsagentur: 0
      }
    };

    try {
      const allJobs: any[] = [];

      // 1. Fetch jobs from Adzuna API
      try {
        console.log('📥 Fetching jobs from Adzuna API...');
        const adzunaResults = await adzunaService.searchJobs({
          what: '',
          where: 'Deutschland',
          results_per_page: 50,
          page: 1
        });

        if (adzunaResults.results && adzunaResults.results.length > 0) {
          // Transform Adzuna jobs to common format
          const adzunaJobs = adzunaResults.results.map((job: any) => ({
            ...job,
            source: 'adzuna',
            id: `adzuna_${job.id}`,
            // Normalize fields
            title: job.title,
            company: job.company?.display_name,
            location: job.location?.display_name,
            description: job.description,
            created: job.created,
            salary_min: job.salary_min,
            salary_max: job.salary_max,
            contract_type: job.contract_type,
            url: job.redirect_url
          }));
          
          allJobs.push(...adzunaJobs);
          stats.sources.adzuna = adzunaJobs.length;
          console.log(`✅ Fetched ${adzunaJobs.length} jobs from Adzuna`);
        }
      } catch (error) {
        console.error('❌ Error fetching from Adzuna:', error);
        stats.errors++;
      }

      // 2. Fetch jobs from Arbeitsagentur API
      try {
        console.log('📥 Fetching jobs from Arbeitsagentur API...');
        const baResponse = await axios.get(`${this.BA_API_URL}/pc/v4/jobs`, {
          headers: {
            'X-API-Key': this.BA_API_KEY,
            'Accept': 'application/json',
            'User-Agent': 'CareerWave/1.0.0'
          },
          params: {
            was: '',
            wo: 'Deutschland',
            page: 0,
            size: 50
          }
        });

        if (baResponse.data?.stellenangebote && baResponse.data.stellenangebote.length > 0) {
          // Transform Arbeitsagentur jobs to common format
          const baJobs = baResponse.data.stellenangebote.map((job: any) => ({
            source: 'arbeitsagentur',
            id: `ba_${job.hashId || job.refnr}`,
            // Normalize fields
            title: job.titel,
            company: job.arbeitgeber,
            location: job.arbeitsorte?.[0] ? `${job.arbeitsorte[0].ort}, ${job.arbeitsorte[0].plz}` : 'Deutschland',
            description: job.stellenbeschreibung,
            created: job.modifikationsTimestamp || job.aktuelleVeroeffentlichungsdatum,
            salary_min: null,
            salary_max: null,
            contract_type: job.befristung,
            url: `https://www.arbeitsagentur.de/jobsuche/jobdetail/${job.hashId}`,
            // Keep original data for detail view
            originalData: job
          }));

          allJobs.push(...baJobs);
          stats.sources.arbeitsagentur = baJobs.length;
          console.log(`✅ Fetched ${baJobs.length} jobs from Arbeitsagentur`);
        }
      } catch (error: any) {
        console.error('❌ Error fetching from Arbeitsagentur:', error.message);
        stats.errors++;
      }

      stats.fetched = allJobs.length;
      console.log(`✅ Total fetched: ${stats.fetched} jobs (Adzuna: ${stats.sources.adzuna}, Arbeitsagentur: ${stats.sources.arbeitsagentur})`);

      if (stats.fetched === 0) {
        console.log('⚠️ No jobs fetched from any API');
        return stats;
      }

      // 3. Save new jobs to Firestore
      console.log('💾 Saving jobs to Firestore...');
      const batch = db.batch();
      const jobsRef = db.collection(this.COLLECTION_NAME);

      for (const job of allJobs) {
        try {
          const docRef = jobsRef.doc(job.id);

          // Clean job data - remove reserved Firestore fields
          const cleanJob = this.cleanJobData(job);

          batch.set(docRef, {
            ...cleanJob,
            syncedAt: new Date().toISOString(),
            createdAt: job.created || new Date().toISOString(),
          }, { merge: true });

          stats.saved++;
        } catch (error) {
          console.error(`❌ Error saving job ${job.id}:`, error);
          stats.errors++;
        }
      }

      await batch.commit();
      console.log(`✅ Saved ${stats.saved} jobs to Firestore`);

      // 3. Cleanup old jobs (keep only 200 newest)
      await this.cleanupOldJobs(stats);

      console.log('✅ Job synchronization completed');
      console.log(`📊 Stats: Fetched: ${stats.fetched}, Saved: ${stats.saved}, Deleted: ${stats.deleted}, Errors: ${stats.errors}`);

      return stats;
    } catch (error) {
      console.error('❌ Job synchronization failed:', error);
      stats.errors++;
      throw error;
    }
  }

  /**
   * Clean job data by removing reserved Firestore fields and undefined/null values
   * Firestore reserves fields starting with __ and doesn't accept undefined
   */
  private cleanJobData(job: any): any {
    const cleanJob = { ...job };
    
    // Remove __CLASS__ and other reserved fields
    delete cleanJob.__CLASS__;
    
    // Remove undefined and null values (replace with empty string or 0)
    Object.keys(cleanJob).forEach(key => {
      if (cleanJob[key] === undefined) {
        delete cleanJob[key]; // Remove undefined fields
      } else if (cleanJob[key] === null) {
        // Keep null for optional fields, or replace with default
        if (key === 'salary_min' || key === 'salary_max') {
          cleanJob[key] = 0; // Default to 0 for salary fields
        }
      }
    });
    
    // Clean nested objects
    if (cleanJob.company && typeof cleanJob.company === 'object') {
      const cleanCompany = { ...cleanJob.company };
      delete cleanCompany.__CLASS__;
      Object.keys(cleanCompany).forEach(key => {
        if (cleanCompany[key] === undefined) delete cleanCompany[key];
      });
      cleanJob.company = cleanCompany;
    }
    
    if (cleanJob.location && typeof cleanJob.location === 'object') {
      const cleanLocation = { ...cleanJob.location };
      delete cleanLocation.__CLASS__;
      Object.keys(cleanLocation).forEach(key => {
        if (cleanLocation[key] === undefined) delete cleanLocation[key];
      });
      cleanJob.location = cleanLocation;
    }
    
    if (cleanJob.category && typeof cleanJob.category === 'object') {
      const cleanCategory = { ...cleanJob.category };
      delete cleanCategory.__CLASS__;
      Object.keys(cleanCategory).forEach(key => {
        if (cleanCategory[key] === undefined) delete cleanCategory[key];
      });
      cleanJob.category = cleanCategory;
    }
    
    return cleanJob;
  }

  /**
   * Remove old jobs to maintain only MAX_JOBS (200) in database
   * Keeps the newest jobs based on createdAt or syncedAt
   */
  private async cleanupOldJobs(stats: SyncStats): Promise<void> {
    try {
      console.log('🧹 Cleaning up old jobs...');
      const jobsRef = db.collection(this.COLLECTION_NAME);

      // Get all jobs ordered by date (newest first)
      const snapshot = await jobsRef
        .orderBy('syncedAt', 'desc')
        .get();

      const totalJobs = snapshot.size;
      console.log(`📊 Total jobs in database: ${totalJobs}`);

      if (totalJobs <= this.MAX_JOBS) {
        console.log(`✅ No cleanup needed (${totalJobs}/${this.MAX_JOBS})`);
        return;
      }

      // Calculate how many to delete
      const jobsToDelete = totalJobs - this.MAX_JOBS;
      console.log(`🗑️ Deleting ${jobsToDelete} old jobs...`);

      // Get jobs to delete (oldest ones)
      const oldJobsSnapshot = await jobsRef
        .orderBy('syncedAt', 'asc')
        .limit(jobsToDelete)
        .get();

      // Delete in batches (Firestore limit: 500 operations per batch)
      const batchSize = 500;
      let batch = db.batch();
      let operationCount = 0;

      for (const doc of oldJobsSnapshot.docs) {
        batch.delete(doc.ref);
        operationCount++;
        stats.deleted++;

        // Commit batch if it reaches the limit
        if (operationCount >= batchSize) {
          await batch.commit();
          batch = db.batch();
          operationCount = 0;
        }
      }

      // Commit remaining operations
      if (operationCount > 0) {
        await batch.commit();
      }

      console.log(`✅ Deleted ${stats.deleted} old jobs`);
      console.log(`📊 Database now contains ${this.MAX_JOBS} jobs`);
    } catch (error) {
      console.error('❌ Cleanup failed:', error);
      throw error;
    }
  }

  /**
   * Get synchronization statistics
   */
  async getStats(): Promise<{
    totalJobs: number;
    lastSync: string | null;
    oldestJob: string | null;
    newestJob: string | null;
    sources: {
      adzuna: number;
      arbeitsagentur: number;
    };
  }> {
    try {
      const jobsRef = db.collection(this.COLLECTION_NAME);
      
      // Get total count
      const snapshot = await jobsRef.get();
      const totalJobs = snapshot.size;

      // Count by source
      let adzunaCount = 0;
      let arbeitsagenturCount = 0;
      
      snapshot.docs.forEach(doc => {
        const data = doc.data();
        if (data.source === 'adzuna') {
          adzunaCount++;
        } else if (data.source === 'arbeitsagentur') {
          arbeitsagenturCount++;
        }
      });

      // Get last sync time (newest job's syncedAt)
      const newestSnapshot = await jobsRef
        .orderBy('syncedAt', 'desc')
        .limit(1)
        .get();

      const lastSync = newestSnapshot.empty ? null : newestSnapshot.docs[0].data().syncedAt;
      const newestJob = newestSnapshot.empty ? null : newestSnapshot.docs[0].data().title;

      // Get oldest job
      const oldestSnapshot = await jobsRef
        .orderBy('syncedAt', 'asc')
        .limit(1)
        .get();

      const oldestJob = oldestSnapshot.empty ? null : oldestSnapshot.docs[0].data().title;

      return {
        totalJobs,
        lastSync,
        oldestJob,
        newestJob,
        sources: {
          adzuna: adzunaCount,
          arbeitsagentur: arbeitsagenturCount
        }
      };
    } catch (error) {
      console.error('❌ Error getting stats:', error);
      throw error;
    }
  }

  /**
   * Manual trigger for job sync (for testing or admin use)
   */
  async triggerManualSync(): Promise<SyncStats> {
    console.log('🔧 Manual sync triggered');
    return await this.syncJobs();
  }
}

export const jobSyncService = new JobSyncService();
