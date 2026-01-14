import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';

const Press: React.FC = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const pressReleases = [
    {
      date: t('press.releases.0.date'),
      title: t('press.releases.0.title'),
      excerpt: t('press.releases.0.excerpt'),
      category: t('press.releases.0.category')
    },
    {
      date: t('press.releases.1.date'),
      title: t('press.releases.1.title'),
      excerpt: t('press.releases.1.excerpt'),
      category: t('press.releases.1.category')
    },
    {
      date: t('press.releases.2.date'),
      title: t('press.releases.2.title'),
      excerpt: t('press.releases.2.excerpt'),
      category: t('press.releases.2.category')
    },
    {
      date: t('press.releases.3.date'),
      title: t('press.releases.3.title'),
      excerpt: t('press.releases.3.excerpt'),
      category: t('press.releases.3.category')
    },
    {
      date: t('press.releases.4.date'),
      title: t('press.releases.4.title'),
      excerpt: t('press.releases.4.excerpt'),
      category: t('press.releases.4.category')
    },
    {
      date: t('press.releases.5.date'),
      title: t('press.releases.5.title'),
      excerpt: t('press.releases.5.excerpt'),
      category: t('press.releases.5.category')
    }
  ];

  const mediaKit = [
    {
      icon: '📷',
      title: t('press.mediaKit.items.0.title'),
      description: t('press.mediaKit.items.0.description'),
      downloadSize: t('press.mediaKit.items.0.size')
    },
    {
      icon: '📄',
      title: t('press.mediaKit.items.1.title'),
      description: t('press.mediaKit.items.1.description'),
      downloadSize: t('press.mediaKit.items.1.size')
    },
    {
      icon: '📸',
      title: t('press.mediaKit.items.2.title'),
      description: t('press.mediaKit.items.2.description'),
      downloadSize: t('press.mediaKit.items.2.size')
    },
    {
      icon: '👥',
      title: t('press.mediaKit.items.3.title'),
      description: t('press.mediaKit.items.3.description'),
      downloadSize: t('press.mediaKit.items.3.size')
    }
  ];

  const awards = [
    {
      year: t('press.awards.items.0.year'),
      award: t('press.awards.items.0.award'),
      category: t('press.awards.items.0.category'),
      icon: '🏆'
    },
    {
      year: t('press.awards.items.1.year'),
      award: t('press.awards.items.1.award'),
      category: t('press.awards.items.1.category'),
      icon: '⭐'
    },
    {
      year: t('press.awards.items.2.year'),
      award: t('press.awards.items.2.award'),
      category: t('press.awards.items.2.category'),
      icon: '🎖️'
    },
    {
      year: t('press.awards.items.3.year'),
      award: t('press.awards.items.3.award'),
      category: t('press.awards.items.3.category'),
      icon: '🎨'
    }
  ];

  const mediaContacts = [
    {
      name: t('press.contacts.people.0.name'),
      role: t('press.contacts.people.0.role'),
      email: t('press.contacts.people.0.email'),
      phone: t('press.contacts.people.0.phone')
    },
    {
      name: t('press.contacts.people.1.name'),
      role: t('press.contacts.people.1.role'),
      email: t('press.contacts.people.1.email'),
      phone: t('press.contacts.people.1.phone')
    }
  ];

  const pressStats = [
    { value: t('press.stats.0.value'), label: t('press.stats.0.label') },
    { value: t('press.stats.1.value'), label: t('press.stats.1.label') },
    { value: t('press.stats.2.value'), label: t('press.stats.2.label') },
    { value: t('press.stats.3.value'), label: t('press.stats.3.label') }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl font-bold mb-6">
            {t('press.title')}
          </h1>
          <p className="text-xl max-w-3xl mx-auto mb-8">
            {t('press.subtitle')}
          </p>
        </div>
      </div>

      {/* Stats Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-12">
        <div className="grid md:grid-cols-4 gap-6">
          {pressStats.map((stat, index) => (
            <Card key={index} className="p-6 text-center bg-white shadow-xl">
              <div className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600 mb-2">
                {stat.value}
              </div>
              <p className="text-gray-600 font-semibold">{stat.label}</p>
            </Card>
          ))}
        </div>
      </div>

      {/* Latest Press Releases */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h2 className="text-4xl font-bold text-center mb-12 text-gray-900">
          {t('press.releases.title')}
        </h2>
        <div className="space-y-6">
          {pressReleases.map((release, index) => (
            <Card key={index} className="p-6 hover:shadow-xl transition-shadow cursor-pointer">
              <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="text-sm text-gray-500">{release.date}</span>
                    <span className="px-3 py-1 bg-indigo-100 text-indigo-700 rounded-full text-xs font-semibold">
                      {release.category}
                    </span>
                  </div>
                  <h3 className="text-2xl font-bold mb-3 text-gray-900 hover:text-indigo-600 transition-colors">
                    {release.title}
                  </h3>
                  <p className="text-gray-600">{release.excerpt}</p>
                </div>
                <Button className="bg-indigo-100 hover:bg-indigo-200 text-indigo-700 px-6 py-2 rounded-lg font-semibold whitespace-nowrap">
                  {t('press.releases.readMore')}
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* Media Kit */}
      <div className="bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-center mb-12 text-gray-900">
            {t('press.mediaKit.title')}
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {mediaKit.map((item, index) => (
              <Card key={index} className="p-6 text-center hover:shadow-xl transition-shadow cursor-pointer group">
                <div className="text-5xl mb-4 group-hover:scale-110 transition-transform">{item.icon}</div>
                <h3 className="text-lg font-bold mb-2 text-gray-900">{item.title}</h3>
                <p className="text-gray-600 text-sm mb-3">{item.description}</p>
                <p className="text-xs text-gray-500 mb-4">{item.downloadSize}</p>
                <Button className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white py-2 rounded-lg font-semibold text-sm">
                  {t('press.mediaKit.download')}
                </Button>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/* Awards */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h2 className="text-4xl font-bold text-center mb-12 text-gray-900">
          {t('press.awards.title')}
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {awards.map((award, index) => (
            <Card key={index} className="p-6 text-center hover:shadow-xl transition-shadow">
              <div className="text-6xl mb-4">{award.icon}</div>
              <div className="text-2xl font-bold text-indigo-600 mb-2">{award.year}</div>
              <h3 className="text-lg font-bold mb-2 text-gray-900">{award.award}</h3>
              <p className="text-gray-600 text-sm">{award.category}</p>
            </Card>
          ))}
        </div>
      </div>

      {/* Press Contacts */}
      <div className="bg-gradient-to-br from-indigo-50 to-purple-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-center mb-12 text-gray-900">
            {t('press.contacts.title')}
          </h2>
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {mediaContacts.map((contact, index) => (
              <Card key={index} className="p-8 hover:shadow-xl transition-shadow">
                <h3 className="text-2xl font-bold mb-2 text-gray-900">{contact.name}</h3>
                <p className="text-indigo-600 font-semibold mb-4">{contact.role}</p>
                <div className="space-y-2">
                  <p className="flex items-center gap-3 text-gray-700">
                    <span>📧</span>
                    <a href={`mailto:${contact.email}`} className="hover:text-indigo-600 transition-colors">
                      {contact.email}
                    </a>
                  </p>
                  <p className="flex items-center gap-3 text-gray-700">
                    <span>📞</span>
                    <a href={`tel:${contact.phone}`} className="hover:text-indigo-600 transition-colors">
                      {contact.phone}
                    </a>
                  </p>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/* Newsletter Signup */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <Card className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white p-12 text-center">
          <h2 className="text-4xl font-bold mb-6">
            {t('press.newsletter.title')}
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            {t('press.newsletter.subtitle')}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 max-w-xl mx-auto">
            <input
              type="email"
              placeholder={t('press.newsletter.placeholder')}
              className="flex-1 px-6 py-4 rounded-xl text-gray-900 focus:outline-none focus:ring-4 focus:ring-white"
            />
            <button 
              className="bg-gradient-to-r from-orange-500 to-red-500 text-white hover:from-orange-600 hover:to-red-600 px-8 py-4 rounded-xl font-extrabold text-2xl whitespace-nowrap shadow-2xl transform hover:scale-105 transition-all"
              style={{ backgroundColor: '#ff6b35' }}
            >
              {t('press.newsletter.subscribe')}
            </button>
          </div>
        </Card>
      </div>

      {/* Social Media */}
      <div className="bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-8 text-gray-900">
            {t('press.social.title')}
          </h2>
          <div className="flex justify-center gap-6">
            {[
              { name: 'LinkedIn', icon: '💼', link: '#' },
              { name: 'Twitter', icon: '🐦', link: '#' },
              { name: 'Instagram', icon: '📷', link: '#' },
              { name: 'Facebook', icon: '📱', link: '#' }
            ].map((social, index) => (
              <a
                key={index}
                href={social.link}
                className="flex flex-col items-center gap-2 p-4 bg-white rounded-xl hover:shadow-lg transition-all group"
              >
                <div className="text-4xl group-hover:scale-110 transition-transform">{social.icon}</div>
                <span className="text-sm font-semibold text-gray-700">{social.name}</span>
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Press;
