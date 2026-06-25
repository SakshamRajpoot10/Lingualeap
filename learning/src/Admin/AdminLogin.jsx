import React, { useState } from "react";
import './AdminLogin.css';
import axios from 'axios';
import { useNavigate } from "react-router-dom";

function AdminLogin() {
  const [username_email, setUsername_email] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [showForgotModal, setShowForgotModal] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');
    try {
      const response = await axios.post(
        process.env.REACT_APP_API_URL + '/adminn',
        { username_email, password }
      );
      if (response.data.status) {
        localStorage.setItem('adminEmail', username_email);
        localStorage.setItem('role', 'admin');
        navigate('/registered');
      } else {
        setError('Invalid username or password');
      }
    } catch (error) {
      setError('An error occurred while trying to log in');
    }
  };

  return (
    <>
      <div className="backlogin">
        <div className="login-wrapper">
          <div className="card admin-login-box">
            {/* Title / Banner */}
            <div className="admin-title-banner">
              <h2>Admin Console</h2>
              <p>Sign in to manage the LinguaLeap platform</p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="admin-login-form">
              {error && (
                <div className="alert alert-danger mb-4 py-2.5 small fw-bold" role="alert" style={{ borderRadius: '8px' }}>
                  ❌ {error}
                </div>
              )}

              <div className="form-group-3d">
                <label>Username / Email</label>
                <input
                  type="text"
                  placeholder="Enter your username or email"
                  name="username_email"
                  className="inpt-3d"
                  value={username_email}
                  onChange={(e) => setUsername_email(e.target.value)}
                  required
                />
              </div>

              <div className="form-group-3d">
                <label>Password</label>
                <input
                  type="password"
                  placeholder="Enter your password"
                  name="password"
                  className="inpt-3d"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>

              {/* Forgot Password Link */}
              <div className="forgot-password-container">
                <span 
                  className="forgot-password-link" 
                  onClick={() => setShowForgotModal(true)}
                >
                  Forgot Password?
                </span>
              </div>

              {/* Submit Button */}
              <button 
                className="btn btn-primary w-100 py-3 mt-1" 
                type="submit"
                style={{ fontSize: '15px' }}
              >
                Sign In
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Forgot Password Security Modal */}
      {showForgotModal && (
        <div className="security-modal-overlay" onClick={() => setShowForgotModal(false)}>
          <div className="card security-modal-card" onClick={(e) => e.stopPropagation()}>
            <div className="text-center mb-3">
              <span style={{ fontSize: '44px' }}>🛡️</span>
              <h4 className="fw-bold text-dark mt-2 mb-1">Security Compliance Notice</h4>
              <p className="text-muted small">Admin Credential Recovery Policy</p>
            </div>
            <hr className="my-3" />
            <p className="text-secondary small" style={{ lineHeight: '1.6' }}>
              For data protection and platform compliance, admin account credentials cannot be recovered or reset automatically online.
            </p>
            <div className="p-3 rounded bg-light border-start-3d mb-4" style={{ borderLeft: '4px solid #4f46e5' }}>
              <p className="mb-0 text-dark small fw-bold">How to reset your password:</p>
              <p className="mb-0 text-muted small mt-1">
                Please contact the <b>System Operations & Administration Desk</b> directly at:
              </p>
              <p className="mb-0 text-primary fw-bold small mt-1">
                📧 support@lingualeap.com
              </p>
            </div>
            <button 
              className="btn btn-primary w-100 py-2.5" 
              onClick={() => setShowForgotModal(false)}
            >
              Acknowledge & Close
            </button>
          </div>
        </div>
      )}
    </>
  );
}

export default AdminLogin;