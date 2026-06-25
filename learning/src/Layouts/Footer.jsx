import React from 'react';
import './Footer.css';

function Footer() {
  return (
    <footer className="container-fluid background text py-5" id="footer">
      <div className="container">
        <div className="row justify-content-between">
          {/* Column 1: Brand & Description */}
          <div className="col-md-5 mb-4 mb-md-0 text-start">
            <h3 className="d-flex align-items-center mb-3 text-white fw-bold">
              <img src="image/footer.png" alt="Lingua Leap Logo" style={{ width: 36, marginRight: 12 }} />
              <span>Lingua Leap</span>
            </h3>
            <p className="text-muted-light mb-4">
              Master new languages with personalized 1-on-1 tutoring sessions. Connect with expert teachers worldwide and accelerate your learning journey.
            </p>
            <p className="textfont text-muted-light mb-0">
              &copy; 2026 Lingua Leap. All Rights Reserved.
            </p>
          </div>

          {/* Column 2: Contact Us */}
          <div className="col-md-3 mb-4 mb-md-0 text-start">
            <h3 className="fw-bold text-white mb-3">Contact Us</h3>
            <ul className="list-unstyled contact-list mt-3">
              <li className="mb-3 d-flex align-items-center">
                <img src="image/phone.png" alt="Phone" className="images" />
                <a href="tel:+1234567890" className="footer-link">+1 234 567 890</a>
              </li>
              <li className="d-flex align-items-center">
                <img src="image/email.png" alt="Email" className="images" />
                <a href="mailto:info@lingualeap.com" className="footer-link">info@lingualeap.com</a>
              </li>
            </ul>
          </div>

          {/* Column 3: Quick Links */}
          <div className="col-md-3 text-start">
            <h3 className="fw-bold text-white mb-3">Quick Links</h3>
            <ul className="list-unstyled quick-links mt-3">
              <li className="mb-2"><a href="/terms" className="footer-link">Terms and Conditions</a></li>
              <li className="mb-2"><a href="/languages" className="footer-link">Language Selection</a></li>
              <li className="mb-2"><a href="/book-slot" className="footer-link">Book a Slot</a></li>
              <li><a href="/loginportal" className="footer-link">Sign In / Log In</a></li>
            </ul>
          </div>
        </div>

        <hr className="my-4" />

        <div className="row align-items-center">
          <div className="col-md-6 text-center text-md-start">
            <span className="textfont text-muted-light">Designed by Lingua Leap</span>
          </div>
          <div className="col-md-6 text-center text-md-end mt-2 mt-md-0">
            <a href="/privacy-policy" className="footer-link me-3">Privacy Policy</a>
            <span className="text-muted-light">/</span>
            <a href="/terms" className="footer-link ms-3">Terms & Conditions</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;