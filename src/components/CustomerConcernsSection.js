import React from "react";
// Changed icons for a more refined look
import { FaTag, FaPalette, FaExchangeAlt, FaShieldVirus } from 'react-icons/fa'; 
import "./CustomerConcernsSection.css";

const concerns = [
  {
    title: "Fit Guarantee",
    description: "Perfect fit assurance for every body type.",
    icon: <FaTag /> // Using FaTag for a more premium "label" feel
  },
  {
    title: "Fabric Feel",
    description: "Hover to preview textures of our fabrics.",
    icon: <FaPalette /> // Using FaPalette to represent artistry/texture
  },
  {
    title: "Easy Return Policy",
    description: "Hassle-free returns for worry-free shopping.",
    icon: <FaExchangeAlt /> // Using FaExchangeAlt for a clearer return visual
  },
  {
    title: "Trust Factor",
    description: "Thousands of happy customers trust our brand.",
    icon: <FaShieldVirus /> // Using FaShieldVirus for a more modern shield look
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