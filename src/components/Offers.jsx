// src/components/Offers.jsx
import React from "react";
import Marquee from "react-fast-marquee";

export default function Offers() {
  return (
    <section className="relative w-full">
      {/* Banner Header */}
      <div className="w-full bg-[#F7F7F7] text-center py-6 shadow-sm">
        <h2 
          className="text-3xl md:text-4xl font-bold"
          style={{ color: "#642C44" }}
        >
          Our Offers
        </h2>
      </div>

      {/* Scrolling Offer Section */}
      <div className="bg-[#FFF0F5] py-4">
        <Marquee
          gradient={false}
          speed={50}
          pauseOnHover
          className="select-none w-full"
        >
          <span
            className="mx-8 text-xl md:text-2xl font-semibold whitespace-nowrap tracking-wide"
            style={{ color: "#642C44" }}
          >
            ₹200 off + Free Shipping for First Order
          </span>
          <span
            className="mx-8 text-xl md:text-2xl font-semibold whitespace-nowrap tracking-wide"
            style={{ color: "#642C44" }}
          >
            ₹200 off + Free Shipping for First Order
          </span>
        </Marquee>
      </div>
    </section>
  );
}
