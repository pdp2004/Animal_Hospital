import React from 'react';
import ImageCard from './ImageCard';
import FeaturesSection from './FeaturesSection';
import ServicesPreview from '../services/ServicesPreview';
import DoctorSlider from './DoctorSlider';
import Slider from './Slider';
import Footer from '../components/Footer';
import "./Home.css";
import { Link } from "react-router-dom";

const Home = () => {
  // Get user from localStorage (adjust based on your auth implementation)
  const user = JSON.parse(localStorage.getItem('user'));

  return (
    <div className="home-container">

      {/* Hero Section */}
      <section className="hero" id="home">
        <div className="container">
          <div className="hero-content">
            <h1>Professional Services</h1>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
            {/* <a href="#contact" className="btn">Get in Touch</a> */}
            <Link to="/bookappointment"><button  className="btn">Get in Touch</button></Link>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="main-content">
        <div className="container">
          <h2>Welcome to Animal Hospital</h2>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
          {/* <a href="#about" className="btn">Learn More</a> */}
          <Link to="/bookappointment"><button  className="btn">Get in Touch</button></Link>
        </div>
      </section>

      {/* Your Existing Components */}
      {/* <ImageCard /> */}
      <FeaturesSection />
      {/* <ServicesPreview /> */}
      {/* <DoctorSlider /> */}
      <Slider />

 
      {/* Testimonials */}

      {/* Emergency Banner */}
      <section className="emergency-banner">
        <div className="container">
          <h2>🚨 24/7 Emergency Veterinary Services</h2>
          <div className="emergency-content">
            <div className="emergency-info"> 
              <p>For immediate and expert care of your pet, our veterinary team is available around the clock. Please do not hesitate to reach out if your pet requires urgent medical attention.</p>
            </div>
            <div className="emergency-actions">
              <button className="btn-emergencyy">
                📞 Call for Immediate Assistance
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer>
        <div className="container">
          <div className="footer-content">
            <div className="footer-section">
              <h3>Company</h3>
              <ul>
                <li><a href="#home">Home</a></li>
                <li><a href="#about">About Us</a></li>
                <li><a href="#services">Services</a></li>
                <li><a href="#cases">Cases</a></li>
                <li><a href="#contact">Contact Us</a></li>
              </ul>
            </div>
            <div className="footer-section">
              <h3>Services</h3>
              <ul>
                <li><a href="#commercial">Commercial Cleaning</a></li>
                <li><a href="#office">Office Cleaning</a></li>
                <li><a href="#building">Building Cleaning</a></li>
                <li><a href="#floor">Floor Cleaning</a></li>
                <li><a href="#apartment">Apartment Cleaning</a></li>
              </ul>
            </div>
            <div className="footer-section">
              <div className="contact-info">
                <p>152-515-6565</p>
                <p>Animalhospital@gmail.com</p>
                <p>New Orleans, USA</p>
              </div>
            </div>
          </div>
          <div className="copyright">
            <p>&copy; 2025 Animal Hospital. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;