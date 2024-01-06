"use client";
import React from "react";
import Image from "next/image";

interface SliderProps {
  images: [] | Array<string>;
  setImg: (url: string) => void;
}

const ImageSlider: React.FC<SliderProps> = ({ images, setImg }) => {
  return (
    <div className="flex flex-wrap gap-1 px-8 py-2">
      {images.map((url, index) => (
        <Image
          key={index}
          src={`/upload/products/${url}`}
          width={70}
          height={70}
          alt="product-img"
          className="border p-1 cursor-pointer"
          onClick={() => setImg(`/upload/products/${url}`)}
        />
      ))}
    </div>
  );
};

export default ImageSlider;
