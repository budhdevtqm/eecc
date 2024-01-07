import React from "react";
import {
  IoIosArrowDropleftCircle,
  IoMdArrowDroprightCircle,
} from "react-icons/io";

interface PaginationProps {
  totalPages: number;
  currentPage: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  totalPages,
  currentPage,
  onPageChange,
}) => {
  const generatePageNumbers = () => {
    const pages = [];
    for (let i = 1; i <= totalPages; i++) {
      pages.push(i);
    }
    return pages;
  };

  return (
    <nav className="flex items-center justify-center my-4 w-[100%]">
      <ul className="w-[80%] flex items-center justify-between">
        <li>
          <button
            onClick={() => onPageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="px-4 py-1 border border-primary text-primary hover:bg-primary hover:text-white rounded"
          >
            Previous
          </button>
        </li>
        <div className="flex items-center gap-1 justify-center">
          {generatePageNumbers().map((page) => (
            <li key={page}>
              <button
                onClick={() => onPageChange(page)}
                className={`pagination-button ${
                  currentPage === page
                    ? "border border-primary py-1 px-2 text-white bg-primary shadow mx-1"
                    : " border border-gray-400 text-gray-400 py-1 px-2 mx-1"
                }`}
              >
                {page}
              </button>
            </li>
          ))}
        </div>
        <li>
          <button
            onClick={() => onPageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="px-4 py-1 border border-primary text-primary hover:bg-primary hover:text-white rounded"
          >
            Next
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default Pagination;
