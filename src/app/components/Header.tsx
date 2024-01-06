"use client";
import React from "react";
import { FaUserLarge } from "react-icons/fa6";
import Navbar from "./Navbar";
import Link from "next/link";
import { FaCartShopping } from "react-icons/fa6";
import Logout from "./Logout";

const Header: React.FC = () => {
  return (
    <header className="flex items-center justify-between py-4 px-8 shadow-[#32326926_0px_2px_5px_0px,_#0000000d_0px_1px_1px_0px] z-10">
      <Link className="flex  text-[25px] drop-shadow-lg" href="/">
        <span className="font-semibold text-textPrimary text-[14px] ">TQM</span>
        <span className="font-bold text-primary ">Mart</span>
      </Link>
      <div>
        <Navbar />
      </div>
      <div className="flex items-center justify-center gap-8">
        <div className="flex items-center justify-center gap-4">
          <Link
            href="/cart"
            title="Cart"
            className="p-2 cursor-pointer hover:bg-gray-300 rounded-2xl "
          >
            <FaCartShopping className="h-full " />
          </Link>
          <Link
            href="/my-profile"
            title="Profile"
            className="p-2 cursor-pointer  hover:bg-gray-300 rounded-2xl "
          >
            <FaUserLarge className="h-full " />
          </Link>
        </div>

        <Logout />
      </div>
    </header>
  );
};

export default Header;
