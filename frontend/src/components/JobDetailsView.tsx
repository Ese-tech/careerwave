import React from 'react';
import type { JobDetails } from '../types/arbeitsagentur';

interface JobDetailsProps {
  job: JobDetails;
}

export const JobDetailsView: React.FC<JobDetailsProps> = ({ job }) => (
  <div className="bg-white rounded shadow p-6">
    <h1 className="text-2xl font-bold mb-2">{job.titel}</h1>
    <div className="mb-2 text-gray-700">{job.arbeitgeber}</div>
    <div className="mb-2 text-gray-500">{job.arbeitsorte?.map(o => o.ort).join(', ')}</div>
    <div className="mb-2 text-sm text-gray-600">{job.arbeitszeitmodelle?.join(', ')} | {job.befristung}</div>
    <div className="mb-4 text-gray-800">{job.stellenbeschreibung}</div>
    <div className="mb-2">
      <span className="font-semibold">Gehalt:</span> {job.verguetung}
    </div>
    <div className="mb-2">
      <span className="font-semibold">Veröffentlicht am:</span> {job.ersteVeroeffentlichungsdatum}
    </div>
    {/* Add more fields as needed */}
  </div>
);
