import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Patients = () => {
  // Get user from localStorage if needed
  const user = JSON.parse(localStorage.getItem('user'));

  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    species: '',
    breed: '',
    age: '',
    weight: ''
  });

  useEffect(() => {
    fetchPatients();
  }, []);

  const fetchPatients = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/patients');
      let data = response.data;

      // Optional: filter by logged-in user
      if (user) {
        data = data.filter(patient => patient.userId === user._id);
      }

      setPatients(data);
    } catch (error) {
      console.error('Error fetching patients:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/patients', formData);
      setShowForm(false);
      setFormData({ name: '', species: '', breed: '', age: '', weight: '' });
      fetchPatients(); // Refresh the list
    } catch (error) {
      console.error('Error creating patient:', error);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  if (loading) return <div className="loading">Loading patients...</div>;

  return (
    <div className="container">
      <div className="page-header">
        <h1>My Patients</h1>
        <button 
          className="btn-primary"
          onClick={() => setShowForm(!showForm)}
        >
          {showForm ? 'Cancel' : 'Add New Patient'}
        </button>
      </div>

      {showForm && (
        <div className="patient-form">
          <h3>Register New Patient</h3>
          <form onSubmit={handleSubmit}>
            <div className="form-row">
              <div className="form-group">
                <label>Pet Name *</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <label>Species *</label>
                <select
                  name="species"
                  value={formData.species}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select Species</option>
                  <option value="dog">Dog</option>
                  <option value="cat">Cat</option>
                  <option value="bird">Bird</option>
                  <option value="reptile">Reptile</option>
                  <option value="other">Other</option>
                </select>
              </div>
            </div>
            
            <div className="form-row">
              <div className="form-group">
                <label>Breed</label>
                <input
                  type="text"
                  name="breed"
                  value={formData.breed}
                  onChange={handleChange}
                />
              </div>
              <div className="form-group">
                <label>Age (years)</label>
                <input
                  type="number"
                  name="age"
                  value={formData.age}
                  onChange={handleChange}
                  min="0"
                  step="0.1"
                />
              </div>
              <div className="form-group">
                <label>Weight (kg)</label>
                <input
                  type="number"
                  name="weight"
                  value={formData.weight}
                  onChange={handleChange}
                  min="0"
                  step="0.1"
                />
              </div>
            </div>
            
            <button type="submit" className="btn-primary">
              Register Patient
            </button>
          </form>
        </div>
      )}

      <div className="patients-grid">
        {patients.map((patient) => (
          <div key={patient._id} className="patient-card">
            <div className="patient-header">
              <h3>{patient.name}</h3>
              <span className="species-badge">{patient.species}</span>
            </div>
            
            <div className="patient-details">
              <p><strong>Breed:</strong> {patient.breed || 'Unknown'}</p>
              <p><strong>Age:</strong> {patient.age ? `${patient.age} years` : 'Unknown'}</p>
              <p><strong>Weight:</strong> {patient.weight ? `${patient.weight} kg` : 'Unknown'}</p>
            </div>

            <div className="patient-actions">
              <Link to={`/patients/${patient._id}`} className="btn-secondary">
                View Details
              </Link>
              <button className="btn-primary">
                Schedule Appointment
              </button>
            </div>
          </div>
        ))}
      </div>

      {patients.length === 0 && !showForm && (
        <div className="empty-state">
          <h3>No patients registered yet</h3>
          <p>Add your first patient to get started!</p>
          <button 
            className="btn-primary"
            onClick={() => setShowForm(true)}
          >
            Add First Patient
          </button>
        </div>
      )}
    </div>
  );
};

export default Patients;
