import React, { useState, useEffect } from "react";
import axios from "axios";
import LoadingAnimation from "../../components/loaders/LoadingAnimation";
import { toast } from "react-toastify";

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [usersPerPage] = useState(10); // Number of users to display per page
  const [searchTerm, setSearchTerm] = useState(""); // Search term state
  const [currentUser, setcurrentUser] = useState({});
  const [currentUserRole, setcurrentUserRole] = useState(""); // State to hold the current user's role
  const [loadingRole, setLoadingRole] = useState(true); // Loading state for current user's role

  useEffect(() => {
    // Fetch user data
    axios
      .get("http://localhost:8080/api/user/fetch-allusers", {
        withCredentials: true,
      })
      .then((response) => {
        setUsers(response.data.users);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching users:", error);
        setLoading(false);
      });

    // Fetch current user's information
    axios
      .get("http://localhost:8080/api/user/current-user", {
        withCredentials: true,
      })
      .then((response) => {
        setcurrentUser(response.data.user);
        setcurrentUserRole(response.data.user.role); // Set current user's role
        setLoadingRole(false); // Update loading state after role is fetched
      })
      .catch((error) => {
        console.error("Error fetching current user:", error);
        setLoadingRole(false); // Update loading state in case of error
      });
  }, [setUsers, setcurrentUser, setcurrentUserRole]);

  // Calculate the indexes of the first and last users to display on the current page
  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;

  // Filter users based on the search term
  const filteredUsers = users.filter((user) =>
    Object.values(user)
      .join(" ")
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
  );

  // Slice the filtered users for pagination
  const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);

  // Function to change the current page
  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // Function to go to the previous page
  const goToPreviousPage = () => {
    if (currentPage > 1) {
      paginate(currentPage - 1);
    }
  };

  // Function to go to the next page
  const goToNextPage = () => {
    if (currentPage < Math.ceil(filteredUsers.length / usersPerPage)) {
      paginate(currentPage + 1);
    }
  };

  // Function to handle deleting a user
  const handleDeleteUser = (userId) => {
    if (currentUserRole !== "admin") {
      toast.error("Only admin users can change roles.");
      return;
    }
    setLoading(true);
    // Send a request to delete the user
    axios
      .delete(`http://localhost:8080/api/user/delete/${userId}`, {
        withCredentials: true,
      })
      .then((response) => {
        // Refetch users after deletion
        axios
          .get("http://localhost:8080/api/user/fetch-allusers", {
            withCredentials: true,
          })
          .then((response) => {
            setUsers(response.data.users);
          })
          .catch((error) => {
            console.error("Error fetching users:", error);
          });
        setLoading(false);
        toast.success("User Deleted Successfully!");
      })
      .catch((error) => {
        console.error("Error deleting user:", error);
        setLoading(false);
        toast.error("Error Deleting User");
      });
  };

  // Function to handle editing a user's role
  const handleEditUser = (userId, newRole) => {
    // Check if the user's role is "admin"
    // if (currentUserRole !== "admin") {
    //   toast.error("Only admin users can change roles.");
    //   return;
    // }
  
    setLoading(true);
    // Send a request to update the user's role
    axios
      .put(
        `http://localhost:8080/api/user/role/${userId}`,
        { role: newRole },
        {
          withCredentials: true,
        }
      )
      .then((response) => {
        // Refetch users after role change
        axios
          .get("http://localhost:8080/api/user/fetch-allusers", {
            withCredentials: true,
          })
          .then((response) => {
            setUsers(response.data.users);
            toast.success(
              `${newRole === "admin" ? "user" : "admin"} maked ${newRole}`
            );
          })
          .catch((error) => {
            console.error("Error fetching users:", error);
            toast.error("Error Changing Role");
          });
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error updating user role:", error);
        setLoading(false);
      });
  };

  const handleEdit = (userId, newRole) => {
    // Check if the user's role is "admin"
    if (currentUserRole !== "admin") {
      toast.error("Only admin users can change roles.");
      return;
    }
  
    setLoading(true);
    // Send a request to update the user's role
    axios
      .put(
        `http://localhost:8080/api/user/role/${userId}`,
        { role: newRole },
        {
          withCredentials: true,
        }
      )
      .then((response) => {
        // Refetch users after role change
        axios
          .get("http://localhost:8080/api/user/fetch-allusers", {
            withCredentials: true,
          })
          .then((response) => {
            setUsers(response.data.users);
            toast.success(
              `${newRole === "admin" ? "user" : "admin"} maked ${newRole}`
            );
          })
          .catch((error) => {
            console.error("Error fetching users:", error);
            toast.error("Error Changing Role");
          });
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error updating user role:", error);
        setLoading(false);
      });
  };
  
  // Function to capitalize the first character of a string
  const capitalizeFirstLetter = (str) => {
    if (str && typeof str === "string") {
      return str.charAt(0).toUpperCase() + str.slice(1);
    }
    return str;
  };

  return (
    <div className="container mt-5">
      <h2>User List</h2>

      {/* Search Input */}
      <div className="mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="Search by firstname, lastname, email, username, mobilenumber, or gender"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {loading ? (
        <div>
          <LoadingAnimation></LoadingAnimation>
        </div>
      ) : (
        <div className="">
          <table className="table">
            <thead>
              <tr>
                <th>Username</th>
                <th>Email</th>
                <th>Role</th>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Mobile Number</th>
                <th>Gender</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {currentUsers.map((user) => (
                <tr key={user._id}>
                  <td>{capitalizeFirstLetter(user.username)}</td>
                  <td>{user.email}</td>
                  <td>{capitalizeFirstLetter(user.role)}</td>
                  <td>{capitalizeFirstLetter(user.firstname)}</td>
                  <td>{capitalizeFirstLetter(user.lastname)}</td>
                  <td>{user.mobilenumber}</td>
                  <td>{capitalizeFirstLetter(user.gender)}</td>
                  <td>
                  { (currentUserRole === 'admin' || currentUserRole === 'sub-admin') && user.role !== 'admin' ? (
                                    <>
                                        {user.role === "sub-admin" ? (
                                          <button
                                            className="btn btn-primary btn-sm mx-2"
                                            onClick={() => handleEdit(user._id, "user")}
                                          >
                                            Make User 
                                          </button>
                                        ) : (
                                          <button
                                            className="btn btn-primary btn-sm mx-2"
                                            onClick={() => handleEdit(user._id, "sub-admin")}
                                          >
                                            Make Sub-Admin
                                          </button>
                                        )}
                                        {user.role === "instructor" ? (
                                          <button
                                            className="btn btn-primary btn-sm mx-2"
                                          >
                                            Instructor
                                          </button>
                                        ) : (
                                          <button
                                            className="btn btn-primary btn-sm mx-2"
                                            onClick={() => handleEditUser(user._id, "instructor")}
                                          >
                                            Make Instructor
                                          </button>
                                        )}
                                        {/* Only allow admin to delete users */}
                                        <button
                                            className="btn btn-danger btn-sm"
                                            onClick={() => handleDeleteUser(user._id)}
                                        >
                                            Delete
                                        </button>
                                    </>
                                ) : null}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Pagination */}
          <ul className="pagination">
            <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
              <button className="page-link" onClick={goToPreviousPage}>
                Previous
              </button>
            </li>
            {Array.from({
              length: Math.ceil(filteredUsers.length / usersPerPage),
            }).map((_, index) => (
              <li
                key={index}
                className={`page-item ${
                  currentPage === index + 1 ? "active" : ""
                }`}
              >
                <button
                  className="page-link"
                  onClick={() => paginate(index + 1)}
                >
                  {index + 1}
                </button>
              </li>
            ))}
            <li
              className={`page-item ${
                currentPage === Math.ceil(filteredUsers.length / usersPerPage)
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
      )}
    </div>
  );
};

export default UserList;
