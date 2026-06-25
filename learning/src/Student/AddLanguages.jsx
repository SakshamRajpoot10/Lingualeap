// import React from 'react';
// import {useState, useEffect } from 'react'

// import './AddLanguages.css';
// import { Link } from 'react-router-dom';


// function AddLanguages() {
//     const [name2, setName2] = useState('');
//     const [selectedLanguage, setSelectedLanguage] = useState('');

//     useEffect(()=>{
//       let name2 = localStorage.getItem("uname");
//       setName2(name2);
     
//     },[])

//     const handleLanguageSelect = (language) => {
//         setSelectedLanguage(language);
//     };

//     return (
//         // <div>AddLanguages</div>
//         <>
//             <div className="container-fluid ">
//                 <div className="row">
//                 <div className="col-md-3 bg-white ">
//             <div className="mt-2 text-center backSTART ">
//               <img src="image/images2.png" alt="" className="mt-2 " />
//               <h4>
//                 <b>{name2}</b>
//               </h4>
//               <h6 className="pb-3">Student</h6>
//             </div>
//             <hr />
//             <h6 className="mt-4 mb-1">
//               {" "}
//               <img src="image/select.png" alt="" className="view mx-2" />
//               <Link to="/addlanguages">Select Language</Link>
//             </h6>
//             <hr />
//             <h6 className="mt-4  active">
//               {" "}
//               <img
//                 src="image/coursess.png"
//                 alt=""
//                 className="view mx-2 "
//               />{" "}
//               <Link to="/presentlearning">Present Learning</Link>
//             </h6>
//             <hr />
//             <h6 className="mt-4">
//               {" "}
//               <img
//                 src="image/updatedcalendar.png"
//                 alt=""
//                 className="view mx-2"
//               />
//               <Link to="/studentcalendar"> Request Status</Link>
//             </h6>
//             <hr />
//             <h6 className="mt-4">
//               {" "}
//               <img
//                 src="image/updatedcalendar.png"
//                 alt=""
//                 className="view mx-2"
//               />
//               <Link to="/addreview" > Add Review</Link>
//             </h6>
//             <hr />
//             <h6 className="mt-4">
//               {" "}
//               <img
//                 src="image/updatedcalendar.png"
//                 alt=""
//                 className="view mx-2"
//               />
//               <Link to="/"> Log Out</Link>
//             </h6>
//             <hr />
//           </div>

//                     <div className="col-md-9 ">
//                         <h1 className='mt-4 mb-4 mx-5 '><u>Select Languages</u></h1>
//                         <div className="container">
//                             <div className="row">
//                                 <div className="col-md-4">
//                                     <div className="container">
//                                         <div className="row">
//                                             <div className="col-md-12 text-center border ">
//                                                 <img src="image/image8.jpg" alt="" className='chapter admin_button mt-2' />
//                                                 <h1 className='text-center'><button value={}>German</button></h1>
//                                                 <Link to="/req" className='btn btn-primary mb-2 px-4'>Select</Link>

//                                             </div>
//                                         </div>
//                                     </div>
//                                 </div>
//                                 <div className="col-md-4">
//                                     <div className="container">
//                                         <div className="row">
//                                             <div className="col-md-12 text-center border ">
//                                                 <img src="image/english.png" alt="" className='chapter admin_button mt-2 border  border-1' />
//                                                 <h1 className='text-center'><b>English</b></h1>
//                                                 <Link to="/req" className='btn btn-primary mb-2 px-4'>Select</Link>
//                                             </div>
//                                         </div>
//                                     </div>
//                                 </div>
//                                 <div className="col-md-4">
//                                     <div className="container">
//                                         <div className="row">
//                                             <div className="col-md-12 text-center border ">
//                                                 <img src="image/image2.jpg" alt="" className='chapter admin_button mt-2 border  border-1' />
//                                                 <h1 className='text-center'><b>Korean</b></h1>
//                                                 <Link to="/req" className='btn btn-primary mb-2 px-4'>Select</Link>
//                                             </div>
//                                         </div>
//                                     </div>
//                                 </div>

