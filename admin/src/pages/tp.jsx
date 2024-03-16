import React, { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import UserLoader from "../components/loaders/UserLoader";
import PlaylistItem from "../components/PlaylistItem";
import { toast } from "react-toastify";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";

export default function User() {
  const { userInfo, setUserInfo, setAuthenticated, setCartItems } = useAuth();
  const [loading, setLoading] = useState(true);
  const [playlist, setPlaylist] = useState([]);
  const [courses, setCourses] = useState([]);
  const [error, setError] = useState(null);

  const capitalizeFirstLetter = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  };

  const fetchPlaylistDetails = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        "http://localhost:8080/api/user/authenticate",
        { withCredentials: true }
      );
      const { authenticated, user } = response.data;
      setUserInfo(user);
      setAuthenticated(authenticated);
      const courseDetailsArray = await Promise.all(
        user.playlist.map(async (courseId) => {
          const res = await axios.get(
            `http://localhost:8080/api/course/fetch-courseDetails/${courseId}`
          );
          return res.data.courseDetails;
        })
      );
      setPlaylist(courseDetailsArray);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching playlist:", error);
      setLoading(false);
    }
  };

  const handleFetchCourses = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        "http://localhost:8080/api/instructor/fetchcourseDetails"
      );
      setCourses(response.data.courses);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching courses:", error);
      setError("Error fetching courses. Please try again.");
      setLoading(false);
    }
  };

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

  useEffect(() => {
    fetchPlaylistDetails();
    handleFetchCourses();
  }, []);

  if (loading) {
    return <UserLoader />;
  }

  return (
    <section style={{ backgroundColor: "#eee" }}>
      <Container className="fs-20">
        <Row>
          <Col lg="4">
            <Card className="mb-4">{/* Profile Card Content */}</Card>
            {(userInfo.role === "user" || userInfo.role === "instructor") && (
              <Card className="mb-4">
                <Card.Body className="userpn">
                  <Card.Text>Your Courses</Card.Text>
                  {courses.length > 0 ? (
                    <ul>
                      {courses.map((course) => (
                        <li key={course._id}>
                          <h2>{course.Namecourse}</h2>
                          <p>{course.description}</p>
                          <p>Creator: {course.creator}</p>
                          <p>Category: {course.category}</p>
                          <p>Price: ${course.actual_price}</p>
                          {/* Add more details to display */}
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p>No courses available.</p>
                  )}
                </Card.Body>
              </Card>
            )}
          </Col>

          <Col lg="8">
            <Card className="text-center">
              <Card.Body>
                <Card.Text>Your Playlists</Card.Text>
                {playlist.length > 0 ? (
                  <ul>
                    {playlist.map((course) => (
                      <li key={course._id}>
                        <PlaylistItem course={course} />
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p>No courses in your playlist yet.</p>
                )}
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </section>
  );
}
