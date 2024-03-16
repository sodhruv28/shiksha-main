import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

const EditCourse = () => {
  const { _id } = useParams();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [courseData, setCourseData] = useState({
    category: "",
    image: null,
    course_name: "",
    description: "",
    course_url: "",
    updated_date: "",
    lang: "",
    actual_price: "",
    discounted_price: "",
    what_you_will_learn: [],
    content: [],
  });

  const [originalCourseData, setOriginalCourseData] = useState({});
  const [categoryNames, setCategoryNames] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [LanguageNames, setLanguageNames] = useState([]);
  const [isDataChanged, setIsDataChanged] = useState(false); // Track data changes

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

  useEffect(() => {
    // Fetch the original course data by _id
    setLoading(true);
    axios
      .get(`http://localhost:8080/api/course/fetch-courseDetails/${_id}`)
      .then((response) => {
        setOriginalCourseData(response.data.courseDetails);
        setCourseData(response.data.courseDetails);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching course details", error);
        setLoading(false);
      });
  }, [_id]);
  // Update isDataChanged whenever courseData changes
  useEffect(() => {
    const hasDataChanged = !compareObjects(courseData, originalCourseData);
    setIsDataChanged(hasDataChanged);
  }, [courseData, originalCourseData]);

  // Function to compare two objects
  const compareObjects = (objA, objB) => {
    for (let key in objA) {
      if (objA[key] !== objB[key]) {
        return false;
      }
    }
    return true;
  };

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

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setCourseData({
      ...courseData,
      image: file,
    });
  };

  const handleLearnItemsChange = (e) => {
    const value = e.target.value;
    // Split the input value by comma and trim whitespace
    const learnItems = value.split(",").map((item) => item.trim());
    setCourseData({
      ...courseData,
      what_you_will_learn: learnItems,
    });
  };

  const handleContentChange = (e) => {
    const value = e.target.value;
    // Split the input value by comma and trim whitespace
    const contentItems = value.split(",").map((item) => item.trim());
    setCourseData({
      ...courseData,
      content: contentItems,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Create a FormData object to compile the submission data
    const formData = new FormData();
    
    // Append all courseData fields to formData
    Object.keys(courseData).forEach((key) => {
      if (key === "what_you_will_learn" || key === "content") {
        // Since these fields are arrays, they need to be stringified
        formData.append(key, JSON.stringify(courseData[key]));
      } else {
        formData.append(key, courseData[key]);
      }
    });
  
    // You don't need to manually set the Content-Type for multipart/form-data;
    // the browser will set it correctly, including the boundary parameter.
    const config = {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      withCredentials: true,
    };
  
    try {
      setLoading(true);
      await axios.put(`http://localhost:8080/api/course/update-course/${_id}`, formData, config);
      toast.success("Course updated successfully");
      navigate("/allcourses");
    } catch (error) {
      console.error("Error updating course", error);
      toast.error("Error updating course");
    } finally {
      setLoading(false);
    }
  };
  

  return (
    <div className="px-5 mt-5">
      <h2 className="my-3">Edit Course</h2>
      <form onSubmit={handleSubmit}>
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
          <div className="form-group col-6">
            <label className="form-label" htmlFor="image">
              Image:
            </label>
            <input
              className="form-control py-2"
              required
              type="file"
              id="image"
              name="image"
              onChange={handleImageChange}
            />
          </div>
        </div>
        <div className="row">
          <div className="form-group col-6">
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
          <div className="form-group col-6">
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
        <div className="row">
          <div className="form-group col-6">
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
          <div className="form-group col-6">
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
          <div className="form-group col-6">
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
          <div className="form-group col-6">
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
          <button
            className="btn btn-primary mt-3 px-5"
            type="submit"
            disabled={!isDataChanged} // Disable the button if data is not changed
          >
            Update Course
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditCourse;
