"use client";
import React from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

interface PropsType {
  id: number;
  image: string;
  name: string;
  quantity: number;
  price: number;
}

const ItemRow: React.FC<PropsType> = (props) => {
  const router = useRouter();
  const { id, image, name, quantity, price } = props;

  return (
    <tr
      key={id}
      onClick={() => router.push(`/item/${id}`)}
      className="cursor-pointer max-h-fit min-h-[100px]"
    >
      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
        <p className="text-gray-900 whitespace-no-wrap text-center">
          <Image
            src={image ? `/upload/products/${image}` : `/images/no-image.png`}
            alt={name + "image"}
            width={50}
            height={50}
          />
        </p>
      </td>
      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm max-w-[500px] text-wrap">
        {name}
      </td>

      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
        <p className="text-gray-900 whitespace-no-wrap">{price}</p>
      </td>
      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
        <p className="text-gray-900 whitespace-no-wrap">{quantity}</p>
        {/* {status ? (
          <span className="relative inline-block px-3 py-1 font-semibold text-green-900 leading-tight">
            <span
              aria-hidden
              className="absolute inset-0 bg-green-200 opacity-50 rounded-full"
            ></span>
            <span className="relative">Yes</span>
          </span>
        ) : (
          <span className="relative inline-block px-3 py-1 font-semibold text-orange-900 leading-tight">
            <span
              aria-hidden
              className="absolute inset-0 bg-orange-200 opacity-50 rounded-full"
            ></span>
            <span className="relative">No</span>
          </span>
        )} */}
      </td>
    </tr>
  );
};
export default ItemRow;
