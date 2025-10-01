import React, { useEffect, useState } from "react";
import axios from "axios";
import "./TotalAppointments.css";

const TotalAppointments = () => {
  const [appointments, setAppointments] = useState([]);
  const [count, setCount] = useState(0);
  const [displayCount, setDisplayCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // ✅ Fetch appointments
  const fetchAppointments = async () => {
    try {
      setLoading(true);
      const res = await axios.get(
        "http://localhost:3000/api/appointments/appointments"
      );

      const data = Array.isArray(res.data)
        ? res.data
        : res.data.appointments || [];

      setAppointments(data);
      setCount(data.length);
      setError("");
    } catch (err) {
      console.error("Error fetching appointments:", err);
      setError("Failed to fetch appointments.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAppointments();
  }, []);

  // ✅ Animated count effect
  useEffect(() => {
    let timer;
    if (count > 0) {
      let start = 0;
      const duration = 1000;
      const increment = count / (duration / 20);

      timer = setInterval(() => {
        start += increment;
        if (start >= count) {
          clearInterval(timer);
          setDisplayCount(count);
        } else {
          setDisplayCount(Math.floor(start));
        }
      }, 20);
    } else {
      setDisplayCount(0);
    }
    return () => clearInterval(timer);
  }, [count]);

  // ✅ Confirm appointment
  const handleConfirm = async (id) => {
    try {
      await axios.put(`http://localhost:3000/api/appointments/${id}/confirm`);
      fetchAppointments();
    } catch (err) {
      console.error("Error confirming appointment:", err);
      alert("Failed to confirm appointment.");
    }
  };

  // ✅ Cancel appointment
  const handleCancel = async (id, type) => {
    if (type === 1) {
      alert("Admin appointments cannot be cancelled.");
      return;
    }
    try {
      await axios.put(`http://localhost:3000/api/appointments/${id}/cancel`);
      fetchAppointments();
    } catch (err) {
      console.error("Error cancelling appointment:", err);
      alert("Failed to cancel appointment.");
    }
  };

  // ✅ Complete appointment
  const handleComplete = async (id) => {
    try {
      await axios.put(`http://localhost3000/api/appointments/${id}/complete`);
      fetchAppointments();
    } catch (err) {
      console.error("Error completing appointment:", err);
      alert("Failed to mark appointment as completed.");
    }
  };

  return (
    <div className="appointments-container">
      <h2>Total Appointments</h2>
      <div className="total-count">
        <span className="count">{displayCount}</span>
      </div>

      {loading ? (
        <p>Loading appointments...</p>
      ) : error ? (
        <p className="error">{error}</p>
      ) : appointments.length === 0 ? (
        <p>No appointments found.</p>
      ) : (
        <div className="appointments-grid">
          {appointments.map((appt) => {
            const status = appt.status || "Pending";
            const type = appt.appointmentType === 1 ? "Admin" : "User";

            return (
              <div key={appt._id} className="appointment-card">
                <div className="card-header">
                  <h3>
                    {appt.petName} {appt.breed && <span>({appt.breed})</span>}
                  </h3>
                  <span className={`status-badge ${status.toLowerCase()}`}>
                    {status}
                  </span>
                </div>

                <div className="card-details">
                  <div className="detail-row">
                    <span className="label">Owner:</span>{" "}
                    {appt.ownerName || "N/A"}
                  </div>
                  <div className="detail-row">
                    <span className="label">Age:</span> {appt.age || "N/A"}
                  </div>
                  <div className="detail-row">
                    <span className="label">Gender:</span> {appt.gender || "N/A"}
                  </div>
                  <div className="detail-row">
                    <span className="label">Location:</span>{" "}
                    {appt.location || "N/A"}
                  </div>
                  <div className="detail-row">
                    <span className="label">Address:</span>{" "}
                    {appt.address || "N/A"}
                  </div>
                  <div className="detail-row">
                    <span className="label">Preventive Care:</span>{" "}
                    {appt.preventiveCare || "N/A"}
                  </div>
                  <div className="detail-row">
                    <span className="label">Consultation:</span>{" "}
                    {appt.consultation || "N/A"}
                  </div>
                  <div className="detail-row">
                    <span className="label">Booked On:</span>{" "}
                    {appt.createdAt
                      ? new Date(appt.createdAt).toLocaleString()
                      : "N/A"}
                  </div>
                  <div className="detail-row">
                    <span className="label">Appointment Type:</span> {type}
                  </div>
                </div>

                <div className="card-actions">
                  {/* Confirm */}
                  {status === "Pending" && (
                    <button
                      className="btn-confirm"
                      onClick={() => handleConfirm(appt._id)}
                    >
                      Confirm
                    </button>
                  )}

                  {/* Cancel */}
                  {status !== "Cancelled" && status !== "Completed" && (
                    <button
                      className="btn-cancel"
                      onClick={() =>
                        handleCancel(appt._id, appt.appointmentType)
                      }
                      disabled={appt.appointmentType === 1}
                    >
                      Cancel
                    </button>
                  )}

                  {/* Complete */}
                  {status === "Confirmed" && (
                    <button
                      className="btn-complete"
                      onClick={() => handleComplete(appt._id)}
                    >
                      Mark as Completed
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default TotalAppointments;
