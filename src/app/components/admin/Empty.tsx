"use client";

import React from "react";

interface PropsTypes {
  label: string;
}

const Empty: React.FC<PropsTypes> = ({ label }) => {
  return (
    <div className="flex items-center justify-center min-h-[300px]">
      <h1 className="font-bold text-[20px] text-gray-500">{label}</h1>
    </div>
  );
};

export default Empty;
