"use client";
import React, { useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import {
  PaymentElement,
  Elements,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import Button from "./Button";
import usePost from "../custom-hooks/usePost";
import { placeOrder } from "../redux/homeSlice";
import { useParams } from "next/navigation";
import { useAppSelector } from "../redux/hooks";
import { Toaster } from "react-hot-toast";

interface PaymentProps {
  amount: number;
}

const stripePromise = loadStripe(process.env.STRIPE_PUBLIC!);

const CheckOutForm: React.FC<PaymentProps> = ({ amount }) => {
  const stripe = useStripe();
  const elements = useElements();
  const { create } = usePost();
  const { id: productId } = useParams();

  const addressId = useAppSelector((state) => state.home.addressId) as number;

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (elements === null) {
      return;
    }

    const values = { productId, amount, quantity: 1, addressId };

    await create(placeOrder, values, "/orders");
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
            <Button variant="primary" type="submit">
              Pay
            </Button>
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
        // appearance: {
        //   type: "accordion",
        //   defaultCollapsed: false,
        //   radios: true,
        //   spacedAccordionItems: false,
        // },
      }}
    >
      <CheckOutForm amount={amount} />
    </Elements>
  );
};

export default Payment;
