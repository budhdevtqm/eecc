"use client";
import React, { useDebugValue, useEffect, useState } from "react";
import Wrapper from "../components/Wrapper";
import PageHeader from "../components/PageHeader";
import Link from "next/link";
import Image from "next/image";
import { MdDelete, MdEdit, MdInfo } from "react-icons/md";
import useFetch from "../custom-hooks/useFetch";
import {
  cancelOrder,
  getMyOrders,
  Order,
  setOrderId,
} from "../redux/orderSlice";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import OrderModal from "./OrderModal";
import useDelete from "../custom-hooks/useDelete";

const Orders: React.FC = () => {
  const [open, setOpen] = useState(false);

  const dispatch = useAppDispatch();
  const handleDelete = useDelete();

  const orders = useAppSelector((state) => state.order.orders) as Order[] | [];
  const id = useAppSelector((state) => state.order.orderId) as number | null;

  const handleOrderCancel = async (id: number) => {
    console.log("cancel id", id);
    await handleDelete(cancelOrder, id as number);
  };

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
    <Wrapper>
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
                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider"></th>
              </tr>
            </thead>
            <tbody>
              {orders.map((o: any, index) => (
                <tr key={index}>
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
                  <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                    <div className="flex items-center gap-4">
                      <button
                        type="button"
                        onClick={() => handleOpen(o.id)}
                        className="px-2 py-1 border border-primary rounded-md text-primary hover:text-white hover:bg-primary"
                      >
                        Info
                      </button>
                      {o.is_cancelled ? (
                        <p className="text-gray-500 font-semibold">Cancelled
                        </p>
                      ) : (
                        <button
                          type="button"
                          onClick={() => handleOrderCancel(o.id)}
                          className="px-2 py-1 border border-errorColor rounded-md text-errorColor hover:text-white hover:bg-errorColor"
                        >
                          Cancel
                        </button>
                      )}
                    </div>
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
    </Wrapper>
  );
};

export default Orders;
