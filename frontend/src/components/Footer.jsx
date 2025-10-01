import React from 'react';
import './Footer.css';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="animal-footer">
      {/* Animated background elements */}
      <div className="footer-bg-animation">
        <div className="animal-paw animal-paw-1">🐾</div>
        <div className="animal-paw animal-paw-2">🐾</div>
        <div className="animal-paw animal-paw-3">🐾</div>
        <div className="animal-paw animal-paw-4">🐾</div>
      </div>

      <div className="footer-content">
        {/* Main footer sections */}
        <div className="footer-sections">
          <div className="footer-section">
            <h3>🐾 Animal Sanctuary</h3>
            <p>Dedicated to the protection and care of all animals. Join us in making a difference!</p>
          </div>

          <div className="footer-section">
            <h4>Quick Links</h4>
            <ul>
              <li><a href="/adopt">Adopt a Pet</a></li>
              <li><a href="/donate">Donate</a></li>
              <li><a href="/volunteer">Volunteer</a></li>
              <li><a href="/events">Events</a></li>
            </ul>
          </div>

          <div className="footer-section">
            <h4>Contact Info</h4>
            <p>📍 123 Forest Lane, Nature City</p>
            <p>📞 (555) 123-ANML</p>
            <p>✉️ info@animalsanctuary.org</p>
          </div>

          <div className="footer-section">
            <h4>Follow Us</h4>
            <div className="social-links">
              <a href="#" className="social-link" aria-label="Facebook">
                <i className="bi bi-facebook"></i>
              </a>
              <a href="#" className="social-link" aria-label="Instagram">
                <i className="bi bi-instagram"></i>
              </a>
              <a href="#" className="social-link" aria-label="Twitter">
                <i className="bi bi-twitter"></i>
              </a>
              <a href="#" className="social-link" aria-label="YouTube">
                <i className="bi bi-youtube"></i>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom section */}
        <div className="footer-bottom">
          <div className="footer-bottom-content">
            <p>&copy; {currentYear} Animal Sanctuary. All rights reserved.</p>
            <div className="footer-links">
              <a href="/privacy">Privacy Policy</a>
              <a href="/terms">Terms of Service</a>
              <a href="/sitemap">Sitemap</a>
            </div>
          </div>
        </div>
      </div>

      {/* Bootstrap Icons CDN */}
      <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.0/font/bootstrap-icons.css" />
    </footer>
  );
};

export default Footer;