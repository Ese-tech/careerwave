import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import { Layout } from './components/layout';
import Home from './pages/Home';
import LoginPage from './pages/Auth/LoginPage';
import { RegisterPage } from './pages/Auth/RegisterPage';
import AdminDashboard from './pages/Admin/AdminDashboard';
import EmployerDashboard from './pages/Employer/EmployerDashboard';
import CandidateDashboard from './pages/Candidate/CandidateDashboard';
import JobSearchPage from './pages/Jobs/JobSearchPage';
import JobDetailPage from './pages/Jobs/JobDetailPage';
import AdminRoute from './routes/AdminRoute';
import EmployerRoute from './routes/EmployerRoute';
import CandidateRoute from './routes/CandidateRoute';
import ForbiddenPage from './pages/Errors/ForbiddenPage';
import { useAuthStore } from './store/authStore';
import './i18n'; // Initialize i18n

function App() {
  const { user } = useAuthStore();

  return (
    <ThemeProvider>
      <Router>
        <Routes>
          {/* Auth Routes */}
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          
          {/* Dashboard Route - Role based redirect */}
          <Route path="/dashboard" element={
            !user ? <Navigate to="/login" replace /> :
            user.role === 'admin' ? <Navigate to="/admin/dashboard" replace /> :
            user.role === 'employer' ? <Navigate to="/employer/dashboard" replace /> :
            <Navigate to="/candidate/dashboard" replace />
          } />
          
          {/* Admin Routes */}
          <Route path="/admin/*" element={
            <AdminRoute>
              <Routes>
                <Route path="dashboard" element={<AdminDashboard />} />
                <Route path="*" element={<Navigate to="/admin/dashboard" replace />} />
              </Routes>
            </AdminRoute>
          } />
          
          {/* Candidate Dashboard */}
          <Route path="/candidate/*" element={
            <CandidateRoute>
              <Routes>
                <Route path="dashboard" element={<CandidateDashboard />} />
                <Route path="*" element={<Navigate to="/candidate/dashboard" replace />} />
              </Routes>
            </CandidateRoute>
          } />
          
          {/* Employer Dashboard */}
          <Route path="/employer/*" element={
            <EmployerRoute>
              <Routes>
                <Route path="dashboard" element={<EmployerDashboard />} />
                <Route path="*" element={<Navigate to="/employer/dashboard" replace />} />
              </Routes>
            </EmployerRoute>
          } />
          
          {/* Public Routes */}
          <Route path="/*" element={
            <Layout>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/jobs" element={<JobSearchPage />} />
                <Route path="/jobs/:hashId" element={<JobDetailPage />} />
                <Route path="/companies" element={<div className="p-8"><h1 className="text-2xl font-bold">Companies Page - Coming Soon</h1></div>} />
                <Route path="/about" element={<div className="p-8"><h1 className="text-2xl font-bold">About Page - Coming Soon</h1></div>} />
                <Route path="/forbidden" element={<ForbiddenPage />} />
              </Routes>
            </Layout>
          } />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;