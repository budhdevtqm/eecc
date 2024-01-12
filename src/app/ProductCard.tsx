"use client";
import React, { useState } from "react";
import Image from "next/image";
import { adjustProductName } from "./common-utils/common-fns";
import { FaCartPlus } from "react-icons/fa";
import { Product, addToCart } from "./redux/homeSlice";
import usePost from "./custom-hooks/usePost";
import { Toaster } from "react-hot-toast";
import { useRouter } from "next/navigation";
import Loader from "./components/Loader";

interface ProductCartProps {
  product: Product;
}

const ProductCard: React.FC<ProductCartProps> = ({ product }) => {
  const [loading, setLoading] = useState(false);
  const { create } = usePost();
  const router = useRouter();


  const addToCartHandler = async (product: Product) => {
    setLoading(true);
    await create(addToCart, product.id);
    setLoading(false);
  };

  return (
    <div className="flex bg-white flex-col  rounded shadow w-[200px] border-2 h-[270px]">
      <div
        className="h-[220px] cursor-pointer p-2"
        onClick={() => router.push(`/item/${product.id}`)}
      >
        <div className="border border-gray-200 flex items-center justify-center h-[150px]">
          <Image
            src={`/upload/products/${product.images[0]}`}
            width={100}
            height={100}
            alt="image"
          />
        </div>
        <div className="flex items-center justify-center flex-col mt-2">
          <p
            className="text-center text-[11px] font-semibold"
            title={product.name}
          >
            {adjustProductName(product.name)}
          </p>
          <div className="flex items-center gap-1">
            <span className="text-primary text-[18px] font-bold">₹</span>
            <p className="font-semibold text-gray-500">{product.price}</p>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-center p-2">
        {loading ? (
          <Loader loading={loading} />
        ) : (
          <button
            type="button"
            onClick={() => addToCartHandler(product)}
            className="flex items-center justify-center gap-2 px-2 py-1 border border-primary rounded text-primary cursor-pointer hover:text-white hover:bg-primary"
          >
            <FaCartPlus className="text-[16px]" />
            <h1 className="font-medium text-[14px] mt-[1px]">ADD TO CART</h1>
          </button>
        )}
      </div>

      <Toaster />
    </div>
  );
};

export default ProductCard;
