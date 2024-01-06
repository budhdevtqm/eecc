import React from "react";
import Link from "next/link";
import { MdOutlineArrowBackIos } from "react-icons/md";

interface HeaderProps {
  title: string;
  navigate?: string;
  backPath?: string;
}

const PageHeader: React.FC<HeaderProps> = ({ title, navigate, backPath }) => {
  return (
    <div className="flex items-center justify-between px-8 py-4 rounded my-2">
      <div className="flex gap-8 items-center">
        {backPath && (
          <Link
            title="Back"
            href={backPath}
            className="p-3 rounded-full hover:bg-gray-300 flex items-center justify-center cursor-pointer"
          >
            <MdOutlineArrowBackIos />
          </Link>
        )}

        <h1 className="font-bold text-[20px] text-gray-600">{title}</h1>
      </div>
      {navigate && (
        <Link
          href={`${navigate}`}
          className="bg-gray-500 px-8 py-1 text-white rounded hover:bg-primary "
        >
          Add
        </Link>
      )}
    </div>
  );
};

export default PageHeader;
