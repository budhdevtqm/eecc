"use client";
import React, { useState, useEffect } from "react";
import Wrapper from "@/app/components/Wrapper";
import Image from "next/image";
import { MdShoppingCart } from "react-icons/md";
import { useParams, useRouter } from "next/navigation";
import useFetch from "@/app/custom-hooks/useFetch";
import { addToCart, getSingleProduct, Product } from "@/app/redux/homeSlice";
import { useAppDispatch, useAppSelector } from "@/app/redux/hooks";
import ImageSlider from "./ImageSlider";
import { getUserRole } from "@/app/common-utils/common-fns";
import toast, { Toaster } from "react-hot-toast";

const ViewProduct = () => {
  const [img, setImg] = useState("");
  const { fetchById } = useFetch();
  const dispatch = useAppDispatch();
  const router = useRouter();
  const id = useParams().id as string;
  const userRole = getUserRole();

  const product = useAppSelector(
    (state) => state.home.product
  ) as Product | null;

  const addToCartHandler = async (id: number) => {
    const response: any = await dispatch(addToCart(`${id}`));
    if (response.type.includes("fulfilled")) {
      toast.success(response.payload.data.message, { position: "top-right" });
      return;
    }
  };

  useEffect(() => {
    fetchById(getSingleProduct, id);
  }, []);

  useEffect(() => {
    if (product !== null) {
      setImg(`/upload/products/${product?.images[0]}`);
    }
  }, [product]);

  return (
    <Wrapper>
      <div className="flex items-center justify-center">
        <div className="  bg-white p-4 rounded w-[80%]">
          <div className="flex w-full mt-4 w-[80%] mx-auto border-t-2 border-primary py-2  ">
            <div className="ml-4">
              <Image
                src={img ?? ""}
                width={150}
                height={150}
                alt={img ?? ""}
                className="h-[150px] w-[150px] p-2 border rounded-xl"
              />
            </div>
            <div className="flex flex-col px-8 py-2 shadow w-[800px] border ml-4 rounded-xl">
              <div className="flex flex-col gap-2">
                <h2 className="font-bold text-gray-600">{product?.name}</h2>
                <div className="flex gap-2 items-center">
                  <span className="text-gray-500">₹</span>
                  <h1 className="font-semibold text-[20px] m-0 text-primary">
                    {product?.price}
                  </h1>
                </div>
                <p className="text-center font-thin">{product?.description}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col mx-auto w-[80%] bg-white">
        <ImageSlider setImg={setImg} images={product?.images ?? []} />
        <div className="pb-6 flex items-center justify-end px-8">
          <div>
            <div className="flex items-center justify-center mt-4">
              <button
                type="button"
                onClick={() => addToCartHandler(product?.id as number)}
                className="text-center flex items-center justify-center bg-primary p-1 rounded text-white gap-2 px-2"
              >
                <span className="text-[20px]">
                  <MdShoppingCart />
                </span>
                <span className="font-semibold text-[14px]">ADD TO CART</span>
              </button>
            </div>
          </div>
        </div>
      </div>
      <Toaster />
    </Wrapper>
  );
};

export default ViewProduct;
