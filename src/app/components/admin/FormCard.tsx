"use client";
import Link from "next/link";
import React from "react";
import { Toaster } from "react-hot-toast";
import { MdOutlineArrowBackIos } from "react-icons/md";
interface PropsTypes {
  title: string;
  path: string;
  children: React.ReactNode;
}

const FormCard: React.FC<PropsTypes> = ({ title, path, children }) => {
  return (
    <div className="w-full h-full ">
      <div className="flex px-8 py-4 my-2 items-center">
        <div className="w-[42%] flex">
          <Link
            title="Back"
            href={path}
            className="p-3 rounded-full hover:bg-gray-300 flex items-center justify-center cursor-pointer"
          >
            <MdOutlineArrowBackIos />
          </Link>
        </div>
        <div className="w-[58%]">
          <h1 className="font-bold text-[25px]">{title}</h1>
        </div>
      </div>
      <div className="flex  justify-center">
        <div className="min-w-[400px] my-14 bg-white h-fit p-8 rounded-lg shadow-md">
          {children}
        </div>
      </div>
      <Toaster />
    </div>
  );
};

export default FormCard;
