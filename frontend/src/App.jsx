import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Login from './components/Login';
import Register from './components/Register';
import Dashboard from './pages/Dashboard';
import Appointments from './appointment/Appointments';
// import Patients from './pages/Patients';
import Service from './services/Service';
import ProtectedRoute from './components/ProtectedRoute';
import MyAppointments from './appointment/MyAppointments';
import BookAppointment from './appointment/BookAppointment';
import TotalAppointments from './appointment/TotalAppointments';
import './App.css';
import VerifyOtp from './components/VerifyOtp';

function App() {
  return (
    <Router>
       <Navbar />
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/verify-otp" element={<VerifyOtp />} />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/my-appointments"
            element={
              <ProtectedRoute>
                <MyAppointments/>
              </ProtectedRoute>
            }
          />
          <Route
            path="/bookappointment"
            element={
              <ProtectedRoute>
                <BookAppointment/>
              </ProtectedRoute>
            }
          />
          <Route
            path="/appointments"
            element={
              <ProtectedRoute>
                <Appointments />
              </ProtectedRoute>
            }
          />
          <Route
            path="/totalAppointments"
            element={
              <ProtectedRoute>
                <TotalAppointments/>
              </ProtectedRoute>
            }
          />
          {/* <Route
            path="/patients"
            element={
              <ProtectedRoute>
                <Patients />
              </ProtectedRoute>
            }
          /> */}
          <Route path="/services" element={<Service />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
