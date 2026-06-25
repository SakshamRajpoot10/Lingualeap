import React from 'react';
import './Header2.css';
import { Link } from 'react-router-dom';

function Header2() {
  return (
    <nav className="navbar navbar-expand-lg navbar-light fonttsize background">
      <Link className="navbar-brand d-flex align-items-center" to="/">
        <img src="image/lingua.png" alt="Lingua Leap Logo" style={{ height: 38, marginRight: 8 }} />
        <span className="fw-bold ms-2" style={{ color: "#464bd8", fontSize: "1.3rem" }}>Lingua Leap</span>
      </Link>
      <button
        className="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarNavAltMarkup"
        aria-controls="navbarNavAltMarkup"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
        <div className="navbar-nav ms-auto">
          <Link className="nav-item nav-link teextblue" to="/">Home</Link>
          <Link className="nav-item nav-link" to="/about">Contact Us</Link>
          <Link className="nav-item nav-link" to="/services">Calendar</Link>
          <Link className="nav-item nav-link" to="/footer">Reviews</Link>
          <Link className="btn-getstarted nav-link btn text-white ms-lg-3 px-4 d-flex align-items-center" to="/loginportal">
            <img src="image/user.png" alt="User Icon" style={{ width: 24, height: 24, marginRight: 6 }} />
            <span className="d-none d-md-inline">Get Started</span>
          </Link>
        </div>
      </div>
    </nav>
  );
}

export default Header2;
