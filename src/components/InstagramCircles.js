import React from "react";
import "./InstagramCircles.css";

const InstagramCircles = () => {
  const instagramContent = [
    {
      id: 1,
      type: "instagram",
      url: "https://www.instagram.com/reel/DJn8kFQSR9i/",
    },
    {
      id: 2,
      type: "instagram",
      url: "https://www.instagram.com/reel/DJgvpwLyLWz/",
    },
    {
      id: 3,
      type: "instagram",
      url: "https://www.instagram.com/reel/DKcPv2ESvfF/",
    },
    {
      id: 4,
      type: "instagram",
      url: "https://www.instagram.com/reel/DKpE90JSbZx/",
    },
    {
      id: 5,
      type: "instagram",
      url: "https://www.instagram.com/reel/DHlhqZay166/",
    },
  ];

  return (
    <div className="instagram-section">
      <h2 className="section-heading">Our Instagram Highlights</h2>

      <div className="circle-thumbnails-below-offer">
        {instagramContent.map((item) => (
          <div key={item.id} className="circle-thumb">
            <iframe
              src={`${item.url}embed`}
              frameBorder="0"
              allow="autoplay; encrypted-media"
              allowFullScreen
              title={`Instagram Reel ${item.id}`}
              className="instagram-embed-video"
            ></iframe>
          </div>
        ))}
      </div>
    </div>
  );
};

export default InstagramCircles;
