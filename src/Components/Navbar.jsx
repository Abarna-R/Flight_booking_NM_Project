import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <div className="w-[100%] bg-[#1989C8] h-[5rem] text-center flex items-center justify-center">
      <Link to={"/"}>
        <p className="font-semibold text-[1.5rem] text-[white]">FlightHub</p>
      </Link>
    </div>
  );
};

export default Navbar;
