// frontend/src/pages/Jobs/JobSearchPage.tsx
import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { Card } from '../../components/ui/Card';
import { Input } from '../../components/ui/Input';
import { Button } from '../../components/ui/Button';
import { Pagination } from '../../components/ui/Pagination';
import { fetchJobs } from '../../services/jobService';
import type { JobDetails } from '../../types/arbeitsagentur';

const ITEMS_PER_PAGE = 10;

const JobSearchPage: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [allJobs, setAllJobs] = useState<JobDetails[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [location, setLocation] = useState('');
  const [error, setError] = useState<string | null>(null);

  // Calculate pagination
  const totalPages = Math.ceil(allJobs.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const jobs = allJobs.slice(startIndex, endIndex);

  const handleSearch = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setLoading(true);
    setError(null);
    setCurrentPage(1); // Reset to first page on new search
    try {
      const { jobs: fetchedJobs } = await fetchJobs({
        q: searchTerm || undefined,
        location: location || undefined,
        page: 1,
        limit: 100 // Fetch more jobs for pagination
      });
      setAllJobs(fetchedJobs || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Fehler beim Laden der Jobs');
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setSearchTerm('');
    setLocation('');
    setCurrentPage(1);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Load initial jobs on component mount
  useEffect(() => {
    handleSearch();
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
    <div className="min-h-screen bg-linear-to-br from-blue-50 via-white to-purple-50 dark:bg-[#2C6C8B]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-gray-900 dark:text-slate-900 mb-4">
            {t('jobs.searchJobs')}
          </h1>
          <p className="text-xl text-gray-600 dark:text-slate-800">
            {t('jobs.findDreamJob')}
          </p>
        </div>

        {/* Search Form */}
        <Card className="mb-12 p-8 shadow-xl border-gray-100 dark:border-gray-600 rounded-2xl">
          <form onSubmit={handleSearch} className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <Input
                type="text"
                placeholder={t('jobs.whatPlaceholder')}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="h-14 text-lg px-6 rounded-xl border-2 border-gray-200 focus:border-teal-500 focus:ring-2 focus:ring-teal-200 transition-all"
              />
            </div>
            <div className="flex-1">
              <Input
                type="text"
                placeholder={t('jobs.wherePlaceholder')}
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="h-14 text-lg px-6 rounded-xl border-2 border-gray-200 focus:border-teal-500 focus:ring-2 focus:ring-teal-200 transition-all"
              />
            </div>
            <Button 
              type="submit" 
              disabled={loading}
              className="h-14 bg-linear-to-r from-teal-500 to-blue-600 hover:from-teal-600 hover:to-blue-700 text-white px-8 rounded-xl font-bold shadow-lg hover:shadow-xl transition-all transform hover:scale-105"
            >
              {loading ? (
                <span className="flex items-center gap-2">
                  <span className="animate-spin">🔄</span> {t('jobs.searching')}
                </span>
              ) : (
                <span className="flex items-center gap-2">
                  🔍 {t('jobs.search')}
                </span>
              )}
            </Button>
            <Button 
              type="button"
              onClick={handleReset}
              disabled={loading}
              className="h-14 bg-linear-to-r from-gray-500 to-gray-600 hover:from-gray-600 hover:to-gray-700 text-white px-8 rounded-xl font-bold shadow-lg hover:shadow-xl transition-all"
            >
              {t('jobs.reset')}
            </Button>
          </form>
        </Card>

        {/* Error Message */}
        {error && (
          <div className="mb-8 p-6 bg-red-50 border-2 border-red-200 text-red-700 rounded-2xl shadow-md">
            <div className="flex items-center gap-3">
              <span className="text-3xl">⚠️</span>
              <div>
                <p className="font-bold text-lg">{t('jobs.error')}</p>
                <p>{error}</p>
              </div>
            </div>
          </div>
        )}

        {/* Results Count */}
        {allJobs.length > 0 && !loading && (
          <div className="mb-6 flex justify-between items-center">
            <p className="text-lg text-gray-700 dark:text-slate-900">
              <span className="font-bold text-teal-600">{allJobs.length}</span> {t('jobs.jobsFound')}
              {totalPages > 1 && (
                <span className="text-gray-500 dark:text-slate-800 ml-2">
                  • {t('jobs.page')} {currentPage} {t('jobs.of')} {totalPages}
                </span>
              )}
            </p>
            <p className="text-sm text-gray-500 dark:text-slate-800">
              {t('jobs.showing')} {startIndex + 1} - {Math.min(endIndex, allJobs.length)} {t('jobs.of')} {allJobs.length}
            </p>
          </div>
        )}

        {/* Results */}
        <div className="grid gap-6">
          {allJobs.length === 0 && !loading && (
            <Card className="p-12 text-center rounded-2xl border-gray-200 dark:border-gray-600 shadow-lg">
              <div className="text-6xl mb-4">🔍</div>
              <p className="text-xl text-gray-600 dark:text-slate-900">
                {searchTerm || location ? t('jobs.noJobsFound') : t('jobs.startSearching')}
              </p>
            </Card>
          )}

        {jobs.map((job) => (
          <Card key={job.id || job.hashId} className="p-8 hover:shadow-2xl transition-all transform hover:scale-[1.02] rounded-2xl border-gray-100 dark:border-gray-600">
            <div className="flex justify-between items-start gap-6">
              <div className="flex-1">
                {/* Job Title */}
                <h2 className="text-3xl font-bold text-gray-900 dark:text-slate-900 mb-4 hover:text-teal-600 dark:hover:text-teal-700 transition-colors cursor-pointer"
                    onClick={() => navigate(`/jobs/${job.id || job.hashId}`)}>
                  {job.title || job.titel}
                </h2>

                {/* Company Info */}
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-linear-to-br from-orange-400 to-pink-500 rounded-xl flex items-center justify-center shadow-md">
                    <span className="text-2xl">🏢</span>
                  </div>
                  <div>
                    <p className="text-lg font-semibold text-gray-800 dark:text-slate-900">
                      {job.company?.display_name || job.arbeitgeber || t('jobs.notSpecified')}
                    </p>
                  </div>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-3 mb-4">
                  {/* Location */}
                  {(job.location?.display_name || (job.arbeitsorte && job.arbeitsorte.length > 0)) && (
                    <span className="inline-flex items-center px-4 py-2 bg-teal-100 text-teal-800 rounded-full text-sm font-medium">
                      📍 {job.location?.display_name || job.arbeitsorte?.map((ort) => 
                        [ort.plz, ort.ort].filter(Boolean).join(' ')
                      ).join(', ')}
                    </span>
                  )}

                  {/* Salary */}
                  {(job.salary_min || job.salary_max || job.verguetung) && (
                    <span className="inline-flex items-center px-4 py-2 bg-green-100 text-green-800 rounded-full text-sm font-medium">
                      💰 {job.verguetung || (job.salary_min && job.salary_max 
                        ? `€${job.salary_min.toLocaleString()} - €${job.salary_max.toLocaleString()}`
                        : job.salary_min 
                          ? `ab €${job.salary_min.toLocaleString()}`
                          : `bis €${job.salary_max?.toLocaleString()}`
                      )}
                    </span>
                  )}

                  {/* Category/Branch */}
                  {(job.category?.label || job.branche) && (
                    <span className="inline-flex items-center px-4 py-2 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
                      🏭 {job.category?.label || job.branche}
                    </span>
                  )}

                  {/* Contract Type */}
                  {(job.contract_type || job.befristung) && (
                    <span className="inline-flex items-center px-4 py-2 bg-purple-100 text-purple-800 rounded-full text-sm font-medium">
                      📋 {job.contract_type === 'permanent' ? t('jobs.permanentPosition') : job.contract_type || job.befristung}
                    </span>
                  )}

                  {/* Working Time */}
                  {job.arbeitszeitmodelle && job.arbeitszeitmodelle.length > 0 && (
                    <span className="inline-flex items-center px-4 py-2 bg-yellow-100 text-yellow-800 rounded-full text-sm font-medium">
                      ⏰ {job.arbeitszeitmodelle.join(', ')}
                    </span>
                  )}
                </div>

                {/* Description Preview */}
                {(job.description || job.stellenbeschreibung) && (
                  <div className="mt-4 p-4 bg-gray-50 dark:bg-[#2C6C8B] rounded-xl border border-gray-100 dark:border-gray-600">
                    <p className="text-gray-700 dark:text-slate-100 line-clamp-2 leading-relaxed">
                      {(job.description || job.stellenbeschreibung || '').substring(0, 200)}...
                    </p>
                  </div>
                )}
              </div>
              
              {/* Right Side - Date & Button */}
              <div className="flex flex-col items-end gap-4">
                <div className="text-right">
                  <p className="text-sm text-gray-500 dark:text-slate-800 mb-1">{t('jobs.published')}</p>
                  <p className="text-lg font-semibold text-gray-700 dark:text-slate-900">
                    {formatDate(job.created || job.modifikationsTimestamp)}
                  </p>
                </div>
                <Button 
                  onClick={() => navigate(`/jobs/${job.id || job.hashId}`)}
                  className="bg-linear-to-r from-orange-500 to-pink-600 hover:from-orange-600 hover:to-pink-700 text-white px-8 py-4 rounded-xl font-bold shadow-lg hover:shadow-xl transition-all transform hover:scale-105"
                >
                  {t('jobs.viewDetails')} →
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Pagination */}
      {allJobs.length > 0 && totalPages > 1 && (
        <div className="mt-12">
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        </div>
      )}
      </div>
    </div>
  );
};

export default JobSearchPage;