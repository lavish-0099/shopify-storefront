// src/components/StorySection.js
import React from 'react';
import './StorySection.css'; // We'll update this file next

const StorySection = () => {
  return (
    <section className="story-section">
      {/* The component now only contains one single image */}
      <img 
        src="/images/story-background.png" // Replace with the correct path to your full banner image
        alt="Story Behind Delan: Where Dreams Meet Modern Fashion" 
        className="story-banner-image"
      />
    </section>
  );
};

export default StorySection;