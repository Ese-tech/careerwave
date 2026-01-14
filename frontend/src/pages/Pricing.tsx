import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';

const Pricing: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [billingPeriod, setBillingPeriod] = useState<'monthly' | 'yearly'>('monthly');

  const plans = [
    {
      name: t('pricing.plans.basic.name'),
      description: t('pricing.plans.basic.description'),
      monthlyPrice: 49,
      yearlyPrice: 490,
      features: [
        t('pricing.plans.basic.features.0'),
        t('pricing.plans.basic.features.1'),
        t('pricing.plans.basic.features.2'),
        t('pricing.plans.basic.features.3'),
        t('pricing.plans.basic.features.4'),
      ],
      limitations: [
        t('pricing.plans.basic.limitations.0'),
        t('pricing.plans.basic.limitations.1')
      ],
      color: 'from-blue-500 to-cyan-500',
      popular: false
    },
    {
      name: t('pricing.plans.professional.name'),
      description: t('pricing.plans.professional.description'),
      monthlyPrice: 149,
      yearlyPrice: 1490,
      features: [
        t('pricing.plans.professional.features.0'),
        t('pricing.plans.professional.features.1'),
        t('pricing.plans.professional.features.2'),
        t('pricing.plans.professional.features.3'),
        t('pricing.plans.professional.features.4'),
        t('pricing.plans.professional.features.5'),
        t('pricing.plans.professional.features.6'),
        t('pricing.plans.professional.features.7')
      ],
      limitations: [],
      color: 'from-purple-500 to-pink-500',
      popular: true
    },
    {
      name: t('pricing.plans.enterprise.name'),
      description: t('pricing.plans.enterprise.description'),
      monthlyPrice: 499,
      yearlyPrice: 4990,
      features: [
        t('pricing.plans.enterprise.features.0'),
        t('pricing.plans.enterprise.features.1'),
        t('pricing.plans.enterprise.features.2'),
        t('pricing.plans.enterprise.features.3'),
        t('pricing.plans.enterprise.features.4'),
        t('pricing.plans.enterprise.features.5'),
        t('pricing.plans.enterprise.features.6'),
        t('pricing.plans.enterprise.features.7'),
        t('pricing.plans.enterprise.features.8'),
        t('pricing.plans.enterprise.features.9'),
        t('pricing.plans.enterprise.features.10')
      ],
      limitations: [],
      color: 'from-orange-500 to-red-500',
      popular: false
    }
  ];

  const additionalFeatures = [
    {
      icon: '🎯',
      title: t('pricing.additionalFeatures.targetedAds.title'),
      description: t('pricing.additionalFeatures.targetedAds.description')
    },
    {
      icon: '📊',
      title: t('pricing.additionalFeatures.analytics.title'),
      description: t('pricing.additionalFeatures.analytics.description')
    },
    {
      icon: '🤝',
      title: t('pricing.additionalFeatures.support.title'),
      description: t('pricing.additionalFeatures.support.description')
    },
    {
      icon: '🔄',
      title: t('pricing.additionalFeatures.integration.title'),
      description: t('pricing.additionalFeatures.integration.description')
    }
  ];

  const faqs = [
    {
      question: t('pricing.faqs.upgrade.question'),
      answer: t('pricing.faqs.upgrade.answer')
    },
    {
      question: t('pricing.faqs.trial.question'),
      answer: t('pricing.faqs.trial.answer')
    },
    {
      question: t('pricing.faqs.limit.question'),
      answer: t('pricing.faqs.limit.answer')
    },
    {
      question: t('pricing.faqs.vat.question'),
      answer: t('pricing.faqs.vat.answer')
    }
  ];

  const getPrice = (plan: typeof plans[0]) => {
    return billingPeriod === 'monthly' ? plan.monthlyPrice : Math.round(plan.yearlyPrice / 12);
  };

  const getSavings = (plan: typeof plans[0]) => {
    return Math.round(((plan.monthlyPrice * 12 - plan.yearlyPrice) / (plan.monthlyPrice * 12)) * 100);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl font-bold mb-6">
            {t('pricing.hero.title')}
          </h1>
          <p className="text-xl mb-8 max-w-3xl mx-auto">
            {t('pricing.hero.subtitle')}
          </p>

          {/* Billing Toggle */}
          <div className="flex items-center justify-center gap-4 mb-8">
            <span className={`text-lg font-semibold ${billingPeriod === 'monthly' ? 'text-white' : 'text-blue-200'}`}>
              {t('pricing.billing.monthly')}
            </span>
            <button
              onClick={() => setBillingPeriod(billingPeriod === 'monthly' ? 'yearly' : 'monthly')}
              className="relative w-16 h-8 bg-white rounded-full transition-colors"
            >
              <div className={`absolute top-1 ${billingPeriod === 'yearly' ? 'right-1' : 'left-1'} w-6 h-6 bg-blue-600 rounded-full transition-all`} />
            </button>
            <span className={`text-lg font-semibold ${billingPeriod === 'yearly' ? 'text-white' : 'text-blue-200'}`}>
              {t('pricing.billing.yearly')}
            </span>
            {billingPeriod === 'yearly' && (
              <span className="bg-green-500 text-white px-3 py-1 rounded-full text-sm font-bold">
                {t('pricing.billing.saveUp')}
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Pricing Cards */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-16">
        <div className="grid md:grid-cols-3 gap-8">
          {plans.map((plan, index) => (
            <Card 
              key={index} 
              className={`relative p-8 ${plan.popular ? 'ring-4 ring-purple-500 shadow-2xl scale-105' : 'shadow-xl'}`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <span className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-2 rounded-full text-sm font-bold shadow-lg">
                    ⭐ {t('pricing.popularPlan')}
                  </span>
                </div>
              )}

              <div className={`w-16 h-16 bg-gradient-to-r ${plan.color} rounded-xl flex items-center justify-center text-3xl mb-4`}>
                {index === 0 ? '🚀' : index === 1 ? '💼' : '👑'}
              </div>

              <h3 className="text-2xl font-bold mb-2 text-gray-900">{plan.name}</h3>
              <p className="text-gray-600 mb-6">{plan.description}</p>

              <div className="mb-6">
                <div className="flex items-baseline">
                  <span className="text-5xl font-bold text-gray-900">€{getPrice(plan)}</span>
                  <span className="text-gray-600 ml-2">{t('pricing.perMonth')}</span>
                </div>
                {billingPeriod === 'yearly' && (
                  <p className="text-sm text-green-600 font-semibold mt-2">
                    {t('pricing.save')} {getSavings(plan)}% {t('pricing.withYearly')}
                  </p>
                )}
                {billingPeriod === 'yearly' && (
                  <p className="text-sm text-gray-500 mt-1">
                    €{plan.yearlyPrice} {t('pricing.billedYearly')}
                  </p>
                )}
              </div>

              <button 
                onClick={() => navigate('/register')}
                style={{
                  width: '100%',
                  padding: '1rem',
                  fontSize: '1rem',
                  fontWeight: '900',
                  color: plan.popular ? '#ffffff' : '#111827',
                  background: plan.popular ? 'linear-gradient(to right, #9333ea, #ec4899)' : '#f3f4f6',
                  border: 'none',
                  borderRadius: '0.75rem',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  marginBottom: '1.5rem'
                }}
                onMouseEnter={(e) => {
                  if (plan.popular) {
                    e.currentTarget.style.background = 'linear-gradient(to right, #7e22ce, #db2777)';
                  } else {
                    e.currentTarget.style.backgroundColor = '#e5e7eb';
                  }
                  e.currentTarget.style.transform = 'scale(1.02)';
                }}
                onMouseLeave={(e) => {
                  if (plan.popular) {
                    e.currentTarget.style.background = 'linear-gradient(to right, #9333ea, #ec4899)';
                  } else {
                    e.currentTarget.style.backgroundColor = '#f3f4f6';
                  }
                  e.currentTarget.style.transform = 'scale(1)';
                }}
              >
                {t('pricing.choosePlan')}
              </button>

              <div className="space-y-3">
                {plan.features.map((feature, idx) => (
                  <div key={idx} className="flex items-start gap-3">
                    <span className="text-green-500 text-xl">✓</span>
                    <span className="text-gray-700">{feature}</span>
                  </div>
                ))}
                {plan.limitations.map((limitation, idx) => (
                  <div key={idx} className="flex items-start gap-3 opacity-50">
                    <span className="text-gray-400 text-xl">✗</span>
                    <span className="text-gray-500">{limitation}</span>
                  </div>
                ))}
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* Additional Features */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 mt-16">
        <h2 className="text-4xl font-bold text-center mb-12 text-gray-900">
          {t('pricing.allPlansInclude.title')}
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {additionalFeatures.map((feature, index) => (
            <Card key={index} className="text-center p-6 hover:shadow-xl transition-shadow">
              <div className="text-5xl mb-4">{feature.icon}</div>
              <h3 className="text-xl font-bold mb-3 text-gray-900">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </Card>
          ))}
        </div>
      </div>

      {/* FAQs */}
      <div className="bg-gray-50 py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-center mb-12 text-gray-900">
            {t('pricing.faq.title')}
          </h2>
          <div className="space-y-6">
            {faqs.map((faq, index) => (
              <Card key={index} className="p-6">
                <h3 className="text-xl font-bold mb-3 text-gray-900">{faq.question}</h3>
                <p className="text-gray-600">{faq.answer}</p>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <Card className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-12 text-center">
          <h2 className="text-4xl font-bold mb-6">
            {t('pricing.cta.title')}
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            {t('pricing.cta.subtitle')}
          </p>
          <div className="flex gap-4 justify-center">
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
              {t('pricing.cta.contactButton')}
            </button>
            <button 
              onClick={() => navigate('/register')}
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
              {t('pricing.cta.trialButton')}
            </button>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Pricing;
