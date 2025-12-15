// frontend/src/hooks/useArbeitsagentur.ts
import { useState, useCallback } from 'react';
import { arbeitsagenturService } from '../services/arbeitsagentur';
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
  const [jobs, setJobs] = useState<JobDetails[]>([]);
  const [totalJobs, setTotalJobs] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [facets, setFacets] = useState<any[]>([]);
  const [lastSearchParams, setLastSearchParams] = useState<JobSearchParams>({});

  const searchJobs = useCallback(async (params: JobSearchParams) => {
    setIsLoading(true);
    setError(null);
    
    try {
      const searchParams = { ...params, page: 1, size: 25 };
      const response = await arbeitsagenturService.searchJobs(searchParams);
      
      setJobs(response.stellenangebote || []);
      setTotalJobs(parseInt(response.maxErgebnisse) || 0);
      setCurrentPage(parseInt(response.page) || 1);
      setFacets(response.facetten || []);
      setLastSearchParams(searchParams);
      
      const size = parseInt(response.size) || 25;
      setTotalPages(Math.ceil((parseInt(response.maxErgebnisse) || 0) / size));
      
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to search jobs');
      setJobs([]);
      setTotalJobs(0);
      setCurrentPage(1);
      setTotalPages(0);
      setFacets([]);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const searchMore = useCallback(async () => {
    if (isLoading || currentPage >= totalPages) return;

    setIsLoading(true);
    setError(null);

    try {
      const nextPage = currentPage + 1;
      const searchParams = { ...lastSearchParams, page: nextPage };
      const response = await arbeitsagenturService.searchJobs(searchParams);
      
      setJobs(prevJobs => [...prevJobs, ...(response.stellenangebote || [])]);
      setCurrentPage(nextPage);
      
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load more jobs');
    } finally {
      setIsLoading(false);
    }
  }, [isLoading, currentPage, totalPages, lastSearchParams]);

  const clearResults = useCallback(() => {
    setJobs([]);
    setTotalJobs(0);
    setCurrentPage(1);
    setTotalPages(0);
    setError(null);
    setFacets([]);
    setLastSearchParams({});
  }, []);

  return {
    jobs,
    totalJobs,
    currentPage,
    totalPages,
    isLoading,
    error,
    searchJobs,
    searchMore,
    clearResults,
    facets,
  };
};