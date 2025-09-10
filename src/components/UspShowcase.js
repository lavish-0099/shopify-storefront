import React, { useState, useEffect, useRef } from 'react';

const UspShowcase = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const componentRef = useRef(null);

  const usps = [
    {
      title: 'Crafted from 100% natural fabrics',
      description: 'Experience the pure comfort and breathability of materials sourced directly from nature, ensuring a soft touch on your skin and a clear conscience.',
      image: '/images/11.png', // Make sure this is a transparent PNG
    },
    {
      title: 'Uncompromised quality at fair prices',
      description: 'We believe luxury should be accessible. Our direct-to-consumer model eliminates middlemen, allowing us to offer premium garments without the premium price tag.',
      image: '/images/22.png', // Make sure this is a transparent PNG
    },
    {
      title: 'Sustainable fashion for conscious living',
      description: 'From ethical sourcing to eco-friendly packaging, every step of our process is designed to minimize our environmental footprint and promote a healthier planet.',
      image: '/images/33.png', // Make sure this is a transparent PNG
    },
    {
      title: 'Elegant designs, timeless everyday wear',
      description: 'Our collections are thoughtfully designed to be both beautiful and versatile, creating staple pieces that you will cherish and wear for years to come.',
      image: '/images/44.png', // Make sure this is a transparent PNG
    },
    {
      title: 'Comfort, style, and responsibility combined',
      description: 'You no longer have to choose. Our brand is a promise of clothing that looks good, feels good, and does good for the world.',
      image: '/images/55.png', // Make sure this is a transparent PNG
    },
  ];

  const handleScroll = () => {
    if (componentRef.current) {
      const { top, height } = componentRef.current.getBoundingClientRect();
      // A small offset to trigger the change slightly earlier/later
      const scrollOffset = window.innerHeight * 0.5; 
      const scrollPosition = window.scrollY + scrollOffset;
      const componentTop = componentRef.current.offsetTop;
      
      const scrollProgress = scrollPosition - componentTop;
      const sectionHeight = height / usps.length;
      
      const newIndex = Math.min(
        usps.length - 1,
        Math.max(0, Math.floor(scrollProgress / sectionHeight))
      );

      if (newIndex !== activeIndex) {
        setActiveIndex(newIndex);
      }
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [activeIndex]);

  const styles = {
    container: {
      display: 'flex',
      minHeight: '350vh', // Increased height for a smoother scroll experience
      backgroundColor: '#FFFFFF', // Changed to white as per screenshot
      fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
    },
    leftPanel: {
      width: '50%',
      display: 'flex',
      justifyContent: 'center', // Horizontally center the content
      alignItems: 'center', // Vertically center the content
      position: 'sticky',
      top: 0,
      height: '100vh',
    },
    uspContent: {
      maxWidth: '450px', // Adjusted max width
      padding: '2rem',
      textAlign: 'left', // Aligned text to the left as in screenshot
    },
    uspItem: {
      transition: 'opacity 0.5s ease-in-out, transform 0.5s ease-in-out',
      position: 'absolute',
    },
    uspTitle: {
      fontSize: '3rem', // Increased font size
      fontWeight: '600', // Adjusted font weight
      lineHeight: 1.2,
      marginBottom: '1rem',
      color: '#1a1a1a',
    },
    uspDescription: {
      fontSize: '1rem',
      color: '#666',
      maxWidth: '40ch', // Limit line length for readability
    },
    rightPanel: {
      width: '50%',
      position: 'sticky',
      top: 0,
      height: '100vh',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    },
    imageContainer: {
        width: '100%',
        height: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative',
    },
    image: {
      maxWidth: '75%', // Ensure image doesn't get too big
      maxHeight: '75%',
      objectFit: 'contain',
      position: 'absolute',
      transition: 'opacity 0.7s ease-in-out, transform 0.7s ease-in-out',
      // This drop-shadow is perfect for transparent PNGs!
      filter: 'drop-shadow(0 15px 25px rgba(0,0,0,0.1))', 
    },
  };

  return (
    <div ref={componentRef} style={styles.container}>
      <div style={styles.leftPanel}>
        <div style={styles.uspContent}>
          {usps.map((usp, index) => (
            <div
              key={index}
              style={{
                ...styles.uspItem,
                opacity: activeIndex === index ? 1 : 0,
                transform: activeIndex === index ? 'translateY(0)' : 'translateY(20px)',
                pointerEvents: activeIndex === index ? 'auto' : 'none',
              }}
            >
              <h2 style={styles.uspTitle}>{usp.title}</h2>
              <p style={styles.uspDescription}>{usp.description}</p>
            </div>
          ))}
        </div>
      </div>
      <div style={styles.rightPanel}>
        <div style={styles.imageContainer}>
          {usps.map((usp, index) => (
            <img
              key={index}
              src={usp.image}
              alt={usp.title}
              style={{
                ...styles.image,
                opacity: activeIndex === index ? 1 : 0,
                transform: activeIndex === index ? 'scale(1)' : 'scale(1.05)',
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default UspShowcase;