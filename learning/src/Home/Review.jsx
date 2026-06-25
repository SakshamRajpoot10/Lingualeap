import React from 'react';
import './Review.css';

const reviews = [
  {
    name: "Sarah Lee",
    role: "Teacher",
    img: "image/review1.jpeg",
    text: "As a teacher on this platform, I appreciate the personalized approach to teach each student.",
  },
  {
    name: "Sameer Kaur",
    role: "Student",
    img: "image/review2.jpeg",
    text: "As a student on this platform, I appreciate the personalised approach to learn. Highly Recommended!!",
  },
  {
    name: "Priya Sharma",
    role: "Teacher",
    img: "image/review3.jpeg",
    text: "The resources and support for teachers are excellent. My students are thriving!",
  },
  {
    name: "Rahul Verma",
    role: "Student",
    img: "image/review4.png",
    text: "The interactive lessons make learning fun and effective. I love Lingua Leap!",
  },
];

function Review() {
  return (
    <div className="container-fluid backreview">
      <div className="container">
        <h1 className="text-center mt-4 mb-2">What Our Users Say</h1>
        <h5 className="text-center mb-4 text-muted">Real experiences from teachers and students</h5>
        <div className="row justify-content-center">
          {reviews.map((review, idx) => (
            <div className="col-md-5 text-center mt-4 mb-4" key={idx}>
              <div className="reviewimage backcard p-3">
                <img
                  src={review.img}
                  alt={`${review.name} - ${review.role}`}
                  className="imagereview mt-2 mb-2"
                  style={{ borderRadius: "50%", width: 80, height: 80, objectFit: "cover" }}
                />
                <h6 className="mb-1">{review.name} <br /><span className="text-muted" style={{ fontSize: "0.95em" }}>{review.role}</span></h6>
                <div className="mb-2" style={{ color: "#FFD700", fontSize: "1.1em" }}>
                  ★★★★★
                </div>
                <p className="content pb-2">{review.text}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Review;