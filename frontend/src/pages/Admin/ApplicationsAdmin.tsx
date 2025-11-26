// frontend/src/pages/Admin/ApplicationsAdmin.tsx

import React, { useEffect } from 'react';
import AdminTable from '../../components/admin/AdminTable';
import { getApplications } from '../../api/admin';
import { useUserStore } from '../../store/userStore';
import { useAdminGuard } from '../../hooks/useAdmin';
import AdminLayout from '../../layouts/AdminLayout';
import type { AdminApplication } from '../../types/admin';

function ApplicationsAdmin() {
  useAdminGuard();
  const token = useUserStore(state => state.token);
  const [apps, setApps] = React.useState<AdminApplication[] | null>(null);
  const [loading, setLoading] = React.useState<boolean>(true);
  const [error, setError] = React.useState<string | null>(null);

  const columns = [ 
    { key: 'applicantId', label: 'Applicant ID' },
    { key: 'jobId', label: 'Job ID' },
    { key: 'userId', label: 'User ID' },
    { key: 'status', label: 'Status' },
    { key: 'submittedAt', label: 'Submitted At' },    
  ];
    useEffect(() => {   
    async function fetchApplications() {
        try {
            setLoading(true);
            const data = await getApplications(token);
            setApps(data);
        } catch (err: any) {
            setError(err.message || 'Failed to load applications');
        } finally {
            setLoading(false);
        }
    }
    fetchApplications();
  }, [token]);  
    return (
    <AdminLayout>
        <h1 className="text-2xl font-bold mb-4">Manage Applications</h1>
        {loading && <p>Loading applications...</p>}
        {error && <p className="text-red-600">{error}</p>}
        {apps && <AdminTable columns={columns} data={apps} />}
    </AdminLayout>
  );
}  
export default ApplicationsAdmin;