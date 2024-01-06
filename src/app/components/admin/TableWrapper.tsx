"use client";
import React from "react";
import { Toaster } from "react-hot-toast";

interface PropsTypes {
  children: React.ReactNode;
}

const TableWrapper: React.FC<PropsTypes> = ({ children }) => {
  return (
    <div className="p-8">
      {children}
      <Toaster />
    </div>
  );
};

export default TableWrapper;
