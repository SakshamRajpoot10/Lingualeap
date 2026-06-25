import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

function TeacherLogin() {
    const [uname, setUname] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();
        setError('');
        try {
            const response = await axios.post(process.env.REACT_APP_API_URL + '/kalu4login', { uname, email, password });

            if (response.data.status) {
                localStorage.setItem('email', email);
                localStorage.setItem('uname', uname);
                localStorage.setItem('role', 'teacher');
                navigate('/teacherdash');
            } else {
                setError('Invalid username, email, or password');
            }
        } catch (error) {
            setError('An error occurred while trying to log in');
        }
    };

    return (
        <>
            <div className="container">
                <div className="row">
                    <div className="container">
                        <div className="row">
                            <div className="col-md-6"> 
                                <section className="login-wrap mtb-40">
                                    <div className="container">
                                        <div className="row justify-content-center">
                                            <div className="col-md-12 mb-3">
                                                <div className="login-box">
                                                    <h1 className='text-center mb-4'>Teacher Login</h1>
                                                    <form onSubmit={handleSubmit}>
                                                        <div className="form-group">
                                                            <input type="text" name="uname" className="form-control" placeholder="Username" value={uname} onChange={(e) => setUname(e.target.value)} required />
                                                        </div>
                                                        <div className="form-group">
                                                            <input type="email" name="email" className="form-control" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                                                        </div>
                                                        <div className="form-group">
                                                            <input type="password" name="password" className="form-control" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                                                        </div>
                                                        <div className="form-group">
                                                            <button type="submit" className="btn btn-primary w-100">Log In</button>
                                                        </div>
                                                        <div className="form-group text-center">
                                                            New Member? <Link to="/teachersignup"><u>Sign Up Now</u></Link>
                                                        </div>
                                                    </form>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </section>
                            </div>
                            <div className="col-md-6">
                                <img src="image/onetoone.png" alt="" className="imagesss" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {error && (
                <div className="container text-center mt-3">
                    <div className="alert alert-danger d-inline-block" role="alert">
                        {error}
                    </div>
                </div>
            )}
        </>
    );
}

export default TeacherLogin;