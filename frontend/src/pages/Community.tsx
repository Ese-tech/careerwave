import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';
import { useAuthStore } from '../store/authStore';

const Community: React.FC = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { user } = useAuthStore();
  const [selectedCategory, setSelectedCategory] = useState(t('community.categories.all'));

  const categories = [t('community.categories.all'), t('community.categories.events'), t('community.categories.networking'), t('community.categories.careerTips'), t('community.categories.discussions')];

  const communityFeatures = [
    {
      icon: '👥',
      title: t('community.features.networking.title'),
      description: t('community.features.networking.description'),
      stats: t('community.features.networking.stats')
    },
    {
      icon: '🎯',
      title: t('community.features.events.title'),
      description: t('community.features.events.description'),
      stats: t('community.features.events.stats')
    },
    {
      icon: '💬',
      title: t('community.features.forums.title'),
      description: t('community.features.forums.description'),
      stats: t('community.features.forums.stats')
    },
    {
      icon: '🎓',
      title: t('community.features.mentoring.title'),
      description: t('community.features.mentoring.description'),
      stats: t('community.features.mentoring.stats')
    }
  ];

  const upcomingEvents = [
    {
      title: t('community.events.event1.title'),
      date: t('community.events.event1.date'),
      time: t('community.events.event1.time'),
      location: t('community.events.event1.location'),
      type: t('community.events.event1.type'),
      attendees: 45,
      category: t('community.categories.events')
    },
    {
      title: t('community.events.event2.title'),
      date: t('community.events.event2.date'),
      time: t('community.events.event2.time'),
      location: t('community.events.event2.location'),
      type: t('community.events.event2.type'),
      attendees: 230,
      category: t('community.categories.events')
    },
    {
      title: t('community.events.event3.title'),
      date: t('community.events.event3.date'),
      time: t('community.events.event3.time'),
      location: t('community.events.event3.location'),
      type: t('community.events.event3.type'),
      attendees: 150,
      category: t('community.categories.careerTips')
    },
    {
      title: t('community.events.event4.title'),
      date: t('community.events.event4.date'),
      time: t('community.events.event4.time'),
      location: t('community.events.event4.location'),
      type: t('community.events.event4.type'),
      attendees: 80,
      category: t('community.categories.networking')
    },
    {
      title: t('community.events.event5.title'),
      date: t('community.events.event5.date'),
      time: t('community.events.event5.time'),
      location: t('community.events.event5.location'),
      type: t('community.events.event5.type'),
      attendees: 120,
      category: t('community.categories.discussions')
    },
    {
      title: t('community.events.event6.title'),
      date: t('community.events.event6.date'),
      time: t('community.events.event6.time'),
      location: t('community.events.event6.location'),
      type: t('community.events.event6.type'),
      attendees: 200,
      category: t('community.categories.careerTips')
    }
  ];

  const popularDiscussions = [
    {
      title: t('community.discussions.discussion1.title'),
      author: t('community.discussions.discussion1.author'),
      replies: 45,
      views: 1200,
      category: t('community.categories.careerTips')
    },
    {
      title: t('community.discussions.discussion2.title'),
      author: t('community.discussions.discussion2.author'),
      replies: 78,
      views: 2100,
      category: t('community.categories.discussions')
    },
    {
      title: t('community.discussions.discussion3.title'),
      author: t('community.discussions.discussion3.author'),
      replies: 32,
      views: 890,
      category: t('community.categories.networking')
    },
    {
      title: t('community.discussions.discussion4.title'),
      author: t('community.discussions.discussion4.author'),
      replies: 56,
      views: 1500,
      category: t('community.categories.careerTips')
    }
  ];

  const successStories = [
    {
      name: t('community.successStories.story1.name'),
      role: t('community.successStories.story1.role'),
      story: t('community.successStories.story1.story'),
      avatar: '👩‍💻'
    },
    {
      name: t('community.successStories.story2.name'),
      role: t('community.successStories.story2.role'),
      story: t('community.successStories.story2.story'),
      avatar: '👨‍💼'
    },
    {
      name: t('community.successStories.story3.name'),
      role: t('community.successStories.story3.role'),
      story: t('community.successStories.story3.story'),
      avatar: '👩‍🎨'
    }
  ];

  const filteredEvents = selectedCategory === t('community.categories.all') 
    ? upcomingEvents 
    : upcomingEvents.filter(event => event.category === selectedCategory);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-pink-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl font-bold mb-6">
            {t('community.hero.title')}
          </h1>
          <p className="text-xl max-w-3xl mx-auto mb-8">
            {t('community.hero.subtitle')}
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
            {t('community.hero.joinButton')}
          </button>
          )}
        </div>
      </div>

      {/* Community Features */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-12">
        <div className="grid md:grid-cols-4 gap-6">
          {communityFeatures.map((feature, index) => (
            <Card key={index} className="p-6 text-center bg-white shadow-xl hover:shadow-2xl transition-shadow">
              <div className="text-5xl mb-4">{feature.icon}</div>
              <h3 className="text-xl font-bold mb-2 text-gray-900">{feature.title}</h3>
              <p className="text-gray-600 mb-3">{feature.description}</p>
              <p className="text-purple-600 font-semibold">{feature.stats}</p>
            </Card>
          ))}
        </div>
      </div>

      {/* Upcoming Events */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h2 className="text-4xl font-bold text-center mb-8 text-gray-900">
          {t('community.upcomingEvents.title')}
        </h2>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-3 mb-8">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              style={{
                padding: '0.5rem 1.5rem',
                fontSize: '1rem',
                fontWeight: '700',
                color: selectedCategory === category ? '#ffffff' : '#374151',
                background: selectedCategory === category ? 'linear-gradient(to right, #9333ea, #ec4899)' : '#ffffff',
                border: 'none',
                borderRadius: '0.75rem',
                boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)',
                cursor: 'pointer',
                transition: 'all 0.3s ease'
              }}
              onMouseEnter={(e) => {
                if (selectedCategory !== category) {
                  e.currentTarget.style.backgroundColor = '#f3f4f6';
                }
              }}
              onMouseLeave={(e) => {
                if (selectedCategory !== category) {
                  e.currentTarget.style.backgroundColor = '#ffffff';
                }
              }}
            >
              {category}
            </button>
          ))}
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredEvents.map((event, index) => (
            <Card key={index} className="p-6 hover:shadow-xl transition-shadow">
              <div className="flex items-start justify-between mb-4">
                <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                  event.type === 'Webinar' ? 'bg-blue-100 text-blue-700' :
                  event.type === 'Workshop' ? 'bg-green-100 text-green-700' :
                  event.type === 'Networking' ? 'bg-purple-100 text-purple-700' :
                  event.type === 'Diskussion' ? 'bg-orange-100 text-orange-700' :
                  'bg-pink-100 text-pink-700'
                }`}>
                  {event.type}
                </span>
                <span className="text-gray-500 text-sm">👥 {event.attendees}</span>
              </div>
              <h3 className="text-xl font-bold mb-3 text-gray-900">{event.title}</h3>
              <div className="space-y-2 text-gray-600 mb-4">
                <p className="flex items-center gap-2">
                  <span>📅</span> {event.date}
                </p>
                <p className="flex items-center gap-2">
                  <span>⏰</span> {event.time}
                </p>
                <p className="flex items-center gap-2">
                  <span>📍</span> {event.location}
                </p>
              </div>
              {!user && (
                <button 
                  onClick={() => navigate('/register')}
                style={{
                  width: '100%',
                  padding: '0.75rem',
                  fontSize: '1rem',
                  fontWeight: '700',
                  color: '#ffffff',
                  background: 'linear-gradient(to right, #9333ea, #ec4899)',
                  border: 'none',
                  borderRadius: '0.5rem',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = 'linear-gradient(to right, #7e22ce, #db2777)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'linear-gradient(to right, #9333ea, #ec4899)';
                }}
              >
                {t('community.upcomingEvents.registerButton')}
              </button>
              )}
            </Card>
          ))}
        </div>
      </div>

      {/* Popular Discussions */}
      <div className="bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-center mb-12 text-gray-900">
            {t('community.discussions.title')}
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            {popularDiscussions.map((discussion, index) => (
              <Card key={index} className="p-6 hover:shadow-xl transition-shadow cursor-pointer">
                <span className="inline-block px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-xs font-semibold mb-3">
                  {discussion.category}
                </span>
                <h3 className="text-xl font-bold mb-3 text-gray-900 hover:text-purple-600">
                  {discussion.title}
                </h3>
                <div className="flex items-center justify-between text-sm text-gray-600">
                  <span>{t('community.discussions.by')} {discussion.author}</span>
                  <div className="flex gap-4">
                    <span>💬 {discussion.replies} {t('community.discussions.replies')}</span>
                    <span>👁️ {discussion.views} {t('community.discussions.views')}</span>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/* Success Stories */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h2 className="text-4xl font-bold text-center mb-12 text-gray-900">
          {t('community.successStories.title')}
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          {successStories.map((story, index) => (
            <Card key={index} className="p-6 text-center hover:shadow-xl transition-shadow">
              <div className="text-6xl mb-4">{story.avatar}</div>
              <h3 className="text-xl font-bold mb-2 text-gray-900">{story.name}</h3>
              <p className="text-purple-600 font-semibold mb-4">{story.role}</p>
              <p className="text-gray-600 italic">"{story.story}"</p>
            </Card>
          ))}
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold mb-6">
            {t('community.cta.title')}
          </h2>
          <p className="text-xl mb-8">
            {t('community.cta.subtitle')}
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
            {t('community.cta.button')}
          </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Community;
