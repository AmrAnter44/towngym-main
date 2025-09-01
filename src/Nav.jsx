import React, { useState } from "react";
import { Link } from "react-router-dom";

export default function Nav() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <div className="flex flex-col lg:flex-row items-center justify-between glass-nav text-white lg:m-2 mb-5">
        {/* Logo */}
        <div className="lg:ml-4 flex justify-between w-full lg:w-auto px-4 lg:px-0">
          <Link to={"/"}>
            <img src="/assets/bigLogo.png" alt="logo" className="w-28 " />
          </Link>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden text-white text-3xl"
            onClick={() => setOpen(!open)}
          >
            {open ? "✕" : "☰"}
          </button>
        </div>

        {/* Links */}
        <div
          className={`overflow-hidden transition-all duration-500 ease-in-out flex-col lg:flex lg:flex-row justify-between items-center font-bold text-center w-full lg:w-auto ${
            open
              ? "max-h-96 opacity-100 mt-4"
              : "max-h-0 opacity-0 lg:max-h-full lg:opacity-100"
          }`}
        >
          <Link
            to="/"
            className="hover:text-blue-500 px-2 py-2 m-1 rounded-lg hover:bg-gray-800"
            onClick={() => setOpen(false)}
          >
            Home
          </Link>
          <Link
            to="/classes"
            className="hover:text-blue-500 px-2 py-2 m-1 rounded-lg hover:bg-gray-800"
            onClick={() => setOpen(false)}
          >
            Classes
          </Link>
          <Link
            to="/map"
            className="hover:text-blue-500 px-2 py-2 m-1 rounded-lg hover:bg-gray-800"
            onClick={() => setOpen(false)}
          >
            Map
          </Link>
        </div>
      </div>
    </>
  );
}
