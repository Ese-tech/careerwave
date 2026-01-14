import React from 'react';
import { useTranslation } from 'react-i18next';
import { Card } from '../components/ui/Card';

const Imprint: React.FC = () => {
  const { t } = useTranslation();
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-gray-700 to-gray-900 text-white py-16">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold mb-4">
            {t('imprint.title')}
          </h1>
          <p className="text-lg">
            {t('imprint.subtitle')}
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Company Information */}
          <Card className="p-8">
            <h2 className="text-2xl font-bold mb-6 text-gray-900">{t('imprint.companyInfo.title')}</h2>
            <div className="space-y-4">
              <div>
                <p className="text-sm text-gray-600 mb-1">{t('imprint.companyInfo.companyName')}</p>
                <p className="text-lg font-semibold text-gray-900">{t('imprint.companyInfo.companyNameValue')}</p>
              </div>
              
              <div>
                <p className="text-sm text-gray-600 mb-1">{t('imprint.companyInfo.address')}</p>
                <p className="text-gray-900">{t('imprint.companyInfo.street')}</p>
                <p className="text-gray-900">{t('imprint.companyInfo.city')}</p>
                <p className="text-gray-900">{t('imprint.companyInfo.country')}</p>
              </div>
              
              <div>
                <p className="text-sm text-gray-600 mb-1">{t('imprint.companyInfo.register')}</p>
                <p className="text-gray-900">{t('imprint.companyInfo.registerCourt')}</p>
                <p className="text-gray-900">{t('imprint.companyInfo.registerNumber')}</p>
              </div>
              
              <div>
                <p className="text-sm text-gray-600 mb-1">{t('imprint.companyInfo.vatId')}</p>
                <p className="text-gray-900">{t('imprint.companyInfo.vatNumber')}</p>
              </div>
            </div>
          </Card>

          {/* Contact Information */}
          <Card className="p-8">
            <h2 className="text-2xl font-bold mb-6 text-gray-900">{t('imprint.contact.title')}</h2>
            <div className="space-y-4">
              <div>
                <p className="text-sm text-gray-600 mb-1">{t('imprint.contact.phone')}</p>
                <a href="tel:+493012345678" className="text-lg text-blue-600 hover:underline">
                  {t('imprint.contact.phoneValue')}
                </a>
              </div>
              
              <div>
                <p className="text-sm text-gray-600 mb-1">{t('imprint.contact.email')}</p>
                <a href="mailto:info@careerwave.de" className="text-lg text-blue-600 hover:underline">
                  {t('imprint.contact.emailValue')}
                </a>
              </div>
              
              <div>
                <p className="text-sm text-gray-600 mb-1">{t('imprint.contact.website')}</p>
                <a href="https://www.careerwave.de" className="text-lg text-blue-600 hover:underline">
                  {t('imprint.contact.websiteValue')}
                </a>
              </div>
            </div>
          </Card>

          {/* Management */}
          <Card className="p-8">
            <h2 className="text-2xl font-bold mb-6 text-gray-900">{t('imprint.management.title')}</h2>
            <div className="space-y-3">
              <div>
                <p className="text-lg font-semibold text-gray-900">{t('imprint.management.ceo.name')}</p>
                <p className="text-gray-600">{t('imprint.management.ceo.role')}</p>
              </div>
              <div>
                <p className="text-lg font-semibold text-gray-900">{t('imprint.management.cto.name')}</p>
                <p className="text-gray-600">{t('imprint.management.cto.role')}</p>
              </div>
            </div>
          </Card>

          {/* Regulatory Information */}
          <Card className="p-8">
            <h2 className="text-2xl font-bold mb-6 text-gray-900">{t('imprint.authority.title')}</h2>
            <div className="space-y-2">
              <p className="text-gray-900">{t('imprint.authority.name')}</p>
              <p className="text-gray-900">{t('imprint.authority.street')}</p>
              <p className="text-gray-900">{t('imprint.authority.city')}</p>
            </div>
          </Card>
        </div>

        {/* Additional Legal Information */}
        <Card className="p-8 mt-8">
          <h2 className="text-2xl font-bold mb-6 text-gray-900">{t('imprint.disclaimer.title')}</h2>
          
          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-bold mb-3 text-gray-800">{t('imprint.disclaimer.content.title')}</h3>
              <p className="text-gray-700">
                {t('imprint.disclaimer.content.description')}
              </p>
            </div>
            
            <div>
              <h3 className="text-xl font-bold mb-3 text-gray-800">{t('imprint.disclaimer.links.title')}</h3>
              <p className="text-gray-700">
                {t('imprint.disclaimer.links.description')}
              </p>
            </div>
            
            <div>
              <h3 className="text-xl font-bold mb-3 text-gray-800">{t('imprint.disclaimer.copyright.title')}</h3>
              <p className="text-gray-700">
                {t('imprint.disclaimer.copyright.description')}
              </p>
            </div>
            
            <div>
              <h3 className="text-xl font-bold mb-3 text-gray-800">{t('imprint.disclaimer.dispute.title')}</h3>
              <p className="text-gray-700 mb-3">
                {t('imprint.disclaimer.dispute.description')}
              </p>
              <p className="text-gray-700">
                {t('imprint.disclaimer.dispute.participation')}
              </p>
            </div>
          </div>
        </Card>

        {/* Design Credits */}
        <Card className="p-8 mt-8">
          <h2 className="text-2xl font-bold mb-6 text-gray-900">{t('imprint.credits.title')}</h2>
          <div className="space-y-3 text-gray-700">
            <p>{t('imprint.credits.icons')}</p>
            <p>{t('imprint.credits.photos')}</p>
            <p>{t('imprint.credits.fonts')}</p>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Imprint;
