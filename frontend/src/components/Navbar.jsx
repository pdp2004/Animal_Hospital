import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Navbar.css";

const Navbar = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user"));

  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <nav className="navbar">
      <div className="nav-container">
        {/* Logo */}
        <Link to="/" className="nav-logo">
          <i className="fas fa-paw"></i> Animal Hospital
        </Link>

        {/* Hamburger Menu */}
        <div
          className={`hamburger ${menuOpen ? "active" : ""}`}
          onClick={toggleMenu}
        >
          <span></span>
          <span></span>
          <span></span>
        </div>

        {/* Navigation Menu */}
        <div className={`nav-menu ${menuOpen ? "active" : ""}`}>
          <Link
            to="/"
            className="nav-link"
            onClick={() => setMenuOpen(false)}
          >
            Home
          </Link>
          <Link
            to="/services"
            className="nav-link"
            onClick={() => setMenuOpen(false)}
          >
            Services
          </Link>

          {token ? (
            <>
              {/* Admin Routes */}
              {user?.role === "admin" && (
                <>
                  <Link
                    to="/dashboard"
                    className="nav-link"
                    onClick={() => setMenuOpen(false)}
                  >
                    Dashboard
                  </Link>
                  <Link
                    to="/patients"
                    className="nav-link"
                    onClick={() => setMenuOpen(false)}
                  >
                    Patients
                  </Link>
                </>
              )}

              {/* User Routes */}
              {user?.role === "user" && (
                <Link
                  to="/my-appointments"
                  className="nav-link"
                  onClick={() => setMenuOpen(false)}
                >
                  My Appointments
                </Link>
              )}

              {/* Logout Button */}
              <div className="nav-user">
                <button onClick={handleLogout} className="logout-btn">
                  Logout
                </button>
              </div>
            </>
          ) : (
            <div className="nav-auth">
              <Link
                to="/login"
                className="nav-link"
                onClick={() => setMenuOpen(false)}
              >
                Login
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
