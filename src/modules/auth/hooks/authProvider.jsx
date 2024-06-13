import { createContext, useContext, useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

// Provides authentication state and functions.
const AuthContext = createContext();

/**
 * This component manages the authentication state and provide context to all the pages within the app.
 *
 * @param {ReactNode} - The children components that are recieving the authentication context.
 * @returns {ReactNode} A react element that provides context to its children.
 */
export default function AuthProvider({ children }) {
  const [token, setToken] = useState(localStorage.getItem("token") || "");
  const navigate = useNavigate();
  const location = useLocation();

  // An effect that manages the token, this ensures that if there is no token, the local strorage removes any traces of token
  // but if the token is updated the token stored in local storage will also be updated.
  useEffect(() => {
    if (token) {
      localStorage.setItem("token", token);
    } else {
      localStorage.removeItem("token");
      console.log(location.pathname);
      if (location.pathname !== "/login" && location.pathname !== "/register") {
        navigate("/login");
      }
    }
  }, [token, navigate, location.pathname]);

  /**
   * Logs a user out of the app by setting the token to empty which triggers the effect
   *
   */
  const logout = () => {
    setToken("");
    navigate("/login");
  };

  return (
    <AuthContext.Provider value={{ token, setToken, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

// A hook to use the authContext
export const useAuth = () => {
  return useContext(AuthContext);
};
