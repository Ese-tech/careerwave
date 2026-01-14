import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';
import { Input } from '../components/ui/Input';

const Contact: React.FC = () => {
  const { t } = useTranslation();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
    userType: 'jobseeker'
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically send the form data to your backend
    console.log('Form submitted:', formData);
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const contactMethods = [
    {
      icon: '📧',
      title: t('contact.methods.email.title'),
      content: t('contact.methods.email.content'),
      description: t('contact.methods.email.description'),
      action: 'mailto:support@careerwave.de'
    },
    {
      icon: '📞',
      title: t('contact.methods.phone.title'),
      content: t('contact.methods.phone.content'),
      description: t('contact.methods.phone.description'),
      action: 'tel:+493012345678'
    },
    {
      icon: '💬',
      title: t('contact.methods.chat.title'),
      content: t('contact.methods.chat.content'),
      description: t('contact.methods.chat.description'),
      action: '#'
    },
    {
      icon: '📍',
      title: t('contact.methods.address.title'),
      content: t('contact.methods.address.content'),
      description: t('contact.methods.address.description'),
      action: '#'
    }
  ];

  const offices = [
    {
      city: t('contact.offices.berlin.city'),
      address: t('contact.offices.berlin.address'),
      phone: t('contact.offices.berlin.phone'),
      email: t('contact.offices.berlin.email')
    },
    {
      city: t('contact.offices.munich.city'),
      address: t('contact.offices.munich.address'),
      phone: t('contact.offices.munich.phone'),
      email: t('contact.offices.munich.email')
    },
    {
      city: t('contact.offices.hamburg.city'),
      address: t('contact.offices.hamburg.address'),
      phone: t('contact.offices.hamburg.phone'),
      email: t('contact.offices.hamburg.email')
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:bg-[#2C6C8B]">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-teal-600 to-blue-600 dark:bg-[#2C6C8B] text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl font-bold mb-6">
            {t('contact.hero.title')}
          </h1>
          <p className="text-xl max-w-3xl mx-auto">
            {t('contact.hero.subtitle')}
          </p>
        </div>
      </div>

      {/* Contact Methods */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-12">
        <div className="grid md:grid-cols-4 gap-6">
          {contactMethods.map((method, index) => (
            <div
              key={index}
              className="cursor-pointer"
              onClick={() => {
                if (method.action.startsWith('mailto:') || method.action.startsWith('tel:')) {
                  window.location.href = method.action;
                }
              }}
            >
              <Card className="p-6 text-center hover:shadow-xl transition-shadow h-full">
                <div className="text-5xl mb-4">{method.icon}</div>
                <h3 className="text-lg font-bold mb-2 text-gray-900">{method.title}</h3>
                <p className="text-blue-600 font-semibold mb-1">{method.content}</p>
                <p className="text-sm text-gray-600">{method.description}</p>
              </Card>
            </div>
          ))}
        </div>
      </div>

      {/* Contact Form and Map */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div>
            <h2 className="text-3xl font-bold mb-6 text-gray-900">{t('contact.form.title')}</h2>
            {submitted && (
              <div className="mb-6 p-4 bg-green-100 text-green-800 rounded-lg">
                {t('contact.form.successMessage')}
              </div>
            )}
            <Card className="p-8">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    {t('contact.form.userType.label')}
                  </label>
                  <select
                    name="userType"
                    value={formData.userType}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="jobseeker">{t('contact.form.userType.jobseeker')}</option>
                    <option value="employer">{t('contact.form.userType.employer')}</option>
                    <option value="other">{t('contact.form.userType.other')}</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    {t('contact.form.name.label')}
                  </label>
                  <Input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder={t('contact.form.name.placeholder')}
                    required
                    className="w-full"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    {t('contact.form.email.label')}
                  </label>
                  <Input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder={t('contact.form.email.placeholder')}
                    required
                    className="w-full"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    {t('contact.form.subject.label')}
                  </label>
                  <Input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    placeholder={t('contact.form.subject.placeholder')}
                    required
                    className="w-full"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    {t('contact.form.message.label')}
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder={t('contact.form.message.placeholder')}
                    required
                    rows={6}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <Button 
                  type="submit"
                  className="w-full bg-gradient-to-r from-teal-600 to-blue-600 hover:from-teal-700 hover:to-blue-700 text-white py-4 rounded-xl font-bold text-lg"
                >
                  {t('contact.form.submit')}
                </Button>
              </form>
            </Card>
          </div>

          {/* Office Locations */}
          <div>
            <h2 className="text-3xl font-bold mb-6 text-gray-900">{t('contact.offices.title')}</h2>
            <div className="space-y-6">
              {offices.map((office, index) => (
                <Card key={index} className="p-6 hover:shadow-xl transition-shadow">
                  <h3 className="text-2xl font-bold mb-4 text-gray-900">{office.city}</h3>
                  <div className="space-y-3">
                    <div className="flex items-start gap-3">
                      <span className="text-xl">📍</span>
                      <div>
                        <p className="font-semibold text-gray-700">{t('contact.offices.addressLabel')}</p>
                        <p className="text-gray-600">{office.address}</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <span className="text-xl">📞</span>
                      <div>
                        <p className="font-semibold text-gray-700">{t('contact.offices.phoneLabel')}</p>
                        <a href={`tel:${office.phone}`} className="text-blue-600 hover:underline">
                          {office.phone}
                        </a>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <span className="text-xl">📧</span>
                      <div>
                        <p className="font-semibold text-gray-700">{t('contact.offices.emailLabel')}</p>
                        <a href={`mailto:${office.email}`} className="text-blue-600 hover:underline">
                          {office.email}
                        </a>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Business Hours */}
      <div className="bg-gray-50 dark:bg-[#2C6C8B] py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">{t('contact.businessHours.title')}</h2>
            <p className="text-xl text-gray-600">{t('contact.businessHours.subtitle')}</p>
          </div>
          <Card className="max-w-2xl mx-auto p-8">
            <div className="space-y-4">
              {[
                { day: t('contact.businessHours.weekdays'), hours: t('contact.businessHours.weekdaysHours') },
                { day: t('contact.businessHours.saturday'), hours: t('contact.businessHours.saturdayHours') },
                { day: t('contact.businessHours.sunday'), hours: t('contact.businessHours.sundayHours') },
              ].map((schedule, index) => (
                <div key={index} className="flex justify-between items-center py-3 border-b border-gray-200 last:border-0">
                  <span className="text-lg font-semibold text-gray-700">{schedule.day}</span>
                  <span className="text-lg text-gray-600">{schedule.hours}</span>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Contact;
