// backend/src/services/adzuna.service.ts
import axios from 'axios';
import { db } from '../config/firebase';

const ADZUNA_APP_ID = process.env.ADZUNA_APP_ID;
const ADZUNA_APP_KEY = process.env.ADZUNA_APP_KEY;
const ADZUNA_COUNTRY = process.env.ADZUNA_COUNTRY || 'de';
const ADZUNA_BASE_URL = `https://api.adzuna.com/v1/api/jobs/${ADZUNA_COUNTRY}`;

export interface AdzunaJob {
  id: string;
  title: string;
  description: string;
  company: { display_name: string };
  location: { display_name: string };
  created: string;
  redirect_url: string;
  salary_min?: number;
  salary_max?: number;
  category?: { label: string };
  // ...add more fields as needed
}

export class AdzunaService {
  async fetchJobs(page = 1, results = 50, params: Record<string, any> = {}) {
    const url = `${ADZUNA_BASE_URL}/search/${page}`;
    const searchParams = new URLSearchParams({
      app_id: ADZUNA_APP_ID!,
      app_key: ADZUNA_APP_KEY!,
      results_per_page: results.toString(),
      ...params
    });
    const { data } = await axios.get(url + '?' + searchParams.toString(), {
      headers: {
        'Content-Type': 'application/json'
      }
    });
    return data;
  }

  /**
   * Search jobs with specified parameters
   * Used by job-sync.service for daily synchronization
   */
  async searchJobs(params: {
    what?: string;
    where?: string;
    results_per_page?: number;
    page?: number;
    [key: string]: any;
  }) {
    const url = `${ADZUNA_BASE_URL}/search/${params.page || 1}`;
    const searchParams = new URLSearchParams({
      app_id: ADZUNA_APP_ID!,
      app_key: ADZUNA_APP_KEY!,
      results_per_page: (params.results_per_page || 50).toString(),
      ...(params.what && { what: params.what }),
      ...(params.where && { where: params.where }),
    });
    
    try {
      const { data } = await axios.get(url + '?' + searchParams.toString(), {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      return data;
    } catch (error: any) {
      console.error('❌ Adzuna API error:', error.message);
      throw error;
    }
  }

  async cacheJobsToDB(jobs: AdzunaJob[]) {
    const batch = db.batch();
    jobs.forEach(job => {
      // Remove reserved Firestore fields like __CLASS__
      const cleanJob = { ...job };
      delete (cleanJob as any).__CLASS__;
      if (cleanJob.company) {
        const cleanCompany = { ...(cleanJob.company as any) };
        delete cleanCompany.__CLASS__;
        cleanJob.company = cleanCompany as any;
      }
      if (cleanJob.location) {
        const cleanLocation = { ...(cleanJob.location as any) };
        delete cleanLocation.__CLASS__;
        cleanJob.location = cleanLocation as any;
      }
      if (cleanJob.category) {
        const cleanCategory = { ...(cleanJob.category as any) };
        delete cleanCategory.__CLASS__;
        cleanJob.category = cleanCategory as any;
      }
      
      const ref = db.collection('adzuna_jobs').doc(job.id);
      batch.set(ref, cleanJob, { merge: true });
    });
    await batch.commit();
  }

  async getJobsFromDB(page = 1, pageSize = 10, query: any = {}) {
    let ref = db.collection('adzuna_jobs');
    // Add query filters if needed
    const snapshot = await ref.orderBy('created', 'desc')
      .offset((page - 1) * pageSize)
      .limit(pageSize)
      .get();
    const jobs = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    return jobs;
  }

  async countJobsInDB() {
    const snapshot = await db.collection('adzuna_jobs').get();
    return snapshot.size;
  }

  async findJobInDBById(id: string) {
    const doc = await db.collection('adzuna_jobs').doc(id).get();
    return doc.exists ? doc.data() : null;
  }
}

export const adzunaService = new AdzunaService();
