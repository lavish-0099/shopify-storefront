// src/components/HeroSlider.js
import React, { useState, useEffect } from 'react';
import './HeroSlider.css'; 


const sliderImages = [
  '/images/hero1.png', 
  '/images/hero2.png'
];

const HeroSlider = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    // Set an interval to advance the slide every 5 seconds (5000 milliseconds)
    const intervalId = setInterval(() => {
      setCurrentIndex(prevIndex => 
        (prevIndex + 1) % sliderImages.length // Loop back to the start
      );
    }, 5000); // Change this value to adjust slide duration

    // Clear the interval when the component unmounts to prevent memory leaks
    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="hero-slider">
      {sliderImages.map((image, index) => (
        <img
          key={index}
          src={image}
          alt={`Slide ${index + 1}`}
          className={index === currentIndex ? 'slide active' : 'slide'}
        />
      ))}
    </div>
  );
};

export default HeroSlider;