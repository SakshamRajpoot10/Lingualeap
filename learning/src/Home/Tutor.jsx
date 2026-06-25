import React from 'react';
import './Tutor.css';

function Tutor() {
  return (
    <div className="container-fluid bg-white py-5">
      <div className="container">
        <div className="row align-items-center">
          <div className="col-md-6 mb-4 mb-md-0">
            <h5 className="text-muted mb-2">FOR TUTORS & STUDENTS</h5>
            <h1 className='tutor-title mb-3'>How does Lingua Leap work?</h1>
            <p className="tutor-desc mb-4">
              Experience our interactive online lesson space—where you’ll deliver life-changing tuition to students who need it most, all from the comfort of your home. Flexible, engaging, and just a click away!
            </p>
            <div className="tutor-highlight">
              <span>✔ Real-time video & chat</span>
              <span>✔ Interactive whiteboard</span>
              <span>✔ Lesson recording & resources</span>
            </div>
          </div>
          <div className="col-md-6 text-center">
            <img src="image/tutor.jpg" alt="Lingua Leap Online Lesson Space" className='tutor_image img-fluid rounded shadow' />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Tutor;