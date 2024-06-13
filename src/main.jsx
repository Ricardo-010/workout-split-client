import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import AuthProvider from "./modules/auth/hooks/authProvider";
import LoginPage from "./pages/Login.jsx";
import RegisterPage from "./pages/Register.jsx";
import Home from "./pages/Home.jsx";
import SettingsPage from "./pages/Settings.jsx";
import PrivateRoute from "./privateRoutes.jsx";

/**
 * Main entry point for the app.
 *
 * This component wraps the application with:
 *   Router for handling routing
 *   AuthProvider for managing authentication
 *
 * The Routes:
 *   /login: is a public route
 *   /register: is a public route
 *   /: gets redirected to /home
 *   /home: is a private route
 *   /settings: is a private route
 */
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <React.StrictMode>
      <Router>
        <AuthProvider>
          <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route element={<PrivateRoute />}>
              <Route path="/" element={<Navigate to='/home' />} />
              <Route path="/home" element={<Home />} />
              <Route path="/settings" element={<SettingsPage />} />
            </Route>
          </Routes>
        </AuthProvider>
      </Router>
    </React.StrictMode>
  </React.StrictMode>
);
