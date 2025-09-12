// src/components/Offers.jsx
import React from "react";
import Marquee from "react-fast-marquee";

export default function Offers() {
  return (
    <section className="relative bg-white overflow-x-hidden">
      
      {/* Banner Header */}
      <div className="w-full bg-[#F7F7F7] text-center py-4">
        <h2 
          className="text-2xl md:text-3xl font-bold tracking-wide"
          style={{ color: "#642C44" }}
        >
          Our Offers
        </h2>
      </div>

      {/* Scrolling Offer Marquee */}
      <div className="overflow-x-hidden py-3">
        <Marquee
          gradient={false}
          speed={50}
          pauseOnHover
          className="select-none w-full"
          style={{ overflow: "hidden", backgroundColor: "#FFF0F5" }}
        >
          <span
            className="mx-12 text-lg md:text-2xl font-semibold whitespace-nowrap"
            style={{ color: "#642C44" }}
          >
            ₹200 off + free shipping for first order
          </span>
        </Marquee>
      </div>
    </section>
  );
}
