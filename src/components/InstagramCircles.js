import React from "react";
import "./InstagramCircles.css";

const InstagramCircles = () => {
  const instagramContent = [
    {
      id: 1,
      type: "video",
      videoUrl: "/videos/Video1.mp4", // ✅ leading slash
    },
    {
      id: 2,
      type: "video",
      videoUrl: "/videos/Video2.mp4",
    },
    {
      id: 3,
      type: "video",
      videoUrl: "/videos/Video3.mp4",
    },
    {
      id: 4,
      type: "video",
      videoUrl: "/videos/Video4.mp4",
    },
    {
      id: 5,
      type: "video",
      videoUrl: "/videos/Video5.mp4",
    },
  ];

  return (
    <div className="instagram-section">
      <h2 className="section-heading">Our Instagram Highlights</h2>

      <div className="circle-thumbnails-below-offer">
        {instagramContent.map((item) => (
          <div key={item.id} className="circle-thumb">
            {item.type === "video" ? (
              <video
                src={item.videoUrl}
                autoPlay
                muted
                loop
                playsInline
                className="circle-video"
              />
            ) : (
              <img
                src={item.thumbnail}
                alt={`Instagram ${item.id}`}
                className="circle-image"
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default InstagramCircles;
