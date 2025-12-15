// frontend/src/pages/Jobs/JobSearchPage.tsx
import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { Card } from '../../components/ui/Card';
import { Input } from '../../components/ui/Input';
import { Button } from '../../components/ui/Button';
import { arbeitsagenturService, type ArbeitsagenturJob } from '../../services/arbeitsagentur.service';

const JobSearchPage: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [jobs, setJobs] = useState<ArbeitsagenturJob[]>([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [location, setLocation] = useState('');
  const [error, setError] = useState<string | null>(null);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    
    try {
      const result = await arbeitsagenturService.searchJobs({
        was: searchTerm || undefined,
        wo: location || undefined,
        size: 20
      });
      
      setJobs(result.stellenangebote || []);
    } catch (err: any) {
      setError(err.message || 'Fehler beim Laden der Jobs');
    } finally {
      setLoading(false);
    }
  };

  // Load initial jobs on component mount
  useEffect(() => {
    handleSearch({ preventDefault: () => {} } as React.FormEvent);
  }, []);

  const formatDate = (dateString?: string) => {
    if (!dateString) return '';
    try {
      return new Date(dateString).toLocaleDateString('de-DE');
    } catch {
      return dateString;
    }
  };

  return (
    <div className="max-w-7xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">
        {t('jobs.searchJobs')} - Arbeitsagentur
      </h1>

      {/* Search Form */}
      <Card className="mb-8 p-6">
        <form onSubmit={handleSearch} className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <Input
              type="text"
              placeholder="Was? (z.B. Developer, Designer...)"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="flex-1">
            <Input
              type="text"
              placeholder="Wo? (z.B. Berlin, München...)"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
            />
          </div>
          <Button 
            type="submit" 
            disabled={loading}
            className="bg-teal-600 hover:bg-teal-700 text-white px-8"
          >
            {loading ? 'Suche...' : 'Suchen'}
          </Button>
        </form>
      </Card>

      {/* Error Message */}
      {error && (
        <div className="mb-6 p-4 bg-red-100 border border-red-400 text-red-700 rounded">
          {error}
        </div>
      )}

      {/* Results */}
      <div className="grid gap-6">
        {jobs.length === 0 && !loading && (
          <Card className="p-6 text-center text-gray-500">
            {searchTerm || location ? 'Keine Jobs gefunden.' : 'Starten Sie eine Suche um Jobs zu finden.'}
          </Card>
        )}

        {jobs.map((job) => (
          <Card key={job.hashId} className="p-6 hover:shadow-lg transition-shadow">
            <div className="flex justify-between items-start mb-4">
              <div className="flex-1">
                <h2 className="text-xl font-semibold text-gray-800 mb-2">
                  {job.titel}
                </h2>
                <p className="text-gray-600 mb-2">
                  <strong>Arbeitgeber:</strong> {job.arbeitgeber || 'Nicht angegeben'}
                </p>
                
                {job.arbeitsorte && job.arbeitsorte.length > 0 && (
                  <p className="text-gray-600 mb-2">
                    <strong>Ort:</strong> {job.arbeitsorte.map(ort => 
                      [ort.plz, ort.ort].filter(Boolean).join(' ')
                    ).join(', ')}
                  </p>
                )}

                {job.branche && (
                  <p className="text-gray-600 mb-2">
                    <strong>Branche:</strong> {job.branche}
                  </p>
                )}

                {job.verguetung && (
                  <p className="text-green-600 font-semibold mb-2">
                    💰 {job.verguetung}
                  </p>
                )}

                {job.befristung && (
                  <p className="text-gray-600 mb-2">
                    <strong>Befristung:</strong> {job.befristung}
                  </p>
                )}

                {job.eintrittsdatum && (
                  <p className="text-gray-600 mb-2">
                    <strong>Eintrittsdatum:</strong> {formatDate(job.eintrittsdatum)}
                  </p>
                )}

                {job.arbeitszeitmodelle && job.arbeitszeitmodelle.length > 0 && (
                  <p className="text-gray-600 mb-2">
                    <strong>Arbeitszeit:</strong> {job.arbeitszeitmodelle.join(', ')}
                  </p>
                )}
              </div>
              
              <div className="ml-4 text-right">
                <p className="text-sm text-gray-500 mb-2">
                  {formatDate(job.modifikationsTimestamp)}
                </p>
                <Button 
                  onClick={() => {
                    navigate(`/jobs/${job.hashId}`);
                  }}
                  className="bg-orange-500 hover:bg-orange-600 text-white"
                >
                  Details ansehen
                </Button>
              </div>
            </div>

            {job.stellenbeschreibung && (
              <div className="border-t pt-4">
                <p className="text-gray-700 line-clamp-3">
                  {job.stellenbeschreibung.substring(0, 200)}...
                </p>
              </div>
            )}
          </Card>
        ))}
      </div>

      {/* Load More Button */}
      {jobs.length > 0 && (
        <div className="text-center mt-8">
          <Button 
            onClick={() => {
              // TODO: Implement pagination
              console.log('Load more jobs');
            }}
            className="bg-purple-600 hover:bg-purple-700 text-white px-8"
          >
            Mehr Jobs laden
          </Button>
        </div>
      )}
    </div>
  );
};

export default JobSearchPage;