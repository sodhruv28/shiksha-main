import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const AddCourse = () => {
  const initialData = {
    category: "",
    image: null,
    course_name: "",
    description: "",
    course_url: "",
    lang: "",
    actual_price: "",
    discounted_price: "",
    what_you_will_learn: [],
    content: [],
  };

  // State variables
  const { userInfo } = useAuth();
  const [courseData, setCourseData] = useState(initialData);
  const [categoryNames, setCategoryNames] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [LanguageNames, setLanguageNames] = useState([]);
  const navigate = useNavigate();


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

  const fetchCategoryNames = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8080/api/course/categories"
      );
      const categories = response.data.categories;
      setCategoryNames(categories);
    } catch (error) {
      console.error("Error fetching category names:", error);
    }
  };

  // Fetch category names when component mounts
  useEffect(() => {
    fetchCategoryNames();
    fetchLangNames();
  }, []);

// Event handler for input changes
const handleInputChange = (e) => {
  const { name, value } = e.target;
  let updatedValue = value;

  // Price validation: ensure values are positive numbers
  if (name === 'actual_price' || name === 'discounted_price') {
    if (parseFloat(value) < 0 || isNaN(parseFloat(value))) {
      setErrorMessage("Price must be a positive number");
      return; // Prevent the state update if the input is invalid
    }
  }

  // Specific validation for discounted_price to not exceed actual_price
  if (name === 'discounted_price' && parseFloat(value) > parseFloat(courseData.actual_price)) {
    setErrorMessage("Discounted price cannot exceed actual price.");
    return; // Prevent the state update
  } else {
    setErrorMessage(""); // Clear any existing error messages if the input is now valid
  }

  // Update state with the new value for the field
  setCourseData((prevCourseData) => ({
    ...prevCourseData,
    [name]: updatedValue,
  }));
};



  // Event handler for file input changes
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setCourseData({
      ...courseData,
      image: file,
    });
  };

  // Event handler for "What You Will Learn" input changes
  const handleLearnItemsChange = (e) => {
    const value = e.target.value;
    const learnItems = value.split(",");
    setCourseData({
      ...courseData,
      what_you_will_learn: learnItems,
    });
  };

  // Event handler for "Course Content" input changes
  const handleContentChange = (e) => {
    const value = e.target.value;
    const contentItems = value.split(",");
    setCourseData({
      ...courseData,
      content: contentItems,
    });
  };

  // Event handler for form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const formData = new FormData();
    Object.keys(courseData).forEach(key => {
      if (key === 'image') {
        formData.append(key, courseData[key]);
      } else if (Array.isArray(courseData[key])) {
        formData.append(key, JSON.stringify(courseData[key])); // Arrays need to be stringified
      } else {
        formData.append(key, courseData[key]);
      }
    });
  
    try {
      await axios.post("http://localhost:8080/api/course/create-course", formData, {
        withCredentials: true,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      toast.success("Course created successfully");
      setCourseData(initialData);
      navigate("/allcourses");
    } catch (error) {
      // Handle error
      console.error("Error creating course", error);
      toast.error("Error creating course");
    }
  };
  

  return (
    <div className="px-5 mt-5">
      <h2 className="my-3">Add Course</h2>
      <form onSubmit={handleSubmit}>
        {errorMessage && <p className="alert alert-danger">{errorMessage}</p>}
        <div className="row">
          <div className="form-group col-3">
            <label className="form-label text-lg" htmlFor="category">
              Category:
            </label>
            <select
              required
              className="form-control py-2"
              id="category"
              name="category"
              value={courseData.category}
              onChange={handleInputChange}
            >
              <option value="">Select Category</option>
              {/* Map over category names to create options */}
              {categoryNames.map((category, index) => (
                <option key={index} value={category._id}>
                  {category.category_name}
                </option>
              ))}
            </select>
          </div>

          <div className="form-group col-3">
            <label className="form-label" htmlFor="image">
              Image:
            </label>
            <input
              required
              className="form-control py-2"
              type="file"
              id="image"
              name="image"
              onChange={handleImageChange}
            />
          </div>
        </div>
        <div className="row">
          <div className="form-group col-3">
            <label className="form-label" htmlFor="course_name">
              Course Name:
            </label>
            <input
              required
              className="form-control py-2"
              type="text"
              id="course_name"
              name="course_name"
              value={courseData.course_name}
              onChange={handleInputChange}
            />
          </div>
          <div className="form-group col-3">
            <label className="form-label" htmlFor="description">
              Description:
            </label>
            <textarea
              required
              className="form-control"
              id="description"
              name="description"
              value={courseData.description}
              onChange={handleInputChange}
            />
          </div>
        </div>
        <div className="row">
          {/* <div className="form-group col-3">
            <label className="form-label" htmlFor="lang">
              Language:
            </label>
            <input
              required
              className="form-control py-2"
              type="text"
              id="lang"
              name="lang"
              value={courseData.lang}
              onChange={handleInputChange}
            />
          </div> */}
          <div className="col-md-6 mb-4">
            <label className="form-label" htmlFor="lang">
              Language:
            </label>
            <select
              required
              className="form-control py-2"
              id="lang"
              name="lang"
              value={courseData.lang}
              onChange={handleInputChange}
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
        </div>
        <div className="row"></div>
        <div className="row">
          <div className="form-group col-3">
            <label className="form-label" htmlFor="actual_price">
              Actual Price:
            </label>
            <input
              required
              className="form-control py-2"
              type="text"
              id="actual_price"
              name="actual_price"
              value={courseData.actual_price}
              onChange={handleInputChange}
            />
          </div>
          <div className="form-group col-3">
            <label className="form-label" htmlFor="discounted_price">
              Discounted Price:
            </label>
            <input
              required
              className="form-control py-2"
              type="text"
              id="discounted_price"
              name="discounted_price"
              value={courseData.discounted_price}
              onChange={handleInputChange}
            />
          </div>
        </div>
        <div className="row">
          <div className="form-group col-3">
            <label className="form-label" htmlFor="what_you_will_learn">
              What You Will Learn (Separated by Commas):
            </label>
            <input
              required
              className="form-control py-2"
              type="text"
              id="what_you_will_learn"
              name="what_you_will_learn"
              value={courseData.what_you_will_learn.join(",")}
              onChange={handleLearnItemsChange}
            />
          </div>
          <div className="form-group col-3">
            <label className="form-label" htmlFor="content">
              Course Content (Separated by Commas):
            </label>
            <input
              required
              className="form-control py-2"
              type="text"
              id="content"
              name="content"
              value={courseData.content.join(",")}
              onChange={handleContentChange}
            />
          </div>
        </div>
        <div className="row">
          <div className="form-group col-6">
            <label className="form-label" htmlFor="course_url">
              Course Url:
            </label>
            <input
              required
              className="form-control py-2"
              type="text"
              id="course_url"
              name="course_url"
              value={courseData.course_url}
              onChange={handleInputChange}
            />
          </div>
        </div>
        <div>
          <button className="btn btn-primary mt-3 px-5" type="submit">
            Create Course
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddCourse;
