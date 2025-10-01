import React from "react";
import { Link } from 'react-router-dom';
import "./ImageCard.css";

const PetShop = () => {
  // Get user from localStorage (adjust if you store differently)
  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <div className="petshop-container">
      {/* Header Section */}
      <header className="petshop-header">
        <div className="header-content">
          <div className="stats-section">
            <div className="stat-item">
              <span className="stat-number">10k+</span>
              <span className="stat-label">Satisfied Clients</span>
            </div>
            <div className="text-section">
              <h1 className="header-title">There is nothing more important to us than your pet</h1>
              <p className="header-subtitle">
                Pets are humanizing. They remind us we have an obligation and responsibility to preserve and nurture and care for all life.
              </p>
            </div>
          </div>
        </div>
      </header>


      {/* Main Content */}
      <div className="petshop-main">
        {/* Left Content Section */}
        <div className="petshop-left">
          <div className="content-wrapper">
            <p className="section-desc">
              24/7 emergency services, advanced treatments, and a team that loves your pets as much as you do
            </p>

            <div className="cta-sectionn">
              {/* Not logged in */}
              {!user && (
                <div className="cta-buttons">
                  <Link to="/register" className="cta-btn primary">
                    Get Started
                  </Link>
                  <Link to="/services" className="cta-btn secondary">
                    Our Services
                  </Link>
                </div>
              )}

              {/* Logged in as User */}
              {user?.role === "user" && (
                <Link to="/bookappointment" className="cta-btn primary large">
                  Book an Appointment
                </Link>
              )}

              {/* Logged in as Admin */}
              {user?.role === "admin" && (
                <div className="cta-buttons">
                  <Link to="/dashboard" className="cta-btn primary large">
                    Go to Dashboard
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Right Image Section */}
        <div className="petshop-right">
          <div className="image-container">
            <div className="main-image">
              <img src="/images/2.png" alt="Happy pet owner with their dog" className="owner-img" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PetShop;