import React, { useRef, useState, useEffect } from 'react';
import './Preloader.css';

const Preloader = ({ onLoaded }) => {
  const videoRef = useRef(null);
  const containerRef = useRef(null);
  const [isClicked, setIsClicked] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  // Detect when the video section is in the viewport
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          setIsVisible(entry.isIntersecting);
        });
      },
      { threshold: 0.3 } // 30% of video must be visible
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => {
      if (containerRef.current) {
        observer.unobserve(containerRef.current);
      }
    };
  }, []);

  // Play/pause video based on visibility & user interaction
  useEffect(() => {
    if (videoRef.current) {
      if (isClicked) {
        if (isVisible) {
          videoRef.current.play().catch((err) => {
            console.warn('Video play error:', err);
          });
        } else {
          videoRef.current.pause();
        }
      }
    }
  }, [isVisible, isClicked]);

  // User click to enable sound
  const handleClick = () => {
    if (videoRef.current) {
      videoRef.current
        .play()
        .then(() => {
          console.log('Video is now playing with sound.');
        })
        .catch((err) => {
          console.error('Error trying to play video:', err);
        });
    }
    setIsClicked(true);
  };

  return (
    <div
      ref={containerRef}
      className="preloader-container"
      onClick={handleClick}
      style={{ cursor: isClicked ? 'default' : 'pointer' }}
    >
      <video
        ref={videoRef}
        src="/videos/intro_vid.mp4"
        playsInline
        controls={false}
        muted={!isClicked} // Start muted, enable sound after click
        onEnded={onLoaded}
        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
      />
      {!isClicked && (
        <div className="overlay-text">
          <p>Click to play</p>
        </div>
      )}
    </div>
  );
};

export default Preloader;
