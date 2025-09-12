// src/components/Offers.jsx
import React from "react";
import Marquee from "react-fast-marquee";

export default function Offers() {
  return (
    <section className="w-full">
      {/* Section Title */}
      <div className="bg-white py-6 text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-[#642C44]">
          Our Offers
        </h2>
      </div>


      {/* Marquee Scroller */}
      <div className="bg-[#FFF0F5] py-4">
        <Marquee gradient={false} speed={60} pauseOnHover={true}>
          <span className="mx-12 text-xl md:text-2xl font-semibold text-[#642C44] whitespace-nowrap">
            ₹200 off + Free Shipping for First Order
          </span>
          <span className="mx-12 text-xl md:text-2xl font-semibold text-[#642C44] whitespace-nowrap">
            ₹200 off + Free Shipping for First Order
          </span>
          <span className="mx-12 text-xl md:text-2xl font-semibold text-[#642C44] whitespace-nowrap">
            ₹200 off + Free Shipping for First Order
          </span>
        </Marquee>
      </div>
    </section>
  );
}
