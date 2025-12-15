// frontend/src/layouts/EmployerLayout.tsx
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';
import { LanguageSwitcher } from '../components/ui/LanguageSwitcher';
import { ThemeSwitcher } from '../components/ui/ThemeSwitcher';

interface EmployerLayoutProps {
  children: React.ReactNode;
}

const EmployerLayout: React.FC<EmployerLayoutProps> = ({ children }) => {
  const { t } = useTranslation();
  const { logout } = useAuthStore();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Navigation Header */}
      <nav className="bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <Link to="/employer/dashboard" className="text-2xl font-bold text-teal-600">
                CareerWave
              </Link>
              <span className="ml-2 text-sm text-gray-500">
                {t('common.employer')}
              </span>
            </div>
            
            <div className="flex items-center space-x-4">
              <Link 
                to="/employer/dashboard" 
                className="text-gray-700 hover:text-teal-600 px-3 py-2 rounded-md text-sm font-medium"
              >
                {t('nav.dashboard')}
              </Link>
              <Link 
                to="/employer/jobs" 
                className="text-gray-700 hover:text-teal-600 px-3 py-2 rounded-md text-sm font-medium"
              >
                {t('nav.jobs')}
              </Link>
              <Link 
                to="/employer/applications" 
                className="text-gray-700 hover:text-teal-600 px-3 py-2 rounded-md text-sm font-medium"
              >
                {t('nav.applications')}
              </Link>
              <LanguageSwitcher />
              <ThemeSwitcher />
              <button
                onClick={handleLogout}
                className="text-gray-700 hover:text-red-600 px-3 py-2 rounded-md text-sm font-medium"
              >
                {t('nav.logout')}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        {children}
      </main>
    </div>
  );
};

export default EmployerLayout;