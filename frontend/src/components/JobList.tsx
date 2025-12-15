import React from 'react';
import { Link } from 'react-router-dom';
import type { JobDetails } from '../types/arbeitsagentur';

interface JobListProps {
  jobs: JobDetails[];
}

export const JobList: React.FC<JobListProps> = ({ jobs }) => (
  <div className="grid gap-4">
    {jobs.map(job => (
      <div key={job.hashId} className="bg-white rounded shadow p-4 flex flex-col md:flex-row justify-between items-center">
        <div>
          <h2 className="text-lg font-bold mb-1">{job.titel}</h2>
          <div className="text-gray-700 mb-1">{job.arbeitgeber}</div>
          <div className="text-gray-500 text-sm mb-1">{job.arbeitsorte?.map(o => o.ort).join(', ')}</div>
          <div className="text-sm text-gray-600">{job.arbeitszeitmodelle?.join(', ')} | {job.befristung}</div>
        </div>
        <Link to={`/jobs/${job.hashId}`} className="mt-2 md:mt-0 bg-yellow-400 hover:bg-yellow-500 text-black px-4 py-2 rounded">
          Details
        </Link>
      </div>
    ))}
  </div>
);
