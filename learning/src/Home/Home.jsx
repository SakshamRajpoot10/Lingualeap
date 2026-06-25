import React, { useEffect } from 'react';
import '../Home/Home.css';

import About from './About';
import Service from './Service';
import Review from './Review';
import LoginPortal from './LoginPortal';
import Tutor from './Tutor';
import Footer from '../Layouts/Footer';
import Header from '../Layouts/Header';
import { Link, useLocation } from 'react-router-dom';

function Home() {
  const location = useLocation();

  useEffect(() => {
    let targetId = '';
    if (location.pathname === '/about') targetId = 'about';
    else if (location.pathname === '/service') targetId = 'services';
    else if (location.pathname === '/footer') targetId = 'footer';

    if (targetId) {
      const element = document.getElementById(targetId);
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth' });
        }, 150);
      }
    } else if (location.state && location.state.scrollTo) {
      const element = document.getElementById(location.state.scrollTo);
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth' });
        }, 150);
      }
    }
  }, [location]);
  return (
    <>
      {/* <Header /> */}
      <div className="hero-section">
        <div className="hero-bg-shapes">
          <div className="hero-shape hero-shape-1"></div>
          <div className="hero-shape hero-shape-2"></div>
          <div className="hero-shape hero-shape-3"></div>
        </div>
        <div className="container">
          <div className="row align-items-center hero-row">
            <div className="col-lg-6 col-md-6 hero-text-col">
              <div className="hero-content">
                <h1 className="hero-title">
                  Welcome to <span className="hero-highlight">Lingua Leap</span>
                </h1>
                <p className="hero-subtitle">Learn, Connect and Grow</p>
                <p className="hero-description">
                  Master new languages with personalized 1-on-1 tutoring sessions. 
                  Connect with expert teachers worldwide and accelerate your learning journey.
                </p>
                <div className="hero-buttons">
                  <Link to="/loginportal" className="btn btn-primary hero-btn-primary">
                    Get Started
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <line x1="5" y1="12" x2="19" y2="12"></line>
                      <polyline points="12 5 19 12 12 19"></polyline>
                    </svg>
                  </Link>
                  <Link to="/about" className="btn hero-btn-outline">
                    Learn More
                  </Link>
                </div>
                <div className="hero-stats">
                  <div className="hero-stat">
                    <span className="hero-stat-number">500+</span>
                    <span className="hero-stat-label">Students</span>
                  </div>
                  <div className="hero-stat-divider"></div>
                  <div className="hero-stat">
                    <span className="hero-stat-number">50+</span>
                    <span className="hero-stat-label">Teachers</span>
                  </div>
                  <div className="hero-stat-divider"></div>
                  <div className="hero-stat">
                    <span className="hero-stat-number">16+</span>
                    <span className="hero-stat-label">Languages</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-6 col-md-6 hero-image-col">
              <div className="hero-image-wrapper">
                <img src="image/home.png" alt="Lingua Leap - Learn Languages Online" className="hero-image" />
                <div className="hero-image-glow"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <About />
      <LoginPortal />
      <Service />
      <Review />
      <Tutor />
      <Footer />
    </>
  );
}

export default Home;