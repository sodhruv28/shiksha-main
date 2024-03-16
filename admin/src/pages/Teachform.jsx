import React, { useState, useEffect } from "react";
import "./Teach.css";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Teachform = () => {
  const { userInfo } = useAuth();
   const [formData, setFormData] = useState({
    fname: "",
    lname: "",
    dob: "",
    email: userInfo.email,
    lspoken: "",
    skills: "",
    experience: "",
    worksofhours: "",
    profile: null, // Initialize as null
    resume: null, // Initialize as null
  });

  const [loading, setLoading] = useState(false);
  const [isDataChanged, setIsDataChanged] = useState(false);
  const [error, setError] = useState(null);
  const [successMessage] = useState(null);
  const [SkillsNames, setSkillsNames] = useState([]);
  const [LanguageNames, setLanguageNames] = useState([]);
  const [selectedDate, setSelectedDate] = useState("");
  const navigate = useNavigate();

  const calculateAge = (dob) => {
    const birthday = new Date(dob);
    const ageDifMs = Date.now() - birthday.getTime();
    const ageDate = new Date(ageDifMs); // miliseconds from epoch
    return Math.abs(ageDate.getUTCFullYear() - 1970);
  };

  const handleDateChange = (event) => {
    const { value } = event.target;
    setFormData((prevData) => ({ ...prevData, dob: value }));
  };

  const fetchLangNames = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8080/api/user/language"
      );
      const language = response.data.language;
      setLanguageNames(language);
    } catch (error) {
      console.error("Error fetching language names:", error);
    }
  };

  const fetchskillsNames = async () => {
    try {
      const response = await axios.get("http://localhost:8080/api/user/skills");
      const skills = response.data.skills;
      setSkillsNames(skills);
    } catch (error) {
      console.error("Error fetching skills names:", error);
    }
  };

  useEffect(() => {
    fetchskillsNames();
    fetchLangNames();
  }, []);

  // Event handler for form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
    setIsDataChanged(true);
  };

  // Event handler for image changes
  const handleImageChange = (e, fieldName) => {
    const file = e.target.files[0];
    setFormData((prevData) => ({ ...prevData, [fieldName]: file }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const age = calculateAge(formData.dob);

    let minAgeRequired = 0;

    switch (formData.experience) {
      case "6 Months - 1 Year":
        minAgeRequired = 18;
        break;
      case "2 Years - 5 Years":
        minAgeRequired = 20;
        break;
      case "More Than 5 Years":
        minAgeRequired = 25;
        break;
      default:
        // Handle cases where experience is not set or does not match expected values
        // For this example, we'll assume a default minimum age of 0, which effectively means no minimum age requirement
        minAgeRequired = 0;
    }

    if (age < minAgeRequired) {
      setLoading(false);
      setError(
        `For the selected level of experience, a minimum age of ${minAgeRequired} is required. Your current age is ${age}.`
      );
      return; // Stop the form submission process
    }

    try {
      const data = new FormData();

      // Append text fields
      for (const [key, value] of Object.entries(formData)) {
        if (typeof value === "string") {
          data.append(key, value);
        }
      }

      // Append file fields
      if (formData.profile) {
        data.append("profile", formData.profile);
      }
      if (formData.resume) {
        data.append("resume", formData.resume);
      }

      const response = await axios.post(
        "http://localhost:8080/api/user/teacher",
        data
      );

      if (response.status === 200) {
        toast.success("Successful!");
        {
          error && <p style={{ color: "red" }}>{error}</p>;
        }

        navigate("/techsuc");
      }
    } catch (error) {
      {
        error && <p style={{ color: "red" }}>{error}</p>;
      }

      console.error("Error submitting teacher qualification:", error);

      if (error.response && error.response.status === 400) {
        setError("Invalid input, please check your data.");
        {
          error && <p style={{ color: "red" }}>{error}</p>;
        }
      } else {
        setError("An error occurred. Please try again.");
        {
          error && <p style={{ color: "red" }}>{error}</p>;
        }
      }
    } finally {
      setLoading(false);
      {
        error && <p style={{ color: "red" }}>{error}</p>;
      }
    }
  };

  // Rest of your component code...

  return (
    <section class="h-100" style={{ backgroundColor: "#ddebec" }}>
      <form onSubmit={handleSubmit}>
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
                        marginLeft: "50px",
                        height: "85%",
                        width: "80%",
                      }}
                      src="images\2150793899.jpg"
                      alt="Your profile Alt Text"
                    />
                  </div>
                  <div class="col-xl-6">
                    <div class="card-body p-md-5 text-black">
                      <h3
                        style={{
                          fontFamily: "CoFo Sans",
                          fontSize: "30px",
                          margin: "20px",
                          textAlign: "center",
                        }}
                      >
                        APPLY HERE TO TEACH ON SHIKSHA
                      </h3>

                      <div class="row">
                        <div class="col-md-6 mb-4">
                          <div class="form-outline">
                            <input
                              type="text"
                              name="fname"
                              value={formData.fname}
                              onChange={handleChange}
                              class="form-control form-control-lg"
                            />
                            <label class="form-label" for="form3Example1m">
                              First name
                            </label>
                          </div>
                        </div>
                        <div class="col-md-6 mb-4">
                          <div class="form-outline">
                            <input
                              type="text"
                              name="lname"
                              value={formData.lname}
                              onChange={handleChange}
                              class="form-control form-control-lg"
                            />
                            <label class="form-label" for="form3Example1n">
                              Last name
                            </label>
                          </div>
                        </div>
                      </div>

                      <div className="form-outline mb-4">
                        <label className="form-label" htmlFor="dob">
                          Add birth-date:
                        </label>
                        <input
                          type="date"
                          required
                          id="dob"
                          name="dob"
                          value={formData.dob}
                          onChange={handleDateChange}
                          className="form-control form-control-lg"
                        />
                        {selectedDate && (
                          <p className="selected-date">
                            Selected Date: {selectedDate}
                          </p>
                        )}
                      </div>

                      <div class="form-outline mb-4">
                        <input
                          type="email"
                          required
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          class="form-control form-control-lg"
                        />
                        <label class="form-label" for="form3Example97">
                          Email ID
                        </label>
                      </div>

                      <div>
                        <h3
                          style={{
                            fontFamily: "initial",
                            fontSize: "30px",
                            margin: "15px",
                            textAlign: "center",
                          }}
                        >
                          Qualification | Experience Details
                        </h3>
                      </div>
                      <div class="row">
                        <div className="row">
                          <div className="col-md-6 mb-4">
                            <label className="form-label" htmlFor="language">
                              Language:
                            </label>
                            <select
                              required
                              className="form-control py-2"
                              id="language"
                              name="lspoken"
                              value={formData.lspoken}
                              onChange={handleChange}
                            >
                              <option value="">Select language</option>
                              {/* Map over language names to create options */}
                              {LanguageNames.map((language, index) => (
                                <option key={index} value={language}>
                                  {language}
                                </option>
                              ))}
                            </select>
                          </div>

                          <div className="col-md-6 mb-4">
                            <label className="form-label" htmlFor="skills">
                              Skills:
                            </label>
                            <select
                              required
                              className="form-control py-2"
                              id="skills"
                              name="skills"
                              value={formData.skills}
                              onChange={handleChange}
                            >
                              <option value="">Select Skills</option>
                              {/* Map over Skills names to create options */}
                              {SkillsNames.map((Skills, index) => (
                                <option key={index} value={Skills}>
                                  {Skills}
                                </option>
                              ))}
                            </select>
                          </div>
                        </div>

                        <div className="row">
                          <div className="col-md-6 mb-4">
                            <label htmlFor="experience">Experience:</label>
                            <select
                              className="form-control py-2"
                              id="experience"
                              required
                              name="experience"
                              value={formData.experience}
                              onChange={handleChange}
                            >
                              <option value="">Select experience range</option>
                              <option value="6 Months - 1 Year">
                                6 Months - 1 Year
                              </option>
                              <option value="2 Years - 5 Years">
                                2 Years - 5 Years
                              </option>
                              <option value="More Than 5 Years">
                                More Than 5 Years
                              </option>
                            </select>
                          </div>
                        </div>

                        <div className="col-md-6 mb-4">
                          <label htmlFor="worksofhours">Works Of Hours:</label>
                          <select
                            id="worksofhours"
                            className="form-control py-2"
                            name="worksofhours"
                            value={formData.worksofhours}
                            onChange={handleChange}
                          >
                            <option value="">Select work of hours</option>
                            <option value="I’m very busy right now">
                              I’m very busy right now
                            </option>
                            <option value="I’ll work on this on the side">
                              I’ll work on this on the side
                            </option>
                            <option value="I have lots of flexibility">
                              I have lots of flexibility
                            </option>
                            <option value="I haven't decided yet if I have time">
                              I haven't decided yet if I have time
                            </option>
                          </select>
                        </div>
                      </div>
                      <div class="row">
                        <div class="col-md-6 mb-4">
                          <div className="form-group col-md-6 mb-4">
                            <label className="form-label" htmlFor="profile">
                              Upload Profile Photo
                            </label>
                            <input
                              required
                              className="form-control py-2"
                              onChange={(e) => handleImageChange(e, "profile")}
                              type="file"
                              id="profile"
                              name="profile"
                            />
                          </div>
                        </div>
                        <div className="form-group col-md-6 mb-4">
                          <label className="form-label" htmlFor="resume">
                            Upload Your Resume
                          </label>
                          <input
                            required
                            className="form-control py-2"
                            onChange={(e) => handleImageChange(e, "resume")}
                            type="file"
                            id="resume"
                            name="resume"
                          />
                        </div>
                        <div></div>
                      </div>

                      <div class="d-flex justify-content-end pt-3">
                        {/* <button type="button" class="btn btn-light btn-lg">Reset all</button> */}
                        <button
                          type="submit"
                          disabled={loading || !isDataChanged}
                          class="btn btn-warning btn-lg ms-2"
                        >
                          Submit form
                          {error && <p style={{ color: "red" }}>{error}</p>}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </form>
      {/* Loading, error, and success messages */}
      {loading && <p></p>}
      {error && <p style={{ color: "red" }}>{error}</p>}
      {successMessage && <p style={{ color: "green" }}>{successMessage}</p>}
    </section>
  );
};

export default Teachform;
