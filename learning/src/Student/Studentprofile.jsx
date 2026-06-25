import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './studentProfile.css';

function Studentprofile() {
  const [studentId, setStudentId] = useState('');
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [mobile, setMobileNo] = useState('');
  const [batch, setBatch] = useState('');
  const [location, setLocation] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const email1 = localStorage.getItem('email');
    if (email1) {
      axios.post(process.env.REACT_APP_API_URL + '/selectstudentprofile', { email: email1 })
        .then(response => {
          if (response.data && response.data.length > 0) {
            const data = response.data[0];
            setStudentId(data.studentid);
            setEmail(data.email);
            setName(data.uname);
            setMobileNo(data.mobileno || '');
            setBatch(data.batch || '');
            setLocation(data.location || '');
          }
        })
        .catch(error => {
          console.error('Error fetching student profile:', error);
        });
    }
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post(process.env.REACT_APP_API_URL + '/updateStudentProfile/' + studentId, {
      email,
      name,
      mobileNo: mobile,
      studentClass: batch,
      location
    })
      .then(response => {
        alert('Profile updated successfully!');
        navigate('/select');
      })
      .catch(error => {
        console.error('Error updating student profile:', error);
        alert('Failed to update profile');
      });
  };

  return (
    <>
      <div className="container-fluid">
        <div className="row">
          {/* Sidebar */}
          <div className="col-md-3 bg-white">
            <div className="mt-2 text-center backSTART">
              <img src="image/images2.png" alt="" className="mt-2" />
              <h4><b>{name || "Student"}</b></h4>
              <h6 className="pb-3">Student</h6>
            </div>
            <hr />
            <h6 className="mt-4 mb-1 active">
              <img src="image/profiles.png" alt="" className="view mx-2" />
              <Link to="/studentprofile">Profile</Link>
            </h6>
            <hr />
            <h6 className="mt-4">
              <img src="image/select.png" alt="" className="view mx-2" />
              <Link to="/addlanguages">Select Language</Link>
            </h6>
            <hr />
            <h6 className="mt-4">
              <img src="image/coursess.png" alt="" className="view mx-2" />
              <Link to="/presentlearning">Present Learning</Link>
            </h6>
            <hr />
            <h6 className="mt-4">
              <img src="image/updatedcalendar.png" alt="" className="view mx-2" />
              <Link to="/studentcalendar">Request Status</Link>
            </h6>
            <hr />
            <h6 className="mt-4">
              <img src="image/studymaterial.png" alt="" className="view mx-2" />
              <Link to="/material">Study Material</Link>
            </h6>
            <hr />
            <h6 className="mt-4">
              <img src="image/updatedcalendar.png" alt="" className="view mx-2" />
              <Link to="/addreview">Add Review</Link>
            </h6>
            <hr />
            <h6 className="mt-4" onClick={() => localStorage.clear()} style={{ cursor: 'pointer' }}>
              <img src="image/logout.png" alt="" className="view mx-2" style={{ opacity: 0.7 }} />
              <Link to="/">Log Out</Link>
            </h6>
            <hr />
          </div>

          {/* Profile Form Content */}
          <div className="col-md-9 p-5 overflow-auto" style={{ height: '100vh' }}>
            <div className="card border-0 shadow-lg p-5 bg-white mx-auto" style={{ maxWidth: '900px', borderRadius: '20px' }}>
              <div className="mb-4 text-center">
                <h1 className="text-primary fw-bold"><b>Student Profile Settings</b></h1>
                <p className="text-muted">Manage your personal details, learning batch, and preferred location.</p>
              </div>

              <form onSubmit={handleSubmit}>
                <div className="row">
                  {/* Left Column: Personal Information */}
                  <div className="col-md-6 border-end pe-4">
                    <h4 className="text-secondary fw-bold mb-4 pb-2 border-bottom">Personal Info</h4>
                    
                    <div className="form-group mb-3">
                      <label className="fw-bold mb-1">Full Name</label>
                      <input 
                        type="text" 
                        className="form-control" 
                        value={name} 
                        onChange={(e) => setName(e.target.value)} 
                        required 
                      />
                    </div>

                    <div className="form-group mb-3">
                      <label className="fw-bold mb-1">Email Address</label>
                      <input 
                        type="email" 
                        className="form-control" 
                        value={email} 
                        onChange={(e) => setEmail(e.target.value)} 
                        required 
                      />
                    </div>

                    <div className="form-group mb-3">
                      <label className="fw-bold mb-1">Mobile Number</label>
                      <input 
                        type="text" 
                        className="form-control" 
                        value={mobile} 
                        onChange={(e) => setMobileNo(e.target.value)} 
                      />
                    </div>
                  </div>

                  {/* Right Column: Preference & Location */}
                  <div className="col-md-6 ps-4">
                    <h4 className="text-secondary fw-bold mb-4 pb-2 border-bottom">Academic & Preferences</h4>

                    <div className="form-group mb-3">
                      <label className="fw-bold mb-1">Class / Batch Code</label>
                      <input 
                        type="text" 
                        className="form-control" 
                        value={batch} 
                        onChange={(e) => setBatch(e.target.value)} 
                        placeholder="e.g. Batch A, Grade 10"
                      />
                    </div>

                    <div className="form-group mb-3">
                      <label className="fw-bold mb-1">Location</label>
                      <input 
                        type="text" 
                        className="form-control" 
                        value={location} 
                        onChange={(e) => setLocation(e.target.value)} 
                        placeholder="e.g. New York, USA"
                      />
                    </div>
                  </div>
                </div>

                {/* Submit button */}
                <div className="text-center mt-5 pt-3 border-top d-flex justify-content-center gap-3">
                  <button 
                    type="submit" 
                    className="btn btn-primary btn-lg px-5 py-2 shadow-sm"
                    style={{ borderRadius: '10px' }}
                  >
                    Save Changes & Continue
                  </button>
                  <Link 
                    to="/select" 
                    className="btn btn-outline-secondary btn-lg px-4 py-2"
                    style={{ borderRadius: '10px' }}
                  >
                    Cancel
                  </Link>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Studentprofile;