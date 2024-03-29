import axios from "axios";
import React, { useEffect, useState } from "react";
import Loader1 from "../../components/loaders/Loader1";
import styled from "styled-components";
import AdminCourse from "../../components/admin/AdminCourse";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const AllCourses = () => {
  const { userInfo } = useAuth();
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);


  const fetchAllCourses = async () => {
    try {
      const res = await axios.get(
        "http://localhost:8080/api/course/fetch-allcourses",
        { withCredentials: true }
      );
      setCourses(res.data);
      setLoading(false);
    } catch (error) {
      setError("Error fetching data. Please try again later.");
      setLoading(false);
    }
  };

  const fetchInCourses = async () => {
    try {
      const { _id } = userInfo;
      const res = await axios.get(
        `http://localhost:8080/api/course/courses/user/${_id}`,
        { withCredentials: true }
      );
      setCourses(res.data.courses);
      setLoading(false);
    } catch (error) {
      setError("Error fetching data. Please try again later.");
      setLoading(false);
    }
  };


  useEffect(() => {
    if (userInfo.role === "admin" || userInfo.role === "sub-admin") {
      fetchAllCourses();
    } else if (userInfo.role === "instructor") {
      fetchInCourses();
    }
  }, [userInfo]);
  
  
  if (loading) {
    return <Loader1></Loader1>;
  }
  if (error) {
    return <h1>{error}</h1>;
  }

  return (
    <>
      <div className="d-flex justify-content-between px-5 mt-5">
        <h1>All Courses</h1>
        <Link to="/addcourse">
          <button className="btn btn-primary">Add Course</button>
        </Link>

        <h1>Add Category</h1>
        <Link to="/AddCategory">
          <button className="btn btn-primary">Add Category</button>
        </Link>
      </div>
      <div>
      <TabsWrappers className="px-5">
        <div className="tabs">
          <div className="tabs-body">
            {courses.map((course) => (
              <AdminCourse
                key={course._id}
                course={course}
                setCourses={setCourses}
              />
            ))}
          </div>
        </div>
      </TabsWrappers>
      </div>
    </>
  );
};
const TabsWrapper = styled.div`
  .tabs {
    margin-top: 16px;
    .tabs-head-item button {
      border: 1px solid rgba(0, 0, 0, 0.7);
      padding: 10px 13px;
      margin-right: 6px;
      transition: var(--transition);
      font-weight: 500;
      font-size: 15px;
      margin-bottom: 10px;

      &:hover {
        background-color: var(--clr-black);
        color: var(--clr-white);
      }
    }

    .tabs-body {
      margin-top: 32px;
    }

    @media screen and (min-width: 600px) {
      .tabs-body {
        display: grid;
        gap: 26px;
        grid-template-columns: repeat(2, 1fr);
      }
    }

    @media screen and (min-width: 992px) {
      .tabs-body {
        grid-template-columns: repeat(3, 1fr);
      }
    }

    @media screen and (min-width: 1400px) {
      .tabs-body {
        grid-template-columns: repeat(4, 1fr);
      }
    }
  }
`;

const TabsWrappers = styled.div`
  .tabs {
    margin-top: 16px;
    .tabs-head-item button {
      border: 1px solid rgba(0, 0, 0, 0.7);
      padding: 10px 13px;
      margin-right: 6px;
      transition: var(--transition);
      font-weight: 500;
      font-size: 15px;
      margin-bottom: 10px;

      &:hover {
        background-color: var(--clr-black);
        color: var(--clr-white);
      }
    }

    .tabs-body {
      margin-top: 32px;
    }

    @media screen and (min-width: 600px) {
      .tabs-body {
        display: grid;
        gap: 26px;
        grid-template-columns: repeat(2, 1fr);
      }
    }

    @media screen and (min-width: 992px) {
      .tabs-body {
        grid-template-columns: repeat(3, 1fr);
      }
    }

    @media screen and (min-width: 1400px) {
      .tabs-body {
        grid-template-columns: repeat(4, 1fr);
      }
    }
  }
`;

export default AllCourses;
