// frontend/src/pages/Admin/AdminDashboard.tsx
import React, { useEffect, useState } from 'react';
import { getAnalytics } from '../../api/admin';
import { StatWidget } from '../../components/admin/StatWidget';
import { useUserStore } from '../../store/userStore';
import { useAdminGuard } from '../../hooks/useAdmin';
import AnalyticsChart from '../../components/admin/AnalyticsChart';

const AdminDashboard: React.FC = () => {
  useAdminGuard();
  const token = useUserStore(state => state.token);

  const [analytics, setAnalytics] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchAnalytics() {
      try {
        setLoading(true);
        const data = await getAnalytics(token || '');
        setAnalytics(data);
      } catch (err: any) {
        setError(err.message || 'Failed to load analytics');
      } finally {
        setLoading(false);
      }
    }
    fetchAnalytics();
  }, [token]);

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Admin Dashboard</h1>

      {loading && <p>Loading analytics...</p>}
      {error && <p className="text-red-500">Error: {error}</p>}

      {analytics && (
        <>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            <StatWidget title="Total Users" value={analytics.totalUsers ?? 0} />
            <StatWidget title="Total Employers" value={analytics.totalEmployers ?? 0} />
            <StatWidget title="Total Jobs" value={analytics.totalJobs ?? 0} />
          </div>

          <AnalyticsChart data={analytics.monthlyApplications ?? []} />
        </>
      )}
    </div>
  );
};

export default AdminDashboard;
