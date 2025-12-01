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
        <header className={`flex items-center justify-between p-4 border-b ${theme === 'dark' ? 'bg-gray-800 text-white dark:border-gray-700' : 'bg-white text-black border-gray-200'}`}>
            
            {/* Navigations-Link zum Haupt-Admin-Dashboard (ersetzt den alten H1-Titel) */}
            <Link to={ADMIN_ROUTES.root} className="text-xl font-semibold text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                Dashboard Overview
            </Link>
            
            <div className="flex items-center space-x-4">
                {/* Theme Toggle Button */}
                <button
                    onClick={toggleTheme}
                    className="flex items-center px-3 py-1 text-sm border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                    title="Toggle Theme"
                >
                    <svg className="w-5 h-5 mr-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                        {theme === 'dark' ? 
                            // Moon Icon
                            <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z"></path> :
                            // Sun Icon
                            <path d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 10a4 4 0 11-8 0 4 4 0 018 0zm-.464 5.232a1 1 0 101.415 1.414l.707-.707a1 1 0 00-1.414-1.415l-.707.707zM17 12a1 1 0 100-2h-1a1 1 0 100 2h1zm-5.232-4.464a1 1 0 00-1.414-1.415l-.707.707a1 1 0 001.414 1.415l.707-.707zM3 12a1 1 0 100-2H2a1 1 0 000 2h1zm9.464 5.232l.707.707a1 1 0 001.414-1.415l-.707-.707a1 1 0 00-1.414 1.415zM20 10h-1a1 1 0 000 2h1a1 1 0 000-2z"></path>
                        }
                    </svg>
                    {theme === 'dark' ? 'Light Mode' : 'Dark Mode'}
                </button>

                {/* Angemeldeter Benutzername */}
                {user && (
                    <span className="font-medium text-gray-700 dark:text-gray-200 hidden sm:inline">
                        Angemeldet als: {user.name || user.email}
                    </span>     
                )}
                
                {/* Optional: Logout Button (Placeholder) */}
                <button 
                    onClick={() => console.log('Logout action')}
                    className="text-sm text-red-600 dark:text-red-400 hover:text-red-800 dark:hover:text-red-300 transition-colors"
                >
                    Logout
                </button>
            </div>
        </header>
    );
};

export default AdminNavbar;