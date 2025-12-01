// frontend/src/pages/Admin/Users.tsx

import React, { useEffect } from 'react';
import AdminLayout from '../../layouts/AdminLayout';
import { getUsers } from '../../api/admin';
import { useUserStore } from '../../store/userStore';
import { useAdminGuard } from '../../hooks/useAdmin'
import AdminTable from '../../components/admin/AdminTable'; // Import the AdminTable component
import type { AdminUser } from '../../types/admin'; // Use AdminUser type

const AdminUsers: React.FC = () => {
  useAdminGuard();
  const token = useUserStore(state => state.token);
  const [users, setUsers] = React.useState<AdminUser[] | null>(null); // Use AdminUser
  const [loading, setLoading] = React.useState<boolean>(true);
  const [error, setError] = React.useState<string | null>(null);

const columns = [
    { key: 'uid', label: 'UID' }, // Use uid instead of id for Firebase Auth user
    { key: 'email', label: 'Email' },
    { key: 'displayName', label: 'Name' },
    { key: 'role', label: 'Role' },
    { key: 'createdAt', label: 'Created' }
];

useEffect(() => {
    async function fetchUsers() {
        try {
            setLoading(true);
            const data = await getUsers(token ?? undefined);
            setUsers(data);
        } catch (err: any) {
            setError(err.message || 'Failed to load users');
        } finally {
            setLoading(false);
        }
    }
    fetchUsers();
}, [token]);

  return (
    <AdminLayout>
      <h1 className="text-2xl font-bold mb-4">Manage Users</h1>
      {loading && <p>Loading users...</p>}
      {error && <p className="text-red-500">Error: {error}</p>}
      {users && <AdminTable columns={columns} data={users} />} {/* Use AdminTable here */}
    </AdminLayout>
  );
}

export default AdminUsers