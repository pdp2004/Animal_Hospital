// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import "./MyAppointments.css";

// const MyAppointments = () => {
//   const [appointments, setAppointments] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");
//   const [editingId, setEditingId] = useState(null);
//   const [form, setForm] = useState({});
//   const [successMessage, setSuccessMessage] = useState("");

//   const user = JSON.parse(localStorage.getItem("user"));

//   useEffect(() => {
//     const fetchAppointments = async () => {
//       try {
//         const res = await axios.get("http://localhost:5000/api/appointments/appointments");
//         setAppointments(res.data);
//       } catch (error) {
//         console.error("Error fetching appointments:", error);
//         setError("Failed to fetch appointments. Please try again later.");
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchAppointments();
//   }, []);

//   const handleDelete = async (id) => {
//     if (!window.confirm("Are you sure you want to delete this appointment?")) return;
//     try {
//       await axios.delete(`http://localhost:5000/api/appointments/${id}`);
//       setAppointments(appointments.filter((appt) => appt._id !== id));
//       setSuccessMessage("Appointment deleted successfully!");
//       setTimeout(() => setSuccessMessage(""), 3000);
//     } catch (error) {
//       console.error("Error deleting appointment:", error);
//       setError("Failed to delete appointment. Please try again.");
//     }
//   };

//   const handleEditClick = (appt) => {
//     setEditingId(appt._id);
//     setForm({ 
//       petName: appt.petName || "",
//       breed: appt.breed || "",
//       location: appt.location || "",
//       preventiveCare: appt.preventiveCare || "",
//       consultation: appt.consultation || "",
//       age: appt.age || "",
//       gender: appt.gender || "",
//       address: appt.address || ""
//     });
//     setError("");
//     setSuccessMessage("");
//   };

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setForm((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleSave = async (id) => {
//     if (!form.petName || !form.breed || !form.location) {
//       setError("Please fill in all required fields (Pet Name, Breed, and Location).");
//       return;
//     }
    
//     try {
//       await axios.put(`http://localhost:5000/api/appointments/${id}`, form);
//       setAppointments(
//         appointments.map((appt) => (appt._id === id ? { ...appt, ...form } : appt))
//       );
//       setEditingId(null);
//       setSuccessMessage("Appointment updated successfully!");
//       setTimeout(() => setSuccessMessage(""), 3000);
//     } catch (error) {
//       console.error("Error updating appointment:", error);
//       setError("Failed to update appointment. Please try again.");
//     }
//   };

//   const handleCancelEdit = () => {
//     setEditingId(null);
//     setError("");
//   };

//   if (loading) return <div className="loading-container"><p className="loading">Loading appointments...</p></div>;
//   if (!user) return <p className="error">Please login to view your appointments.</p>;

//   const userAppointments = appointments.filter((appt) => appt.ownerName === user.name);

//   return (
//     <div className="appointments-container">
//       <h2>My Appointments</h2>
      
//       {successMessage && <div className="success-message">{successMessage}</div>}
//       {error && <div className="error-message">{error}</div>}
      
//       {userAppointments.length > 0 && (
//         <div className="appointments-grid">
//           {userAppointments.map((appt) => (
//             <div key={appt._id} className="appointment-card">
//               {editingId === appt._id ? (
//                 <div className="edit-form">
//                   <h3>Edit Appointment Details</h3>
//                   {/* form inputs remain unchanged */}
//                   <div className="form-actions">
//                     <button className="btn-primary" onClick={() => handleSave(appt._id)}>
//                       Save Changes
//                     </button>
//                     <button className="btn-secondary" onClick={handleCancelEdit}>
//                       Cancel
//                     </button>
//                   </div>
//                 </div>
//               ) : (
//                 <>
//                   <div className="card-header">
//                     <h3>{appt.petName} {appt.breed && <span>({appt.breed})</span>}</h3>
//                     <span className={`status-badge ${appt.status || 'confirmed'}`}>
//                       {appt.status || 'Confirmed'}
//                     </span>
//                   </div>
                  
//                   <div className="card-details">
//                     <div className="detail-row">
//                       <span className="label">Owner:</span>
//                       <span className="value">{appt.ownerName}</span>
//                     </div>
//                     <div className="detail-row">
//                       <span className="label">Age:</span>
//                       <span className="value">{appt.age || 'N/A'} years</span>
//                     </div>
//                     <div className="detail-row">
//                       <span className="label">Gender:</span>
//                       <span className="value">{appt.gender || 'N/A'}</span>
//                     </div>
//                     <div className="detail-row">
//                       <span className="label">Location:</span>
//                       <span className="value">{appt.location}</span>
//                     </div>
//                     <div className="detail-row">
//                       <span className="label">Address:</span>
//                       <span className="value">{appt.address || 'N/A'}</span>
//                     </div>
//                     <div className="detail-row">
//                       <span className="label">Preventive Care:</span>
//                       <span className="value">{appt.preventiveCare || 'N/A'}</span>
//                     </div>
//                     <div className="detail-row">
//                       <span className="label">Consultation:</span>
//                       <span className="value">{appt.consultation || 'N/A'}</span>
//                     </div>
//                     <div className="detail-row">
//                       <span className="label">Booked On:</span>
//                       <span className="value">{new Date(appt.createdAt).toLocaleString()}</span>
//                     </div>
//                   </div>
                  
//                   <div className="card-actions">
//                     <button className="btn-primary" onClick={() => handleEditClick(appt)}>
//                       Edit
//                     </button>
//                     <button className="btn-danger" onClick={() => handleDelete(appt._id)}>
//                       Delete
//                     </button>
//                   </div>
//                 </>
//               )}
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// };

// export default MyAppointments;