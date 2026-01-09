// frontend/src/pages/Jobs/JobDetailPage.tsx
import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate, useLocation, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { fetchJobDetails } from '../../services/jobService';
import { useAuthStore } from '../../store/authStore';
import type { JobDetails } from '../../types/arbeitsagentur';

const JobDetailPage: React.FC = () => {
  const { t } = useTranslation();
  const { hashId } = useParams<{ hashId: string }>();
  const navigate = useNavigate();
  const location = useLocation();
  const [job, setJob] = useState<JobDetails | null>(() => {
    // Versuche zuerst, den Job aus dem Link-State zu holen
    const stateJob = (location.state as any)?.job as JobDetails | undefined;
    if (stateJob) {
      // Im State gefunden, auch in sessionStorage speichern
      sessionStorage.setItem('lastJob', JSON.stringify(stateJob));
      return stateJob;
    }
    // Fallback: Versuche aus sessionStorage zu lesen
    const stored = sessionStorage.getItem('lastJob');
    if (stored) {
      try {
        return JSON.parse(stored) as JobDetails;
      } catch {}
    }
    return null;
  });
  const [showApplyModal, setShowApplyModal] = useState(false);
  const [application, setApplication] = useState({ name: '', email: '', message: '' });
  const [applicationSuccess, setApplicationSuccess] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [uploadingCV, setUploadingCV] = useState(false);
  
  // Separate states for each document type
  const [cvFile, setCvFile] = useState<File | null>(null);
  const [coverLetterFile, setCoverLetterFile] = useState<File | null>(null);
  const [certificatesFile, setCertificatesFile] = useState<File | null>(null);
  const [otherFile, setOtherFile] = useState<File | null>(null);
  
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [docCategory, setDocCategory] = useState<'cv' | 'coverLetter' | 'certificates' | 'other'>('cv');
  
  const cvInputRef = useRef<HTMLInputElement>(null);
  const coverLetterInputRef = useRef<HTMLInputElement>(null);
  const certificatesInputRef = useRef<HTMLInputElement>(null);
  const otherInputRef = useRef<HTMLInputElement>(null);
  
  const token = useAuthStore((state) => state.token);
  const user = useAuthStore((state) => state.user);

  // Handle File Selection for different document types
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, type: 'cv' | 'coverLetter' | 'certificates' | 'other') => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (file.type !== 'application/pdf') {
      setUploadError('Nur PDF Dateien sind erlaubt.');
      return;
    }

    // Validate file size (10MB)
    if (file.size > 10 * 1024 * 1024) {
      setUploadError('Datei ist zu groß. Maximale Größe: 10MB.');
      return;
    }

    setUploadError(null);
    
    // Set file based on type
    switch(type) {
      case 'cv':
        setCvFile(file);
        break;
      case 'coverLetter':
        setCoverLetterFile(file);
        break;
      case 'certificates':
        setCertificatesFile(file);
        break;
      case 'other':
        setOtherFile(file);
        break;
    }
  };

  // Upload file to Cloudinary
  const uploadFile = async (file: File): Promise<string | null> => {
    if (!file || !token) return null;

    try {
      const formData = new FormData();
      formData.append('file', file);

      const response = await fetch(`${import.meta.env.VITE_API_BASE_URL || 'http://localhost:3001/api/v1'}/upload/cv`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
        body: formData,
      });

      const result = await response.json();

      if (result.success && result.resumeUrl) {
        return result.resumeUrl;
      } else {
        setUploadError(result.error || 'Upload fehlgeschlagen');
        return null;
      }
    } catch (err: any) {
      setUploadError(err.message || 'Upload fehlgeschlagen');
      return null;
    }
  };

  useEffect(() => {
    if (!hashId || hashId === 'undefined') {
      navigate('/jobs', { replace: true });
      return;
    }
    // Wenn Job schon im State (Link-State/sessionStorage), versuche Detaildaten zu laden, aber fallback auf vorhandene Daten
    if (!job) {
      const loadJobDetails = async () => {
        try {
          setLoading(true);
          const jobDetails = await fetchJobDetails(hashId);
          if (!jobDetails) {
            setError('details-not-available');
          } else {
            setJob(jobDetails);
            sessionStorage.setItem('lastJob', JSON.stringify(jobDetails));
          }
        } catch (err: any) {
          setError(err.message || t('jobDetail.error.load', 'Fehler beim Laden der Job-Details'));
        } finally {
          setLoading(false);
        }
      };
      loadJobDetails();
    } else {
      setLoading(false);
    }
    // eslint-disable-next-line
  }, [hashId]);

  // Hilfsfunktion für Datumsformatierung
  const formatDate = (dateString?: string) => {
    if (!dateString) return t('jobDetail.notSpecified', 'Nicht angegeben');
    try {
      return new Date(dateString).toLocaleDateString('de-DE', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });
    } catch {
      return dateString;
    }
  };

  const formatLocation = (arbeitsorte?: Array<{ort?: string; plz?: string; region?: string; land?: string;}>) => {
    if (!arbeitsorte || arbeitsorte.length === 0) return t('jobDetail.notSpecified', 'Nicht angegeben');
    return arbeitsorte.map(ort => {
      const parts = [ort.plz, ort.ort, ort.region, ort.land].filter(Boolean);
      return parts.join(' ');
    }).join(', ');
  };

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto p-6">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded mb-4"></div>
          <div className="h-4 bg-gray-200 rounded mb-2"></div>
          <div className="h-4 bg-gray-200 rounded mb-2"></div>
          <div className="h-32 bg-gray-200 rounded"></div>
        </div>
      </div>
    );
  }

  if ((!job && error !== 'details-not-available') || (error && error !== 'details-not-available')) {
    // Zeige für 404/403 eine freundliche Meldung
    const isNotFound = !job && (!error || error.toLowerCase().includes('nicht gefunden') || error.toLowerCase().includes('nicht verfügbar'));
    return (
      <div className="max-w-4xl mx-auto p-6">
        <Card className="p-8 text-center">
          <h1 className="text-2xl font-bold text-red-600 mb-4">
            {isNotFound
              ? t('jobDetail.error.notFound', 'Job nicht gefunden')
              : error || t('jobDetail.error.load', 'Fehler beim Laden der Job-Details')}
          </h1>
          <p className="text-gray-600 mb-6">
            {isNotFound
              ? t('jobDetail.error.notFoundDesc', 'Der gewünschte Job konnte nicht gefunden werden oder ist nicht mehr verfügbar.')
              : t('jobDetail.error.loadDesc', 'Beim Laden der Job-Details ist ein Fehler aufgetreten.')}
          </p>
          <div className="space-x-4">
            <Button 
              onClick={() => navigate(-1)}
              className="bg-gray-500 hover:bg-gray-600"
            >
              {t('jobDetail.back', 'Zurück')}
            </Button>
            <Link to="/jobs">
              <Button className="bg-blue-600 hover:bg-blue-700">
                {t('jobDetail.backToJobs', 'Zur Jobsuche')}
              </Button>
            </Link>
          </div>
        </Card>
      </div>
    );
  }

  if (!job) {
    // Sollte eigentlich nie auftreten, aber als Fallback
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header Section with Breadcrumb */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-8 border border-gray-100">
            {/* Breadcrumb */}
            <nav className="text-sm text-gray-600 mb-6">
              <Link to="/jobs" className="hover:text-teal-600 transition-colors">{t('jobDetail.breadcrumb.jobs', 'Jobs')}</Link>
              <span className="mx-2">›</span>
              <span className="text-gray-800 font-medium">{t('jobDetail.breadcrumb.details', 'Job-Details')}</span>
            </nav>
            
            <div className="flex justify-between items-start gap-6">
              <div className="flex-1">
                <div className="flex items-start gap-4">
                  {/* Company Logo/Icon */}
                  <div className="w-16 h-16 bg-gradient-to-br from-teal-400 to-blue-500 rounded-xl flex items-center justify-center flex-shrink-0 shadow-md">
                    <span className="text-3xl">🏢</span>
                  </div>
                  <div className="flex-1">
                    <h1 className="text-4xl font-bold text-gray-900 mb-3 leading-tight">
                      {job.titel || job.title || t('jobDetail.error.notFound', 'Job nicht gefunden')}
                    </h1>
                    <p className="text-2xl text-gray-700 mb-4 font-medium">
                      {job.arbeitgeber || job.company?.display_name || t('jobDetail.unknownEmployer', 'Unbekannter Arbeitgeber')}
                    </p>
                    {/* Quick Info Tags */}
                    <div className="flex flex-wrap gap-3 mt-4">
                      <span className="inline-flex items-center px-4 py-2 bg-teal-100 text-teal-800 rounded-full text-sm font-medium">
                        📍 {formatLocation(job.arbeitsorte) || job.location?.display_name}
                      </span>
                      {(job.verguetung || job.salary_min) && (
                        <span className="inline-flex items-center px-4 py-2 bg-green-100 text-green-800 rounded-full text-sm font-medium">
                          💰 {job.verguetung || `${job.salary_min ? `€${job.salary_min}` : ''} ${job.salary_max ? `- €${job.salary_max}` : ''}`}
                        </span>
                      )}
                      {(job.arbeitszeitmodelle?.[0] || job.contract_time) && (
                        <span className="inline-flex items-center px-4 py-2 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
                          ⏰ {job.arbeitszeitmodelle?.[0] || job.contract_time}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
                {error === 'details-not-available' && (
                  <div className="mt-4 p-4 bg-yellow-50 border border-yellow-200 rounded-lg text-yellow-800 text-sm">
                    ℹ️ {t('jobDetail.detailsNotAvailable', 'Für diesen Job sind leider keine weiteren Detaildaten von der Arbeitsagentur verfügbar. Die Anzeige basiert auf den Suchdaten.')}
                  </div>
                )}
              </div>
              <Button 
                onClick={() => navigate(-1)}
                className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-6 py-3 rounded-xl transition-colors"
              >
                ← {t('jobDetail.back', 'Zurück')}
              </Button>
            </div>
          </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Job Description */}
            {(job.stellenbeschreibung || job.description) ? (
              <Card className="p-8 shadow-lg border border-gray-100 rounded-2xl hover:shadow-xl transition-shadow">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 bg-gradient-to-br from-purple-400 to-pink-500 rounded-lg flex items-center justify-center">
                    <span className="text-xl">📋</span>
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900">{t('jobDetail.description', 'Stellenbeschreibung')}</h2>
                </div>
                <div 
                  className="prose max-w-none text-gray-700 leading-relaxed"
                  dangerouslySetInnerHTML={{ 
                    __html: (job.stellenbeschreibung || job.description || '').replace(/\n/g, '<br/>') 
                  }}
                />
              </Card>
            ) : (
              <Card className="p-8 text-gray-500 italic text-center rounded-2xl border border-gray-100">
                {t('jobDetail.noDescription', 'Keine Stellenbeschreibung verfügbar.')}
              </Card>
            )}

            {/* Requirements & Skills */}
            <Card className="p-8 shadow-lg border border-gray-100 rounded-2xl hover:shadow-xl transition-shadow">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-400 to-cyan-500 rounded-lg flex items-center justify-center">
                  <span className="text-xl">✅</span>
                </div>
                <h2 className="text-2xl font-bold text-gray-900">{t('jobDetail.requirements', 'Anforderungen')}</h2>
              </div>
              <div className="space-y-4 text-gray-700">
                <div className="flex items-start gap-3 p-4 bg-gray-50 rounded-xl">
                  <span className="text-2xl">🏭</span>
                  <div>
                    <p className="font-semibold text-gray-900">{t('jobDetail.industry', 'Branche')}</p>
                    <p className="text-gray-700">{job.branche || job.category?.label || t('jobDetail.notSpecified', 'Nicht spezifiziert')}</p>
                  </div>
                </div>
                {job.arbeitszeitmodelle && job.arbeitszeitmodelle.length > 0 && (
                  <div className="flex items-start gap-3 p-4 bg-gray-50 rounded-xl">
                    <span className="text-2xl">⏰</span>
                    <div>
                      <p className="font-semibold text-gray-900">{t('jobDetail.workingTime', 'Arbeitszeit')}</p>
                      <p className="text-gray-700">{job.arbeitszeitmodelle.join(', ')}</p>
                    </div>
                  </div>
                )}
                <div className="flex items-start gap-3 p-4 bg-gray-50 rounded-xl">
                  <span className="text-2xl">📅</span>
                  <div>
                    <p className="font-semibold text-gray-900">{t('jobDetail.limited', 'Befristung')}</p>
                    <p className="text-gray-700">{job.befristung || job.contract_type || t('jobDetail.notSpecified', 'Nicht angegeben')}</p>
                  </div>
                </div>
              </div>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            {/* Quick Info Card */}
            <Card className="p-6 shadow-lg border border-gray-100 rounded-2xl hover:shadow-xl transition-shadow bg-gradient-to-br from-white to-blue-50">
              <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                <span className="text-2xl">ℹ️</span>
                {t('jobDetail.info', 'Job-Informationen')}
              </h3>
              <div className="space-y-4">
                <div className="p-4 bg-white rounded-xl border border-gray-100">
                  <p className="text-sm font-medium text-gray-600 mb-1">{t('jobDetail.location', 'Standort')}</p>
                  <p className="text-gray-900 font-medium flex items-center gap-2">
                    <span className="text-xl">📍</span>
                    {formatLocation(job.arbeitsorte) || job.location?.display_name}
                  </p>
                </div>
                {(job.verguetung || job.salary_min) && (
                  <div className="p-4 bg-white rounded-xl border border-green-200">
                    <p className="text-sm font-medium text-gray-600 mb-1">{t('jobDetail.salary', 'Vergütung')}</p>
                    <p className="text-green-600 font-bold text-lg flex items-center gap-2">
                      <span className="text-xl">💰</span>
                      {job.verguetung || `€${job.salary_min}${job.salary_max ? ` - €${job.salary_max}` : '+'}`}
                    </p>
                  </div>
                )}
                <div className="p-4 bg-white rounded-xl border border-gray-100">
                  <p className="text-sm font-medium text-gray-600 mb-1">{t('jobDetail.entryDate', 'Eintrittsdatum')}</p>
                  <p className="text-gray-900 font-medium flex items-center gap-2">
                    <span className="text-xl">📅</span>
                    {formatDate(job.eintrittsdatum) || formatDate(job.created)}
                  </p>
                </div>
                <div className="p-4 bg-white rounded-xl border border-gray-100">
                  <p className="text-sm font-medium text-gray-600 mb-1">{t('jobDetail.published', 'Veröffentlicht')}</p>
                  <p className="text-gray-900 font-medium flex items-center gap-2">
                    <span className="text-xl">🕒</span>
                    {formatDate(job.modifikationsTimestamp) || formatDate(job.created)}
                  </p>
                </div>
                {job.befristung && (
                  <div className="p-4 bg-white rounded-xl border border-gray-100">
                    <p className="text-sm font-medium text-gray-600 mb-1">{t('jobDetail.limited', 'Befristung')}</p>
                    <p className="text-gray-900 font-medium flex items-center gap-2">
                      <span className="text-xl">⏰</span>
                      {job.befristung}
                    </p>
                  </div>
                )}
              </div>
            </Card>

            {/* Action Buttons */}
            <Card className="p-6 shadow-lg border border-gray-100 rounded-2xl bg-white">
              <div className="space-y-3">
                <Button 
                  className="w-full bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-yellow-500 hover:to-orange-600 text-white font-bold py-4 rounded-xl shadow-lg hover:shadow-xl transition-all transform hover:scale-105"
                  onClick={() => {
                    // Pre-fill user data if logged in
                    if (user) {
                      setApplication({
                        name: `${user.firstName || ''} ${user.lastName || ''}`.trim() || user.name || '',
                        email: user.email || '',
                        message: ''
                      });
                    }
                    setShowApplyModal(true);
                  }}
                >
                  <span className="text-xl mr-2">🚀</span>
                  {t('jobDetail.applyNow', 'Jetzt bewerben')}
                </Button>
                {/* Application Modal */}
                {showApplyModal && (
                  <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
                    <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full relative animate-fade-in">
                      <button 
                        className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center text-gray-500 hover:text-black hover:bg-gray-100 rounded-full transition-colors" 
                        onClick={() => setShowApplyModal(false)}
                      >
                        ✕
                      </button>
                      <h2 className="text-2xl font-bold mb-6 text-gray-900">{t('jobDetail.applyForJob', 'Für diesen Job bewerben')}</h2>
                      {applicationSuccess ? (
                        <div className="text-center py-8">
                          <div className="text-6xl mb-4">✅</div>
                          <div className="text-green-600 font-bold text-xl">{t('jobDetail.applicationSuccess', 'Bewerbung erfolgreich gesendet!')}</div>
                        </div>
                      ) : (
                        <form onSubmit={async (e) => {
                          e.preventDefault();
                          setUploadingCV(true);
                          setUploadError(null);
                          
                          try {
                            // Upload all documents in parallel
                            const uploadPromises = [];
                            
                            if (cvFile) uploadPromises.push(uploadFile(cvFile));
                            if (coverLetterFile) uploadPromises.push(uploadFile(coverLetterFile));
                            if (certificatesFile) uploadPromises.push(uploadFile(certificatesFile));
                            if (otherFile) uploadPromises.push(uploadFile(otherFile));
                            
                            const uploadedUrls = await Promise.all(uploadPromises);
                            
                            // Check if any upload failed
                            if (uploadedUrls.some(url => url === null)) {
                              setUploadingCV(false);
                              return; // Error was already set in uploadFile
                            }
                            
                            // Get the first CV URL (primary resume)
                            const mainResumeUrl = uploadedUrls[0] || '';
                            
                            // Send application to backend
                            const response = await fetch(`${import.meta.env.VITE_API_BASE_URL || 'http://localhost:3001/api/v1'}/applications`, {
                              method: 'POST',
                              headers: {
                                'Content-Type': 'application/json',
                                'Authorization': `Bearer ${token}`,
                              },
                              body: JSON.stringify({
                                jobId: job.hashId || job.id || hashId,
                                name: application.name,
                                email: application.email,
                                nachricht: application.message,
                                telefon: '',
                                resumeUrl: mainResumeUrl
                              }),
                            });

                            const result = await response.json();

                            if (result.success) {
                              setApplicationSuccess(true);
                              setTimeout(() => {
                                setShowApplyModal(false);
                                setApplicationSuccess(false);
                                setApplication({ name: '', email: '', message: '' });
                                setCvFile(null);
                                setCoverLetterFile(null);
                                setCertificatesFile(null);
                                setOtherFile(null);
                                setUploadError(null);
                              }, 2000);
                            } else {
                              setUploadError(result.error || 'Bewerbung fehlgeschlagen');
                            }
                          } catch (err: any) {
                            setUploadError(err.message || 'Bewerbung fehlgeschlagen');
                          } finally {
                            setUploadingCV(false);
                          }
                        }} className="space-y-4">
                          <div>
                            <label className="block mb-2 font-semibold text-gray-700">{t('jobDetail.name', 'Name')}</label>
                            <input 
                              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all" 
                              required 
                              value={application.name} 
                              onChange={e => setApplication(a => ({ ...a, name: e.target.value }))} 
                            />
                          </div>
                          <div>
                            <label className="block mb-2 font-semibold text-gray-700">{t('jobDetail.email', 'E-Mail')}</label>
                            <input 
                              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all" 
                              type="email" 
                              required 
                              value={application.email} 
                              onChange={e => setApplication(a => ({ ...a, email: e.target.value }))} 
                            />
                          </div>
                          
                          {/* Documents Upload Section - All 4 types visible */}
                          <div className="space-y-3">
                            <label className="block mb-2 font-semibold text-gray-700">📎 Dokumente hochladen (Optional)</label>
                            
                            {/* CV Upload */}
                            <div className="p-3 bg-blue-50 rounded-xl border border-blue-200">
                              <input
                                ref={cvInputRef}
                                type="file"
                                accept="application/pdf"
                                onChange={(e) => handleFileChange(e, 'cv')}
                                className="hidden"
                              />
                              {cvFile ? (
                                <div className="flex items-center justify-between">
                                  <div className="flex items-center gap-2 flex-1 min-w-0">
                                    <span className="text-xl">✅</span>
                                    <div className="flex-1 min-w-0">
                                      <span className="text-xs text-blue-600 font-medium block">📄 Lebenslauf</span>
                                      <span className="text-sm text-blue-800 font-medium truncate block">{cvFile.name}</span>
                                    </div>
                                  </div>
                                  <button
                                    type="button"
                                    onClick={() => {
                                      setCvFile(null);
                                      if (cvInputRef.current) cvInputRef.current.value = '';
                                    }}
                                    className="text-red-500 hover:text-red-700 font-bold text-lg ml-2"
                                  >
                                    ✕
                                  </button>
                                </div>
                              ) : (
                                <button
                                  type="button"
                                  onClick={() => cvInputRef.current?.click()}
                                  className="w-full py-2 px-3 bg-blue-100 border-2 border-blue-300 text-blue-700 rounded-lg font-semibold hover:bg-blue-200 transition-all"
                                >
                                  <span className="text-lg mr-2">📄</span>
                                  Lebenslauf hochladen
                                </button>
                              )}
                            </div>

                            {/* Cover Letter Upload */}
                            <div className="p-3 bg-green-50 rounded-xl border border-green-200">
                              <input
                                ref={coverLetterInputRef}
                                type="file"
                                accept="application/pdf"
                                onChange={(e) => handleFileChange(e, 'coverLetter')}
                                className="hidden"
                              />
                              {coverLetterFile ? (
                                <div className="flex items-center justify-between">
                                  <div className="flex items-center gap-2 flex-1 min-w-0">
                                    <span className="text-xl">✅</span>
                                    <div className="flex-1 min-w-0">
                                      <span className="text-xs text-green-600 font-medium block">✉️ Anschreiben</span>
                                      <span className="text-sm text-green-800 font-medium truncate block">{coverLetterFile.name}</span>
                                    </div>
                                  </div>
                                  <button
                                    type="button"
                                    onClick={() => {
                                      setCoverLetterFile(null);
                                      if (coverLetterInputRef.current) coverLetterInputRef.current.value = '';
                                    }}
                                    className="text-red-500 hover:text-red-700 font-bold text-lg ml-2"
                                  >
                                    ✕
                                  </button>
                                </div>
                              ) : (
                                <button
                                  type="button"
                                  onClick={() => coverLetterInputRef.current?.click()}
                                  className="w-full py-2 px-3 bg-green-100 border-2 border-green-300 text-green-700 rounded-lg font-semibold hover:bg-green-200 transition-all"
                                >
                                  <span className="text-lg mr-2">✉️</span>
                                  Anschreiben hochladen
                                </button>
                              )}
                            </div>

                            {/* Certificates Upload */}
                            <div className="p-3 bg-orange-50 rounded-xl border border-orange-200">
                              <input
                                ref={certificatesInputRef}
                                type="file"
                                accept="application/pdf"
                                onChange={(e) => handleFileChange(e, 'certificates')}
                                className="hidden"
                              />
                              {certificatesFile ? (
                                <div className="flex items-center justify-between">
                                  <div className="flex items-center gap-2 flex-1 min-w-0">
                                    <span className="text-xl">✅</span>
                                    <div className="flex-1 min-w-0">
                                      <span className="text-xs text-orange-600 font-medium block">🎓 Zeugnisse</span>
                                      <span className="text-sm text-orange-800 font-medium truncate block">{certificatesFile.name}</span>
                                    </div>
                                  </div>
                                  <button
                                    type="button"
                                    onClick={() => {
                                      setCertificatesFile(null);
                                      if (certificatesInputRef.current) certificatesInputRef.current.value = '';
                                    }}
                                    className="text-red-500 hover:text-red-700 font-bold text-lg ml-2"
                                  >
                                    ✕
                                  </button>
                                </div>
                              ) : (
                                <button
                                  type="button"
                                  onClick={() => certificatesInputRef.current?.click()}
                                  className="w-full py-2 px-3 bg-orange-100 border-2 border-orange-300 text-orange-700 rounded-lg font-semibold hover:bg-orange-200 transition-all"
                                >
                                  <span className="text-lg mr-2">🎓</span>
                                  Zeugnisse hochladen
                                </button>
                              )}
                            </div>

                            {/* Other Documents Upload */}
                            <div className="p-3 bg-pink-50 rounded-xl border border-pink-200">
                              <input
                                ref={otherInputRef}
                                type="file"
                                accept="application/pdf"
                                onChange={(e) => handleFileChange(e, 'other')}
                                className="hidden"
                              />
                              {otherFile ? (
                                <div className="flex items-center justify-between">
                                  <div className="flex items-center gap-2 flex-1 min-w-0">
                                    <span className="text-xl">✅</span>
                                    <div className="flex-1 min-w-0">
                                      <span className="text-xs text-pink-600 font-medium block">📎 Weitere</span>
                                      <span className="text-sm text-pink-800 font-medium truncate block">{otherFile.name}</span>
                                    </div>
                                  </div>
                                  <button
                                    type="button"
                                    onClick={() => {
                                      setOtherFile(null);
                                      if (otherInputRef.current) otherInputRef.current.value = '';
                                    }}
                                    className="text-red-500 hover:text-red-700 font-bold text-lg ml-2"
                                  >
                                    ✕
                                  </button>
                                </div>
                              ) : (
                                <button
                                  type="button"
                                  onClick={() => otherInputRef.current?.click()}
                                  className="w-full py-2 px-3 bg-pink-100 border-2 border-pink-300 text-pink-700 rounded-lg font-semibold hover:bg-pink-200 transition-all"
                                >
                                  <span className="text-lg mr-2">📎</span>
                                  Weitere Dokumente
                                </button>
                              )}
                            </div>

                            {uploadError && (
                              <div className="mt-2 p-3 bg-red-50 border border-red-300 rounded-lg">
                                <p className="text-red-600 text-sm font-medium">⚠️ {uploadError}</p>
                              </div>
                            )}
                          </div>

                          <div>
                            <label className="block mb-2 font-semibold text-gray-700">{t('jobDetail.message', 'Nachricht')}</label>
                            <textarea 
                              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all resize-none" 
                              required 
                              rows={4} 
                              value={application.message} 
                              onChange={e => setApplication(a => ({ ...a, message: e.target.value }))} 
                            />
                          </div>
                          
                          <Button 
                            className="w-full bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-yellow-500 hover:to-orange-600 text-white font-bold py-4 rounded-xl shadow-lg disabled:opacity-50 disabled:cursor-not-allowed" 
                            type="submit"
                            disabled={uploadingCV}
                            
                          >
                            {uploadingCV ? (
                              <span className="flex items-center justify-center gap-2">
                                <span className="animate-spin">⏳</span>
                                CV wird hochgeladen...
                              </span>
                            ) : (
                              t('jobDetail.sendApplication', 'Bewerbung senden')
                            )}
                          </Button>
                        </form>
                      )}
                    </div>
                  </div>
                )}
                <Button 
                  className="w-full bg-gradient-to-r from-orange-400 to-pink-500 hover:from-orange-500 hover:to-pink-600 text-white font-bold py-3 rounded-xl shadow-md hover:shadow-lg transition-all"
                  onClick={() => {
                    // TODO: Implement save functionality
                    alert(t('jobDetail.saved', 'Job gespeichert!'));
                  }}
                >
                  <span className="text-xl mr-2">⭐</span>
                  Job speichern
                </Button>
                <Button 
                  className="w-full bg-gradient-to-r from-purple-500 to-indigo-600 hover:from-purple-600 hover:to-indigo-700 text-white font-bold py-3 rounded-xl shadow-md hover:shadow-lg transition-all"
                  onClick={() => {
                    if (navigator.share) {
                      navigator.share({
                        title: job.titel || job.title,
                        text: `${job.titel || job.title} bei ${job.arbeitgeber || job.company?.display_name}`,
                        url: window.location.href,
                      });
                    } else {
                      navigator.clipboard.writeText(window.location.href);
                      alert(t('jobDetail.linkCopied', 'Link kopiert!'));
                    }
                  }}
                >
                  <span className="text-xl mr-2">🔗</span>
                  Job teilen
                </Button>
              </div>
              <div className="mt-6 pt-4 border-t border-gray-200">
                <p className="text-xs text-gray-500 text-center">
                  {t('jobDetail.jobId', 'Job-ID')}: {job.hashId || job.id}
                </p>
              </div>
            </Card>
            {/* Company Info */}
            <Card className="p-6 shadow-lg border border-gray-100 rounded-2xl hover:shadow-xl transition-shadow bg-gradient-to-br from-white to-purple-50">
              <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <span className="text-2xl">🏢</span>
                {t('jobDetail.aboutCompany', 'Über das Unternehmen')}
              </h3>
              <div className="text-center">
                <div className="w-20 h-20 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                  <span className="text-4xl">🏢</span>
                </div>
                <p className="font-bold text-gray-900 text-lg mb-2">{job.arbeitgeber || job.company?.display_name}</p>
                {job.arbeitgeberAdresse && (
                  <p className="text-sm text-gray-600 mb-3 flex items-center justify-center gap-2">
                    <span>📍</span>
                    {job.arbeitgeberAdresse.strasse}, {job.arbeitgeberAdresse.plz} {job.arbeitgeberAdresse.ort}
                  </p>
                )}
                {job.arbeitgeberdarstellung && (
                  <p className="text-sm text-gray-700 mt-3 p-4 bg-white rounded-xl border border-gray-100">{job.arbeitgeberdarstellung}</p>
                )}
                {job.arbeitgeberdarstellungUrl && (
                  <a 
                    href={job.arbeitgeberdarstellungUrl} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="inline-block mt-4 text-teal-600 hover:text-teal-700 font-semibold underline transition-colors"
                  >
                    {t('jobDetail.companyWebsite', 'Zur Unternehmenswebseite')} →
                  </a>
                )}
              </div>
            </Card>
            {/* More Job Details */}
            <Card className="p-6 shadow-lg border border-gray-100 rounded-2xl hover:shadow-xl transition-shadow">
              <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <span className="text-2xl">📊</span>
                {t('jobDetail.moreDetails', 'Weitere Job-Details')}
              </h3>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                  <strong className="text-gray-700">{t('jobDetail.jobType', 'Angebotsart')}:</strong>
                  <span className="text-gray-900">{job.angebotsart || '-'}</span>
                </div>
                <div className="flex justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                  <strong className="text-gray-700">{t('jobDetail.branchGroup', 'Branchengruppe')}:</strong>
                  <span className="text-gray-900">{job.branchengruppe || '-'}</span>
                </div>
                <div className="flex justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                  <strong className="text-gray-700">{t('jobDetail.profession', 'Beruf')}:</strong>
                  <span className="text-gray-900">{job.beruf || '-'}</span>
                </div>
                <div className="flex justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                  <strong className="text-gray-700">{t('jobDetail.openPositions', 'Offene Stellen')}:</strong>
                  <span className="text-gray-900 font-semibold">{job.anzahlOffeneStellen || '-'}</span>
                </div>
                <div className="flex justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                  <strong className="text-gray-700">{t('jobDetail.companySize', 'Betriebsgröße')}:</strong>
                  <span className="text-gray-900">{job.betriebsgroesse || '-'}</span>
                </div>
                <div className="flex justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                  <strong className="text-gray-700">{t('jobDetail.suitableForRefugees', 'Für Flüchtlinge geeignet')}:</strong>
                  <span className="text-gray-900">{job.fuerFluechtlingeGeeignet !== undefined ? (job.fuerFluechtlingeGeeignet ? '✅ ' + t('jobDetail.yes', 'Ja') : '❌ ' + t('jobDetail.no', 'Nein')) : '-'}</span>
                </div>
                <div className="flex justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                  <strong className="text-gray-700">{t('jobDetail.onlyForDisabled', 'Nur für Schwerbehinderte')}:</strong>
                  <span className="text-gray-900">{job.nurFuerSchwerbehinderte !== undefined ? (job.nurFuerSchwerbehinderte ? '✅ ' + t('jobDetail.yes', 'Ja') : '❌ ' + t('jobDetail.no', 'Nein')) : '-'}</span>
                </div>
                <div className="flex justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                  <strong className="text-gray-700">{t('jobDetail.referenceNumber', 'Referenznummer')}:</strong>
                  <span className="text-gray-900 font-mono text-xs">{job.refnr || '-'}</span>
                </div>
              </div>
            </Card>
          </div>
        </div>

        {/* Related Jobs Section */}
        <Card className="p-8 mt-8 shadow-lg border border-gray-100 rounded-2xl text-center">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-12 h-12 bg-gradient-to-br from-teal-400 to-blue-500 rounded-xl flex items-center justify-center">
              <span className="text-2xl">🔍</span>
            </div>
            <h2 className="text-2xl font-bold text-gray-900">{t('jobDetail.relatedJobs', 'Ähnliche Jobs')}</h2>
          </div>
          <p className="text-gray-600 py-8 text-lg">
            {t('jobDetail.relatedSoon', 'Ähnliche Jobs werden bald verfügbar sein.')}
          </p>
        </Card>
      </div>
    </div>
  );
};

export default JobDetailPage;