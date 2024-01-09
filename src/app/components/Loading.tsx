"use client";
import React from "react";

const Loading = () => {
  return (
    <div className="flex items-center justify-center h-[600px]">
      <div className="animate-spin rounded-full border-t-4 border-primary border-solid h-16 w-16"></div>
    </div>
  );
};

export default Loading;
