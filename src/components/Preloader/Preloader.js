import React, { useRef, useState } from 'react';
import './Preloader.css';

const Preloader = ({ onLoaded }) => {
    const videoRef = useRef(null);
    const [isClicked, setIsClicked] = useState(false);

    const handleClick = () => {
        if (videoRef.current) {
            videoRef.current.play();
        }
        setIsClicked(true); // Fix: update state so overlay disappears after click
    };

    return (
        <div className="preloader-container" onClick={handleClick}>
            <video
                ref={videoRef}
                src="/videos/intro_vid.mp4
                "
                muted
                playsInline
                onEnded={onLoaded}
                autoPlay={isClicked} // Fix: autoplay after click
            />
            {!isClicked && (
                <div className="overlay-text">
                    <p>Click to Begin</p>
                </div>
            )}
        </div>
    );
};

export default Preloader