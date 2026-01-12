// frontend/src/pages/Admin/Settings.tsx

import React, { useState, useEffect } from 'react';
import { useAdminGuard } from '../../hooks/useAdmin';
import AdminLayout from '../../layouts/AdminLayout';
import { Toast, Spinner } from '../../components/ui';
import { useToast } from '../../hooks/useToast';
import { api } from '../../services/api';

function AdminSettings() {
    useAdminGuard();
    const { toasts, success, error: showError, hideToast } = useToast();

    const [loading, setLoading] = useState(false);
    const [fetchingSettings, setFetchingSettings] = useState(true);
    const [siteName, setSiteName] = useState('CareerWave');
    const [adminEmail, setAdminEmail] = useState('admin@example.com');
    const [maintenanceMode, setMaintenanceMode] = useState(false);

    // Fetch current settings on mount
    useEffect(() => {
        const fetchSettings = async () => {
            try {
                setFetchingSettings(true);
                const response = await api.get('/settings');
                if (response.success && response.settings) {
                    setSiteName(response.settings.siteName || 'CareerWave');
                    setAdminEmail(response.settings.adminEmail || 'admin@example.com');
                    setMaintenanceMode(response.settings.maintenanceMode || false);
                }
            } catch (err) {
                const message = err instanceof Error ? err.message : 'Failed to fetch settings';
                showError(message);
            } finally {
                setFetchingSettings(false);
            }
        };
        fetchSettings();
    }, [showError]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        
        try {
            setLoading(true);
            const response = await api.put('/settings', {
                siteName,
                adminEmail,
                maintenanceMode
            });
            
            if (response.success) {
                success('Settings saved successfully!');
            } else {
                showError(response.error || 'Failed to save settings');
            }
        } catch (err) {
            const message = err instanceof Error ? err.message : 'Failed to save settings';
            showError(message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <AdminLayout>
            <h1 className="text-2xl font-bold mb-4">Admin Settings</h1>
            
            {toasts.map(toast => (
                <Toast key={toast.id} {...toast} onClose={() => hideToast(toast.id)} />
            ))}
            
            {fetchingSettings ? (
                <Spinner fullScreen={false} size="lg" label="Loading settings..." />
            ) : (
                <form onSubmit={handleSubmit} className="space-y-6 max-w-lg">
                <div>
                    <label className="block font-medium mb-1">Site Name</label>
                    <input
                        type="text"
                        className="border rounded px-3 py-2 w-full dark:bg-gray-800 dark:border-gray-600 dark:text-white"
                        value={siteName}
                        onChange={e => setSiteName(e.target.value)}
                        disabled={loading}
                    />
                </div>
                <div>
                    <label className="block font-medium mb-1">Admin Email</label>
                    <input
                        type="email"
                        className="border rounded px-3 py-2 w-full dark:bg-gray-800 dark:border-gray-600 dark:text-white"
                        value={adminEmail}
                        onChange={e => setAdminEmail(e.target.value)}
                        disabled={loading}
                    />
                </div>
                <div className="flex items-center">
                    <input
                        type="checkbox"
                        id="maintenance"
                        checked={maintenanceMode}
                        onChange={e => setMaintenanceMode(e.target.checked)}
                        className="mr-2"
                        disabled={loading}
                    />
                    <label htmlFor="maintenance" className="font-medium">
                        Enable Maintenance Mode
                    </label>
                </div>
                <button
                    type="submit"
                    className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                    disabled={loading}
                >
                    {loading && <Spinner size="sm" color="white" />}
                    Save Settings
                </button>
                </form>
            )}
        </AdminLayout>
    );
}

export default AdminSettings;

