// frontend/src/pages/Jobs/JobsListings.tsx

import React, { useEffect, useState } from 'react';
import { fetchJobs } from '../../services/jobService';
import { JobList } from '../../components/JobList';
import type { JobDetails } from '../../types/arbeitsagentur';


const JobsListings: React.FC = () => {
  const [jobs, setJobs] = useState<JobDetails[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const limit = 10;

  useEffect(() => {
    const loadJobs = async () => {
      setLoading(true);
      setError(null);
        try {
          const { jobs: fetchedJobs, total } = await fetchJobs({ page, limit });
          setJobs(fetchedJobs || []);
          setTotal(total || 0);
        } catch (err: any) {
          setError('Fehler beim Laden der Jobs');
        } finally {
          setLoading(false);
        }
    };
    loadJobs();
  }, [page]);

  if (loading) {
    return <div className="max-w-4xl mx-auto p-6">Jobs werden geladen...</div>;
  }
  if (error) {
    return <div className="max-w-4xl mx-auto p-6 text-red-600">{error}</div>;
  }
  if (!jobs.length && !loading) {
    return <div className="max-w-4xl mx-auto p-6">Keine Jobs gefunden.</div>;
  }

  // Pagination controls
  const totalPages = Math.ceil(total / limit);
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <div className="max-w-4xl mx-auto p-6">
      <JobList jobs={jobs} />
      {totalPages > 1 && (
        <div className="flex justify-center mt-6 space-x-2">
          {pages.map((p) => (
            <button
              key={p}
              className={`px-3 py-1 rounded ${p === page ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
              onClick={() => setPage(p)}
              disabled={p === page}
            >
              {p}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default JobsListings;
