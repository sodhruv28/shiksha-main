import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import axios from "axios"; // Make sure to install axios: npm install axios
import { useAuth } from "../../context/AuthContext";

const AddCategory = () => {
  const { userInfo } = useAuth();
  const [categoryName, setCategoryName] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [btnLoading, setBtnLoading] = useState(false);
  const [categoryNames, setCategoryNames] = useState([]);
  const [category, setCategory] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [usersPerPage] = useState(5); // Set the number of categories per page

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage("");
    if (category) {
      try {
        const response = await axios.put(
          `http://localhost:8080/api/course/update-category/${category._id}`,
          { category_name: categoryName }
        );
        setCategory(null);
        setCategoryName("");
        toast.success("Category updated successfully");
        fetchCategoryNames();
      } catch (error) {
        if (
          error.response &&
          error.response.data &&
          error.response.data.error === "Category name must be unique"
        ) {
          setErrorMessage("Category name must be unique");
        } else {
          console.error("Error updating category:", error);
        }
      }
    } else {
      try {
        const response = await axios.post(
          "http://localhost:8080/api/course/create-category",
          { category_name: categoryName }
        );
        setCategoryName("");
        toast.success("Category created successfully");
        fetchCategoryNames();
      } catch (error) {
        if (
          error.response &&
          error.response.data &&
          error.response.data.error === "Category name must be unique"
        ) {
          setErrorMessage("Category name must be unique");
        } else {
          console.error("Error inserting category:", error);
        }
      }
    }
  };

  const handleUpdateCategory = (category) => {
    setCategory(category);
    setCategoryName(category.category_name);
  };

  const handleDeleteCategory = async (category) => {
    try {
      const categoryId = category._id;
      setBtnLoading(true);
      await axios.delete(
        `http://localhost:8080/api/course/delete-category/${categoryId}`,
        {
          withCredentials: true,
        }
      );

      return true;
    } catch (error) {
      console.error("Error deleting category:", error);
      return false;
    } finally {
      setBtnLoading(false);
      fetchCategoryNames();
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

  useEffect(() => {
    fetchCategoryNames();
  }, []);

  // Get current categories
  const indexOfLastCategory = currentPage * usersPerPage;
  const indexOfFirstCategory = indexOfLastCategory - usersPerPage;
  const currentCategories = categoryNames.slice(
    indexOfFirstCategory,
    indexOfLastCategory
  );

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Previous page
  const goToPreviousPage = () => {
    setCurrentPage((prevPage) => prevPage - 1);
  };

  // Next page
  const goToNextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        {errorMessage && <p className="alert alert-danger">{errorMessage}</p>}
        <div className="px-5 mt-5">
          <div className="row">
            <div className="form-group col-3">
              <label className="form-label" htmlFor="category_name">
                Category Name:
              </label>
              <input
                required
                className="form-control py-2"
                type="text"
                id="category_name"
                name="category_name"
                value={categoryName}
                onChange={(e) => setCategoryName(e.target.value)}
              />
            </div>
          </div>

          <div>
            <button className="btn btn-primary mt-3 px-5" type="submit">
              {category ? "Update Category" : "Create Category"}
            </button>
          </div>
        </div>
      </form>

      <div className="mt-5">
        <h2>Category List</h2>
        <table className="table">
          <thead>
            <tr>
              <th>#</th>
              <th>Category Name</th>
            </tr>
          </thead>
          
            <tbody>
              {currentCategories.map((category, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{category.category_name}</td>
                  <td>
                    <button
                      className="btn btn-primary"
                      onClick={() => handleUpdateCategory(category)}
                    >
                      Update
                    </button>
                  </td>
                  <td>

                  {userInfo.role === "admin" && (
                    <button
                      className={`btn btn-danger btn-sm ${
                        btnLoading ? "btn-loading" : ""
                      }`}
                      onClick={() => handleDeleteCategory(category)}
                    >
                      Delete
                    </button>
                  )}

                  </td>
                </tr>
              ))}
            </tbody>
          
        </table>

        <ul className="pagination">
          <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
            <button className="page-link" onClick={goToPreviousPage}>
              Previous
            </button>
          </li>
          {Array.from({
            length: Math.ceil(categoryNames.length / usersPerPage),
          }).map((_, index) => (
            <li
              key={index}
              className={`page-item ${
                currentPage === index + 1 ? "active" : ""
              }`}
            >
              <button className="page-link" onClick={() => paginate(index + 1)}>
                {index + 1}
              </button>
            </li>
          ))}
          <li
            className={`page-item ${
              currentPage === Math.ceil(categoryNames.length / usersPerPage)
                ? "disabled"
                : ""
            }`}
          >
            <button className="page-link" onClick={goToNextPage}>
              Next
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default AddCategory;