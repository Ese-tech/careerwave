// frontend/src/App.tsx
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useTheme } from './hooks/useTheme';
import { useUserStore } from './store/userStore';

import AppRoutes from './routes/index';
import AdminRoute from './routes/AdminRoute';
import AdminDashboard from './pages/Admin/AdminDashboard';
import UsersAdmin from './pages/Admin/Users';
import EmployersAdmin from './pages/Admin/Employers';
import JobsAdmin from './pages/Admin/JobsAdmin';
import ApplicationsAdmin from './pages/Admin/ApplicationsAdmin';
import AnalyticsAdmin from './pages/Admin/Analytics';
import SettingsAdmin from './pages/Admin/Settings';
import Home from './pages/Home';
import Login from './pages/Auth/Login';
import Register from './pages/Auth/Register';
import Forbidden from './pages/Errors/Forbidden';
import NotFound from './pages/Errors/NotFound';
import JobsListings from './pages/Jobs/ JobsListings';
import JobDetails from './pages/Jobs/JobDetails';
import AdminLayout from './layouts/AdminLayout';


function App() {
  const { theme } = useTheme();
  // We use the useUserStore here just to ensure the token is loaded and the theme is applied
  useUserStore(state => state.user); 

  // Apply the theme class to the body/html for Tailwind dark mode
  const root = window.document.documentElement;
  root.classList.remove('light', 'dark');
  root.classList.add(theme);

  // Since the original routes/index.tsx contained JSX which is not standard for a router index,
  // I will define the routes directly in the main App component for clarity and React standard practice.

  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/jobs" element={<JobsListings />} />
        <Route path="/jobs/:id" element={<JobDetails />} />
        <Route path="/forbidden" element={<Forbidden />} />
        
        {/* Admin Routes with Guard */}
        <Route path="/admin" element={<AdminRoute children={<AdminLayout children={<AdminDashboard />} />} />}>
           {/* If you use nested routes in React Router v6, you typically define them without the parent path */}
           {/* But since the original layout wraps all children, we redefine the paths here: */}
        </Route>
        {/* Separate Admin paths protected by the guard, using the AdminLayout */}
        <Route path="/admin" element={<AdminRoute children={<AdminLayout children={<AdminDashboard />} />} />} />
        <Route path="/admin/users" element={<AdminRoute children={<AdminLayout children={<UsersAdmin />} />} />} />
        <Route path="/admin/employers" element={<AdminRoute children={<AdminLayout children={<EmployersAdmin />} />} />} />
        <Route path="/admin/jobs" element={<AdminRoute children={<AdminLayout children={<JobsAdmin />} />} />} />
        <Route path="/admin/applications" element={<AdminRoute children={<AdminLayout children={<ApplicationsAdmin />} />} />} />
        <Route path="/admin/analytics" element={<AdminRoute children={<AdminLayout children={<AnalyticsAdmin />} />} />} />
        <Route path="/admin/settings" element={<AdminRoute children={<AdminLayout children={<SettingsAdmin />} />} />} />

        {/* Catch-all route */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;