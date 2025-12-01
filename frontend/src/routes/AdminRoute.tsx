//frontend/src/routes/AdminRoute.tsx
import React from 'react';
import { useUserStore } from '../store/userStore'; 
import { Navigate } from 'react-router-dom';
import { ADMIN_ROLE } from '../constants/admin';

interface AdminRouteProps {
  children: React.ReactNode;
}

/**
 * Route Guard-Komponente, die sicherstellt, dass nur Benutzer mit der
 * Rolle 'admin' auf die Kinder-Routen zugreifen können.
 */
const AdminRoute: React.FC<AdminRouteProps> = ({ children }) => {
  const user = useUserStore(state => state.user);
  const isLoading = useUserStore(state => state.isLoading);

  // Solange geladen wird, zeigen wir einen Lade-Status
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
        <p className="text-blue-600 dark:text-blue-400">Loading user state...</p>
      </div>
    );
  }

  // 1. Nicht angemeldet: Weiterleitung zur Login-Seite
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // 2. Angemeldet, aber falsche Rolle: Weiterleitung zur Forbidden-Seite
  if (user.role !== ADMIN_ROLE) {
    return <Navigate to="/forbidden" replace />;
  }

  // 3. Admin: Kind-Komponente rendern
  return <>{children}</>;
};

export default AdminRoute;