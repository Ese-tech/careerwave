//frontend/src/routes/index.tsx

import { Routes, Route } from 'react-router-dom';
import AdminLayout from '../layouts/AdminLayout';
import AdminDashboard from '../pages/Admin/AdminDashboard';
import Users from '../pages/Admin/Users';
import Employers from '../pages/Admin/Employers';
import JobsAdmin from '../pages/Admin/JobsAdmin';
import ApplicationsAdmin from '../pages/Admin/ApplicationsAdmin';
import Analytics from '../pages/Admin/Analytics';
import Settings from '../pages/Admin/Settings';
import Forbidden from '../pages/Errors/Forbidden';
import NotFound from '../pages/Errors/NotFound';
import Home from '../pages/Home';
import Login from '../pages/Auth/Login';
import Register from '../pages/Auth/Register';
import JobListings from '../pages/Jobs/ JobsListings';
import JobDetails from '../pages/Jobs/JobDetails';

<Routes>
    <Route path="/" element={<Home />} />
    <Route path="/login" element={<Login />} />
    <Route path="/register" element={<Register />} />
    <Route path="/jobs" element={<JobListings />} />
    <Route path="/jobs/:id" element={<JobDetails />} />

    <Route path="/admin" element={<AdminLayout children={undefined} />}>
        <Route index element={<AdminDashboard />} />
        <Route path="users" element={<Users />} />
        <Route path="employers" element={<Employers />} />
        <Route path="jobs" element={<JobsAdmin />} />
        <Route path="applications" element={<ApplicationsAdmin />} />
        <Route path="analytics" element={<Analytics />} />
        <Route path="settings" element={<Settings />} />
    </Route>

    <Route path="/forbidden" element={<Forbidden />} />
    <Route path="*" element={<NotFound />} />   
    
</Routes>