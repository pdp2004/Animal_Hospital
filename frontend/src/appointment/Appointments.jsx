import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Appointments = () => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);

  // Get logged-in user from localStorage
  const user = JSON.parse(localStorage.getItem('user'));

  useEffect(() => {
    fetchAppointments();
  }, []);

  const fetchAppointments = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/appointments');
      let data = response.data;

      // Optional: filter appointments for the logged-in user
      if (user) {
        data = data.filter(app => app.userId === user._id);
      }

      setAppointments(data);
    } catch (error) {
      console.error('Error fetching appointments:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="container">
      <h1>My Appointments</h1>
      <div className="appointments-grid">
        {appointments.map((appointment) => (
          <div key={appointment._id} className="appointment-card">
            <h3>{appointment.patient?.name}</h3>
            <p>Date: {new Date(appointment.dateTime).toLocaleString()}</p>
            <p>Service: {appointment.service?.name}</p>
            <p>Status: {appointment.status}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Appointments;
