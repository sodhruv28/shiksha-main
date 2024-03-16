import React, { useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function ResetPasswordForm() {
  const { token } = useParams();
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleResetPassword = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage("");

    if (newPassword.length <= 6) {
      return setErrorMessage("Password must be at least 6 characters long");
    }

    if (newPassword !== confirmPassword) {
      return setErrorMessage("Passwords do not match");
    }

    try {
      const response = await axios.post(
        "http://localhost:8080/api/user/reset",
        {
          token,
          newPassword,
          cpassword: confirmPassword,
        }
      );

      if (response.status >= 200 && response.status < 300) {
        toast.success("Password updated successfully!");
        navigate("/login");
      } else {
        setErrorMessage("Unexpected response from the server");
      }
    } catch (error) {
      if (error.response && error.response.data) {
        setErrorMessage(error.response.data.message);
      } else {
        setErrorMessage("An error occurred while updating the password.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="auth-wrapper">
        <div className="auth-inner">
          <div className="container">
            {loading }
            <form onSubmit={handleResetPassword}>
              <div className="form-group mb-3">
                <label htmlFor="password" className="form-label">
                  New Password:
                </label>
                <input
                  type="password"
                  id="password"
                  className="form-control"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  required
                />
              </div>
              <div className="form-group mb-3">
                <label htmlFor="confirmPassword" className="form-label">
                  Confirm Password:
                </label>
                <input
                  type="password"
                  id="confirmPassword"
                  className="form-control"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                />
              </div>

              <button type="submit" className="btn btn-primary mt-2 px-5">
                Reset Password
              </button>
            </form>

            {errorMessage && (
              <p className="alert alert-danger">{errorMessage}</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ResetPasswordForm;
