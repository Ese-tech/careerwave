import React, { useEffect, useState } from 'react';
import { api } from '../services/api';

interface Application {
  id: string;
  jobId: string;
  name: string;
  email: string;
  nachricht: string;
  createdAt: string;
}

const Applications: React.FC = () => {
  const [applications, setApplications] = useState<Application[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchApplications() {
      setLoading(true);
      setError(null);
      try {
        const res = await api.get<{ applications: Application[] }>('/users/applications');
        if (res.success && res.data) {
          setApplications(res.data.applications);
        } else {
          setError(res.error || 'Fehler beim Laden der Bewerbungen');
        }
      } catch (e: any) {
        setError(e.message || 'Fehler beim Laden der Bewerbungen');
      } finally {
        setLoading(false);
      }
    }
    fetchApplications();
  }, []);

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Meine Bewerbungen</h1>
      {loading && <p>Lade Bewerbungen...</p>}
      {error && <p className="text-red-600">{error}</p>}
      {!loading && !error && applications.length === 0 && <p>Keine Bewerbungen gefunden.</p>}
      <ul className="space-y-4">
        {applications.map(app => (
          <li key={app.id} className="bg-white rounded shadow p-4">
            <div className="font-semibold">Job-ID: {app.jobId}</div>
            <div>Bewerber: {app.name} ({app.email})</div>
            <div>Nachricht: {app.nachricht}</div>
            <div className="text-sm text-gray-500">Eingereicht am: {new Date(app.createdAt).toLocaleString('de-DE')}</div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Applications;
