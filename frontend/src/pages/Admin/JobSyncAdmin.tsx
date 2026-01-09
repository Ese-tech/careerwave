// frontend/src/pages/Admin/JobSyncAdmin.tsx
import React, { useState, useEffect } from 'react';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { api } from '../../services/api';

interface SyncStats {
  totalJobs: number;
  lastSync: string | null;
  oldestJob: string | null;
  newestJob: string | null;
  nextSync: string | null;
  sources?: {
    adzuna: number;
    arbeitsagentur: number;
  };
}

const JobSyncAdmin: React.FC = () => {
  const [stats, setStats] = useState<SyncStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [syncing, setSyncing] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);

  const loadStats = async () => {
    try {
      setLoading(true);
      const response = await api.get('/sync/stats');
      if (response.success) {
        setStats(response.data);
      }
    } catch (error) {
      console.error('Error loading sync stats:', error);
    } finally {
      setLoading(false);
    }
  };

  const triggerSync = async () => {
    try {
      setSyncing(true);
      setMessage(null);
      const response = await api.post('/sync/trigger');
      
      if (response.success) {
        const sources = response.data.sources || {};
        setMessage({ 
          type: 'success', 
          text: `Sync erfolgreich! Total: ${response.data.fetched} (Adzuna: ${sources.adzuna || 0}, Arbeitsagentur: ${sources.arbeitsagentur || 0}), Gespeichert: ${response.data.saved}, Gelöscht: ${response.data.deleted}` 
        });
        await loadStats(); // Reload stats
      } else {
        setMessage({ type: 'error', text: response.error || 'Sync fehlgeschlagen' });
      }
    } catch (error: any) {
      setMessage({ type: 'error', text: error.message || 'Sync fehlgeschlagen' });
    } finally {
      setSyncing(false);
    }
  };

  useEffect(() => {
    loadStats();
  }, []);

  const formatDate = (dateString: string | null) => {
    if (!dateString) return 'Noch nie';
    return new Date(dateString).toLocaleString('de-DE');
  };

  if (loading) {
    return (
      <div className="p-6">
        <Card className="p-8">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded mb-4"></div>
            <div className="h-4 bg-gray-200 rounded mb-2"></div>
            <div className="h-4 bg-gray-200 rounded"></div>
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-900">Job Synchronisierung</h1>
        <Button
          onClick={triggerSync}
          disabled={syncing}
          className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-lg shadow-md"
        >
          {syncing ? (
            <span className="flex items-center gap-2">
              <span className="animate-spin">⏳</span>
              Synchronisiere...
            </span>
          ) : (
            <span className="flex items-center gap-2">
              <span>🔄</span>
              Manuell Synchronisieren
            </span>
          )}
        </Button>
      </div>

      {message && (
        <Card className={`p-4 ${message.type === 'success' ? 'bg-green-50 border-green-200' : 'bg-red-50 border-red-200'}`}>
          <p className={`font-semibold ${message.type === 'success' ? 'text-green-800' : 'text-red-800'}`}>
            {message.type === 'success' ? '✅' : '❌'} {message.text}
          </p>
        </Card>
      )}

      <Card className="p-8 shadow-lg">
        <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
          <span className="text-3xl">📊</span>
          Synchronisierungs-Statistiken
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Total Jobs */}
          <div className="p-6 bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl border border-blue-200">
            <div className="flex items-center gap-3 mb-2">
              <span className="text-3xl">💼</span>
              <h3 className="text-lg font-semibold text-gray-700">Gesamt Jobs</h3>
            </div>
            <p className="text-4xl font-bold text-blue-600">{stats?.totalJobs || 0}</p>
            <p className="text-sm text-gray-600 mt-2">Maximum: 200 Jobs</p>
          </div>

          {/* Sources Breakdown */}
          <div className="p-6 bg-gradient-to-br from-teal-50 to-teal-100 rounded-xl border border-teal-200">
            <div className="flex items-center gap-3 mb-2">
              <span className="text-3xl">🔗</span>
              <h3 className="text-lg font-semibold text-gray-700">Job-Quellen</h3>
            </div>
            <div className="space-y-1">
              <p className="text-lg font-bold text-teal-600">
                🌐 Adzuna: {stats?.sources?.adzuna || 0}
              </p>
              <p className="text-lg font-bold text-teal-600">
                🏢 Arbeitsagentur: {stats?.sources?.arbeitsagentur || 0}
              </p>
            </div>
          </div>

          {/* Last Sync */}
          <div className="p-6 bg-gradient-to-br from-green-50 to-green-100 rounded-xl border border-green-200">
            <div className="flex items-center gap-3 mb-2">
              <span className="text-3xl">🕐</span>
              <h3 className="text-lg font-semibold text-gray-700">Letzte Sync</h3>
            </div>
            <p className="text-lg font-bold text-green-600">
              {formatDate(stats?.lastSync || null)}
            </p>
          </div>

          {/* Next Sync */}
          <div className="p-6 bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl border border-purple-200">
            <div className="flex items-center gap-3 mb-2">
              <span className="text-3xl">⏰</span>
              <h3 className="text-lg font-semibold text-gray-700">Nächste Sync</h3>
            </div>
            <p className="text-lg font-bold text-purple-600">
              {formatDate(stats?.nextSync || null)}
            </p>
            <p className="text-sm text-gray-600 mt-2">Automatisch alle 24 Stunden</p>
          </div>

          {/* Newest Job */}
          <div className="p-6 bg-gradient-to-br from-orange-50 to-orange-100 rounded-xl border border-orange-200">
            <div className="flex items-center gap-3 mb-2">
              <span className="text-3xl">🆕</span>
              <h3 className="text-lg font-semibold text-gray-700">Neuester Job</h3>
            </div>
            <p className="text-sm font-medium text-orange-800 line-clamp-2">
              {stats?.newestJob || 'Keine Jobs'}
            </p>
          </div>
        </div>
      </Card>

      <Card className="p-8 shadow-lg">
        <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-3">
          <span className="text-3xl">ℹ️</span>
          Über die Synchronisierung
        </h2>
        <div className="space-y-3 text-gray-700">
          <p className="flex items-start gap-2">
            <span className="text-xl">✓</span>
            <span><strong>Zwei Quellen:</strong> Jobs werden von Adzuna und Arbeitsagentur API geladen</span>
          </p>
          <p className="flex items-start gap-2">
            <span className="text-xl">✓</span>
            <span><strong>Automatisch:</strong> Jobs werden alle 24 Stunden automatisch synchronisiert</span>
          </p>
          <p className="flex items-start gap-2">
            <span className="text-xl">✓</span>
            <span><strong>Limit:</strong> Maximal 200 Jobs werden in der Datenbank gespeichert</span>
          </p>
          <p className="flex items-start gap-2">
            <span className="text-xl">✓</span>
            <span><strong>Rotation:</strong> Die ältesten Jobs werden automatisch gelöscht, wenn neue hinzukommen</span>
          </p>
          <p className="flex items-start gap-2">
            <span className="text-xl">✓</span>
            <span><strong>Manuell:</strong> Sie können den Sync jederzeit manuell auslösen mit dem Button oben</span>
          </p>
        </div>
      </Card>
    </div>
  );
};

export default JobSyncAdmin;
