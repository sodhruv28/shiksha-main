import React, { useState } from "react";
import axios from "axios";
import api from "../api";
import { Link, useNavigate } from "react-router-dom";
import Loader1 from "../components/loaders/Loader1";
import { toast } from "react-toastify";

const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const response = await api.post(
        "/api/user/login", // Assuming your backend is on the same domain, so using relative URL
        {
          username,
          password,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      setLoading(false);

      if (response.status === 200) {
        toast.success("Login Successful!");
        navigate("/");
      }
    } catch (error) {
      console.error("Error:", error);
      if (error.response && error.response.data) {
        setErrorMessage(error.response.data.message);
      } else {
        setErrorMessage("An error occurred while logging in.");
      }
      setLoading(false);
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
                    style={{ marginTop: "10px", marginLeft: "10px" }}
                    src="/images/undraw_mobile_content_xvgr.png"
                  />
                </div>
                <div class="col-xl-6" style={{ backgroundColor: "#fff" }}>
                  <div class="card-body p-md-5 text-black">
                    {/* <h3  style={{ fontFamily:"initial" , fontSize:"30px",margin:"15px", textAlign:"center"}}>APPLY HERE TO TEACH ON  SHIKSHA</h3> */}
                    <div style={{}}>
                      <h3
                        style={{
                          fontFamily: "",
                          fontSize: "30px",
                          margin: "15px",
                          textAlign: "center",
                        }}
                      >
                        Login to Shiksha
                      </h3>
                      {errorMessage && (
                        <p className="alert alert-danger">{errorMessage}</p>
                      )}

                      <form onSubmit={handleSubmit}>
                        <div class="row justify-content-center">
                          <div class="col-12 col-md-10 col-lg-8 mb-4">
                            <div className="form-group mb-3 text-start">
                              <label htmlFor="username" className="form-label fw-bold fs-18">
                                Username:
                              </label>
                              <input
                                type="text"
                                id="username"
                                className="form-control fs-16"
                                placeholder="Enter Username"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                required
                              />
                            </div>
                            <div className="form-group mb-4 text-start">
                              <label
                                htmlFor="password"
                                className="form-label fw-bold fs-18"
                              >
                                Password:
                              </label>
                              <input
                                type="password"
                                id="password"
                                className="form-control fs-16"
                                placeholder="Enter Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                              />
                            </div>
                            <div className="text-center text-md-start">
                              <div
                                style={{ margin: "10px 0", marginTop: "20px" }}
                                className="fs-14"
                              >
                                Don't have an account? <Link to="/register" className="text-primary fw-bold">Register</Link>
                              </div>
                              <div style={{ margin: "10px 0" }} className="fs-14">
                                Forgot password?{" "}
                                <Link to="/forgot-password" title="Reset Password" className="text-primary">Click here</Link>
                              </div>
                              <div className="mt-4">
                                <button
                                  style={{ height: "45px", width: "100%", maxWidth: "150px" }}
                                  type="submit"
                                  className="btn-login-custom"
                                >
                                  <a
                                    className="fancy"
                                  >
                                    <span class="top-key"></span>
                                    <span class="text">Login</span>
                                    <span class="bottom-key-1"></span>
                                    <span class="bottom-key-2"></span>
                                  </a>
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

        {/* <div class="d-flex justify-content-end pt-3">
                  <button type="button" class="btn btn-light btn-lg">Reset all</button>
                  <button type="button" class="btn btn-warning btn-lg ms-2">Submit form</button>
                </div> */}
      </div>
    </section>
  );
};

export default LoginPage;
