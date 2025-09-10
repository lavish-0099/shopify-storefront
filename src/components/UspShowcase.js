import React, { useState, useEffect, useRef } from 'react';

const UspShowcase = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const componentRef = useRef(null);

  const usps = [
    {
      title: 'Crafted from 100% natural fabrics',
      description: 'Experience the pure comfort and breathability of materials sourced directly from nature, ensuring a soft touch on your skin and a clear conscience.',
      image: '/images/11.png',
    },
    {
      title: 'Uncompromised quality at fair prices',
      description: 'We believe luxury should be accessible. Our direct-to-consumer model eliminates middlemen, allowing us to offer premium garments without the premium price tag.',
      image: '/images/22.png',
    },
    {
      title: 'Sustainable fashion for conscious living',
      description: 'From ethical sourcing to eco-friendly packaging, every step of our process is designed to minimize our environmental footprint and promote a healthier planet.',
      image: '/images/33.png',
    },
    {
      title: 'Elegant designs, timeless everyday wear',
      description: 'Our collections are thoughtfully designed to be both beautiful and versatile, creating staple pieces that you will cherish and wear for years to come.',
      image: '/images/44.png',
    },
    {
      title: 'Comfort, style, and responsibility combined',
      description: 'You no longer have to choose. Our brand is a promise of clothing that looks good, feels good, and does good for the world.',
      image: '/images/55.png',
    },
  ];

  const handleScroll = () => {
    if (componentRef.current) {
      const { top, height } = componentRef.current.getBoundingClientRect();
      const scrollPosition = window.scrollY;
      const componentTop = componentRef.current.offsetTop;
      
      // Calculate how far into the component the user has scrolled
      const scrollProgress = scrollPosition - componentTop;
      
      // Calculate which item should be active
      const newIndex = Math.min(
        usps.length - 1,
        Math.max(0, Math.floor(scrollProgress / (height / usps.length)))
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
      minHeight: '300vh', // Make container tall enough to scroll through all items
      backgroundColor: '#f9f9f9',
      fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
    },
    leftPanel: {
      width: '45%',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      position: 'sticky',
      top: 0,
      height: '100vh',
    },
    uspContent: {
      maxWidth: '400px',
      padding: '2rem',
    },
    uspItem: {
      transition: 'opacity 0.5s ease-in-out, transform 0.5s ease-in-out',
      position: 'absolute',
    },
    uspTitle: {
      fontSize: '2.5rem',
      fontWeight: 'bold',
      lineHeight: 1.2,
      marginBottom: '1rem',
      color: '#1a1a1a',
    },
    uspDescription: {
      fontSize: '1.1rem',
      color: '#666',
    },
    rightPanel: {
      width: '55%',
      position: 'sticky',
      top: 0,
      height: '100vh',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      overflow: 'hidden',
    },
    imageContainer: {
      width: '80%',
      height: '80%',
      position: 'relative',
      borderRadius: '20px',
      boxShadow: '0 20px 40px rgba(0,0,0,0.1)',
    },
    image: {
      width: '100%',
      height: '100%',
      objectFit: 'cover',
      borderRadius: '20px',
      position: 'absolute',
      top: 0,
      left: 0,
      transition: 'opacity 0.7s ease-in-out, transform 0.7s ease-in-out',
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

// To use this component in your App.js, you would do something like this:
//
// import UspShowcase from './UspShowcase';
//
// function App() {
//   return (
//     <div>
//       {/* Other content of your page */}
//       <UspShowcase />
//       {/* Other content of your page */}
//     </div>
//   );
// }
//
// export default App;

export default UspShowcase;
