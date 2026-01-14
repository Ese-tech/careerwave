import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Card } from '../components/ui/Card';

interface FAQItem {
  question: string;
  answer: string;
  category: string;
}

const FAQ: React.FC = () => {
  const { t } = useTranslation();
  const [selectedCategory, setSelectedCategory] = useState<string>(t('faq.categories.all'));
  const [openItems, setOpenItems] = useState<Set<number>>(new Set());

  const categories = [t('faq.categories.all'), t('faq.categories.jobSeekers'), t('faq.categories.employers'), t('faq.categories.account'), t('faq.categories.payments')];

  const faqs: FAQItem[] = [
    {
      category: t('faq.categories.jobSeekers'),
      question: t('faq.jobSeekers.q1.question'),
      answer: t('faq.jobSeekers.q1.answer')
    },
    {
      category: t('faq.categories.jobSeekers'),
      question: t('faq.jobSeekers.q2.question'),
      answer: t('faq.jobSeekers.q2.answer')
    },
    {
      category: t('faq.categories.jobSeekers'),
      question: t('faq.jobSeekers.q3.question'),
      answer: t('faq.jobSeekers.q3.answer')
    },
    {
      category: t('faq.categories.jobSeekers'),
      question: t('faq.jobSeekers.q4.question'),
      answer: t('faq.jobSeekers.q4.answer')
    },
    {
      category: t('faq.categories.employers'),
      question: t('faq.employers.q1.question'),
      answer: t('faq.employers.q1.answer')
    },
    {
      category: t('faq.categories.employers'),
      question: t('faq.employers.q2.question'),
      answer: t('faq.employers.q2.answer')
    },
    {
      category: t('faq.categories.employers'),
      question: t('faq.employers.q3.question'),
      answer: t('faq.employers.q3.answer')
    },
    {
      category: t('faq.categories.employers'),
      question: t('faq.employers.q4.question'),
      answer: t('faq.employers.q4.answer')
    },
    {
      category: t('faq.categories.account'),
      question: t('faq.account.q1.question'),
      answer: t('faq.account.q1.answer')
    },
    {
      category: t('faq.categories.account'),
      question: t('faq.account.q2.question'),
      answer: t('faq.account.q2.answer')
    },
    {
      category: t('faq.categories.account'),
      question: t('faq.account.q3.question'),
      answer: t('faq.account.q3.answer')
    },
    {
      category: t('faq.categories.account'),
      question: t('faq.account.q4.question'),
      answer: t('faq.account.q4.answer')
    },
    {
      category: t('faq.categories.payments'),
      question: t('faq.payments.q1.question'),
      answer: t('faq.payments.q1.answer')
    },
    {
      category: t('faq.categories.payments'),
      question: t('faq.payments.q2.question'),
      answer: t('faq.payments.q2.answer')
    },
    {
      category: t('faq.categories.payments'),
      question: t('faq.payments.q3.question'),
      answer: t('faq.payments.q3.answer')
    },
    {
      category: t('faq.categories.payments'),
      question: t('faq.payments.q4.question'),
      answer: t('faq.payments.q4.answer')
    },
  ];

  const filteredFaqs = selectedCategory === t('faq.categories.all') 
    ? faqs 
    : faqs.filter(faq => faq.category === selectedCategory);

  const toggleItem = (index: number) => {
    const newOpenItems = new Set(openItems);
    if (newOpenItems.has(index)) {
      newOpenItems.delete(index);
    } else {
      newOpenItems.add(index);
    }
    setOpenItems(newOpenItems);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl font-bold mb-6">
            {t('faq.hero.title')}
          </h1>
          <p className="text-xl max-w-3xl mx-auto">
            {t('faq.hero.subtitle')}
          </p>
        </div>
      </div>

      {/* Category Filter */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-6 py-3 rounded-xl font-semibold transition-all ${
                selectedCategory === category
                  ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg'
                  : 'bg-white text-gray-700 hover:bg-gray-100 shadow'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* FAQ Items */}
        <div className="max-w-4xl mx-auto space-y-4">
          {filteredFaqs.map((faq, index) => (
            <Card key={index} className="overflow-hidden">
              <button
                onClick={() => toggleItem(index)}
                className="w-full text-left p-6 hover:bg-gray-50 transition-colors flex items-center justify-between"
              >
                <div className="flex-1">
                  <span className="inline-block px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-semibold mb-2">
                    {faq.category}
                  </span>
                  <h3 className="text-xl font-bold text-gray-900">
                    {faq.question}
                  </h3>
                </div>
                <div className={`ml-4 text-2xl transition-transform ${
                  openItems.has(index) ? 'rotate-180' : ''
                }`}>
                  ▼
                </div>
              </button>
              {openItems.has(index) && (
                <div className="px-6 pb-6">
                  <p className="text-gray-700 leading-relaxed">
                    {faq.answer}
                  </p>
                </div>
              )}
            </Card>
          ))}
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-gray-50 py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4 text-gray-900">
            {t('faq.cta.title')}
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            {t('faq.cta.subtitle')}
          </p>
          <div className="flex gap-4 justify-center">
            <a 
              href="/contact"
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-4 rounded-xl font-bold text-lg shadow-lg transition-all"
            >
              {t('faq.cta.contactButton')}
            </a>
            <a 
              href="/help"
              className="bg-white hover:bg-gray-100 text-gray-900 border-2 border-gray-300 px-8 py-4 rounded-xl font-bold text-lg transition-all"
            >
              {t('faq.cta.helpButton')}
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FAQ;
