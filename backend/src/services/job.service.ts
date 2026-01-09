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
      const page = filters.page || 1;
      const limit = filters.limit || 10;
      console.log('[JobService] Fetching jobs with filters:', { page, limit });
      
      // Get jobs from the 'jobs' collection (populated by the scheduler)
      const jobsRef = db.collection('jobs');
      
      // Get total count
      const totalSnapshot = await jobsRef.get();
      const total = totalSnapshot.size;
      
      // Get paginated jobs (sorted by syncedAt - newest first)
      const offset = (page - 1) * limit;
      const snapshot = await jobsRef
        .orderBy('syncedAt', 'desc')
        .offset(offset)
        .limit(limit)
        .get();
      
      const jobs = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      
      console.log('[JobService] Loaded from DB:', { jobsCount: jobs.length, total, page, limit });

      // If no jobs in DB yet, return empty array (scheduler will populate it)
      if (total === 0) {
        console.log('[JobService] ⚠️ No jobs in database yet. Scheduler will populate soon...');
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
    try {
      // Try to get job from 'jobs' collection
      const jobDoc = await db.collection('jobs').doc(jobId).get();
      
      if (jobDoc.exists) {
        return {
          id: jobDoc.id,
          ...jobDoc.data()
        };
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