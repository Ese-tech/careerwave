import React from 'react';
import { useTranslation } from 'react-i18next';
import { Card } from '../components/ui/Card';

const Terms: React.FC = () => {
  const { t } = useTranslation();
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white py-16">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold mb-4">
            {t('terms.title')}
          </h1>
          <p className="text-lg">
            {t('terms.lastUpdated')}
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <Card className="p-8">
          <div className="prose prose-lg max-w-none">
            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4 text-gray-900">{t('terms.section1.title')}</h2>
              <p className="text-gray-700 mb-4">
                {t('terms.section1.intro')}
              </p>
              <p className="text-gray-700">
                {t('terms.section1.acceptance')}
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4 text-gray-900">{t('terms.section2.title')}</h2>
              <p className="text-gray-700 mb-4">
                {t('terms.section2.intro')}
              </p>
              <ul className="list-disc pl-6 mb-4 text-gray-700 space-y-2">
                <li>{t('terms.section2.services.jobSearch')}</li>
                <li>{t('terms.section2.services.postJobs')}</li>
                <li>{t('terms.section2.services.management')}</li>
                <li>{t('terms.section2.services.communication')}</li>
              </ul>
              <p className="text-gray-700">
                {t('terms.section2.scope')}
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4 text-gray-900">{t('terms.section3.title')}</h2>
              
              <h3 className="text-xl font-bold mb-3 text-gray-800">{t('terms.section3.subsection1.title')}</h3>
              <p className="text-gray-700 mb-4">
                {t('terms.section3.subsection1.description')}
              </p>
              
              <h3 className="text-xl font-bold mb-3 text-gray-800">{t('terms.section3.subsection2.title')}</h3>
              <p className="text-gray-700 mb-4">
                {t('terms.section3.subsection2.description')}
              </p>
              
              <h3 className="text-xl font-bold mb-3 text-gray-800">{t('terms.section3.subsection3.title')}</h3>
              <p className="text-gray-700">
                {t('terms.section3.subsection3.description')}
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4 text-gray-900">{t('terms.section4.title')}</h2>
              <p className="text-gray-700 mb-4">
                {t('terms.section4.intro')}
              </p>
              <ul className="list-disc pl-6 mb-4 text-gray-700 space-y-2">
                <li>{t('terms.section4.prohibited.illegal')}</li>
                <li>{t('terms.section4.prohibited.spam')}</li>
                <li>{t('terms.section4.prohibited.scraping')}</li>
                <li>{t('terms.section4.prohibited.bypass')}</li>
                <li>{t('terms.section4.prohibited.sharing')}</li>
                <li>{t('terms.section4.prohibited.fakeJobs')}</li>
                <li>{t('terms.section4.prohibited.discrimination')}</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4 text-gray-900">{t('terms.section5.title')}</h2>
              
              <h3 className="text-xl font-bold mb-3 text-gray-800">{t('terms.section5.subsection1.title')}</h3>
              <p className="text-gray-700 mb-4">
                {t('terms.section5.subsection1.description')}
              </p>
              
              <h3 className="text-xl font-bold mb-3 text-gray-800">{t('terms.section5.subsection2.title')}</h3>
              <p className="text-gray-700 mb-4">
                {t('terms.section5.subsection2.description')}
              </p>
              
              <h3 className="text-xl font-bold mb-3 text-gray-800">{t('terms.section5.subsection3.title')}</h3>
              <p className="text-gray-700">
                {t('terms.section5.subsection3.description')}
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4 text-gray-900">{t('terms.section6.title')}</h2>
              
              <h3 className="text-xl font-bold mb-3 text-gray-800">{t('terms.section6.subsection1.title')}</h3>
              <p className="text-gray-700 mb-4">
                {t('terms.section6.subsection1.description')}
              </p>
              
              <h3 className="text-xl font-bold mb-3 text-gray-800">{t('terms.section6.subsection2.title')}</h3>
              <p className="text-gray-700 mb-4">
                {t('terms.section6.subsection2.description')}
              </p>
              
              <h3 className="text-xl font-bold mb-3 text-gray-800">{t('terms.section6.subsection3.title')}</h3>
              <p className="text-gray-700">
                {t('terms.section6.subsection3.description')}
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4 text-gray-900">{t('terms.section7.title')}</h2>
              
              <h3 className="text-xl font-bold mb-3 text-gray-800">{t('terms.section7.subsection1.title')}</h3>
              <p className="text-gray-700 mb-4">
                {t('terms.section7.subsection1.description')}
              </p>
              
              <h3 className="text-xl font-bold mb-3 text-gray-800">{t('terms.section7.subsection2.title')}</h3>
              <p className="text-gray-700 mb-4">
                {t('terms.section7.subsection2.description')}
              </p>
              
              <h3 className="text-xl font-bold mb-3 text-gray-800">{t('terms.section7.subsection3.title')}</h3>
              <p className="text-gray-700">
                {t('terms.section7.subsection3.description')}
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4 text-gray-900">{t('terms.section8.title')}</h2>
              <p className="text-gray-700 mb-4">
                {t('terms.section8.content')}
              </p>
              <p className="text-gray-700">
                {t('terms.section8.license')}
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4 text-gray-900">{t('terms.section9.title')}</h2>
              <p className="text-gray-700">
                {t('terms.section9.description')}
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4 text-gray-900">{t('terms.section10.title')}</h2>
              
              <h3 className="text-xl font-bold mb-3 text-gray-800">{t('terms.section10.subsection1.title')}</h3>
              <p className="text-gray-700 mb-4">
                {t('terms.section10.subsection1.description')}
              </p>
              
              <h3 className="text-xl font-bold mb-3 text-gray-800">{t('terms.section10.subsection2.title')}</h3>
              <p className="text-gray-700 mb-4">
                {t('terms.section10.subsection2.description')}
              </p>
              
              <h3 className="text-xl font-bold mb-3 text-gray-800">{t('terms.section10.subsection3.title')}</h3>
              <p className="text-gray-700">
                {t('terms.section10.subsection3.description')}
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4 text-gray-900">{t('terms.section11.title')}</h2>
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-gray-700 font-semibold">{t('terms.section11.company')}</p>
                <p className="text-gray-700">{t('terms.section11.street')}</p>
                <p className="text-gray-700">{t('terms.section11.city')}</p>
                <p className="text-gray-700 mt-2">{t('common.email')}: {t('terms.section11.email')}</p>
                <p className="text-gray-700">{t('imprint.contact.phone')}: {t('terms.section11.phone')}</p>
              </div>
            </section>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Terms;
