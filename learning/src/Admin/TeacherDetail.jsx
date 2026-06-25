import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './TeacherDetail.css';

const TeacherDetail = () => {
  const [teachers, setTeachers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTeacher, setSelectedTeacher] = useState(null);
  const [editName, setEditName] = useState('');
  const [editEmail, setEditEmail] = useState('');
  const [editMobile, setEditMobile] = useState('');
  const [editBatch, setEditBatch] = useState('');
  const [editLanguages, setEditLanguages] = useState('');
  const [editCertification, setEditCertification] = useState('');
  const [editLocation, setEditLocation] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const fetchTeachers = () => {
    axios.get(process.env.REACT_APP_API_URL + '/api/admin/teachers')
      .then(response => {
        setTeachers(response.data);
      })
      .catch(err => {
        console.error('Error fetching teachers:', err);
        setError('Failed to load teachers');
      });
  };

  useEffect(() => {
    fetchTeachers();
  }, []);

  const handleEditClick = (teacher) => {
    setSelectedTeacher(teacher);
    setEditName(teacher.uname);
    setEditEmail(teacher.email);
    setEditMobile(teacher.mobileno || '');
    setEditBatch(teacher.batch || '');
    setEditLanguages(teacher.languages || '');
    setEditCertification(teacher.certification || '');
    setEditLocation(teacher.location || '');
    setSuccess('');
    setError('');
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    if (!selectedTeacher) return;

    axios.post(process.env.REACT_APP_API_URL + `/api/admin/teachers/update/${selectedTeacher.teacherid}`, {
      uname: editName,
      email: editEmail,
      mobileno: editMobile,
      batch: editBatch,
      languages: editLanguages,
      certification: editCertification,
      location: editLocation
    })
      .then(response => {
        setSuccess('Teacher details updated successfully');
        fetchTeachers();
        setSelectedTeacher(null);
      })
      .catch(err => {
        console.error(err);
        setError('Failed to update teacher details');
      });
  };

  const handleDelete = (teacherId) => {
    if (!window.confirm('Are you sure you want to delete this teacher account? This action cannot be undone.')) {
      return;
    }

    axios.delete(process.env.REACT_APP_API_URL + `/api/admin/teachers/${teacherId}`)
      .then(response => {
        setSuccess('Teacher deleted successfully');
        fetchTeachers();
        setSelectedTeacher(null);
      })
      .catch(err => {
        console.error(err);
        setError('Failed to delete teacher');
      });
  };

  // Live search filtering
  const filteredTeachers = teachers.filter(teacher => {
    const term = searchTerm.toLowerCase();
    return (
      teacher.uname.toLowerCase().includes(term) ||
      teacher.email.toLowerCase().includes(term) ||
      (teacher.languages && teacher.languages.toLowerCase().includes(term)) ||
      (teacher.location && teacher.location.toLowerCase().includes(term)) ||
      (teacher.batch && teacher.batch.toLowerCase().includes(term))
    );
  });

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
          <h6 className="mt-4 px-3">
            <img src="image/select.png" alt="" className="view mx-2" />
            <Link to="/registered">Registered Languages</Link>
          </h6>
          <hr />
          <h6 className="mt-4 px-3 active">
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
          <div className="admin-detail-header d-flex justify-content-between align-items-center mb-4">
            <div>
              <h1 className="mb-1 font-weight-bold text-dark"><b>Teacher Management Console</b></h1>
              <p className="text-muted mb-0">View, edit, and moderate registered language teachers and their details.</p>
            </div>
            <span className="badge bg-primary px-3 py-2 fs-6 rounded-pill">Total: {teachers.length} Active</span>
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

          {/* Search bar */}
          <div className="admin-search-wrapper">
            <span className="admin-search-icon">🔍</span>
            <input
              type="text"
              className="admin-search-input"
              placeholder="Search teachers by name, email, language..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          {/* Teacher Cards Grid */}
          <div className="teacher-grid-container">
            {filteredTeachers.length === 0 ? (
              <div className="card text-center p-5 border-0 shadow-none empty-state-card">
                <span style={{ fontSize: '48px' }}>👨‍🏫</span>
                <h4 className="fw-bold text-secondary mt-3">No Teachers Found</h4>
                <p className="text-muted mb-0 small">No teacher records match your search criteria.</p>
              </div>
            ) : (
              <div className="row g-4">
                {filteredTeachers.map(teacher => (
                  <div key={teacher.teacherid} className="col-md-12 col-lg-6 col-xxl-4">
                    <div className="card teacher-card p-4">
                      {/* Avatar & Header */}
                      <div className="d-flex align-items-center gap-3 mb-3 pb-3 border-bottom">
                        <div className="avatar-circle">
                          {teacher.uname ? teacher.uname.charAt(0).toUpperCase() : 'T'}
                        </div>
                        <div className="overflow-hidden">
                          <h5 className="teacher-name text-truncate mb-0" title={teacher.uname}>
                            {teacher.uname}
                          </h5>
                          <span className="teacher-email text-truncate d-block" title={teacher.email}>
                            {teacher.email}
                          </span>
                        </div>
                      </div>

                      {/* Languages Expertise */}
                      <div className="mb-3">
                        <div className="text-secondary small fw-bold mb-2">Languages Taught:</div>
                        <div className="d-flex flex-wrap gap-1.5">
                          {teacher.languages && teacher.languages.trim() !== '' ? (
                            teacher.languages.split(',').map((lang, idx) => (
                              <span 
                                key={idx} 
                                className="badge bg-light text-primary border border-primary px-2.5 py-1 rounded-pill fw-bold"
                                style={{ fontSize: '11.5px', textTransform: 'uppercase' }}
                              >
                                {lang.trim()}
                              </span>
                            ))
                          ) : (
                            <span className="text-muted small italic-text" style={{ fontStyle: 'italic' }}>
                              No languages configured
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Info Details Box */}
                      <div className="info-details-box mb-4 mt-auto">
                        <div className="d-flex flex-column gap-2">
                          <div className="info-row">
                            <span className="info-label">Degree:</span>
                            <span className="info-value text-truncate" style={{ maxWidth: '150px' }} title={teacher.batch}>
                              {teacher.batch || '-'}
                            </span>
                          </div>
                          <div className="info-row">
                            <span className="info-label">Mobile:</span>
                            <span className="info-value">
                              {teacher.mobileno || '-'}
                            </span>
                          </div>
                          <div className="info-row">
                            <span className="info-label">Location:</span>
                            <span className="info-value text-truncate" style={{ maxWidth: '150px' }} title={teacher.location}>
                              {teacher.location || '-'}
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Action Buttons */}
                      <div className="d-flex gap-2 mt-auto">
                        <button 
                          className="btn btn-sm btn-primary w-50" 
                          onClick={() => handleEditClick(teacher)}
                        >
                          Edit
                        </button>
                        <button 
                          className="btn btn-sm btn-outline-danger w-50" 
                          onClick={() => handleDelete(teacher.teacherid)}
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Edit Modal / Form Overlay */}
          {selectedTeacher && (
            <div className="modal-backdrop fade show" style={{ display: 'block', backgroundColor: 'rgba(0,0,0,0.5)', zIndex: 1040 }}>
              <div className="modal fade show" style={{ display: 'block', zIndex: 1050 }} tabIndex="-1">
                <div className="modal-dialog modal-dialog-centered modal-lg">
                  <div className="modal-content p-4" style={{ borderRadius: '16px', border: '2px solid var(--gray-700)' }}>
                    <div className="modal-header border-0 pb-0">
                      <h4 className="modal-title font-weight-bold text-primary">Edit Teacher Profile</h4>
                      <button type="button" className="btn-close" onClick={() => setSelectedTeacher(null)}></button>
                    </div>
                    <hr />
                    <form onSubmit={handleUpdate}>
                      <div className="row">
                        <div className="col-md-6 mb-3">
                          <label className="form-label fw-bold small text-secondary">Full Name</label>
                          <input type="text" className="form-control" value={editName} onChange={(e) => setEditName(e.target.value)} required />
                        </div>
                        <div className="col-md-6 mb-3">
                          <label className="form-label fw-bold small text-secondary">Email Address</label>
                          <input type="email" className="form-control" value={editEmail} onChange={(e) => setEditEmail(e.target.value)} required />
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-md-6 mb-3">
                          <label className="form-label fw-bold small text-secondary">Mobile Number</label>
                          <input type="text" className="form-control" value={editMobile} onChange={(e) => setEditMobile(e.target.value)} />
                        </div>
                        <div className="col-md-6 mb-3">
                          <label className="form-label fw-bold small text-secondary">Degree / Qualification</label>
                          <input type="text" className="form-control" value={editBatch} onChange={(e) => setEditBatch(e.target.value)} />
                        </div>
                      </div>
                      <div className="mb-3">
                        <label className="form-label fw-bold small text-secondary">Languages Expertise (comma separated)</label>
                        <input type="text" className="form-control" value={editLanguages} onChange={(e) => setEditLanguages(e.target.value)} placeholder="e.g. English, French, Japanese" />
                      </div>
                      <div className="row">
                        <div className="col-md-6 mb-3">
                          <label className="form-label fw-bold small text-secondary">Certifications</label>
                          <input type="text" className="form-control" value={editCertification} onChange={(e) => setEditCertification(e.target.value)} />
                        </div>
                        <div className="col-md-6 mb-3">
                          <label className="form-label fw-bold small text-secondary">Location</label>
                          <input type="text" className="form-control" value={editLocation} onChange={(e) => setEditLocation(e.target.value)} />
                        </div>
                      </div>
                      <div className="text-end mt-4 pt-3 border-top d-flex justify-content-end gap-2">
                        <button type="button" className="btn btn-outline-secondary px-4" onClick={() => setSelectedTeacher(null)}>Cancel</button>
                        <button type="submit" className="btn btn-primary px-4">Save Changes</button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TeacherDetail;