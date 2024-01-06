"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { MdDelete, MdEdit, MdInfo } from "react-icons/md";
import useFetch from "@/app/custom-hooks/useFetch";
import { Order, getMyOrders, setOrderId } from "@/app/redux/orderSlice";
import { useAppDispatch, useAppSelector } from "@/app/redux/hooks";
import PageHeader from "@/app/components/PageHeader";
import OrderModal from "./OrderModel";

interface StoreOrderState {
  orderId: number | null;
  orders: Order[] | [];
}

const Orders: React.FC = () => {
  const [open, setOpen] = useState(false);

  const dispatch = useAppDispatch();

  const orders = useAppSelector((state) => state.order.orders) as Order[] | [];
  const id = useAppSelector((state) => state.order.orderId) as number | null;

  const handleOpen = (id: number) => {
    dispatch(setOrderId(id));
    setOpen(true);
  };

  const handleClose = () => {
    dispatch(setOrderId(null));
    setOpen(false);
  };

  const { handleFetch } = useFetch();
  useEffect(() => {
    handleFetch(getMyOrders);
    dispatch(setOrderId(null));
  }, []);

  return (
    <>
      <PageHeader title="Orders" />
      {open && <OrderModal open={open} onClose={handleClose} />}
      {orders.length > 0 ? (
        <div className="my-8 p-2 border-t-2 border-primary">
          <table className="min-w-full leading-normal">
            <thead>
              <tr>
                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                  Image
                </th>
                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                  Name
                </th>
                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                  Price (₹)
                </th>
                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                  Qty
                </th>
              </tr>
            </thead>
            <tbody>
              {orders.map((o: any, index) => (
                <tr
                  key={index}
                  className="cursor-pointer"
                  onClick={() => handleOpen(o.id)}
                >
                  <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                    <p className="text-gray-900 whitespace-no-wrap">
                      <Image
                        src={`/upload/products/${o.image}`}
                        alt={o.name + "image"}
                        width={50}
                        height={50}
                      />
                    </p>
                  </td>
                  <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                    {o.name}
                  </td>

                  <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                    <p className="text-gray-900 whitespace-no-wrap">
                      {o.amount}
                    </p>
                  </td>

                  <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                    <p className="text-gray-900 whitespace-no-wrap">
                      {o.quantity}
                    </p>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="flex items-center justify-center min-h-[300px]">
          <h1 className="font-bold text-[20px]">No Orders Yet!</h1>
        </div>
      )}
    </>
  );
};

export default Orders;
