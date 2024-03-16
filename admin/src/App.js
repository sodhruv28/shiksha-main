import "./App.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { BrowserRouter, Routes, Route, Form } from "react-router-dom";
import HomePage from "./pages/HomePage";
import CartPage from "./pages/CartPage";
import SingleCoursePage from "./pages/SingleCoursePage";
import User from "./pages/User";
import Admin from "./pages/admin";
import Navbar from "./components/Navbar";
import LoginPage from "./pages/LoginPage";
import axios from "axios";
import { useEffect } from "react";
import { useAuth } from "./context/AuthContext";
import ProtectedRoute from "./pages/ProtectedRoute";
import AllCourses from "./pages/admin/AllCourses";
import AddCourse from "./pages/admin/AddCourse";
import Category from "./pages/admin/AddCategory";
import EditCourse from "./pages/admin/EditCourse";
import AdminProtected from "./pages/admin/AdminProtected";
import RegisterPage from "./pages/RegisterPage";
import { Reg } from "./pages/Reg";
import UserList from "./pages/admin/UserList";
import Course from "./components/Course";
import { Teacher } from "./pages/Teacher";
import { Ap } from "./pages/Ap";
import Ap1 from "./pages/Ap1";
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


function App() {
  const { setAuthenticated, setUserInfo, setCartItems, setAdminInfo } =
    useAuth();

  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8080/api/cart/fetch-cartItems",
          { withCredentials: true }
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
        <Route path="/reg" element={<Reg />} />
        <Route path="/course/:_id" element={<SingleCoursePage />} />
        <Route path="/category/:category" element={<Course />} />
        <Route path="/pages" element={<Admin />} />
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
          path="/ap1"
          element={
            <ProtectedRoute>
              <Ap1 />
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

        <Route path="/ap" element={<Ap />} />
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
          path="/admin"
          element={
            <ProtectedRoute>
              <User />
            </ProtectedRoute>
          }
        />
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
