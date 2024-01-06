"use client";
import React from "react";
import Link from "next/link";
import Logout from "../Logout";

const Header = () => {
  return (
    <header className="flex items-center justify-between py-4 px-8 shadow-[#32326926_0px_2px_5px_0px,_#0000000d_0px_1px_1px_0px] z-10">
      <Link className="flex  text-[25px] drop-shadow-lg" href="/">
        <span className="font-semibold text-textPrimary text-[14px] ">TQM</span>
        <span className="font-bold text-primary ">Mart</span>
      </Link>
      <div className="flex items-center justify-center gap-8">
        <Logout />
      </div>
    </header>
  );
};

export default Header;
