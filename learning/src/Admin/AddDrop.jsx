import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './AddDrop.css';

function AddDrop() {
  const [activeLanguages, setActiveLanguages] = useState([]);
  const [newLangName, setNewLangName] = useState('');
  const [newLangImage, setNewLangImage] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const fetchLanguages = () => {
    axios.get(process.env.REACT_APP_API_URL + '/selecttlanguage')
      .then(response => {
        setActiveLanguages(response.data);
      })
      .catch(err => {
        console.error('Error fetching languages:', err);
        setError('Failed to load registered languages');
      });
  };

  useEffect(() => {
    fetchLanguages();
  }, []);

  const handleAddLanguage = (e) => {
    e.preventDefault();
    if (!newLangName) return;

    // Default flags mapping if image is empty
    let imagePath = newLangImage;
    if (!imagePath) {
      const lowerName = newLangName.toLowerCase();
      if (lowerName.includes('english')) imagePath = '/image/english.png';
      else if (lowerName.includes('french')) imagePath = '/image/french.png';
      else if (lowerName.includes('german')) imagePath = '/image/german.jpeg';
      else if (lowerName.includes('japanese')) imagePath = '/image/japanese.png';
      else if (lowerName.includes('korean')) imagePath = '/image/korean.png';
      else if (lowerName.includes('russian')) imagePath = '/image/russia.png';
      else if (lowerName.includes('spanish')) imagePath = '/image/spanish.png';
      else imagePath = '/image/default.png';
    }

    axios.post(process.env.REACT_APP_API_URL + '/api/admin/add-language', {
      name: newLangName,
      image: imagePath
    })
      .then(response => {
        setSuccess(`Language "${newLangName}" added successfully`);
        setNewLangName('');
        setNewLangImage('');
        fetchLanguages();
      })
      .catch(err => {
        console.error(err);
        setError('Failed to add language');
      });
  };

  const handleDropLanguage = (languageId, langName) => {
    if (!window.confirm(`Are you sure you want to drop/remove "${langName}" from the platform?`)) {
      return;
    }

    axios.post(process.env.REACT_APP_API_URL + '/api/admin/drop-language', { languageId })
      .then(response => {
        setSuccess(`Language "${langName}" dropped successfully`);
        fetchLanguages();
      })
      .catch(err => {
        console.error(err);
        setError('Failed to drop language');
      });
  };

  return (
    <div className="container-fluid px-0">
      <div className="row g-0">
        {/* Sidebar Container */}
        <div className="col-md-3 bg-white min-vh-100 border-end pe-0">
          <div className="mt-2 text-center backSTART">
            <img src="image/aadmin.png" alt="" className="mt-2" />
            <h6 className="pb-3 fw-bold mt-2">Admin Panel</h6>
          </div>
          <hr />
          <h6 className="mt-4 px-3">
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
          <h6 className="mt-4 px-3 active">
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
          <div className="d-flex justify-content-between align-items-center mb-4 border-bottom pb-3">
            <div>
              <h1 className="mb-1 font-weight-bold text-dark"><b>Add & Drop Languages</b></h1>
              <p className="text-muted mb-0">Manage the catalog of global languages taught on LinguaLeap.</p>
            </div>
            <span className="badge bg-primary px-3 py-2 fs-6 rounded-pill">Total: {activeLanguages.length} Available</span>
          </div>

          {success && (
            <div className="alert alert-success mb-4 py-2.5 small fw-bold" role="alert" style={{ borderRadius: '8px' }}>
              🟢 {success}
            </div>
          )}
          {error && (
            <div className="alert alert-danger mb-4 py-2.5 small fw-bold" role="alert" style={{ borderRadius: '8px' }}>
              ❌ {error}
            </div>
          )}

          <div className="row g-4">
            {/* Add Language Card */}
            <div className="col-lg-4 mb-4">
              <div className="card shadow-sm p-4 bg-white" style={{ borderRadius: '16px' }}>
                <h4 className="fw-bold text-primary mb-3 border-bottom pb-2">Add New Language</h4>
                <form onSubmit={handleAddLanguage}>
                  <div className="mb-3">
                    <label className="form-label fw-bold small text-secondary">Language Name</label>
                    <input 
                      type="text" 
                      className="form-control" 
                      placeholder="e.g. Spanish" 
                      value={newLangName} 
                      onChange={(e) => setNewLangName(e.target.value)} 
                      required 
                      style={{ borderRadius: '8px', padding: '10px' }}
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label fw-bold small text-secondary">Flag Image URL (Optional)</label>
                    <input 
                      type="text" 
                      className="form-control" 
                      placeholder="e.g. /image/spanish.png" 
                      value={newLangImage} 
                      onChange={(e) => setNewLangImage(e.target.value)} 
                      style={{ borderRadius: '8px', padding: '10px' }}
                    />
                    <small className="text-muted mt-1 d-block" style={{ fontSize: '11px' }}>
                      Leave blank to automatically match flag graphics on disk if available.
                    </small>
                  </div>
                  <button 
                    type="submit" 
                    className="btn btn-primary w-100 py-2.5 mt-3 fw-bold"
                    style={{ borderRadius: '8px' }}
                  >
                    Add Language
                  </button>
                </form>
              </div>
            </div>

            {/* Drop Language Grid */}
            <div className="col-lg-8">
              <div className="card shadow-sm p-4 bg-white" style={{ borderRadius: '16px', minHeight: '300px' }}>
                <h4 className="fw-bold text-danger mb-4 border-bottom pb-2">Drop Registered Languages</h4>
                <div className="row g-3">
                  {activeLanguages.length === 0 ? (
                    <div className="col-12 text-center py-5 text-muted">
                      <span style={{ fontSize: '40px' }}>🗣️</span>
                      <p className="mt-2 mb-0 small">No languages registered on the platform.</p>
                    </div>
                  ) : (
                    activeLanguages.map(language => (
                      <div key={language.languageId} className="col-md-6 col-xxl-4">
                        <div className="card text-center p-3 h-100 border-light" style={{ transition: 'all 0.2s', borderRadius: '12px' }}>
                          <img 
                            src={language.imageURL || '/image/default.png'} 
                            alt={language.languages} 
                            className="mx-auto mt-2 mb-3 border" 
                            style={{ width: '70px', height: '45px', objectFit: 'cover', borderRadius: '4px' }} 
                          />
                          <h5 className="fw-bold mb-3 text-dark">{language.languages}</h5>
                          <button 
                            className="btn btn-sm btn-outline-danger w-100 mt-auto" 
                            onClick={() => handleDropLanguage(language.languageId, language.languages)}
                          >
                            Drop Language
                          </button>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddDrop;