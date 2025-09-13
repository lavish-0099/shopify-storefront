import React from 'react';
import './ShineSection.css';
import StatsCounter from './StatsCounter'; // ✅ Correct import

const ShineSection = ({ text }) => {
  return (
    <section className="shine-section-wrapper">
      
      {/* Stats Counter Section */}
      <div className="stats-counter-container">
        <StatsCounter />
      </div>

      {/* Shine Section Text */}
      <div className="shine-section">
        <h2 className="shine-text" data-text={text}>
          {text}
        </h2>
      </div>
    </section>
  );
};

export default ShineSection;
