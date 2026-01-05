// frontend/src/pages/Jobs/JobsPage.tsx

import React, { useEffect, useState } from 'react';
import { JobList } from '../../components/JobList';
import { fetchJobs } from '../../services/jobService';
import type { JobDetails } from '../../types/arbeitsagentur';

export const JobsPage: React.FC = () => {
  const [jobs, setJobs] = useState<JobDetails[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setIsLoading(true);
    fetchJobs()
      .then(setJobs)
      .catch(() => setError('Fehler beim Laden der Jobs.'))
      .finally(() => setIsLoading(false));
  }, []);

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-6">Stellenangebote</h1>
      <JobList jobs={jobs} />
      {isLoading && <div className="mt-4 text-blue-600">Lade Jobs...</div>}
      {error && <div className="mt-4 text-red-600">{error}</div>}
    </div>
  );
};

export default JobsPage;