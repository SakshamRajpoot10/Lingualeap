import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './TeacherProfile.css';
import { useNavigate, Link } from 'react-router-dom';

function TeacherProfile() {
  const [teacherid, setTeacherID] = useState('');
  const [email, setEmail] = useState('');
  const [uname, setName] = useState('');
  const [mobileno, setMobileNo] = useState('');
  const [batch, setBatch] = useState('');
  const [languages, setLanguageKnown] = useState('');
  const [certification, setCertification] = useState('');
  const [location, setLocation] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    let email1 = localStorage.getItem('email');
    if (email1) {
      axios.post(process.env.REACT_APP_API_URL + '/selectteacherprofile', { email: email1 })
        .then(response => {
          const data = response.data[0];
          if (data) {
            setEmail(email1);
            setTeacherID(data.teacherid);
            setName(data.uname);
            setMobileNo(data.mobileno);
            setBatch(data.batch);
            setLanguageKnown(data.languages);
            setCertification(data.certification);
            setLocation(data.location);
          }
        })
        .catch(error => {
          console.error('There was an error fetching the teacher data!', error);
        });
    }
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post(process.env.REACT_APP_API_URL + '/teacherprofile', {
      teacherid, email, uname, mobileno, batch, languages, certification, location
    })
      .then(response => {
        alert('Profile updated successfully!');
        localStorage.setItem('uname', uname);
        navigate('/teacherdash');
      })
      .catch(error => {
        console.error('There is an error updating the teacher profile:', error);
        alert('Failed to update profile');
      });
  };

  return (
    <>
      <div className="mainBody-component-22">
        {/* Sidebar */}
        <div className="col-md-3 bg-white">
          <div className="mt-2 text-center backSTART">
            <img src="image/aadmin.png" alt="" className="mt-2" />
            <h4><b>{uname || "Teacher"}</b></h4>
            <h6 className="pb-3">Teacher</h6>
          </div>
          <hr />
          <h6 className="mt-4">
            <img src="/image/coursess.png" alt="" className="view mx-2" />
            <Link to="/teacherDash">Language Expertise</Link>
          </h6>
          <hr />
          <h6 className="mt-4 active">
            <img src="image/profiles.png" alt="" className="view mx-2" />
            <Link to="/teacherprofile">Profile</Link>
          </h6>
          <hr />
          <h6 className="mt-4">
            <img src="image/updatedcalendar.png" alt="" className="view mx-2" />
            <Link to="/teachercalendar">Student Request</Link>
          </h6>
          <hr />
          <h6 className="mt-4">
            <img src="image/studymaterial.png" alt="" className="view mx-2" />
            <Link to="/studymaterial">Upload Study Material</Link>
          </h6>
          <hr />
          <h6 className="mt-4">
            <img src="image/updatedcalendar.png" alt="" className="view mx-2" />
            <Link to="/studentreviews">Student Reviews & Wishes</Link>
          </h6>
          <hr />
          <h6 className="mt-4" onClick={() => localStorage.clear()} style={{ cursor: 'pointer' }}>
            <img src="image/meeting.png" alt="" className="view mx-2" style={{ opacity: 0.7 }} />
            <Link to="/">Log Out</Link>
          </h6>
          <hr />
        </div>

        {/* Profile Content */}
        <div className="col-md-9 p-5 overflow-auto" style={{ height: "100vh" }}>
          <div className="card border-0 shadow-lg p-5 bg-white mx-auto" style={{ maxWidth: '900px', borderRadius: '20px' }}>
            <div className="mb-4 text-center">
              <h1 className="text-primary fw-bold"><b>Edit Teacher Profile</b></h1>
              <p className="text-muted">Keep your professional, contact, and academic details up-to-date.</p>
            </div>

            <form onSubmit={handleSubmit}>
              <div className="row">
                {/* Left Column: Personal Details */}
                <div className="col-md-6 border-end pe-4">
                  <h4 className="text-secondary fw-bold mb-4 pb-2 border-bottom">Personal Details</h4>
                  
                  <div className="form-group mb-3">
                    <label className="fw-bold mb-1">Full Name</label>
                    <input 
                      type="text" 
                      className="form-control" 
                      value={uname} 
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
                      readOnly
                      style={{ backgroundColor: '#f3f4f6', cursor: 'not-allowed' }}
                    />
                  </div>

                  <div className="form-group mb-3">
                    <label className="fw-bold mb-1">Mobile Number</label>
                    <input 
                      type="text" 
                      className="form-control" 
                      value={mobileno} 
                      onChange={(e) => setMobileNo(e.target.value)} 
                      required
                    />
                  </div>

                  <div className="form-group mb-3">
                    <label className="fw-bold mb-1">Location</label>
                    <input 
                      type="text" 
                      className="form-control" 
                      value={location} 
                      onChange={(e) => setLocation(e.target.value)} 
                      required
                    />
                  </div>
                </div>

                {/* Right Column: Academic Details */}
                <div className="col-md-6 ps-4">
                  <h4 className="text-secondary fw-bold mb-4 pb-2 border-bottom">Academic Details</h4>

                  <div className="form-group mb-3">
                    <label className="fw-bold mb-1">Degree / Qualifications</label>
                    <input 
                      type="text" 
                      className="form-control" 
                      value={batch} 
                      onChange={(e) => setBatch(e.target.value)} 
                      required
                      placeholder="e.g. Master in Linguistics"
                    />
                  </div>

                  <div className="form-group mb-3">
                    <label className="fw-bold mb-1">Languages Expertise (comma separated)</label>
                    <input 
                      type="text" 
                      className="form-control" 
                      value={languages} 
                      onChange={(e) => setLanguageKnown(e.target.value)} 
                      required
                      placeholder="e.g. English, French, German"
                    />
                  </div>

                  <div className="form-group mb-3">
                    <label className="fw-bold mb-1">Certifications</label>
                    <input 
                      type="text" 
                      className="form-control" 
                      value={certification} 
                      onChange={(e) => setCertification(e.target.value)} 
                      required
                      placeholder="e.g. C2 CEFR Certificate"
                    />
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="text-center mt-5 pt-3 border-top d-flex justify-content-center gap-3">
                <button 
                  type="submit" 
                  className="btn btn-primary btn-lg px-5 py-2 shadow-sm"
                  style={{ borderRadius: '10px' }}
                >
                  Save Profile Changes
                </button>
                <Link 
                  to="/teacherdash" 
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
    </>
  );
}

export default TeacherProfile;