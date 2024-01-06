"use client";
import React from "react";

const Footer = () => {
  return (
    <footer className="bg-blackColor py-[10px] px-8">
      <p className="text-white text-center text-[13px]">{`Copyright © ${new Date().getFullYear()}`}</p>
    </footer>
  );
};

export default Footer;
