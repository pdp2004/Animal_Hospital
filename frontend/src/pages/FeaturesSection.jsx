import React from "react";
import "./FeaturesSection.css";

const FeaturesSection = () => {
  return (
    <section className="features-section">
      <div className="container">
        <h2 className="section-title">Why Choose Our Animal Hospital?</h2>
        <div className="features-grid">
          <div className="feature-card fade-in">
            <div className="feature-icon">⏰</div>
            <h3>24/7 Emergency Care</h3>
            <p>
              Round-the-clock emergency services for your pets when they need it
              most
            </p>
          </div>

          <div className="feature-card fade-in delay-1">
            <div className="feature-icon">👨‍⚕️</div>
            <h3>Expert Veterinarians</h3>
            <p>
              Board-certified veterinarians with years of experience in pet care
            </p>
          </div>

          <div className="feature-card fade-in delay-2">
            <div className="feature-icon">🔬</div>
            <h3>Advanced Technology</h3>
            <p>
              State-of-the-art equipment for accurate diagnosis and treatment
            </p>
          </div>

          <div className="feature-card fade-in delay-3">
            <div className="feature-icon">💖</div>
            <h3>Compassionate Care</h3>
            <p>We treat every pet like family with love and compassion</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
