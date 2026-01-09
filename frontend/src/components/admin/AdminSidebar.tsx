// frontend/src/components/admin/AdminSidebar.tsx

import React from 'react';
import { Link, useLocation } from 'react-router-dom';
// Korrigierter Pfad, da Sidebar in components/admin liegt und constants/hooks eine Ebene höher
import { ADMIN_ROUTES } from '../../constants/admin'; 
import { useTheme } from '../../hooks/useTheme'; 

// Definition der Navigations-Elemente
const items = [
    { label: 'Dashboard', path: ADMIN_ROUTES.root, icon: 'M10 2a8 8 0 100 16 8 8 0 000-16zM6 12a1 1 0 112 0 1 1 0 01-2 0zm6-4a1 1 0 11-2 0 1 1 0 012 0z' },
    { label: 'Users', path: ADMIN_ROUTES.users, icon: 'M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z' },
    { label: 'Employers', path: ADMIN_ROUTES.employers, icon: 'M3 6l4 4 4-4 4 4 4-4v14a2 2 0 01-2 2H5a2 2 0 01-2-2V6z' },
    { label: 'Jobs', path: ADMIN_ROUTES.jobs, icon: 'M10 18a8 8 0 100-16 8 8 0 000 16zM9 9h2v4H9V9z' },
    { label: 'Job Sync', path: '/admin/job-sync', icon: 'M4 4a2 2 0 012-2h8a2 2 0 012 2v12a2 2 0 01-2 2H6a2 2 0 01-2-2V4z' },
    { label: 'Applications', path: ADMIN_ROUTES.applications, icon: 'M16 12H4V8h12v4zM4 16h12v-2H4v2z' },
    { label: 'Analytics', path: ADMIN_ROUTES.analytics, icon: 'M10 3a1 1 0 00-1 1v12a1 1 0 102 0V4a1 1 0 00-1-1z' },
    { label: 'Settings', path: ADMIN_ROUTES.settings, icon: 'M10 2a8 8 0 100 16 8 8 0 000-16zM8 8a2 2 0 104 0 2 2 0 00-4 0z' },
];

const AdminSidebar: React.FC = () => {
    const location = useLocation();
    const { theme } = useTheme();

    const isDark = theme === 'dark';
    const bgColor = isDark ? 'bg-gray-800' : 'bg-white';
    const borderColor = isDark ? 'border-gray-700' : 'border-gray-200';
    const textColor = isDark ? 'text-gray-200' : 'text-gray-900';
    const titleColor = isDark ? 'text-blue-400' : 'text-blue-600';

    return (
        <div className={`w-64 hidden md:flex flex-col ${bgColor} border-r ${borderColor} shadow-xl`}>
            <div className={`p-6 font-extrabold text-2xl ${titleColor} border-b ${borderColor}`}>
                CareerWave
            </div>
            <nav className="mt-6 flex-1 overflow-y-auto">
                {items.map((item) => {
                    // Überprüft, ob der Pfad aktiv ist. Verwendet startsWith, um Unterpfade zu erfassen, 
                    // aber prüft exakt für den Root-Pfad.
                    const isActive = location.pathname.startsWith(item.path) && 
                                     (item.path !== ADMIN_ROUTES.root || location.pathname === ADMIN_ROUTES.root);
                                     
                    const linkClasses = `flex items-center mx-3 py-3 px-4 rounded-lg transition-colors duration-200 ${textColor} ${
                        isActive
                            ? 'bg-blue-500 text-white shadow-md'
                            : 'hover:bg-gray-100 dark:hover:bg-gray-700 font-medium'
                    }`;

                    return (
                        <Link
                            key={item.path}
                            to={item.path}
                            className={linkClasses}
                        >
                            <svg className="w-5 h-5 mr-3" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                <path d={item.icon}></path>
                            </svg>
                            {item.label}
                        </Link>
                    );
                })}
            </nav>
            <div className={`p-6 text-sm text-center ${isDark ? 'text-gray-500' : 'text-gray-400'} border-t ${borderColor}`}>
                © 2024 Admin
            </div>
        </div>
    );
};

export default AdminSidebar;