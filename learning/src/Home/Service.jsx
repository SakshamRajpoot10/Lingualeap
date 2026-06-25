import React from 'react';
import './Service.css';

const features = [
  {
    img: "image/elearning2.png",
    alt: "One-to-One Interaction",
    title: "One-to-One Interaction",
    desc: "Personalized sessions for every learner to maximize understanding and growth."
  },
  {
    img: "image/onetoone.png",
    alt: "User Friendly Interface",
    title: "User Friendly Interface",
    desc: "A clean, intuitive platform that makes learning and teaching effortless."
  },
  {
    img: "image/elearning3.png",
    alt: "Flexible Session Scheduling",
    title: "Flexible Session Scheduling",
    desc: "Book sessions at your convenience and learn at your own pace."
  }
];

function Service() {
  return (
    <div className="container-fluid bg-white" id="services">
      <div className="row">
        <div className="col-md-12">
          <h3 className='text-center mt-5 text-muted'>FEATURES</h3>
          <h1 className='text-center mb-4 font-weight-bold'>Our Features & Services</h1>
          <h5 className='text-center mb-5 text-secondary'>Empowering your language journey with modern tools</h5>
          <div className="container">
            <div className="row">
              {features.map((feature, idx) => (
                <div className="col-md-4 mb-5 text-center" key={idx}>
                  <div className="card feature-card py-4 px-2 h-100 shadow-sm">
                    <img src={feature.img} alt={feature.alt} className='featureimage mb-3' />
                    <h4 className='text-center mb-2'>{feature.title}</h4>
                    <p className='text-center text-muted'>{feature.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Service;