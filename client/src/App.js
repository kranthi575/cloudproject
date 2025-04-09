import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import OwnerAuth from './components/Auth/OwnerAuth';
import CustomerAuth from './components/Auth/CustomerAuth';
import OwnerDashboard from './pages/OwnerDashboard';
import CustomerDashboard from './pages/CustomerDashboard';
import RequireAuth from './components/Auth/RequireAuth';

function App() {
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<HomePage />} />
        <Route path="/owner/auth" element={<OwnerAuth />} />
        <Route path="/customer/auth" element={<CustomerAuth />} />

        {/* Protected Owner Dashboard */}
        <Route
          path="/owner/dashboard"
          element={
            <RequireAuth role="owner">
              <OwnerDashboard />
            </RequireAuth>
          }
        />

        {/* Protected Customer Dashboard */}
        <Route
          path="/customer/dashboard"
          element={
            <RequireAuth role="customer">
              <CustomerDashboard />
            </RequireAuth>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
