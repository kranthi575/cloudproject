// src/components/Auth/RequireAuth.jsx
import { useAuth } from 'react-oidc-context';
import { Navigate } from 'react-router-dom';

export default function RequireAuth({ children, role }) {
  const auth = useAuth();

  if (auth.isLoading) return <div>Loading...</div>;
  if (auth.error) return <div>Error: {auth.error.message}</div>;

  if (!auth.isAuthenticated) return <Navigate to="/" replace />;

  const email = auth.user?.profile?.email || "";

  const isOwner = email.includes("owner");
  const isCustomer = email.includes("customer");

  if (
    (role === "owner" && !isOwner) ||
    (role === "customer" && !isCustomer)
  ) {
    return <Navigate to="/" replace />;
  }

  return children;
}
