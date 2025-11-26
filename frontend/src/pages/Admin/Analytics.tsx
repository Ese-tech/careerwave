// frontend/src/pages/Admin/Analytics.tsx

import React, { useEffect, useState } from 'react';
import { getAnalytics } from '../../api/admin';
import { StatWidget } from '../../components/admin/StatWidget';
import { useUserStore } from '../../store/userStore';
import { useAdminGuard } from '../../hooks/useAdmin';
import AdminLayout from '../../layouts/AdminLayout';
import AnalyticsChart from '../../components/admin/AnalyticsChart';

interface AnalyticsData {
  totalUsers: number;
  totalEmployers: number;
  totalJobs: number;
  totalApplications: number;
  monthlyApplications: { month: string; count: number }[];
}

function Analytics() {
  useAdminGuard();
  const token = useUserStore(state => state.token);
  const [analytics, setAnalytics] = useState<AnalyticsData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchAnalytics() {
      try {
        setLoading(true);
        const data = await getAnalytics(token);
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
    <AdminLayout>
      <h1 className="text-2xl font-bold mb-4">Analytics Dashboard</h1>

      {loading && <p>Loading analytics...</p>}
      {error && <p className="text-red-600">{error}</p>}

      {analytics && (
        <>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
            <StatWidget title="Total Users" value={analytics.totalUsers} />
            <StatWidget title="Total Employers" value={analytics.totalEmployers} />
            <StatWidget title="Total Jobs" value={analytics.totalJobs} />
            <StatWidget title="Total Applications" value={analytics.totalApplications} />
          </div>

          <AnalyticsChart
            data={{
              labels: analytics.monthlyApplications.map(item => item.month),
              values: analytics.monthlyApplications.map(item => item.count),
            }}
          />
        </>
      )}
    </AdminLayout>
  );
}

export default Analytics;
