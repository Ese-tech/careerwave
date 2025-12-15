// frontend/src/layouts/CandidateLayout.tsx
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';
import { LanguageSwitcher } from '../components/ui/LanguageSwitcher';
import { ThemeSwitcher } from '../components/ui/ThemeSwitcher';

interface CandidateLayoutProps {
  children: React.ReactNode;
}

const CandidateLayout: React.FC<CandidateLayoutProps> = ({ children }) => {
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
              <Link to="/candidate/dashboard" className="text-2xl font-bold text-teal-600">
                CareerWave
              </Link>
              <span className="ml-2 text-sm text-gray-500">
                {t('common.candidate')}
              </span>
            </div>
            
            <div className="flex items-center space-x-4">
              <Link 
                to="/candidate/dashboard" 
                className="text-gray-700 hover:text-teal-600 px-3 py-2 rounded-md text-sm font-medium"
              >
                {t('nav.dashboard')}
              </Link>
              <Link 
                to="/jobs" 
                className="text-gray-700 hover:text-teal-600 px-3 py-2 rounded-md text-sm font-medium"
              >
                {t('nav.searchJobs')}
              </Link>
              <Link 
                to="/candidate/applications" 
                className="text-gray-700 hover:text-teal-600 px-3 py-2 rounded-md text-sm font-medium"
              >
                {t('nav.myApplications')}
              </Link>
              <Link 
                to="/candidate/profile" 
                className="text-gray-700 hover:text-teal-600 px-3 py-2 rounded-md text-sm font-medium"
              >
                {t('nav.profile')}
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

export default CandidateLayout;