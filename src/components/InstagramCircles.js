// src/components/InstagramCircles.jsx
import React from "react";
import "./InstagramCircles.css";

const InstagramCircles = () => {
  const instagramContent = [
    { id: 1, videoUrl: "/videos/Video1.mp4" },
    { id: 2, videoUrl: "/videos/Video2.mp4" },
    { id: 3, videoUrl: "/videos/Video3.mp4" },
    { id: 4, videoUrl: "/videos/Video4.mp4" },
    { id: 5, videoUrl: "/videos/Video5.mp4" },
  ];

  return (
    <section className="instagram-section">
      <h2 className="section-heading">Our Instagram</h2>

      <div className="circle-thumbnails">
        {instagramContent.map((item) => (
          <div key={item.id} className="circle-thumb">
            <video
              src={item.videoUrl}
              autoPlay
              muted
              loop
              playsInline
              className="circle-video"
            />
          </div>
        ))}
      </div>
    </section>
  );
};

export default InstagramCircles;
