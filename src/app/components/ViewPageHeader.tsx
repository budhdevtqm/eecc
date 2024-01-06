import Link from "next/link";
import React from "react";
import { MdArrowBackIosNew } from "react-icons/md";

interface HeaderProps {
  title: string;
  navigate: string;
}

const ViewPageHeader: React.FC<HeaderProps> = ({ title, navigate }) => {
  return (
    <div className="flex items-center gap-8 py-2">
      <Link
        href={`${navigate}`}
        className="p-2 rounded-2xl hover:bg-gray-300"
        title="Back"
      >
        <span>
          <MdArrowBackIosNew />
        </span>
      </Link>

      <h1 className="font-bold text-[20px] text-gray-500">{title}</h1>
    </div>
  );
};

export default ViewPageHeader;
