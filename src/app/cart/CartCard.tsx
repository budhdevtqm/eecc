"use client";
import React, { SetStateAction, useEffect, useState } from "react";
import { CartItem, getAllCartItems, updateQuantity } from "../redux/cartSlice";
import Image from "next/image";
import { ImCross } from "react-icons/im";
import { cartItemName } from "../common-utils/common-fns";
import usePatch from "../custom-hooks/usePatch";
import useFetch from "../custom-hooks/useFetch";

interface CardProps {
  item: CartItem;
  myCart: CartItem[] | [];
  setTotal: (toatl: number) => void;
  remover: (id: number) => void;
  setMyCart: React.Dispatch<SetStateAction<CartItem[] | []>>;
}

const CartCard: React.FC<CardProps> = ({
  item,
  myCart,
  remover,
  setMyCart,
  setTotal,
}) => {
  const update = usePatch();
  const [qty, setQty] = useState(0);
  const [myTotal, setMyTotal] = useState(0);
  const handleIncrement = () => setQty(qty + 1);
  const handleDecrement = () => qty > 1 && setQty(qty - 1);
  const { handleFetch } = useFetch();

  const handleQuantityChange = async (operationType: string, id: number) => {
    if (operationType === "decrement" && qty <= 1) return;

    if (operationType === "increment") {
      handleIncrement();
    }

    if (operationType === "decrement") {
      handleDecrement();
    }

    await update(updateQuantity, { operationType, id });
    const response = await handleFetch(getAllCartItems);

    if (response.type.includes("fulfilled")) {
      setMyCart(response.payload.data.data);
    }
  };

  useEffect(() => {
    if (item) {
      setQty(item.qty as number);
    }
  }, []);

  useEffect(() => {
    const filtered = myCart.filter((i: CartItem) => item.id === i.id)[0];
    const updatedItem = { ...filtered, qty };
    const itemIndex = myCart.findIndex((i: CartItem) => i.id === item.id);
    const allItems = [...myCart];
    allItems.splice(itemIndex, 1, updatedItem);

    const itemsTotal = allItems
      .map((item: CartItem) => item.qty! * item.price)
      .reduce((a, b) => a + b, 0);

    setTotal(itemsTotal);
    setMyCart(allItems);
    setMyTotal(qty * item.price);
  }, [qty]);


  return (
    <div className="flex items-center justify-center my-3">
      <div className="w-[90%] bg-white flex items-center justify-between p-2  rounded-md shadow-xl">
        <div className="bg-white flex items-center justify-between gap-1 w-[90%]">
          <div>
            <Image
              src={`/upload/products/${item.image}`}
              alt={`${item.image}`}
              width={100}
              height={200}
            />
          </div>
          <p className="w-[40%]">{cartItemName(item.name)}</p>
          <p>{`₹ ${item.price}`}</p>
          <div className="flex gap-4 items-center">
            <span
              onClick={() => handleQuantityChange("decrement", item.id)}
              className={`px-3 py-1 font-bold text-red-900 border-red-900 ${
                qty === 1 ? "cursor-not-allowed" : "cursor-pointer"
              } hover:text-white rounded-md  border hover:bg-red-900`}
            >
              -
            </span>
            <span className="font-bold text-[20px]">{qty}</span>
            <span
              onClick={() => handleQuantityChange("increment", item.id)}
              className="px-3 py-1 font-bold text-red-900 border-red-900 cursor-pointer hover:text-white rounded-md border hover:bg-red-900"
            >
              +
            </span>
          </div>

          <span>{`₹${myTotal}`}</span>
        </div>
        <div className="flex items-center gap-4 mr-2">
          <span className="px-3 py-1">
            <ImCross
              className="text-red-300 cursor-pointer hover:text-red-500"
              title="Remove"
              onClick={() => remover(item.id as number)}
            />
          </span>
        </div>
      </div>
    </div>
  );
};

export default CartCard;
