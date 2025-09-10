import React, { useRef, useState } from 'react';
import './Preloader.css';

const Preloader = ({ onLoaded }) => {
    const videoRef = useRef(null);
    const [isClicked, setIsClicked] = useState(false);

    const handleClick = () => {
        if (videoRef.current) {
            videoRef.current.play()
                .then(() => {
                    console.log("Video playing with audio");
                })
                .catch(error => {
                    console.error("Error playing video:", error);
                });
        }
        setIsClicked(true);
    };

    return (
        <div className="preloader-container" onClick={handleClick}>
            <video
                ref={videoRef}
                src="/videos/intro_vid.mp4"
                playsInline
                controls={false}
                onEnded={onLoaded}
            />
        </div>
    );
};

export default Preloader;
