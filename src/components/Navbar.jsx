import React from "react";
import { NavLink } from "react-router-dom";

const Navbar = () => {
  return (
    <div className="w-full px-15 py-4 bg-[#353535] text-white flex items-center justify-between">
      <div>
        <h2>PASTE.</h2>
      </div>
      <ul className="flex items-center justify-end gap-10 ">
        <NavLink
          to="/"
          className={({ isActive }) =>
            isActive ? "text-[#ffe400] border-b border-[#ffe400]" : ""
          }
        >
          <li className="px-2 py-1">Home</li>
        </NavLink>
        <NavLink
          to="/pastes"
          className={({ isActive }) =>
            isActive ? "text-[#ffe400] border-b border-[#ffe400]" : ""
          }
        >
          <li className="px-2 py-1">Pastes</li>
        </NavLink>
      </ul>
    </div>
  );
};

export default Navbar;
