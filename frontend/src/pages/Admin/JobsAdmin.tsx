// frontend/src/pages/Admin/ApplicationsAdmin.tsx

import React, { useEffect } from 'react';
import AdminTable from '../../components/admin/AdminTable';
import { getJobsAdmin } from '../../api/admin';
import { useUserStore } from '../../store/userStore';
import { useAdminGuard } from '../../hooks/useAdmin';
import AdminLayout from '../../layouts/AdminLayout';
import type { JobAdmin } from '../../types/admin';
import { Spinner, Toast } from '../../components/ui';
import { useToast } from '../../hooks/useToast';

function JobsAdmin() {
  useAdminGuard();
  const token = useUserStore(state => state.token);
  const { toasts, error: showError, hideToast } = useToast();
  const [jobs, setJobs] = React.useState<JobAdmin[] | null>(null);
  const [loading, setLoading] = React.useState<boolean>(true);

  const columns = [
    { key: 'title', label: 'Job Title' },
    { key: 'companyName', label: 'Company Name' },
    { key: 'location', label: 'Location' },
    { key: 'postedAt', label: 'Posted At' },
    { key: 'status', label: 'Status' },
    { key: 'published', label: 'Published', render: (j:any) => j.published ? 'Yes' : 'No' },    
  ];    
    useEffect(() => {   
    async function fetchJobs() {
        try {
            setLoading(true);
            const data = await getJobsAdmin(token ?? undefined);
            setJobs(data);
        } catch (err) {
            const message = err instanceof Error ? err.message : 'Failed to load jobs';
            showError(message);
        } finally {
            setLoading(false);
        }
    }
    fetchJobs();
  }, [token]);  
    return (
    <AdminLayout>
        <h1 className="text-2xl font-bold mb-4">Manage Jobs</h1>
        {toasts.map(toast => (
          <Toast key={toast.id} {...toast} onClose={() => hideToast(toast.id)} />
        ))}
        {loading ? <Spinner size="lg" label="Loading jobs..." /> : jobs && <AdminTable columns={columns} data={jobs} />}
    </AdminLayout>
  );
}  
export default JobsAdmin;