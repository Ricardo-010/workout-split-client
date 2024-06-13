import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "./modules/auth/hooks/authProvider";

/**
 * PrivateRoute component is used to protect routes that require authentication.
 *
 * This component checks if the user is authenticated by verifying that user has a token.
 * If the user is not authenticated, it redirects to the login page.
 * Otherwise, it renders the protected child routes (outlet).
 *
 * @returns {ReactNode} The PrivateRoute component.
 */
export default function PrivateRoute() {
  const user = useAuth();
  if (!user.token) {
    return <Navigate to="/login" />;
  }

  return <Outlet />;
}
