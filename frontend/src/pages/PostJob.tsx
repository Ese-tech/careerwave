import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';
import { useAuthStore } from '../store/authStore';

const PostJob: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { user } = useAuthStore();

  const features = [
    {
      icon: '🎯',
      title: t('postJob.features.targetedReach.title'),
      description: t('postJob.features.targetedReach.description')
    },
    {
      icon: '⚡',
      title: t('postJob.features.quickPublish.title'),
      description: t('postJob.features.quickPublish.description')
    },
    {
      icon: '📊',
      title: t('postJob.features.analytics.title'),
      description: t('postJob.features.analytics.description')
    },
    {
      icon: '💼',
      title: t('postJob.features.templates.title'),
      description: t('postJob.features.templates.description')
    }
  ];

  const steps = [
    {
      number: '1',
      title: t('postJob.steps.step1.title'),
      description: t('postJob.steps.step1.description')
    },
    {
      number: '2',
      title: t('postJob.steps.step2.title'),
      description: t('postJob.steps.step2.description')
    },
    {
      number: '3',
      title: t('postJob.steps.step3.title'),
      description: t('postJob.steps.step3.description')
    },
    {
      number: '4',
      title: t('postJob.steps.step4.title'),
      description: t('postJob.steps.step4.description')
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-teal-600 to-blue-600 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-5xl font-bold mb-6">
              {t('postJob.hero.title')}
            </h1>
            <p className="text-xl mb-8 max-w-3xl mx-auto">
              {t('postJob.hero.subtitle')}
            </p>
            {!user && (
              <div className="flex gap-4 justify-center">
                <button 
                  onClick={() => navigate('/register')}
                style={{
                  padding: '1rem 2rem',
                  fontSize: '1.125rem',
                  fontWeight: '900',
                  color: '#0d9488',
                  backgroundColor: '#ffffff',
                  border: '3px solid #ffffff',
                  borderRadius: '0.75rem',
                  boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1)',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = '#f3f4f6';
                  e.currentTarget.style.transform = 'scale(1.05)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = '#ffffff';
                  e.currentTarget.style.transform = 'scale(1)';
                }}
              >
                {t('postJob.hero.startButton')}
              </button>
              <button 
                onClick={() => navigate('/pricing')}
                style={{
                  padding: '1rem 2rem',
                  fontSize: '1.125rem',
                  fontWeight: '900',
                  color: '#ffffff',
                  backgroundColor: 'transparent',
                  border: '3px solid #ffffff',
                  borderRadius: '0.75rem',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = '#ffffff';
                  e.currentTarget.style.color = '#0d9488';
                  e.currentTarget.style.transform = 'scale(1.05)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'transparent';
                  e.currentTarget.style.color = '#ffffff';
                  e.currentTarget.style.transform = 'scale(1)';
                }}
              >
                {t('postJob.hero.pricingButton')}
              </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h2 className="text-4xl font-bold text-center mb-12 text-gray-900">
          {t('postJob.benefits.title')}
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

      {/* How It Works Section */}
      <div className="bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-center mb-12 text-gray-900">
            {t('postJob.howItWorks.title')}
          </h2>
          <div className="grid md:grid-cols-4 gap-8">
            {steps.map((step, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-teal-500 to-blue-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                  {step.number}
                </div>
                <h3 className="text-xl font-bold mb-2 text-gray-900">{step.title}</h3>
                <p className="text-gray-600">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid md:grid-cols-3 gap-8 text-center">
          <div>
            <div className="text-5xl font-bold text-teal-600 mb-2">{t('postJob.stats.candidates.number')}</div>
            <p className="text-xl text-gray-600">{t('postJob.stats.candidates.label')}</p>
          </div>
          <div>
            <div className="text-5xl font-bold text-blue-600 mb-2">{t('postJob.stats.placements.number')}</div>
            <p className="text-xl text-gray-600">{t('postJob.stats.placements.label')}</p>
          </div>
          <div>
            <div className="text-5xl font-bold text-purple-600 mb-2">{t('postJob.stats.responseTime.number')}</div>
            <p className="text-xl text-gray-600">{t('postJob.stats.responseTime.label')}</p>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold mb-6">
            {t('postJob.cta.title')}
          </h2>
          <p className="text-xl mb-8">
            {t('postJob.cta.subtitle')}
          </p>
          {!user && (
            <button 
              onClick={() => navigate('/register')}
            style={{
              padding: '1.25rem 2.5rem',
              fontSize: '1.25rem',
              fontWeight: '900',
              color: '#9333ea',
              backgroundColor: '#ffffff',
              border: '3px solid #ffffff',
              borderRadius: '0.75rem',
              boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1)',
              cursor: 'pointer',
              transition: 'all 0.3s ease'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = '#f3f4f6';
              e.currentTarget.style.transform = 'scale(1.05)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = '#ffffff';
              e.currentTarget.style.transform = 'scale(1)';
            }}
          >
            {t('postJob.cta.button')}
          </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default PostJob;