//                             </div>
//                         </div>
//                         <div className="container mt-4">
//                             <div className="row">
//                                 <div className="col-md-4 mt-3 mb-3">
//                                     <div className="container">
//                                         <div className="row">
//                                             <div className="col-md-12 text-center border ">
//                                                 <img src="image/image4.jpg" alt="" className='chapter admin_button mt-2' />
//                                                 <h1 className='text-center'><b>Japanese</b></h1>

//                                                 <Link to="/req" className='btn btn-primary mb-2 px-4'>Select</Link>                                            </div>
//                                         </div>
//                                     </div>
//                                 </div>
//                                 <div className="col-md-4 mt-3 mb-3">
//                                     <div className="container">
//                                         <div className="row">
//                                             <div className="col-md-12 text-center border ">
//                                                 <img src="image/image10.jpg" alt="" className='chapter admin_button mt-2 border  border-1' />
//                                                 <h1 className='text-center'><b>Indonesian</b></h1>
//                                                 <Link to="/req" className='btn btn-primary mb-2 px-4'>Select</Link>                                            </div>
//                                         </div>
//                                     </div>
//                                 </div>
//                                 <div className="col-md-4 mt-3 mb-3">
//                                     <div className="container">
//                                         <div className="row">
//                                             <div className="col-md-12 text-center border ">
//                                                 <img src="image/image3.jpg" alt="" className='chapter admin_button mt-2 border  border-1' />
//                                                 <h1 className='text-center'><b>French</b></h1>

//                                                 <Link to="/req" className='btn btn-primary mb-2 px-4'>Select</Link>                                            </div>
//                                         </div>
//                                     </div>
//                                 </div>

//                             </div>
//                         </div>
//                     </div>

//                 </div>
//             </div>
//         </>
//     )
// }

// export default AddLanguages

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './AddLanguages.css';
import { Link } from 'react-router-dom';

function AddLanguages() {
    const [name2, setName2] = useState('');
    const [selectedLanguage, setSelectedLanguage] = useState('');
    const navigate = useNavigate();
    localStorage.setItem('selectedLanguage', selectedLanguage);

    useEffect(() => {
        const name = localStorage.getItem("uname");
        setName2(name);
    }, []);

    const handleLanguageSelect = (language) => {
        setSelectedLanguage(language);
    };

    const handleConfirmSelection = () => {
        console.log('Selected Language:', selectedLanguage);
        navigate('/studentcalendar');
    };

    return (
        <>
            <div className="container-fluid">
                <div className="row">
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
                        <h6 className="mt-4 active">
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
                        <h6 className="mt-4">
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

                    <div className="col-md-9 p-5 overflow-auto" style={{ height: '100vh' }}>
                        <h1 className='fw-bold text-dark mb-4'><b>Select a Language</b></h1>
                        <p className="text-muted mb-4">Choose a language to begin. Banners represent certified courses aligned to international CEFR standards.</p>
                        <div className="container-fluid p-0">
                            <div className="row">
                                {/* List of languages */}
                                {['German', 'English', 'Korean', 'Japanese', 'Indonesian', 'French'].map((language) => (
                                    <div className="col-md-4 mb-4" key={language}>
                                        <div className="card text-center p-3 h-100 d-flex flex-column justify-content-between align-items-center">
                                            <div className="w-100 d-flex justify-content-center align-items-center mb-3" style={{ height: '140px', overflow: 'hidden', borderRadius: '12px' }}>
                                                <img 
                                                    src={`image/${language.toLowerCase()}.png`} 
                                                    alt={language} 
                                                    className='img-fluid admin_button'
                                                    style={{ height: '100%', width: '100%', objectFit: 'cover' }}
                                                />
                                            </div>
                                            <h3 className='fw-bold mb-3' style={{ fontSize: '1.25rem' }}>{language}</h3>
                                            <button 
                                                className={`btn ${selectedLanguage === language ? 'btn-success' : 'btn-primary'} px-4 w-100`} 
                                                onClick={() => handleLanguageSelect(language)}
                                            >
                                                {selectedLanguage === language ? 'Selected' : 'Select'}
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="text-center mt-4 pt-3 border-top">
                            <button 
                                className="btn btn-primary btn-lg px-5" 
                                onClick={handleConfirmSelection} 
                                disabled={!selectedLanguage}
                            >
                                Confirm Language Selection
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default AddLanguages;
