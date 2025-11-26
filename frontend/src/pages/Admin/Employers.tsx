//frontens/src/pages/Admin/Employers.tsx

import React, { useEffect } from 'react';
import AdminLayout from '../../layouts/AdminLayout';
import AdminTable from '../../components/admin/AdminTable';
import { getEmployers, verifyEmployer } from '../../api/admin';
import { useUserStore } from '../../store/userStore';
import { useAdminGuard } from '../../hooks/useAdmin';
import { Employer } from '../../types/employer';

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
    { key: 'verified', label: 'Verified', render: (r: any) => r.verified ? 'Yes' : 'No' },
    { key: 'actions', label: 'Actions', render: (r: any) => <button disabled={loading || r.verified} onClick={() => handleVerify(r.id)} className="px-2 py-1 bg-blue-600 text-white rounded">Verify</button> },
    { key: 'createdAt', label: 'Created' },
  ];

  useEffect(() => {     
    async function fetchEmployers() {
      try {
        setLoading(true);
        const data = await getEmployers(token);
        setEmployers(data);
      } catch (err: any) {
        setError(err.message || 'Failed to load employers');
      } finally {
        setLoading(false);
      }
    }
    fetchEmployers();
  }, [token]);

  async function handleVerify(employerId: string) {
    try {
      setLoading(true);
      await verifyEmployer(token, employerId);
      // Refresh the employers list after verification
      const data = await getEmployers(token);
      setEmployers(data);
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