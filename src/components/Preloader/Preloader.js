import React, { useRef, useState } from 'react';
import './Preloader.css';

const Preloader = ({ onVideoEnd }) => {
  const videoRef = useRef(null);
  const [hasStarted, setHasStarted] = useState(false);

  const handleStart = () => {
    if (videoRef.current) {
      videoRef.current.play()
        .then(() => {
          setHasStarted(true);
          console.log("Preloader video started");
        })
        .catch(err => {
          console.error("Error playing preloader video:", err);
        });
    }
  };

  return (
    <div className="preloader-container">
      {!hasStarted && (
        <div className="preloader-overlay">
          <button className="preloader-start-btn" onClick={handleStart}>
            Click to play
          </button>
        </div>
      )}
      <video
        ref={videoRef}
        src="/videos/intro_vidd.mp4"
        playsInline
        muted={false} // sound allowed after user click
        controls={false}
        onEnded={onVideoEnd}
        className="preloader-video"
      />
    </div>
  );
};

export default Preloader;
