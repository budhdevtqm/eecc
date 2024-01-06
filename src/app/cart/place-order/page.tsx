"use client";
import React, { useEffect, useState } from "react";
import Wrapper from "@/app/components/Wrapper";
import { useAppSelector } from "@/app/redux/hooks";
import { CartItem } from "@/app/redux/cartSlice";
import { useRouter } from "next/navigation";
import useFetch from "@/app/custom-hooks/useFetch";
import Address from "@/app/components/Address";
import Payment from "@/app/cart/place-order/CheckoutForm";
import { AddressTypes, getMyAddresses } from "@/app/redux/homeSlice";

type AddressId = number | null;

const PlaceOrder: React.FC = () => {
  const [amount, setAmount] = useState(0);
  const router = useRouter();
  const { handleFetch } = useFetch();

  const items = useAppSelector((state) => state.cart.cartProducts) as
    | CartItem[]
    | [];

  const myAddresses = useAppSelector((state) => state.home.addresses) as
    | AddressTypes[]
    | [];

  useEffect(() => {
    if (items.length === 0) {
      router.push("/cart");
      return;
    }
    const prices = items.map((item) => item.price * (item?.qty as number));
    setAmount(prices.reduce((a, b) => a + b, 0));
  }, []);

  useEffect(() => {
    handleFetch(getMyAddresses);
  }, []);
  return (
    <Wrapper>
      <div className="flex gap-4 flex-col">
        <div className="rounded  w-full flex flex-col gap-4 my-4">
          <Address />
        </div>
        <div>
          {amount > 0 && myAddresses.length > 0 && <Payment amount={amount} />}
        </div>
      </div>
    </Wrapper>
  );
};

export default PlaceOrder;
