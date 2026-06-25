import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Registered.css';
import { Link } from 'react-router-dom';

const Registered = () => {
  const [testlanguage, settestlanguage] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    axios.get(process.env.REACT_APP_API_URL + '/selecttlanguage')
      .then(response => {
        settestlanguage(response.data);
      })
      .catch(error => {
        setError('There was an error fetching languages.');
        console.error('There was an error ', error);
      });
  }, []);

  return (
    <div className="container-fluid px-0">
      <div className="row">
        {/* Sidebar Container */}
        <div className="col-md-3 bg-white min-vh-100 border-end pe-0">
          <div className="mt-2 text-center backSTART">
            <img src="image/aadmin.png" alt="" className="mt-2" />
            <h6 className="pb-3 fw-bold mt-2">Admin Panel</h6>
          </div>
          <hr />
          <h6 className="mt-4 px-3 active">
            <img src="image/select.png" alt="" className="view mx-2" />
            <Link to="/registered">Registered Languages</Link>
          </h6>
          <hr />
          <h6 className="mt-4 px-3">
            <img src="image/meeting.png" alt="" className="view mx-2" />
            <Link to="/teacherdetail">Teacher Details</Link>
          </h6>
          <hr />
          <h6 className="mt-4 px-3">
            <img src="image/meeting.png" alt="" className="view mx-2" />
            <Link to="/studentenroll">Student Enroll</Link>
          </h6>
          <hr />
          <h6 className="mt-4 px-3">
            <img src="image/select.png" alt="" className="view mx-2" />
            <Link to="/adddrop">Add & Drop Languages</Link>
          </h6>
          <hr />
          <h6 className="mt-4 px-3">
            <img src="image/select.png" alt="" className="view mx-2" />
            <Link to="/changepassword">Change Password</Link>
          </h6>
          <hr />
          <h6 className="mt-4 px-3" onClick={() => localStorage.clear()} style={{ cursor: 'pointer' }}>
            <img src="image/logout.png" alt="" className="view mx-2" style={{ opacity: 0.7 }} />
            <Link to="/">Log Out</Link>
          </h6>
          <hr />
        </div>

        {/* Main Content Area */}
        <div className="col-md-9 p-5 overflow-auto" style={{ height: "100vh" }}>
          <h1 className="mb-2 font-weight-bold"><b>Registered Languages</b></h1>
          <p className="text-muted mb-4">View all active languages currently available for students on the platform.</p>

          {error && (
            <div className="alert alert-danger" role="alert">
              {error}
            </div>
          )}

          <div className="card shadow-sm p-4 mt-3">
            <div className="language-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '24px' }}>
              {testlanguage.length === 0 ? (
                <div className="text-center py-4 text-muted w-100" style={{ gridColumn: '1/-1' }}>
                  No languages registered on the platform. Go to "Add & Drop Languages" to register one.
                </div>
              ) : (
                testlanguage.map(language => (
                  <div className="language-card card p-3 text-center border-light shadow-sm" key={language.languageId} style={{ borderRadius: '12px', transition: 'all 0.3s' }}>
                    <img 
                      src={language.imageURL || '/image/default.png'} 
                      alt={`${language.languages} Flag`} 
                      className="mx-auto mb-3 border" 
                      style={{ width: '80px', height: '50px', objectFit: 'cover', borderRadius: '4px' }} 
                    />
                    <h5 className="fw-bold mb-0 text-dark">{language.languages}</h5>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Registered;