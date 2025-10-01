import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Navbar.css";

const Navbar = () => {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const token = localStorage.getItem("token");

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
    navigate("/login");
  };

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <nav className={`navbar ${menuOpen ? "navbar-open" : ""}`}>
      <div className="nav-container">
        {/* Logo */}
        <Link to="/" className="nav-logo" aria-label="Home">
          <i className="fas fa-paw"></i> Animal Hospital
        </Link>

        {/* Hamburger Menu */}
        <div
          className={`hamburger ${menuOpen ? "active" : ""}`}
          onClick={toggleMenu}
          aria-label="Toggle navigation menu"
        >
          <span className="bar"></span>
          <span className="bar"></span>
          <span className="bar"></span>
        </div>

        {/* Navigation Menu */}
        <div className={`nav-menu ${menuOpen ? "active" : ""}`}>
          <Link
            to="/"
            className="nav-link"
            onClick={() => setMenuOpen(false)}
            aria-label="Home"
          >
            Home
          </Link>
          <Link
            to="/services"
            className="nav-link"
            onClick={() => setMenuOpen(false)}
            aria-label="Services"
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
                    aria-label="Admin Dashboard"
                  >
                    Dashboard
                  </Link>
                  {/* <Link
                    to="/patients"
                    className="nav-link"
                    onClick={() => setMenuOpen(false)}
                    aria-label="Patients"
                  >
                    Patients
                  </Link> */}
                </>
              )}

              {/* User Routes */}
              {user?.role === "user" && (
                <Link
                  to="/my-appointments"
                  className="nav-link"
                  onClick={() => setMenuOpen(false)}
                  aria-label="My Appointments"
                >
                  My Appointments
                </Link>
              )}

              {/* Logout Button */}
              <div className="nav-user">
                <button
                  onClick={handleLogout}
                  className="logout-btn"
                  aria-label="Logout"
                >
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
                aria-label="Login"
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
