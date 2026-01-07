// frontend/src/pages/Employer/EmployerApplications.tsx
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { api } from '../../services/api';

interface Application {
  id: string;
  jobId: string;
  candidateId: string;
  status: 'applied' | 'reviewing' | 'rejected' | 'accepted';
  coverLetter?: string;
  resumeUrl?: string;
  appliedAt: string;
  candidate?: {
    id: string;
    firstName?: string;
    lastName?: string;
    email: string;
    profile?: {
      avatar?: string;
      phone?: string;
      skills?: string[];
    };
  };
  job?: {
    id: string;
    title: string;
  };
}

const ITEMS_PER_PAGE = 10;

const EmployerApplications: React.FC = () => {
  const { jobId } = useParams<{ jobId: string }>();
  const navigate = useNavigate();
  const { t } = useTranslation();
  
  const [applications, setApplications] = useState<Application[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [statusFilter, setStatusFilter] = useState<string>('all');

  useEffect(() => {
    fetchApplications();
  }, [jobId]);

  const fetchApplications = async () => {
    setLoading(true);
    setError(null);
    try {
      const endpoint = jobId 
        ? `/employer/jobs/${jobId}/applications`
        : '/employer/applications';
      
      const response = await api.get(endpoint);
      if (response.success && response.data) {
        setApplications(response.data.applications || []);
      } else {
        setError(response.error || 'Fehler beim Laden der Bewerbungen');
      }
    } catch (err: any) {
      setError(err.message || 'Fehler beim Laden der Bewerbungen');
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (applicationId: string, newStatus: Application['status']) => {
    try {
      const response = await api.patch(`/employer/applications/${applicationId}`, {
        status: newStatus,
      });

      if (response.success) {
        setApplications(applications.map(app =>
          app.id === applicationId ? { ...app, status: newStatus } : app
        ));
      } else {
        alert(response.error || 'Fehler beim Aktualisieren des Status');
      }
    } catch (err: any) {
      alert(err.message || 'Fehler beim Aktualisieren des Status');
    }
  };

  const getStatusLabel = (status: string) => {
    const labels: Record<string, { label: string; color: string; icon: string }> = {
      applied: { label: 'Neu eingegangen', color: 'bg-blue-100 text-blue-800', icon: '📨' },
      reviewing: { label: 'In Prüfung', color: 'bg-yellow-100 text-yellow-800', icon: '🔍' },
      accepted: { label: 'Angenommen', color: 'bg-green-100 text-green-800', icon: '✅' },
      rejected: { label: 'Abgelehnt', color: 'bg-red-100 text-red-800', icon: '❌' },
    };
    return labels[status] || { label: status, color: 'bg-gray-100 text-gray-800', icon: '📋' };
  };

  // Filter applications
  const filteredApplications = statusFilter === 'all'
    ? applications
    : applications.filter(app => app.status === statusFilter);

  // Pagination
  const totalPages = Math.ceil(filteredApplications.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const displayedApplications = filteredApplications.slice(startIndex, endIndex);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-4">
            <div>
              <h1 className="text-4xl font-bold text-gray-900 mb-2">
                Bewerbungen verwalten
              </h1>
              <p className="text-gray-600">
                {jobId ? 'Bewerbungen für diese Stelle' : 'Alle Bewerbungen'}
              </p>
            </div>
            {jobId && (
              <Button
                onClick={() => navigate('/employer/applications')}
                className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-4 py-2 rounded-xl font-semibold"
              >
                ← Alle Bewerbungen
              </Button>
            )}
          </div>

          {/* Filters */}
          <div className="flex gap-4 items-center">
            <label className="text-sm font-semibold text-gray-700">Filter:</label>
            <select
              value={statusFilter}
              onChange={(e) => {
                setStatusFilter(e.target.value);
                setCurrentPage(1);
              }}
              className="px-4 py-2 border-2 border-gray-200 rounded-xl focus:border-teal-500 focus:ring-2 focus:ring-teal-200 transition-all"
            >
              <option value="all">Alle Status</option>
              <option value="applied">Neu eingegangen</option>
              <option value="reviewing">In Prüfung</option>
              <option value="accepted">Angenommen</option>
              <option value="rejected">Abgelehnt</option>
            </select>
            <span className="text-sm text-gray-600">
              {filteredApplications.length} Bewerbung(en)
            </span>
          </div>
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

        {/* Applications List */}
        {!loading && filteredApplications.length === 0 && (
          <Card className="p-12 text-center rounded-2xl border border-gray-200 bg-white shadow-lg">
            <div className="text-6xl mb-4">📭</div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">
              Keine Bewerbungen gefunden
            </h3>
            <p className="text-gray-600">
              {statusFilter === 'all'
                ? 'Es sind noch keine Bewerbungen eingegangen'
                : `Keine Bewerbungen mit Status "${getStatusLabel(statusFilter).label}"`}
            </p>
          </Card>
        )}

        {!loading && displayedApplications.length > 0 && (
          <>
            <div className="grid gap-6">
              {displayedApplications.map((application) => {
                const statusInfo = getStatusLabel(application.status);
                return (
                  <Card
                    key={application.id}
                    className="p-6 hover:shadow-2xl transition-all rounded-2xl border border-gray-100 bg-white"
                  >
                    <div className="flex gap-6">
                      {/* Candidate Avatar */}
                      <div className="flex-shrink-0">
                        {application.candidate?.profile?.avatar ? (
                          <img
                            src={application.candidate.profile.avatar}
                            alt={`${application.candidate.firstName} ${application.candidate.lastName}`}
                            className="w-20 h-20 rounded-full object-cover border-2 border-gray-200"
                          />
                        ) : (
                          <div className="w-20 h-20 rounded-full bg-gradient-to-br from-teal-400 to-blue-500 flex items-center justify-center text-white text-2xl font-bold">
                            {application.candidate?.firstName?.charAt(0) || 'K'}
                          </div>
                        )}
                      </div>

                      {/* Application Details */}
                      <div className="flex-1">
                        <div className="flex justify-between items-start mb-4">
                          <div>
                            <h3 className="text-xl font-bold text-gray-900 mb-1">
                              {application.candidate?.firstName} {application.candidate?.lastName}
                            </h3>
                            <p className="text-gray-600 mb-2">
                              {application.candidate?.email}
                            </p>
                            {application.job && (
                              <p className="text-sm text-gray-500 mb-2">
                                Position: <span className="font-semibold">{application.job.title}</span>
                              </p>
                            )}
                            <p className="text-sm text-gray-500">
                              Beworben am: {new Date(application.appliedAt).toLocaleDateString('de-DE')}
                            </p>
                          </div>
                          <div className="flex flex-col gap-2">
                            <span className={`px-4 py-2 rounded-lg text-sm font-bold ${statusInfo.color}`}>
                              {statusInfo.icon} {statusInfo.label}
                            </span>
                          </div>
                        </div>

                        {/* Cover Letter */}
                        {application.coverLetter && (
                          <div className="mb-4 p-4 bg-gray-50 rounded-xl border border-gray-200">
                            <p className="text-sm font-semibold text-gray-700 mb-2">Anschreiben:</p>
                            <p className="text-gray-700 line-clamp-3">{application.coverLetter}</p>
                          </div>
                        )}

                        {/* Skills */}
                        {application.candidate?.profile?.skills && application.candidate.profile.skills.length > 0 && (
                          <div className="mb-4">
                            <p className="text-sm font-semibold text-gray-700 mb-2">Fähigkeiten:</p>
                            <div className="flex flex-wrap gap-2">
                              {application.candidate.profile.skills.map((skill, idx) => (
                                <span
                                  key={idx}
                                  className="px-3 py-1 bg-teal-100 text-teal-800 rounded-full text-sm font-medium"
                                >
                                  {skill}
                                </span>
                              ))}
                            </div>
                          </div>
                        )}

                        {/* Action Buttons */}
                        <div className="flex gap-3">
                          {application.resumeUrl && (
                            <Button
                              onClick={() => window.open(application.resumeUrl, '_blank')}
                              className="bg-blue-100 hover:bg-blue-200 text-blue-800 px-4 py-2 rounded-lg font-semibold"
                            >
                              📄 Lebenslauf ansehen
                            </Button>
                          )}
                          {application.status === 'applied' && (
                            <Button
                              onClick={() => handleStatusChange(application.id, 'reviewing')}
                              className="bg-yellow-100 hover:bg-yellow-200 text-yellow-800 px-4 py-2 rounded-lg font-semibold"
                            >
                              🔍 In Prüfung
                            </Button>
                          )}
                          {(application.status === 'applied' || application.status === 'reviewing') && (
                            <>
                              <Button
                                onClick={() => handleStatusChange(application.id, 'accepted')}
                                className="bg-green-100 hover:bg-green-200 text-green-800 px-4 py-2 rounded-lg font-semibold"
                              >
                                ✅ Annehmen
                              </Button>
                              <Button
                                onClick={() => handleStatusChange(application.id, 'rejected')}
                                className="bg-red-100 hover:bg-red-200 text-red-800 px-4 py-2 rounded-lg font-semibold"
                              >
                                ❌ Ablehnen
                              </Button>
                            </>
                          )}
                          {application.candidate?.email && (
                            <Button
                              onClick={() => window.location.href = `mailto:${application.candidate?.email}`}
                              className="bg-purple-100 hover:bg-purple-200 text-purple-800 px-4 py-2 rounded-lg font-semibold"
                            >
                              ✉️ Kontaktieren
                            </Button>
                          )}
                        </div>
                      </div>
                    </div>
                  </Card>
                );
              })}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="mt-8 flex justify-center gap-2">
                <button
                  onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                  disabled={currentPage === 1}
                  style={{ backgroundColor: '#374151', color: 'white' }}
                  className="px-6 py-3 rounded-lg font-semibold hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-lg"
                >
                  ← Zurück
                </button>
                <span className="px-6 py-3 text-gray-700 font-semibold">
                  Seite {currentPage} von {totalPages}
                </span>
                <button
                  onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                  disabled={currentPage === totalPages}
                  style={{ backgroundColor: '#374151', color: 'white' }}
                  className="px-6 py-3 rounded-lg font-semibold hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-lg"
                >
                  Weiter →
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default EmployerApplications;
