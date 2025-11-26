// frontend/src/pages/Admin/Settings.tsx

import React, { useState } from 'react';
import { useAdminGuard } from '../../hooks/useAdmin';
import AdminLayout from '../../layouts/AdminLayout';

function AdminSettings() {
    useAdminGuard();

    // Example state for settings
    const [siteName, setSiteName] = useState('CareerWave');
    const [adminEmail, setAdminEmail] = useState('admin@example.com');
    const [maintenanceMode, setMaintenanceMode] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // TODO: Save settings to backend
        alert('Settings saved!');
    };

    return (
        <AdminLayout>
            <h1 className="text-2xl font-bold mb-4">Admin Settings</h1>
            <form onSubmit={handleSubmit} className="space-y-6 max-w-lg">
                <div>
                    <label className="block font-medium mb-1">Site Name</label>
                    <input
                        type="text"
                        className="border rounded px-3 py-2 w-full"
                        value={siteName}
                        onChange={e => setSiteName(e.target.value)}
                    />
                </div>
                <div>
                    <label className="block font-medium mb-1">Admin Email</label>
                    <input
                        type="email"
                        className="border rounded px-3 py-2 w-full"
                        value={adminEmail}
                        onChange={e => setAdminEmail(e.target.value)}
                    />
                </div>
                <div className="flex items-center">
                    <input
                        type="checkbox"
                        id="maintenance"
                        checked={maintenanceMode}
                        onChange={e => setMaintenanceMode(e.target.checked)}
                        className="mr-2"
                    />
                    <label htmlFor="maintenance" className="font-medium">
                        Enable Maintenance Mode
                    </label>
                </div>
                <button
                    type="submit"
                    className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                >
                    Save Settings
                </button>
            </form>
        </AdminLayout>
    );
}

export default AdminSettings;

