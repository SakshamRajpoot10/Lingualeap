import React from 'react'
import { useState, useEffect } from 'react';
import './Tcal.css';
import { Link } from 'react-router-dom';
import TeacherRequest from './TeacherRequest';

export default function Tcal() {
  const [name1, setName1] = useState('');

  useEffect(() => {
    let name = localStorage.getItem("uname");
    setName1(name || "Teacher");
  }, []);

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
        <h6 className="mt-4 active">
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

      {/* Main Content Area: Student Request Table */}
      <div className="col-md-9 p-5 overflow-auto" style={{ height: "100vh" }}>
        <div className="mb-4">
          <h1 className="text-primary fw-bold"><b>Student Class Requests</b></h1>
          <p className="text-muted">Review, accept, or reject incoming scheduling requests from your students. Accepted classes can then be sent live video conference links.</p>
        </div>

        <div className="card border-0 shadow-lg p-4 bg-white" style={{ borderRadius: '18px' }}>
          <TeacherRequest />
        </div>
      </div>
    </div>
  );
}