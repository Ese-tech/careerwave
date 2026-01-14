import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';

const Careers: React.FC = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [selectedDepartment, setSelectedDepartment] = useState(t('careers.departments.all'));

  const departments = [
    t('careers.departments.all'),
    t('careers.departments.engineering'),
    t('careers.departments.product'),
    t('careers.departments.design'),
    t('careers.departments.sales'),
    t('careers.departments.marketing'),
    t('careers.departments.hr')
  ];

  const benefits = [
    {
      icon: '💰',
      title: t('careers.benefits.0.title'),
      description: t('careers.benefits.0.description')
    },
    {
      icon: '🏠',
      title: t('careers.benefits.1.title'),
      description: t('careers.benefits.1.description')
    },
    {
      icon: '⏰',
      title: t('careers.benefits.2.title'),
      description: t('careers.benefits.2.description')
    },
    {
      icon: '🎓',
      title: t('careers.benefits.3.title'),
      description: t('careers.benefits.3.description')
    },
    {
      icon: '🏝️',
      title: t('careers.benefits.4.title'),
      description: t('careers.benefits.4.description')
    },
    {
      icon: '👶',
      title: t('careers.benefits.5.title'),
      description: t('careers.benefits.5.description')
    },
    {
      icon: '🏋️',
      title: t('careers.benefits.6.title'),
      description: t('careers.benefits.6.description')
    },
    {
      icon: '🎉',
      title: t('careers.benefits.7.title'),
      description: t('careers.benefits.7.description')
    }
  ];

  const openPositions = [
    {
      title: t('careers.positions.0.title'),
      department: t('careers.positions.0.department'),
      location: t('careers.positions.0.location'),
      type: t('careers.positions.0.type'),
      description: t('careers.positions.0.description')
    },
    {
      title: t('careers.positions.1.title'),
      department: t('careers.positions.1.department'),
      location: t('careers.positions.1.location'),
      type: t('careers.positions.1.type'),
      description: t('careers.positions.1.description')
    },
    {
      title: t('careers.positions.2.title'),
      department: t('careers.positions.2.department'),
      location: t('careers.positions.2.location'),
      type: t('careers.positions.2.type'),
      description: t('careers.positions.2.description')
    },
    {
      title: t('careers.positions.3.title'),
      department: t('careers.positions.3.department'),
      location: t('careers.positions.3.location'),
      type: t('careers.positions.3.type'),
      description: t('careers.positions.3.description')
    },
    {
      title: t('careers.positions.4.title'),
      department: t('careers.positions.4.department'),
      location: t('careers.positions.4.location'),
      type: t('careers.positions.4.type'),
      description: t('careers.positions.4.description')
    },
    {
      title: t('careers.positions.5.title'),
      department: t('careers.positions.5.department'),
      location: t('careers.positions.5.location'),
      type: t('careers.positions.5.type'),
      description: t('careers.positions.5.description')
    },
    {
      title: t('careers.positions.6.title'),
      department: t('careers.positions.6.department'),
      location: t('careers.positions.6.location'),
      type: t('careers.positions.6.type'),
      description: t('careers.positions.6.description')
    },
    {
      title: t('careers.positions.7.title'),
      department: t('careers.positions.7.department'),
      location: t('careers.positions.7.location'),
      type: t('careers.positions.7.type'),
      description: t('careers.positions.7.description')
    }
  ];

  const hiringProcess = [
    {
      step: '1',
      title: t('careers.hiringProcess.steps.0.title'),
      description: t('careers.hiringProcess.steps.0.description')
    },
    {
      step: '2',
      title: t('careers.hiringProcess.steps.1.title'),
      description: t('careers.hiringProcess.steps.1.description')
    },
    {
      step: '3',
      title: t('careers.hiringProcess.steps.2.title'),
      description: t('careers.hiringProcess.steps.2.description')
    },
    {
      step: '4',
      title: t('careers.hiringProcess.steps.3.title'),
      description: t('careers.hiringProcess.steps.3.description')
    },
    {
      step: '5',
      title: t('careers.hiringProcess.steps.4.title'),
      description: t('careers.hiringProcess.steps.4.description')
    }
  ];

  const filteredPositions = selectedDepartment === t('careers.departments.all') 
    ? openPositions 
    : openPositions.filter(pos => pos.department === selectedDepartment);

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 via-white to-blue-50 dark:bg-[#2C6C8B]">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-teal-600 to-blue-600 dark:bg-[#2C6C8B] text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl font-bold mb-6">
            {t('careers.hero.title')}
          </h1>
          <p className="text-xl max-w-3xl mx-auto mb-8">
            {t('careers.hero.subtitle')}
          </p>
          <div className="flex gap-4 justify-center">
            <button 
              onClick={() => document.getElementById('open-positions')?.scrollIntoView({ behavior: 'smooth' })}
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
              {t('careers.hero.viewPositions')}
            </button>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-12">
        <div className="grid md:grid-cols-4 gap-6">
          <Card className="p-6 text-center bg-white dark:bg-[#BCD4E6] shadow-xl">
            <div className="text-4xl font-bold text-teal-600 mb-2">50+</div>
            <p className="text-gray-600">{t('careers.stats.teamMembers')}</p>
          </Card>
          <Card className="p-6 text-center bg-white shadow-xl">
            <div className="text-4xl font-bold text-blue-600 mb-2">15+</div>
            <p className="text-gray-600">{t('careers.stats.nationalities')}</p>
          </Card>
          <Card className="p-6 text-center bg-white shadow-xl">
            <div className="text-4xl font-bold text-purple-600 mb-2">95%</div>
            <p className="text-gray-600">{t('careers.stats.satisfaction')}</p>
          </Card>
          <Card className="p-6 text-center bg-white shadow-xl">
            <div className="text-4xl font-bold text-pink-600 mb-2">3</div>
            <p className="text-gray-600">{t('careers.stats.offices')}</p>
          </Card>
        </div>
      </div>

      {/* Benefits Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h2 className="text-4xl font-bold text-center mb-12 text-gray-900">
          {t('careers.benefits.title')}
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {benefits.map((benefit, index) => (
            <Card key={index} className="p-6 text-center hover:shadow-xl transition-shadow">
              <div className="text-5xl mb-4">{benefit.icon}</div>
              <h3 className="text-lg font-bold mb-2 text-gray-900">{benefit.title}</h3>
              <p className="text-gray-600 text-sm">{benefit.description}</p>
            </Card>
          ))}
        </div>
      </div>

      {/* Open Positions */}
      <div id="open-positions" className="bg-gray-50 dark:bg-[#2C6C8B] py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-center mb-8 text-gray-900">
            {t('careers.openPositions.title')}
          </h2>

          {/* Department Filter */}
          <div className="flex flex-wrap justify-center gap-3 mb-8">
            {departments.map((dept) => (
              <button
                key={dept}
                onClick={() => setSelectedDepartment(dept)}
                style={{
                  padding: '0.5rem 1.5rem',
                  fontSize: '1rem',
                  fontWeight: '700',
                  color: selectedDepartment === dept ? '#ffffff' : '#374151',
                  background: selectedDepartment === dept ? 'linear-gradient(to right, #0d9488, #2563eb)' : '#ffffff',
                  border: 'none',
                  borderRadius: '0.75rem',
                  boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease'
                }}
                onMouseEnter={(e) => {
                  if (selectedDepartment !== dept) {
                    e.currentTarget.style.backgroundColor = '#f3f4f6';
                  }
                }}
                onMouseLeave={(e) => {
                  if (selectedDepartment !== dept) {
                    e.currentTarget.style.backgroundColor = '#ffffff';
                  }
                }}
              >
                {dept}
              </button>
            ))}
          </div>

          <div className="space-y-4">
            {filteredPositions.map((position, index) => (
              <Card key={index} className="p-6 hover:shadow-xl transition-shadow">
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-2xl font-bold text-gray-900">{position.title}</h3>
                      <span className="px-3 py-1 bg-teal-100 text-teal-700 rounded-full text-sm font-semibold">
                        {position.department}
                      </span>
                    </div>
                    <p className="text-gray-600 mb-3">{position.description}</p>
                    <div className="flex flex-wrap gap-4 text-sm text-gray-500">
                      <span className="flex items-center gap-1">
                        📍 {position.location}
                      </span>
                      <span className="flex items-center gap-1">
                        📅 {position.type}
                      </span>
                    </div>
                  </div>
                  <button 
                    onClick={() => navigate('/contact')}
                    style={{
                      padding: '0.75rem 1.5rem',
                      fontSize: '1rem',
                      fontWeight: '900',
                      color: '#ffffff',
                      background: 'linear-gradient(to right, #0d9488, #2563eb)',
                      border: 'none',
                      borderRadius: '0.75rem',
                      cursor: 'pointer',
                      transition: 'all 0.3s ease',
                      whiteSpace: 'nowrap'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = 'linear-gradient(to right, #0f766e, #1d4ed8)';
                      e.currentTarget.style.transform = 'scale(1.05)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = 'linear-gradient(to right, #0d9488, #2563eb)';
                      e.currentTarget.style.transform = 'scale(1)';
                    }}
                  >
                    {t('careers.openPositions.applyButton')}
                  </button>
                </div>
              </Card>
            ))}
          </div>

          {filteredPositions.length === 0 && (
            <Card className="p-12 text-center">
              <p className="text-xl text-gray-600 mb-4">
                {t('careers.openPositions.noPositions')}
              </p>
              <p className="text-gray-500">
                {t('careers.openPositions.checkBack')}
              </p>
            </Card>
          )}
        </div>
      </div>

      {/* Hiring Process */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h2 className="text-4xl font-bold text-center mb-12 text-gray-900">
          {t('careers.hiringProcess.title')}
        </h2>
        <div className="grid md:grid-cols-5 gap-4">
          {hiringProcess.map((process, index) => (
            <div key={index} className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-teal-500 to-blue-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4 shadow-lg">
                {process.step}
              </div>
              <h3 className="text-lg font-bold mb-2 text-gray-900">{process.title}</h3>
              <p className="text-sm text-gray-600">{process.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Culture Section */}
      <div className="bg-gradient-to-r from-teal-100 to-blue-100 dark:bg-[#2C6C8B] py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold mb-6 text-gray-900">{t('careers.culture.title')}</h2>
              <p className="text-lg text-gray-700 mb-4 leading-relaxed">
                {t('careers.culture.subtitle')}
              </p>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <span className="text-teal-600 text-xl">✓</span>
                  <span className="text-gray-700">{t('careers.culture.values.0')}</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-teal-600 text-xl">✓</span>
                  <span className="text-gray-700">{t('careers.culture.values.1')}</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-teal-600 text-xl">✓</span>
                  <span className="text-gray-700">{t('careers.culture.values.2')}</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-teal-600 text-xl">✓</span>
                  <span className="text-gray-700">{t('careers.culture.values.3')}</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-teal-600 text-xl">✓</span>
                  <span className="text-gray-700">{t('careers.culture.values.4')}</span>
                </li>
              </ul>
            </div>
            <div className="bg-gradient-to-br from-teal-400 to-blue-500 rounded-2xl h-96 flex items-center justify-center text-white text-8xl">
              🤝
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <Card className="bg-gradient-to-r from-teal-600 to-blue-600 text-white p-12 text-center">
          <h2 className="text-4xl font-bold mb-6">
            {t('careers.cta.title')}
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            {t('careers.cta.subtitle')}
          </p>
          <button 
            onClick={() => navigate('/contact')}
            style={{
              padding: '1.25rem 2.5rem',
              fontSize: '1.25rem',
              fontWeight: '900',
              color: '#0d9488',
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
            {t('careers.cta.button')}
          </button>
        </Card>
      </div>
    </div>
  );
};

export default Careers;
