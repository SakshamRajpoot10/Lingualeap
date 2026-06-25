import React from 'react'
import './Material.css';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';

function Material() {
  const [material, setMaterial] = useState([]);
  const [name2, setName2] = useState('');
  const [email2, setEmail2] = useState('');
  const [personalMaterials, setPersonalMaterials] = useState([]);

  useEffect(() => {
    let email = localStorage.getItem('email');
    let name = localStorage.getItem("uname");
    setEmail2(email);
    setName2(name);

    // 1. Fetch general textbook chapters
    axios.post(process.env.REACT_APP_API_URL + '/imgfetch')
      .then(response => {
        setMaterial(response.data);
      })
      .catch(error => {
        console.error('Error fetching general materials:', error);
      });

    // 2. Fetch personalized materials shared by teachers
    if (email) {
      axios.get(process.env.REACT_APP_API_URL + '/api/student/my-materials', {
        params: { email: email }
      })
      .then(response => {
        setPersonalMaterials(response.data || []);
      })
      .catch(error => {
        console.error('Error fetching personal materials:', error);
      });
    }
  }, []);

  const handleDownload = (filePathStr, docTitle) => {
    try {
      if (filePathStr && filePathStr.includes('|')) {
        const parts = filePathStr.split('|');
        const fileName = parts[0];
        const base64Data = parts[1];
        
        const link = document.createElement('a');
        link.href = base64Data;
        link.download = fileName;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      } else if (filePathStr) {
        // Fallback for older mock paths
        window.open(filePathStr, '_blank');
      }
    } catch (error) {
      console.error("Error downloading file:", error);
      alert("Failed to download file.");
    }
  };

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
            <h6 className="mt-4 active">
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

          {/* Main Content */}
          <div className="col-md-9 p-5 overflow-auto" style={{ height: '100vh' }}>
            {/* Section 1: Personalized Study Materials */}
            <div className="mb-5">
              <h2 className="text-primary fw-bold mb-3"><b>📚 Documents From Your Teachers</b></h2>
              <p className="text-muted">Personalized worksheets, grammar guidelines, and custom study files shared by your tutors.</p>

              {personalMaterials.length === 0 ? (
                <div className="card border-0 p-4 bg-light text-center" style={{ borderRadius: '16px' }}>
                  <span style={{ fontSize: '32px' }}>📥</span>
                  <p className="mb-0 mt-2 text-muted fw-bold">No custom study materials shared with you yet.</p>
                  <p className="small text-muted mb-0">Once your teacher uploads sheets for you, they will appear here.</p>
                </div>
              ) : (
                <div className="row">
                  {personalMaterials.map(mat => (
                    <div className="col-lg-4 col-md-6 mb-4" key={mat.id}>
                      <div className="card border-0 shadow-sm p-4 h-100 d-flex flex-column" style={{ borderRadius: '16px', background: '#fff', borderLeft: '5px solid #4f46e5' }}>
                        <div className="d-flex align-items-center gap-2 mb-3">
                          <span style={{ fontSize: '30px' }}>📄</span>
                          <div>
                            <h5 className="fw-bold mb-0 text-dark" style={{ lineHeight: '1.3' }}>{mat.title}</h5>
                            <span className="small text-muted">From: {mat.teacher_email}</span>
                          </div>
                        </div>
                        <div className="mt-auto pt-3 border-top d-flex justify-content-between align-items-center">
                          <span className="small text-muted">Shared: {new Date(mat.createdAt).toLocaleDateString()}</span>
                          <button 
                            onClick={() => handleDownload(mat.file_path, mat.title)}
                            className="btn btn-sm btn-primary px-3"
                            style={{ borderRadius: '6px', background: '#4f46e5', border: 'none' }}
                          >
                            Download
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Section 2: General Textbook Materials */}
            <div>
              <h2 className="text-dark fw-bold mb-3"><b>📖 Textbook Chapters</b></h2>
              <p className="text-muted">Browse general textbooks and exercises for your active language courses.</p>

              <div className="row">
                {material.map((ac) => (
                  <div className="col-lg-4 col-md-6 mb-4" key={ac.id}>
                    <div className="card border-0 shadow-sm p-4 text-center h-100 bg-white" style={{ borderRadius: '16px' }}>
                      <div className="mb-3">
                        <img 
                          src={ac.image} 
                          alt={ac.chapter} 
                          className="img-fluid rounded" 
                          style={{ maxHeight: '140px', objectFit: 'cover', width: '100%' }}
                        />
                      </div>
                      <h4 className="fw-bold text-secondary mb-3">{ac.chapter}</h4>
                      <div className="px-3">
                        <div className="progress mb-2" style={{ height: '8px', borderRadius: '4px' }}>
                          <div className="progress-bar bg-success" role="progressbar" style={{ width: '32%', borderRadius: '4px' }} aria-valuenow="32" aria-valuemin="0" aria-valuemax="100"></div>
                        </div>
                        <span className="small text-muted">32% Completed</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      </div>
    </>
  )
}

export default Material