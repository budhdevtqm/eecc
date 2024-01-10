"use client";
import React, { useState } from "react";
import { FaCartPlus } from "react-icons/fa";
import { adjustProductName } from "../common-utils/common-fns";
import { useRouter } from "next/navigation";
import { useAppDispatch } from "../redux/hooks";
import { addMultiCart } from "../redux/homeSlice";
import toast, { Toaster } from "react-hot-toast";
import Loader from "./Loader";

interface PropsType {
  name: string;
  price: number;
  id: number;
  image: string;
}

const FeaturedProduct: React.FC<PropsType> = ({ name, price, id, image }) => {
  const [value, setValue] = useState<string>('1');
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const dispatch = useAppDispatch();

  const handleIncrement = () => {
    setValue(`${Number(value) + 1}`);
  }
  const handleDecrement = () => {
    if (value == '1') return;

    setValue(`${Number(value) - 1}`);
  };

  const addToCart = async (e: React.FormEvent<HTMLFormElement>, id: number) => {
    e.preventDefault();
    setLoading(true);
    const response: any = await dispatch(addMultiCart({ id, quantity: value }));
    if (response.type.includes("fulfilled")) {
      toast.success(response.payload.data.message, { position: "top-right" });
      setValue('1');
      setLoading(false);
      return;
    }
    setLoading(false);

  };

  return (
    <>
      <div className="rounded shadow bg-white w-[200px] border flex flex-col gap-1 h-[320px]">
        <div
          className="px-2 pt-2 pb-1 cursor-pointer flex flex-col gap-1 h-[220px]"
          onClick={() => router.push(`/item/${id}`)}
        >
          <img
            src={`/upload/products/${image}` ?? ""}
            alt="product-image"
            className="h-[150px]"
          />
          <p className="font-semibold text-[14px] text-center">
            {adjustProductName(name)}
          </p>
          <p className="font-semibold text-[14px] text-center">{`₹ ${price}`}</p>
        </div>
        <div className="px-2 pt-1 pb-2">
          <form onSubmit={(e) => addToCart(e, id)}>
            <div className="flex items-center justify-center gap-1">
              <button
                type="button"
                onClick={handleDecrement}
                disabled={value == '1' ? true : false}
                className={`border border-primary shadow px-2 py-1 text-primary rounded hover:bg-primary hover:text-white mr-2 ${value == '1' ? "cursor-not-allowed" : "cursor-pointer"
                  }`}
              >
                -
              </button>
              <input
                type="text"
                value={value}
                className="w-[37px] h-[30px] border border-gray-300 rounded outline-primary px-2 py-[2px]"
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
              {loading ? <Loader loading={loading} /> : <button
                className="flex gap-2  items-center justify-center text-[16px] px-2 py-1 border border-primary rounded text-primary hover:text-white hover:bg-primary"
                type="submit"
              >
                <span className="text-[20px]">
                  <FaCartPlus />
                </span>
                ADD TO CART
              </button>}
            </div>
          </form>
        </div>
      </div>
      <Toaster />
    </>
  );
};

export default FeaturedProduct;
