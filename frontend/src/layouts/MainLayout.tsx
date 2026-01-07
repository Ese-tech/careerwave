// frontend/src/layouts/MainLayout.tsx

import { Outlet } from 'react-router-dom';
import { Header } from '../components/layout/Header';
import { Footer } from '../components/layout/Footer';
import { useTranslation } from 'react-i18next';

export function MainLayout() {
  const { t } = useTranslation();
  
  return (
    <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-slate-900">
      <Header />
      
      <main className="flex-1">
        <Outlet />
      </main>
      
      <Footer />
    </div>
  );
}

export default MainLayout;