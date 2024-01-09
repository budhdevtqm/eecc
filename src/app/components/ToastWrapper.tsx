"use client";
import React from "react";
import { Toaster } from "react-hot-toast";

interface PropsType {
  children: React.ReactNode;
}

const ToastWrapper: React.FC<PropsType> = ({ children }) => {
  return (
    <>
      {children}
      <Toaster />
    </>
  );
};

export default ToastWrapper;
