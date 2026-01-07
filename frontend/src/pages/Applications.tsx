// careerwave/frontend/src/pages/Applications.tsx

import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from '../services/api';
import { useAuthStore } from '../store/authStore';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';

interface Application {
  id: string;
  jobId: string;
  name: string;
  email: string;
  nachricht: string;
  createdAt: string;
}

const Applications: React.FC = () => {
  const navigate = useNavigate();
  const [applications, setApplications] = useState<Application[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const token = useAuthStore((state) => state.token);

  useEffect(() => {
    async function fetchApplications() {
      setLoading(true);
      setError(null);
      try {
        if (!token) {
          setError('Nicht angemeldet. Bitte melden Sie sich an.');
          setLoading(false);
          return;
        }

        const res = await api.get<{ data: Application[] }>('/users/applications', token);
        if (res.success && res.data) {
          setApplications(res.data.data || []);
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
  }, [token]);

  if (loading) {
    return (
      <div className="px-4 sm:px-0">
        <div className="py-6">
          <Card className="p-12 text-center rounded-2xl">
            <div className="animate-pulse">
              <div className="text-6xl mb-4">⏳</div>
              <p className="text-xl text-gray-600">Lade Bewerbungen...</p>
            </div>
          </Card>
        </div>
      </div>
    );
  }

  if (!token || error === 'Nicht angemeldet. Bitte melden Sie sich an.') {
    return (
      <div className="px-4 sm:px-0">
        <div className="py-6">
          <Card className="p-12 text-center rounded-2xl border-2 border-orange-200 bg-white">
            <div className="text-6xl mb-6">🔒</div>
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Nicht angemeldet</h1>
            <p className="text-xl text-gray-600 mb-8">
              Sie müssen angemeldet sein, um Ihre Bewerbungen zu sehen.
            </p>
            <div className="flex gap-4 justify-center">
              <Button 
                onClick={() => navigate('/login')}
                className="bg-gradient-to-r from-teal-500 to-blue-600 hover:from-teal-600 hover:to-blue-700 text-white px-8 py-4 rounded-xl font-bold shadow-lg hover:shadow-xl transition-all transform hover:scale-105"
              >
                Zur Anmeldung
              </Button>
              <Button 
                onClick={() => navigate('/register')}
                className="bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700 text-white px-8 py-4 rounded-xl font-bold shadow-lg hover:shadow-xl transition-all transform hover:scale-105"
              >
                Registrieren
              </Button>
            </div>
          </Card>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="px-4 sm:px-0">
        <div className="py-6">
          <Card className="p-12 text-center rounded-2xl border-2 border-red-200 bg-white">
            <div className="text-6xl mb-6">⚠️</div>
            <h1 className="text-4xl font-bold text-red-900 mb-4">Fehler</h1>
            <p className="text-xl text-red-600 mb-8">{error}</p>
            <Button 
              onClick={() => window.location.reload()}
              className="bg-gradient-to-r from-gray-500 to-gray-600 hover:from-gray-600 hover:to-gray-700 text-white px-8 py-4 rounded-xl font-bold shadow-lg"
            >
              Erneut versuchen
            </Button>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="px-4 sm:px-0">
      <div className="py-6">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-gray-900 mb-4">Meine Bewerbungen</h1>
          <p className="text-xl text-gray-600">Übersicht über alle eingereichten Bewerbungen</p>
        </div>

        {/* Applications List */}
        {applications.length === 0 ? (
          <Card className="p-12 text-center rounded-2xl border border-gray-200 bg-white shadow-lg">
            <div className="text-6xl mb-6">📭</div>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Keine Bewerbungen</h2>
            <p className="text-xl text-gray-600 mb-8">
              Sie haben noch keine Bewerbungen eingereicht.
            </p>
            <Button 
              onClick={() => navigate('/jobs')}
              className="bg-gradient-to-r from-teal-500 to-blue-600 hover:from-teal-600 hover:to-blue-700 text-white px-8 py-4 rounded-xl font-bold shadow-lg hover:shadow-xl transition-all transform hover:scale-105"
            >
              Jobs durchsuchen
            </Button>
          </Card>
        ) : (
          <div className="grid gap-6">
            {applications.map((app) => (
              <Card 
                key={app.id} 
                className="p-8 hover:shadow-2xl transition-all transform hover:scale-[1.01] rounded-2xl border border-gray-100 bg-white"
              >
                <div className="flex justify-between items-start gap-6">
                  <div className="flex-1">
                    {/* Application Header */}
                    <div className="flex items-center gap-4 mb-4">
                      <div className="w-16 h-16 bg-gradient-to-br from-teal-400 to-blue-500 rounded-2xl flex items-center justify-center shadow-lg">
                        <span className="text-3xl">📄</span>
                      </div>
                      <div>
                        <h3 className="text-2xl font-bold text-gray-900">
                          Bewerbung #{app.id.substring(0, 8)}
                        </h3>
                        <p className="text-lg text-gray-600">Job-ID: {app.jobId}</p>
                      </div>
                    </div>

                    {/* Application Details */}
                    <div className="grid gap-4">
                      <div className="p-4 bg-gray-50 rounded-xl border border-gray-200">
                        <p className="text-sm text-gray-500 mb-1">Bewerber</p>
                        <p className="text-lg font-semibold text-gray-900">{app.name}</p>
                        <p className="text-gray-600">{app.email}</p>
                      </div>

                      {app.nachricht && (
                        <div className="p-4 bg-blue-50 rounded-xl border border-blue-200">
                          <p className="text-sm text-blue-700 mb-2 font-medium">Nachricht</p>
                          <p className="text-gray-800 leading-relaxed">{app.nachricht}</p>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Right Side - Date & Status */}
                  <div className="flex flex-col items-end gap-4">
                    <div className="text-right">
                      <p className="text-sm text-gray-500 mb-1">Eingereicht am</p>
                      <p className="text-lg font-semibold text-gray-700">
                        {new Date(app.createdAt).toLocaleDateString('de-DE')}
                      </p>
                      <p className="text-sm text-gray-600">
                        {new Date(app.createdAt).toLocaleTimeString('de-DE')}
                      </p>
                    </div>
                    <span className="inline-flex items-center px-4 py-2 bg-green-100 text-green-800 rounded-full text-sm font-medium">
                      ✓ Eingereicht
                    </span>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}

        {/* Summary Stats */}
        {applications.length > 0 && (
          <Card className="mt-8 p-6 rounded-2xl border border-gray-100 bg-white shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500 mb-1">Gesamt</p>
                <p className="text-3xl font-bold text-teal-600">{applications.length}</p>
              </div>
              <div className="text-right">
                <p className="text-sm text-gray-500 mb-1">Status</p>
                <p className="text-lg font-semibold text-gray-700">Alle eingereicht</p>
              </div>
            </div>
          </Card>
        )}

        {/* Actions */}
        <div className="mt-8 flex gap-4 justify-center">
          <Button 
            onClick={() => navigate('/jobs')}
            className="bg-gradient-to-r from-teal-500 to-blue-600 hover:from-teal-600 hover:to-blue-700 text-white px-8 py-4 rounded-xl font-bold shadow-lg hover:shadow-xl transition-all"
          >
            Weitere Jobs finden
          </Button>
          <Button 
            onClick={() => navigate('/candidate/profile')}
            className="bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700 text-white px-8 py-4 rounded-xl font-bold shadow-lg hover:shadow-xl transition-all"
          >
            Zum Profil
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Applications;
