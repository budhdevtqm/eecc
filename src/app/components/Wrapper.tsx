"use client";
import React from "react";
import Header from "./Header";
import Footer from "./Footer";

interface WrapperProps {
  children: React.ReactNode;
}
const Wrapper: React.FC<WrapperProps> = ({ children }) => {
  return (
    <div className="min-h-[100vh] min-w-[100vw]">
      <Header />
      <main className="min-h-[91vh] w-full bg-[#E5E4E2]">
        <div className="h-full w-[80%] mx-auto py-8">
          <div>{children}</div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Wrapper;
