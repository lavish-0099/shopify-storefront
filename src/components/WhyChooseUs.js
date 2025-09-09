import React from "react";
// We'll use icons from the Font Awesome library for a clean, professional look
import { FaRulerCombined, FaTshirt, FaUndo, FaShieldAlt } from 'react-icons/fa';
import "./CustomerConcernsSection.css";

// The 'icon' property now uses the imported React Icon components
const concerns = [
  {
    title: "Fit Guarantee",
    description: "Perfect fit assurance for every body type.",
    icon: <FaRulerCombined />
  },
  {
    title: "Fabric Feel",
    description: "Hover to preview textures of our fabrics.",
    icon: <FaTshirt />
  },
  {
    title: "Easy Return Policy",
    description: "Hassle-free returns for worry-free shopping.",
    icon: <FaUndo />
  },
  {
    title: "Trust Factor",
    description: "Thousands of happy customers trust our brand.",
    icon: <FaShieldAlt />
  }
];

const CustomerConcernsSection = () => {
  return (
    <section className="customer-concerns">
      <h2>Why Choose Us?</h2>
      <div className="concern-cards">
        {concerns.map((item, index) => (
          <div className="concern-card" key={index}>
            <div className="card-front">
              <span className="icon">{item.icon}</span>
              <h3>{item.title}</h3>
            </div>
            <div className="card-back">
              <p>{item.description}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default CustomerConcernsSection;
