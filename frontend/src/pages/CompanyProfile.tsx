import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Card } from '../components/ui/Card';
import { Input } from '../components/ui/Input';
import { Button } from '../components/ui/Button';
import { Pagination } from '../components/ui/Pagination';
import { fetchJobs } from '../services/jobService';
import type { JobDetails } from '../types/arbeitsagentur';

const ITEMS_PER_PAGE = 10;

interface Company {
  name: string;
  jobCount: number;
  logo: string;
  description?: string;
  location?: string;
  jobs: JobDetails[];
}

const CompanyProfile: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [companies, setCompanies] = useState<Company[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredCompanies, setFilteredCompanies] = useState<Company[]>([]);
  const [currentPage, setCurrentPage] = useState(1);

  // Calculate pagination
  const totalPages = Math.ceil(filteredCompanies.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const displayedCompanies = filteredCompanies.slice(startIndex, endIndex);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  useEffect(() => {
    const loadCompanies = async () => {
      try {
        setLoading(true);
        const { jobs } = await fetchJobs({ page: 1, limit: 150 });
        
        // Group jobs by company
        const companyMap = new Map<string, Company>();
        
        jobs.forEach((job: JobDetails) => {
          const companyName = job.company?.display_name || job.arbeitgeber || t('companies.unknownCompany');
          
          if (companyMap.has(companyName)) {
            const company = companyMap.get(companyName)!;
            company.jobCount++;
            company.jobs.push(job);
          } else {
            companyMap.set(companyName, {
              name: companyName,
              jobCount: 1,
              logo: '🏢',
              location: job.location?.display_name || job.arbeitsorte?.[0]?.ort || '',
              description: job.company?.display_name ? t('companies.defaultDescription') : job.arbeitgeberdarstellung,
              jobs: [job]
            });
          }
        });

        const companiesArray = Array.from(companyMap.values())
          .sort((a, b) => b.jobCount - a.jobCount);
        
        setCompanies(companiesArray);
        setFilteredCompanies(companiesArray);
      } catch (error) {
        console.error('Error loading companies:', error);
      } finally {
        setLoading(false);
      }
    };

    loadCompanies();
  }, []);

  useEffect(() => {
    if (searchTerm) {
      setFilteredCompanies(
        companies.filter(company => 
          company.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          company.location?.toLowerCase().includes(searchTerm.toLowerCase())
        )
      );
      setCurrentPage(1); // Reset to first page on search
    } else {
      setFilteredCompanies(companies);
    }
  }, [searchTerm, companies]);

  const getCompanyInitials = (name: string) => {
    return name.split(' ').map(word => word[0]).join('').toUpperCase().substring(0, 2);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-linear-to-br from-blue-50 via-white to-purple-50 dark:bg-[#2C6C8B]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="animate-pulse">
            <div className="h-12 bg-gray-200 rounded mb-4 w-1/3"></div>
            <div className="h-8 bg-gray-200 rounded mb-8 w-2/3"></div>
            <div className="grid gap-6">
              {[1, 2, 3, 4, 5].map(i => (
                <div key={i} className="h-32 bg-gray-200 rounded"></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-linear-to-br from-blue-50 via-white to-purple-50 dark:bg-[#2C6C8B]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-gray-900 mb-4">
            {t('companies.title')}
          </h1>
          <p className="text-xl text-gray-600">
            {t('companies.subtitle')}
          </p>
        </div>

        {/* Search Bar */}
        <Card className="mb-12 p-6 shadow-xl border border-gray-100 rounded-2xl bg-white dark:bg-[#BCD4E6]">
          <div className="flex gap-4">
            <Input
              type="text"
              placeholder={t('companies.searchPlaceholder')}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="flex-1 h-14 text-lg px-6 rounded-xl border-2 border-gray-200 focus:border-teal-500 focus:ring-2 focus:ring-teal-200 transition-all"
            />
            <div onClick={(e) => { e.stopPropagation(); setSearchTerm(''); }}>
              <Button 
                className="h-14 bg-linear-to-r from-gray-500 to-gray-600 hover:from-gray-600 hover:to-gray-700 text-white px-8 rounded-xl font-bold shadow-lg hover:shadow-xl transition-all"
              >
                {t('companies.reset')}
              </Button>
            </div>
          </div>
        </Card>

        {/* Stats */}
        <div className="mb-8 flex justify-between items-center">
          <p className="text-lg text-gray-700">
            <span className="font-bold text-teal-600">{filteredCompanies.length}</span> {t('companies.companiesFound')}
            <span className="mx-2">•</span>
            <span className="font-bold text-purple-600">{filteredCompanies.reduce((sum, c) => sum + c.jobCount, 0)}</span> {t('companies.openPositions')}
            {totalPages > 1 && (
              <>
                <span className="mx-2">•</span>
                <span className="text-gray-500">
                  {t('companies.page')} {currentPage} {t('companies.of')} {totalPages}
                </span>
              </>
            )}
          </p>
          <p className="text-sm text-gray-500">
            {t('companies.showing')} {startIndex + 1} - {Math.min(endIndex, filteredCompanies.length)} {t('companies.of')} {filteredCompanies.length}
          </p>
        </div>

        {/* Companies Grid */}
        <div className="grid gap-6">
          {displayedCompanies.map((company, index) => (
            <Card 
              key={index} 
              className="p-8 hover:shadow-2xl transition-all transform hover:scale-[1.02] rounded-2xl border border-gray-100 bg-white dark:bg-[#BCD4E6]"
            >
              <div 
                className="flex items-start gap-6 cursor-pointer"
                onClick={() => {
                  // Navigate to jobs page with company filter
                  navigate(`/jobs?company=${encodeURIComponent(company.name)}`);
                }}
              >
                {/* Company Logo */}
                <div className="w-20 h-20 bg-linear-to-br from-teal-400 to-blue-500 rounded-2xl flex items-center justify-center shrink-0 shadow-lg">
                  <span className="text-white font-bold text-2xl">
                    {getCompanyInitials(company.name)}
                  </span>
                </div>

                {/* Company Info */}
                <div className="flex-1">
                  <h2 className="text-3xl font-bold text-gray-900 mb-3 hover:text-teal-600 transition-colors">
                    {company.name}
                  </h2>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-3 mb-4">
                    <span className="inline-flex items-center px-4 py-2 bg-purple-100 text-purple-800 rounded-full text-sm font-medium">
                      💼 {company.jobCount} {company.jobCount === 1 ? t('companies.openPosition') : t('companies.openPositions')}
                    </span>
                    {company.location && (
                      <span className="inline-flex items-center px-4 py-2 bg-teal-100 text-teal-800 rounded-full text-sm font-medium">
                        📍 {company.location}
                      </span>
                    )}
                  </div>

                  {/* Description */}
                  {company.description && (
                    <p className="text-gray-700 mb-4 line-clamp-2">
                      {company.description}
                    </p>
                  )}

                  {/* Job Samples */}
                  <div className="mt-4">
                    <p className="text-sm font-semibold text-gray-600 mb-2">{t('companies.examplePositions')}:</p>
                    <div className="flex flex-wrap gap-2">
                      {company.jobs.slice(0, 3).map((job, idx) => (
                        <span key={idx} className="inline-flex items-center px-3 py-1 bg-gray-100 text-gray-700 rounded-lg text-sm">
                          {job.title || job.titel}
                        </span>
                      ))}
                      {company.jobCount > 3 && (
                        <span className="inline-flex items-center px-3 py-1 bg-gray-200 text-gray-600 rounded-lg text-sm font-semibold">
                          +{company.jobCount - 3} {t('companies.more')}
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                {/* CTA Button */}
                <div className="flex flex-col items-end gap-3">
                  <div onClick={(e) => e.stopPropagation()}>
                    <Button 
                      onClick={() => {
                        navigate(`/jobs?company=${encodeURIComponent(company.name)}`);
                      }}
                      className="bg-linear-to-r from-orange-500 to-pink-600 hover:from-orange-600 hover:to-pink-700 text-white px-8 py-4 rounded-xl font-bold shadow-lg hover:shadow-xl transition-all transform hover:scale-105"
                    >
                      {t('companies.allPositions')} →
                    </Button>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Pagination */}
        {filteredCompanies.length > 0 && totalPages > 1 && (
          <div className="mt-12">
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          </div>
        )}

        {/* No Results */}
        {filteredCompanies.length === 0 && !loading && (
          <Card className="p-12 text-center rounded-2xl border border-gray-200 bg-white dark:bg-[#BCD4E6] shadow-lg">
            <div className="text-6xl mb-4">🔍</div>
            <p className="text-xl text-gray-600">
              {t('companies.noResults')} "{searchTerm}"
            </p>
          </Card>
        )}
      </div>
    </div>
  );
};

export default CompanyProfile;
