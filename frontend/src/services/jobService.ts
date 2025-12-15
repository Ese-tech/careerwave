// frontend/src/services/jobService.ts
import { config } from '../config/env';
import type { JobDetails } from '../types/arbeitsagentur';

export async function fetchJobs(params: Record<string, any> = {}) {
  const searchParams = new URLSearchParams(params);
  const res = await fetch(`${config.api.baseUrl}/jobs?${searchParams.toString()}`);
  if (!res.ok) throw new Error('Failed to fetch jobs');
  const data = await res.json();
  return data.jobs as JobDetails[];
}

export async function fetchJobDetails(id: string) {
  const res = await fetch(`${config.api.baseUrl}/jobs/${id}`);
  if (!res.ok) throw new Error('Failed to fetch job details');
  const data = await res.json();
  return data.job as JobDetails;
}
