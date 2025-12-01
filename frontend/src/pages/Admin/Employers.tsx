import React, { useEffect } from 'react';
import AdminLayout from '../../layouts/AdminLayout';
import AdminTable from '../../components/admin/AdminTable';
import { getEmployers, verifyEmployer } from '../../api/admin';
import { useUserStore } from '../../store/userStore';
import { useAdminGuard } from '../../hooks/useAdmin';
import type { Employer } from '../../types/employer'; // Employer type from frontend/src/types/employer.ts
 // Employer type from frontend/src/types/employer.ts

function AdminEmployers() {
  useAdminGuard();
  const token = useUserStore(state => state.token);
  const [employers, setEmployers] = React.useState<Employer[] | null>(null);
  const [loading, setLoading] = React.useState<boolean>(true);
  const [error, setError] = React.useState<string | null>(null);

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
      // NOTE: We rely on the backend to return an array of Employer objects
      const data = await getEmployers(token ?? undefined);
      setEmployers(data);
    } catch (err: any) {
      setError(err.message || 'Failed to load employers');
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
      // CORRECTION: The verifyEmployer API call needs the employerId and the token
      await verifyEmployer(employerId, token ?? undefined);
      // Refresh the employers list after verification
      await fetchEmployers();
    } catch (err: any) {
      setError(err.message || 'Failed to verify employer');
    } finally {
      setLoading(false);
    }
  }

  return (
    <AdminLayout>
      <h1 className="text-2xl font-bold mb-4">Manage Employers</h1>
      {loading && <p>Loading employers...</p>}
      {error && <p className="text-red-600">{error}</p>}
      {employers && <AdminTable columns={columns} data={employers} />}
    </AdminLayout>
  );
}

export default AdminEmployers;