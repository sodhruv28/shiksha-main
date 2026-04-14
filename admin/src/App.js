import "./App.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { BrowserRouter, Routes, Route, Form } from "react-router-dom";
import HomePage from "./pages/HomePage";
import CartPage from "./pages/CartPage";
import SingleCoursePage from "./pages/SingleCoursePage";
import User from "./pages/User";
import Navbar from "./components/Navbar";
import LoginPage from "./pages/LoginPage";
import axios from "axios";
import api from "./api";


import { useEffect } from "react";
import { useAuth } from "./context/AuthContext";
import ProtectedRoute from "./pages/ProtectedRoute";
import AllCourses from "./pages/admin/AllCourses";
import AddCourse from "./pages/admin/AddCourse";
import Category from "./pages/admin/AddCategory";
import EditCourse from "./pages/admin/EditCourse";
import AdminProtected from "./pages/admin/AdminProtected";
import RegisterPage from "./pages/RegisterPage";

import UserList from "./pages/admin/UserList";
import Course from "./components/Course";
import { Teacher } from "./pages/Teacher";
import { InstructorHome } from "./pages/InstructorHome";
import InstructorDashboard from "./pages/InstructorDashboard";
import { Error404 } from "./pages/Error404";
import { Emptycart } from "./pages/Emptycart";
import ForgotPasswordPage from "./pages/ForgotPasswordPage";
import Resetpassword from "./components/Resetpassword";
import Succes from "./components/success";
import Cancel from "./components/Cancel";
import Date from "./components/date";
import Teachform from "./pages/Teachform";
import Techsuc from "./pages/Techsuc";
import Payment from "./pages/payment";
import PaymentHistory from "./pages/admin/PaymentHistory";

axios.defaults.baseURL = process.env.REACT_APP_API_URL || "https://shiksha-main.onrender.com";
axios.defaults.withCredentials = true;

function App() {
  const { setAuthenticated, setUserInfo, setCartItems, setAdminInfo } =
    useAuth();

  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const response = await api.get(
          "/api/cart/fetch-cartItems"
        );
        setCartItems(response.data.cartItems);
      } catch (error) {
      }
    };
    fetchCartItems();
  }, [setCartItems]);
  return (
    <BrowserRouter>
      <ToastContainer
        position="top-right"
        autoClose={1000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <Navbar psa={setAuthenticated} psui={setUserInfo} psci={setCartItems} />

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/course/:_id" element={<SingleCoursePage />} />
        <Route path="/category/:category" element={<Course />} />
        <Route path="/success" element={<Succes />} />
        <Route path="/cancel" element={<Cancel />} />
        <Route
          path="/cart"
          element={
            <ProtectedRoute>
              <CartPage />
            </ProtectedRoute>
          }
        />
        <Route path="/date" element={<Date />} />
        <Route
          path="/instructor-dashboard"
          element={
            <ProtectedRoute>
              <InstructorDashboard />
            </ProtectedRoute>
          }
        />

        <Route path="*" element={<Error404 />} />
        <Route path="empty cart" element={<Emptycart />} />
        <Route
          path="/user"
          element={
            <ProtectedRoute>
              <User />
            </ProtectedRoute>
          }
        />

        <Route path="/instructor-home" element={<InstructorHome />} />
        <Route path="/teacher" element={<Teacher />} />

        <Route
          path="/payment"
          element={
            <ProtectedRoute>
              <Payment />
            </ProtectedRoute>
          }
        />

        <Route
          path="/paymenthistory"
          element={
            <ProtectedRoute>
              <PaymentHistory />
            </ProtectedRoute>
          }
        />

        <Route
          path="/teachform"
          element={
            <ProtectedRoute>
              <Teachform />
            </ProtectedRoute>
          }
        />

        <Route path="/techsuc" element={<Techsuc />} />

        <Route
          path="/allcourses"
          element={
            <AdminProtected>
              <AllCourses />
            </AdminProtected>
          }
        />

        <Route
          path="/AddCategory"
          element={
            <AdminProtected>
              <Category />
            </AdminProtected>
          }
        />

        <Route
          path="/addcourse"
          element={
            <AdminProtected>
              <AddCourse />
            </AdminProtected>
          }
        />
        <Route
          path="/editcourse/:_id"
          element={
            <AdminProtected>
              <EditCourse />
            </AdminProtected>
          }
        />
        <Route
          path="/allusers"
          element={
            <AdminProtected>
              <UserList />
            </AdminProtected>
          }
        />
        <Route path="/reset-password/:token" element={<Resetpassword />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
