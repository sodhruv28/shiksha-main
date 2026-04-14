import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import Loader1 from "../components/loaders/Loader1";
import { toast } from "react-toastify";
import "./Reg.css";


const RegisterPage = () => {
  // Define state variables to hold user input
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (username.length <= 3) {
      return setErrorMessage("Username must be 4 digit long");
    }
    if (username.length > 3) {
      const res = await axios.get(
        `http://localhost:8080/api/user/validateUsername/${username}`,
        { withCredentials: true }
      );
      if (res.data.message === "Username Already Used") {
        return setErrorMessage("Username Already Used");
      }
    }
    if (email.length > 0) {
      const res = await axios.get(
        `http://localhost:8080/api/user/validateEmail/${email}`,
        { withCredentials: true }
      );
      if (res.data.message === "Email already used") {
        return setErrorMessage("Email already used");
      }
    }
    if (password.length <= 6) {
      return setErrorMessage("Password must be 6 digit long");
    }
    if (password !== confirmPassword) {
      return setErrorMessage("Enter Same Password");
    }
    // Make a POST request to your backend for user registration using Axios
    try {
      setLoading(true);
      const response = await axios.post(
        "http://localhost:8080/api/user/register",
        {
          username,
          email,
          password,
          cpassword: confirmPassword, // Send confirmPassword to the backend
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      setLoading(false);

      if (response.status === 200) {
        toast.success("Registration Successful!");
        // You can redirect the user to the login page or perform other actions
        navigate("/login");
      }
    } catch (error) {
      // console.error("Error:", error);
      if (error.response && error.response.data) {
        setErrorMessage(error.response.data.message);
        toast.info(`${error.response.data.message}`);
        setLoading(false);
      } else {
        setErrorMessage("An error occurred while registering.");
        toast.error("An error occurred while registering.");
        setLoading(false);
      }
    }
  };

  if (loading) {
    return <Loader1 />;
  }

  return (
    <section style={{}} class="h-100" bg-dark>
      <div class="container py-5 h-100">
        <div class="row d-flex justify-content-center align-items-center h-100">
          <div class="col">
            <div class="card card-registration my-4">
              <div class="row g-0">
                <div class="col-xl-6 d-none d-xl-block">
                  <img
                    className="border-top-left-radius: .25rem; border-bottom-left-radius: .25rem"
                    style={{
                      marginTop: "10px",
                      height: "95%",
                      width: "95%",
                      marginLeft: "10px",
                    }}
                    src="\images\Mobile login-pana.png"
                  />
                </div>
                <div class="col-xl-6" style={{ backgroundColor: "#fff" }}>
                  <div class="card-body p-md-5 text-black">
                    {/* <h3  style={{ fontFamily:"initial" , fontSize:"30px",margin:"15px", textAlign:"center"}}>APPLY HERE TO TEACH ON  SHIKSHA</h3> */}
                    <div style={{}}>
                      {/* <h3  style={{ fontFamily:"initial" , fontSize:"30px",margin:"15px", textAlign:"center"}}>Register Here</h3> */}
                      <div class="container">
                        <div class="centent" style={{ margin: "20px" }}>
                          <div class="centent__centainer">
                            <p class="centent__centainer__text">
                              Register............
                            </p>

                            <ul class="centent__centainer__list">
                              <li class="centent__centainer__list__item">
                                Here !
                              </li>
                              <li class="centent__centainer__list__item">
                                coders !
                              </li>
                              <li class="centent__centainer__list__item">
                                users !
                              </li>
                              <li class="centent__centainer__list__item">
                                Teachers
                              </li>
                            </ul>
                          </div>
                        </div>
                      </div>
                      {errorMessage && (
                        <p className="alert alert-danger">{errorMessage}</p>
                      )}

                      <form onSubmit={handleSubmit}>
                        <div class="row" style={{ marginTop: "50px" }}>
                          <div class="col-md-6 mb-4">
                            <div className="form-group mb-3">
                              <label htmlFor="username" className="form-label">
                                <h2> Username:</h2>
                              </label>
                              <input
                                type="text"
                                id="username"
                                className="form-control"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                required
                              />
                            </div>
                            <div class="col-md-12 mb-4">
                              <div className="form-group mb-3">
                                <label htmlFor="email" className="form-label">
                                  <h2> Email: </h2>
                                </label>
                                <input
                                  type="email"
                                  id="email"
                                  className="form-control"
                                  value={email}
                                  onChange={(e) => setEmail(e.target.value)}
                                  required
                                />
                              </div>
                            </div>
                            <div class="col-md-18 mb-4">
                              <div className="form-group mb-3">
                                <label
                                  htmlFor="password"
                                  className="form-label"
                                >
                                  <h2> Password:</h2>
                                </label>
                                <input
                                  type="password"
                                  id="password"
                                  className="form-control"
                                  value={password}
                                  onChange={(e) => setPassword(e.target.value)}
                                  required
                                />
                              </div>
                              <div class="col-md-24 mb-4">
                                <div className="form-group mb-3">
                                  <label
                                    htmlFor="confirmPassword"
                                    className="form-label"
                                  >
                                    <h2> Confirm Password:</h2>
                                  </label>
                                  <input
                                    type="password"
                                    id="confirmPassword"
                                    className="form-control"
                                    value={confirmPassword}
                                    onChange={(e) =>
                                      setConfirmPassword(e.target.value)
                                    }
                                    required
                                  />
                                </div>
                              </div>
                            </div>
                            <div>
                              <h5>
                                Already a member? <Link to="/login">Login</Link>
                              </h5>
                              <div>
                                <button
                                  style={{
                                    height: "40px",
                                    width: "120px",
                                    fontSize: "12px",
                                  }}
                                  type="submit"
                                  className="btn btn-primary mt-2 px-5"
                                >
                                  Register
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default RegisterPage;
