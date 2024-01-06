import React from "react";

const Footer: React.FC = () => {
  return (
    <footer className="bg-blackColor py-2 px-8">
      <p className="text-white text-center text-[13px]">{`Copyright © ${new Date().getFullYear()}`}</p>
    </footer>
  );
};

export default Footer;
