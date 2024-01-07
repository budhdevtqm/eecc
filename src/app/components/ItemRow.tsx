"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { MdDelete, MdEdit, MdInfo } from "react-icons/md";
// import useDelete from "../custom-hooks/useDelete";
// import useFetch from "../custom-hooks/useFetch";
// import { deleteProduct, getAllProducts } from "../redux/productSlice";
// import DeleteLoader from "./DeleteLoader";

interface PropsType {
  id: number;
  images: string[] | [] | string;
  name: string;
  status: number;
  price: number;
}

const ItemRow: React.FC<PropsType> = (props) => {
  //   const { handleFetch } = useFetch();
  //   const handleDelete = useDelete();
  const [loading, setLoading] = useState(false);
  const { id, images, name, status, price } = props;

  const deleteHandler = async (id: number) => {
    setLoading(true);
    // await handleDelete(deleteProduct, id);
    // await handleFetch(getAllProducts);
    setLoading(false);
  };

  return (
    <tr key={id}>
      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
        <p className="text-gray-900 whitespace-no-wrap text-center">
          {images && (
            <Image
              src={images as string}
              // src={
              //   images.length > 0
              //     ? `/upload/products/${images[0]}`
              //     : `/images/no-image.png`
              // }
              alt={name + "image"}
              width={50}
              height={50}
            />
          )}
        </p>
      </td>
      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
        {name}
      </td>

      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
        <p className="text-gray-900 whitespace-no-wrap">{price}</p>
      </td>
      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
        {status ? (
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
        )}
      </td>

      {/* <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm text-right">
        <span className="flex text-[20px] gap-3 cursor-pointer items-center justify-center">
          <Link href={`/`}>
            <MdInfo title="Info" />
          </Link>

          <Link href={`/`}>
            <MdEdit title="Edit" />
          </Link>

          {loading ? (
            <DeleteLoader loading={loading} />
          ) : (
            <MdDelete title="Delete" onClick={() => deleteHandler(id)} />
          )}
        </span>
      </td> */}
    </tr>
  );
};
export default ItemRow;
