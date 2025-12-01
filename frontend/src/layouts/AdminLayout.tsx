// frontend/src/layouts/AdminLayout.tsx
import React from 'react';
import AdminNavbar from '../components/admin/AdminNavbar'; // <-- NEU: Import der Navbar-Komponente

// NOTE: Dies ist ein vereinfachtes Admin-Layout, das Platz für eine Seitenleiste und einen Header lässt.

interface AdminLayoutProps {
  children: React.ReactNode;
}

const AdminLayout: React.FC<AdminLayoutProps> = ({ children }) => {
  return (
    // Die Layout-Struktur ist flexibel und responsiv
    <div className="flex h-screen bg-gray-100 dark:bg-gray-900">
      
      {/* Sidebar - Nur ein Placeholder */}
      <aside className="w-64 bg-white dark:bg-gray-800 shadow-xl hidden md:block">
        <div className="p-4 text-2xl font-bold text-blue-600 dark:text-blue-400 border-b dark:border-gray-700">
          Admin Panel
        </div>
        <nav className="p-4 space-y-2">
          {/* Hier würden Navigationselemente wie Links zu /admin/users, /admin/jobs, etc. stehen */}
          <div className="text-gray-600 dark:text-gray-300">Navigation Placeholder</div>
        </nav>
      </aside>

      {/* Hauptinhalt */}
      <div className="flex-1 flex flex-col overflow-hidden">
        
        {/* Header - Verwenden der dedizierten Navbar-Komponente */}
        <AdminNavbar />

        {/* Inhaltsbereich */}
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100 dark:bg-gray-900 p-6">
          <div className="container mx-auto">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;