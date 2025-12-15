// frontend/src/pages/Errors/ForbiddenPage.tsx
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { Layout } from '../../components/layout';

const ForbiddenPage: React.FC = () => {
  const { t } = useTranslation();

  return (
    <Layout>
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="max-w-md w-full text-center">
          <div className="mb-8">
            <h1 className="text-6xl font-bold text-red-500 mb-4">403</h1>
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              Access Forbidden
            </h2>
            <p className="text-gray-600 mb-8">
              You don't have permission to access this page.
            </p>
            <div className="space-y-4">
              <Link 
                to="/"
                className="inline-block bg-teal-600 text-white px-6 py-3 rounded-lg hover:bg-teal-700 transition-colors"
              >
                Go Home
              </Link>
              <br />
              <Link 
                to="/login"
                className="inline-block text-teal-600 hover:text-teal-800 underline"
              >
                Login with different account
              </Link>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ForbiddenPage;