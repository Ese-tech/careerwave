// frontend/src/pages/Candidate/CandidateApplications.tsx
import React, { useState, useEffect } from 'react';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { api } from '../../services/api';

interface Application {
  id: string;
  jobId: string;
  name: string;
  email: string;
  telefon?: string;
  nachricht: string;
  resumeUrl?: string;
  status: 'applied' | 'reviewing' | 'interview' | 'accepted' | 'rejected';
  createdAt: Date;
  updatedAt?: Date;
  job?: {
    id: string;
    title: string;
    company: string;
    location: string;
  };
}

const CandidateApplications: React.FC = () => {
  const [applications, setApplications] = useState<Application[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [statusFilter, setStatusFilter] = useState<string>('all');

  useEffect(() => {
    fetchApplications();
  }, []);

  const fetchApplications = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await api.get('/applications/my-applications');
      if (response.success) {
        setApplications(response.applications || []);
      } else {
        setError(response.error || 'Fehler beim Laden der Bewerbungen');
      }
    } catch (err: any) {
      setError(err.message || 'Fehler beim Laden der Bewerbungen');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (applicationId: string) => {
    if (!confirm('Möchten Sie diese Bewerbung wirklich löschen?')) {
      return;
    }

    try {
      const response = await api.delete(`/applications/${applicationId}`);
      if (response.success) {
        fetchApplications(); // Refresh list
      } else {
        alert(response.error || 'Fehler beim Löschen der Bewerbung');
      }
    } catch (err: any) {
      alert(err.message || 'Fehler beim Löschen der Bewerbung');
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'applied': return 'bg-blue-100 text-blue-800';
      case 'reviewing': return 'bg-yellow-100 text-yellow-800';
      case 'interview': return 'bg-purple-100 text-purple-800';
      case 'accepted': return 'bg-green-100 text-green-800';
      case 'rejected': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'applied': return 'Beworben';
      case 'reviewing': return 'In Prüfung';
      case 'interview': return 'Vorstellungsgespräch';
      case 'accepted': return 'Angenommen';
      case 'rejected': return 'Abgelehnt';
      default: return status;
    }
  };

  const filteredApplications = statusFilter === 'all' 
    ? applications 
    : applications.filter(app => app.status === statusFilter);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 py-8">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-teal-600"></div>
            <p className="mt-4 text-gray-600">Lade Bewerbungen...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            Meine Bewerbungen
          </h1>
          <p className="text-gray-600">
            Verwalten Sie Ihre Bewerbungen und verfolgen Sie deren Status
          </p>
        </div>

        {/* Filter */}
        <Card className="mb-6">
          <div className="p-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Filter:
            </label>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-teal-500 focus:border-teal-500"
            >
              <option value="all">Alle Status</option>
              <option value="applied">Beworben</option>
              <option value="reviewing">In Prüfung</option>
              <option value="interview">Vorstellungsgespräch</option>
              <option value="accepted">Angenommen</option>
              <option value="rejected">Abgelehnt</option>
            </select>
          </div>
        </Card>

        {error && (
          <Card className="mb-6 border-red-200 bg-red-50">
            <div className="p-4 flex items-center">
              <svg className="h-5 w-5 text-red-400 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
              <p className="text-red-800">{error}</p>
            </div>
          </Card>
        )}

        <div className="mb-4 text-sm text-gray-600">
          {filteredApplications.length} Bewerbung(en)
        </div>

        {filteredApplications.length === 0 ? (
          <Card>
            <div className="p-8 text-center">
              <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              <h3 className="mt-2 text-sm font-medium text-gray-900">Keine Bewerbungen</h3>
              <p className="mt-1 text-sm text-gray-500">
                {statusFilter === 'all' 
                  ? 'Sie haben noch keine Bewerbungen eingereicht.' 
                  : 'Keine Bewerbungen mit diesem Status.'}
              </p>
              <div className="mt-6">
                <Button onClick={() => window.location.href = '/jobs'}>
                  Jobs durchsuchen
                </Button>
              </div>
            </div>
          </Card>
        ) : (
          <div className="space-y-4">
            {filteredApplications.map((application) => (
              <Card key={application.id} className="hover:shadow-lg transition-shadow">
                <div className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold text-gray-900 mb-2">
                        {application.job?.title || 'Job-Titel nicht verfügbar'}
                      </h3>
                      <p className="text-gray-600 mb-2">
                        {application.job?.company || 'Unternehmen nicht verfügbar'}
                      </p>
                      {application.job?.location && (
                        <p className="text-sm text-gray-500">
                          📍 {application.job.location}
                        </p>
                      )}
                    </div>
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(application.status)}`}>
                      {getStatusText(application.status)}
                    </span>
                  </div>

                  <div className="border-t pt-4 mt-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                      <div>
                        <p className="text-gray-600">
                          <span className="font-medium">Beworben am:</span> {new Date(application.createdAt).toLocaleDateString('de-DE')}
                        </p>
                        {application.updatedAt && (
                          <p className="text-gray-600">
                            <span className="font-medium">Aktualisiert:</span> {new Date(application.updatedAt).toLocaleDateString('de-DE')}
                          </p>
                        )}
                      </div>
                      <div>
                        {application.telefon && (
                          <p className="text-gray-600">
                            <span className="font-medium">Telefon:</span> {application.telefon}
                          </p>
                        )}
                        {application.resumeUrl && (
                          <p className="text-gray-600">
                            <a href={application.resumeUrl} target="_blank" rel="noopener noreferrer" className="text-teal-600 hover:underline">
                              📄 Lebenslauf ansehen
                            </a>
                          </p>
                        )}
                      </div>
                    </div>

                    {application.nachricht && (
                      <div className="mt-4">
                        <p className="text-sm font-medium text-gray-700 mb-1">Anschreiben:</p>
                        <p className="text-sm text-gray-600 bg-gray-50 p-3 rounded">
                          {application.nachricht}
                        </p>
                      </div>
                    )}
                  </div>

                  <div className="flex justify-end gap-2 mt-4">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => window.location.href = `/jobs/${application.jobId}`}
                    >
                      Job ansehen
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleDelete(application.id)}
                      className="text-red-600 hover:bg-red-50"
                    >
                      Löschen
                    </Button>
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

export default CandidateApplications;
