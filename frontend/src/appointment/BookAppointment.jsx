import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./BookAppointment.css";

function BookAppointment() {
  const navigate = useNavigate();

  // 🔹 Get user info from localStorage (set during login)
  const storedUser = JSON.parse(localStorage.getItem("user")) || {};
  // ✅ Works with either username or ownerName
  const defaultOwnerName = storedUser.name || storedUser.ownerName || "";

  const [form, setForm] = useState({
    location: "",
    preventiveCare: "",
    consultation: "",
    ownerName: defaultOwnerName, // ✅ Pre-fill with username/ownerName
    email: storedUser.email || "",
    number: "",
    petName: "",
    age: "",
    gender: "",
    breed: "",
    address: "",
    date: "",
    time: "",
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const today = new Date().toISOString().split("T")[0];

  useEffect(() => {
    // ✅ Ensure ownerName updates if user changes after login
    if (defaultOwnerName) {
      setForm((prev) => ({ ...prev, ownerName: defaultOwnerName }));
    }
  }, [defaultOwnerName]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const res = await axios.post(
        "http://localhost:5000/api/appointments/book",
        form
      );

      setMessage(res.data.message || "Booking submitted!");

      // Reset form (but keep ownerName and email)
      setForm({
        location: "",
        preventiveCare: "",
        consultation: "",
        ownerName: defaultOwnerName,
        email: storedUser.email || "",
        number: "",
        petName: "",
        age: "",
        gender: "",
        breed: "",
        address: "",
        date: "",
        time: "",
      });

      // ✅ Redirect after successful booking
      navigate("/my-appointments");
    } catch (error) {
      console.error(error);
      setMessage("❌ Error submitting booking. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    navigate("/");
  };

  // Generate time options between 10:00 and 19:00 in 30-min intervals
  const generateTimeOptions = () => {
    const options = [];
    const startHour = 10;
    const endHour = 19;
    const now = new Date();

    for (let h = startHour; h <= endHour; h++) {
      for (let m of [0, 30]) {
        const timeStr = `${String(h).padStart(2, "0")}:${String(m).padStart(
          2,
          "0"
        )}`;
        if (
          form.date === today &&
          (h < now.getHours() || (h === now.getHours() && m <= now.getMinutes()))
        ) {
          continue;
        }
        options.push(timeStr);
      }
    }
    return options;
  };

  const timeOptions = generateTimeOptions();

  return (
    <form className="booking-form" onSubmit={handleSubmit}>
      {/* Location & Preventive Care */}
      <div className="row">
        <div>
          <label>Select Location</label>
          <select
            name="location"
            value={form.location}
            onChange={handleChange}
            required
          >
            <option value="">-- Select --</option>
            <option value="Gurugram">Gurugram</option>
            <option value="New Delhi">New Delhi</option>
          </select>
        </div>
        <div>
          <label>Preventive Care Services</label>
          <select
            name="preventiveCare"
            value={form.preventiveCare}
            onChange={handleChange}
            required
          >
            <option value="">-- Select --</option>
            <option value="Vaccination">Vaccination</option>
            <option value="Deworming">Deworming</option>
            <option value="Ectoparasite Control">Ectoparasite Control</option>
          </select>
        </div>
      </div>

      {/* Consultation */}
      <div>
        <label>General Consultation</label>
        <select
          name="consultation"
          value={form.consultation}
          onChange={handleChange}
          required
        >
          <option value="">-- Select --</option>
          <option value="Senior Veterinarian">
            Consultation (Senior Veterinarian)
          </option>
          <option value="Head Veterinarian">
            Consultation (Head Veterinarian)
          </option>
        </select>
      </div>

      {/* Owner & Pet Info */}
      <div className="row">
        <div>
          <label>Owner Name</label>
          <input
            type="text"
            name="ownerName"
            value={form.ownerName}
            onChange={handleChange}
            required
            readOnly // ✅ Keep it fixed as logged-in username
          />
        </div>
        <div>
          <label>Mobile Number</label>
          <input
            type="tel"
            name="number"
            value={form.number}
            onChange={handleChange}
            required
            pattern="[0-9]{10}"
            maxLength="10"
            title="Enter a valid 10-digit number"
          />
        </div>

        <div>
          <label>Pet Name</label>
          <input
            type="text"
            name="petName"
            value={form.petName}
            onChange={handleChange}
            required
          />
        </div>
      </div>

      <div className="row">
        <div>
          <label>Age</label>
          <input
            type="number"
            name="age"
            value={form.age}
            min="1" // ✅ Only positive numbers allowed
            onChange={(e) => {
              const value = e.target.value;
              if (value === "" || parseInt(value) > 0) {
                handleChange(e);
              }
            }}
            required
          />
        </div>
        <div>
          <label>Gender</label>
          <label>
            <input
              type="radio"
              name="gender"
              value="Male"
              checked={form.gender === "Male"}
              onChange={handleChange}
            />
            Male
          </label>
          <label>
            <input
              type="radio"
              name="gender"
              value="Female"
              checked={form.gender === "Female"}
              onChange={handleChange}
            />
            Female
          </label>
        </div>
      </div>

      <div>
        <label>Breed</label>
        <input
          type="text"
          name="breed"
          value={form.breed}
          onChange={handleChange}
        />
      </div>

      <div>
        <label>Address</label>
        <textarea
          name="address"
          value={form.address}
          onChange={handleChange}
          required
        ></textarea>
      </div>

      {/* Appointment Date & Time */}
      <div className="row">
        <div>
          <label>Appointment Date</label>
          <input
            type="date"
            name="date"
            value={form.date}
            onChange={handleChange}
            min={today}
            required
          />
        </div>
        <div>
          <label>Appointment Time</label>
          <select
            name="time"
            value={form.time}
            onChange={handleChange}
            required
          >
            <option value="">-- Select Time --</option>
            {timeOptions.length === 0 ? (
              <option disabled>No available times</option>
            ) : (
              timeOptions.map((t) => (
                <option key={t} value={t}>
                  {t}
                </option>
              ))
            )}
          </select>
          <small>(Available between 10:00 AM – 7:00 PM)</small>
        </div>
      </div>

      {/* Buttons */}
      <div className="btn-row">
        <button type="button" onClick={handleClose}>
          CLOSE
        </button>
        <button type="submit" disabled={loading}>
          {loading ? "Booking..." : "BOOK"}
        </button>
      </div>

      {message && <p className="message">{message}</p>}
    </form>
  );
}

export default BookAppointment;
