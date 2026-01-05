// careerwave/frontend/src/components/JobList.tsx
import React from 'react';
import { Link } from 'react-router-dom';
import type { JobDetails } from '../types/arbeitsagentur';

interface JobListProps {
  jobs: JobDetails[];
}


export const JobList: React.FC<JobListProps> = ({ jobs }) => (
  <div className="grid gap-4">
    {jobs.filter(job => !!job.hashId).map(job => (
      <Link
        key={job.hashId}
        to={`/jobs/${job.hashId}`}
        state={{ job }}
        className="bg-white rounded shadow p-4 flex flex-col md:flex-row justify-between items-center cursor-pointer hover:bg-gray-100 no-underline"
      >
        <div>
          <h2 className="text-lg font-bold mb-1">{job.titel}</h2>
          <div className="text-gray-700 mb-1">{job.arbeitgeber}</div>
          <div className="text-gray-500 text-sm mb-1">{job.arbeitsorte?.map(o => o.ort).join(', ')}</div>
          <div className="text-sm text-gray-600">{job.arbeitszeitmodelle?.join(', ') || 'k.A.'} | {job.befristung}</div>
        </div>
        <span className="mt-2 md:mt-0 bg-yellow-400 hover:bg-yellow-500 text-black px-4 py-2 rounded">Details</span>
      </Link>
    ))}
  </div>
);
