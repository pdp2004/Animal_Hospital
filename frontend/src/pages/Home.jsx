import React from 'react';
// import { Link } from 'react-router-dom';
import ImageCard from './ImageCard';
import FeaturesSection from './FeaturesSection';
import ServicesPreview from '../services/ServicesPreview';
import DoctorSlider from './DoctorSlider';
import Slider from './Slider';
import Footer from '../components/Footer';
import "./Home.css";

const Home = () => {
  // Get user from localStorage (adjust based on your auth implementation)
  const user = JSON.parse(localStorage.getItem('user'));

  return (
    <div className="home-container">
      <ImageCard />
      <FeaturesSection />
      <ServicesPreview />
      <DoctorSlider />
      <Slider />

      {/* Testimonials */}
      <section className="testimonials-section">
        <div className="container">
          <h2>What Pet Owners Say</h2>
          <div className="testimonials-grid">
            <div className="testimonial-card">
              <div className="testimonial-text">
                "The staff at Animal Hospital saved my dog's life during an emergency. Their care and compassion are unmatched!"
              </div>
              <div className="testimonial-author">
                <strong>Sarah Johnson</strong>
                <span>Dog Owner</span>
              </div>
            </div>
            <div className="testimonial-card">
              <div className="testimonial-text">
                "Professional, caring, and always available. They've been taking care of our cats for years with exceptional service."
              </div>
              <div className="testimonial-author">
                <strong>Mike Chen</strong>
                <span>Cat Owner</span>
              </div>
            </div>
            <div className="testimonial-card">
              <div className="testimonial-text">
                "The best veterinary care in town! Their advanced facilities and knowledgeable staff give me peace of mind."
              </div>
              <div className="testimonial-author">
                <strong>Emily Rodriguez</strong>
                <span>Bird Owner</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Emergency Banner */}
      <section className="emergency-banner">
        <div className="container">
        <h2>🚨 24/7 Emergency Veterinary Services</h2>
          <div className="emergency-content">
            <div className="emergency-info"> 
              <p>For immediate and expert care of your pet, our veterinary team is available around the clock. Please do not hesitate to reach out if your pet requires urgent medical attention.</p>
              <div className="emergency-contact">
                <strong>Emergency Hotline: (555) 123-HELP</strong>
                <span>After-Hours Assistance: (555) 555-EMER</span>
              </div>
            </div>
            <div className="emergency-actions">
              <button className="btn-emergencyy">
                📞 Call for Immediate Assistance
              </button>
            </div>
          </div>
        </div>
      </section>


      {/* CTA Section */}
      {/* <section className="cta-section">
        <div className="container">
          <div className="cta-content">
            <h2>Ready to Give Your Pet the Best Care?</h2>
            <p>Join thousands of pet owners who trust us with their furry family members</p>
            <div className="cta-buttons">
              {user ? (
                <Link to="/appointments" className="btn-primary btn-large">
                  Book Appointment
                </Link>
              ) : (
                <Link to="/register" className="btn-primary btn-large">
                  Create Account
                </Link>
              )}
            </div>
          </div>
        </div>
      </section> */}

      <Footer />
    </div>
  );
};

export default Home;
