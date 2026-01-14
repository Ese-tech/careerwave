import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Card } from '../components/ui/Card';
import { Input } from '../components/ui/Input';

const FindCandidates: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');

  const features = [
    {
      icon: '🔍',
      title: t('findCandidates.features.smartSearch.title'),
      description: t('findCandidates.features.smartSearch.description')
    },
    {
      icon: '🎯',
      title: t('findCandidates.features.perfectMatch.title'),
      description: t('findCandidates.features.perfectMatch.description')
    },
    {
      icon: '📧',
      title: t('findCandidates.features.directContact.title'),
      description: t('findCandidates.features.directContact.description')
    },
    {
      icon: '📊',
      title: t('findCandidates.features.detailedProfiles.title'),
      description: t('findCandidates.features.detailedProfiles.description')
    }
  ];

  const candidateTypes = [
    {
      title: t('findCandidates.categories.itSoftware.title'),
      count: t('findCandidates.categories.itSoftware.count'),
      icon: '💻',
      color: 'from-blue-500 to-cyan-500'
    },
    {
      title: t('findCandidates.categories.marketing.title'),
      count: t('findCandidates.categories.marketing.count'),
      icon: '📱',
      color: 'from-purple-500 to-pink-500'
    },
    {
      title: t('findCandidates.categories.design.title'),
      count: t('findCandidates.categories.design.count'),
      icon: '🎨',
      color: 'from-orange-500 to-red-500'
    },
    {
      title: t('findCandidates.categories.engineering.title'),
      count: t('findCandidates.categories.engineering.count'),
      icon: '⚙️',
      color: 'from-green-500 to-teal-500'
    },
    {
      title: t('findCandidates.categories.finance.title'),
      count: t('findCandidates.categories.finance.count'),
      icon: '💼',
      color: 'from-indigo-500 to-blue-500'
    },
    {
      title: t('findCandidates.categories.hr.title'),
      count: t('findCandidates.categories.hr.count'),
      icon: '👥',
      color: 'from-pink-500 to-rose-500'
    }
  ];

  const handleSearch = () => {
    // Placeholder for search functionality
    navigate('/register');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-pink-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-5xl font-bold mb-6">
              {t('findCandidates.hero.title')}
            </h1>
            <p className="text-xl mb-8 max-w-3xl mx-auto">
              {t('findCandidates.hero.subtitle')}
            </p>

            {/* Search Bar */}
            <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-xl p-4">
              <div className="flex gap-4">
                <Input
                  type="text"
                  placeholder={t('findCandidates.hero.searchPlaceholder')}
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="flex-1 px-6 py-4 text-lg"
                />
                <button 
                  onClick={handleSearch}
                  style={{
                    padding: '1rem 2rem',
                    fontSize: '1.125rem',
                    fontWeight: '900',
                    color: '#ffffff',
                    background: 'linear-gradient(to right, #9333ea, #ec4899)',
                    border: 'none',
                    borderRadius: '0.75rem',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                    whiteSpace: 'nowrap'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = 'linear-gradient(to right, #7e22ce, #db2777)';
                    e.currentTarget.style.transform = 'scale(1.05)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = 'linear-gradient(to right, #9333ea, #ec4899)';
                    e.currentTarget.style.transform = 'scale(1)';
                  }}
                >
                  {t('findCandidates.hero.searchButton')}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Candidate Categories */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h2 className="text-4xl font-bold text-center mb-12 text-gray-900">
          {t('findCandidates.categories.title')}
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {candidateTypes.map((type, index) => (
            <div
              key={index}
              className="cursor-pointer"
              onClick={() => navigate('/register')}
            >
              <Card className="p-6 hover:shadow-xl transition-all group h-full">
                <div className={`w-16 h-16 bg-gradient-to-r ${type.color} rounded-xl flex items-center justify-center text-3xl mb-4 group-hover:scale-110 transition-transform`}>
                  {type.icon}
                </div>
                <h3 className="text-xl font-bold mb-2 text-gray-900">{type.title}</h3>
                <p className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r ${type.color}">
                  {type.count}
                </p>
                <p className="text-gray-600 text-sm mt-1">{t('findCandidates.categories.available')}</p>
              </Card>
            </div>
          ))}
        </div>
      </div>

      {/* Features Section */}
      <div className="bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-center mb-12 text-gray-900">
            {t('findCandidates.benefits.title')}
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="text-center p-6 hover:shadow-xl transition-shadow">
                <div className="text-5xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-bold mb-3 text-gray-900">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/* How It Works */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h2 className="text-4xl font-bold text-center mb-12 text-gray-900">
          {t('findCandidates.howItWorks.title')}
        </h2>
        <div className="grid md:grid-cols-4 gap-8">
          {[
            { step: '1', title: t('findCandidates.steps.step1.title'), desc: t('findCandidates.steps.step1.description') },
            { step: '2', title: t('findCandidates.steps.step2.title'), desc: t('findCandidates.steps.step2.description') },
            { step: '3', title: t('findCandidates.steps.step3.title'), desc: t('findCandidates.steps.step3.description') },
            { step: '4', title: t('findCandidates.steps.step4.title'), desc: t('findCandidates.steps.step4.description') }
          ].map((item, index) => (
            <div key={index} className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                {item.step}
              </div>
              <h3 className="text-xl font-bold mb-2 text-gray-900">{item.title}</h3>
              <p className="text-gray-600">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Stats Section */}
      <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-5xl font-bold mb-2">{t('findCandidates.stats.candidates.number')}</div>
              <p className="text-xl">{t('findCandidates.stats.candidates.label')}</p>
            </div>
            <div>
              <div className="text-5xl font-bold mb-2">{t('findCandidates.stats.successRate.number')}</div>
              <p className="text-xl">{t('findCandidates.stats.successRate.label')}</p>
            </div>
            <div>
              <div className="text-5xl font-bold mb-2">{t('findCandidates.stats.responseTime.number')}</div>
              <p className="text-xl">{t('findCandidates.stats.responseTime.label')}</p>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <Card className="bg-gradient-to-r from-blue-50 to-purple-50 p-12 text-center">
          <h2 className="text-4xl font-bold mb-6 text-gray-900">
            {t('findCandidates.cta.title')}
          </h2>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            {t('findCandidates.cta.subtitle')}
          </p>
          <div className="flex gap-4 justify-center">
            <button 
              onClick={() => navigate('/register')}
              style={{
                padding: '1.25rem 2.5rem',
                fontSize: '1.25rem',
                fontWeight: '900',
                color: '#ffffff',
                background: 'linear-gradient(to right, #9333ea, #ec4899)',
                border: 'none',
                borderRadius: '0.75rem',
                boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1)',
                cursor: 'pointer',
                transition: 'all 0.3s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'linear-gradient(to right, #7e22ce, #db2777)';
                e.currentTarget.style.transform = 'scale(1.05)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'linear-gradient(to right, #9333ea, #ec4899)';
                e.currentTarget.style.transform = 'scale(1)';
              }}
            >
              {t('findCandidates.cta.startButton')}
            </button>
            <button 
              onClick={() => navigate('/pricing')}
              style={{
                padding: '1.25rem 2.5rem',
                fontSize: '1.25rem',
                fontWeight: '900',
                color: '#9333ea',
                backgroundColor: '#ffffff',
                border: '3px solid #9333ea',
                borderRadius: '0.75rem',
                cursor: 'pointer',
                transition: 'all 0.3s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = '#faf5ff';
                e.currentTarget.style.transform = 'scale(1.05)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = '#ffffff';
                e.currentTarget.style.transform = 'scale(1)';
              }}
            >
              {t('findCandidates.cta.pricingButton')}
            </button>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default FindCandidates;
