import React from "react";
import Link from "next/link";
import { MdArrowBackIosNew } from "react-icons/md";

interface FormProps {
  navigate: string;
  title: string;
}

export const FormHeader: React.FC<FormProps> = ({ navigate, title }) => {
  return (
    <div className="flex items-center py-2 px-1">
      <div className="w-[40%] flex">
        <Link
          href={`${navigate}`}
          className="p-2 rounded-2xl hover:bg-gray-300"
          title="Back"
        >
          <span className="">
            <MdArrowBackIosNew />
          </span>
        </Link>
      </div>

      <h1 className="font-bold  w-[60%] text-primary">{title}</h1>
    </div>
  );
};
