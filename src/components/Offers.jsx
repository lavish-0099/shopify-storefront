// src/components/Offers.jsx
import React from "react";
import Marquee from "react-fast-marquee";
import "./Offers.css"; // Import the CSS file

export default function Offers() {
  return (
    <section className="offers-section">
      {/* Section Title */}
      <div className="offers-header">
        <h2 className="offers-title">Our Offers</h2>
      </div>

      {/* Marquee Scroller */}
      <div className="offers-marquee-container">
        <Marquee gradient={false} speed={60} pauseOnHover={true}>
          <span className="offers-marquee-text">
            ₹200 off + Free Shipping for First Order
          </span>
          <span className="offers-marquee-text">
            ₹200 off + Free Shipping for First Order
          </span>
          <span className="offers-marquee-text">
            ₹200 off + Free Shipping for First Order
          </span>
        </Marquee>
      </div>
    </section>
  );
}
