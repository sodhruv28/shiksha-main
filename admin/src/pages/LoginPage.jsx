import React, { useState } from "react";
import axios from "axios";
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

      const response = await axios.post(
        "http://localhost:8080/api/user/login", // Assuming your backend is on the same domain, so using relative URL
        {
          username,
          password,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true, // Include credentials (cookies) in the request
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
                    src="\images\undraw_mobile_content_xvgr.png"
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
                        <div class="row">
                          <div class="col-md-6 mb-4">
                            <div className="form-group mb-3">
                              <label htmlFor="username" className="form-label">
                                <h1> Username:</h1>
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
                                <label
                                  htmlFor="password"
                                  className="form-label"
                                >
                                  <h1> Password:</h1>
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
                            </div>
                            <div>
                              <div
                                style={{ margin: "10px", marginTop: "50px" }}
                                className="h4"
                              >
                                Create Account ? <Link to="/register">register</Link>
                              </div>
                              <div style={{ margin: "10px" }} className="h4">
                                Forgot password ?{" "}
                                <Link to="/forgot-password">click here</Link>
                              </div>
                              <div>
                                <button
                                  style={{ height: "40px", width: "120px" }}
                                  type="submit"
                                >
                                  <a
                                    style={{ marginTop: "50px" }}
                                    class="fancy"
                                  >
                                    <span class="top-key"></span>
                                    <span class="text">Login</span>
                                    <span class="bottom-key-1"></span>
                                    <span class="bottom-key-2"></span>
                                  </a>
                                </button>
                              </div>
                              {/* <div>
          <button type="submit" className="btn btn-primary mt-2 px-5 h4">
            Login
          </button>
        </div> */}
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
