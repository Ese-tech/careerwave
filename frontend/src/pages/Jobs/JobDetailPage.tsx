// frontend/src/pages/Jobs/JobDetailPage.tsx
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { arbeitsagenturService, type ArbeitsagenturJob } from '../../services/arbeitsagentur.service';
import { Layout } from '../../components/layout';

const JobDetailPage: React.FC = () => {
  const { t } = useTranslation();
  const { hashId } = useParams<{ hashId: string }>();
  const navigate = useNavigate();
  // ...existing code...
  const [job, setJob] = useState<ArbeitsagenturJob | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!hashId || hashId === 'undefined') {
      setError(t('jobDetail.error.missingId', 'Job ID fehlt'));
      setLoading(false);
      return;
    }

    const loadJobDetails = async () => {
      try {
        setLoading(true);
        const jobDetails = await arbeitsagenturService.getJobDetails(hashId);
        
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
  }, [hashId]);

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

  const formatLocation = (arbeitsorte?: Array<{ort?: string; plz?: string; region?: string}>) => {
    if (!arbeitsorte || arbeitsorte.length === 0) return t('jobDetail.notSpecified', 'Nicht angegeben');
    
    return arbeitsorte.map(ort => {
      const parts = [ort.plz, ort.ort, ort.region].filter(Boolean);
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
                  className="w-full bg-teal-600 hover:bg-teal-700 text-white"
                  onClick={() => {
                    // TODO: Implement application functionality
                    alert(t('jobDetail.applySoon', 'Bewerbungsfunktion wird bald verfügbar sein!'));
                  }}
                >
                  🚀 Jetzt bewerben
                </Button>
                
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
            {job.arbeitgeber && (
              <Card className="p-6 mt-6">
                <h3 className="text-lg font-semibold mb-3">{t('jobDetail.aboutCompany', 'Über das Unternehmen')}</h3>
                <div className="text-center">
                  <div className="w-16 h-16 bg-teal-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <span className="text-2xl">🏢</span>
                  </div>
                  <p className="font-medium text-gray-800">{job.arbeitgeber}</p>
                  <p className="text-sm text-gray-600 mt-2">
                    {t('jobDetail.companyInfo', 'Weitere Informationen über das Unternehmen finden Sie in der Stellenausschreibung.')}
                  </p>
                </div>
              </Card>
            )}
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