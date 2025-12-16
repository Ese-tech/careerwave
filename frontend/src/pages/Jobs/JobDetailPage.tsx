// frontend/src/pages/Jobs/JobDetailPage.tsx
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { arbeitsagenturService } from '../../services/arbeitsagentur.service';
import type { JobDetails } from '../../types/arbeitsagentur';
import { Layout } from '../../components/layout';

const JobDetailPage: React.FC = () => {
  const { t } = useTranslation();
  const { hashId } = useParams<{ hashId: string }>();
  const navigate = useNavigate();
  // ...existing code...
  const [job, setJob] = useState<JobDetails | null>(null);
  const [showApplyModal, setShowApplyModal] = useState(false);
  const [application, setApplication] = useState({ name: '', email: '', message: '' });
  const [applicationSuccess, setApplicationSuccess] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!hashId || hashId === 'undefined') {
      navigate('/jobs', { replace: true });
      return;
    }

    const loadJobDetails = async () => {
      try {
        setLoading(true);
        const jobDetails = await arbeitsagenturService.getJobDetails(hashId) as JobDetails;
        if (!jobDetails) {
          setError(t('jobDetail.error.notFound', 'Job nicht gefunden'));
        } else {
          setJob(jobDetails);
        }
      } catch (err: any) {
        setError(err.message || t('jobDetail.error.load', 'Fehler beim Laden der Job-Details'));
      } finally {
        setLoading(false);
      }
    };

    loadJobDetails();
  }, [hashId, navigate, t]);

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
      <Layout>
        <div className="max-w-4xl mx-auto p-6">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded mb-4"></div>
            <div className="h-4 bg-gray-200 rounded mb-2"></div>
            <div className="h-4 bg-gray-200 rounded mb-2"></div>
            <div className="h-32 bg-gray-200 rounded"></div>
          </div>
        </div>
      </Layout>
    );
  }

  if (error || !job) {
    return (
      <Layout>
        <div className="max-w-4xl mx-auto p-6">
          <Card className="p-8 text-center">
            <h1 className="text-2xl font-bold text-red-600 mb-4">
              {error || t('jobDetail.error.notFound', 'Job nicht gefunden')}
            </h1>
            <p className="text-gray-600 mb-6">
              {t('jobDetail.error.notFoundDesc', 'Der gewünschte Job konnte nicht gefunden werden.')}
            </p>
            <div className="space-x-4">
              <Button 
                onClick={() => navigate(-1)}
                className="bg-gray-500 hover:bg-gray-600"
              >
                {t('jobDetail.back', 'Zurück')}
              </Button>
              <Link to="/jobs">
                <Button className="bg-teal-600 hover:bg-teal-700">
                  {t('jobDetail.toJobSearch', 'Zur Jobsuche')}
                </Button>
              </Link>
            </div>
          </Card>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="max-w-4xl mx-auto p-6">
        {/* Header */}
        <div className="mb-6">
          <nav className="text-sm text-gray-600 mb-4">
            <Link to="/jobs" className="hover:text-teal-600">{t('jobDetail.breadcrumb.jobs', 'Jobs')}</Link>
            <span className="mx-2">›</span>
            <span className="text-gray-800">{t('jobDetail.breadcrumb.details', 'Job-Details')}</span>
          </nav>
          
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-3xl font-bold text-gray-800 mb-2">
                {job.titel}
              </h1>
              <p className="text-xl text-gray-600">
                {job.arbeitgeber || t('jobDetail.unknownEmployer', 'Unbekannter Arbeitgeber')}
              </p>
            </div>
            
            <Button 
              onClick={() => navigate(-1)}
              className="bg-gray-500 hover:bg-gray-600 text-white"
            >
              ← {t('jobDetail.back', 'Zurück')}
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Job Description */}
            {job.stellenbeschreibung && (
              <Card className="p-6 mb-6">
                <h2 className="text-xl font-semibold mb-4">{t('jobDetail.description', 'Stellenbeschreibung')}</h2>
                <div 
                  className="prose max-w-none text-gray-700"
                  dangerouslySetInnerHTML={{ 
                    __html: job.stellenbeschreibung.replace(/\n/g, '<br/>') 
                  }}
                />
              </Card>
            )}

            {/* Requirements & Skills */}
            <Card className="p-6 mb-6">
              <h2 className="text-xl font-semibold mb-4">{t('jobDetail.requirements', 'Anforderungen')}</h2>
              <div className="text-gray-700">
                <p className="mb-2">
                  <strong>{t('jobDetail.industry', 'Branche')}:</strong> {job.branche || t('jobDetail.notSpecified', 'Nicht spezifiziert')}
                </p>
                
                {job.arbeitszeitmodelle && job.arbeitszeitmodelle.length > 0 && (
                  <p className="mb-2">
                    <strong>{t('jobDetail.workingTime', 'Arbeitszeit')}:</strong> {job.arbeitszeitmodelle.join(', ')}
                  </p>
                )}
                
                <p className="mb-2">
                  <strong>{t('jobDetail.limited', 'Befristung')}:</strong> {job.befristung || t('jobDetail.notSpecified', 'Nicht angegeben')}
                </p>
              </div>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            {/* Quick Info Card */}
            <Card className="p-6 mb-6">
              <h3 className="text-lg font-semibold mb-4">{t('jobDetail.info', 'Job-Informationen')}</h3>
              
              <div className="space-y-3">
                <div>
                  <p className="text-sm font-medium text-gray-600">{t('jobDetail.location', 'Standort')}</p>
                  <p className="text-gray-800">
                    📍 {formatLocation(job.arbeitsorte)}
                  </p>
                </div>

                {job.verguetung && (
                  <div>
                    <p className="text-sm font-medium text-gray-600">{t('jobDetail.salary', 'Vergütung')}</p>
                    <p className="text-green-600 font-semibold">
                      💰 {job.verguetung}
                    </p>
                  </div>
                )}

                <div>
                  <p className="text-sm font-medium text-gray-600">{t('jobDetail.entryDate', 'Eintrittsdatum')}</p>
                  <p className="text-gray-800">
                    📅 {formatDate(job.eintrittsdatum)}
                  </p>
                </div>

                <div>
                  <p className="text-sm font-medium text-gray-600">{t('jobDetail.published', 'Veröffentlicht')}</p>
                  <p className="text-gray-800">
                    🕒 {formatDate(job.modifikationsTimestamp)}
                  </p>
                </div>

                {job.befristung && (
                  <div>
                    <p className="text-sm font-medium text-gray-600">{t('jobDetail.limited', 'Befristung')}</p>
                    <p className="text-gray-800">
                      ⏰ {job.befristung}
                    </p>
                  </div>
                )}
              </div>
            </Card>

            {/* Action Buttons */}
            <Card className="p-6">
              <div className="space-y-3">
                <Button 
                  className="w-full bg-yellow-400 hover:bg-yellow-500 text-black"
                  onClick={() => setShowApplyModal(true)}
                >
                  🚀 {t('jobDetail.applyNow', 'Jetzt bewerben')}
                </Button>
                      {/* Application Modal */}
                      {showApplyModal && (
                        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
                          <div className="bg-white rounded-lg shadow-lg p-8 max-w-md w-full relative">
                            <button className="absolute top-2 right-2 text-gray-500 hover:text-black" onClick={() => setShowApplyModal(false)}>&times;</button>
                            <h2 className="text-xl font-bold mb-4">{t('jobDetail.applyForJob', 'Für diesen Job bewerben')}</h2>
                            {applicationSuccess ? (
                              <div className="text-green-600 font-semibold text-center mb-4">{t('jobDetail.applicationSuccess', 'Bewerbung erfolgreich gesendet!')}</div>
                            ) : (
                              <form onSubmit={e => {
                                e.preventDefault();
                                setApplicationSuccess(true);
                                setTimeout(() => {
                                  setShowApplyModal(false);
                                  setApplicationSuccess(false);
                                  setApplication({ name: '', email: '', message: '' });
                                }, 2000);
                              }}>
                                <label className="block mb-2 font-medium">{t('jobDetail.name', 'Name')}</label>
                                <input className="admin-input mb-4" required value={application.name} onChange={e => setApplication(a => ({ ...a, name: e.target.value }))} />
                                <label className="block mb-2 font-medium">{t('jobDetail.email', 'E-Mail')}</label>
                                <input className="admin-input mb-4" type="email" required value={application.email} onChange={e => setApplication(a => ({ ...a, email: e.target.value }))} />
                                <label className="block mb-2 font-medium">{t('jobDetail.message', 'Nachricht')}</label>
                                <textarea className="admin-input mb-4" required rows={4} value={application.message} onChange={e => setApplication(a => ({ ...a, message: e.target.value }))} />
                                <Button className="w-full bg-yellow-400 hover:bg-yellow-500 text-black" type="submit">{t('jobDetail.sendApplication', 'Bewerbung senden')}</Button>
                              </form>
                            )}
                          </div>
                        </div>
                      )}
                
                <Button 
                  className="w-full bg-orange-500 hover:bg-orange-600 text-white"
                  onClick={() => {
                    // TODO: Implement save functionality
                    alert(t('jobDetail.saved', 'Job gespeichert!'));
                  }}
                >
                  ⭐ Job speichern
                </Button>
                
                <Button 
                  className="w-full bg-purple-600 hover:bg-purple-700 text-white"
                  onClick={() => {
                    if (navigator.share) {
                      navigator.share({
                        title: job.titel,
                        text: `${job.titel} bei ${job.arbeitgeber}`,
                        url: window.location.href,
                      });
                    } else {
                      navigator.clipboard.writeText(window.location.href);
                      alert(t('jobDetail.linkCopied', 'Link kopiert!'));
                    }
                  }}
                >
                  🔗 Job teilen
                </Button>
              </div>

              <div className="mt-6 pt-4 border-t">
                <p className="text-xs text-gray-500 text-center">
                  {t('jobDetail.jobId', 'Job-ID')}: {job.hashId}
                </p>
              </div>
            </Card>

            {/* Company Info */}
            {/* Company Info Expanded */}
            <Card className="p-6 mt-6">
              <h3 className="text-lg font-semibold mb-3">{t('jobDetail.aboutCompany', 'Über das Unternehmen')}</h3>
              <div className="text-center">
                <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <span className="text-2xl">🏢</span>
                </div>
                <p className="font-medium text-gray-800">{job.arbeitgeber}</p>
                {job.arbeitgeberAdresse && (
                  <p className="text-sm text-gray-600 mt-2">
                    {job.arbeitgeberAdresse.strasse}, {job.arbeitgeberAdresse.plz} {job.arbeitgeberAdresse.ort}
                  </p>
                )}
                {job.arbeitgeberdarstellung && (
                  <p className="text-sm text-gray-600 mt-2">{job.arbeitgeberdarstellung}</p>
                )}
                {job.arbeitgeberdarstellungUrl && (
                  <a href={job.arbeitgeberdarstellungUrl} target="_blank" rel="noopener noreferrer" className="text-yellow-600 underline mt-2 block">{t('jobDetail.companyWebsite', 'Zur Unternehmenswebseite')}</a>
                )}
              </div>
            </Card>
                    {/* More Job Details */}
                    <Card className="p-6 mt-6">
                      <h3 className="text-lg font-semibold mb-3">{t('jobDetail.moreDetails', 'Weitere Job-Details')}</h3>
                      <ul className="text-sm text-gray-700 space-y-1">
                        <li><strong>{t('jobDetail.jobType', 'Angebotsart')}:</strong> {job.angebotsart}</li>
                        <li><strong>{t('jobDetail.branchGroup', 'Branchengruppe')}:</strong> {job.branchengruppe}</li>
                        <li><strong>{t('jobDetail.profession', 'Beruf')}:</strong> {job.beruf}</li>
                        <li><strong>{t('jobDetail.openPositions', 'Offene Stellen')}:</strong> {job.anzahlOffeneStellen}</li>
                        <li><strong>{t('jobDetail.companySize', 'Betriebsgröße')}:</strong> {job.betriebsgroesse}</li>
                        <li><strong>{t('jobDetail.suitableForRefugees', 'Für Flüchtlinge geeignet')}:</strong> {job.fuerFluechtlingeGeeignet ? t('jobDetail.yes', 'Ja') : t('jobDetail.no', 'Nein')}</li>
                        <li><strong>{t('jobDetail.onlyForDisabled', 'Nur für Schwerbehinderte')}:</strong> {job.nurFuerSchwerbehinderte ? t('jobDetail.yes', 'Ja') : t('jobDetail.no', 'Nein')}</li>
                        <li><strong>{t('jobDetail.limited', 'Befristung')}:</strong> {job.befristung}</li>
                        <li><strong>{t('jobDetail.entryDate', 'Eintrittsdatum')}:</strong> {formatDate(job.eintrittsdatum)}</li>
                        <li><strong>{t('jobDetail.firstPublished', 'Erste Veröffentlichung')}:</strong> {formatDate(job.ersteVeroeffentlichungsdatum)}</li>
                        <li><strong>{t('jobDetail.currentPublished', 'Aktuelle Veröffentlichung')}:</strong> {formatDate(job.aktuelleVeroeffentlichungsdatum)}</li>
                        <li><strong>{t('jobDetail.referenceNumber', 'Referenznummer')}:</strong> {job.refnr}</li>
                        <li><strong>{t('jobDetail.alliancePartner', 'Allianzpartner')}:</strong> {job.allianzpartner} {job.allianzpartnerUrl && (<a href={job.allianzpartnerUrl} target="_blank" rel="noopener noreferrer" className="text-yellow-600 underline">{job.allianzpartnerUrl}</a>)}</li>
                      </ul>
                    </Card>
          </div>
        </div>

        {/* Related Jobs Section */}
        <Card className="p-6 mt-8">
          <h2 className="text-xl font-semibold mb-4">{t('jobDetail.relatedJobs', 'Ähnliche Jobs')}</h2>
          <p className="text-gray-600 text-center py-8">
            {t('jobDetail.relatedSoon', 'Ähnliche Jobs werden bald verfügbar sein.')}
          </p>
        </Card>
      </div>
    </Layout>
  );
};

export default JobDetailPage;