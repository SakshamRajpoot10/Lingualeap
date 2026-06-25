import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from 'axios';

function ChangePassword() {
  const [currentpassword, setCurrentPassword] = useState('');
  const [newpassword, setNewPassword] = useState('');
  const [reenter, setReenter] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    
    if (!currentpassword || !newpassword || !reenter) {
      setError('All fields are required.');
      return;
    }
    if (newpassword !== reenter) {
      setError('New passwords do not match.');
      return;
    }
    
    const adminEmail = localStorage.getItem('adminEmail') || 'himanshisharma@gmail.com';

    axios.post(process.env.REACT_APP_API_URL + '/api/admin/change-password', {
      email: adminEmail,
      currentPassword: currentpassword,
      newPassword: newpassword
    })
      .then(response => {
        if (response.data.status) {
          setSuccess('Password changed successfully!');
          setCurrentPassword('');
          setNewPassword('');
          setReenter('');
        } else {
          setError(response.data.message || 'Failed to change password');
        }
      })
      .catch(err => {
        console.error(err);
        setError('An error occurred while changing the password');
      });
  };

  return (
    <>
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
            <h6 className="mt-4 px-3">
              <img src="image/select.png" alt="" className="view mx-2" />
              <Link to="/adddrop">Add & Drop Languages</Link>
            </h6>
            <hr />
            <h6 className="mt-4 px-3 active">
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

          {/* Main Content */}
          <div className="col-md-9 p-5 overflow-auto" style={{ height: "100vh" }}>
            <div className="mb-4">
              <h1 className="mb-1 font-weight-bold text-dark"><b>Security Settings</b></h1>
              <p className="text-muted">Update your administrative credentials for secure console access.</p>
            </div>

            <div className="d-flex justify-content-center mt-5">
              <div className="card shadow-sm p-5 bg-white w-100" style={{ maxWidth: '600px', borderRadius: '16px' }}>
                <h3 className="fw-bold mb-4 text-dark border-bottom pb-2">Change Password</h3>
                
                <form onSubmit={handleSubmit}>
                  <div className="form-group mb-3">
                    <label className="fw-bold small text-secondary mb-1">Current Password</label>
                    <input
                      type="password"
                      className="form-control"
                      value={currentpassword}
                      onChange={(e) => setCurrentPassword(e.target.value)}
                      required
                      style={{ borderRadius: '8px', padding: '10px' }}
                    />
                  </div>
                  <div className="form-group mb-3">
                    <label className="fw-bold small text-secondary mb-1">New Password</label>
                    <input
                      type="password"
                      className="form-control"
                      value={newpassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      required
                      style={{ borderRadius: '8px', padding: '10px' }}
                    />
                  </div>
                  <div className="form-group mb-4">
                    <label className="fw-bold small text-secondary mb-1">Re-enter New Password</label>
                    <input
                      type="password"
                      className="form-control"
                      value={reenter}
                      onChange={(e) => setReenter(e.target.value)}
                      required
                      style={{ borderRadius: '8px', padding: '10px' }}
                    />
                  </div>
                  
                  {error && (
                    <div className="alert alert-danger mb-4 py-2.5 small fw-bold" role="alert" style={{ borderRadius: '8px' }}>
                      ❌ {error}
                    </div>
                  )}
                  {success && (
                    <div className="alert alert-success mb-4 py-2.5 small fw-bold" role="alert" style={{ borderRadius: '8px' }}>
                      🟢 {success}
                    </div>
                  )}

                  <button 
                    type="submit" 
                    className="btn btn-primary w-100 py-3 fw-bold"
                    style={{ fontSize: '15px' }}
                  >
                    Save Changes
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ChangePassword;
