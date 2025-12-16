// frontend/src/pages/Jobs/JobsPage.tsx
import React, { useEffect, useState } from 'react';
import { JobList } from '../../components/JobList';
import { JobDetailsView } from '../../components/JobDetailsView';
import { UploadCV } from '../../components/UploadCV';
import { fetchJobs, fetchJobDetails } from '../../services/jobService';
import { submitApplication } from '../../services/applyService';
import type { JobDetails } from '../../types/arbeitsagentur';

export const JobsPage: React.FC = () => {
  const [jobs, setJobs] = useState<JobDetails[]>([]);
  const [selectedJob, setSelectedJob] = useState<JobDetails | null>(null);
  const [applicationStatus, setApplicationStatus] = useState<string | null>(null);
  const [cvFile, setCvFile] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);


  useEffect(() => {
    setIsLoading(true);
    fetchJobs()
      .then(setJobs)
      .catch(() => setError('Fehler beim Laden der Jobs.'))
      .finally(() => setIsLoading(false));
  }, []);

  const handleUpload = (file: File) => {
    setCvFile(file);
  };

  const handleApply = async () => {
    if (!selectedJob) return;
    setIsLoading(true);
    try {
      // For demo, use dummy data. In real app, collect from user form.
      await submitApplication({
        jobId: selectedJob.hashId,
        name: 'Max Mustermann',
        email: 'max@example.com',
        nachricht: 'Ich bewerbe mich auf diese Stelle.'
      });
      setApplicationStatus('Bewerbung erfolgreich eingereicht!');
    } catch (e) {
      setApplicationStatus('Fehler beim Einreichen der Bewerbung.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleJobClick = async (jobId: string) => {
    setIsLoading(true);
    try {
      const job = await fetchJobDetails(jobId);
      setSelectedJob(job);
      setApplicationStatus(null);
    } catch {
      setError('Fehler beim Laden der Jobdetails.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-6">Stellenangebote</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <JobList jobs={jobs} onJobClick={job => handleJobClick(job.hashId)} />
        </div>
        <div>
          {selectedJob ? (
            <>
              <JobDetailsView job={selectedJob} />
              <UploadCV onUpload={handleUpload} />
              <button
                className="mt-4 bg-blue-600 text-white px-4 py-2 rounded"
                onClick={handleApply}
                disabled={!cvFile || isLoading}
              >
                Jetzt bewerben
              </button>
              {applicationStatus && (
                <div className="mt-2 text-green-600">{applicationStatus}</div>
              )}
            </>
          ) : (
            <div className="text-gray-500">Bitte wählen Sie eine Stelle aus.</div>
          )}
        </div>
      </div>
      {error && <div className="mt-4 text-red-600">{error}</div>}
    </div>
  );
};

export default JobsPage;