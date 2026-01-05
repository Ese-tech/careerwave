// frontend/src/services/jobService.ts
import { config } from '../config/env';
import type { JobDetails } from '../types/arbeitsagentur';

export async function fetchJobs(params: Record<string, any> = {}) {
  // Remove undefined or empty string params
  const filtered: Record<string, any> = {};
  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== '') {
      filtered[key] = value;
    }
  });
  const searchParams = new URLSearchParams(filtered);
  const res = await fetch(`${config.api.baseUrl}/jobs?${searchParams.toString()}`);
  if (!res.ok) throw new Error('Failed to fetch jobs');
  const data = await res.json();
  return data;
}

export async function fetchJobDetails(id: string) {
  const res = await fetch(`${config.api.baseUrl}/jobs/${id}`);
  if (!res.ok) throw new Error('Failed to fetch job details');
  const data = await res.json();
  return data.job as JobDetails;
}
