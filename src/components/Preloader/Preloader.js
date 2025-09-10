import React, { useRef, useState } from 'react';
import './Preloader.css';

const Preloader = ({ onVideoEnd }) => {
  const videoRef = useRef(null);
  const [hasStarted, setHasStarted] = useState(false);

  const handleScreenClick = () => {
    if (videoRef.current && !hasStarted) {
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
    <div className="preloader-container" onClick={handleScreenClick}>
      <video
        ref={videoRef}
        src="/videos/intro_viddd.mp4"
        playsInline
        muted={false} // sound allowed
        controls={false}
        onEnded={onVideoEnd}
        className="preloader-video"
      />
      {!hasStarted && (
        <div className="preloader-overlay">
          <p className="preloader-hint"></p>
        </div>
      )}
    </div>
  );
};

export default Preloader;
