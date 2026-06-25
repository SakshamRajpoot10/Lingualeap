import { useState, useEffect } from 'react';
import axios from 'axios';
import { Button, Badge } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import './TeacherRequest.css';

const TeacherRequests = () => {
  const navigate = useNavigate();
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const response = await axios.post(process.env.REACT_APP_API_URL + '/fetch-appointments-teacher');
        if (response.status === 200) {
          // Sort requests: pending at the top, then sorted by most recent first
          const sorted = (response.data.appointments || []).sort((a, b) => {
            if (a.status === 'pending' && b.status !== 'pending') return -1;
            if (a.status !== 'pending' && b.status === 'pending') return 1;
            return b.id - a.id;
          });
          setRequests(sorted);
        } else {
          alert(response.data.message ? response.data.message : "Error fetching appointments");
        }
      } catch (error) {
        console.error("Error in Fetching Requests:", error);
      }
    };

    fetchRequests();
  }, []);

  const handleAccept = async (id) => {
    try {
      if (!id) {
        alert('Invalid appointment ID');
        return;
      }
      const response = await axios.post(process.env.REACT_APP_API_URL + '/accept-appointment', { id });
      if (response.status === 200) {
        alert('Request Accepted Successfully!');
        window.location.reload();
      } else {
        alert(response.data.message || "Error accepting the appointment");
      }
    } catch (error) {
      console.error("Error in Accepting:", error);
      alert("Failed to accept class request.");
    }
  };

  const handleReject = async (id) => {
    if (!window.confirm("Are you sure you want to reject this request?")) return;
    try {
      const response = await axios.post(process.env.REACT_APP_API_URL + '/delete-appointment', { id });
      if (response.status === 200) {
        alert('Request Rejected and Removed.');
        window.location.reload();
      } else {
        alert(response.data.message ? response.data.message : "Error rejecting appointment");
      }
    } catch (error) {
      console.error("Error in Rejecting:", error);
      alert("Failed to reject class request.");
    }
  };

  return (
    <div className="requests-grid">
      {requests.length === 0 ? (
        <div className="card empty-state-card text-center py-5 px-4 text-muted border-0 shadow-none">
          <span style={{ fontSize: '48px' }}>📭</span>
          <h4 className="mt-3 fw-bold text-secondary">No Class Requests Found</h4>
          <p className="mb-0 text-muted small">You do not have any incoming student booking requests at the moment.</p>
        </div>
      ) : (
        <div className="row g-4">
          {requests.map((request) => (
            <div key={request.id} className="col-md-12 col-lg-6 col-xxl-4">
              <div className="card request-card p-4">
                {/* Student Info */}
                <div className="d-flex align-items-center gap-3 mb-3">
                  <div className="student-avatar">
                    {request.uname ? request.uname.charAt(0).toUpperCase() : 'S'}
                  </div>
                  <div className="overflow-hidden">
                    <h5 className="student-name text-truncate mb-0" title={request.uname}>
                      {request.uname}
                    </h5>
                    <span className="student-email text-truncate d-block" title={request.email}>
                      {request.email}
                    </span>
                  </div>
                </div>

                {/* Language Badge */}
                <div className="mb-3">
                  <span className="badge bg-light text-primary border border-primary px-3 py-2 rounded-pill fw-bold" style={{ fontSize: '13px', textTransform: 'uppercase' }}>
                    🗣️ {request.language}
                  </span>
                </div>

                {/* Specifications */}
                <div className="specifications-box mb-3">
                  <div className="specifications-title mb-1">Specifications:</div>
                  <div className="specifications-text">
                    {request.Description ? (
                      request.Description
                    ) : (
                      <span className="text-black-50" style={{ fontStyle: 'italic' }}>
                        No specifications provided.
                      </span>
                    )}
                  </div>
                </div>

                {/* Schedule Box */}
                <div className="schedule-box mb-4 mt-auto">
                  <div className="schedule-title mb-2 d-flex align-items-center gap-2">
                    <span>📅</span>
                    <span>Class Timing</span>
                  </div>
                  <div className="d-flex flex-column gap-2">
                    <div className="schedule-time-row">
                      <span className="fw-semibold text-secondary">Start:</span>
                      <span className="text-dark fw-bold">
                        {new Date(request.start).toLocaleString([], { dateStyle: 'medium', timeStyle: 'short' })}
                      </span>
                    </div>
                    <div className="schedule-time-row">
                      <span className="fw-semibold text-secondary">End:</span>
                      <span className="text-dark fw-bold">
                        {new Date(request.end).toLocaleString([], { dateStyle: 'medium', timeStyle: 'short' })}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Footer Status and Actions */}
                <div className="d-flex align-items-center justify-content-between pt-3 border-top mt-auto">
                  <div>
                    {request.status === 'pending' && (
                      <Badge bg="none" className="bg-light text-warning border border-warning px-3 py-2 rounded-pill fw-bold" style={{ fontSize: '12px' }}>
                        🟡 Pending
                      </Badge>
                    )}
                    {request.status === 'accepted' && (
                      <Badge bg="none" className="bg-light text-success border border-success px-3 py-2 rounded-pill fw-bold" style={{ fontSize: '12px' }}>
                        🟢 Accepted
                      </Badge>
                    )}
                    {request.status === 'rejected' && (
                      <Badge bg="none" className="bg-light text-danger border border-danger px-3 py-2 rounded-pill fw-bold" style={{ fontSize: '12px' }}>
                        🔴 Rejected
                      </Badge>
                    )}
                  </div>

                  <div className="d-flex gap-2">
                    {request.status === 'pending' && (
                      <>
                        <Button
                          variant="success"
                          onClick={() => handleAccept(request.id)}
                          className="btn-3d btn-3d-success"
                        >
                          Accept
                        </Button>
                        <Button
                          variant="outline-danger"
                          onClick={() => handleReject(request.id)}
                          className="btn-3d btn-3d-danger"
                        >
                          Reject
                        </Button>
                      </>
                    )}
                    {request.status === 'accepted' && (
                      <Button
                        variant="primary"
                        onClick={() => navigate("/meet", { state: { props: request.email } })}
                        className="btn-3d btn-3d-primary"
                      >
                        🎥 Send Link
                      </Button>
                    )}
                    {request.status === 'rejected' && (
                      <span className="text-muted small fw-bold">Closed</span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default TeacherRequests;