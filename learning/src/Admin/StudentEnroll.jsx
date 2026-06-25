import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './StudentEnroll.css';

function StudentEnroll() {
  const [students, setStudents] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [editName, setEditName] = useState('');
  const [editEmail, setEditEmail] = useState('');
  const [editMobile, setEditMobile] = useState('');
  const [editBatch, setEditBatch] = useState('');
  const [editLocation, setEditLocation] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const fetchStudents = () => {
    axios.get(process.env.REACT_APP_API_URL + '/api/admin/students')
      .then(response => {
        setStudents(response.data);
      })
      .catch(err => {
        console.error('Error fetching students:', err);
        setError('Failed to load students');
      });
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  const handleEditClick = (student) => {
    setSelectedStudent(student);
    setEditName(student.uname);
    setEditEmail(student.email);
    setEditMobile(student.mobileno || '');
    setEditBatch(student.batch || '');
    setEditLocation(student.location || '');
    setSuccess('');
    setError('');
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    if (!selectedStudent) return;

    axios.post(process.env.REACT_APP_API_URL + '/updateStudentProfile/' + selectedStudent.studentid, {
      name: editName,
      email: editEmail,
      mobileNo: editMobile,
      studentClass: editBatch,
      location: editLocation
    })
      .then(response => {
        setSuccess('Student details updated successfully');
        fetchStudents();
        setSelectedStudent(null);
      })
      .catch(err => {
        console.error(err);
        setError('Failed to update student details');
      });
  };

  const handleDelete = (studentId) => {
    if (!window.confirm('Are you sure you want to delete this student account? This action cannot be undone.')) {
      return;
    }

    axios.delete(process.env.REACT_APP_API_URL + `/api/admin/students/${studentId}`)
      .then(response => {
        setSuccess('Student deleted successfully');
        fetchStudents();
        setSelectedStudent(null);
      })
      .catch(err => {
        console.error(err);
        setError('Failed to delete student');
      });
  };

  // Live search filtering
  const filteredStudents = students.filter(student => {
    const term = searchTerm.toLowerCase();
    return (
      student.uname.toLowerCase().includes(term) ||
      student.email.toLowerCase().includes(term) ||
      (student.location && student.location.toLowerCase().includes(term)) ||
      (student.batch && student.batch.toLowerCase().includes(term))
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
          <h6 className="mt-4 px-3">
            <img src="image/meeting.png" alt="" className="view mx-2" />
            <Link to="/teacherdetail">Teacher Details</Link>
          </h6>
          <hr />
          <h6 className="mt-4 px-3 active">
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
          <div className="student-detail-header d-flex justify-content-between align-items-center mb-4">
            <div>
              <h1 className="mb-1 font-weight-bold text-dark"><b>Student Enrollment Console</b></h1>
              <p className="text-muted mb-0">View, edit, and moderate registered student accounts and their details.</p>
            </div>
            <span className="badge bg-primary px-3 py-2 fs-6 rounded-pill">Total: {students.length} Active</span>
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
          <div className="student-search-wrapper">
            <span className="student-search-icon">🔍</span>
            <input
              type="text"
              className="student-search-input"
              placeholder="Search students by name, email, batch..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          {/* Student Cards Grid */}
          <div className="student-grid-container">
            {filteredStudents.length === 0 ? (
              <div className="card text-center p-5 border-0 shadow-none empty-state-card">
                <span style={{ fontSize: '48px' }}>👨‍🎓</span>
                <h4 className="fw-bold text-secondary mt-3">No Students Found</h4>
                <p className="text-muted mb-0 small">No student records match your search criteria.</p>
              </div>
            ) : (
              <div className="row g-4">
                {filteredStudents.map(student => (
                  <div key={student.studentid} className="col-md-12 col-lg-6 col-xxl-4">
                    <div className="card student-card p-4">
                      {/* Avatar & Header */}
                      <div className="d-flex align-items-center gap-3 mb-3 pb-3 border-bottom">
                        <div className="student-avatar-circle">
                          {student.uname ? student.uname.charAt(0).toUpperCase() : 'S'}
                        </div>
                        <div className="overflow-hidden">
                          <h5 className="student-name-text text-truncate mb-0" title={student.uname}>
                            {student.uname}
                          </h5>
                          <span className="student-email-text text-truncate d-block" title={student.email}>
                            {student.email}
                          </span>
                        </div>
                      </div>

                      {/* Class/Batch Badge */}
                      <div className="mb-3">
                        <span className="badge bg-light text-primary border border-primary px-3 py-2 rounded-pill fw-bold" style={{ fontSize: '12px', textTransform: 'uppercase' }}>
                          🏷️ {student.batch || 'Unassigned Batch'}
                        </span>
                      </div>

                      {/* Info Details Box */}
                      <div className="student-details-box mb-4 mt-auto">
                        <div className="d-flex flex-column gap-2">
                          <div className="student-info-row">
                            <span className="student-info-label">Mobile:</span>
                            <span className="student-info-value">
                              {student.mobileno || '-'}
                            </span>
                          </div>
                          <div className="student-info-row">
                            <span className="student-info-label">Location:</span>
                            <span className="student-info-value text-truncate" style={{ maxWidth: '150px' }} title={student.location}>
                              {student.location || '-'}
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Action Buttons */}
                      <div className="d-flex gap-2 mt-auto">
                        <button 
                          className="btn btn-sm btn-primary w-50" 
                          onClick={() => handleEditClick(student)}
                        >
                          Edit
                        </button>
                        <button 
                          className="btn btn-sm btn-outline-danger w-50" 
                          onClick={() => handleDelete(student.studentid)}
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
          {selectedStudent && (
            <div className="modal-backdrop fade show" style={{ display: 'block', backgroundColor: 'rgba(0,0,0,0.5)', zIndex: 1040 }}>
              <div className="modal fade show" style={{ display: 'block', zIndex: 1050 }} tabIndex="-1">
                <div className="modal-dialog modal-dialog-centered">
                  <div className="modal-content p-4" style={{ borderRadius: '16px', border: '2px solid var(--gray-700)' }}>
                    <div className="modal-header border-0 pb-0">
                      <h4 className="modal-title font-weight-bold text-primary">Edit Student Profile</h4>
                      <button type="button" className="btn-close" onClick={() => setSelectedStudent(null)}></button>
                    </div>
                    <hr />
                    <form onSubmit={handleUpdate}>
                      <div className="mb-3">
                        <label className="form-label fw-bold small text-secondary">Full Name</label>
                        <input type="text" className="form-control" value={editName} onChange={(e) => setEditName(e.target.value)} required />
                      </div>
                      <div className="mb-3">
                        <label className="form-label fw-bold small text-secondary">Email Address</label>
                        <input type="email" className="form-control" value={editEmail} onChange={(e) => setEditEmail(e.target.value)} required />
                      </div>
                      <div className="mb-3">
                        <label className="form-label fw-bold small text-secondary">Mobile Number</label>
                        <input type="text" className="form-control" value={editMobile} onChange={(e) => setEditMobile(e.target.value)} />
                      </div>
                      <div className="mb-3">
                        <label className="form-label fw-bold small text-secondary">Class / Batch</label>
                        <input type="text" className="form-control" value={editBatch} onChange={(e) => setEditBatch(e.target.value)} />
                      </div>
                      <div className="mb-3">
                        <label className="form-label fw-bold small text-secondary">Location</label>
                        <input type="text" className="form-control" value={editLocation} onChange={(e) => setEditLocation(e.target.value)} />
                      </div>
                      <div className="text-end mt-4 pt-3 border-top d-flex justify-content-end gap-2">
                        <button type="button" className="btn btn-outline-secondary px-4" onClick={() => setSelectedStudent(null)}>Cancel</button>
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
}

export default StudentEnroll;