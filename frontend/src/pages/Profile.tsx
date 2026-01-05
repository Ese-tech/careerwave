import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from '../services/api';
import { useAuthStore } from '../store/authStore';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';

interface UserProfile {
  uid: string;
  email: string;
  role: string;
  displayName?: string;
}

const Profile: React.FC = () => {
  const navigate = useNavigate();
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const token = useAuthStore((state) => state.token);
  const user = useAuthStore((state) => state.user);

  useEffect(() => {
    async function fetchProfile() {
      setLoading(true);
      setError(null);
      try {
        if (!token) {
          setError('Nicht angemeldet. Bitte melden Sie sich an.');
          setLoading(false);
          return;
        }

        const res = await api.get<{ data: UserProfile }>('/users/profile', token);
        if (res.success && res.data) {
          setProfile(res.data.data);
        } else {
          setError(res.error || 'Fehler beim Laden des Profils');
        }
      } catch (e: any) {
        setError(e.message || 'Fehler beim Laden des Profils');
      } finally {
        setLoading(false);
      }
    }
    fetchProfile();
  }, [token]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <Card className="p-12 text-center rounded-2xl">
            <div className="animate-pulse">
              <div className="text-6xl mb-4">⏳</div>
              <p className="text-xl text-gray-600">Lade Profil...</p>
            </div>
          </Card>
        </div>
      </div>
    );
  }

  if (!token || error === 'Nicht angemeldet. Bitte melden Sie sich an.') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <Card className="p-12 text-center rounded-2xl border-2 border-orange-200 bg-white">
            <div className="text-6xl mb-6">🔒</div>
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Nicht angemeldet</h1>
            <p className="text-xl text-gray-600 mb-8">
              Sie müssen angemeldet sein, um Ihr Profil zu sehen.
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
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
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
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-gray-900 mb-4">Mein Profil</h1>
          <p className="text-xl text-gray-600">Verwalten Sie Ihre persönlichen Informationen</p>
        </div>

        {/* Profile Card */}
        {profile && (
          <Card className="p-8 rounded-2xl border border-gray-100 bg-white shadow-xl mb-8">
            <div className="flex items-start gap-6 mb-8">
              <div className="w-24 h-24 bg-gradient-to-br from-teal-400 to-blue-500 rounded-2xl flex items-center justify-center shadow-lg">
                <span className="text-4xl text-white font-bold">
                  {(profile.email?.[0] || user?.email?.[0] || '?').toUpperCase()}
                </span>
              </div>
              <div className="flex-1">
                <h2 className="text-3xl font-bold text-gray-900 mb-2">
                  {profile.displayName || user?.firstName || user?.email || 'Benutzer'}
                </h2>
                <p className="text-lg text-gray-600">{profile.email || user?.email}</p>
                <div className="mt-3">
                  <span className="inline-flex items-center px-4 py-2 bg-teal-100 text-teal-800 rounded-full text-sm font-medium">
                    {profile.role === 'candidate' ? '👤 Kandidat' : 
                     profile.role === 'employer' ? '🏢 Arbeitgeber' : 
                     profile.role === 'admin' ? '👑 Administrator' : 
                     `📋 ${profile.role}`}
                  </span>
                </div>
              </div>
            </div>

            {/* Profile Details */}
            <div className="grid gap-6">
              <div className="p-6 bg-gray-50 rounded-xl border border-gray-200">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Profil-Details</h3>
                <div className="grid gap-4">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600 font-medium">Benutzer-ID:</span>
                    <span className="text-gray-900 font-mono text-sm">{profile.uid}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600 font-medium">E-Mail:</span>
                    <span className="text-gray-900">{profile.email}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600 font-medium">Rolle:</span>
                    <span className="text-gray-900 capitalize">{profile.role}</span>
                  </div>
                  {profile.displayName && (
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600 font-medium">Anzeigename:</span>
                      <span className="text-gray-900">{profile.displayName}</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </Card>
        )}

        {/* Actions */}
        <div className="flex gap-4 justify-center">
          <Button 
            onClick={() => navigate('/dashboard')}
            className="bg-gradient-to-r from-teal-500 to-blue-600 hover:from-teal-600 hover:to-blue-700 text-white px-8 py-4 rounded-xl font-bold shadow-lg hover:shadow-xl transition-all"
          >
            Zum Dashboard
          </Button>
          <Button 
            onClick={() => navigate('/jobs')}
            className="bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700 text-white px-8 py-4 rounded-xl font-bold shadow-lg hover:shadow-xl transition-all"
          >
            Jobs durchsuchen
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
