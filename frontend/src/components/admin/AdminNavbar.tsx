// frontend/src/components/admin/AdminNavbar.tsx

import React from 'react';
import { useTheme } from '../../hooks/useTheme';
import { useUserStore } from '../../store/userStore';   
import { Link } from 'react-router-dom';
import { ADMIN_ROUTES } from '../../constants/admin';

const AdminNavbar: React.FC = () => {
    const { theme, toggleTheme } = useTheme();
    const user = useUserStore(state => state.user);

    return (
        <header className={`flex items-center justify-between p-4 border-b ${theme === 'dark' ? 'bg-gray-800 text-white' : 'bg-white text-black'}`}>
            <Link to={ADMIN_ROUTES.root} className="text-2xl font-bold">
                Admin Panel
            </Link>
            <div className="flex items-center space-x-4">
                <button
                    onClick={toggleTheme}
                    className="px-3 py-1 border rounded"
                >
                    {theme === 'dark' ? 'Light Mode' : 'Dark Mode'}
                </button>
                {user && (
                    <span className="font-medium">
                        {user.name}
                    </span>     
                )}
            </div>
        </header>
    );
};

export default AdminNavbar;