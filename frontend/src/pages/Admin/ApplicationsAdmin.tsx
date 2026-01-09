// frontend/src/pages/Admin/ApplicationsAdmin.tsx

import React, { useEffect } from 'react';
import AdminTable from '../../components/admin/AdminTable';
import { getApplications } from '../../api/admin';
import { useUserStore } from '../../store/userStore';
import { useAdminGuard } from '../../hooks/useAdmin';
import AdminLayout from '../../layouts/AdminLayout';
import type { AdminApplication } from '../../types/admin';
import { Spinner, Toast } from '../../components/ui';
import { useToast } from '../../hooks/useToast';

function ApplicationsAdmin() {
  useAdminGuard();
  const token = useUserStore(state => state.token);
  const { toasts, error: showError, hideToast } = useToast();
  const [apps, setApps] = React.useState<AdminApplication[] | null>(null);
  const [loading, setLoading] = React.useState<boolean>(true);

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
            const data = await getApplications(token ?? undefined);
            setApps(data);
        } catch (err) {
            const message = err instanceof Error ? err.message : 'Failed to load applications';
            showError(message);
        } finally {
            setLoading(false);
        }
    }
    fetchApplications();
  }, [token]);  
    return (
    <AdminLayout>
        <h1 className="text-2xl font-bold mb-4">Manage Applications</h1>
        {toasts.map(toast => (
          <Toast key={toast.id} {...toast} onClose={() => hideToast(toast.id)} />
        ))}
        {loading ? <Spinner size="lg" label="Loading applications..." /> : apps && <AdminTable columns={columns} data={apps} />}
    </AdminLayout>
  );
}  
export default ApplicationsAdmin;