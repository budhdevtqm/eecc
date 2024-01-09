"use client";
import Image from "next/image";
import React from "react";
import PageHeader from "../components/PageHeader";

const AdminPage: React.FC = () => {
  const images = ["/d1.png", "/d2.jpeg", "/d3.png", "/d4.png"];
  return (
    <div className="h-full">
      <PageHeader title="Dashboard" />
      <div className="w-[80%] mx-auto flex flex-wrap my-4">
        {images.map((img: string) => (
          <div className="w-[45%] h-[320px] px-4 py-4 flex items-center justify-center bg-white m-2 rounded shadow">
            <Image
              src={img}
              alt="image"
              height={250}
              width={300}
              className="w-full h-full"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminPage;
