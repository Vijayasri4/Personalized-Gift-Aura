import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import './Register.css';
function Register() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    Password: "",
    confirmPassword: ""
  });
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [id]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    if (formData.Password !== formData.confirmPassword) {
      setMessage("❌ Passwords do not match");
      return;
    }

    try {
      const res = await fetch("http://localhost:6005/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const result = await res.json();

      if (res.ok) {
        localStorage.setItem("user", JSON.stringify(result.user));
        console.log("Registered user:", result);
        navigate("/login");
      } else {
        setMessage(`❌ ${result.message}`);
      }
    } catch (error) {
      console.error("Register error:", error);
      setMessage("❌ Server error");
    }
  };

  return (
    <div className="register-container">
      <div className="register-card">
        <div className="card-header">
          <h4>Create Your Account</h4>
        </div>
        <div className="card-body">
          <form onSubmit={handleSubmit}>
            <div className="input-group">
              <label htmlFor="name" className="form-label">Full Name</label>
              <input
                type="text"
                id="name"
                className="form-control"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>
            <div className="input-group">
              <label htmlFor="email" className="form-label">Email Address</label>
              <input
                type="email"
                id="email"
                className="form-control"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
            <div className="input-group">
              <label htmlFor="Password" className="form-label">Password</label>
              <input
                type="Password"
                id="Password"
                className="form-control"
                value={formData.Password}
                onChange={handleChange}
                required
              />
            </div>
            <div className="input-group">
              <label htmlFor="confirmPassword" className="form-label">Confirm Password</label>
              <input
                type="password"
                id="confirmPassword"
                className="form-control"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
              />
            </div>

            <button type="submit" className="btn-primary-custom">Register</button>

            <div className="login-group">
              <p>Already have an account?</p>
              <button
                type="button"
                className="btn-outline-custom"
                onClick={() => navigate("/login")}
              >
                Login
              </button>
            </div>
          </form>

          {message && <div className="message">{message}</div>}
        </div>
      </div>
    </div>
  );
}

export default Register;
