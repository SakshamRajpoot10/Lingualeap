import React, { useState, useEffect } from "react";
import axios from "axios";
import "./TeacherDash.css";
import { Link } from 'react-router-dom';

const TeacherDash = () => {
  const [languages, setLanguages] = useState([]);
  const [name1, setName1] = useState('');
  const [email1, setEmail1] = useState('');
  const [stats, setStats] = useState({
    totalStudents: 0,
    languageCount: 0,
    reviewCount: 0
  });

  useEffect(() => {
    let email = localStorage.getItem('email');
    let name = localStorage.getItem("uname");
    setEmail1(email);
    setName1(name);

    if (email) {
      // 1. Fetch teacher profile to get their languages
      axios.post(process.env.REACT_APP_API_URL + "/selectteacherprofile", { email: email })
        .then(profileRes => {
          const profile = profileRes.data[0];
          const teacherLangs = profile && profile.languages && profile.languages.trim() !== ''
            ? profile.languages.split(',').map(l => l.trim().toLowerCase())
            : [];

          // 2. Fetch all test languages to get flag images
          axios.get(process.env.REACT_APP_API_URL + "/selecttlanguage")
            .then(langRes => {
              const allLangs = langRes.data || [];
              if (teacherLangs.length === 0) {
                setLanguages([]);
                setStats(prev => ({ ...prev, languageCount: 0 }));
                return;
              }
              const matched = allLangs.filter(lang => 
                teacherLangs.some(tl => lang.languages.toLowerCase().includes(tl) || tl.includes(lang.languages.toLowerCase()))
              );
              setLanguages(matched);
              setStats(prev => ({ ...prev, languageCount: matched.length }));
            })
            .catch(err => console.error("Error fetching language images:", err));
        })
        .catch(err => console.error("Error fetching teacher profile:", err));

      // 3. Fetch appointments to count unique accepted students
      axios.get(process.env.REACT_APP_API_URL + '/fetch-appointments-teacher')
        .then(res => {
          const appointments = res.data.appointments || [];
          // Filter accepted appointments for this teacher's languages or email
          const accepted = appointments.filter(app => app.status === 'accepted');
          const uniqueStudents = new Set(accepted.map(app => app.email));
          setStats(prev => ({ ...prev, totalStudents: uniqueStudents.size }));
        })
        .catch(err => console.error("Error fetching appointments stats:", err));

      // 4. Fetch review count
      axios.get(process.env.REACT_APP_API_URL + "/api/teacher/reviews", {
        params: { teacher_email: email }
      })
      .then(res => {
        setStats(prev => ({ ...prev, reviewCount: (res.data || []).length }));
      })
      .catch(err => console.error("Error fetching review count:", err));
    }
  }, []);

  return (
    <>
      <div className="mainBody-component-22">
        {/* Sidebar */}
        <div className="col-md-3 bg-white">
          <div className="mt-2 text-center backSTART">
            <img src="image/aadmin.png" alt="" className="mt-2" />
            <h4><b>{name1}</b></h4>
            <h6 className="pb-3">Teacher</h6>
          </div>
          <hr />
          <h6 className="mt-4 active">
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
            <img src="image/meeting.png" alt="" className="view mx-2" style={{ opacity: 0.7 }} />
            <Link to="/">Log Out</Link>
          </h6>
          <hr />
        </div>

        {/* Main Content Area */}
        <div className="col-md-9 p-5 overflow-auto" style={{ height: "100vh" }}>
          {/* Welcome Banner */}
          <div className="card border-0 p-4 mb-4 text-white shadow-sm" style={{ background: 'linear-gradient(135deg, #4f46e5 0%, #764ba2 100%)', borderRadius: '20px' }}>
            <h1 className="fw-bold mb-2">Welcome Back, {name1}!</h1>
            <p className="lead mb-0" style={{ opacity: 0.9 }}>Manage your student requests, upload personalized study documents, and check student greetings from your professional portal.</p>
          </div>

          {/* Metrics / Statistics Cards */}
          <div className="row mb-5">
            <div className="col-md-4">
              <div className="card border-0 shadow-sm p-4 text-center h-100" style={{ borderRadius: '16px', background: '#fff' }}>
                <div className="mb-2" style={{ fontSize: '40px' }}>👨‍🎓</div>
                <h3 className="fw-bold text-primary mb-1">{stats.totalStudents}</h3>
                <span className="text-muted fw-bold">Students Learned From You</span>
                <p className="small text-muted mt-2 mb-0">Calculated from unique students with accepted class appointments.</p>
              </div>
            </div>
            <div className="col-md-4">
              <div className="card border-0 shadow-sm p-4 text-center h-100" style={{ borderRadius: '16px', background: '#fff' }}>
                <div className="mb-2" style={{ fontSize: '40px' }}>🗣️</div>
                <h3 className="fw-bold text-success mb-1">{stats.languageCount}</h3>
                <span className="text-muted fw-bold">Active Languages Taught</span>
                <p className="small text-muted mt-2 mb-0">Languages registered under your teacher profile.</p>
              </div>
            </div>
            <div className="col-md-4">
              <div className="card border-0 shadow-sm p-4 text-center h-100" style={{ borderRadius: '16px', background: '#fff' }}>
                <div className="mb-2" style={{ fontSize: '40px' }}>⭐</div>
                <h3 className="fw-bold text-warning mb-1">{stats.reviewCount}</h3>
                <span className="text-muted fw-bold">Student Reviews & Wishes</span>
                <p className="small text-muted mt-2 mb-0">Total feedback and holiday wishes sent by students.</p>
              </div>
            </div>
          </div>

          {/* Language Expertise Section */}
          <div className="mb-4">
            <h2 className="text-dark fw-bold mb-3">Your Certified Language Expertise</h2>
            <p className="text-muted">Below are the languages you teach. Flag images represent verified certifications.</p>
          </div>

          <div className="row justify-content-start">
            {languages.length === 0 ? (
              <div className="col-12 mt-2">
                <div className="card text-center p-5 border-0 shadow-sm bg-white" style={{ borderRadius: '16px' }}>
                  <span style={{ fontSize: '48px' }}>🗣️</span>
                  <h4 className="fw-bold text-secondary mt-3">No Language Expertise Selected</h4>
                  <p className="text-muted">You haven't listed any language expertise in your profile yet. Update your profile details to select the languages you teach.</p>
                  <div className="d-flex justify-content-center">
                    <Link to="/teacherprofile" className="btn btn-primary px-4 py-2 fw-bold" style={{ borderRadius: '10px', background: '#4f46e5', border: 'none' }}>
                      Configure Profile
                    </Link>
                  </div>
                </div>
              </div>
            ) : (
              languages.map(lang => (
                <div className="col-lg-4 col-md-6 mb-4" key={lang.languageId}>
                  <div className="card border-0 shadow-sm h-100 p-4 text-center" style={{ borderRadius: '16px', background: '#fff', transition: 'all 0.3s ease' }}>
                    <div className="d-flex justify-content-center mb-3">
                      <img 
                        src={lang.imageURL} 
                        alt={lang.languages} 
                        style={{ width: '100px', height: '100px', borderRadius: '50%', objectFit: 'cover', border: '4px solid #f3f4f6', boxShadow: '0 4px 10px rgba(0,0,0,0.06)' }}
                      />
                    </div>
                    <h4 className="fw-bold text-secondary mb-2">{lang.languages}</h4>
                    <span className="badge bg-light text-primary border border-primary px-3 py-1 rounded-pill" style={{ fontSize: '12px', fontWeight: '600' }}>
                      ✓ Certified Expert
                    </span>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default TeacherDash;
