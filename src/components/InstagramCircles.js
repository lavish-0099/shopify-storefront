import React, { useState } from "react";
import "./InstagramCircles.css"; // Custom styles

const InstagramCircles = () => {
  // Instagram video/image data
  const instagramContent = [
    {
      id: 1,
      type: "video",
      thumbnail: "https://via.placeholder.com/150/FF0000/FFFFFF?text=Reel+1",
      videoUrl: "https://www.instagram.com/reel/DJn8kFQSR9i/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA=="
    },
    {
      id: 2,
      type: "video",
      thumbnail: "https://via.placeholder.com/150/00FF00/FFFFFF?text=Reel+2",
      videoUrl: "https://www.instagram.com/reel/DJgvpwLyLWz/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA=="
    },
    {
      id: 3,
      type: "image",
      thumbnail: "https://via.placeholder.com/150/0000FF/FFFFFF?text=Image+1",
      videoUrl: "https://www.instagram.com/reel/DJt8WXhywY-/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA=="
    },
    {
      id: 4,
      type: "video",
      thumbnail: "https://via.placeholder.com/150/FFFF00/000000?text=Reel+3",
      videoUrl: "https://www.instagram.com/reel/DKcPv2ESvfF/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA=="
    },
    {
      id: 5,
      type: "video",
      thumbnail: "https://via.placeholder.com/150/FF00FF/FFFFFF?text=Reel+4",
      videoUrl: "https://www.instagram.com/reel/DKpE90JSbZx/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA=="
    },
    {
      id: 6,
      type: "video",
      thumbnail: "https://via.placeholder.com/150/00FFFF/000000?text=Reel+5",
      videoUrl: "https://www.instagram.com/reel/DHlhqZay166/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA=="
    }
  ];

  const [mainImage, setMainImage] = useState(null);

  return (
    <div className="instagram-section">
      <h2 className="section-heading">Our Instagram Highlights</h2>

      {/* Circle Thumbnails Below Offer */}
      <div className="circle-thumbnails-below-offer">
        {instagramContent.map((item) => (
          <button
            key={item.id}
            className="circle-thumb"
            data-type={item.type}
            onClick={() => {
              if (item.type === "video" && item.videoUrl) {
                window.open(item.videoUrl, "_blank"); // Open reel in new tab
              } else {
                setMainImage({ url: item.thumbnail });
              }
            }}
          >
            <img src={item.thumbnail} alt={`Instagram ${item.id}`} />
          </button>
        ))}
      </div>

      {/* Optional: Show selected image below */}
      {mainImage && (
        <div className="main-image-viewer">
          <img src={mainImage.url} alt="Selected Preview" />
        </div>
      )}
    </div>
  );
};

export default InstagramCircles;
