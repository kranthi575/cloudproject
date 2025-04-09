import { useEffect } from 'react';
import { useAuth } from 'react-oidc-context';
import { useNavigate, Link } from 'react-router-dom';

export default function HomePage() {
  const auth = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (auth.isAuthenticated) {
      const email = auth.user?.profile?.email;
      if (email?.includes('owner')) {
        navigate('/owner/dashboard', { replace: true });
      } else {
        navigate('/customer/dashboard', { replace: true });
      }
    }
  }, [auth.isAuthenticated, auth.user, navigate]);

  if (auth.isLoading) {
    return <div className="text-center mt-10 text-gray-500">Checking authentication...</div>;
  }

  if (auth.isAuthenticated) return null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-white flex flex-col items-center justify-center px-4">
      <div className="bg-white p-10 rounded-2xl shadow-lg text-center max-w-md w-full">
        <h1 className="text-4xl font-extrabold text-blue-800 mb-2">Cloud Inventory System</h1>
        <p className="text-gray-600 text-lg mb-10">Please choose your role to continue</p>

        <div className="flex flex-col gap-5">
          <Link to="/owner/auth">
            <button className="w-full py-3 bg-blue-600 text-white font-semibold rounded-xl shadow hover:bg-blue-700 transition-all flex items-center justify-center gap-2">
              🛠️ I'm an Owner
            </button>
          </Link>
          <Link to="/customer/auth">
            <button className="w-full py-3 bg-green-600 text-white font-semibold rounded-xl shadow hover:bg-green-700 transition-all flex items-center justify-center gap-2">
              🛒 I'm a Customer
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
