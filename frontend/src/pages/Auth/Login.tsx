// frontend/src/pages/Auth/Login.tsx
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useUserStore } from '../../store/userStore'; // Pfad scheint korrekt: ../../store/userStore
import { loginUser } from '../../api/auth'; // Pfad scheint korrekt: ../../api/auth
import { ADMIN_ROUTES } from '../../constants/admin'; // Pfad scheint korrekt: ../../constants/admin

// NOTE: In einer echten React-App mit Firebase müssten Sie das Firebase Client SDK
// für die tatsächliche Anmeldung und das Generieren des ID Tokens verwenden.
// Hier simulieren wir den Firebase-Client-Teil mit einem Mock-Handler.
const MOCK_FIREBASE_CLIENT_LOGIN = async (email: string, password: string): Promise<{ idToken: string, error?: string }> => {
    // **DIES IST EIN MOCK**
    // Simuliert, dass der Firebase Client sich anmeldet und einen Token zurückgibt.
    if (email === "admin@careerwave.com" && password === "admin123") {
        // Mock token. In real life, Firebase SDK gives you this after sign-in.
        return { idToken: "MOCK_FIREBASE_ID_TOKEN_ADMIN" };
    }
    if (password === "123456") {
        // Mock token for regular user (based on previous backend test)
        return { idToken: "MOCK_FIREBASE_ID_TOKEN_USER" };
    }
    return { idToken: "", error: "Invalid credentials (Mock)" };
};


const Login: React.FC = () => {
    const [email, setEmail] = useState('admin@careerwave.com');
    const [password, setPassword] = useState('admin123');
    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate();
    const setUser = useUserStore(state => state.setUser);
    const setLoading = useUserStore(state => state.setLoading);
    const isLoading = useUserStore(state => state.isLoading);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);
        setLoading(true);

        try {
            // 1. Firebase Client Login (Mocked here)
            const clientResult = await MOCK_FIREBASE_CLIENT_LOGIN(email, password);
            if (clientResult.error) {
                throw new Error(clientResult.error);
            }
            const idToken = clientResult.idToken;

            // 2. Exchange ID Token with our Backend for Profile/Role
            const userData = await loginUser(idToken);
            
            setUser({ 
                uid: userData.uid, 
                email: userData.email, 
                role: userData.role, 
                displayName: 'Admin User' 
            }, userData.token);

            // Navigate based on role
            if (userData.role === 'admin') {
                navigate(ADMIN_ROUTES.root);
            } else if (userData.role === 'employer') {
                navigate('/employer/dashboard');
            } else {
                navigate('/');
            }

        } catch (err: any) {
            console.error(err);
            setError(err.message || 'Login failed. Please try again.');
            setUser(null, null);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
            <div className="w-full max-w-md bg-white p-8 rounded-xl shadow-2xl">
                <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">CareerWave Login</h1>
                <form onSubmit={handleSubmit} className="space-y-4">
                    {error && <p className="text-red-600 text-center font-medium border border-red-200 bg-red-50 p-2 rounded">{error}</p>}
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
                    <button
                        type="submit"
                        className="w-full admin-button py-2 text-lg font-semibold"
                        disabled={isLoading}
                    >
                        {isLoading ? 'Logging In...' : 'Login'}
                    </button>
                </form>
                <p className="mt-6 text-center text-sm text-gray-600">
                    Don't have an account? <Link to="/register" className="admin-link">Register here</Link>
                </p>
                <div className="mt-4 p-3 bg-gray-100 rounded text-xs text-gray-600">
                    <p>Demo Credentials:</p>
                    <p>Admin: <strong>admin@careerwave.com</strong> / <strong>admin123</strong></p>
                </div>
            </div>
        </div>
    );
};

export default Login;