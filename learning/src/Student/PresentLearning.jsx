import React, { useState, useEffect } from "react";
import "./PresentLearning.css";
import { Link } from "react-router-dom";
import axios from "axios";

function PresentLearning() {
  const [name2, setName2] = useState('');
  const [email2, setEmail2] = useState('');
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    let email = localStorage.getItem('email');
    let name = localStorage.getItem("uname");
    setEmail2(email);
    setName2(name);

    if (email && name) {
      axios.post(process.env.REACT_APP_API_URL + '/presentlearn', { email2: email, name2: name })
        .then(response => {
          setAppointments(response.data || []);
        })
        .catch(error => {
          console.error('Error fetching present learning classes:', error);
        });
    }
  }, []);

  return (
    <>
      <div className="container-fluid">
        <div className="row">
          {/* Sidebar */}
          <div className="col-md-3 bg-white">
            <div className="mt-2 text-center backSTART">
              <img src="image/images2.png" alt="" className="mt-2" />
              <h4><b>{name2}</b></h4>
              <h6 className="pb-3">Student</h6>
            </div>
            <hr />
            <h6 className="mt-4 mb-1">
              <img src="image/profiles.png" alt="" className="view mx-2" />
              <Link to="/studentprofile">Profile</Link>
            </h6>
            <hr />
            <h6 className="mt-4">
              <img src="image/select.png" alt="" className="view mx-2" />
              <Link to="/addlanguages">Select Language</Link>
            </h6>
            <hr />
            <h6 className="mt-4 active">
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

          {/* Main Content Area */}
          <div className="col-md-9 p-5 overflow-auto" style={{ height: '100vh' }}>
            <div className="mb-4">
              <h1 className="text-primary fw-bold"><b>Present Learning & Class Status</b></h1>
              <p className="text-muted">Track the status of all your booked class slots, view assigned teachers, and join meetings in real time.</p>
            </div>

            {appointments.length === 0 ? (
              <div className="card text-center p-5 border-0 shadow-sm" style={{ borderRadius: '16px' }}>
                <div className="my-4" style={{ fontSize: '64px' }}>🎓</div>
                <h3 className="fw-bold text-secondary">No Classes Booked Yet</h3>
                <p className="text-muted mb-4">You haven't scheduled any language classes yet. Start by choosing a language!</p>
                <div className="d-flex justify-content-center">
                  <Link to="/addlanguages" className="btn btn-primary px-4 py-3 fw-bold">
                    Choose a Language
                  </Link>
                </div>
              </div>
            ) : (
              <div className="row">
                {appointments.map((app) => {
                  // Determine status styling based on Duolingo theme guidelines
                  let cardBg = '#fef3c7'; // Light Yellow (pending)
                  let borderCol = '#f59e0b'; // Amber
                  let statusLabel = '🟡 Pending Teacher Response';
                  let showJoinButton = false;

                  if (app.status === 'accepted') {
                    cardBg = '#d1fae5'; // Light Green
                    borderCol = '#10b981'; // Green
                    statusLabel = '🟢 Accepted & Scheduled';
                    showJoinButton = true;
                  } else if (app.status === 'rejected' || app.status === 'cancelled') {
                    cardBg = '#fee2e2'; // Light Red
                    borderCol = '#ef4444'; // Red
                    statusLabel = '🔴 Cancelled / Rejected';
                  }

                  return (
                    <div className="col-lg-4 col-md-6 mb-4" key={app.id}>
                      <div 
                        className="card p-4 h-100 d-flex flex-column" 
                        style={{ 
                          backgroundColor: cardBg, 
                          border: `2.5px solid ${borderCol}`,
                          borderRadius: '12px',
                          boxShadow: 'none',
                          transition: 'transform 0.15s ease'
                        }}
                      >
                        {/* Status Tag */}
                        <div className="mb-3">
                          <span className="badge bg-white text-dark px-3 py-2 border rounded-pill fw-bold" style={{ borderColor: borderCol, fontSize: '12px' }}>
                            {statusLabel}
                          </span>
                        </div>

                        {/* Class Info */}
                        <div className="mb-3">
                          <h3 className="fw-bold text-dark mb-1">{app.language}</h3>
                          {app.status === 'accepted' && app.teacher_name ? (
                            <p className="text-secondary mb-1">👨‍🏫 Tutor: <strong className="text-dark">{app.teacher_name}</strong></p>
                          ) : app.status === 'accepted' ? (
                            <p className="text-secondary mb-1">👨‍🏫 Tutor: <strong className="text-dark">Assigned Tutor</strong></p>
                          ) : app.status === 'pending' ? (
                            <p className="text-muted small mb-1">Tutor assignment pending acceptance</p>
                          ) : (
                            <p className="text-danger small mb-1">No tutor assigned (Cancelled)</p>
                          )}
                        </div>

                        {/* Timing Section */}
                        <div className="mt-2 mb-4 p-2 bg-white rounded border" style={{ borderColor: '#cbd5e1' }}>
                          <div className="small text-muted fw-bold mb-1">🕒 Selected Class Timing:</div>
                          <div className="fw-bold small text-dark">
                            Start: {new Date(app.start).toLocaleString([], { dateStyle: 'medium', timeStyle: 'short' })}
                          </div>
                          <div className="fw-bold small text-dark">
                            End: {new Date(app.end).toLocaleString([], { dateStyle: 'medium', timeStyle: 'short' })}
                          </div>
                        </div>

                        {/* Video Link / Actions */}
                        <div className="mt-auto pt-3 border-top" style={{ borderColor: 'rgba(0,0,0,0.06)' }}>
                          {showJoinButton ? (
                            app.meetinglink ? (
                              <button 
                                onClick={() => window.open(app.meetinglink, '_blank')}
                                className="btn btn-success w-100 py-3 fw-bold shadow-sm text-uppercase"
                                style={{ borderRadius: '10px' }}
                              >
                                🎥 Join Live Class
                              </button>
                            ) : (
                              <button 
                                disabled
                                className="btn btn-secondary w-100 py-3 fw-bold"
                                style={{ borderRadius: '10px', cursor: 'not-allowed', opacity: 0.6 }}
                              >
                                ⏳ Waiting for Video Link
                              </button>
                            )
                          ) : app.status === 'pending' ? (
                            <span className="text-muted small d-block text-center fw-bold italic">Class details will unlock upon tutor approval</span>
                          ) : (
                            <span className="text-danger small d-block text-center fw-bold text-uppercase">Class Request Closed</span>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default PresentLearning;