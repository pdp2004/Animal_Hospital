// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import Service from './Service';

// const Services = () => {
//   const [services, setServices] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     fetchServices();
//   }, []);

//   const fetchServices = async () => {
//     try {
//       const response = await axios.get('http://localhost:5000/api/services');
//       setServices(response.data);
//     } catch (error) {
//       console.error('Error fetching services:', error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   if (loading) return <div className="loading">Loading services...</div>;

//   return (
//     <div className="container">
//       <div className="page-header">
//         <h1>Our Services</h1>
//         <p>Comprehensive veterinary care for your beloved pets</p>
//       </div>

//       <Service/>

//       {/* <div className="services-grid">
//         {services.map((service) => (
//           <div key={service._id} className="service-card">
//             <div className="service-icon">{service.icon || '🐾'}</div>
//             <h3>{service.name}</h3>
//             <p className="service-description">{service.description}</p>
//             <div className="service-details">
//               <span className="service-price">${service.price}</span>
//               <span className="service-duration">{service.duration} mins</span>
//             </div>
//             <button className="btn-primary">Book Appointment</button>
//           </div>
//         ))}
//       </div> */}

//       <div className="emergency-section">
//         <div className="emergency-card">
//           <h2>🚨 Emergency Services</h2>
//           <p>Available 24/7 for urgent pet care needs</p>
//           <div className="emergency-contact">
//             <p>Emergency Hotline: <strong>(555) 123-HELP</strong></p>
//             <p>After-hours: <strong>(555) 555-EMER</strong></p>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Services;