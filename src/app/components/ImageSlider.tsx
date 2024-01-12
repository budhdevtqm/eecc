import React, { useEffect, useState } from "react";
import Image from "next/image";

interface PropsType {
  images: string[];
}

const ImageSlider: React.FC<PropsType> = ({ images }) => {
  const [selected, setSelected] = useState<string | undefined>(undefined);

  useEffect(() => {
    if ((images as string[] | []).length > 0) {
      setSelected(images[0]);
    }
  }, [images]);

  return (
    <>
      {images.length > 0 && (
        <div className="w-full flex  gap-2 bg-white">
          <div className="w-[30%] flex items-center justify-center bg-white py-2">
            <div className="h-[300px] flex items-center justify-center p-4 border">
              <Image
                src={`/upload/products/${selected}` as string}
                alt="alsdjflks"
                width={250}
                height={250}
                className="min-w-[100%]"
              />
            </div>
          </div>
          <div className="flex flex-wrap gap-1 w-[70%] py-2">
            {images.map((img, index) => (
              <div
                key={index}
                className={`h-[100px] w-[100px] bg-white p-2 flex items-center justify-center ${
                  selected === img ? "border" : "hover:border hover:shadow"
                }`}
                onClick={() => setSelected(img)}
              >
                <Image
                  src={`/upload/products/${img}`}
                  alt="product-image"
                  width={50}
                  height={50}
                />
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default ImageSlider;
