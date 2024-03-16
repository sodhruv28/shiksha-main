// AdminProtected.js
import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../../context/AuthContext";
import Loader1 from "../../components/loaders/Loader1";

function AdminProtected({ children }) {
  const { authenticated, setAuthenticated, userInfo, setUserInfo } = useAuth();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuthentication = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8080/api/user/authenticate",
          { withCredentials: true }
        );
        const { authenticated, user } = response.data;
        setAuthenticated(authenticated);
        setUserInfo(user);
        setLoading(false);
      } catch (error) {
        setAuthenticated(false);
        setLoading(false);
      }
    };

    checkAuthentication();
  }, [setAuthenticated, setUserInfo]);

  if (loading) {
    return <Loader1 />;
  }

  // Pass the userInfo as a prop to the children component
  return authenticated && (userInfo.role === "admin" || userInfo.role === "sub-admin" || userInfo.role === "instructor") ? (
    React.cloneElement(children, { userInfo, setAuthenticated })
  ) : (
    <Navigate to="/" replace />
  );
}

export default AdminProtected;
