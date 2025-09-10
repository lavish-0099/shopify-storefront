import React, { useRef, useState, useEffect } from 'react';
import './Preloader.css';

const Preloader = ({ onLoaded }) => {
    const videoRef = useRef(null);
    const containerRef = useRef(null);
    const [isClicked, setIsClicked] = useState(false);
    const [isVisible, setIsVisible] = useState(false);

    // Intersection Observer to detect visibility
    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    setIsVisible(entry.isIntersecting);
                });
            },
            { threshold: 0.5 } // 50% of the video should be visible to trigger
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

    // Play or pause video based on visibility
    useEffect(() => {
        if (videoRef.current) {
            if (isVisible && isClicked) {
                videoRef.current.play().catch((err) => {
                    console.error("Error trying to play video:", err);
                });
            } else {
                videoRef.current.pause();
            }
        }
    }, [isVisible, isClicked]);

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
        <div
            className="preloader-container"
            ref={containerRef}
            onClick={handleClick}
        >
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
