// frontend/src/pages/DashboardAdmin.tsx
import React from 'react';
import { useTranslation } from 'react-i18next';
import { AdminDashboard } from './Admin/AdminDashboard';
import { AdminLayout } from '../layouts/AdminLayout';

export function DashboardAdmin() {
  const { t } = useTranslation();
  
  return (
    <AdminLayout>
      <AdminDashboard />
    </AdminLayout>
  );
}

export default DashboardAdmin;