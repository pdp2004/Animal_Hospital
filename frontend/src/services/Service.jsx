import React from "react";
import { Link } from "react-router-dom";
import "./Service.css";

// React Icons
import { FaUserMd, FaTeeth, FaSyringe, FaMicroscope, FaHospitalAlt, FaDog } from "react-icons/fa";
import { GiScalpel, GiDogHouse } from "react-icons/gi";
import { MdPets, MdContentCut, MdWbSunny } from "react-icons/md";
import { AiFillEye } from "react-icons/ai";
import { BsPhone, BsCamera } from "react-icons/bs";
import { IoIosFitness } from "react-icons/io";

const servicesData = [
  {
    id: 1,
    icon: <FaUserMd />,
    title: "Pet Health Consultation",
    description:
      "Our team of qualified veterinarians who come with years of experience in handling an extensive range of cases provide you with quick and convenient care for all your queries.",
    link: "#",
  },
  {
    id: 2,
    icon: <GiScalpel />,
    title: "Surgery",
    description:
      "From minor to major surgeries, our team of doctors are equipped to conduct a wide range of surgical procedures for your pet's health.",
    link: "#",
  },
  {
    id: 3,
    icon: <BsPhone />,
    title: "Pet Telehealth Consultation",
    description:
      "No matter where you are, we make sure your pet gets access to reliable medical care, with our telehealth consultations that can be booked from anywhere.",
    link: "#",
  },
  {
    id: 4,
    icon: <AiFillEye />,
    title: "Pet Eye Care",
    description:
      "Your pet's eye health is crucial to their overall functioning and if there is something you're concerned about, book an appointment with us and our team will take care of your pet's eyes.",
    link: "#",
  },
  {
    id: 5,
    icon: <BsCamera />,
    title: "Pet Radiography",
    description:
      "We're equipped to perform routine pet radiography services to identify many types of illnesses or injuries when your pooch is sick or has suffered from trauma.",
    link: "#",
  },
  {
    id: 6,
    icon: <FaTeeth />,
    title: "Pet Dentistry",
    description:
      "Your pet's overall health is highly dependent on their oral health. DCC provides state of the art facilities that help maintain your pet's oral health.",
    link: "#",
  },
  {
    id: 7,
    icon: <FaSyringe />,
    title: "Pet Vaccination",
    description:
      "Your pet's vaccinations are extremely important but can also be quite inconvenient. We handle all your pet's vaccinations to streamline the entire process.",
    link: "#",
  },
  {
    id: 8,
    icon: <FaMicroscope />,
    title: "Veterinary Pathology",
    description:
      "Our labs use cutting-edge technology and innovative practices that enable us to test and identify your pet's health issues quickly and accurately.",
    link: "#",
  },
  {
    id: 9,
    icon: <FaHospitalAlt />,
    title: "Veterinary ICU",
    description:
      "Our veterinary ICU is equipped with the latest diagnostic, support, and monitoring equipment with dedicated veterinary doctors and nurses.",
    link: "#",
  },
  {
    id: 10,
    icon: <GiDogHouse />,
    title: "Pet Boarding",
    description:
      "Having difficulty finding a safe, reliable shelter for your pet? DCC offers tailored pet boarding services that match all your requirements.",
    link: "#",
  },
  {
    id: 11,
    icon: <MdContentCut />,
    title: "Pet Grooming",
    description:
      "With DCC's range of grooming services led by trained professionals, your pet will have a relaxing, pampering experience.",
    link: "#",
  },
  {
    id: 12,
    icon: <MdWbSunny />,
    title: "Pet Daycare",
    description:
      "Looking for a trustworthy daycare centre for your pets? DCC offers pet daycare services with specialized attention and care.",
    link: "#",
  },
  {
    id: 13,
    icon: <IoIosFitness />,
    title: "Pet Activities",
    description:
      "Spend a day with your four-legged best friend at our 45,000 sq ft facility with swimming, running, walking, playing and more.",
    link: "#",
  },
];

const Services = () => {
  return (
    <>
    {/* <div className="page-header">
        <h1>Our Services</h1>
        <p>Comprehensive veterinary care for your beloved pets</p>
      </div> */}
      <section className="services">
        <div className="services-left">
          <h1>Services</h1>
          <Link to="/bookappointment"><button className="book-btn">Book Now</button></Link>
        </div>
        <div className="services-right">
          <img 
            src="/images/3.png" 
            alt="Doctor with Cat"
          />
        </div>
      </section>

      <section className="services-section">
        <h2 className="section-title">Services</h2>
        <h1 className="main-heading">World-class pet care services</h1>
        <p className="intro-text">
          DCC Animal hospital is equipped with operation theatres, an intensive
          care unit, recovery rooms, imaging and pathology services.
        </p>

        <div className="services-list">
          {servicesData.map((service) => (
            <div key={service.id} className="service-card">
              <div className="icon">{service.icon}</div>
              <div className="service-content">
                <h3>{service.title}</h3>
                <p>{service.description}</p>
                <a href={service.link} className="read-more">
                  Read More →
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
};

export default Services;
