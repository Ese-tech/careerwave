import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useAuthStore } from '../store/authStore';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';

const About: React.FC = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { user } = useAuthStore();

  const teamMembers = [
    {
      name: 'Dr. Sarah Müller',
      role: 'CEO & Gründerin',
      image: '👩‍💼',
      description: '15 Jahre Erfahrung im HR-Tech Bereich'
    },
    {
      name: 'Michael Schmidt',
      role: 'CTO',
      image: '👨‍💻',
      description: 'Ex-Google Engineer, KI-Spezialist'
    },
    {
      name: 'Laura Weber',
      role: 'Head of Product',
      image: '👩‍🎨',
      description: 'UX-Expertin mit Leidenschaft für Design'
    },
    {
      name: 'Thomas Klein',
      role: 'Head of Sales',
      image: '👨‍💼',
      description: '10 Jahre B2B Sales Experience'
    }
  ];

  const values = [
    {
      icon: '🎯',
      title: 'Innovation',
      description: 'Wir setzen auf modernste Technologien, um die beste Recruiting-Lösung zu bieten'
    },
    {
      icon: '🤝',
      title: 'Transparenz',
      description: 'Offene Kommunikation und faire Preise sind uns wichtig'
    },
    {
      icon: '❤️',
      title: 'Kandidaten First',
      description: 'Die Bedürfnisse von Jobsuchenden stehen im Mittelpunkt'
    },
    {
      icon: '🚀',
      title: 'Effizienz',
      description: 'Schnelle und effektive Prozesse für alle Beteiligten'
    }
  ];

  const milestones = [
    { year: '2020', event: 'Gründung von CareerWave', icon: '🎉' },
    { year: '2021', event: '1.000 registrierte Nutzer', icon: '👥' },
    { year: '2022', event: 'Expansion in 5 Städte', icon: '🌍' },
    { year: '2023', event: '10.000+ erfolgreiche Vermittlungen', icon: '🏆' },
    { year: '2024', event: 'KI-Integration & 50.000 Nutzer', icon: '🤖' },
    { year: '2025', event: 'Marktführer in Deutschland', icon: '⭐' }
  ];

  const stats = [
    { value: '50.000+', label: t('about.stats.users') },
    { value: '500+', label: t('about.stats.companies') },
    { value: '15.000+', label: t('about.stats.placements') },
    { value: '98%', label: t('about.stats.satisfaction') }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:bg-[#2C6C8B]">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 dark:bg-[#2C6C8B] text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl font-bold mb-6">
            {t('about.title')}
          </h1>
          <p className="text-xl max-w-3xl mx-auto leading-relaxed">
            {t('about.subtitle')}
          </p>
        </div>
      </div>

      {/* Stats Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-12">
        <div className="grid md:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <Card key={index} className="p-6 text-center bg-white dark:bg-[#BCD4E6] shadow-xl">
              <div className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 mb-2">
                {stat.value}
              </div>
              <p className="text-gray-600 font-semibold">{stat.label}</p>
            </Card>
          ))}
        </div>
      </div>

      {/* Mission Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-4xl font-bold mb-6 text-gray-900">{t('about.mission.title')}</h2>
            <p className="text-lg text-gray-700 mb-6 leading-relaxed">
              {t('about.mission.text1')}
            </p>
            <p className="text-lg text-gray-700 leading-relaxed">
              {t('about.mission.text2')}
            </p>
          </div>
          <div className="bg-gradient-to-br from-blue-400 to-purple-500 rounded-2xl h-96 flex items-center justify-center text-white text-8xl">
            🚀
          </div>
        </div>
      </div>

      {/* Values Section */}
      <div className="bg-gray-50 dark:bg-[#2C6C8B] py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-center mb-12 text-gray-900">
            {t('about.values.title')}
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <Card key={index} className="p-6 text-center hover:shadow-xl transition-shadow">
                <div className="text-5xl mb-4">{value.icon}</div>
                <h3 className="text-xl font-bold mb-3 text-gray-900">{value.title}</h3>
                <p className="text-gray-600">{value.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/* Timeline Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h2 className="text-4xl font-bold text-center mb-12 text-gray-900">
          {t('about.history.title')}
        </h2>
        <div className="relative">
          {/* Timeline Line */}
          <div className="hidden lg:block absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-blue-500 to-purple-600" />
          
          <div className="space-y-12">
            {milestones.map((milestone, index) => (
              <div key={index} className={`flex items-center gap-8 ${index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'}`}>
                <div className={`flex-1 ${index % 2 === 0 ? 'lg:text-right' : 'lg:text-left'}`}>
                  <Card className="p-6 hover:shadow-xl transition-shadow">
                    <div className="text-2xl font-bold text-blue-600 mb-2">{milestone.year}</div>
                    <p className="text-lg text-gray-800">{milestone.event}</p>
                  </Card>
                </div>
                <div className="hidden lg:flex w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full items-center justify-center text-3xl shadow-lg z-10">
                  {milestone.icon}
                </div>
                <div className="flex-1" />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Team Section */}
      <div className="bg-gradient-to-br from-blue-50 to-purple-50 dark:bg-[#2C6C8B] py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-center mb-12 text-gray-900">
            {t('about.team.title')}
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {teamMembers.map((member, index) => (
              <Card key={index} className="p-6 text-center hover:shadow-xl transition-shadow">
                <div className="text-6xl mb-4">{member.image}</div>
                <h3 className="text-xl font-bold mb-2 text-gray-900">{member.name}</h3>
                <p className="text-blue-600 font-semibold mb-3">{member.role}</p>
                <p className="text-gray-600 text-sm">{member.description}</p>
              </Card>
            ))}
          </div>
          <div className="text-center mt-12">
            <button 
              onClick={() => navigate('/careers')}
              style={{
                padding: '1rem 2rem',
                fontSize: '1.125rem',
                fontWeight: '900',
                color: '#ffffff',
                background: 'linear-gradient(to right, #2563eb, #9333ea)',
                border: 'none',
                borderRadius: '0.75rem',
                cursor: 'pointer',
                transition: 'all 0.3s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'linear-gradient(to right, #1d4ed8, #7e22ce)';
                e.currentTarget.style.transform = 'scale(1.05)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'linear-gradient(to right, #2563eb, #9333ea)';
                e.currentTarget.style.transform = 'scale(1)';
              }}
            >
              {t('about.team.joinTeam')}
            </button>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <Card className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-12 text-center">
          <h2 className="text-4xl font-bold mb-6">
            {t('about.cta.title')}
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            {t('about.cta.subtitle')}
          </p>
          <div className="flex gap-4 justify-center">
            {!user && (
            <button 
              onClick={() => navigate('/register')}
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
              {t('about.cta.register')}
            </button>
            )}
            <button 
              onClick={() => navigate('/contact')}
              style={{
                padding: '1.25rem 2.5rem',
                fontSize: '1.25rem',
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
                e.currentTarget.style.color = '#2563eb';
                e.currentTarget.style.transform = 'scale(1.05)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'transparent';
                e.currentTarget.style.color = '#ffffff';
                e.currentTarget.style.transform = 'scale(1)';
              }}
            >
              {t('about.cta.contact')}
            </button>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default About;
