// ProtectedRoute.js
import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Loader1 from "../components/loaders/Loader1";

function ProtectedRoute({ children }) {
  const { authenticated, userInfo, authLoading, setAuthenticated } = useAuth();
  
  if (authLoading) {
    return <Loader1></Loader1>;
  }

  // Pass the userInfo as a prop to the children component
  return authenticated ? (
    React.cloneElement(children, { userInfo, setAuthenticated })
  ) : (
    <Navigate to="/login" replace />
  );
}

export default ProtectedRoute;
