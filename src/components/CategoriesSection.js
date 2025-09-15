import React from "react";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "./CategoriesSection.css";

const baseCategories = [
  { title: "Maxi & Midi Dress", handle: "maxi-midi-dress", image: "/images/11.png", subtitle: "Made for every mood" },
  { title: "Short Dress", handle: "short-dress", image: "/images/22.png", subtitle: "Chic & stylish" },
  { title: "Co-ords", handle: "co-ords", image: "/images/33.png", subtitle: "Effortless sets" },
  { title: "Trousers", handle: "trousers", image: "/images/44.png", subtitle: "Comfort redefined" },
];

const categories = [...baseCategories, ...baseCategories];

const CategoriesSection = () => {
  return (
    <section className="categories-section">
      <Swiper
        modules={[Navigation]}
        effect={"slide"}
        speed={100}
        grabCursor={true}
        centeredSlides={true}
        slidesPerView={3}
        loop={true}
        navigation
        className="categories-carousel"
      >
        {categories.map((cat, index) => (
          <SwiperSlide key={`${cat.handle}-${index}`} className="category-slide">
            <Link to={`/collections/${cat.handle}`} className="category-card">
              <img src={cat.image} alt={cat.title} className="category-img" />
              <div className="category-overlay">
                <h3>{cat.title}</h3>
                <p>{cat.subtitle}</p>
              </div>
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};

export default CategoriesSection;