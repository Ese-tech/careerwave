// frontend/src/pages/Admin/ApplicationsAdmin.tsx

import React, { useEffect } from 'react';
import AdminTable from '../../components/admin/AdminTable';
import { getJobsAdmin } from '../../api/admin';
import { useUserStore } from '../../store/userStore';
import { useAdminGuard } from '../../hooks/useAdmin';
import AdminLayout from '../../layouts/AdminLayout';
import type { JobAdmin } from '../../types/admin';

function JobsAdmin() {
  useAdminGuard();
  const token = useUserStore(state => state.token);
  const [jobs, setJobs] = React.useState<JobAdmin[] | null>(null);
  const [loading, setLoading] = React.useState<boolean>(true);
  const [error, setError] = React.useState<string | null>(null);

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
        } catch (err: any) {
            setError(err.message || 'Failed to load jobs');
        } finally {
            setLoading(false);
        }
    }
    fetchJobs();
  }, [token]);  
    return (
    <AdminLayout>
        <h1 className="text-2xl font-bold mb-4">Manage Jobs</h1>
        {loading && <p>Loading jobs...</p>}
        {error && <p className="text-red-600">{error}</p>}
        {jobs && <AdminTable columns={columns} data={jobs} />}
    </AdminLayout>
  );
}  
export default JobsAdmin;