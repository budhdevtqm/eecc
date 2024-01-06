"use client";
import React, { useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import {
  PaymentElement,
  Elements,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import Button from "@/app/components/Button";
import usePost from "@/app/custom-hooks/usePost";
import { placeOrder, setCartItems } from "@/app/redux/cartSlice";
import { useAppDispatch, useAppSelector } from "@/app/redux/hooks";
import toast, { Toaster } from "react-hot-toast";
import { CartItem } from "@/app/redux/cartSlice";
import Loader from "@/app/components/Loader";

interface PaymentProps {
  amount: number;
}

const stripePromise = loadStripe(process.env.STRIPE_PUBLIC!);

const CheckOutForm: React.FC<PaymentProps> = ({ amount }) => {
  const [loading, setLoading] = useState(false);
  const stripe = useStripe();
  const elements = useElements();
  const { create } = usePost();
  const dispatch = useAppDispatch();

  const addressId = useAppSelector((state) => state.home.addressId) as number;
  const items = useAppSelector((state) => state.cart.cartProducts) as
    | CartItem[]
    | [];

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    if (elements === null) {
      setLoading(false);
      return;
    }

    if (!addressId) {
      toast.error("Please Add Address", { position: "top-right" });
      setLoading(false);
      return;
    }

    const response = await create(
      placeOrder,
      { addressId, items },
      "/my-orders"
    );
    if (response.type.includes("fulfilled")) {
      dispatch(setCartItems([]));
    }
    setLoading(false);
  };

  return (
    <div className="p-8 bg-white shadow-lg">
      <div className="flex justify-between">
        <div className="my-2">
          <h1 className="font-bold text-[20px]">2. Payment</h1>
        </div>
      </div>
      <div className="flex items-center justify-center">
        <form
          onSubmit={handleSubmit}
          className="h-fit w-fit  overflow-y-hidden border"
        >
          <PaymentElement className="overflow-hidden p-4 h-fit w-fit" />
          <div className="flex items-center justify-center my-1">
            {loading ? (
              <Loader loading={loading} />
            ) : (
              <Button variant="primary" type="submit">
                Pay
              </Button>
            )}
          </div>
        </form>
      </div>
      <Toaster />
    </div>
  );
};

const Payment: React.FC<PaymentProps> = ({ amount }) => {
  return (
    <Elements
      stripe={stripePromise}
      options={{
        amount,
        mode: "payment",
        currency: "inr",
      }}
    >
      <CheckOutForm amount={amount} />
    </Elements>
  );
};

export default Payment;
