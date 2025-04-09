import { AuthProvider as OidcProvider } from "react-oidc-context";

const oidcConfig = {
  authority: "https://<your-cognito-domain>.auth.<region>.amazoncognito.com",
  client_id: "69bg4o27r1vr87hh8cgi0p4ckm",
  redirect_uri: window.location.origin,
  response_type: "code",
  scope: "openid profile email",
};

export default function AuthProvider({ children }) {
  return <OidcProvider {...oidcConfig}>{children}</OidcProvider>;
}
