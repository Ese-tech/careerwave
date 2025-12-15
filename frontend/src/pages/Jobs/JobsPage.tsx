// frontend/src/pages/Jobs/JobsPage.tsx
import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useArbeitsagentur } from '../../hooks/useArbeitsagentur';
import type { JobSearchParams } from '../../types/arbeitsagentur';

const JobsPage: React.FC = () => {
  const { t } = useTranslation();
  const {
    jobs,
    totalJobs,
    currentPage,
    totalPages,
    isLoading,
    error,
    searchJobs,
    searchMore,
    clearResults
  } = useArbeitsagentur();

  const [searchParams, setSearchParams] = useState<JobSearchParams>({
    was: '',
    wo: '',
    size: 25,
  });

  const [showFilters, setShowFilters] = useState(false);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    await searchJobs(searchParams);
  };

  const handleInputChange = (field: keyof JobSearchParams, value: any) => {
    setSearchParams(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleLoadMore = async () => {
    await searchMore();
  };

  // Load initial jobs
  useEffect(() => {
    searchJobs({ size: 25 });
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            {t('jobs.findDreamJob')}
          </h1>
          <p className="text-lg text-gray-600">
            Durchsuchen Sie Deutschlands größte Stellendatenbank powered by Arbeitsagentur
          </p>
        </div>

        {/* Search Form */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <form onSubmit={handleSearch} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Was (Beruf, Firma, Stichwort)
                </label>
                <input
                  type="text"
                  value={searchParams.was || ''}
                  onChange={(e) => handleInputChange('was', e.target.value)}
                  placeholder="z.B. Softwareentwickler, Marketing Manager"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-teal-500 focus:border-teal-500"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Wo (Ort, PLZ, Region)
                </label>
                <input
                  type="text"
                  value={searchParams.wo || ''}
                  onChange={(e) => handleInputChange('wo', e.target.value)}
                  placeholder="z.B. Berlin, 10115, Hamburg"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-teal-500 focus:border-teal-500"
                />
              </div>
            </div>

            {/* Filter Toggle */}
            <div className="flex justify-between items-center">
              <button
                type="button"
                onClick={() => setShowFilters(!showFilters)}
                className="text-teal-600 hover:text-teal-800 font-medium"
              >
                {showFilters ? 'Filter ausblenden' : 'Erweiterte Filter'}
              </button>
              
              <div className="flex space-x-2">
                <button
                  type="button"
                  onClick={clearResults}
                  className="px-4 py-2 text-gray-600 border border-gray-300 rounded-md hover:bg-gray-50"
                >
                  Zurücksetzen
                </button>
                <button
                  type="submit"
                  disabled={isLoading}
                  className="px-6 py-2 bg-teal-600 text-white rounded-md hover:bg-teal-700 disabled:opacity-50"
                >
                  {isLoading ? 'Suche...' : 'Jobs suchen'}
                </button>
              </div>
            </div>

            {/* Extended Filters */}
            {showFilters && (
              <div className="border-t pt-4 mt-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Befristung
                    </label>
                    <select
                      value={searchParams.befristung || ''}
                      onChange={(e) => handleInputChange('befristung', e.target.value || undefined)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-teal-500 focus:border-teal-500"
                    >
                      <option value="">Alle</option>
                      <option value="UNBEFRISTET">Unbefristet</option>
                      <option value="BEFRISTET">Befristet</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Arbeitszeit
                    </label>
                    <div className="space-y-2">
                      <label className="flex items-center">
                        <input
                          type="checkbox"
                          checked={searchParams.vollzeit || false}
                          onChange={(e) => handleInputChange('vollzeit', e.target.checked)}
                          className="mr-2"
                        />
                        Vollzeit
                      </label>
                      <label className="flex items-center">
                        <input
                          type="checkbox"
                          checked={searchParams.teilzeit || false}
                          onChange={(e) => handleInputChange('teilzeit', e.target.checked)}
                          className="mr-2"
                        />
                        Teilzeit
                      </label>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Stellenarten
                    </label>
                    <div className="space-y-2">
                      <label className="flex items-center">
                        <input
                          type="checkbox"
                          checked={searchParams.ausbildung || false}
                          onChange={(e) => handleInputChange('ausbildung', e.target.checked)}
                          className="mr-2"
                        />
                        Ausbildung
                      </label>
                      <label className="flex items-center">
                        <input
                          type="checkbox"
                          checked={searchParams.praktikum || false}
                          onChange={(e) => handleInputChange('praktikum', e.target.checked)}
                          className="mr-2"
                        />
                        Praktikum
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </form>
        </div>

        {/* Results Summary */}
        {totalJobs > 0 && (
          <div className="mb-6">
            <p className="text-gray-600">
              {totalJobs.toLocaleString('de-DE')} Stellenangebote gefunden
              {searchParams.was && (
                <span className="font-medium"> für "{searchParams.was}"</span>
              )}
              {searchParams.wo && (
                <span className="font-medium"> in "{searchParams.wo}"</span>
              )}
            </p>
          </div>
        )}

        {/* Error Message */}
        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-md">
            <p className="text-red-800">{error}</p>
          </div>
        )}

        {/* Job Results */}
        <div className="space-y-6">
          {jobs.map((job) => {
            return (
              <div key={job.hashId} className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">
                      {job.titel}
                    </h3>
                    <p className="text-lg text-gray-700 mb-1">{job.arbeitgeber}</p>
                    <p className="text-gray-600">
                      {job.arbeitsorte.map(ort => `${ort.ort}, ${ort.plz}`).join('; ')}
                    </p>
                  </div>
                  
                  <div className="text-right">
                    <span className="inline-block bg-orange-100 text-orange-800 px-2 py-1 rounded-full text-sm mb-2">
                      Arbeitsagentur
                    </span>
                    {job.verguetung && (
                      <p className="text-green-600 font-medium">{job.verguetung}</p>
                    )}
                  </div>
                </div>

                <div className="mb-4">
                  <p className="text-gray-700 line-clamp-3">
                    {job.stellenbeschreibung.replace(/<[^>]*>/g, '').substring(0, 200)}...
                  </p>
                </div>

                <div className="flex flex-wrap gap-2 mb-4">
                  {job.branche && (
                    <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
                      {job.branche}
                    </span>
                  )}
                  <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-sm">
                    {job.befristung === 'UNBEFRISTET' ? 'Unbefristet' : 'Befristet'}
                  </span>
                  {job.anzahlOffeneStellen > 1 && (
                    <span className="px-2 py-1 bg-purple-100 text-purple-800 rounded-full text-sm">
                      {job.anzahlOffeneStellen} Stellen
                    </span>
                  )}
                </div>

                <div className="flex justify-between items-center">
                  <div className="text-sm text-gray-500">
                    <p>Veröffentlicht: {new Date(job.aktuelleVeroeffentlichungsdatum).toLocaleDateString('de-DE')}</p>
                    <p>Referenz: {job.refnr}</p>
                  </div>
                  
                  <div className="flex space-x-2">
                    <a
                      href={`https://www.arbeitsagentur.de/jobsuche/jobdetail/${job.hashId}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-4 py-2 bg-teal-600 text-white rounded-md hover:bg-teal-700"
                    >
                      Details ansehen
                    </a>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Load More Button */}
        {jobs.length > 0 && currentPage < totalPages && (
          <div className="text-center mt-8">
            <button
              onClick={handleLoadMore}
              disabled={isLoading}
              className="px-6 py-3 bg-teal-600 text-white rounded-md hover:bg-teal-700 disabled:opacity-50"
            >
              {isLoading ? 'Lädt...' : 'Weitere Jobs laden'}
            </button>
            <p className="text-gray-600 mt-2">
              Seite {currentPage} von {totalPages}
            </p>
          </div>
        )}

        {/* No Results */}
        {!isLoading && jobs.length === 0 && !error && (
          <div className="text-center py-12">
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              Keine Jobs gefunden
            </h3>
            <p className="text-gray-600">
              Versuchen Sie es mit anderen Suchbegriffen oder erweitern Sie Ihre Filter.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default JobsPage;