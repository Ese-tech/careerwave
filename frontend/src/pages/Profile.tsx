// careerwave/frontend/src/pages/Profile.tsx

import React, { useEffect, useState, useRef } from 'react';
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
  avatar?: string; // Flat structure (direct from some responses)
  profile?: {
    avatar?: string;
    resumeUrl?: string;
    coverLetterUrl?: string;
    certificatesUrl?: string;
    otherDocumentsUrl?: string;
    bio?: string;
    phone?: string;
    location?: string;
  };
}

const Profile: React.FC = () => {
  const navigate = useNavigate();
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [uploadingAvatar, setUploadingAvatar] = useState(false);
  const [uploadingCV, setUploadingCV] = useState(false);
  const [uploadingCoverLetter, setUploadingCoverLetter] = useState(false);
  const [uploadingCertificates, setUploadingCertificates] = useState(false);
  const [uploadingOtherDocs, setUploadingOtherDocs] = useState(false);
  const [uploadSuccess, setUploadSuccess] = useState<string | null>(null);
  
  const token = useAuthStore((state) => state.token);
  const user = useAuthStore((state) => state.user);
  
  const avatarInputRef = useRef<HTMLInputElement>(null);
  const cvInputRef = useRef<HTMLInputElement>(null);
  const coverLetterInputRef = useRef<HTMLInputElement>(null);
  const certificatesInputRef = useRef<HTMLInputElement>(null);
  const otherDocsInputRef = useRef<HTMLInputElement>(null);

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
          // Check if data is nested or flat
          const profileData = res.data.data || res.data;
          
          if (profileData && typeof profileData === 'object') {
            setProfile(profileData as UserProfile);
          } else {
            if (user) {
              setProfile({
                uid: user.id || '',
                email: user.email || '',
                role: user.role || 'candidate',
                displayName: user.firstName || user.name || '',
                profile: {}
              });
            } else {
              setError('Profil konnte nicht geladen werden');
            }
          }
        } else {
          // FALLBACK: Use user data from auth store if API fails
          if (user) {
            setProfile({
              uid: user.id || '',
              email: user.email || '',
              role: user.role || 'candidate',
              displayName: user.firstName || user.name || '',
              profile: {}
            });
          } else {
            setError(res.error || 'Fehler beim Laden des Profils');
          }
        }
      } catch (e: any) {
        // FALLBACK: Use user data on error
        if (user) {
          setProfile({
            uid: user.id || '',
            email: user.email || '',
            role: user.role || 'candidate',
            displayName: user.firstName || user.name || '',
            profile: {}
          });
        } else {
          setError(e.message || 'Fehler beim Laden des Profils');
        }
      } finally {
        setLoading(false);
      }
    }
    fetchProfile();
  }, [token, user]);

  // Handle Avatar Upload
  const handleAvatarUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !token) return;

    // Validate file type
    const allowedTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/jpg'];
    if (!allowedTypes.includes(file.type)) {
      setError('Nur JPEG, PNG und WebP Bilder sind erlaubt.');
      setTimeout(() => setError(null), 5000);
      return;
    }

    // Validate file size (10MB)
    if (file.size > 10 * 1024 * 1024) {
      setError('Datei ist zu groß. Maximale Größe: 10MB.');
      setTimeout(() => setError(null), 5000);
      return;
    }

    setUploadingAvatar(true);
    setError(null);
    setUploadSuccess(null);

    try {
      const formData = new FormData();
      formData.append('file', file);

      console.log('📤 Uploading avatar to:', `${import.meta.env.VITE_API_BASE_URL || 'http://localhost:3001'}/upload/avatar`);

      const response = await fetch(`${import.meta.env.VITE_API_BASE_URL || 'http://localhost:3001'}/upload/avatar`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
        body: formData,
      });

      console.log('📥 Response status:', response.status);
      const result = await response.json();
      console.log('📦 Response data:', result);

      if (result.success) {
        // Update profile state immediately with the new avatar URL
        const avatarUrl = result.url || result.avatarUrl;
        console.log('✅ Avatar URL received:', avatarUrl);
        
        if (avatarUrl && profile) {
          console.log('💾 Updating profile state with avatar URL');
          // Support both flat and nested structures
          const updatedProfile = {
            ...profile,
            avatar: avatarUrl, // Flat structure
            profile: {
              ...profile.profile,
              avatar: avatarUrl // Nested structure
            }
          };
          setProfile(updatedProfile);
          console.log('✨ Profile state updated:', updatedProfile);
        } else {
          console.warn('⚠️ No avatar URL in response or no profile');
        }
        
        setUploadSuccess('Profilbild erfolgreich hochgeladen! 🎉');
        setTimeout(() => setUploadSuccess(null), 5000);
        
        // Also refresh profile from server to ensure sync
        try {
          const res = await api.get<{ data: UserProfile }>('/users/profile', token);
          if (res.success && res.data) {
            const profileData = res.data.data || res.data;
            setProfile(profileData as UserProfile);
          }
        } catch (refreshErr) {
          console.error('Failed to refresh profile:', refreshErr);
          // Keep the manually updated profile if refresh fails
        }
      } else {
        setError(result.error || 'Upload fehlgeschlagen');
        setTimeout(() => setError(null), 5000);
      }
    } catch (err: any) {
      setError(err.message || 'Upload fehlgeschlagen');
      setTimeout(() => setError(null), 5000);
    } finally {
      setUploadingAvatar(false);
    }
  };

  // Generic Document Upload Handler
  const handleDocumentUpload = async (
    e: React.ChangeEvent<HTMLInputElement>,
    _documentType: 'cv' | 'coverLetter' | 'certificates' | 'otherDocs',
    setUploading: React.Dispatch<React.SetStateAction<boolean>>,
    successMessage: string
  ) => {
    const file = e.target.files?.[0];
    if (!file || !token) return;

    // Validate file type
    if (file.type !== 'application/pdf') {
      setError('Nur PDF Dateien sind erlaubt.');
      setTimeout(() => setError(null), 5000);
      return;
    }

    // Validate file size (10MB)
    if (file.size > 10 * 1024 * 1024) {
      setError('Datei ist zu groß. Maximale Größe: 10MB.');
      setTimeout(() => setError(null), 5000);
      return;
    }

    setUploading(true);
    setError(null);
    setUploadSuccess(null);

    try {
      const formData = new FormData();
      formData.append('file', file);

      const response = await fetch(`${import.meta.env.VITE_API_BASE_URL || 'http://localhost:3001'}/upload/cv`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
        body: formData,
      });

      const result = await response.json();

      if (result.success) {
        setUploadSuccess(successMessage);
        setTimeout(() => setUploadSuccess(null), 5000);
        // Refresh profile
        const res = await api.get<{ data: UserProfile }>('/users/profile', token);
        if (res.success && res.data) {
          const profileData = res.data.data || res.data;
          setProfile(profileData as UserProfile);
        }
      } else {
        setError(result.error || 'Upload fehlgeschlagen');
        setTimeout(() => setError(null), 5000);
      }
    } catch (err: any) {
      setError(err.message || 'Upload fehlgeschlagen');
      setTimeout(() => setError(null), 5000);
    } finally {
      setUploading(false);
    }
  };

  if (loading) {
    return (
      <div className="px-4 sm:px-0">
        <div className="py-6">
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
      <div className="px-4 sm:px-0">
        <div className="py-6">
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
          <h1 className="text-5xl font-bold text-gray-900 mb-4">Mein Profil</h1>
          <p className="text-xl text-gray-600">Verwalten Sie Ihre persönlichen Informationen</p>
        </div>

        {/* Success Message - Fixed Position */}
        {uploadSuccess && (
          <div className="mb-6 p-4 bg-gradient-to-r from-green-50 to-emerald-50 border-2 border-green-400 rounded-xl shadow-lg animate-in slide-in-from-top duration-300">
            <div className="flex items-center justify-center gap-3">
              <span className="text-2xl">✅</span>
              <p className="text-green-800 font-bold text-lg">{uploadSuccess}</p>
            </div>
          </div>
        )}

        {/* Error Message - Fixed Position */}
        {error && !loading && (
          <div className="mb-6 p-4 bg-gradient-to-r from-red-50 to-orange-50 border-2 border-red-400 rounded-xl shadow-lg animate-in slide-in-from-top duration-300">
            <div className="flex items-center justify-center gap-3">
              <span className="text-2xl">❌</span>
              <p className="text-red-800 font-bold text-lg">{error}</p>
            </div>
          </div>
        )}

        {/* Profile Card */}
        {profile && (
          <Card className="p-8 rounded-2xl border border-gray-100 bg-white shadow-xl mb-8">

            <div className="flex items-start gap-6 mb-8">
              {/* Avatar with Upload */}
              <div className="relative group">
                <div className="w-32 h-32 rounded-3xl flex items-center justify-center shadow-2xl overflow-hidden border-4 border-white group-hover:shadow-teal-300 transition-shadow bg-gray-100">
                  {(() => {
                    // Check both flat and nested avatar locations
                    const avatarUrl = profile.avatar || profile.profile?.avatar;
                    console.log('🔍 Avatar check:', {
                      hasAvatar: !!avatarUrl,
                      avatarUrl: avatarUrl,
                      flatAvatar: profile.avatar,
                      nestedAvatar: profile.profile?.avatar
                    });
                    return avatarUrl ? (
                      <img 
                        src={avatarUrl} 
                        alt="Avatar" 
                        className="w-full h-full object-cover absolute inset-0"
                        onLoad={() => console.log('✅ Avatar image loaded successfully')}
                        onError={(e) => {
                          console.error('❌ Avatar image failed to load:', avatarUrl);
                          // Hide image on error and show fallback
                          (e.target as HTMLImageElement).style.display = 'none';
                        }}
                      />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-teal-400 to-blue-500 flex items-center justify-center absolute inset-0">
                        <span className="text-5xl text-white font-bold">
                          {(profile.email?.[0] || user?.email?.[0] || '?').toUpperCase()}
                        </span>
                      </div>
                    );
                  })()}
                </div>
                <button
                  onClick={() => avatarInputRef.current?.click()}
                  disabled={uploadingAvatar}
                  className="absolute -bottom-2 -right-2 bg-gradient-to-br from-teal-500 to-blue-600 text-white border-3 border-white rounded-full p-3 shadow-xl hover:from-teal-600 hover:to-blue-700 hover:scale-110 transition-all disabled:opacity-50 disabled:cursor-not-allowed z-10"
                  title="Profilbild ändern - Klicken zum Hochladen"
                >
                  {uploadingAvatar ? (
                    <span className="text-2xl animate-spin">⏳</span>
                  ) : (
                    <span className="text-2xl">📷</span>
                  )}
                </button>
                <input
                  ref={avatarInputRef}
                  type="file"
                  accept="image/jpeg,image/png,image/webp,image/jpg"
                  onChange={handleAvatarUpload}
                  className="hidden"
                />
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

              {/* Bewerbungsunterlagen Section - NUR FÜR KANDIDATEN */}
              {profile.role === 'candidate' && (
                <div>
                  <div className="text-center mb-6">
                    <h3 className="text-2xl font-extrabold text-gray-900 flex items-center justify-center gap-2">
                      <span className="text-3xl">📋</span>
                      Bewerbungsunterlagen
                    </h3>
                    <p className="text-sm text-gray-600 mt-1">Laden Sie alle wichtigen Dokumente für Ihre Bewerbung hoch</p>
                  </div>

                  {/* Grid Layout für 4 Dokumente nebeneinander */}
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    {/* 1. Lebenslauf (CV) */}
                    <div className="p-4 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 rounded-xl border-2 border-blue-400 shadow-md hover:shadow-lg transition-shadow">
                      <div className="text-center mb-3">
                        <span className="text-4xl">📄</span>
                        <h4 className="text-lg font-bold text-gray-900 mt-2">Lebenslauf</h4>
                        <p className="text-xs text-gray-600 mt-1">Ihr aktueller CV</p>
                      </div>
                      {profile.profile?.resumeUrl && (
                        <div className="text-center mb-2">
                          <a 
                            href={profile.profile.resumeUrl} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="text-blue-600 hover:text-blue-800 text-xs font-medium"
                          >
                            ✓ Ansehen →
                          </a>
                        </div>
                      )}
                      <Button
                        onClick={() => cvInputRef.current?.click()}
                        disabled={uploadingCV}
                        className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-3 py-2 rounded-lg text-sm font-bold shadow-md hover:scale-105 transition-all disabled:opacity-50"
                      >
                        {uploadingCV ? (
                          <span className="flex items-center justify-center gap-1">
                            <span className="text-sm animate-spin">⏳</span>
                          </span>
                        ) : (
                          <span className="flex items-center justify-center gap-1">
                            <span className="text-sm">{profile.profile?.resumeUrl ? '🔄' : '📤'}</span>
                            <span className="text-xs">{profile.profile?.resumeUrl ? 'Ändern' : 'Upload'}</span>
                          </span>
                        )}
                      </Button>
                      <input
                        ref={cvInputRef}
                        type="file"
                        accept="application/pdf"
                        onChange={(e) => handleDocumentUpload(e, 'cv', setUploadingCV, 'Lebenslauf erfolgreich hochgeladen! 📄')}
                        className="hidden"
                      />
                    </div>

                    {/* 2. Anschreiben (Cover Letter) */}
                    <div className="p-4 bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 rounded-xl border-2 border-green-400 shadow-md hover:shadow-lg transition-shadow">
                      <div className="text-center mb-3">
                        <span className="text-4xl">✉️</span>
                        <h4 className="text-lg font-bold text-gray-900 mt-2">Anschreiben</h4>
                        <p className="text-xs text-gray-600 mt-1">Motivationsschreiben</p>
                      </div>
                      {profile.profile?.coverLetterUrl && (
                        <div className="text-center mb-2">
                          <a 
                            href={profile.profile.coverLetterUrl} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="text-green-600 hover:text-green-800 text-xs font-medium"
                          >
                            ✓ Ansehen →
                          </a>
                        </div>
                      )}
                      <Button
                        onClick={() => coverLetterInputRef.current?.click()}
                        disabled={uploadingCoverLetter}
                        className="w-full bg-gradient-to-r from-green-600 to-teal-600 hover:from-green-700 hover:to-teal-700 text-white px-3 py-2 rounded-lg text-sm font-bold shadow-md hover:scale-105 transition-all disabled:opacity-50"
                      >
                        {uploadingCoverLetter ? (
                          <span className="flex items-center justify-center gap-1">
                            <span className="text-sm animate-spin">⏳</span>
                          </span>
                        ) : (
                          <span className="flex items-center justify-center gap-1">
                            <span className="text-sm">{profile.profile?.coverLetterUrl ? '🔄' : '📤'}</span>
                            <span className="text-xs">{profile.profile?.coverLetterUrl ? 'Ändern' : 'Upload'}</span>
                          </span>
                        )}
                      </Button>
                      <input
                        ref={coverLetterInputRef}
                        type="file"
                        accept="application/pdf"
                        onChange={(e) => handleDocumentUpload(e, 'coverLetter', setUploadingCoverLetter, 'Anschreiben erfolgreich hochgeladen! ✉️')}
                        className="hidden"
                      />
                    </div>

                    {/* 3. Zeugnisse (Certificates) */}
                    <div className="p-4 bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50 rounded-xl border-2 border-orange-400 shadow-md hover:shadow-lg transition-shadow">
                      <div className="text-center mb-3">
                        <span className="text-4xl">🎓</span>
                        <h4 className="text-lg font-bold text-gray-900 mt-2">Zeugnisse</h4>
                        <p className="text-xs text-gray-600 mt-1">Zertifikate & Referenzen</p>
                      </div>
                      {profile.profile?.certificatesUrl && (
                        <div className="text-center mb-2">
                          <a 
                            href={profile.profile.certificatesUrl} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="text-orange-600 hover:text-orange-800 text-xs font-medium"
                          >
                            ✓ Ansehen →
                          </a>
                        </div>
                      )}
                      <Button
                        onClick={() => certificatesInputRef.current?.click()}
                        disabled={uploadingCertificates}
                        className="w-full bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-700 hover:to-amber-700 text-white px-3 py-2 rounded-lg text-sm font-bold shadow-md hover:scale-105 transition-all disabled:opacity-50"
                      >
                        {uploadingCertificates ? (
                          <span className="flex items-center justify-center gap-1">
                            <span className="text-sm animate-spin">⏳</span>
                          </span>
                        ) : (
                          <span className="flex items-center justify-center gap-1">
                            <span className="text-sm">{profile.profile?.certificatesUrl ? '🔄' : '📤'}</span>
                            <span className="text-xs">{profile.profile?.certificatesUrl ? 'Ändern' : 'Upload'}</span>
                          </span>
                        )}
                      </Button>
                      <input
                        ref={certificatesInputRef}
                        type="file"
                        accept="application/pdf"
                        onChange={(e) => handleDocumentUpload(e, 'certificates', setUploadingCertificates, 'Zeugnisse erfolgreich hochgeladen! 🎓')}
                        className="hidden"
                      />
                    </div>

                    {/* 4. Weitere Dokumente (Other Documents) */}
                    <div className="p-4 bg-gradient-to-br from-pink-50 via-rose-50 to-red-50 rounded-xl border-2 border-pink-400 shadow-md hover:shadow-lg transition-shadow">
                      <div className="text-center mb-3">
                        <span className="text-4xl">📎</span>
                        <h4 className="text-lg font-bold text-gray-900 mt-2">Weitere</h4>
                        <p className="text-xs text-gray-600 mt-1">Portfolio & Proben</p>
                      </div>
                      {profile.profile?.otherDocumentsUrl && (
                        <div className="text-center mb-2">
                          <a 
                            href={profile.profile.otherDocumentsUrl} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="text-pink-600 hover:text-pink-800 text-xs font-medium"
                          >
                            ✓ Ansehen →
                          </a>
                        </div>
                      )}
                      <Button
                        onClick={() => otherDocsInputRef.current?.click()}
                        disabled={uploadingOtherDocs}
                        className="w-full bg-gradient-to-r from-pink-600 to-rose-600 hover:from-pink-700 hover:to-rose-700 text-white px-3 py-2 rounded-lg text-sm font-bold shadow-md hover:scale-105 transition-all disabled:opacity-50"
                      >
                        {uploadingOtherDocs ? (
                          <span className="flex items-center justify-center gap-1">
                            <span className="text-sm animate-spin">⏳</span>
                          </span>
                        ) : (
                          <span className="flex items-center justify-center gap-1">
                            <span className="text-sm">{profile.profile?.otherDocumentsUrl ? '🔄' : '📤'}</span>
                            <span className="text-xs">{profile.profile?.otherDocumentsUrl ? 'Ändern' : 'Upload'}</span>
                          </span>
                        )}
                      </Button>
                      <input
                        ref={otherDocsInputRef}
                        type="file"
                        accept="application/pdf"
                        onChange={(e) => handleDocumentUpload(e, 'otherDocs', setUploadingOtherDocs, 'Dokumente erfolgreich hochgeladen! 📎')}
                        className="hidden"
                      />
                    </div>
                  </div>

                  <p className="text-xs text-gray-500 text-center mt-4">
                    ℹ️ Alle Dateien: Max 10MB • Format: PDF
                  </p>
                </div>
              )}
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
