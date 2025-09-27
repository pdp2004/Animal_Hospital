import React, { useState, useEffect } from "react";
import "./Slider.css";

const slides = [
  {
    id: 1,
    title: "Holi 2022: Tips to keep your pets safe and healthy during the festival of colours",
    desc: "Holi might not be the most awaited time of the year for our pets due to the health hazard and discomfort it causes to them. Let's practice inclusivity of our pets in this festival by following certain guidelines.",
    date: "Mar 17, 2022",
    img: "https://images.unsplash.com/photo-1607746882042-944635dfe10e"
  },
  {
    id: 2,
    title: "Keep your pets hydrated during summer",
    desc: "Summers are harsh for pets. Make sure they stay hydrated and cool.",
    date: "Apr 12, 2022",
    img: "https://images.unsplash.com/photo-1607746882042-944635dfe10e"
  },
  {
    id: 3,
    title: "Winter care tips for your furry friends",
    desc: "Winters can be tough for pets. Learn how to keep them warm & healthy.",
    date: "Dec 5, 2022",
    img: "https://images.unsplash.com/photo-1607746882042-944635dfe10e"
  }
];

const Slider = () => {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      nextSlide();
    }, 5000);
    return () => clearInterval(timer);
  }, [current]);

  const nextSlide = () => {
    setCurrent(current === slides.length - 1 ? 0 : current + 1);
  };


  return (
    <div className="slider">
      {slides.map((slide, index) => (
        <div
          className={index === current ? "slide active" : "slide"}
          key={slide.id}
        >
          {index === current && (
            <div className="slide-content">
              <div className="text-section">
                <p className="date">{slide.date}</p>
                <h2 className="title">{slide.title}</h2>
                <p className="desc">{slide.desc}</p>
                <a href="#" className="read-more">
                  Read More →
                </a>
              </div>
              <div className="image-section">
                <img src={slide.img} alt={slide.title} />
              </div>
            </div>
          )}
        </div>
      ))}
      {/* Navigation Arrows */}
      
      {/* Dots */}
      <div className="dots">
        {slides.map((_, index) => (
          <span
            key={index}
            className={index === current ? "dot active" : "dot"}
            onClick={() => setCurrent(index)}
          ></span>
        ))}
      </div>
    </div>
  );
};

export default Slider;
