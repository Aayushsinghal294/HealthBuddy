import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext";

const Nearbyhospitals = () => {
  const navigate = useNavigate();
  const { hospitals } = useContext(AppContext);

  return (
    <section className="flex flex-col items-center gap-6 my-20 text-gray-900 px-4 md:px-28">
      <h1 className="text-3xl md:text-4xl font-semibold text-center">
        Hospitals Nearby You
      </h1>
      <p className="text-center text-gray-600 max-w-lg">
        Skip the guesswork — get nearby hospital recommendations based on your
        condition, availability, and travel time.
      </p>

      <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-6">
        {hospitals.slice(0, 10).map((item, index) => (
          <div
            key={index}
            onClick={() => navigate(`/appointment/${item._id}`)}
            className="bg-white rounded-2xl shadow hover:shadow-lg transition-all duration-300 cursor-pointer overflow-hidden flex flex-col"
          >
            <img
              src={item.image}
              alt={item.name}
              className="h-48 w-full object-cover rounded-t-2xl"
            />
            <div className="p-4 flex flex-col gap-2 flex-grow">
              <div className="flex items-center gap-2 text-sm text-green-600 font-medium">
                <span className="w-2 h-2 bg-green-500 rounded-full inline-block" />
                Open Now
              </div>
              <h2 className="text-lg font-semibold">{item.name}</h2>
              <p className="text-gray-500 text-sm">{item.disease}</p>
              <button className="mt-2 bg-emerald-500 text-white px-4 py-2 rounded-full text-sm w-fit hover:bg-emerald-600 transition">
                Book Now
              </button>

              <div className="flex items-center justify-between mt-4 text-sm">
                <p className="text-blue-700 font-medium">
                  Total time: {parseInt(item.queue) + parseInt(item.travel)}{" "}
                  mins
                  <span className="text-xs text-gray-500 ml-1">
                    (Queue + Travel)
                  </span>
                </p>
                <p className="text-yellow-600 font-semibold">
                  ⭐ {item.rating} / 5
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <button
        onClick={() => {
          navigate("/doctors");
          scrollTo(0, 0);
        }}
        className="mt-8 px-6 py-3 bg-emerald-500 text-white rounded-full hover:bg-emerald-600 transition"
      >
        View All Hospitals
      </button>
    </section>
  );
};

export default Nearbyhospitals;
