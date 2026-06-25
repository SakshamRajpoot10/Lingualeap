import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./TeacherDash.css"; // Reuse sidebar styling

const StudentReviews = () => {
  const [reviews, setReviews] = useState([]);
  const [name1, setName1] = useState('');
  const [email1, setEmail1] = useState('');
  const [activeTab, setActiveTab] = useState('all'); // 'all', 'Review', 'Wish'

  useEffect(() => {
    let email = localStorage.getItem('email');
    let name = localStorage.getItem("uname");
    setEmail1(email);
    setName1(name);

    axios.get(process.env.REACT_APP_API_URL + "/api/teacher/reviews", {
      params: { teacher_email: email }
    })
    .then(res => {
      setReviews(res.data || []);
    })
    .catch(err => console.error("Error fetching teacher reviews:", err));
  }, []);

  const filteredReviews = reviews.filter(rev => {
    if (activeTab === 'all') return true;
    return rev.review_type === activeTab;
  });

  return (
    <div className="mainBody-component-22">
      {/* Sidebar */}
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
        <h6 className="mt-4 active">
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

      {/* Main Content Area */}
      <div className="col-md-9 p-5 overflow-auto" style={{ height: "100vh" }}>
        <div className="d-flex justify-content-between align-items-center mb-4">
          <div>
            <h1 className="text-primary font-weight-bold"><b>Student Reviews & Wishes</b></h1>
            <p className="text-muted">Read feedback and heartfelt greetings sent by your students.</p>
          </div>
          <span className="badge bg-primary px-3 py-2 fs-6 rounded-pill">Total: {reviews.length} Received</span>
        </div>

        {/* Tab Filters */}
        <div className="d-flex gap-2 mb-4">
          <button 
            className={`btn ${activeTab === 'all' ? 'btn-primary' : 'btn-outline-primary'}`}
            onClick={() => setActiveTab('all')}
          >
            All Messages
          </button>
          <button 
            className={`btn ${activeTab === 'Review' ? 'btn-success' : 'btn-outline-success'}`}
            onClick={() => setActiveTab('Review')}
          >
            💬 Student Reviews
          </button>
          <button 
            className={`btn ${activeTab === 'Wish' ? 'btn-warning' : 'btn-outline-warning'}`}
            onClick={() => setActiveTab('Wish')}
            style={{ color: activeTab === 'Wish' ? '#fff' : undefined }}
          >
            💝 Wishes & Greetings
          </button>
        </div>

        {/* Reviews List */}
        {filteredReviews.length === 0 ? (
          <div className="card text-center p-5 border-0 shadow-sm" style={{ borderRadius: '16px' }}>
            <div className="my-4">
              <span style={{ fontSize: '64px' }}>✉️</span>
            </div>
            <h3 className="text-secondary fw-bold">No Messages Found</h3>
            <p className="text-muted">You haven't received any messages matching this category yet.</p>
          </div>
        ) : (
          <div className="row">
            {filteredReviews.map((rev) => (
              <div className="col-md-6 mb-4" key={rev.id}>
                <div className="card border-0 shadow-sm h-100 p-4 position-relative" style={{ borderRadius: '16px', borderLeft: rev.review_type === 'Wish' ? '5px solid #ffc107' : '5px solid #198754' }}>
                  <div className="d-flex justify-content-between align-items-start mb-3">
                    <div>
                      <h5 className="mb-1 fw-bold text-dark">{rev.student_name}</h5>
                      <span className="small text-muted">{rev.student_email}</span>
                    </div>
                    <span className={`badge ${rev.review_type === 'Wish' ? 'bg-warning text-dark' : 'bg-success'} px-3 py-1 rounded-pill`}>
                      {rev.review_type === 'Wish' ? '💝 Wish Teacher' : '💬 Review'}
                    </span>
                  </div>
                  <p className="text-secondary mt-2 fs-5 italic-text" style={{ fontStyle: 'italic', lineHeight: '1.6' }}>
                    "{rev.review_text}"
                  </p>
                  <div className="text-end text-muted mt-auto pt-3 border-top" style={{ fontSize: '12px' }}>
                    📅 Received: {new Date(rev.createdAt).toLocaleString()}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default StudentReviews;
