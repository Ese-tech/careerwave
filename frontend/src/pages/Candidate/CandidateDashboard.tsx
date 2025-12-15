// frontend/src/pages/Candidate/CandidateDashboard.tsx
import React from 'react';
import { useTranslation } from 'react-i18next';
import { useAuthStore } from '../../store/authStore';

const CandidateDashboard: React.FC = () => {
  const { t } = useTranslation();
  const user = useAuthStore(state => state.user);

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold text-teal-800 mb-6">
        {t('candidate.dashboard.title')}
      </h1>
      
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <p className="text-gray-700 mb-4">
          {t('candidate.dashboard.welcome')}, {user?.name || 'Candidate'}!
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-teal-50 p-4 rounded-lg">
            <h3 className="font-semibold text-teal-800">
              {t('candidate.dashboard.stats.applications')}
            </h3>
            <p className="text-2xl font-bold text-teal-600">0</p>
          </div>
          
          <div className="bg-orange-50 p-4 rounded-lg">
            <h3 className="font-semibold text-orange-800">
              {t('candidate.dashboard.stats.interviews')}
            </h3>
            <p className="text-2xl font-bold text-orange-600">0</p>
          </div>
          
          <div className="bg-purple-50 p-4 rounded-lg">
            <h3 className="font-semibold text-purple-800">
              {t('candidate.dashboard.stats.saved')}
            </h3>
            <p className="text-2xl font-bold text-purple-600">0</p>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-semibold mb-4">
          {t('candidate.dashboard.quickActions')}
        </h2>
        <div className="space-y-2">
          <button className="block w-full text-left px-4 py-2 bg-teal-100 hover:bg-teal-200 rounded transition-colors">
            {t('candidate.dashboard.actions.searchJobs')}
          </button>
          <button className="block w-full text-left px-4 py-2 bg-orange-100 hover:bg-orange-200 rounded transition-colors">
            {t('candidate.dashboard.actions.viewApplications')}
          </button>
          <button className="block w-full text-left px-4 py-2 bg-purple-100 hover:bg-purple-200 rounded transition-colors">
            {t('candidate.dashboard.actions.updateProfile')}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CandidateDashboard;