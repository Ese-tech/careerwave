// frontend/src/routes/CandidateRoute.tsx
import React from 'react';
import { useAuthStore } from '../store/authStore';
import { Navigate } from 'react-router-dom';
import CandidateLayout from '../layouts/CandidateLayout';

interface CandidateRouteProps {
  children: React.ReactNode;
}

const CandidateRoute: React.FC<CandidateRouteProps> = ({ children }) => {
  const { user, token } = useAuthStore();

  if (!token || !user) {
    return <Navigate to="/login" replace />;
  }

  if (user.role !== 'candidate') {
    return <Navigate to="/forbidden" replace />;
  }

  return <CandidateLayout>{children}</CandidateLayout>;
};

export default CandidateRoute;