// frontend/src/pages/Auth/RegisterPage.tsx
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useNavigate } from 'react-router-dom';
import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/outline';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { Card } from '../../components/ui/Card';
import { useAuthStore } from '../../store/authStore';
import { authService } from '../../services/auth';

export function RegisterPage() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { setLoading } = useAuthStore();

  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    displayName: '',
    role: 'candidate' as 'candidate' | 'employer'
  });
  
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.email) {
      newErrors.email = t('auth.errors.emailRequired');
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = t('auth.errors.emailInvalid');
    }

    if (!formData.password) {
      newErrors.password = t('auth.errors.passwordRequired');
    } else if (formData.password.length < 6) {
      newErrors.password = t('auth.errors.passwordTooShort');
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = t('auth.errors.confirmPasswordRequired');
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = t('auth.errors.passwordMismatch');
    }

    if (!formData.displayName) {
      newErrors.displayName = t('auth.errors.displayNameRequired');
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    setLoading(true);

    try {
      const response = await authService.register({
        email: formData.email,
        password: formData.password,
        name: formData.displayName,
        role: formData.role,
        ...(formData.role === 'employer' && { company: formData.displayName }) // Use displayName as company name for now
      });

      if (response.success) {
        navigate('/login', {
          state: {
            message: t('auth.register.success'),
            email: formData.email
          }
        });
      } else {
        setErrors({ general: response.error || t('auth.errors.registrationFailed') });
      }
    } catch (error) {
      setErrors({ general: t('auth.errors.networkError') });
    } finally {
      setIsSubmitting(false);
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-slate-900 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        {/* Header */}
        <div className="text-center">
          <Link to="/" className="flex justify-center items-center space-x-2 mb-6">
            <div className="w-10 h-10 bg-linear-to-r from-primary-500 to-secondary-500 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-xl">C</span>
            </div>
            <span className="font-bold text-2xl text-gray-900 dark:text-white">
              {t('common.appName')}
            </span>
          </Link>
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
            {t('auth.register.title')}
          </h2>
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
            {t('auth.register.subtitle')}
          </p>
        </div>

        {/* Form */}
        <Card className="p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* General Error */}
            {errors.general && (
              <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-400 px-4 py-3 rounded-md text-sm">
                {errors.general}
              </div>
            )}

            {/* Display Name */}
            <Input
              label={t('auth.fields.displayName')}
              type="text"
              value={formData.displayName}
              onChange={(e) => handleInputChange('displayName', e.target.value)}
              error={errors.displayName}
              placeholder={t('auth.placeholders.displayName')}
              required
              disabled={isSubmitting}
            />

            {/* Email */}
            <Input
              label={t('auth.fields.email')}
              type="email"
              value={formData.email}
              onChange={(e) => handleInputChange('email', e.target.value)}
              error={errors.email}
              placeholder={t('auth.placeholders.email')}
              required
              disabled={isSubmitting}
            />

            {/* Password */}
            <div className="relative">
              <Input
                label={t('auth.fields.password')}
                type={showPassword ? 'text' : 'password'}
                value={formData.password}
                onChange={(e) => handleInputChange('password', e.target.value)}
                error={errors.password}
                placeholder={t('auth.placeholders.password')}
                required
                disabled={isSubmitting}
              />
              <button
                type="button"
                className="absolute right-3 top-9 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <EyeSlashIcon className="h-5 w-5" />
                ) : (
                  <EyeIcon className="h-5 w-5" />
                )}
              </button>
            </div>

            {/* Confirm Password */}
            <div className="relative">
              <Input
                label={t('auth.fields.confirmPassword')}
                type={showConfirmPassword ? 'text' : 'password'}
                value={formData.confirmPassword}
                onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                error={errors.confirmPassword}
                placeholder={t('auth.placeholders.confirmPassword')}
                required
                disabled={isSubmitting}
              />
              <button
                type="button"
                className="absolute right-3 top-9 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                {showConfirmPassword ? (
                  <EyeSlashIcon className="h-5 w-5" />
                ) : (
                  <EyeIcon className="h-5 w-5" />
                )}
              </button>
            </div>

            {/* Role Selection */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                {t('auth.fields.accountType')}
              </label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => handleInputChange('role', 'candidate')}
                  disabled={isSubmitting}
                  className={`p-4 rounded-lg border-2 text-left transition-colors ${
                    formData.role === 'candidate'
                      ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/20'
                      : 'border-gray-200 dark:border-slate-600 hover:border-gray-300 dark:hover:border-slate-500'
                  } ${isSubmitting ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
                >
                  <div className="font-medium text-gray-900 dark:text-white">
                    {t('auth.roles.candidate.title')}
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                    {t('auth.roles.candidate.description')}
                  </div>
                </button>

                <button
                  type="button"
                  onClick={() => handleInputChange('role', 'employer')}
                  disabled={isSubmitting}
                  className={`p-4 rounded-lg border-2 text-left transition-colors ${
                    formData.role === 'employer'
                      ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/20'
                      : 'border-gray-200 dark:border-slate-600 hover:border-gray-300 dark:hover:border-slate-500'
                  } ${isSubmitting ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
                >
                  <div className="font-medium text-gray-900 dark:text-white">
                    {t('auth.roles.employer.title')}
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                    {t('auth.roles.employer.description')}
                  </div>
                </button>
              </div>
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              className="w-full"
              size="lg"
              disabled={isSubmitting}
            >
              {isSubmitting ? t('common.loading') : t('auth.register.button')}
            </Button>

            {/* Terms */}
            <p className="text-xs text-gray-600 dark:text-gray-400 text-center">
              {t('auth.register.terms.text')}{' '}
              <Link to="/terms" className="text-primary-600 hover:text-primary-700 dark:text-primary-400">
                {t('auth.register.terms.termsLink')}
              </Link>{' '}
              {t('auth.register.terms.and')}{' '}
              <Link to="/privacy" className="text-primary-600 hover:text-primary-700 dark:text-primary-400">
                {t('auth.register.terms.privacyLink')}
              </Link>
            </p>
          </form>
        </Card>

        {/* Sign In Link */}
        <div className="text-center">
          <p className="text-sm text-gray-600 dark:text-gray-400">
            {t('auth.register.haveAccount')}{' '}
            <Link 
              to="/login" 
              className="font-medium text-primary-600 hover:text-primary-700 dark:text-primary-400"
            >
              {t('auth.register.signInLink')}
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default RegisterPage;