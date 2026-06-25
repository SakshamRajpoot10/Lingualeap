import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Review.css";
import { useNavigate } from "react-router-dom";

function ReviewS() {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [studentName, setStudentName] = useState("");
  const [studentEmail, setStudentEmail] = useState("");
  
  // Form State
  const [teacherEmail, setTeacherEmail] = useState("");
  const [reviewText, setReviewText] = useState("");
  const [reviewType, setReviewType] = useState("Review"); // 'Review' or 'Wish'
  
  // Teachers list
  const [teachers, setTeachers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    setIsPopupOpen(true);
    let email = localStorage.getItem('email');
    let name = localStorage.getItem("uname");
    setStudentEmail(email || "");
    setStudentName(name || "");

    // Fetch teachers list to review
    axios.get(process.env.REACT_APP_API_URL + "/api/student/my-teachers")
      .then(res => {
        const list = res.data || [];
        setTeachers(list);
        if (list.length > 0) {
          setTeacherEmail(list[0].email);
        }
      })
      .catch(err => console.error("Error fetching teachers:", err));
  }, []);

  const handleClosePopup = () => {
    setIsPopupOpen(false);
    navigate("/material"); // Navigate to materials/dashboard when closed
  };

  const handleSubmitReview = async (e) => {
    e.preventDefault();
    if (!teacherEmail) {
      alert("Please select a teacher to review");
      return;
    }
    if (!reviewText.trim()) {
      alert("Please enter your review or wish message");
      return;
    }

    try {
      const payload = {
        student_name: studentName,
        student_email: studentEmail,
        teacher_email: teacherEmail,
        review_text: reviewText,
        review_type: reviewType
      };

      const response = await axios.post(process.env.REACT_APP_API_URL + "/api/student/submit-review", payload);

      if (response.status === 200) {
        alert(reviewType === 'Wish' ? "Heartfelt wish sent to your teacher successfully!" : "Review submitted successfully!");
        setReviewText("");
        handleClosePopup();
      } else {
        alert("Error submitting review");
      }
    } catch (error) {
      console.error("Error submitting review:", error);
      alert("Failed to submit review");
    }
  };

  return (
    <div className="app">
      {isPopupOpen && (
        <div className="popup" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(15, 23, 42, 0.6)', backdropFilter: 'blur(8px)' }}>
          <div className="popup-content shadow-lg border-0 p-5" style={{ borderRadius: '24px', maxWidth: '550px', width: '90%', background: '#ffffff' }}>
            
            <div className="text-center mb-4">
              <span style={{ fontSize: '48px' }}>{reviewType === 'Wish' ? '💝' : '💬'}</span>
              <h2 className="fw-bold mt-2 text-dark">
                {reviewType === 'Wish' ? "Wish Your Teacher" : "Submit Course Review"}
              </h2>
              <p className="text-muted small">Share feedback or send holiday/thank-you greetings directly to your tutor's dashboard.</p>
            </div>

            <form onSubmit={handleSubmitReview}>
              {/* Type Selection */}
              <div className="form-group mb-4">
                <label className="fw-bold text-secondary mb-2">Select Message Category</label>
                <div className="d-flex gap-3">
                  <button
                    type="button"
                    className={`btn flex-fill py-2 fw-bold ${reviewType === 'Review' ? 'btn-primary' : 'btn-outline-primary'}`}
                    onClick={() => setReviewType('Review')}
                    style={{ borderRadius: '10px' }}
                  >
                    💬 Course Feedback
                  </button>
                  <button
                    type="button"
                    className={`btn flex-fill py-2 fw-bold ${reviewType === 'Wish' ? 'btn-warning text-white' : 'btn-outline-warning'}`}
                    onClick={() => setReviewType('Wish')}
                    style={{ borderRadius: '10px' }}
                  >
                    💝 Wish Teacher
                  </button>
                </div>
              </div>

              {/* Teacher Selector */}
              <div className="form-group mb-3">
                <label htmlFor="teacherSelect" className="fw-bold text-secondary mb-1">Select Tutors / Teachers</label>
                <select
                  id="teacherSelect"
                  className="form-control"
                  value={teacherEmail}
                  onChange={(e) => setTeacherEmail(e.target.value)}
                  required
                  style={{ height: '48px', borderRadius: '10px' }}
                >
                  {teachers.length === 0 ? (
                    <option value="">No teachers available</option>
                  ) : (
                    teachers.map((t) => (
                      <option key={t.email} value={t.email}>
                        👤 {t.uname} - {t.languages}
                      </option>
                    ))
                  )}
                </select>
              </div>

              {/* Message Box */}
              <div className="form-group mb-4">
                <label htmlFor="reviewText" className="fw-bold text-secondary mb-1">
                  {reviewType === 'Wish' ? "Your Greeting Message" : "Your Review / Feedback"}
                </label>
                <textarea
                  id="reviewText"
                  className="form-control"
                  rows="4"
                  placeholder={reviewType === 'Wish' ? "Write a holiday greeting, thank you note, or warm wishes..." : "Write details about your learning experience, course pace, and helpful feedback..."}
                  value={reviewText}
                  onChange={(e) => setReviewText(e.target.value)}
                  required
                  style={{ borderRadius: '10px', resize: 'none' }}
                />
              </div>

              {/* Action Buttons */}
              <div className="button-group d-flex gap-3">
                <button
                  type="submit"
                  className="btn btn-primary flex-fill py-3 fw-bold shadow-sm"
                  style={{ borderRadius: '10px', background: reviewType === 'Wish' ? '#ffc107' : '#4f46e5', border: 'none', color: reviewType === 'Wish' ? '#000' : '#fff' }}
                >
                  {reviewType === 'Wish' ? "Send Greeting" : "Submit Feedback"}
                </button>
                <button
                  type="button"
                  onClick={handleClosePopup}
                  className="btn btn-outline-secondary flex-fill py-3 fw-bold"
                  style={{ borderRadius: '10px' }}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default ReviewS;
