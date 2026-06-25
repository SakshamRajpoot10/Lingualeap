import React, { useState, useEffect } from "react";
import './Meet.css';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import axios from "axios";

function MeetGen() {
  const [name1, setName1] = useState('');
  const [email1, setEmail1] = useState('');
  const [link2, setLink2] = useState('');
  const [students, setStudents] = useState([]);
  const [selectedEmail, setSelectedEmail] = useState('');
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    let email = localStorage.getItem('email');
    let name = localStorage.getItem("uname");
    setEmail1(email);
    setName1(name);

    // Fetch all teacher appointments to populate the student dropdown
    axios.get(process.env.REACT_APP_API_URL + '/fetch-appointments-teacher')
      .then(res => {
        // Filter only accepted appointments and sort by id descending (most recent first)
        const accepted = (res.data.appointments || [])
          .filter(app => app.status === 'accepted')
          .sort((a, b) => b.id - a.id);
        setStudents(accepted);

        // Pre-select if passed from student requests list, else select the most recent
        if (location.state && location.state.props) {
          setSelectedEmail(location.state.props);
        } else if (accepted.length > 0) {
          setSelectedEmail(accepted[0].email);
        }
      })
      .catch(err => console.error('Error fetching appointments:', err));
  }, [location]);

  const handlelink = (e) => {
    setLink2(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!selectedEmail) {
      alert('Please select a student first');
      return;
    }

    axios.post(process.env.REACT_APP_API_URL + '/send-link', { link: link2, emaill: selectedEmail })
      .then((res) => {
        alert("Meeting link sent successfully to the student");
        setLink2('');
        navigate('/teacherdash');
      })
      .catch((err) => {
        console.error(err);
        alert('Failed to send meeting link');
      });
  };

  return (
    <>
      <div className="mainBody-component-23">
        {/* Sidebar Container */}
        <div className="col-md-3 bg-white">
          <div className="mt-2 text-center backSTART">
            <img src="image/aadmin.png" alt="" className="mt-2" />
            <h4><b>{name1}</b></h4>
            <h6 className="pb-3">Teacher</h6>
          </div>
          <hr />
          <h6 className="mt-4">
            <img src="/image/coursess.png" alt="" className="view mx-2" />
            <Link to="/teacherDash">Language Expertise</Link>
          </h6>
          <hr />
          <h6 className="mt-4">
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
            <img src="image/logout.png" alt="" className="view mx-2" style={{ opacity: 0.7 }} />
            <Link to="/">Log Out</Link>
          </h6>
          <hr />
        </div>

        {/* Main Content Container - Fixed Grid Nesting */}
        <div className="col-md-9 p-5">
          <div className="Meetlink-box-init" style={{ maxWidth: '600px', background: '#fff', borderRadius: '16px', boxShadow: '0 4px 20px rgba(0,0,0,0.08)', padding: '36px' }}>
            <div className="mb-4">
              <h2 className="text-primary font-weight-bold"><b>Generate Meeting Link</b></h2>
              <p className="text-muted">Send a Google Meet or Zoom class link directly to your student's dashboard.</p>
            </div>
            
            <form onSubmit={handleSubmit}>
              <div className="form-group mb-4">
                <label className="fw-bold mb-2 text-secondary">Select Student Session</label>
                <select 
                  className="form-control" 
                  value={selectedEmail} 
                  onChange={(e) => setSelectedEmail(e.target.value)}
                  required
                  style={{ height: '50px', borderRadius: '8px' }}
                >
                  {students.length === 0 ? (
                    <option value="">No accepted sessions available</option>
                  ) : (
                    students.map((std) => (
                      <option key={std.id} value={std.email}>
                        {std.uname} - {std.language} ({new Date(std.start).toLocaleDateString()})
                      </option>
                    ))
                  )}
                </select>
              </div>

              <div className="form-group mb-4">
                <label className="fw-bold mb-2 text-secondary">Meeting URL Link</label>
                <input 
                  type='text' 
                  className="form-control textfield-component-23" 
                  placeholder="https://meet.google.com/abc-defg-hij"
                  value={link2}  
                  onChange={handlelink}
                  required
                  style={{ height: '50px', borderRadius: '8px' }}
                />
              </div>

              <div className="text-center mt-4">
                <button type="submit" className="btn btn-primary btn-lg w-100 py-3 font-weight-bold shadow-sm" disabled={students.length === 0}>
                  Send Meeting Link
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default MeetGen;