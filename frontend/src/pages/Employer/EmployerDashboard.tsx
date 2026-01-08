// frontend/src/pages/Employer/EmployerDashboard.tsx
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useAuthStore } from '../../store/authStore';
import { api } from '../../services/api';

const EmployerDashboard: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const user = useAuthStore(state => state.user);
  const [stats, setStats] = useState({
    jobs: 0,
    applications: 0,
    interviews: 0
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      setLoading(true);
      // Fetch jobs
      const jobsResponse = await api.get('/employer/jobs');
      const jobs = jobsResponse.success ? (jobsResponse.jobs || []) : [];
      const activeJobs = jobs.filter((job: any) => job.published);

      // Fetch applications
      const applicationsResponse = await api.get('/employer/applications');
      const applications = applicationsResponse.success ? (applicationsResponse.applications || []) : [];
      const interviews = applications.filter((app: any) => app.status === 'interview');

      setStats({
        jobs: activeJobs.length,
        applications: applications.length,
        interviews: interviews.length
      });
    } catch (error) {
      console.error('Error fetching stats:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold text-teal-800 mb-6">
        {t('employer.dashboard.title')}
      </h1>
      
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <p className="text-gray-700 mb-4">
          {t('employer.dashboard.welcome')}, {user?.name || 'Employer'}!
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-teal-50 p-4 rounded-lg">
            <h3 className="font-semibold text-teal-800">
              {t('employer.dashboard.stats.jobs')}
            </h3>
            <p className="text-2xl font-bold text-teal-600">
              {loading ? '...' : stats.jobs}
            </p>
            <p className="text-sm text-gray-600 mt-1">Aktive Jobs</p>
          </div>
          
          <div className="bg-orange-50 p-4 rounded-lg">
            <h3 className="font-semibold text-orange-800">
              {t('employer.dashboard.stats.applications')}
            </h3>
            <p className="text-2xl font-bold text-orange-600">
              {loading ? '...' : stats.applications}
            </p>
            <p className="text-sm text-gray-600 mt-1">Alle Bewerbungen</p>
          </div>
          
          <div className="bg-purple-50 p-4 rounded-lg">
            <h3 className="font-semibold text-purple-800">
              {t('employer.dashboard.stats.interviews')}
            </h3>
            <p className="text-2xl font-bold text-purple-600">
              {loading ? '...' : stats.interviews}
            </p>
            <p className="text-sm text-gray-600 mt-1">Interviews geplant</p>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-semibold mb-4">
          {t('employer.dashboard.quickActions')}
        </h2>
        <div className="space-y-2">
          <button 
            onClick={() => navigate('/employer/jobs/create')}
            className="block w-full text-left px-4 py-2 bg-teal-100 hover:bg-teal-200 rounded transition-colors"
          >
            {t('employer.dashboard.actions.postJob')}
          </button>
          <button 
            onClick={() => navigate('/employer/jobs')}
            className="block w-full text-left px-4 py-2 bg-blue-100 hover:bg-blue-200 rounded transition-colors"
          >
            Stellenanzeigen verwalten
          </button>
          <button 
            onClick={() => navigate('/employer/applications')}
            className="block w-full text-left px-4 py-2 bg-orange-100 hover:bg-orange-200 rounded transition-colors"
          >
            {t('employer.dashboard.actions.viewApplications')}
          </button>
          <button 
            onClick={() => navigate('/profile')}
            className="block w-full text-left px-4 py-2 bg-purple-100 hover:bg-purple-200 rounded transition-colors"
          >
            {t('employer.dashboard.actions.manageProfile')}
          </button>
        </div>
      </div>
    </div>
  );
};

export default EmployerDashboard;