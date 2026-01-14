// frontend/src/pages/Auth/Register.tsx

import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { registerUser } from '../../api/auth';
import { useUserStore } from '../../store/userStore';

const Register: React.FC = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<string | null>(null);
    const navigate = useNavigate();
    const user = useUserStore(state => state.user);
    const isLoading = useUserStore(state => state.isLoading);

    // Redirect if already logged in
    useEffect(() => {
        if (user) {
            navigate('/dashboard');
        }
    }, [user, navigate]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);
        setSuccess(null);

        if (password !== confirmPassword) {
            setError('Passwords do not match');
            return;
        }

        useUserStore.getState().setLoading(true);

        try {
            await registerUser(email, password);
            setSuccess('Registration successful! You can now log in.');
            setTimeout(() => navigate('/login'), 2000);
        } catch (err: any) {
            console.error(err);
            setError(err.message || 'Registration failed. Please try a different email.');
        } finally {
            useUserStore.getState().setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
            <div className="w-full max-w-md bg-white p-8 rounded-xl shadow-2xl">
                <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">CareerWave Register</h1>
                <form onSubmit={handleSubmit} className="space-y-4">
                    {error && <p className="text-red-600 text-center font-medium border border-red-200 bg-red-50 p-2 rounded">{error}</p>}
                    {success && <p className="text-green-600 text-center font-medium border border-green-200 bg-green-50 p-2 rounded">{success}</p>}
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Email</label>
                        <input
                            type="email"
                            required
                            className="admin-input mt-1"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            disabled={isLoading}
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Password</label>
                        <input
                            type="password"
                            required
                            className="admin-input mt-1"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            disabled={isLoading}
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Confirm Password</label>
                        <input
                            type="password"
                            required
                            className="admin-input mt-1"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            disabled={isLoading}
                        />
                    </div>
                    <button
                        type="submit"
                        disabled={isLoading}
                        className="w-full px-6 py-4 text-xl font-black text-white bg-indigo-600 hover:bg-indigo-700 disabled:bg-gray-400 disabled:cursor-not-allowed rounded-xl shadow-2xl border-4 border-indigo-900 hover:scale-105 transform transition-all duration-300"
                    >
                        {isLoading ? 'Registering...' : 'Create Account'}
                    </button>
                </form>
                <p className="mt-6 text-center text-sm text-gray-600">
                    Already have an account? <Link to="/login" className="admin-link">Login here</Link>
                </p>
            </div>
        </div>
    );
};

export default Register;