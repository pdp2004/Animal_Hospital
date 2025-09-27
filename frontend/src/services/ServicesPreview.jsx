import React from "react";
import "./ServicesPreview.css";

const ServicesPreview = () => {
  return (
    <section className="services-preview">
        <div className="container">
            <h2 className="section-title">Our Services</h2>

            <div className="services-grid">
                <div className="service-preview-card fade-in">
                    <h3>🐕 Wellness Exams</h3>
                    <p>Regular check-ups to keep your pet healthy and happy</p>
                </div>

                <div className="service-preview-card fade-in delay-1">
                    <h3>💉 Vaccinations</h3>
                    <p>Complete vaccination programs for disease prevention</p>
                </div>

                <div className="service-preview-card fade-in delay-2">
                    <h3>🦷 Dental Care</h3>
                    <p>Professional dental cleaning and oral health services</p>
                </div>

                <div className="service-preview-card fade-in delay-3">
                    <h3>🔪 Surgery</h3>
                    <p>Advanced surgical procedures in a safe environment</p>
                </div>

                <div className="service-preview-card fade-in delay-4">
                    <h3>📋 Diagnostics</h3>
                    <p>Comprehensive lab work and imaging services</p>
                </div>

                <div className="service-preview-card fade-in delay-5">
                    <h3>🍎 Nutrition</h3>
                    <p>Dietary counseling and nutritional planning</p>
                </div>
            </div>

            <div className="text-center">
                <a href="/services" className="btn-primary">
                    View All Services
                </a>
            </div>
        </div>
    </section>
  );
};

export default ServicesPreview;
