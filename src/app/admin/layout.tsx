"use client";
import React from "react";
import Header from "../components/admin/Header";
import Footer from "../components/admin/Footer";
import SideNavbar from "../components/admin/SideNavbar";

interface PropsType {
  children: React.ReactNode;
}

const Layout: React.FC<PropsType> = ({ children }) => {
  return (
    <div className="min-w-[100vw] min-h-[100vh] flex flex-col">
      <Header />
      <main className="min-h-[87vh] bg-[#E4E3E2] overflow-hidden flex">
        <SideNavbar />
        <div className="w-[calc(100%-250px)] min-h-[87vh]">
          <div className="overflow-x-hidden overflow-y-scroll p-4">
            {children}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
