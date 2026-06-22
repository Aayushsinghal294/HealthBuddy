import React, { useState, useContext, useRef, useEffect } from "react";
import { assets } from "../assets/asset";
import { NavLink, useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext";

const Navbar = () => {
  const navigate = useNavigate();
  const { hospitals, user, logout } = useContext(AppContext);

  const [query, setQuery] = useState("");
  const [showSearch, setShowSearch] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState(0);
  const inputRef = useRef(null);

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

  useEffect(() => setHighlightedIndex(0), [query]);

  const handleSelect = (item) => {
    setQuery("");
    setShowDropdown(false);
    inputRef.current.blur();
    navigate("/search-results", { state: { disease: item } }); // ✅ Redirect to results page
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
    <nav className="flex flex-col gap-3 md:flex-row md:items-center justify-between px-4 md:px-8 py-3 sticky top-0 z-50 navbar">
      <div className="flex items-center justify-between w-full md:w-auto">
        <img
          onClick={() => navigate("/")}
          className="h-10 cursor-pointer"
          src={assets.logo}
          alt="Logo"
        />
      </div>

      <button
        className="md:hidden px-2 py-1 text-gray-600"
        onClick={() => setShowMenu((s) => !s)}
        aria-label="Toggle navigation"
        aria-expanded={showMenu}
      >
        ☰
      </button>

      <ul className="hidden md:flex items-center gap-6 text-gray-700 font-medium text-sm">
        <NavLink
          to="/"
          className={({ isActive }) =>
            isActive
              ? "text-emerald-600 font-semibold"
              : "hover:text-emerald-500"
          }
        >
          HOME
        </NavLink>
        <NavLink
          to="/doctors"
          className={({ isActive }) =>
            isActive
              ? "text-emerald-600 font-semibold"
              : "hover:text-emerald-500"
          }
        >
          ALL HOSPITALS
        </NavLink>
        <NavLink
          to="/about"
          className={({ isActive }) =>
            isActive
              ? "text-emerald-600 font-semibold"
              : "hover:text-emerald-500"
          }
        >
          SEARCH
        </NavLink>
        <NavLink
          to="/contact"
          className={({ isActive }) =>
            isActive
              ? "text-emerald-600 font-semibold"
              : "hover:text-emerald-500"
          }
        >
          MAPS
        </NavLink>
      </ul>

      {/* Mobile menu */}
      {showMenu && (
        <div className="md:hidden mt-2 w-full bg-white rounded-lg shadow p-4">
          <ul className="flex flex-col gap-3 text-gray-800">
            <li onClick={() => { navigate('/'); setShowMenu(false) }} className="py-2">Home</li>
            <li onClick={() => { navigate('/doctors'); setShowMenu(false) }} className="py-2">All Hospitals</li>
            <li onClick={() => { navigate('/about'); setShowMenu(false) }} className="py-2">Search</li>
            <li onClick={() => { navigate('/contact'); setShowMenu(false) }} className="py-2">Maps</li>
          </ul>
        </div>
      )}

      <div className="relative w-full rounded-xl bg-amber-50 md:w-80 mt-2 md:mt-0">
        <input
          type="text"
          placeholder="Search disease..."
          className="w-full p-2 rounded-xl border border-gray-300 text-sm"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setShowSearch(true);
          }}
          onFocus={() => setShowSearch(true)}
          onBlur={() => setTimeout(() => setShowSearch(false), 150)}
          onKeyDown={handleKeyDown}
          ref={inputRef}
        />
        {query && (
          <button
            onMouseDown={() => {
              setQuery("");
              inputRef.current.focus();
            }}
            className="absolute right-3 top-2 text-gray-500 hover:text-black font-bold text-lg"
          >
            ×
          </button>
        )}
        {showSearch && (
          <ul className="absolute z-50 mt-1 bg-white border border-gray-300 rounded w-full max-h-60 overflow-y-auto shadow-lg">
            {filteredData.length > 0 ? (
              filteredData.map((item, i) => (
                <li
                  key={i}
                  className={`px-4 py-2 text-sm cursor-pointer 
                    ${
                      i === highlightedIndex
                        ? "bg-emerald-800 text-white"
                        : "hover:bg-emerald-800 hover:text-white"
                    }`}
                  onMouseEnter={() => setHighlightedIndex(i)}
                  onMouseDown={() => handleSelect(item)}
                >
                  {item}
                </li>
              ))
            ) : (
              <li className="px-4 py-2 text-sm text-red-500">
                No results found
              </li>
            )}
          </ul>
        )}
      </div>

      <div className="flex items-center gap-4 mt-2 md:mt-0">
        {user ? (
          <div className="relative group cursor-pointer">
            <div className="flex items-center gap-2">
              <img
                className="w-9 h-9 rounded-full object-cover"
                src={user?.image || assets.profpic}
                alt="Profile"
              />
              <img className="w-4" src={assets.dropdown} alt="Dropdown" />
            </div>
            <div className="absolute right-0 mt-2 bg-white border rounded-lg shadow-md p-4 hidden group-hover:block z-10 w-48 text-sm text-gray-700">
              <p
                onClick={() => navigate("my-profile")}
                className="hover:text-emerald-600 py-1 cursor-pointer"
              >
                My Profile
              </p>
              <p
                onClick={() => navigate("my-appointments")}
                className="hover:text-emerald-600 py-1 cursor-pointer"
              >
                My Appointments
              </p>
              <p
                onClick={() => { logout(); navigate('/') }}
                className="hover:text-red-500 py-1 cursor-pointer"
              >
                Logout
              </p>
            </div>
          </div>
        ) : (
          <button
            onClick={() => navigate("/login")}
            className="bg-[var(--brand-500)] text-white px-6 py-2 rounded-full hover:brightness-95 transition duration-300 hidden md:block"
          >
            Sign Up / Login
          </button>
        )}
      </div>

    </nav>
  );
};

export default Navbar;
