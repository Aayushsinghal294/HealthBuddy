import React from "react";
import { diseasedata } from "../assets/asset";
import { Link } from "react-router-dom";

const Diseasemenu = () => {
  return (
    <section
      id="disease"
      className="flex flex-col items-center gap-6 py-16 px-4 sm:px-8  lg:px-16 bg-yellow-100 text-gray-800"
      style={{
        fontFamily: "ui-rounded, Nunito, Inter, Arial, sans-serif",
      }}
    >
      {/* Title */}
      <h1 className="text-3xl md:text-4xl font-bold text-center text-gray-900">
        Explore Specialists by Condition
      </h1>

      {/* Subheading */}
      <p className="text-center text-gray-600 max-w-xl tracking-tighter text-base md:text-lg leading-relaxed">
        Let’s get you a doc who gets you
      </p>

      {/* Scrollable Grid of Disease Tiles */}
      <div className="flex gap-8 pt-6 w-full overflow-x-auto sm:overflow-x-hidden flex-wrap justify-center scroll-smooth hide-scrollbar">
        {diseasedata.map((item, index) => (
          <Link
            key={index}
            to={`/doctors/${item.disease}`}
            onClick={() => scrollTo(0, 0)}
            className="w-28 sm:w-32 md:w-36 flex-shrink-0 flex flex-col items-center justify-center p-2 text-center cursor-pointer transition-transform duration-300 hover:-translate-y-1"
          >
            <img
              src={item.image}
              alt={item.disease}
              className="w-40 h-20 object-contain mb-2"
            />
            <p className="text-sm font-medium text-gray-700">{item.disease}</p>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default Diseasemenu;
