import React from "react";
import { Link } from 'react-router-dom';
import "./ImageCard.css";

import ownerImg from "../assets/owner.png";
import dogImg from "../assets/dog.png";
import catImg from "../assets/cat.png";
import cat2Img from "../assets/cat2.png";

const PetShop = () => {
  // Get user from localStorage (adjust if you store differently)
  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <div className="petshop-container">
      {/* Left Section */}
      <div className="petshop-left">
        <h1 className="title">Compassionate Care for Your Beloved Pets</h1>
        <p className="desc">
          24/7 emergency services, advanced treatments, and a team that loves your pets as much as you do
        </p>

        <div className="hero-buttons">
          {/* Not logged in */}
          {!user && (
            <>
              <Link to="/register" className="shop-btn">
                Get Started
              </Link>
              <Link to="/services" className="shop-btn">
                Our Services
              </Link>
            </>
          )}

          {/* Logged in as User */}
          {user?.role === "user" && (
            <Link to="/bookappointment" className="btn-primary btn-large">
              Book an Appointment
            </Link>
          )}

          {/* Logged in as Admin */}
          {user?.role === "admin" && (
            <Link to="/dashboard" className="btn-primary btn-large">
              Go to Dashboard
            </Link>
          )}
        </div>
      </div>

      {/* Right Section */}
      <div className="petshop-right">
        <div className="owner">
          <img src={ownerImg} alt="Owner" className="owner-img" />
          <img src={dogImg} alt="Dog" className="dog bounce" />
          <img src={catImg} alt="Cat" className="cat wave" />
          <img src={cat2Img} alt="Cat2" className="cat2 blink" />
        </div>
      </div>
    </div>
  );
};

export default PetShop;
