// frontend/src/pages/Home.tsx

import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useAuthStore } from '../store/authStore';
import { BriefcaseIcon, UserGroupIcon, ChartBarIcon, SparklesIcon } from '@heroicons/react/24/outline';

const Home: React.FC = () => {
    const { t } = useTranslation();
    const { user, logout } = useAuthStore();

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
            {/* Hero Section */}
            <div className="relative overflow-hidden">
                {/* Background Pattern */}
                <div className="absolute inset-0 bg-grid-slate-100 [mask-image:linear-gradient(0deg,white,rgba(255,255,255,0.6))] -z-10"></div>
                
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16 text-center">
                    {/* Logo/Brand */}
                    <div className="flex justify-center mb-8">
                        <div className="inline-flex items-center space-x-3 bg-white rounded-2xl px-6 py-3 shadow-lg">
                            <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                                <BriefcaseIcon className="w-6 h-6 text-white" />
                            </div>
                            <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                                {t('home.brand')}
                            </span>
                        </div>
                    </div>

                    {user ? (
                        // Logged In View
                        <div className="space-y-8">
                            <div className="bg-white rounded-2xl shadow-xl p-8 max-w-2xl mx-auto">
                                <div className="flex items-center justify-center space-x-3 mb-4">
                                    <div className="w-12 h-12 bg-gradient-to-br from-green-400 to-blue-500 rounded-full flex items-center justify-center">
                                        <span className="text-white text-xl font-bold">
                                            {(user.firstName?.charAt(0) || user.name?.charAt(0) || user.email?.charAt(0))?.toUpperCase()}
                                        </span>
                                    </div>
                                    <div className="text-left">
                                        <p className="text-sm text-gray-500">{t('home.loggedIn.welcome')}</p>
                                        <p className="text-lg font-semibold text-gray-900">
                                            {user.firstName && user.lastName ? `${user.firstName} ${user.lastName}` : user.firstName || user.name || user.email}
                                        </p>
                                    </div>
                                </div>
                                <span className="inline-block px-4 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium">
                                    {user.role === 'admin' ? t('home.loggedIn.roles.admin') : user.role === 'employer' ? t('home.loggedIn.roles.employer') : t('home.loggedIn.roles.candidate')}
                                </span>
                            </div>

                            <div className="flex flex-wrap justify-center gap-4 max-w-4xl mx-auto">
                                <Link 
                                    to="/jobs" 
                                    className="group relative bg-white hover:bg-gradient-to-br hover:from-blue-50 hover:to-blue-100 rounded-xl p-6 shadow-md hover:shadow-xl transition-all duration-300 border-2 border-transparent hover:border-blue-300 w-full sm:w-72"
                                >
                                    <BriefcaseIcon className="w-8 h-8 text-blue-600 mb-3 group-hover:scale-110 transition-transform" />
                                    <h3 className="text-lg font-bold text-gray-900 mb-1">{t('home.loggedIn.quickLinks.jobs.title')}</h3>
                                    <p className="text-sm text-gray-600">{t('home.loggedIn.quickLinks.jobs.description')}</p>
                                </Link>

                                {user.role === 'admin' && (
                                    <Link 
                                        to="/admin" 
                                        className="group relative bg-white hover:bg-gradient-to-br hover:from-purple-50 hover:to-purple-100 rounded-xl p-6 shadow-md hover:shadow-xl transition-all duration-300 border-2 border-transparent hover:border-purple-300 w-full sm:w-72"
                                    >
                                        <ChartBarIcon className="w-8 h-8 text-purple-600 mb-3 group-hover:scale-110 transition-transform" />
                                        <h3 className="text-lg font-bold text-gray-900 mb-1">{t('home.loggedIn.quickLinks.adminPanel.title')}</h3>
                                        <p className="text-sm text-gray-600">{t('home.loggedIn.quickLinks.adminPanel.description')}</p>
                                    </Link>
                                )}

                                <button 
                                    onClick={logout}
                                    className="group relative bg-white hover:bg-gradient-to-br hover:from-red-50 hover:to-red-100 rounded-xl p-6 shadow-md hover:shadow-xl transition-all duration-300 border-2 border-transparent hover:border-red-300 w-full sm:w-72 text-left"
                                >
                                    <UserGroupIcon className="w-8 h-8 text-red-600 mb-3 group-hover:scale-110 transition-transform" />
                                    <h3 className="text-lg font-bold text-gray-900 mb-1">{t('home.loggedIn.quickLinks.logout.title')}</h3>
                                    <p className="text-sm text-gray-600">{t('home.loggedIn.quickLinks.logout.description')}</p>
                                </button>
                            </div>
                        </div>
                    ) : (
                        // Not Logged In View
                        <div className="space-y-8">
                            <div className="space-y-4">
                                <h1 className="text-5xl md:text-6xl font-bold text-gray-900 leading-tight">
                                    {t('home.hero.title')}
                                    <span className="block bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                                        {t('home.hero.titleHighlight')}
                                    </span>
                                </h1>
                                <p className="text-xl md:text-2xl text-gray-600 max-w-2xl mx-auto">
                                    {t('home.hero.subtitle')}
                                </p>
                            </div>

                            {/* CTA Buttons */}
                            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                                <Link 
                                    to="/login" 
                                    className="group relative inline-flex items-center justify-center px-8 py-4 text-lg font-semibold text-white bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl shadow-lg hover:shadow-2xl transform hover:scale-105 transition-all duration-300 min-w-[200px]"
                                >
                                    <span className="relative z-10">{t('home.auth.login')}</span>
                                    <div className="absolute inset-0 bg-gradient-to-r from-blue-700 to-purple-700 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
                                </Link>
                                <Link 
                                    to="/register" 
                                    className="inline-flex items-center justify-center px-8 py-4 text-lg font-semibold text-blue-600 bg-white border-2 border-blue-600 rounded-xl shadow-lg hover:shadow-2xl hover:bg-blue-50 transform hover:scale-105 transition-all duration-300 min-w-[200px]"
                                >
                                    {t('home.auth.register')}
                                </Link>
                            </div>
                        </div>
                    )}

                    {/* Features - Always visible */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto mt-16">
                        <Link 
                            to="/jobs"
                            className="bg-white rounded-xl p-6 shadow-md hover:shadow-xl transition-all cursor-pointer transform hover:scale-105"
                        >
                            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                                <BriefcaseIcon className="w-6 h-6 text-blue-600" />
                            </div>
                            <h3 className="text-lg font-bold text-gray-900 mb-2">{t('home.features.jobs.title')}</h3>
                            <p className="text-gray-600">{t('home.features.jobs.description')}</p>
                        </Link>
                        <Link 
                            to="/ai-assistant"
                            className="bg-white rounded-xl p-6 shadow-md hover:shadow-xl transition-all cursor-pointer transform hover:scale-105"
                        >
                            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                                <SparklesIcon className="w-6 h-6 text-purple-600" />
                            </div>
                            <h3 className="text-lg font-bold text-gray-900 mb-2">{t('home.features.ai.title')}</h3>
                            <p className="text-gray-600">{t('home.features.ai.description')}</p>
                        </Link>
                        <Link 
                            to="/contact"
                            className="bg-white rounded-xl p-6 shadow-md hover:shadow-xl transition-all cursor-pointer transform hover:scale-105"
                        >
                            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                                <UserGroupIcon className="w-6 h-6 text-green-600" />
                            </div>
                            <h3 className="text-lg font-bold text-gray-900 mb-2">{t('home.features.contact.title')}</h3>
                            <p className="text-gray-600">{t('home.features.contact.description')}</p>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Home;