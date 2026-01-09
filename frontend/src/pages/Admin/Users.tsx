// frontend/src/pages/Admin/Users.tsx

import React, { useEffect } from 'react';
import AdminLayout from '../../layouts/AdminLayout';
import { getUsers } from '../../api/admin';
import { useUserStore } from '../../store/userStore';
import { useAdminGuard } from '../../hooks/useAdmin'
import AdminTable from '../../components/admin/AdminTable';
import type { AdminUser } from '../../types/admin';
import { Spinner, Toast } from '../../components/ui';
import { useToast } from '../../hooks/useToast';

const AdminUsers: React.FC = () => {
  useAdminGuard();
  const token = useUserStore(state => state.token);
  const { toasts, error: showError, hideToast } = useToast();
  const [users, setUsers] = React.useState<AdminUser[] | null>(null);
  const [loading, setLoading] = React.useState<boolean>(true);

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
        } catch (err) {
            const message = err instanceof Error ? err.message : 'Failed to load users';
            showError(message);
        } finally {
            setLoading(false);
        }
    }
    fetchUsers();
}, [token]);

  return (
    <AdminLayout>
      <h1 className="text-2xl font-bold mb-4">Manage Users</h1>
      {toasts.map(toast => (
        <Toast key={toast.id} {...toast} onClose={() => hideToast(toast.id)} />
      ))}
      {loading ? <Spinner size="lg" label="Loading users..." /> : users && <AdminTable columns={columns} data={users} />}
    </AdminLayout>
  );
}

export default AdminUsers