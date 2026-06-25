import React from 'react';
import '../Layouts/Header.css';
import { Link, useLocation, useNavigate } from 'react-router-dom';

function Header() {
  const location = useLocation();
  const navigate = useNavigate();

  // Hide landing page header on dashboard routes to keep layouts professional
  const publicPaths = ['/', '/loginportal', '/studentsignup', '/studentlogin', '/teachersignup', '/teacherlogin', '/admin'];
  if (!publicPaths.includes(location.pathname)) {
    return null;
  }

  const handleNavClick = (sectionId) => {
    if (location.pathname === '/') {
      if (sectionId === 'home') {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else {
        const element = document.getElementById(sectionId);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }
    } else {
      navigate('/', { state: { scrollTo: sectionId } });
    }
  };

  return (
    <nav className="navbar navbar-expand-lg header-navbar">
      <div className="container">
        <div className="navbar-brand d-flex align-items-center" onClick={() => handleNavClick('home')} style={{ cursor: 'pointer' }}>
          <img src="image/lingua.png" alt="Lingua Leap" className="header-logo" />
        </div>
        <button
          className="navbar-toggler header-toggler"
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
          <div className="navbar-nav ms-auto align-items-center header-nav-items">
            <span className="nav-item nav-link" onClick={() => handleNavClick('home')} style={{ cursor: 'pointer' }}>
              Home
            </span>
            <span className="nav-item nav-link" onClick={() => handleNavClick('about')} style={{ cursor: 'pointer' }}>
              About
            </span>
            <span className="nav-item nav-link" onClick={() => handleNavClick('services')} style={{ cursor: 'pointer' }}>
              Services
            </span>
            <span className="nav-item nav-link" onClick={() => handleNavClick('footer')} style={{ cursor: 'pointer' }}>
              Contact Us
            </span>
            <Link className="header-cta-btn" to="/loginportal">
              Get Started
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="9 18 15 12 9 6"></polyline>
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Header;