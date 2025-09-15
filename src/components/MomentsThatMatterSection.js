import React from 'react';
import './MomentsThatMatterSection.css';

const MomentsThatMatterSection = () => {
  return (
    <section className="moments-section">
      {/* This new wrapper controls the size and position of the image + marquee */}
      <div className="moments-bg-image-wrapper"> 
        <img 
          src="./images/bg_section.png" 
          alt="Fashion mannequins showcasing different outfits" 
          className="moments-bg-image" 
        />
        {/* The overlay is now inside the image wrapper */}
        <div className="moments-overlay">
          <div className="marquee-container">
            <div className="marquee-text">
              <span>FOR THE MOMENTS THAT MATTER</span>
              <span>FOR THE MOMENTS THAT MATTER</span>
              <span>FOR THE MOMENTS THAT MATTER</span>
              <span>FOR THE MOMENTS THAT MATTER</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MomentsThatMatterSection;