// frontend/src/pages/Admin/Users.tsx

import React, { useEffect } from 'react';
import AdminLayout from '../../layouts/AdminLayout';
import { getUsers } from '../../api/admin';
import { useUserStore } from '../../store/userStore';
import { useAdminGuard } from '../../hooks/useAdmin'
import { User } from '../../types/user';

const AdminUsers: React.FC = () => {
  useAdminGuard();
  const token = useUserStore(state => state.token);
  const [users, setUsers] = React.useState<User[] | null>(null);
  const [loading, setLoading] = React.useState<boolean>(true);
  const [error, setError] = React.useState<string | null>(null);

const columns = [
    { key: 'email', label: 'Email' },
    { key: 'displayName', label: 'Name' },
    { key: 'role', label: 'Role' },
    { key: 'createdAt', label: 'Created' }
];

useEffect(() => {
    async function fetchUsers() {
        try {
            setLoading(true);
            const data = await getUsers(token);
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
      {users && 
        <table>
          <thead>
            <tr>
              {columns.map(col => (
                <th key={col.key}>{col.label}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {users.map(user => (
              <tr key={user.id}>
                {columns.map(col => (
                  <td key={col.key}>{user[col.key]}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      }
    </AdminLayout>
  );
}

export default AdminUsers;