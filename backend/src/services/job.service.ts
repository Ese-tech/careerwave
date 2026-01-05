// backend/src/services/job.service.ts
import { db } from '../config/firebase';
import { nanoid } from 'nanoid';
import type { CreateJobInput, UpdateJobInput, JobFilterInput, ApplicationInput } from '../schemas/job.schema';
import { adzunaService } from './adzuna.service';

export class JobService {
  async createJob(jobData: CreateJobInput, employerId: string) {
    try {
      const jobId = nanoid();
      
      const jobDoc = {
        id: jobId,
        ...jobData,
        employerId,
        status: 'active',
        applicationCount: 0,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      await db.collection('jobs').doc(jobId).set(jobDoc);
      return jobDoc;
    } catch (error) {
      throw error;
    }
  }

  async getJobs(filters: JobFilterInput) {
    try {
      // Serve jobs from DB, fallback to Adzuna if DB is empty
      const page = filters.page || 1;
      const limit = filters.limit || 10;
      console.log('[JobService] Fetching jobs with filters:', { page, limit });
      
      // 1. Try to get jobs from DB (adzuna_jobs collection)
      let jobs = await adzunaService.getJobsFromDB(page, limit);
      let total = await adzunaService.countJobsInDB();
      console.log('[JobService] DB results:', { jobsCount: jobs.length, total });

      // 2. If DB is empty, fetch 100-150 jobs from Adzuna, cache, and serve
      if (total === 0) {
        console.log('[JobService] DB empty, fetching from Adzuna...');
        // Fetch 3 pages of 50 jobs each (max 150)
        let allJobs: any[] = [];
        for (let p = 1; p <= 3; p++) {
          const adzunaData = await adzunaService.fetchJobs(p, 50);
          if (adzunaData.results && adzunaData.results.length > 0) {
            allJobs = allJobs.concat(adzunaData.results);
          }
          if (allJobs.length >= 150) break;
        }
        // Limit to 150
        allJobs = allJobs.slice(0, 150);
        console.log('[JobService] Fetched from Adzuna:', allJobs.length, 'jobs');
        await adzunaService.cacheJobsToDB(allJobs);
        jobs = await adzunaService.getJobsFromDB(page, limit);
        total = await adzunaService.countJobsInDB();
      }

      return {
        jobs,
        page,
        limit,
        total,
      };
    } catch (error) {
      console.error('[JobService] Error in getJobs:', error);
      throw error;
    }
  }

  async getJobById(jobId: string) {
    // Try to get job from DB (adzuna_jobs)
    let job = await adzunaService.findJobInDBById(jobId);
    if (job) return job;
    // If not found, fetch from Adzuna, cache, and return
    try {
      const adzunaData = await adzunaService.fetchJobs(1, 1, { id: jobId });
      if (adzunaData.results && adzunaData.results.length > 0) {
        const adzunaJob = adzunaData.results[0];
        await adzunaService.cacheJobsToDB([adzunaJob]);
        return adzunaJob;
      }
      throw new Error('Job not found');
    } catch (error) {
      throw new Error('Job not found');
    }
  }

  async updateJob(jobId: string, updateData: UpdateJobInput, employerId: string) {
    try {
      const jobRef = db.collection('jobs').doc(jobId);
      const jobDoc = await jobRef.get();
      
      if (!jobDoc.exists) {
        throw new Error('Job not found');
      }

      const job = jobDoc.data();
      if (job?.employerId !== employerId) {
        throw new Error('Unauthorized');
      }

      await jobRef.update({
        ...updateData,
        updatedAt: new Date()
      });

      return await this.getJobById(jobId);
    } catch (error) {
      throw error;
    }
  }

  async deleteJob(jobId: string, employerId: string) {
    try {
      const jobRef = db.collection('jobs').doc(jobId);
      const jobDoc = await jobRef.get();
      
      if (!jobDoc.exists) {
        throw new Error('Job not found');
      }

      const job = jobDoc.data();
      if (job?.employerId !== employerId) {
        throw new Error('Unauthorized');
      }

      await jobRef.delete();
      return { success: true };
    } catch (error) {
      throw error;
    }
  }

  async applyForJob(applicationData: ApplicationInput, candidateId: string) {
    try {
      const jobDoc = await db.collection('jobs').doc(applicationData.jobId).get();
      if (!jobDoc.exists) {
        throw new Error('Job not found');
      }

      const existingApplication = await db.collection('applications')
        .where('jobId', '==', applicationData.jobId)
        .where('candidateId', '==', candidateId)
        .limit(1)
        .get();

      if (!existingApplication.empty) {
        throw new Error('Already applied for this job');
      }

      const applicationId = nanoid();
      const application = {
        id: applicationId,
        jobId: applicationData.jobId,
        candidateId,
        coverLetter: applicationData.coverLetter || '',
        resumeUrl: applicationData.resumeUrl || '',
        status: 'pending',
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      await db.collection('applications').doc(applicationId).set(application);

      await db.collection('jobs').doc(applicationData.jobId).update({
        applicationCount: (jobDoc.data()?.applicationCount || 0) + 1
      });

      return application;
    } catch (error) {
      throw error;
    }
  }

  async getApplicationsByJob(jobId: string, employerId: string) {
    try {
      const jobDoc = await db.collection('jobs').doc(jobId).get();
      if (!jobDoc.exists || jobDoc.data()?.employerId !== employerId) {
        throw new Error('Unauthorized');
      }

      const applicationsSnapshot = await db.collection('applications')
        .where('jobId', '==', jobId)
        .orderBy('createdAt', 'desc')
        .get();

      const applications = applicationsSnapshot.docs.map(doc => doc.data());

      for (const application of applications) {
        const candidateDoc = await db.collection('users').doc(application.candidateId).get();
        if (candidateDoc.exists) {
          const candidateData = candidateDoc.data();
          (application as any).candidate = {
            id: candidateData?.id,
            firstName: candidateData?.firstName,
            lastName: candidateData?.lastName,
            email: candidateData?.email,
            profile: candidateData?.profile
          };
        }
      }

      return applications;
    } catch (error) {
      throw error;
    }
  }

  async getApplicationsByCandidate(candidateId: string) {
    try {
      const applicationsSnapshot = await db.collection('applications')
        .where('candidateId', '==', candidateId)
        .orderBy('createdAt', 'desc')
        .get();

      const applications = applicationsSnapshot.docs.map(doc => doc.data());

      for (const application of applications) {
        const jobDoc = await db.collection('jobs').doc(application.jobId).get();
        if (jobDoc.exists) {
          (application as any).job = jobDoc.data();
        }
      }

      return applications;
    } catch (error) {
      throw error;
    }
  }
}