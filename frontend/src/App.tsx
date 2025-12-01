import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import { Layout } from './components/layout';
import { HomePage } from './pages/HomePage';
import { LoginPage } from './pages/LoginPage';
import { RegisterPage } from './pages/Auth/RegisterPage';
import './i18n'; // Initialize i18n

function App() {
  return (
    <ThemeProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/*" element={
            <Layout>
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/jobs" element={<div className="p-8"><h1 className="text-2xl font-bold">Jobs Page - Coming Soon</h1></div>} />
                <Route path="/companies" element={<div className="p-8"><h1 className="text-2xl font-bold">Companies Page - Coming Soon</h1></div>} />
                <Route path="/about" element={<div className="p-8"><h1 className="text-2xl font-bold">About Page - Coming Soon</h1></div>} />
              </Routes>
            </Layout>
          } />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;