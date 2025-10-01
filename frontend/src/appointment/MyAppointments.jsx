import React, { useEffect, useState } from "react";
import axios from "axios";
import "./MyAppointments.css";

const MyAppointments = () => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState({});
  const [successMessage, setSuccessMessage] = useState("");

  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    if (!user) {
      setLoading(false);
      return;
    }

    const fetchAppointments = async () => {
      try {
        const res = await axios.get("http://localhost:3000/api/appointments/appointments");
        setAppointments(
          res.data.map((appt) => ({
            ...appt,
            status: appt.status || "Confirmed",
          }))
        );
      } catch (error) {
        console.error("Error fetching appointments:", error);
        setError("Failed to fetch appointments. Please try again later.");
      } finally {
        setLoading(false);
      }
    };
    fetchAppointments();
  }, [user]);

  // ✅ Cancel appointment
  const handleCancelAppointment = async (id) => {
    if (!window.confirm("Are you sure you want to cancel this appointment?")) return;
    try {
      await axios.put(`http://localhost:3000/api/appointments/${id}`, { status: "Cancelled" });
      setAppointments((prev) =>
        prev.map((appt) =>
          appt._id === id ? { ...appt, status: "Cancelled" } : appt
        )
      );
      setSuccessMessage("Appointment cancelled successfully!");
      setError("");
      setTimeout(() => setSuccessMessage(""), 3000);
    } catch (error) {
      console.error("Error cancelling appointment:", error);
      setError("Failed to cancel appointment. Please try again.");
    }
  };

  // ✅ Edit appointment
  const handleEditClick = (appt) => {
    setEditingId(appt._id);
    setForm({
      petName: appt.petName || "",
      breed: appt.breed || "",
      location: appt.location || "",
      preventiveCare: appt.preventiveCare || "",
      consultation: appt.consultation || "",
      age: appt.age || "",
      gender: appt.gender || "",
      address: appt.address || "",
    });
    setError("");
    setSuccessMessage("");
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = async (id) => {
    if (!form.petName || !form.breed || !form.location) {
      setError("Please fill in all required fields (Pet Name, Breed, and Location).");
      return;
    }

    try {
      await axios.put(`http://localhost:3000/api/appointments/${id}`, form);
      setAppointments((prev) =>
        prev.map((appt) =>
          appt._id === id ? { ...appt, ...form, status: appt.status || "Confirmed" } : appt
        )
      );
      setEditingId(null);
      setSuccessMessage("Appointment updated successfully!");
      setError("");
      setTimeout(() => setSuccessMessage(""), 3000);
    } catch (error) {
      console.error("Error updating appointment:", error);
      setError("Failed to update appointment. Please try again.");
    }
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setError("");
  };

  if (loading)
    return (
      <div className="loading-container">
        <p className="loading">Loading appointments...</p>
      </div>
    );
  if (!user) return <p className="error">Please login to view your appointments.</p>;

  const userAppointments = appointments.filter((appt) => appt.ownerName === user.name);

  return (
    <div className="appointments-container">
      <h2>My Appointments</h2>

      {successMessage && <div className="success-message">{successMessage}</div>}
      {error && <div className="error-message">{error}</div>}

      <div className="appointments-grid">
        {userAppointments.length > 0 ? (
          userAppointments.map((appt) => (
            <div key={appt._id} className="appointment-card">
              {editingId === appt._id ? (
                <div className="edit-form">
                  <h3>Edit Appointment Details</h3>

                  {/* Pet Name + Breed */}
                  <div className="form-row">
                    <div className="form-group">
                      <label>Pet Name *</label>
                      <input
                        type="text"
                        name="petName"
                        value={form.petName}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label>Breed *</label>
                      <input
                        type="text"
                        name="breed"
                        value={form.breed}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>

                  {/* Age + Gender */}
                  <div className="form-row">
                    <div className="form-group">
                      <label>Age</label>
                      <input
                        type="number"
                        name="age"
                        value={form.age}
                        onChange={handleChange}
                        min="0"
                      />
                    </div>
                    <div className="form-group">
                      <label>Gender</label>
                      <select name="gender" value={form.gender} onChange={handleChange}>
                        <option value="">Select Gender</option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                      </select>
                    </div>
                  </div>

                  {/* Location */}
                  <div className="form-group">
                    <label>Location *</label>
                    <input
                      type="text"
                      name="location"
                      value={form.location}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  {/* Address */}
                  <div className="form-group">
                    <label>Address</label>
                    <textarea
                      name="address"
                      value={form.address}
                      onChange={handleChange}
                      rows="3"
                    ></textarea>
                  </div>

                  {/* Preventive Care + Consultation */}
                  <div className="form-row">
                    <div className="form-group">
                      <label>Preventive Care</label>
                      <select
                        name="preventiveCare"
                        value={form.preventiveCare}
                        onChange={handleChange}
                      >
                        <option value="Vaccination">Vaccination</option>
                        <option value="Deworming">Deworming</option>
                        <option value="Health Check">Health Check</option>
                      </select>
                    </div>
                    <div className="form-group">
                      <label>Consultation Type</label>
                      <select
                        name="consultation"
                        value={form.consultation}
                        onChange={handleChange}
                      >
                        <option value="">Select Type</option>
                        <option value="General Consultation">General Consultation</option>
                        <option value="Emergency">Emergency</option>
                        <option value="Follow-up">Follow-up</option>
                        <option value="Specialist">Specialist</option>
                      </select>
                    </div>
                  </div>

                  {/* Buttons */}
                  <div className="form-actions">
                    <button className="btn-primary" onClick={() => handleSave(appt._id)}>
                      Save Changes
                    </button>
                    <button className="btn-secondary" onClick={handleCancelEdit}>
                      Cancel
                    </button>
                  </div>
                </div>
              ) : (
                <>
                  {/* Appointment View Mode */}
                  <div className="card-header">
                    <h3>
                      {appt.petName} {appt.breed && <span>({appt.breed})</span>}
                    </h3>
                    <span
                      className={`status-badge ${appt.status ? appt.status.toLowerCase() : "confirmed"
                        }`}
                    >
                      {appt.status ? appt.status : "Confirmed"}
                    </span>
                  </div>

                  <div className="card-details">
                    <div className="detail-row">
                      <span className="label">Owner:</span>
                      <span className="value">{appt.ownerName}</span>
                    </div>
                    <div className="detail-row">
                      <span className="label">Age:</span>
                      <span className="value">{appt.age || "N/A"} years</span>
                    </div>
                    <div className="detail-row">
                      <span className="label">Gender:</span>
                      <span className="value">{appt.gender || "N/A"}</span>
                    </div>
                    <div className="detail-row">
                      <span className="label">Location:</span>
                      <span className="value">{appt.location}</span>
                    </div>
                    <div className="detail-row">
                      <span className="label">Address:</span>
                      <span className="value">{appt.address || "N/A"}</span>
                    </div>
                    <div className="detail-row">
                      <span className="label">Preventive Care:</span>
                      <span className="value">{appt.preventiveCare || "N/A"}</span>
                    </div>
                    <div className="detail-row">
                      <span className="label">Consultation:</span>
                      <span className="value">{appt.consultation || "N/A"}</span>
                    </div>
                    <div className="detail-row">
                      <span className="label">Booked On:</span>
                      <span className="value">
                        {appt.createdAt ? new Date(appt.createdAt).toLocaleString() : "N/A"}
                      </span>
                    </div>
                    {/* ✅ Appointment Type */}
                    <div className="detail-row">
                      <span className="label">Appointment Type:</span>
                      <span className="value">
                        {appt.appointmentType === 1 ? "Admin" : "User"}
                      </span>
                    </div>
                  </div>

                  <div className="card-actions">
                    {appt.appointmentType === 0 && appt.status !== "Cancelled" && appt.status !== "Completed" && (
                      <>
                        <button className="btn-primary" onClick={() => handleEditClick(appt)}>
                          Update
                        </button>
                        <button
                          className="btn-danger"
                          onClick={() => handleCancelAppointment(appt._id)}
                        >
                          Cancel
                        </button>
                      </>
                    )}
                  </div>

                </>
              )}
            </div>
          ))
        ) : (
          <p className="no-appointments">No appointments found.</p>
        )}
      </div>
    </div>
  );
};

export default MyAppointments;