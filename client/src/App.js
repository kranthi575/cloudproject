import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import OwnerAuth from './components/Auth/OwnerAuth';
import CustomerAuth from './components/Auth/CustomerAuth';
import OwnerDashboard from './pages/OwnerDashboard';
import CustomerDashboard from './pages/CustomerDashboard';
import { AuthProvider } from './components/Auth/contexts/AuthContext';

function App() {
  return (
    <AuthProvider>    
      <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/owner/auth" element={<OwnerAuth />} />
        <Route path="/customer/auth" element={<CustomerAuth />} />
        <Route path="/owner/dashboard" element={<OwnerDashboard />} />
        <Route path="/customer/dashboard" element={<CustomerDashboard />} />
      </Routes>
    </Router>
    </AuthProvider>

  );
}

export default App;