import React, { useRef, useState, useEffect } from 'react';
import './Preloader.css';

const Preloader = ({ onVideoEnd }) => {
  const videoRef = useRef(null);
  const [isClicked, setIsClicked] = useState(false); // Track if user enabled audio

  const handleClick = () => {
    const video = videoRef.current;
    if (!video) return;

    video
      .play()
      .then(() => {
        video.muted = false; // Enable audio after user click
        setIsClicked(true);
        console.log('Preloader video playing with sound');
      })
      .catch(err => {
        console.error('Error playing preloader video:', err);
      });
  };

  const handleVideoEnd = () => {
    console.log('Preloader video ended');
    if (onVideoEnd) onVideoEnd(); // Notify App.js that the video is done
  };

  useEffect(() => {
    const video = videoRef.current;
    if (video) {
      video.muted = true; // Autoplay requires muted initially
      video.play().catch(err => {
        console.warn('Autoplay blocked until user clicks:', err);
      });
    }
  }, []);

  return (
    <div className="preloader-container" onClick={!isClicked ? handleClick : undefined}>
      <video
        ref={videoRef}
        src="/videos/intro_vid.mp4"
        playsInline
        muted
        controls={false}
        onEnded={handleVideoEnd}
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
