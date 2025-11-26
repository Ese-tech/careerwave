// frontend/src/components/admin/AdminSidebar.tsx

import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ADMIN_ROUTES } from '../../constants/admin';

const items = [
    { label: 'Dashboard', path: ADMIN_ROUTES.root },
    { label: 'Users', path: ADMIN_ROUTES.users },
    { label: 'Employers', path: ADMIN_ROUTES.employers },
    { label: 'Jobs', path: ADMIN_ROUTES.jobs },
    { label: 'Applications', path: ADMIN_ROUTES.applications },
    { label: 'Analytics', path: ADMIN_ROUTES.analytics },
    { label: 'Settings', path: ADMIN_ROUTES.settings },
];

const AdminSidebar: React.FC = () => {
    const location = useLocation();

    return (
        <div className="w-64 bg-white border-r">
            <div className="p-6 font-bold text-xl border-b">
                Admin Panel
            </div>
            <nav className="mt-6">
                {items.map((item) => (
                    <Link
                        key={item.path}
                        to={item.path}
                        className={`block px-6 py-3 hover:bg-gray-100 ${location.pathname === item.path ? 'bg-gray-200 font-semibold' : 'font-medium'}`}
                    >
                        {item.label}
                    </Link>
                ))}
            </nav>
        </div>
    );
};

export default AdminSidebar;