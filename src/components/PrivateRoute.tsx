// components/PrivateRoute.tsx
import React from "react";
import { Navigate } from "react-router-dom";
import { AuthService } from "../services/AuthService";

interface PrivateRouteProps {
  children: React.ReactNode;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ children }) => {
  const loggedIn = AuthService.isLoggedIn();

  if (!loggedIn) {
    // Not logged in, redirect to login
    return <Navigate to="/login" replace />;
  }

  // Logged in, render children
  return <>{children}</>;
};

export default PrivateRoute;
