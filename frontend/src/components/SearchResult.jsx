import React, { useContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext";

const SearchResults = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { disease } = location.state || {};
  const { hospitals } = useContext(AppContext);

  const matchedHospitals = hospitals
    .filter((h) => h.disease === disease)
    .sort((a, b) => {
      const totalA = parseInt(a.queue) + parseInt(b.travel);
      const totalB = parseInt(b.queue) + parseInt(b.travel);
      if (totalA === totalB) {
        return parseFloat(b.rating) - parseFloat(a.rating);
      }
      return totalA - totalB;
    });

  return (
    <div className="px-40 py-10 flex-wrap">
      <h2 className="text-2xl font-semibold mb-4 text-center">
        Hospitals for: <span className="text-emerald-600">{disease}</span>
      </h2>

      {matchedHospitals.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 gap-6">
          {matchedHospitals.map((item, i) => (
            <div
              key={i}
              onClick={() => navigate(`/appointment/${item._id}`)}
              className="border border-blue-200 rounded-xl overflow-hidden cursor-pointer hover:-translate-y-2 transition duration-300"
            >
              <img
                src={item.image}
                alt={item.name}
                className="bg-blue-50 w-full h-60 object-cover"
              />
              <div className="p-4">
                <div className="flex items-center gap-2 text-sm text-green-500">
                  <p className="w-2 h-2 bg-green-500 rounded-full"></p>
                  <p>Opened</p>
                </div>
                <p className="text-lg font-medium">{item.name}</p>
                <p className="text-sm text-gray-600">{item.disease}</p>

                <div className="flex items-center justify-between mt-2">
                  <p className="text-sm text-blue-700 font-medium">
                    Total time: {parseInt(item.queue) + parseInt(item.travel)}{" "}
                    mins
                    <span className="text-xs text-gray-500 ml-1">
                      (Queue + Travel)
                    </span>
                  </p>
                  <p className="text-sm text-yellow-600 font-semibold">
                    ⭐ {item.rating} / 5
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center text-red-600 text-lg font-medium">
          No hospitals found for <span className="text-black">{disease}</span>
        </p>
      )}
    </div>
  );
};

export default SearchResults;
