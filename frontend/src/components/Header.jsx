import React from "react";
import { assets } from "../assets/asset";
import HandBackground from "./HandBackground";

const Header = () => {
  return (
    <section className="relative bg-yellow-50 px-6 md:px-10 lg:px-36 py-16 overflow-hidden">
      <HandBackground />

      <div className="flex flex-col md:flex-row items-center justify-between gap-10 relative z-10">
        <div className="md:w-1/2 flex flex-col gap-6 text-left">
          <h1
            className="text-4xl md:text-4xl  text-gray-600 leading-tight"
            style={{
              fontFamily: "sharp-sans-medium, fallback-font, Arial, sans-serif",
            }}
          >
            Find the Best Hospitals <br /> Right When You Need One
          </h1>

          <p
            className="text-lg text-gray-800"
            style={{
              fontFamily: "sharp-sans-medium, fallback-font, Arial, sans-serif",
            }}
          >
            No wait, no guesswork. Instantly compare hospitals by queue time,
            distance, and treatment specialties — all in one place.
          </p>

          <a
            href="#disease"
            className="inline-flex items-center gap-2 bg-emerald-500 text-white px-6 py-3 rounded-full font-medium hover:bg-emerald-600 transition duration-300 w-fit"
            style={{
              fontFamily: "sharp-sans-medium, fallback-font, Arial, sans-serif",
            }}
          >
            Find Hospitals
            <img className="w-3" src={assets.arrow} alt="arrow" />
          </a>
        </div>

        {/* Right Section - Image */}
        <div className="px-20 md:w-1/2"></div>
      </div>
    </section>
  );
};

export default Header;
