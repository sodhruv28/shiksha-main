import React, { useEffect, useState } from "react";
import Card from "react-bootstrap/Card";
import "./userp.css";
import { Link } from "react-router-dom";
import axios from "axios";
import PlaylistItem from "../components/PlaylistItem";
import { useAuth } from "../context/AuthContext";
import UserProfileUpdate from "../components/UserProfileUpdate";
import { toast } from "react-toastify"; // Import toast
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import styled from "styled-components";

export default function User() {
  const { userInfo, setUserInfo, setAuthenticated, setCartItems } = useAuth();
  const [playlist, setPlaylist] = useState([]);
  const [playlistLoading, setPlaylistLoading] = useState(false);
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [instructor, setInstructor] = useState("");
  const [instructors, setInstructors] = useState([]);
  const [teachers, setteachers] = useState([]);

  // Function to capitalize the first character of a string
  const capitalizeFirstLetter = (str) => {
    return str?.charAt(0).toUpperCase() + str?.slice(1);
  };

  const fetchTeacher = async () => {
    if (userInfo.role === "admin" || userInfo.role === "sub-admin") {
      try {
        const response = await axios.get(
          "http://localhost:8080/api/user/teacherdata"
        );
        setteachers(response.data.teachers); // Corrected from setteacher to setteachers
      } catch (error) {
        console.error("Error fetching teachers:", error); // Updated log message for consistency
        // Handle error appropriately
      }
    }
  };

  const fetchInstructors = async () => {
    if (userInfo.role === "admin" || userInfo.role === "sub-admin") {
      try {
        const response = await axios.get(
          "http://localhost:8080/api/user/teachers"
        );
        setInstructors(response.data.instructors);
        setInstructor(response.data.instructor);
      } catch (error) {
        console.error("Error fetching instructors:", error);
        // Handle error appropriately
      }
    }
  };

  const fetchPlaylistDetails = async () => {
    try {
      setLoading(true);
      setPlaylistLoading(true);
      const response = await axios.get(
        "http://localhost:8080/api/user/authenticate",
        { withCredentials: true }
      );
      const { authenticated, user } = response.data;
      setUserInfo(user);
      setAuthenticated(authenticated);
      const data = user.playlist.map((courseId) => courseId);
      const courseDetailsArray = await Promise.all(
        data.map(async (courseId) => {
          const res = await axios.get(
            `http://localhost:8080/api/course/fetch-courseDetails/${courseId}`
          );
          return { ...res.data, isCertified: false };
        })
      );
      setPlaylist(courseDetailsArray);
      setPlaylistLoading(false);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching playlist:", error);
      setPlaylistLoading(false);
      setLoading(false);
    }
  };

  const fetchCoursesByUser = async () => {
    if (!userInfo) return;
    setLoading(true);
    try {
      const { _id } = userInfo;
      const response = await axios.get(
        `http://localhost:8080/api/course/courses/user/${_id}`
      );
      setCourses(response.data.courses);
    } catch (error) {
      console.error("Error fetching courses:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTeacher();
    fetchInstructors();
    fetchPlaylistDetails();
    fetchCoursesByUser();
  }, []);

  const handleLogout = async () => {
    try {
      setLoading(true);
      await axios.get("http://localhost:8080/api/user/logout", {
        withCredentials: true,
      });
      setAuthenticated(false);
      setUserInfo(null);
      toast.success("Logout Successfully!");
      setLoading(false);
      setCartItems([]);
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  if (error) return <div></div>;
  if (loading || playlistLoading) {
    return (
      <div>
        <div>
          {courses.map((course) => (
            <CourseItem key={course._id} course={course} />
          ))}
        </div>
      </div>
    );
  }

  return (
    <section style={{ backgroundColor: "#eee" }}>
      <Container className="fs-20">
        <Row>
          <Col lg="4">
            <Card className="mb-4">
              <Card.Body className="userpn" style={{ textAlign: "center" }}>
                <Card.Img
                  src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava3.webp"
                  alt="avatar"
                  className="rounded"
                  style={{ width: "100px", height: "100px" }}
                  fluid
                />
                <p className="text-muted mb-1">
                  {userInfo.username}{" "}
                  {(userInfo.role === "admin" ||
                    userInfo.role === "sub-admin") && (
                    <span style={{ color: "green", fontWeight: "900" }}>
                      {capitalizeFirstLetter(userInfo.role)}👑
                    </span>
                  )}
                  {userInfo.role === "instructor" && (
                    <span style={{ color: "green", fontWeight: "900" }}>
                      {capitalizeFirstLetter(userInfo.role)}🧑‍🏫
                    </span>
                  )}
                </p>
                <p className="text-muted mb-4">{userInfo.email}</p>
                <div className="d-flex justify-content-center mb-2">
                  {(userInfo.role === "admin" ||
                    userInfo.role === "instructor" ||
                    userInfo.role === "sub-admin") && (
                    <Link to="/allcourses">
                      <button className="btn btn-outline-primary me-3">
                        Edit Courses
                      </button>
                    </Link>
                  )}
                  {(userInfo.role === "admin" ||
                    userInfo.role === "sub-admin") && (
                    <Link to="/allusers">
                      <button className="btn btn-outline-primary me-3">
                        Edit Users
                      </button>
                    </Link>
                  )}
                  {(userInfo.role === "instructor" ||
                    userInfo.role === "user") && (
                    <Link to="/payment">
                      <button className="btn btn-outline-primary me-3">
                        payment history
                      </button>
                    </Link>
                  )}
                  {userInfo.role === "admin" && (
                    <Link to="/paymenthistory">
                      <button className="btn btn-outline-primary me-3">
                        payment history
                      </button>
                    </Link>
                  )}
                  <button
                    className="btn btn-primary"
                    onClick={() => {
                      handleLogout();
                    }}
                  >
                    Logout
                  </button>
                </div>
              </Card.Body>
            </Card>
            {(userInfo.role === "user" || userInfo.role === "instructor") && (
              <Card className="mb-4">
                <Card.Body className="userpn">
                  <UserProfileUpdate
                    userInfo={userInfo}
                    setUserInfo={setUserInfo} // Make sure to pass setUserInfo if required
                  ></UserProfileUpdate>
                </Card.Body>
                <Card className="text-center"></Card>
              </Card>
            )}

            {userInfo.role === "instructor" && (
              <Card>
                <Container>
                  <h1>Your Item Lists</h1>{" "}
                  <ItemListWrapper>
                    <ItemCard>
                      {loading ? (
                        <div>Loading...</div>
                      ) : (
                        <div>
                          {courses.map((course) => (
                            <CartItemWrapper className="d-flex align-items-center justify-content-between">
                              <div className="cart-item-img">
                                <img
                                  style={{
                                    height: "80px",
                                    width: "100px",
                                    marginTop: "10px",
                                  }}
                                  src={course.image}
                                  alt={course.course_name}
                                />
                              </div>
                              <div className="cart-item-info d-flex flex-column">
                                <div className="d-flex flex-column justify-content-center mb-3">
                                  <span className="fw-7 fs-15">
                                    {course.course_name}
                                  </span>
                                </div>
                                <div className="d-flex align-items-center justify-content-between px-5">
                                  <div className="cart-item-category bg-orange fs-12 text-capitalize text-white fw-7">
                                    {course.category.category_name}
                                  </div>
                                  <a
                                    href={course.course_url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                  ></a>
                                </div>
                              </div>
                            </CartItemWrapper>
                          ))}
                        </div>
                      )}
                    </ItemCard>
                  </ItemListWrapper>
                </Container>
              </Card>
            )}
          </Col>

          <Col lg="8">
            <div>
              <Card className="text-center">
                {(userInfo.role === "user" ||
                  userInfo.role === "instructor") && (
                  <Card.Body>
                    <Card.Text>Your Playlists</Card.Text>
                    {playlist.length > 0 ? (
                      <ul>
                        {playlist.map((course) => (
                          <li key={course._id}>
                            <PlaylistItem
                              course={course}
                              loading={loading}
                              playlist={playlist}
                              setPlaylist={setPlaylist}
                              userInfo={userInfo}
                            ></PlaylistItem>
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <p>
                        {" "}
                        Your PLaylist Is Empty
                        <img
                          style={{
                            height: "400px",
                            width: "400px",
                            marginLeft: "25%",
                          }}
                          src="\images\22378357_6592321.jpg"
                          alt=""
                          srcset=""
                        />
                      </p>
                    )}
                  </Card.Body>
                )}
              </Card>
              {(userInfo.role === "admin" || userInfo.role === "sub-admin") && (
                <Card>
                  <Card.Text>
                    <h2>Instructors</h2>
                    <table className="instructor-table">
                      <thead>
                        <tr>
                          <th>Instructor Name</th>
                          <th>Email</th>
                          <th>Role</th>
                        </tr>
                      </thead>
                      <tbody>
                        {instructors.map((instructor) => (
                          <tr key={instructor._id}>
                            <td>
                              {capitalizeFirstLetter(instructor.username)}
                            </td>
                            <td>{capitalizeFirstLetter(instructor.email)}</td>
                            <td>{capitalizeFirstLetter(instructor.role)}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </Card.Text>
                </Card>
              )}

              {(userInfo.role === "admin" || userInfo.role === "sub-admin") && (
                <Card>
                  <Card.Body>
                    <Card.Text>
                      <h2>Applying for teacher...</h2>
                      <div className="teacher-table-container">
                        <table className="teacher-table">
                          <thead>
                            <tr>
                              <th>Email</th>
                              <th>Date of Birth</th>
                              <th>First Name</th>
                              <th>Last Name</th>
                              <th>Skills</th>
                            </tr>
                          </thead>
                          <tbody>
                            {teachers.map((teacher) => (
                              <tr key={teacher._id}>
                                <td>{capitalizeFirstLetter(teacher.email)}</td>
                                <td>{capitalizeFirstLetter(teacher.dob)}</td>
                                <td>{capitalizeFirstLetter(teacher.fname)}</td>
                                <td>{capitalizeFirstLetter(teacher.lname)}</td>
                                <td>{capitalizeFirstLetter(teacher.skills)}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </Card.Text>
                  </Card.Body>
                </Card>
              )}
            </div>

            <Row>
              <Col md="6"> </Col>
            </Row>
          </Col>
        </Row>
      </Container>
    </section>
  );
}

const ItemListContainer = styled.div`
  /* Add your styling here */
`;

const ItemListWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  grid-gap: 20px;
`;

const ItemCard = styled.div`
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  padding: 20px;
  img {
    width: 100%;
    border-radius: 8px;
    margin-bottom: 10px;
  }
  h3 {
    margin-bottom: 10px;
  }
`;

const CartItemWrapper = styled.div`
  grid-template-columns: 110px auto;
  border: 1px solid rgba(0, 0, 0, 0.1);
  padding: 10px;

  .cart-item-img {
    width: 200px;
    height: 100px;
    overflow: hidden;
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }
  .cart-item-category {
    padding: 0px 10px;
    border-radius: 6px;
  }
  .cart-item-info {
    width: 100%;
    // background-color: red;
  }
  @media (max-width: 768px) {
    /* Define the screen width at which you want to switch to flex column */
    flex-direction: column; /* Switch to a flex column layout */
    align-items: flex-start; /* Align items to the start of the column */
    .cart-item-img {
      width: 100%; /* Adjust the width to fit the column */
      height: 100%;
    }
  }
`;

const CourseItem = styled.div`
  /* Define styles for CourseItem here */
`;
