import React, { useState, useRef, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext";

const SearchComponent = () => {
  const [query, setQuery] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const [selectedValue, setSelectedValue] = useState("");
  const [highlightedIndex, setHighlightedIndex] = useState(0);
  const inputRef = useRef(null);
  const navigate = useNavigate();
  const { hospitals } = useContext(AppContext);

  const data = [
    "Allergy",
    "Anxiety",
    "Asthma",
    "Back Pain",
    "Chest Pain",
    "Cold and Fever",
    "Cough",
    "Delusion",
    "Depression",
    "Diarrhea",
    "Eye Infection",
    "Fracture",
    "Headache",
    "High Blood Pressure",
    "Joint Pain",
    "Kuch-Kuch Hota Hai",
    "Love",
    "Low Blood Sugar",
    "Migraine",
    "Skin Rash",
    "Sore Throat",
    "Stomach Ache",
    "Toothache",
    "Viral Disease",
    "Heart Problem",
    "Respiratory Disease",
    "Skin Diseases",
    "Common Cold",
    "Sun-Stroke",
  ];

  const filteredData = data.filter((item) =>
    item.toLowerCase().includes(query.toLowerCase())
  );

  const matchedHospitals = hospitals
    .filter((h) => h.disease === selectedValue)
    .sort((a, b) => {
      const totalA = parseInt(a.queue) + parseInt(a.travel);
      const totalB = parseInt(b.queue) + parseInt(b.travel);
      if (totalA === totalB) {
        return parseFloat(b.rating) - parseFloat(a.rating);
      }
      return totalA - totalB;
    });

  useEffect(() => setHighlightedIndex(0), [query]);

  const handleSelect = (item) => {
    setQuery(item);
    setSelectedValue(item);
    setShowDropdown(false);
    inputRef.current.blur();
  };

  const handleKeyDown = (e) => {
    if (!showDropdown) return;
    const max = filteredData.length - 1;
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setHighlightedIndex((prev) => (prev < max ? prev + 1 : 0));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setHighlightedIndex((prev) => (prev > 0 ? prev - 1 : max));
    } else if (e.key === "Enter") {
      e.preventDefault();
      if (filteredData.length) handleSelect(filteredData[highlightedIndex]);
    }
  };

  return (
    <div className="w-full px-4 md:px-8 lg:px-20 xl:px-40 py-4">
      <div className="relative w-full max-w-6xl mx-auto">
        <input
          type="text"
          placeholder="Search for patient problem here..."
          className="border border-gray-300 p-2 pr-8 rounded w-full"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setShowDropdown(true);
          }}
          onFocus={() => setShowDropdown(true)}
          onBlur={() => setTimeout(() => setShowDropdown(false), 150)}
          onKeyDown={handleKeyDown}
          ref={inputRef}
        />

        {query && (
          <button
            onMouseDown={() => {
              setQuery("");
              setSelectedValue("");
              setHighlightedIndex(0);
              inputRef.current.focus();
            }}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-black font-bold text-xl opacity-80 hover:opacity-100"
          >
            ×
          </button>
        )}

        {showDropdown && (
          <ul className="absolute z-10 mt-1 bg-white border border-gray-300 rounded w-full max-h-60 overflow-y-auto shadow-lg">
            {filteredData.length > 0 ? (
              filteredData.map((item, i) => (
                <li
                  key={i}
                  className={`px-4 py-2 text-sm font-medium cursor-pointer border-b border-gray-100 last:border-none
                    ${
                      i === highlightedIndex
                        ? "bg-emerald-800 text-white"
                        : "bg-gray-100 text-gray-900 hover:bg-emerald-800 hover:text-white"
                    }`}
                  onMouseEnter={() => setHighlightedIndex(i)}
                  onMouseDown={() => handleSelect(item)}
                >
                  {item}
                </li>
              ))
            ) : (
              <li className="px-4 py-2 text-sm font-medium text-red-500">
                No results found
              </li>
            )}
          </ul>
        )}
      </div>

      {selectedValue && (
        <div className="w-full max-w-6xl mx-auto mt-6">
          {matchedHospitals.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 gap-6">
              {matchedHospitals
                .sort((a, b) => {
                  const totalA = parseInt(a.queue) + parseInt(a.travel);
                  const totalB = parseInt(b.queue) + parseInt(b.travel);

                  // If total time is the same, sort by rating in descending order
                  if (totalA === totalB) {
                    return parseFloat(b.rating) - parseFloat(a.rating);
                  }

                  // Sort by total time in ascending order
                  return totalA - totalB;
                })
                .map((item, i) => (
                  <div
                    key={i}
                    onMouseDown={() => navigate(`/appointment/${item._id}`)}
                    className="border border-blue-200 rounded-xl overflow-hidden cursor-pointer hover:-translate-y-2 transition duration-300 w-full max-w-[700px] mx-auto"
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
                          Total time:{" "}
                          {parseInt(item.queue) + parseInt(item.travel)} mins
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
              Currently no hospital found near your location for{" "}
              <span className="font-semibold text-black">{selectedValue}</span>.
            </p>
          )}
        </div>
      )}
    </div>
  );
};

export default SearchComponent;
