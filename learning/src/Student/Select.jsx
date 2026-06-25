import React, { useState, useEffect } from "react";
import axios from "axios";
import './Select.css';
import { useNavigate } from "react-router-dom";

const Select = () => {
    const [languages, setLanguages] = useState([]);
    const navigate = useNavigate();
   
    useEffect(() => {
        axios.get(process.env.REACT_APP_API_URL + '/select')
            .then(response => {
                setLanguages(response.data);
            })
            .catch(error => {
                console.error("There was an error fetching the languages", error);
            });
    }, []);

    const handleSelectLanguage = (langName) => {
        localStorage.setItem('selectedLanguage', langName);
        navigate('/studentcalendar');
    };

    return (
        <div className="div890">
            <div className="main _mn25">
                <h1>Choose a Language to Learn</h1>
                <p className="text-muted text-center">Select one of our premium languages to begin scheduling your 1-on-1 live session.</p>
            </div>
            <div className="body _by25">
                <div className="inner _ir25 d-flex flex-wrap justify-content-center gap-3">
                    {languages.map((lang, index) => (
                        <div key={index} className="m-2">
                            <button 
                                className="hind _hn123 btn btn-lg py-3 px-5 shadow-sm" 
                                onClick={() => handleSelectLanguage(lang.lang_name)}
                                style={{ minWidth: '200px', borderRadius: '12px', fontWeight: '600' }}
                            >
                                {lang.lang_name}
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Select;