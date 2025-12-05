import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import './Logout.css';

function Logout() {
  const navigate = useNavigate();

  useEffect(() => {
    // Clear localStorage or any auth tokens
    localStorage.removeItem("user");
    
    // Optionally show a message before redirecting
    setTimeout(() => {
      navigate("/login"); // Redirect to homepage or login
    }, 1000);
  }, [navigate]);

  return (
    <div className="container text-center mt-5">
      <h3>🔒 Logging out...</h3>
      <p>You will be redirected shortly.</p>
    </div>
  );
}

export default Logout;