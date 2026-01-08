import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import { Layout } from './components/layout';
import Home from './pages/Home';
import LoginPage from './pages/Auth/LoginPage';
import { RegisterPage } from './pages/Auth/RegisterPage';
import AdminDashboard from './pages/Admin/AdminDashboard';
import EmployerDashboard from './pages/Employer/EmployerDashboard';
import EmployerJobs from './pages/Employer/EmployerJobs';
import CreateJob from './pages/Employer/CreateJob';
import EmployerApplications from './pages/Employer/EmployerApplications';
import CandidateDashboard from './pages/Candidate/CandidateDashboard';
import CandidateApplications from './pages/Candidate/CandidateApplications';
import JobSearchPage from './pages/Jobs/JobSearchPage';
import JobDetailPage from './pages/Jobs/JobDetailPage';
import Applications from './pages/Applications';
import Profile from './pages/Profile';
import Settings from './pages/Settings';
import CareerTips from './pages/CareerTips';
import PostJob from './pages/PostJob';
import FindCandidates from './pages/FindCandidates';
import Pricing from './pages/Pricing';
import CompanyProfile from './pages/CompanyProfile';
import Help from './pages/Help';
import Contact from './pages/Contact';
import FAQ from './pages/FAQ';
import Community from './pages/Community';
import About from './pages/About';
import Blog from './pages/Blog';
import Careers from './pages/Careers';
import Press from './pages/Press';
import Privacy from './pages/Privacy';
import Terms from './pages/Terms';
import Imprint from './pages/Imprint';
import Cookies from './pages/Cookies';
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
                <Route path="applications" element={<CandidateApplications />} />
                <Route path="profile" element={<Profile />} />
                <Route path="*" element={<Navigate to="/candidate/dashboard" replace />} />
              </Routes>
            </CandidateRoute>
          } />
          
          {/* Employer Dashboard */}
          <Route path="/employer/*" element={
            <EmployerRoute>
              <Routes>
                <Route path="dashboard" element={<EmployerDashboard />} />
                <Route path="jobs" element={<EmployerJobs />} />
                <Route path="jobs/create" element={<CreateJob />} />
                <Route path="jobs/:jobId/edit" element={<CreateJob />} />
                <Route path="jobs/:jobId/applications" element={<EmployerApplications />} />
                <Route path="applications" element={<EmployerApplications />} />
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
                <Route path="/applications" element={<Applications />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/settings" element={<Settings />} />
                <Route path="/career-tips" element={<CareerTips />} />
                <Route path="/post-job" element={<PostJob />} />
                <Route path="/find-candidates" element={<FindCandidates />} />
                <Route path="/pricing" element={<Pricing />} />
                <Route path="/company-profile" element={<CompanyProfile />} />
                <Route path="/help" element={<Help />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/faq" element={<FAQ />} />
                <Route path="/community" element={<Community />} />
                <Route path="/about" element={<About />} />
                <Route path="/blog" element={<Blog />} />
                <Route path="/careers" element={<Careers />} />
                <Route path="/press" element={<Press />} />
                <Route path="/privacy" element={<Privacy />} />
                <Route path="/terms" element={<Terms />} />
                <Route path="/imprint" element={<Imprint />} />
                <Route path="/cookies" element={<Cookies />} />
                <Route path="/companies" element={<CompanyProfile />} />
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