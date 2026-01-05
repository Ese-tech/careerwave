import React from 'react';
import type { JobDetails } from '../types/arbeitsagentur';

interface JobDetailsProps {
  job?: JobDetails | null;
}

export const JobDetailsView: React.FC<JobDetailsProps> = ({ job }) => {
  if (!job) {
    return (
      <div className="bg-white rounded shadow p-6 text-center text-gray-600">
        <h2 className="text-xl font-bold mb-2 text-red-600">Keine Jobdaten verfügbar</h2>
        <p className="mb-4">Diese Detailseite wurde direkt aufgerufen oder es sind keine Suchdaten vorhanden.<br/>Bitte gehe über die Jobsuche, um alle verfügbaren Informationen zu sehen.</p>
      </div>
    );
  }
  return (
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
};
