import React, { useState } from "react";
import { assets } from "../assets/asset";
import { NavLink, useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  const [showMenu, setShowMenu] = useState(false);
  const [token, setToken] = useState(true);

  return (
    <nav className="flex items-center justify-between px-6 py-4 shadow-md bg-yellow-300 sticky top-0 z-50">
      <img
        onClick={() => navigate("/")}
        className="h-10 cursor-pointer"
        src={assets.logo}
        alt="Logo"
      />

      <ul className="hidden md:flex items-center gap-8 text-gray-700 font-medium text-sm">
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

      <div className="flex items-center gap-4">
        {token ? (
          <div className="relative group cursor-pointer">
            <div className="flex items-center gap-2">
              <img
                className="w-9 h-9 rounded-full object-cover"
                src={assets.profpic}
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
                onClick={() => setToken(false)}
                className="hover:text-red-500 py-1 cursor-pointer"
              >
                Logout
              </p>
            </div>
          </div>
        ) : (
          <button
            onClick={() => navigate("/login")}
            className="bg-emerald-500 text-white px-6 py-2 rounded-full hover:bg-emerald-600 transition duration-300 hidden md:block"
          >
            Sign Up / Login
          </button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
