import React, { useRef, useState, useEffect } from 'react';
import './Preloader.css';

const Preloader = ({ onLoaded }) => {
  const videoRef = useRef(null);
  const containerRef = useRef(null);

  const [isClicked, setIsClicked] = useState(false); // User has clicked to allow audio
  const [isVisible, setIsVisible] = useState(false); // Video visibility status

  // Detect when the video section enters or leaves the viewport
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          setIsVisible(entry.isIntersecting);
        });
      },
      { threshold: 0.4 } // 40% of video must be visible
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

  // Automatically play/pause when visibility changes
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    if (!isClicked) {
      // If user hasn't clicked yet, always keep video muted
      video.muted = true;
    }

    if (isVisible && isClicked) {
      // Play with audio when video is visible AND user has clicked
      video.play().catch((err) => {
        console.warn('Video play error:', err);
      });
    } else {
      // Pause and mute when not visible
      video.pause();
      video.currentTime = 0; // Reset to start
      video.muted = true;
    }
  }, [isVisible, isClicked]);

  // Handle user click to enable audio
  const handleClick = () => {
    const video = videoRef.current;
    if (!video) return;

    video
      .play()
      .then(() => {
        video.muted = false; // Unmute after click
        setIsClicked(true);
        console.log('User enabled video sound');
      })
      .catch((err) => {
        console.error('Error trying to play video:', err);
      });
  };

  return (
    <div
      ref={containerRef}
      className="preloader-container"
      onClick={!isClicked ? handleClick : undefined}
      style={{ cursor: !isClicked ? 'pointer' : 'default' }}
    >
      <video
        ref={videoRef}
        src="/videos/intro_vid.mp4"
        playsInline
        controls={false}
        muted // Default muted to satisfy autoplay policies
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
