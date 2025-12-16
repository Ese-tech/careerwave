import React, { useEffect, useState } from 'react';
import { api } from '../services/api';

interface UserProfile {
  uid: string;
  email: string;
  role: string;
  displayName?: string;
}

const Profile: React.FC = () => {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchProfile() {
      setLoading(true);
      setError(null);
      try {
        const res = await api.get<{ data: UserProfile }>('/users/profile');
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
  }, []);

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Mein Profil</h1>
      {loading && <p>Lade Profil...</p>}
      {error && <p className="text-red-600">{error}</p>}
      {profile && (
        <div className="bg-white rounded shadow p-6">
          <div className="mb-2"><strong>Email:</strong> {profile.email}</div>
          <div className="mb-2"><strong>Rolle:</strong> {profile.role}</div>
          <div className="mb-2"><strong>Name:</strong> {profile.displayName || '-'}</div>
        </div>
      )}
    </div>
  );
};

export default Profile;
