// frontend/src/pages/Employer/EmployerJobs.tsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { api } from '../../services/api';

interface Job {
  id: string;
  title: string;
  description: string;
  location: string;
  locationType: string;
  contractType: string;
  status: string;
  published: boolean;
  createdAt?: Date;
  postedAt?: Date;
  imageUrl?: string;
  salaryMin?: number;
  salaryMax?: number;
}

const EmployerJobs: React.FC = () => {
  const navigate = useNavigate();
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await api.get('/employer/jobs');
      if (response.success) {
        setJobs(response.jobs || []);
      } else {
        setError(response.error || 'Fehler beim Laden der Jobs');
      }
    } catch (err: any) {
      setError(err.message || 'Fehler beim Laden der Jobs');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (jobId: string) => {
    if (!confirm('Möchten Sie diese Stellenanzeige wirklich löschen?')) {
      return;
    }

    try {
      const response = await api.delete(`/employer/jobs/${jobId}`);
      if (response.success) {
        setJobs(jobs.filter(job => job.id !== jobId));
      } else {
        alert(response.error || 'Fehler beim Löschen der Stellenanzeige');
      }
    } catch (err: any) {
      alert(err.message || 'Fehler beim Löschen der Stellenanzeige');
    }
  };

  const getContractTypeLabel = (type: string) => {
    const labels: Record<string, string> = {
      'full-time': 'Vollzeit',
      'part-time': 'Teilzeit',
      'contract': 'Vertrag',
      'internship': 'Praktikum',
    };
    return labels[type] || type;
  };

  const getLocationTypeLabel = (type: string) => {
    const labels: Record<string, string> = {
      'onsite': 'Vor Ort',
      'remote': 'Remote',
      'hybrid': 'Hybrid',
    };
    return labels[type] || type;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold text-gray-900 mb-2">
              Meine Stellenanzeigen
            </h1>
            <p className="text-gray-600">
              Verwalten Sie Ihre veröffentlichten Jobs
            </p>
          </div>
          <Button
            onClick={() => navigate('/employer/jobs/create')}
            className="bg-gradient-to-r from-teal-500 to-blue-600 hover:from-teal-600 hover:to-blue-700 text-white px-6 py-3 rounded-xl font-bold shadow-lg hover:shadow-xl transition-all"
          >
            + Neue Stellenanzeige
          </Button>
        </div>

        {/* Error Message */}
        {error && (
          <div className="mb-6 p-4 bg-red-50 border-2 border-red-200 text-red-700 rounded-xl">
            <div className="flex items-center gap-2">
              <span className="text-2xl">⚠️</span>
              <p className="font-semibold">{error}</p>
            </div>
          </div>
        )}

        {/* Loading State */}
        {loading && (
          <div className="flex justify-center items-center py-12">
            <div className="animate-spin text-4xl">🔄</div>
          </div>
        )}

        {/* Jobs List */}
        {!loading && jobs.length === 0 && (
          <Card className="p-12 text-center rounded-2xl border border-gray-200 bg-white shadow-lg">
            <div className="text-6xl mb-4">📋</div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">
              Keine Stellenanzeigen gefunden
            </h3>
            <p className="text-gray-600 mb-6">
              Erstellen Sie Ihre erste Stellenanzeige, um Kandidaten zu erreichen
            </p>
            <Button
              onClick={() => navigate('/employer/jobs/create')}
              className="bg-gradient-to-r from-teal-500 to-blue-600 hover:from-teal-600 hover:to-blue-700 text-white px-8 py-3 rounded-xl font-bold"
            >
              Stellenanzeige erstellen
            </Button>
          </Card>
        )}

        {!loading && jobs.length > 0 && (
          <div className="grid gap-6">
            {jobs.map((job) => (
              <Card
                key={job.id}
                className="p-6 hover:shadow-2xl transition-all rounded-2xl border border-gray-100 bg-white"
              >
                <div className="flex gap-6">
                  {/* Job Image */}
                  {job.imageUrl && (
                    <div className="flex-shrink-0">
                      <img
                        src={job.imageUrl}
                        alt={job.title}
                        className="w-32 h-32 object-cover rounded-xl"
                      />
                    </div>
                  )}

                  {/* Job Details */}
                  <div className="flex-1">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h2 className="text-2xl font-bold text-gray-900 mb-2">
                          {job.title}
                        </h2>
                        <div className="flex flex-wrap gap-2 mb-2">
                          <span className="inline-flex items-center px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
                            📍 {job.location}
                          </span>
                          <span className="inline-flex items-center px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-sm font-medium">
                            💼 {getContractTypeLabel(job.contractType)}
                          </span>
                          <span className="inline-flex items-center px-3 py-1 bg-orange-100 text-orange-800 rounded-full text-sm font-medium">
                            🏠 {getLocationTypeLabel(job.locationType)}
                          </span>
                          {job.salaryMin && job.salaryMax && (
                            <span className="inline-flex items-center px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium">
                              💰 €{job.salaryMin.toLocaleString()} - €{job.salaryMax.toLocaleString()}
                            </span>
                          )}
                        </div>
                      </div>
                      <div className="flex flex-col items-end gap-2">
                        <span
                          className={`px-4 py-2 rounded-lg text-sm font-bold ${
                            job.published
                              ? 'bg-green-100 text-green-800'
                              : 'bg-gray-100 text-gray-800'
                          }`}
                        >
                          {job.published ? '✓ Veröffentlicht' : '○ Entwurf'}
                        </span>
                        {job.postedAt && (
                          <span className="text-sm text-gray-500">
                            Erstellt: {new Date(job.postedAt).toLocaleDateString('de-DE')}
                          </span>
                        )}
                      </div>
                    </div>

                    <p className="text-gray-700 mb-4 line-clamp-2">
                      {job.description}
                    </p>

                    {/* Action Buttons */}
                    <div className="flex gap-3">
                      <Button
                        onClick={() => navigate(`/employer/jobs/${job.id}/applications`)}
                        className="bg-teal-100 hover:bg-teal-200 text-teal-800 px-4 py-2 rounded-lg font-semibold"
                      >
                        📊 Bewerbungen ansehen
                      </Button>
                      <Button
                        onClick={() => navigate(`/employer/jobs/${job.id}/edit`)}
                        className="bg-blue-100 hover:bg-blue-200 text-blue-800 px-4 py-2 rounded-lg font-semibold"
                      >
                        ✏️ Bearbeiten
                      </Button>
                      <Button
                        onClick={() => handleDelete(job.id)}
                        className="bg-red-100 hover:bg-red-200 text-red-800 px-4 py-2 rounded-lg font-semibold"
                      >
                        🗑️ Löschen
                      </Button>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default EmployerJobs;
