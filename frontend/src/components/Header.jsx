import React from "react";
import { assets } from "../assets/asset";
import HandBackground from "./HandBackground";

const Header = () => {
  return (
    <section className="relative px-6 md:px-10 lg:px-36 py-16 overflow-hidden" style={{ background: 'var(--primary-50)' }}>
      <HandBackground />

      <div className="flex flex-col md:flex-row items-center justify-between gap-10 relative z-10">
        <div className="md:w-1/2 flex flex-col gap-6 text-left">
          <h1 className="text-4xl md:text-5xl text-gray-900 leading-tight font-semibold">
            Find the Best Hospitals <br /> Right When You Need One
          </h1>

          <p className="text-lg text-gray-700 max-w-xl">
            No wait, no guesswork. Instantly compare hospitals by queue time,
            distance, and treatment specialties — all in one place.
          </p>

          <a href="#disease" className="btn-primary inline-flex items-center gap-2 font-medium w-fit">
            Find Hospitals
            <img className="w-3" src={assets.arrow} alt="arrow" />
          </a>
        </div>

        <div className="px-20 md:w-1/2"></div>
      </div>
    </section>
  );
};

export default Header;
