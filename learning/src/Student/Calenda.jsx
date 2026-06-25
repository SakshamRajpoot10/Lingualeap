import React from 'react';
import axios from 'axios';
import './Calenda.css';
import { useState,useEffect } from 'react';
import Fullcalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
export default function Calenda() {
    const [events, setEvents] = useState([]);
    const [selectedRange, setSelectedRange] = useState(null);
    const [description, setDescription] = useState([]);
    const [name2, setName2] = useState('');
    const [email2, setEmail2] = useState('');
    const [language2, setLanguage2] = useState('');

    useEffect(() => {
      const name = localStorage.getItem("uname");
      const email = localStorage.getItem('email');
      const language = localStorage.getItem("selectedLanguage");
      setLanguage2(language);
      setName2(name);
      setEmail2(email);

      const fetchAppointments = async () => {
        try {
          const response = await axios.post(process.env.REACT_APP_API_URL + '/fetch-appointments', { name2: name, email2: email, language2: language });
          const appointments = response.data.appointments || [];
          const mappedEvents = appointments.map(appointment => ({
            title: `${appointment.language} (${appointment.status})`,
            start: appointment.start,
            end: appointment.end,
            color: appointment.status === 'accepted' ? '#43AA47' :
                   appointment.status === 'rejected' ? '#ef4444' :
                   appointment.status === 'pending' ? '#f59e0b' :
                   '#3b82f6'
          }));
          setEvents(mappedEvents);
        } catch (error) {
          console.error("Error fetching appointments:", error);
        }
      };

      fetchAppointments();
      const intervalId = setInterval(fetchAppointments, 15000); // Poll every 15 seconds

      return () => {
        clearInterval(intervalId); // Clean up on unmount
      };
    }, []);

    const handleDateSelect = (selectionInfo) => {
      setSelectedRange({
        start: selectionInfo.startStr,
        end: selectionInfo.endStr,
      });
    };
  

    const handleConfirm = async (e) => {
      if (e && e.preventDefault) {
        e.preventDefault();
      }
      if (selectedRange) {
        let name2 = localStorage.getItem("uname");  
        let email2 = localStorage.getItem("email");        
        let language2 = localStorage.getItem("selectedLanguage") || "Language Class";

        const newEvent = {
          title: `${language2} (pending)`,
          start: selectedRange.start,
          end: selectedRange.end,
          color: '#f59e0b',
        };
        setEvents([...events, newEvent]);
  
        const appointmentData = {
          uname: name2,
          email: email2,
          language: language2,
          start: selectedRange.start,
          end: selectedRange.end,
          status: 'pending',
          description: description
        };
  
        try {
          const response = await axios.post(process.env.REACT_APP_API_URL +'/request-appointment', appointmentData);

          if (response.status === 200) {
            console.log(response.data.message);
            alert("Appointment request sent successfully!");
            setDescription('');
          } else {
            alert(response.data.message || "Error Sending the appointment");
          }
        } catch (error) {
          console.error("Error in Requesting:", error);
          console.log(`${error.name} -> ${error.message}`);
          if (error.response) {
            alert("Error from server: " + error.response.data.message);
          } else if (error.request) {
            alert("No response from the server");
          } else {
            alert("Error setting up the request: " + error.message);
          }
        }
  
        setSelectedRange(null);
      }
    };
    

  return (
    <div className='Cal-12 p-3 rounded shadow-sm' style={{ backgroundColor: '#ffffff', border: '1px solid #e2e8f0', marginTop: '10px' }}>
      
      {/* Request Status Bar / Legend */}
      <div className="request-status-bar d-flex justify-content-center gap-4 mb-3 p-2 rounded" style={{ background: '#f8fafc', border: '1px solid #e2e8f0', fontSize: '14px', fontWeight: '600' }}>
        <div className="status-item d-flex align-items-center gap-2">
          <span style={{ display: 'inline-block', width: '12px', height: '12px', borderRadius: '50%', backgroundColor: '#f59e0b' }}></span>
          <span style={{ color: '#475569' }}>🟡 Pending Request</span>
        </div>
        <div className="status-item d-flex align-items-center gap-2">
          <span style={{ display: 'inline-block', width: '12px', height: '12px', borderRadius: '50%', backgroundColor: '#43AA47' }}></span>
          <span style={{ color: '#475569' }}>🟢 Accepted Class</span>
        </div>
        <div className="status-item d-flex align-items-center gap-2">
          <span style={{ display: 'inline-block', width: '12px', height: '12px', borderRadius: '50%', backgroundColor: '#ef4444' }}></span>
          <span style={{ color: '#475569' }}>🔴 Rejected / Cancelled</span>
        </div>
      </div>

      <Fullcalendar
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
        initialView={"timeGridWeek"}
        selectable={true}
        select={handleDateSelect}
        events={events}
        headerToolbar={{
          start: "prev,next today",
          center: "title",
          end: "dayGridMonth,timeGridWeek,timeGridDay",
        }}
        height={"580px"}
      />

      <div className="d-flex justify-content-center mt-3">
        <center>
          <form onSubmit={(e) => { e.preventDefault(); handleConfirm(e); }}>
            <div className="d-flex align-items-center gap-2 mt-2">
              <input 
                className='form-control langdes mb-0' 
                type='text' 
                placeholder='Enter specifications (e.g. topic, level)' 
                value={description} 
                onChange={(e) => setDescription(e.target.value)}
                required
                style={{ width: '320px', height: '44px', borderRadius: '8px' }}
              />
              <button
                type="submit"
                disabled={!selectedRange}
                className="btn btn-primary but-12"
                style={{ height: '44px', borderRadius: '8px', padding: '0 24px', fontWeight: '600' }}
              >
                Send Request
              </button>
            </div>
            {!selectedRange && (
              <p className="text-muted small mt-2">💡 Select a time slot on the calendar grid first, then type specifications and click Send.</p>
            )}
          </form>
        </center>
      </div>
    </div>
  );
}