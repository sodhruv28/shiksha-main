// components/PasswordResetForm.js
import React, { useState } from "react";
import axios from "axios";

const PasswordResetForm = () => {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [error, setError] = useState("");

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleForgotPassword = async (e) => {
    e.preventDefault();
    setIsLoading(true); // Start loading
  
    try {
      await axios.put("http://localhost:8080/api/user/forgot", { email });
      setSuccessMessage("Password reset email sent. Check your inbox.");
      setError("");
    } catch (error) {
      console.error("Error sending password reset email:", error);
      setSuccessMessage("");
      setError("An error occurred. Please try again.");
    } finally {
      setIsLoading(false); // End loading
    }
  };

  return (
    <div>
       <div className="auth-wrapper">
    <div className="auth-inner">
    <div className="container">
      <form onSubmit={handleForgotPassword}>
      <div className="form-group mb-3">
          <label htmlFor="email" className="form-label">
            Email:
          </label>
          <input
            type="email"
            id="email"
            className="form-control"
            value={email}
            onChange={handleEmailChange}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary mt-2 px-5" disabled={isLoading}>
  {isLoading ? 'Sending...' : 'Reset Password'}
</button>      </form>
      {successMessage && <p style={{ color: "green" }}>{successMessage}</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}
      </div>
      </div>
      </div>
    </div>
  );
};

export default PasswordResetForm;
