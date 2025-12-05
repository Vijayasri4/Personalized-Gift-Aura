import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Header.css";

function Header() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user")); // check login state

  const handleLogout = () => {
    localStorage.removeItem("user"); // clear user data
    navigate("/login"); // redirect to login page
  };

  return (
    <nav className="custom-navbar">
      <div className="nav-container">
        {/* Brand / Logo */}
        <Link className="brand" to="/">
          GIFT AURA
        </Link>

        {/* Navigation Links */}
        <div className="nav-links">
          <Link className="nav-item" to="/">
            Home
          </Link>
          <Link className="nav-item" to="/orders">
            Order
          </Link>
          <Link className="nav-item" to="/cart">
            Cart
          </Link>

          {/* ✅ Show “My Orders” only when logged in */}
          {user && (
            <Link className="nav-item" to="/my-orders">
              My Orders
            </Link>
          )}

          {/* ✅ Conditional Login/Logout */}
          {user ? (
            <button className="nav-item logout-btn" onClick={handleLogout}>
              Logout
            </button>
          ) : (
            <Link className="nav-item" to="/login">
              Login
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Header;
