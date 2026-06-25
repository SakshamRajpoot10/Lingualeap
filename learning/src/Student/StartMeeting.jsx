import React, { useState, useEffect } from 'react';
import './StartMeeting.css';
import axios from 'axios';
import { Link } from 'react-router-dom';

function StartMeeting() {
  const [link, setLink] = useState('');
  const [name2, setName2] = useState('');
  const [email2, setEmail2] = useState('');
  const [language2, setLanguage2] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let email2 = localStorage.getItem('email');
    let language2 = localStorage.getItem('selectedLanguage');
    let name2 = localStorage.getItem("uname");
    setEmail2(email2);
    setName2(name2);
    setLanguage2(language2);

    axios.post(process.env.REACT_APP_API_URL + '/linkfetch', { name2: name2, language2: language2 })
      .then(response => {
        setLoading(false);
        if (response.data && response.data.length > 0 && response.data[0].meetinglink) {
          setLink(response.data[0].meetinglink);
        } else {
          setLink('');
        }
      })
      .catch(error => {
        setLoading(false);
        console.error('There was an error fetching the meeting link', error);
      });
  }, []);

  const handleJoinMeeting = () => {
    if (link) {
      window.open(link, '_blank', 'noopener,noreferrer');
    }
  };

  return (
    <>
      <div className="container-fluid">
        <div className="row">
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

          <div className="col-md-9">
            <div className="Meetlink-box-init mt-5 px-5">
              <div className="Meetlink-text mb-4">
                <h2><b>Live Learning Session</b></h2>
                <p className="text-muted">Connect with your tutor in real-time for your scheduled language class.</p>
              </div>

              {loading ? (
                <div className="text-center py-5">
                  <div className="spinner-border text-primary" role="status">
                    <span className="visually-hidden">Loading meeting details...</span>
                  </div>
                </div>
              ) : link ? (
                <div className="card p-4 shadow-sm border-primary" style={{ maxWidth: '600px' }}>
                  <h5 className="card-title text-primary mb-3">Meeting Details</h5>
                  <p className="card-text">Your tutor has successfully shared the meeting link for your <b>{language2}</b> session.</p>
                  <div className="bg-light p-3 rounded mb-4 border border-1 text-truncate">
                    <code>{link}</code>
                  </div>
                  <button onClick={handleJoinMeeting} className="btn btn-success btn-lg py-3 w-100 font-weight-bold shadow-sm">
                    Join Live Class Now
                  </button>
                </div>
              ) : (
                <div className="card p-4 shadow-sm" style={{ maxWidth: '600px', borderLeft: '5px solid #ffc107' }}>
                  <h5 className="card-title text-warning mb-3">Link Pending</h5>
                  <p className="card-text mb-0">Your tutor hasn't shared the meeting link for your <b>{language2}</b> class yet.</p>
                  <p className="text-muted mt-2">The link will automatically appear here once it is uploaded. Please check back closer to your scheduled class time.</p>
                  <Link to="/presentlearning" className="btn btn-outline-primary mt-3">Back to Dashboard</Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default StartMeeting;