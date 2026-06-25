import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from 'react-router-dom';
import "./StudyMaterial.css";

function StudyMaterial() {
  const [name1, setName1] = useState('');
  const [email1, setEmail1] = useState('');
  
  // Form State
  const [title, setTitle] = useState('');
  const [filePath, setFilePath] = useState('');
  const [targetStudent, setTargetStudent] = useState('');
  const [selectedFileName, setSelectedFileName] = useState('');

  // Loaded State
  const [students, setStudents] = useState([]);
  const [sharedMaterials, setSharedMaterials] = useState([]);

  useEffect(() => {
    let email = localStorage.getItem('email');
    let name = localStorage.getItem("uname");
    setEmail1(email);
    setName1(name);

    if (email) {
      // 1. Fetch teacher appointments to extract unique accepted students
      axios.get(process.env.REACT_APP_API_URL + '/fetch-appointments-teacher')
        .then(res => {
          const appointments = res.data.appointments || [];
          const accepted = appointments.filter(app => app.status === 'accepted');
          // Extract unique students
          const uniqueStudents = [];
          const seen = new Set();
          accepted.forEach(app => {
            if (!seen.has(app.email)) {
              seen.add(app.email);
              uniqueStudents.push({ name: app.uname, email: app.email });
            }
          });
          setStudents(uniqueStudents);
          if (uniqueStudents.length > 0) {
            setTargetStudent(uniqueStudents[0].email);
          }
        })
        .catch(err => console.error("Error fetching students list:", err));

      // 2. Fetch already shared materials
      fetchSharedMaterials(email);
    }
  }, []);

  const fetchSharedMaterials = (teacherEmail) => {
    axios.get(process.env.REACT_APP_API_URL + '/api/teacher/materials', {
      params: { teacher_email: teacherEmail }
    })
    .then(res => {
      setSharedMaterials(res.data || []);
    })
    .catch(err => console.error("Error fetching shared materials:", err));
  };

  // Read file as Base64 Data URL and prepend original filename
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFileName(file.name);
      const reader = new FileReader();
      reader.onloadend = () => {
        // Format: original_filename|base64_data_url
        setFilePath(`${file.name}|${reader.result}`);
      };
      reader.readAsDataURL(file);
    }
  };

  // Download Base64 File helper
  const handleDownload = (filePathStr, docTitle) => {
    try {
      if (filePathStr && filePathStr.includes('|')) {
        const parts = filePathStr.split('|');
        const fileName = parts[0];
        const base64Data = parts[1];
        
        const link = document.createElement('a');
        link.href = base64Data;
        link.download = fileName;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      } else if (filePathStr) {
        window.open(filePathStr, '_blank');
      }
    } catch (error) {
      console.error("Error downloading file:", error);
    }
  };

  const handleUpload = (e) => {
    e.preventDefault();
    if (!title) {
      alert("Please enter a document title");
      return;
    }
    if (!filePath) {
      alert("Please select or specify a file path");
      return;
    }

    const payload = {
      teacher_email: email1,
      student_email: targetStudent || 'All',
      title: title,
      file_path: filePath
    };

    axios.post(process.env.REACT_APP_API_URL + '/api/teacher/upload-material', payload)
      .then(res => {
        alert("Study material shared successfully!");
        setTitle('');
        setFilePath('');
        setSelectedFileName('');
        fetchSharedMaterials(email1);
      })
      .catch(err => {
        console.error(err);
        alert("Failed to upload study material");
      });
  };

  const handleDeleteMaterial = (id) => {
    if (!window.confirm("Are you sure you want to revoke access and delete this document?")) return;
    axios.delete(process.env.REACT_APP_API_URL + `/api/teacher/materials/${id}`)
      .then(res => {
        alert("Access revoked and document deleted successfully!");
        fetchSharedMaterials(email1);
      })
      .catch(err => {
        console.error(err);
        alert("Failed to delete document");
      });
  };

  return (
    <>
      <div className="mainBody-component-22">
        {/* Sidebar */}
        <div className="col-md-3 bg-white">
          <div className="mt-2 text-center backSTART">
            <img src="image/aadmin.png" alt="" className="mt-2" />
            <h4><b>{name1}</b></h4>
            <h6 className="pb-3">Teacher</h6>
          </div>
          <hr />
          <h6 className="mt-4">
            <img src="/image/coursess.png" alt="" className="view mx-2" />
            <Link to="/teacherDash">Language Expertise</Link>
          </h6>
          <hr />
          <h6 className="mt-4">
            <img src="image/profiles.png" alt="" className="view mx-2" />
            <Link to="/teacherprofile">Profile</Link>
          </h6>
          <hr />
          <h6 className="mt-4">
            <img src="image/updatedcalendar.png" alt="" className="view mx-2" />
            <Link to="/teachercalendar">Student Request</Link>
          </h6>
          <hr />
          <h6 className="mt-4 active">
            <img src="image/studymaterial.png" alt="" className="view mx-2" />
            <Link to="/studymaterial">Upload Study Material</Link>
          </h6>
          <hr />
          <h6 className="mt-4">
            <img src="image/updatedcalendar.png" alt="" className="view mx-2" />
            <Link to="/studentreviews">Student Reviews & Wishes</Link>
          </h6>
          <hr />
          <h6 className="mt-4" onClick={() => localStorage.clear()} style={{ cursor: 'pointer' }}>
            <img src="image/meeting.png" alt="" className="view mx-2" style={{ opacity: 0.7 }} />
            <Link to="/">Log Out</Link>
          </h6>
          <hr />
        </div>

        {/* Upload Materials Panel */}
        <div className="col-md-9 p-5 overflow-auto" style={{ height: "100vh" }}>
          <div className="mb-4">
            <h1 className="text-primary fw-bold"><b>Upload & Share Study Material</b></h1>
            <p className="text-muted">Upload exercises, reading sheets, or vocabulary PDFs from your system and share them specifically with targeted students.</p>
          </div>

          <div className="row">
            {/* Left Column: Upload Form */}
            <div className="col-lg-5 mb-4">
              <div className="card border-0 shadow-lg p-4 bg-white" style={{ borderRadius: '18px' }}>
                <h3 className="fw-bold mb-4 text-dark border-bottom pb-2">Share New Document</h3>
                
                <form onSubmit={handleUpload}>
                  <div className="form-group mb-3">
                    <label className="fw-bold mb-1 text-secondary">Document Title</label>
                    <input 
                      type="text" 
                      className="form-control" 
                      placeholder="e.g. Chapter 2 Vocabulary Practice" 
                      value={title} 
                      onChange={(e) => setTitle(e.target.value)}
                      required
                    />
                  </div>

                  <div className="form-group mb-3">
                    <label className="fw-bold mb-1 text-secondary">Select Student Target</label>
                    <select 
                      className="form-control" 
                      value={targetStudent} 
                      onChange={(e) => setTargetStudent(e.target.value)}
                      required
                    >
                      <option value="All">📢 Share with All Students</option>
                      {students.map(std => (
                        <option key={std.email} value={std.email}>
                          👤 {std.name} ({std.email})
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="form-group mb-4">
                    <label className="fw-bold mb-1 text-secondary">Select Document File</label>
                    <div className="border border-dashed p-3 rounded text-center" style={{ borderStyle: 'dashed', borderColor: '#cbd5e1', cursor: 'pointer', background: '#f8fafc' }} onClick={() => document.getElementById('file-picker').click()}>
                      <span style={{ fontSize: '30px' }}>📁</span>
                      <p className="small mb-0 text-muted mt-2">
                        {selectedFileName ? `Selected: ${selectedFileName}` : "Click here to choose file from your system"}
                      </p>
                      <input 
                        type="file" 
                        id="file-picker" 
                        style={{ display: 'none' }} 
                        onChange={handleFileChange}
                      />
                    </div>
                  </div>

                  <button 
                    type="submit" 
                    className="btn btn-primary w-100 py-3 fw-bold shadow-sm" 
                    style={{ borderRadius: '10px', background: '#4f46e5', border: 'none' }}
                  >
                    Share Document
                  </button>
                </form>
              </div>
            </div>

            {/* Right Column: Shared Documents Library */}
            <div className="col-lg-7">
              <div className="card border-0 shadow-lg p-4 bg-white" style={{ borderRadius: '18px', minHeight: '400px' }}>
                <h3 className="fw-bold mb-4 text-dark border-bottom pb-2">Shared Materials Library</h3>

                {sharedMaterials.length === 0 ? (
                  <div className="text-center py-5 text-muted">
                    <span style={{ fontSize: '48px' }}>📚</span>
                    <p className="mt-3 fw-bold mb-0">No documents shared yet.</p>
                    <p className="small text-muted mt-1">Uploaded documents will be listed here and visible to students.</p>
                  </div>
                ) : (
                  <div className="table-responsive">
                    <table className="table align-middle">
                      <thead>
                        <tr>
                          <th>Title</th>
                          <th>Shared With</th>
                          <th>Shared Date</th>
                          <th className="text-center">Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {sharedMaterials.map(mat => (
                          <tr key={mat.id}>
                            <td>
                              <div className="d-flex align-items-center gap-2">
                                <span style={{ fontSize: '20px' }}>📄</span>
                                <span 
                                  className="fw-bold text-primary" 
                                  style={{ cursor: 'pointer', textDecoration: 'underline' }}
                                  onClick={() => handleDownload(mat.file_path, mat.title)}
                                  title="Click to download"
                                >
                                  {mat.title}
                                </span>
                              </div>
                            </td>
                            <td>
                              {mat.student_email === 'All' ? (
                                <span className="badge bg-light text-primary border border-primary px-2 py-1 rounded-pill">All Students</span>
                              ) : (
                                <span className="text-muted small" title={mat.student_email}>{mat.student_email}</span>
                              )}
                            </td>
                            <td className="text-muted small">
                              {new Date(mat.createdAt).toLocaleDateString([], { month: 'short', day: 'numeric', year: 'numeric' })}
                            </td>
                            <td className="text-center">
                              <button 
                                onClick={() => handleDeleteMaterial(mat.id)} 
                                className="btn btn-sm btn-outline-danger"
                                style={{ borderRadius: '6px' }}
                              >
                                Revoke
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default StudyMaterial;