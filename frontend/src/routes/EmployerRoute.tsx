// frontend/src/routes/EmployerRoute.tsx
import React from 'react';
import { useAuthStore } from '../store/authStore';
import { Navigate } from 'react-router-dom';
import EmployerLayout from '../layouts/EmployerLayout';

interface EmployerRouteProps {
  children: React.ReactNode;
}

const EmployerRoute: React.FC<EmployerRouteProps> = ({ children }) => {
  const { user, token } = useAuthStore();

  if (!token || !user) {
    return <Navigate to="/login" replace />;
  }

  if (user.role !== 'employer') {
    return <Navigate to="/forbidden" replace />;
  }

  return <EmployerLayout>{children}</EmployerLayout>;
};

export default EmployerRoute;