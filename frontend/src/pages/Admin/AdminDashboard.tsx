// frontend/src/pages/Admin/AdminDashboard.tsx
import React, { useEffect, useState } from 'react';
import { getAnalytics } from '../../api/admin';
import { StatWidget } from '../../components/admin/StatWidget';
import { useUserStore } from '../../store/userStore';
import { useAdminGuard } from '../../hooks/useAdmin';
import AnalyticsChart from '../../components/admin/AnalyticsChart';
import { api } from '../../services/api';

const AdminDashboard: React.FC = () => {
  useAdminGuard();
  const token = useUserStore(state => state.token);

  const [analytics, setAnalytics] = useState<any>(null);
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalEmployers: 0,
    totalJobs: 0,
    totalApplications: 0,
    activeJobs: 0
  });
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchData();
  }, [token]);

  async function fetchData() {
    try {
      setLoading(true);
      
      // Fetch analytics from existing endpoint
      try {
        const data = await getAnalytics(token || '');
        setAnalytics(data);
      } catch (analyticsErr) {
        console.error('Analytics endpoint error:', analyticsErr);
      }

      // Fetch additional stats from application endpoint
      try {
        const applicationsResponse = await api.get('/applications/all');
        if (applicationsResponse.success) {
          const applications = applicationsResponse.applications || [];
          setStats(prev => ({
            ...prev,
            totalApplications: applications.length
          }));
        }
      } catch (appErr) {
        console.error('Applications error:', appErr);
      }

      setError(null);
    } catch (err: any) {
      setError(err.message || 'Failed to load data');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Admin Dashboard</h1>

      {loading && <p>Loading analytics...</p>}
      {error && <p className="text-red-500">Error: {error}</p>}

      {analytics && (
        <>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
            <StatWidget
              title="Total Users"
              value={analytics.totalUsers ?? 0}
              icon={<svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a4 4 0 00-3-3.87M9 20H4v-2a4 4 0 013-3.87m9-4a4 4 0 11-8 0 4 4 0 018 0zm6 4v2a2 2 0 01-2 2h-4a2 2 0 01-2-2v-2a2 2 0 012-2h4a2 2 0 012 2z" /></svg>}
              colorClass="text-blue-500"
            />
            <StatWidget
              title="Total Employers"
              value={analytics.totalEmployers ?? 0}
              icon={<svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zm6 14v-2a4 4 0 00-3-3.87M6 21v-2a4 4 0 013-3.87" /></svg>}
              colorClass="text-green-500"
            />
            <StatWidget
              title="Total Jobs"
              value={analytics.totalJobs ?? 0}
              icon={<svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M9 17v-2a4 4 0 018 0v2m-4-4a4 4 0 100-8 4 4 0 000 8zm6 4v2a2 2 0 01-2 2H7a2 2 0 01-2-2v-2a2 2 0 012-2h8a2 2 0 012 2z" /></svg>}
              colorClass="text-purple-500"
            />
            <StatWidget
              title="Bewerbungen"
              value={stats.totalApplications}
              icon={<svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>}
              colorClass="text-orange-500"
            />
          </div>

          <AnalyticsChart
            data={analytics.monthlyApplications ?? { labels: [], values: [] }}
            title="Bewerbungen pro Monat"
            label="Bewerbungen"
          />
        </>
      )}
    </div>
  );
};

export default AdminDashboard;
