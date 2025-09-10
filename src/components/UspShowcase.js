import React, { useState, useEffect, useRef } from 'react';

const UspShowcase = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const componentRef = useRef(null);

  const usps = [
    { title: 'Natural Fabrics', description: '100% natural fabrics for comfort.', image: '/images/11.png' },
    { title: 'Fair Prices', description: 'Premium quality at fair cost.', image: '/images/22.png' },
    { title: 'Sustainable', description: 'Eco-friendly sourcing and packaging.', image: '/images/33.png' },
    { title: 'Timeless Design', description: 'Elegant designs for everyday wear.', image: '/images/44.png' },
    { title: 'Responsibility', description: 'Style with cre for the planets.', image: '/images/55.png' },
  ];


  const handleScroll = () => {
    if (componentRef.current) {
      const { top, height } = componentRef.current.getBoundingClientRect();
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
      minHeight: '350vh',
      backgroundColor: '#fff',
      fontFamily: 'system-ui, sans-serif',
    },
    leftPanel: {
      width: '50%',
      display: 'flex',
      justifyContent: 'flex-start',
      alignItems: 'flex-start',
      padding: '30vh 0 0 10vw',
      position: 'sticky',
      top: 0,
      height: '100vh',
    },
    uspContent: {
      maxWidth: '450px',
    },
    uspItem: {
      transition: 'opacity 0.5s ease-in-out, transform 0.5s ease-in-out',
      position: 'absolute',
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
      position: 'relative',
      width: '100%',
      height: '100%',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    },
    image: {
      position: 'absolute',
      maxWidth: '70%',
      transition: 'all 0.7s ease-in-out',
      objectFit: 'contain',
    },
  };

  // Determine positions for 3 images (prev, current, next)
  const getImageStyle = (index) => {
    const total = usps.length;
    const relativeIndex = (index - activeIndex + total) % total;

    if (relativeIndex === 0) {
      // Active (center)
      return {
        ...styles.image,
        opacity: 1,
        transform: 'translateY(0) scale(1)',
        zIndex: 3,
        filter: 'drop-shadow(0 20px 30px rgba(0,0,0,0.2))',
      };
    } else if (relativeIndex === 1) {
      // Next (below)
      return {
        ...styles.image,
        opacity: 0.6,
        transform: 'translateY(200px) scale(0.8)',
        zIndex: 2,
        filter: 'blur(2px)',
      };
    } else if (relativeIndex === total - 1) {
      // Previous (above)
      return {
        ...styles.image,
        opacity: 0.6,
        transform: 'translateY(-200px) scale(0.8)',
        zIndex: 2,
        filter: 'blur(2px)',
      };
    }
    // Hidden others
    return {
      ...styles.image,
      opacity: 0,
      transform: 'translateY(0) scale(0.5)',
      zIndex: 1,
    };
  };

  return (
    <div ref={componentRef} style={styles.container}>
      {/* Left side text */}
      <div style={styles.leftPanel}>
        <div style={styles.uspContent}>
          {usps.map((usp, index) => (
            <div
              key={index}
              style={{
                ...styles.uspItem,
                opacity: activeIndex === index ? 1 : 0,
                transform: activeIndex === index ? 'translateY(0)' : 'translateY(20px)',
              }}
            >
              <h2 style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>{usp.title}</h2>
              <p style={{ fontSize: '1rem', color: '#555' }}>{usp.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Right side images */}
      <div style={styles.rightPanel}>
        <div style={styles.imageContainer}>
          {usps.map((usp, index) => (
            <img
              key={index}
              src={usp.image}
              alt={usp.title}
              style={getImageStyle(index)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default UspShowcase;
