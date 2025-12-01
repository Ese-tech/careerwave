// frontend/src/api/jobs.ts
import { api, type ApiResponse } from '../services/api';
import type { Job } from '../types/job';

export interface JobFilters {
  search?: string;
  location?: string;
  jobType?: string;
  salaryMin?: number;
  salaryMax?: number;
  page?: number;
  limit?: number;
}

export interface CreateJobRequest {
  title: string;
  companyName: string;
  location: string;
  salaryRange: string;
  jobType: 'Full-time' | 'Part-time' | 'Contract' | 'Internship';
  description: string;
  requirements: string[];
}

export interface JobsResponse {
  jobs: Job[];
  total: number;
  page: number;
  totalPages: number;
}

export const jobsApi = {
  async getJobs(filters: JobFilters = {}, token?: string): Promise<ApiResponse<JobsResponse>> {
    const queryParams = new URLSearchParams();
    
    Object.entries(filters).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        queryParams.append(key, value.toString());
      }
    });
    
    const query = queryParams.toString();
    const endpoint = query ? `/jobs?${query}` : '/jobs';
    
    return api.get<JobsResponse>(endpoint, token);
  },

  async getJobById(id: string, token?: string): Promise<ApiResponse<Job>> {
    return api.get<Job>(`/jobs/${id}`, token);
  },

  async createJob(data: CreateJobRequest, token: string): Promise<ApiResponse<Job>> {
    return api.post<Job>('/jobs', data, token);
  },

  async updateJob(id: string, data: Partial<CreateJobRequest>, token: string): Promise<ApiResponse<Job>> {
    return api.put<Job>(`/jobs/${id}`, data, token);
  },

  async deleteJob(id: string, token: string): Promise<ApiResponse<void>> {
    return api.delete<void>(`/jobs/${id}`, token);
  },

  async applyToJob(jobId: string, applicationData: any, token: string): Promise<ApiResponse<any>> {
    return api.post<any>(`/jobs/${jobId}/apply`, applicationData, token);
  },

  async getMyApplications(token: string): Promise<ApiResponse<any[]>> {
    return api.get<any[]>('/jobs/my-applications', token);
  }
};