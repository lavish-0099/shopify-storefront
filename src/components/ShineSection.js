import React from 'react';
import './ShineSection.css';

const ShineSection = ({ text }) => {
  return (
    <section className="shine-section">
      <h2 className="shine-text" data-text={text}>
        {text}
      </h2>
    </section>
  );
};

export default ShineSection;