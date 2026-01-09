import React, { useEffect } from 'react';
import AdminLayout from '../../layouts/AdminLayout';
import AdminTable from '../../components/admin/AdminTable';
import { getEmployers, verifyEmployer } from '../../api/admin';
import { useUserStore } from '../../store/userStore';
import { useAdminGuard } from '../../hooks/useAdmin';
import type { Employer } from '../../types/employer';
import { Spinner, Toast } from '../../components/ui';
import { useToast } from '../../hooks/useToast';

function AdminEmployers() {
  useAdminGuard();
  const token = useUserStore(state => state.token);
  const { toasts, error: showError, success, hideToast } = useToast();
  const [employers, setEmployers] = React.useState<Employer[] | null>(null);
  const [loading, setLoading] = React.useState<boolean>(true);

  const columns = [
    { key: 'companyName', label: 'Company Name' },
    { key: 'email', label: 'Email' },
    { key: 'website', label: 'Website' },
    { key: 'verified', label: 'Verified', render: (r: Employer) => r.verified ? 'Yes' : 'No' },
    { key: 'actions', label: 'Actions', render: (r: Employer) => (
        <button 
            disabled={loading || r.verified} 
            onClick={() => handleVerify(r.id)} 
            className={`px-2 py-1 text-white rounded transition ${r.verified ? 'bg-gray-400' : 'bg-blue-600 hover:bg-blue-700'}`}
        >
            {r.verified ? 'Verified' : 'Verify'}
        </button>
    )},
    { key: 'createdAt', label: 'Created' },
  ];

  async function fetchEmployers() {
    try {
      setLoading(true);
      const data = await getEmployers(token ?? undefined);
      setEmployers(data);
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to load employers';
      showError(message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchEmployers();
  }, [token]);

  async function handleVerify(employerId: string) {
    try {
      setLoading(true);
      await verifyEmployer(employerId, token ?? undefined);
      await fetchEmployers();
      success('Employer verified successfully');
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to verify employer';
      showError(message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <AdminLayout>
      <h1 className="text-2xl font-bold mb-4">Manage Employers</h1>
      {toasts.map(toast => (
        <Toast key={toast.id} {...toast} onClose={() => hideToast(toast.id)} />
      ))}
      {loading ? <Spinner size="lg" label="Loading employers..." /> : employers && <AdminTable columns={columns} data={employers} />}
    </AdminLayout>
  );
}

export default AdminEmployers;