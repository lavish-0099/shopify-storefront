import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import "./Categories.css";

export default function Categories() {
  const categories = [
    { name: "Maxi Dresses", img: "/images/7.png" },
    { name: "Midi Dresses", img: "/images/6.png" },
    { name: "Short Dresses", img: "/images/1.png" },
    { name: "Co-Ords", img: "/images/2.png" },
    { name: "Trousers", img: "/images/3.png" },
  ];

  const [activeIndex, setActiveIndex] = useState(0);

  // Calculate next and next-next indices for the blurred images
  const nextIndex = (activeIndex + 1) % categories.length;
  const nextNextIndex = (activeIndex + 2) % categories.length;

  return (
    <div className="container">
      <div className="main">
        {/* Left Category List */}
        <div className="category-list">
          {categories.map((cat, idx) => (
            <span
              key={cat.name}
              onMouseEnter={() => setActiveIndex(idx)} // hover par change
              className={`category-item ${activeIndex === idx ? "active" : ""}`}
            >
              {cat.name}
            </span>
          ))}
        </div>

        {/* Center Product Preview */}
        <div className="preview">
          <AnimatePresence mode="wait">
            <motion.img
              key={categories[activeIndex].name}
              src={categories[activeIndex].img}
              alt={categories[activeIndex].name}
              className="main-img"
              initial={{ opacity: 0, scale: 0.9, y: 40 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 1.05, y: -40 }}
              transition={{ duration: 0.7, ease: "easeInOut" }}
            />
          </AnimatePresence>

          {/* Blurred Images */}
          <div className="blurred-images">
            <AnimatePresence mode="wait">
              <motion.img
                key={categories[nextIndex].name + "-next"}
                src={categories[nextIndex].img}
                alt={categories[nextIndex].name}
                className="blurred-img"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.5 }}
              />
            </AnimatePresence>
            <AnimatePresence mode="wait">
              <motion.img
                key={categories[nextNextIndex].name + "-next-next"}
                src={categories[nextNextIndex].img}
                alt={categories[nextNextIndex].name}
                className="blurred-img deeper-blur"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.5, delay: 0.1 }}
              />
            </AnimatePresence>
          </div>
        </div>

        {/* Right Empty Space for Balance */}
        <div className="right-space"></div>
      </div>
    </div>
  );
}
