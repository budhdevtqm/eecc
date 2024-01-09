"use client";
import React, { useEffect, useState } from "react";
import { MdOutlineArrowRight, MdOutlineArrowLeft } from "react-icons/md";

interface PropsType {
  images: string[] | [];
  interval?: number;
}

const Slider: React.FC<PropsType> = ({ images, interval }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const prevSlide = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + images.length) % images.length
    );
  };

  useEffect(() => {
    const intervalId = setInterval(nextSlide, interval);

    return () => {
      clearInterval(intervalId);
    };
  }, [currentIndex, interval]);

  return (
    <div className="flex w-[100%] overflow-hidden select-none">
      <div
        onClick={prevSlide}
        className="w-[4%] z-10 flex items-center justify-center mr-[-4%] hover:bg-[#131313b0] cursor-pointer"
      >
        <button className="p-1 rounded-full">
          <span className="text-[35px] text-white">
            <MdOutlineArrowLeft />
          </span>
        </button>
      </div>
      <div className="w-[100%] z-0 h-[100%]">
        <img
          src={images[currentIndex]}
          alt={`slide ${currentIndex + 1}`}
          className="w-[100%] h-[500px] transition-opacity duration-500"
        />
      </div>
      <div
        onClick={nextSlide}
        className="w-[4%] z-10 flex items-center justify-center ml-[-4%] hover:bg-[#131313b0] cursor-pointer"
      >
        <button className="p-1 rounded-full">
          <span className="text-[35px] text-white">
            <MdOutlineArrowRight />
          </span>
        </button>
      </div>
    </div>
  );
};

export default Slider;
