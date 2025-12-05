import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "./Login.css";

function Login() {
  const [formData, setFormData] = useState({ email: "", Password: "" });
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();
  const redirectTo = location.state?.from || "/orders"; // ✅ redirect after login

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleSubmit = async (e) => {
  e.preventDefault();
  setMessage("");
  setLoading(true);

  try {
    const res = await fetch("http://localhost:6005/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });

    const result = await res.json();

    if (res.ok && result.user) {
      localStorage.setItem("user", JSON.stringify(result.user));
      setMessage("✅ Login successful! Redirecting...");
      setTimeout(() => {
        navigate("/orders", { replace: true }); // ✅ always redirect to orders
      }, 800);
    } else {
      setMessage(`❌ ${result.message || "Invalid credentials"}`);
    }
  } catch (error) {
    console.error("Login error:", error);
    setMessage("❌ Server error. Please try again later.");
  } finally {
    setLoading(false);
  }};


  return (
    <div className="login-container">
      <div className="login-card">
        <div className="card-header">
          <h4>Login to Your Account</h4>
        </div>
        <div className="card-body">
          <form onSubmit={handleSubmit}>
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
                type="password"
                id="Password"
                className="form-control"
                value={formData.Password}
                onChange={handleChange}
                required
              />
            </div>

            <button type="submit" className="btn-primary-custom" disabled={loading}>
              {loading ? "Logging in..." : "Login"}
            </button>

            <div className="link-group">
              <button
                type="button"
                className="btn-link-custom"
                onClick={() => navigate("/reset-password")}
              >
                Forgot Password?
              </button>
            </div>

            <div className="signup-group">
              <p>Don't have an account?</p>
              <button
                type="button"
                className="btn-outline-custom"
                onClick={() => navigate("/register")}
              >
                Sign Up
              </button>
            </div>
          </form>

          {message && <div className="message">{message}</div>}
        </div>
      </div>
    </div>
  );
}

export default Login;
