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
      <ImageCard/>
      <FeaturesSection/>
      <ServicesPreview/>
      <DoctorSlider/>
      <Slider/>

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
          <div className="emergency-content">
            <div className="emergency-info">
              <h2>🚨 Emergency Services Available 24/7</h2>
              <p>If your pet needs immediate medical attention, don't wait. Call our emergency line now.</p>
              <div className="emergency-contact">
                <strong>Emergency Hotline: (555) 123-HELP</strong>
                <span>After-hours: (555) 555-EMER</span>
              </div>
            </div>
            <div className="emergency-actions">
              <button className="btn-emergency">
                📞 Call Now
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

      <Footer/>
    </div>
  );
};

export default Home;
