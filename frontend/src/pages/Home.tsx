// frontend/src/pages/Home.tsx

import React from 'react';
import { Link } from 'react-router-dom';
import { useUserStore } from '../store/userStore';

const Home: React.FC = () => {
    // Stellen Sie sicher, dass der Store korrekt aus '../store/userStore' importiert wird.
    const user = useUserStore(state => state.user);
    const logout = useUserStore(state => state.logout);

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-6">
            <div className="text-center">
                <h1 className="text-5xl font-extrabold text-blue-600 mb-4">
                    Welcome to CareerWave
                </h1>
                <p className="text-xl text-gray-700 mb-8">
                    Your platform for finding the perfect job.
                </p>
                
                {user ? (
                    <div className="space-y-4">
                        <p className="text-lg font-medium text-gray-800">
                            Logged in as: <strong>{user.email}</strong> ({user.role})
                        </p>
                        <div className="flex justify-center space-x-4">
                            <Link to="/jobs" className="admin-button bg-green-500 hover:bg-green-600">
                                View Job Listings
                            </Link>
                            {user.role === 'admin' && (
                                <Link to="/admin" className="admin-button bg-purple-500 hover:bg-purple-600">
                                    Go to Admin Panel
                                </Link>
                            )}
                            <button onClick={logout} className="admin-button bg-red-500 hover:bg-red-600">
                                Logout
                            </button>
                        </div>
                    </div>
                ) : (
                    <div className="space-x-4">
                        <Link to="/login" className="admin-button">
                            Login
                        </Link>
                        <Link to="/register" className="admin-button bg-gray-500 hover:bg-gray-600">
                            Register
                        </Link>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Home;