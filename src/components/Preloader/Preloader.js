import React, { useRef, useState } from 'react';
import './Preloader.css';

const Preloader = ({ onLoaded }) => {
    const videoRef = useRef(null);
    const [isClicked, setIsClicked] = useState(false);

    const handleClick = () => {
        if (videoRef.current) {
            videoRef.current.play();
        }
        setIsClicked(true);
    };

    return (
        <div className="preloader-container" onClick={handleClick}>
            <video
                ref={videoRef}
                src="/videos/intro_vid.mp4"
                playsInline
                onEnded={onLoaded}
                autoPlay={isClicked}
                controls={false}  // Hide default controls
            />
        </div>
    );
};

export default Preloader;
