import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./Dashboard.css";

const Dashboard = () => {
  const [stats, setStats] = useState({
    appointments: 0,
    patients: 0,
    upcomingAppointments: [],
    todayAppointments: [],
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const [appointmentsRes, upcomingRes, todayRes] = await Promise.all([
        axios.get("http://localhost:3000/api/appointments/appointments"),
        axios.get("http://localhost:3000/api/appointments/upcoming"),
        axios.get("http://localhost:3000/api/appointments/today"),
      ]);

      console.log("Upcoming Appointments Response:", upcomingRes.data); // Log the response
      console.log("Today's Appointments Response:", todayRes.data); // Log the response to check structure

      // Check if todayRes.data is an array before applying filter
      const todayAppointmentsFiltered = Array.isArray(todayRes.data)
        ? todayRes.data.filter(appointment => 
            appointment.status === "confirmed" || appointment.status === "pending")
        : [];

      setStats({
        appointments: appointmentsRes.data.length,
        patients: 0, // You can replace this with actual patient data if needed
        upcomingAppointments: upcomingRes.data,
        todayAppointments: todayAppointmentsFiltered,
      });
    } catch (error) {
      console.error("Error fetching dashboard data:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div className="loading">Loading dashboard...</div>;

  return (
    <div className="container">
      <div className="dashboard-header">
        <h1>Welcome Back!</h1>
        <p>Here's what's happening with your pets today.</p>
      </div>

      {/* ✅ Stats Section */}
      <div className="stats-grid">
        <div className="stat-card animate-fade-in" style={{ animationDelay: "0.1s" }}>
          <div className="stat-icon">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v6h-2zm0 8h2v2h-2z"/>
            </svg>
          </div>
          <h3>Total Appointments</h3>
          <div className="stat-number count-up">{stats.appointments}</div>
          <Link to="/totalAppointments" className="stat-link">View All</Link>
        </div>

        <div className="stat-card animate-fade-in" style={{ animationDelay: "0.2s" }}>
          <div className="stat-icon">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
            </svg>
          </div>
          <h3>Registered Patients</h3>
          <div className="stat-number count-up">{stats.patients}</div>
          <Link to="/patients" className="stat-link">Manage Patients</Link>
        </div>

        <div className="stat-card animate-fade-in" style={{ animationDelay: "0.3s" }}>
          <div className="stat-icon">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z"/>
            </svg>
          </div>
          <h3>User Role</h3>
          <div className="stat-role">Admin</div>
        </div>
      </div>

      {/* ✅ Today's Appointments */}
      <div className="today-section animate-slide-up" style={{ animationDelay: "0.4s" }}>
        <h2>Today's Appointments</h2>
        {stats.todayAppointments.length > 0 ? (
          <div className="appointments-list">
            {stats.todayAppointments.map((appointment, index) => (
              <div 
                key={appointment._id} 
                className="appointment-item animate-fade-in"
                style={{ animationDelay: `${0.5 + index * 0.1}s` }}
              >
                <div className="appointment-info">
                  <h4>{appointment.petName || "Unknown Pet"}</h4>
                  <p>{appointment.time}</p>
                  <span className={`status-badge ${appointment.status?.toLowerCase() || "pending"}`}>
                    {appointment.status || "Pending"}
                  </span>
                </div>
                <div className="appointment-actions">
                  <button className="btn-secondary">Details</button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="no-appointments">No appointments scheduled for today</p>
        )}
      </div>

      {/* ✅ Upcoming Appointments */}
      <div className="upcoming-section animate-slide-up" style={{ animationDelay: "0.6s" }}>
        <h2>Upcoming Appointments</h2>
        {stats.upcomingAppointments.data.length > 0 ? (
          <div className="appointments-list">
            {stats.upcomingAppointments.data.map((appointment, index) => (
              <div 
                key={appointment._id} 
                className="appointment-item animate-fade-in"
                style={{ animationDelay: `${0.7 + index * 0.1}s` }}
              >
                <div className="appointment-info">
                  <h4>{appointment.petName || "Unknown Pet"}</h4>
                  <p>{appointment.date} at {appointment.time}</p>
                  <span className={`status-badge ${appointment.status?.toLowerCase() || "pending"}`}>
                    {appointment.status || "Pending"}
                  </span>
                </div>
                <div className="appointment-actions">
                  <button className="btn-secondary">Details</button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="no-appointments">No upcoming appointments</p>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
