import { useEffect } from "react";
import { useAuth } from "react-oidc-context";
import { useNavigate } from "react-router-dom";

export default function OwnerAuth() {
  const auth = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (auth.isAuthenticated) {
      const email = auth.user?.profile?.email;

      // Owner email check (you can adjust this logic)
      if (email?.includes("owner")) {
        navigate("/owner/dashboard");
      } else {
        navigate("/customer/dashboard");
      }
    } else {
      auth.signinRedirect();
    }
  }, [auth.isAuthenticated]);

  return <div className="text-center mt-12">Redirecting to login...</div>;
}
