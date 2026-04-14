import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

// Create an AuthContext
const AuthContext = createContext();

// Create a custom hook for using the AuthContext
export function useAuth() {
  return useContext(AuthContext);
}

// AuthProvider component to wrap your entire application
export function AuthProvider({ children }) {
  const [authenticated, setAuthenticated] = useState(false);
  const [userInfo, setUserInfo] = useState(null);
  const [cartItems, setCartItems] = useState([]);
  const [authLoading, setAuthLoading] = useState(true);
  useEffect(() => {
    const checkAuthentication = async () => {
      try {
        setAuthLoading(true);
        const result = await axios.get(
          "/api/user/authenticate",
          { withCredentials: true }
        );
        setAuthenticated(result.data.authenticated);
        setUserInfo(result.data.user);
        setAuthLoading(false);
      } catch (error) {
        setAuthenticated(false);
        setUserInfo(null);
        setAuthLoading(false);
      }
    };

    checkAuthentication();
  }, []);
  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const response = await axios.get(
          "/api/cart/fetch-cartItems",
          { withCredentials: true }
        );
        setCartItems(response.data.cartItems || []);
      } catch (error) {
        // console.error("Error fetching cartItems:", error);
      }
    };
    fetchCartItems();
  }, [setCartItems]);

  return (
    <AuthContext.Provider
      value={{
        authenticated,
        setAuthenticated,
        userInfo,
        setUserInfo,
        cartItems,
        setCartItems,
        authLoading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
