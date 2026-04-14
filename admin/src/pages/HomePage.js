import React from "react";
import Hero from "../components/Hero";
import CoursesList from "../components/CourseList";
import Footer2 from "../components/footer2";
import { useAuth } from "../context/AuthContext";
import Loader1 from "../components/loaders/Loader1";
import { Slider1 } from "../components/Slider1";
import Slider from "../components/Slider";
import { Divider } from "../components/Divider";
import ChooseUs from "../components/ChooseUs";

const HomePage = () => {
  const { userInfo, authLoading } = useAuth();

  if (authLoading) {
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
