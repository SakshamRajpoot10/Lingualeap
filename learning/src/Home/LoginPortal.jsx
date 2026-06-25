import React from "react";
import { Link } from "react-router-dom";
import './LoginPortal.css';

function LoginPortal() {
  return (
    <div className="container-fluid backloginportal py-5">
      <div className="container">
        <div className="row justify-content-center">
          {/* Teacher Login */}
          <div className="col-md-4 mt-4 mb-4">
            <div className="card shadow-lg border-0 h-100">
              <div className="card-body d-flex flex-column align-items-center">
                <h5 className="card-title text-center mb-3"><b>Teacher Login</b></h5>
                <img src="image/teacherloginn.png" alt="Teacher Login" className="mb-3" style={{width: 70, height: 70}} />
                <p className="card-text text-center mb-4">
                  <i>Empower students and grow your career with Lingua Leap.</i>
                </p>
                <Link to="/teachersignup" className="btn btn-primary w-75">Teacher Sign Up</Link>
              </div>
            </div>
          </div>
          {/* Admin Login */}
          <div className="col-md-4 mt-4 mb-4">
            <div className="card shadow-lg border-0 h-100">
              <div className="card-body d-flex flex-column align-items-center">
                <h5 className="card-title text-center mb-3"><b>Admin Login</b></h5>
                <img src="image/aadmin.png" alt="Admin Login" className="mb-3" style={{width: 70, height: 70}} />
                <p className="card-text text-center mb-4">
                  <i>Manage your platform and users efficiently with Lingua Leap.</i>
                </p>
                <Link to="/admin" className="btn btn-primary w-75">Admin Login</Link>
              </div>
            </div>
          </div>
          {/* Student SignUp */}
          <div className="col-md-4 mt-4 mb-4">
            <div className="card shadow-lg border-0 h-100">
              <div className="card-body d-flex flex-column align-items-center">
                <h5 className="card-title text-center mb-3"><b>Student Sign Up</b></h5>
                <img src="image/studentloginn.png" alt="Student Sign Up" className="mb-3" style={{width: 70, height: 70}} />
                <p className="card-text text-center mb-4">
                  <i>Start your language journey with the most affordable learning solution.</i>
                </p>
                <Link to="/studentsignup" className="btn btn-primary w-75">Student Sign Up</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginPortal;
