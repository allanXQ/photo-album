import React from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import NavigationBar from "../navigation/NavigationBar";

const ProtectedRoute = () => {
  const { user } = useAuth();
  const location = useLocation();

  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return (
    <>
      <NavigationBar />
      <Outlet />;
    </>
  );
};

export default ProtectedRoute;
