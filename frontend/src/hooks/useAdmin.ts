// frontend/src/hooks/useAdmin.ts
import { useEffect } from 'react';
import { useUserStore } from '../store/userStore';
import { useNavigate } from 'react-router-dom';

export function useAdminGuard() {
  const user = useUserStore(state => state.user);
  const navigate = useNavigate();

  useEffect(() => {
    // Nicht eingeloggt → zum Login
    if (!user) {
      navigate('/login');
      return;
    }

    // Kein Admin → Forbidden-Seite
    if (user.role !== 'admin') {
      navigate('/forbidden');
    }

  }, [user, navigate]);

  return { user, isAdmin: user?.role === 'admin' };
}



