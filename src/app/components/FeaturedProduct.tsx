"use client";
import React, { useState } from "react";
import { FaCartPlus } from "react-icons/fa";

const FeaturedProduct: React.FC = () => {
  const [value, setValue] = useState(1);

  const handleIncrement = () => setValue((prev) => prev + 1);
  const handleDecrement = () => {
    if (value === 1) return;
    setValue((prev) => prev - 1);
  };

  return (
    <div className=" rounded shadow bg-white w-[200px] border flex flex-col gap-1">
      <div className="px-2 pt-2 pb-1 cursor-pointer flex flex-col gap-1">
        <img
          src="https://loremflickr.com/640/480/fashion"
          alt="product-image"
        />
        <p className="font-semibold text-[14px] text-center">Iphone 15 pro</p>
        <p className="font-semibold text-[14px] text-center">₹ 999</p>
      </div>
      <div className="px-2 pt-1 pb-2">
        <form>
          <div className="flex items-center justify-center gap-1">
            <button
              type="button"
              onClick={handleDecrement}
              disabled={value === 1 ? true : false}
              className={`border border-primary shadow px-2 py-1 text-primary rounded hover:bg-primary hover:text-white mr-2 ${
                value === 1 ? "cursor-not-allowed" : "cursor-pointer"
              }`}
            >
              -
            </button>
            <input
              type="number"
              value={value}
              className="w-[65px] h-[40px] border border-gray-300 rounded outline-primary px-2 py-[2px]"
            />
            <button
              type="button"
              onClick={handleIncrement}
              className="border border-primary shadow px-2 py-1 text-primary rounded hover:bg-primary hover:text-white ml-2"
            >
              +
            </button>
          </div>
          <div className="flex items-center justify-center mt-2">
            <button
              className="flex gap-2  items-center justify-center text-[16px] px-2 py-1 border border-primary rounded text-primary hover:text-white hover:bg-primary"
              type="submit"
            >
              <span className="text-[20px]">
                <FaCartPlus />
              </span>
              ADD TO CART
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default FeaturedProduct;
