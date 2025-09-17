import React from "react";
import "./WatchAndBuy.css"; // Import the CSS file

const WatchAndBuy = () => {
  const videos = [
    {
      id: 1,
      videoUrl: "/videos/Video-111.mp4",
      productName: "Tropical Blush Co-ord Set",
      productLink: "/collections/co-ords/products/tropical-blush-set",
      thumbnail: "/images/1.png",
    },
    {
      id: 2,
      videoUrl: "/videos/Video-114.mp4",
      productName: "Earthy Green Co-ord Set",
      productLink: "https://shopify-storefront-rlry.vercel.app/products/earthy-green-embroidered-waistcoat-co-ord-set",
      thumbnail: "/images/1.png",
    },
    {
      id: 3,
      videoUrl: "/videos/Video-339.mp4",
      productName: "Sunsoaked Terra Co-ord Set",
      productLink: "/collections/co-ords/products/sunsoaked-terra-set",
      thumbnail: "/images/1.png",
    },
    {
      id: 4,
      videoUrl: "/videos/Video-766.mp4",
      productName: "High Waist Flared Trousers",
      productLink: "/collections/bottoms/products/high-waist-trousers",
      thumbnail: "/images/1.png",
    },
    {
      id: 5,
      videoUrl: "/videos/Video-609.mp4",
      productName: "Leopard Print One-Shoulder Maxi Dress",
      productLink: "https://delan1.myshopify.com/products/leopard-print-one-shoulder-maxi-dress",
      thumbnail: "/images/1.png",

    },
        {
      id: 4,
      videoUrl: "/videos/Video-766.mp4",
      productName: "High Waist Flared Trousers",
      productLink: "/collections/bottoms/products/high-waist-trousers",
      thumbnail: "/images/1.png",
    },
  ];

  return (
    <section className="watch-buy-section">
      <h2 className="section-title">Discover Your Look</h2>
      <div className="videos-container">
        {videos.map((item) => (
          <div key={item.id} className="video-card">
            {/* Video Reel */}
            <video
              src={item.videoUrl}
              autoPlay
              loop
              muted
              playsInline
              className="video-reel"
            ></video>

            {/* Product Info and Buy Button */}
            <div className="product-info">
              <div className="product-left">
                <img
                  src={item.thumbnail}
                  alt={item.productName}
                  className="product-thumbnail"
                />
                <div>
                  <p className="product-name">{item.productName}</p>
                  <p className="product-price">{item.price}</p>
                </div>
              </div>
              <a href={item.productLink} className="buy-button">
                Buy
              </a>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default WatchAndBuy;
