import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';

const Help: React.FC = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [searchTerm, setSearchTerm] = useState('');

  const helpCategories = [
    {
      icon: '👤',
      title: t('help.categories.jobSeekers.title'),
      description: t('help.categories.jobSeekers.description'),
      articles: [
        { title: t('help.categories.jobSeekers.articles.0'), link: '#' },
        { title: t('help.categories.jobSeekers.articles.1'), link: '#' },
        { title: t('help.categories.jobSeekers.articles.2'), link: '#' },
        { title: t('help.categories.jobSeekers.articles.3'), link: '#' },
      ]
    },
    {
      icon: '🏢',
      title: t('help.categories.employers.title'),
      description: t('help.categories.employers.description'),
      articles: [
        { title: t('help.categories.employers.articles.0'), link: '#' },
        { title: t('help.categories.employers.articles.1'), link: '#' },
        { title: t('help.categories.employers.articles.2'), link: '#' },
        { title: t('help.categories.employers.articles.3'), link: '#' },
      ]
    },
    {
      icon: '⚙️',
      title: t('help.categories.accountSettings.title'),
      description: t('help.categories.accountSettings.description'),
      articles: [
        { title: t('help.categories.accountSettings.articles.0'), link: '#' },
        { title: t('help.categories.accountSettings.articles.1'), link: '#' },
        { title: t('help.categories.accountSettings.articles.2'), link: '#' },
        { title: t('help.categories.accountSettings.articles.3'), link: '#' },
      ]
    },
    {
      icon: '💳',
      title: t('help.categories.billing.title'),
      description: t('help.categories.billing.description'),
      articles: [
        { title: t('help.categories.billing.articles.0'), link: '#' },
        { title: t('help.categories.billing.articles.1'), link: '#' },
        { title: t('help.categories.billing.articles.2'), link: '#' },
        { title: t('help.categories.billing.articles.3'), link: '#' },
      ]
    },
  ];

  const quickLinks = [
    { icon: '📧', title: t('help.quickLinks.email.title'), description: t('help.quickLinks.email.description'), action: 'mailto:support@careerwave.de' },
    { icon: '💬', title: t('help.quickLinks.chat.title'), description: t('help.quickLinks.chat.description'), action: '/contact' },
    { icon: '📞', title: t('help.quickLinks.phone.title'), description: t('help.quickLinks.phone.description'), action: 'tel:+493012345678' },
    { icon: '❓', title: t('help.quickLinks.faq.title'), description: t('help.quickLinks.faq.description'), action: '/faq' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-teal-600 to-blue-600 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl font-bold mb-6">
            {t('help.hero.title')}
          </h1>
          <p className="text-xl mb-8 max-w-3xl mx-auto">
            {t('help.hero.subtitle')}
          </p>
          
          {/* Search Bar */}
          <div className="max-w-2xl mx-auto">
            <div className="relative">
              <input
                type="text"
                placeholder={t('help.searchPlaceholder')}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-6 py-4 rounded-xl text-gray-900 text-lg focus:outline-none focus:ring-4 focus:ring-blue-300"
              />
              <button 
                style={{
                  position: 'absolute',
                  right: '0.5rem',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  padding: '0.5rem 1.5rem',
                  fontSize: '1rem',
                  fontWeight: '700',
                  color: '#ffffff',
                  backgroundColor: '#2563eb',
                  border: 'none',
                  borderRadius: '0.5rem',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = '#1d4ed8';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = '#2563eb';
                }}
              >
                {t('help.searchButton')}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8">
        <div className="grid md:grid-cols-4 gap-6">
          {quickLinks.map((link, index) => (
            <div
              key={index}
              className="cursor-pointer"
              onClick={() => {
                if (link.action.startsWith('/')) {
                  navigate(link.action);
                } else {
                  window.location.href = link.action;
                }
              }}
            >
              <Card className="p-6 text-center hover:shadow-xl transition-shadow h-full">
                <div className="text-4xl mb-3">{link.icon}</div>
                <h3 className="text-lg font-bold mb-2 text-gray-900">{link.title}</h3>
                <p className="text-sm text-gray-600">{link.description}</p>
              </Card>
            </div>
          ))}
        </div>
      </div>

      {/* Help Categories */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h2 className="text-4xl font-bold text-center mb-12 text-gray-900">
          {t('help.categoriesTitle')}
        </h2>
        <div className="grid md:grid-cols-2 gap-8">
          {helpCategories.map((category, index) => (
            <Card key={index} className="p-8 hover:shadow-xl transition-shadow">
              <div className="flex items-start gap-4 mb-6">
                <div className="text-5xl">{category.icon}</div>
                <div>
                  <h3 className="text-2xl font-bold mb-2 text-gray-900">{category.title}</h3>
                  <p className="text-gray-600">{category.description}</p>
                </div>
              </div>
              <div className="space-y-3">
                {category.articles.map((article, idx) => (
                  <a
                    key={idx}
                    href={article.link}
                    className="flex items-center gap-3 text-blue-600 hover:text-blue-800 hover:underline group"
                  >
                    <span className="text-blue-400 group-hover:text-blue-600">→</span>
                    <span>{article.title}</span>
                  </a>
                ))}
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* Video Tutorials */}
      <div className="bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-center mb-12 text-gray-900">
            {t('help.videos.title')}
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { title: t('help.videos.video1.title'), duration: t('help.videos.video1.duration'), thumbnail: '🎬' },
              { title: t('help.videos.video2.title'), duration: t('help.videos.video2.duration'), thumbnail: '📝' },
              { title: t('help.videos.video3.title'), duration: t('help.videos.video3.duration'), thumbnail: '📊' },
            ].map((video, index) => (
              <Card key={index} className="overflow-hidden hover:shadow-xl transition-shadow cursor-pointer">
                <div className="bg-gradient-to-r from-blue-500 to-purple-600 h-48 flex items-center justify-center text-6xl">
                  {video.thumbnail}
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2 text-gray-900">{video.title}</h3>
                  <p className="text-gray-600">{t('help.videos.duration')}: {video.duration}</p>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <Card className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-12 text-center">
          <h2 className="text-4xl font-bold mb-6">
            {t('help.cta.title')}
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            {t('help.cta.subtitle')}
          </p>
          <button 
            onClick={() => navigate('/contact')}
            style={{
              padding: '1.25rem 2.5rem',
              fontSize: '1.25rem',
              fontWeight: '900',
              color: '#2563eb',
              backgroundColor: '#ffffff',
              border: '3px solid #ffffff',
              borderRadius: '0.75rem',
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
            {t('help.cta.button')}
          </button>
        </Card>
      </div>
    </div>
  );
};

export default Help;
