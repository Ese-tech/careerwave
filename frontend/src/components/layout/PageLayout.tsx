// frontend/src/components/layout/PageLayout.tsx
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Header } from './Header';
import { Footer } from './Footer';

interface PageLayoutProps {
  children: React.ReactNode;
  title?: string;
  description?: string;
  className?: string;
}

export function PageLayout({ 
  children, 
  title, 
  description, 
  className = '' 
}: PageLayoutProps) {
  const { t } = useTranslation();

  React.useEffect(() => {
    if (title) {
      document.title = `${title} | ${t('common.appName')}`;
    }
  }, [title, t]);

  return (
    <div className={`min-h-screen flex flex-col ${className}`}>
      <Header />
      
      <main className="flex-1 bg-gray-50 dark:bg-slate-900">
        {title && (
          <div className="bg-white dark:bg-slate-800 border-b border-gray-200 dark:border-slate-700">
            <div className="container mx-auto px-4 py-6">
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                {title}
              </h1>
              {description && (
                <p className="mt-2 text-gray-600 dark:text-gray-300">
                  {description}
                </p>
              )}
            </div>
          </div>
        )}
        
        <div className="container mx-auto px-4 py-6">
          {children}
        </div>
      </main>
      
      <Footer />
    </div>
  );
}