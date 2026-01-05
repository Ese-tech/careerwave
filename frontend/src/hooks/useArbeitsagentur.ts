// frontend/src/hooks/useArbeitsagentur.ts
import { useState, useCallback } from 'react';
// import { arbeitsagenturService } from '../services/arbeitsagentur';
import type { JobDetails, JobSearchParams } from '../types/arbeitsagentur';

interface UseArbeitsagenturReturn {
  jobs: JobDetails[];
  totalJobs: number;
  currentPage: number;
  totalPages: number;
  isLoading: boolean;
  error: string | null;
  searchJobs: (params: JobSearchParams) => Promise<void>;
  searchMore: () => Promise<void>;
  clearResults: () => void;
  facets: any[];
}

export const useArbeitsagentur = (): UseArbeitsagenturReturn => {
  return {
    jobs: [],
    totalJobs: 0,
    currentPage: 1,
    totalPages: 0,
    isLoading: false,
    error: 'Arbeitsagentur API deprecated. Use new jobService.',
    searchJobs: async () => {},
    searchMore: async () => {},
    clearResults: () => {},
    facets: [],
  };
};