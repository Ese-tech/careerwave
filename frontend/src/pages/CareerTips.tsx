import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Card } from '../components/ui/Card';


interface CareerTip {
  id: number;
  category: string;
  title: string;
  description: string;
  icon: string;
  tips: string[];
  readTime: string;
}

const CareerTips: React.FC = () => {
  const { t } = useTranslation();
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [expandedTip, setExpandedTip] = useState<number | null>(null);

  const careerTips: CareerTip[] = [
    {
      id: 1,
      category: t('careerTips.categories.application'),
      title: t('careerTips.tips.resume.title'),
      description: t('careerTips.tips.resume.description'),
      icon: '📄',
      readTime: t('careerTips.tips.resume.readTime'),
      tips: [
        t('careerTips.tips.resume.tip1'),
        t('careerTips.tips.resume.tip2'),
        t('careerTips.tips.resume.tip3'),
        t('careerTips.tips.resume.tip4'),
        t('careerTips.tips.resume.tip5'),
        t('careerTips.tips.resume.tip6'),
        t('careerTips.tips.resume.tip7'),
        t('careerTips.tips.resume.tip8')
      ]
    },
    {
      id: 2,
      category: t('careerTips.categories.application'),
      title: t('careerTips.tips.coverLetter.title'),
      description: t('careerTips.tips.coverLetter.description'),
      icon: '✉️',
      readTime: t('careerTips.tips.coverLetter.readTime'),
      tips: [
        t('careerTips.tips.coverLetter.tip1'),
        t('careerTips.tips.coverLetter.tip2'),
        t('careerTips.tips.coverLetter.tip3'),
        t('careerTips.tips.coverLetter.tip4'),
        t('careerTips.tips.coverLetter.tip5'),
        t('careerTips.tips.coverLetter.tip6'),
        t('careerTips.tips.coverLetter.tip7'),
        t('careerTips.tips.coverLetter.tip8')
      ]
    },
    {
      id: 3,
      category: t('careerTips.categories.interview'),
      title: t('careerTips.tips.interviewPrep.title'),
      description: t('careerTips.tips.interviewPrep.description'),
      icon: '🎯',
      readTime: t('careerTips.tips.interviewPrep.readTime'),
      tips: [
        t('careerTips.tips.interviewPrep.tip1'),
        t('careerTips.tips.interviewPrep.tip2'),
        t('careerTips.tips.interviewPrep.tip3'),
        t('careerTips.tips.interviewPrep.tip4'),
        t('careerTips.tips.interviewPrep.tip5'),
        t('careerTips.tips.interviewPrep.tip6'),
        t('careerTips.tips.interviewPrep.tip7'),
        t('careerTips.tips.interviewPrep.tip8')
      ]
    },
    {
      id: 4,
      category: t('careerTips.categories.interview'),
      title: t('careerTips.tips.bodyLanguage.title'),
      description: t('careerTips.tips.bodyLanguage.description'),
      icon: '🤝',
      readTime: t('careerTips.tips.bodyLanguage.readTime'),
      tips: [
        t('careerTips.tips.bodyLanguage.tip1'),
        t('careerTips.tips.bodyLanguage.tip2'),
        t('careerTips.tips.bodyLanguage.tip3'),
        t('careerTips.tips.bodyLanguage.tip4'),
        t('careerTips.tips.bodyLanguage.tip5'),
        t('careerTips.tips.bodyLanguage.tip6'),
        t('careerTips.tips.bodyLanguage.tip7'),
        t('careerTips.tips.bodyLanguage.tip8')
      ]
    },
    {
      id: 5,
      category: t('careerTips.categories.salary'),
      title: t('careerTips.tips.negotiation.title'),
      description: t('careerTips.tips.negotiation.description'),
      icon: '💰',
      readTime: t('careerTips.tips.negotiation.readTime'),
      tips: [
        t('careerTips.tips.negotiation.tip1'),
        t('careerTips.tips.negotiation.tip2'),
        t('careerTips.tips.negotiation.tip3'),
        t('careerTips.tips.negotiation.tip4'),
        t('careerTips.tips.negotiation.tip5'),
        t('careerTips.tips.negotiation.tip6'),
        t('careerTips.tips.negotiation.tip7'),
        t('careerTips.tips.negotiation.tip8')
      ]
    },
    {
      id: 6,
      category: t('careerTips.categories.development'),
      title: t('careerTips.tips.networking.title'),
      description: t('careerTips.tips.networking.description'),
      icon: '🌐',
      readTime: t('careerTips.tips.networking.readTime'),
      tips: [
        t('careerTips.tips.networking.tip1'),
        t('careerTips.tips.networking.tip2'),
        t('careerTips.tips.networking.tip3'),
        t('careerTips.tips.networking.tip4'),
        t('careerTips.tips.networking.tip5'),
        t('careerTips.tips.networking.tip6'),
        t('careerTips.tips.networking.tip7'),
        t('careerTips.tips.networking.tip8')
      ]
    },
    {
      id: 7,
      category: t('careerTips.categories.development'),
      title: t('careerTips.tips.skills.title'),
      description: t('careerTips.tips.skills.description'),
      icon: '📚',
      readTime: t('careerTips.tips.skills.readTime'),
      tips: [
        t('careerTips.tips.skills.tip1'),
        t('careerTips.tips.skills.tip2'),
        t('careerTips.tips.skills.tip3'),
        t('careerTips.tips.skills.tip4'),
        t('careerTips.tips.skills.tip5'),
        t('careerTips.tips.skills.tip6'),
        t('careerTips.tips.skills.tip7'),
        t('careerTips.tips.skills.tip8')
      ]
    },
    {
      id: 8,
      category: t('careerTips.categories.softSkills'),
      title: t('careerTips.tips.communication.title'),
      description: t('careerTips.tips.communication.description'),
      icon: '💬',
      readTime: t('careerTips.tips.communication.readTime'),
      tips: [
        t('careerTips.tips.communication.tip1'),
        t('careerTips.tips.communication.tip2'),
        t('careerTips.tips.communication.tip3'),
        t('careerTips.tips.communication.tip4'),
        t('careerTips.tips.communication.tip5'),
        t('careerTips.tips.communication.tip6'),
        t('careerTips.tips.communication.tip7'),
        t('careerTips.tips.communication.tip8')
      ]
    },
    {
      id: 9,
      category: t('careerTips.categories.softSkills'),
      title: t('careerTips.tips.timeManagement.title'),
      description: t('careerTips.tips.timeManagement.description'),
      icon: '⏰',
      readTime: t('careerTips.tips.timeManagement.readTime'),
      tips: [
        t('careerTips.tips.timeManagement.tip1'),
        t('careerTips.tips.timeManagement.tip2'),
        t('careerTips.tips.timeManagement.tip3'),
        t('careerTips.tips.timeManagement.tip4'),
        t('careerTips.tips.timeManagement.tip5'),
        t('careerTips.tips.timeManagement.tip6'),
        t('careerTips.tips.timeManagement.tip7'),
        t('careerTips.tips.timeManagement.tip8')
      ]
    },
    {
      id: 10,
      category: t('careerTips.categories.workLife'),
      title: t('careerTips.tips.burnout.title'),
      description: t('careerTips.tips.burnout.description'),
      icon: '🧘',
      readTime: t('careerTips.tips.burnout.readTime'),
      tips: [
        t('careerTips.tips.burnout.tip1'),
        t('careerTips.tips.burnout.tip2'),
        t('careerTips.tips.burnout.tip3'),
        t('careerTips.tips.burnout.tip4'),
        t('careerTips.tips.burnout.tip5'),
        t('careerTips.tips.burnout.tip6'),
        t('careerTips.tips.burnout.tip7'),
        t('careerTips.tips.burnout.tip8')
      ]
    },
    {
      id: 11,
      category: t('careerTips.categories.remote'),
      title: t('careerTips.tips.homeOffice.title'),
      description: t('careerTips.tips.homeOffice.description'),
      icon: '🏠',
      readTime: t('careerTips.tips.homeOffice.readTime'),
      tips: [
        t('careerTips.tips.homeOffice.tip1'),
        t('careerTips.tips.homeOffice.tip2'),
        t('careerTips.tips.homeOffice.tip3'),
        t('careerTips.tips.homeOffice.tip4'),
        t('careerTips.tips.homeOffice.tip5'),
        t('careerTips.tips.homeOffice.tip6'),
        t('careerTips.tips.homeOffice.tip7'),
        t('careerTips.tips.homeOffice.tip8')
      ]
    },
    {
      id: 12,
      category: t('careerTips.categories.leadership'),
      title: t('careerTips.tips.leadership.title'),
      description: t('careerTips.tips.leadership.description'),
      icon: '👔',
      readTime: t('careerTips.tips.leadership.readTime'),
      tips: [
        t('careerTips.tips.leadership.tip1'),
        t('careerTips.tips.leadership.tip2'),
        t('careerTips.tips.leadership.tip3'),
        t('careerTips.tips.leadership.tip4'),
        t('careerTips.tips.leadership.tip5'),
        t('careerTips.tips.leadership.tip6'),
        t('careerTips.tips.leadership.tip7'),
        t('careerTips.tips.leadership.tip8')
      ]
    }
  ];

  const categories = ['all', ...Array.from(new Set(careerTips.map(tip => tip.category)))];
  
  const filteredTips = selectedCategory === 'all' 
    ? careerTips 
    : careerTips.filter(tip => tip.category === selectedCategory);

  const getCategoryColor = (category: string) => {
    const colors: Record<string, string> = {
      [t('careerTips.categories.application')]: 'bg-blue-50 text-blue-700 border border-blue-200',
      [t('careerTips.categories.interview')]: 'bg-purple-50 text-purple-700 border border-purple-200',
      [t('careerTips.categories.salary')]: 'bg-green-50 text-green-700 border border-green-200',
      [t('careerTips.categories.development')]: 'bg-orange-50 text-orange-700 border border-orange-200',
      [t('careerTips.categories.softSkills')]: 'bg-pink-50 text-pink-700 border border-pink-200',
      [t('careerTips.categories.workLife')]: 'bg-teal-50 text-teal-700 border border-teal-200',
      [t('careerTips.categories.remote')]: 'bg-indigo-50 text-indigo-700 border border-indigo-200',
      [t('careerTips.categories.leadership')]: 'bg-red-50 text-red-700 border border-red-200'
    };
    return colors[category] || 'bg-gray-50 text-gray-700 border border-gray-200';
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-[#2C6C8B]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Hero Section */}
        <div className="mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-3">
            {t('careerTips.title')}
          </h1>
          <p className="text-lg text-gray-600">
            {t('careerTips.subtitle')}
          </p>
        </div>

        {/* Category Filter */}
        <div className="mb-10">
          <div className="flex flex-wrap gap-3">
            {categories.map(category => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-6 py-3 rounded-lg font-semibold transition-all border-2 ${
                  selectedCategory === category
                    ? 'bg-teal-600 text-zinc-500 border-teal-600 shadow-lg hover:bg-teal-700 hover:border-teal-700'
                    : 'bg-white dark:bg-[#BCD4E6] text-gray-500 border-gray-400 hover:bg-teal-50 hover:border-teal-600 hover:text-teal-700'
                }`}
              >
                {category === 'all' ? `🌟 ${t('careerTips.all')}` : category}
              </button>
            ))}
          </div>
        </div>

        {/* Stats */}
        <div className="mb-8">
          <p className="text-sm text-gray-600">
            <span className="font-semibold text-teal-600">{filteredTips.length}</span> {t('careerTips.found')}
          </p>
        </div>

        {/* Tips Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTips.map(tip => (
            <Card 
              key={tip.id}
              className="p-6 hover:shadow-lg transition-shadow rounded-xl border border-gray-200 bg-white dark:bg-[#BCD4E6]"
            >
              {/* Header */}
              <div className="flex items-start justify-between mb-4">
                <div className="w-14 h-14 bg-teal-500 rounded-xl flex items-center justify-center text-3xl shadow-sm">
                  {tip.icon}
                </div>
                <span className={`px-3 py-1 rounded-lg text-xs font-medium ${getCategoryColor(tip.category)}`}>
                  {tip.category}
                </span>
              </div>

              {/* Content */}
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                {tip.title}
              </h3>
              <p className="text-sm text-gray-600 mb-3">
                {tip.description}
              </p>
              <p className="text-xs text-gray-500 mb-4">
                ⏱️ {t('careerTips.readTime')}: {tip.readTime}
              </p>

              {/* Tips List */}
              {expandedTip === tip.id && (
                <div className="mb-4 p-4 bg-gray-50 rounded-lg border border-gray-100">
                  <ul className="space-y-2">
                    {tip.tips.map((t, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-sm text-gray-700">
                        <span className="text-teal-600 font-bold mt-0.5 shrink-0">✓</span>
                        <span>{t}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Toggle Button */}
              <button
                onClick={() => setExpandedTip(expandedTip === tip.id ? null : tip.id)}
                className={`w-full py-3 px-4 rounded-lg font-semibold transition-all border-2 ${
                  expandedTip === tip.id
                    ? 'bg-white text-gray-500 border-gray-300 hover:bg-gray-50'
                    : 'bg-teal-600 text-gray-500 border-teal-600 hover:bg-teal-700 hover:border-teal-700 shadow-md'
                }`}
              >
                {expandedTip === tip.id ? `▲ ${t('careerTips.showLess')}` : `▼ ${t('careerTips.showMore')}`}
              </button>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CareerTips;
