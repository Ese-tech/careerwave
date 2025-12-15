// frontend/src/pages/Auth/LoginPage.tsx
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Card } from '../../components/ui/Card';
import { Input } from '../../components/ui/Input';
import { Button } from '../../components/ui/Button';
import { useAuthStore } from '../../store/authStore';

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const { login, isLoading, error } = useAuthStore();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await login(email, password);
      navigate('/dashboard');
    } catch (error) {
      // Error is handled by the store
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <Card className="w-full max-w-md p-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">CareerWave</h1>
          <h2 className="text-xl font-semibold mt-2 mb-2">Anmelden</h2>
          <p className="text-gray-600">Bei Ihrem Konto anmelden</p>
          
          {/* Demo Credentials Info */}
          <div className="mt-4 p-3 bg-blue-50 rounded-lg text-sm">
            <p className="text-blue-800 font-medium">Verfügbare Testkonten:</p>
            <p className="text-blue-600">Email: eve@careerwave.de | Passwort: Test123</p>
            <p className="text-blue-600">Email: demo@careerwave.com | Passwort: demo123</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              E-Mail
            </label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="ihre.email@beispiel.com"
              required
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Passwort
            </label>
            <div className="relative">
              <Input
                id="password"
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Ihr Passwort"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 pr-3 flex items-center"
              >
                {showPassword ? '🙈' : '👁️'}
              </button>
            </div>
          </div>

          {error && (
            <div className="text-red-600 text-sm bg-red-50 p-3 rounded">
              {error}
            </div>
          )}

          <Button
            type="submit"
            disabled={isLoading}
            className="w-full"
          >
            {isLoading ? 'Anmelden...' : 'Anmelden'}
          </Button>

          <div className="text-center">
            <p className="text-sm text-gray-600">
              Noch kein Konto?{' '}
              <Link to="/register" className="text-blue-600 hover:underline">
                Hier registrieren
              </Link>
            </p>
          </div>
        </form>
      </Card>
    </div>
  );
};

export default LoginPage;