import React from "react";
import "./InstagramCircles.css";

const InstagramCircles = () => {
  const instagramContent = [
    {
      id: 1,
      type: "video",
       videoUrl: "https://www.instagram.com/reel/DJn8kFQSR9i/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==",
    },
    {
      id: 2,
      type: "video",
      videoUrl: "https://www.instagram.com/reel/DJgvpwLyLWz/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==",
    },
    {
      id: 3,
      type: "video",
       videoUrl: "https://www.instagram.com/reel/DKcPv2ESvfF/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==",
    },
    {
      id: 4,
      type: "video",
      videoUrl: "https://www.instagram.com/reel/DKpE90JSbZx/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==",
    },
    {
      id: 5,
      type: "video",
       videoUrl: "https://www.instagram.com/reel/DHlhqZay166/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==",
    },
    
  ];

  return (
    <div className="instagram-section">
      <h2 className="section-heading"></h2>

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
