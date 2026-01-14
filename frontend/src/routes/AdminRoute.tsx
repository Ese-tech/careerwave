// frontend/src/routes/AdminRoute.tsx
import React from 'react';
import { useAuthStore } from '../store/authStore';
import { Navigate } from 'react-router-dom';
import AdminLayout from '../layouts/AdminLayout';
import { isAdminEmail } from '../config/adminConfig';

interface AdminRouteProps {
  children: React.ReactNode;
}

const AdminRoute: React.FC<AdminRouteProps> = ({ children }) => {
  const { user, token } = useAuthStore();

  if (!token || !user) {
    return <Navigate to="/login" replace />;
  }

  // Check if user has admin role OR is in the admin email list
  if (user.role !== 'admin' && !isAdminEmail(user.email)) {
    return <Navigate to="/forbidden" replace />;
  }

  return <AdminLayout>{children}</AdminLayout>;
};

export default AdminRoute;