import React, { useEffect, useState } from "react";
import Hero from "../components/Hero";
import CoursesList from "../components/CourseList";
import Footer2 from "../components/footer2";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import Loader1 from "../components/loaders/Loader1";
import { Slider1 } from "../components/Slider1";
import Slider from "../components/Slider";
import { Divider } from "../components/Divider";
import  ChooseUs  from "../components/ChooseUs";

const HomePage = () => {
  const { userInfo, setUserInfo, setAuthenticated, setCartItems } = useAuth();
  const [loading, setLoading] = useState(false);

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
        setCartItems(user.cart);
        setLoading(false);
      } catch (error) {
        setAuthenticated(false);
        setLoading(false);
      }
    };

    checkAuthentication();
  }, [setAuthenticated, setUserInfo, setCartItems]);
  if (loading) {
    return <Loader1></Loader1>;
  }

  return (
    <div className="holder">
      <Slider></Slider>
      <CoursesList />
      <Slider1></Slider1>
      {!(userInfo?.role === "instructor" || userInfo?.role === "admin" || userInfo?.role === "sub-admin") && <ChooseUs></ChooseUs>}
      <Divider></Divider>
      <Footer2 />
    </div>
  );
  
};

export default HomePage;
