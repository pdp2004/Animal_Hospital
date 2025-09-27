import React, { useState, useEffect } from "react";
import "./DoctorSlider.css";

const DoctorSlider = () => {
  const doctors = [
    {
      id: 1,
      name: "Dr. Sarah Johnson",
      image: "https://images.unsplash.com/photo-1607746882042-944635dfe10e",
    },
    {
      id: 2,
      name: "Dr. Amit Verma",
      image: "https://images.unsplash.com/photo-1607746882042-944635dfe10e",
    },
    {
      id: 3,
      name: "Dr. Neha Kapoor",
      image: "https://images.unsplash.com/photo-1607746882042-944635dfe10e",
    },
    {
      id: 4,
      name: "Dr. Raj Malhotra",
      image: "https://images.unsplash.com/photo-1607746882042-944635dfe10e",
    },
    {
      id: 5,
      name: "Dr. Priya Sharma",
      image: "https://images.unsplash.com/photo-1607746882042-944635dfe10e",
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  // Auto-slide every 4s
  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 4000);
    return () => clearInterval(interval);
  }, [currentIndex]);

  const nextSlide = () => {
    setCurrentIndex((prev) =>
      prev + 1 >= doctors.length - 2 ? 0 : prev + 1
    );
  };


  return (
    <div className="doctor-slider-container">
      

      <div className="doctor-slider">
        <div
          className="doctor-slides"
          style={{
            transform: `translateX(-${currentIndex * (100 / 3)}%)`,
          }}
        >
          {doctors.map((doctor) => (
            <div className="doctor-card" key={doctor.id}>
              <img src={doctor.image} alt={doctor.name} />
              <p className="doctor-name">{doctor.name}</p>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};

export default DoctorSlider;
