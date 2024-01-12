"use client";
import React, { useEffect } from "react";
import "react-responsive-modal/styles.css";
import Modal from "react-responsive-modal";
import { useAppSelector } from "../redux/hooks";
import useFetch from "../custom-hooks/useFetch";
import { OrderDetails, getSingleOrder } from "../redux/orderSlice";
import Image from "next/image";
import { isSingleItem } from "../common-utils/common-fns";

interface OrderModalProps {
  open: boolean;
  onClose: () => void;
}

const OrderModal: React.FC<OrderModalProps> = ({ open, onClose }) => {
  const { fetchById } = useFetch();

  const orderId = useAppSelector((state) => state.order.orderId) as
    | number
    | null;

  const order = useAppSelector(
    (state) => state.order.order
  ) as OrderDetails | null;

  useEffect(() => {
    if (orderId) {
      fetchById(getSingleOrder, orderId as number);
    }
  }, [orderId]);

  return (
    <>
      {orderId && order && (
        <Modal open={open} onClose={onClose} center>
          <div className="min-w-[500px] min-h-[500px]">
            <div className="border-b border-primary">
              <div className="my-2 p-2">
                <h1 className="font-bold text-[20px]">Delivery address</h1>
              </div>
              {order && (
                <div className="flex flex-col text-[15px] my-2 p-2 ">
                  <p>{order?.recipient_name},</p>
                  <p>{order?.recipient_apartment},</p>
                  <p>{order?.recipient_area},</p>
                  <p>{`${order?.recipient_city}, ${order?.recipient_state} ${order?.recipient_pin}`}</p>
                </div>
              )}
            </div>
            <div className="border-b border-primary">
              <div className="p-2">
                <h1 className="font-bold text-[20px]">Product Information</h1>
              </div>
              <div className="flex p-2 gap-4 items-center">
                <div>
                  <Image
                    height={100}
                    width={100}
                    src={`/upload/products/${order.product_image}`}
                    alt={"/upload/products/1703565954134-i15p3.jpg"}
                    className="p-2 border rounded shadow"
                  />
                </div>
                <div className="p-2">
                  <div className="p-2">
                    <p className="text-wrap text-xs pl-2 my-1">
                      {order.product_name}
                    </p>
                    <p className="text-wrap text-xs font-semibold pl-2 my-1">{`₹ ${order.amount}`}</p>
                    <p className="text-wrap text-xs font-semibold pl-2 my-1">{`${
                      order.quantity
                    } ${isSingleItem(order.quantity)}`}</p>
                  </div>
                </div>
              </div>
            </div>
            <div>
              <div className="p-2">
                <h1 className="font-bold text-[20px]">Order Information</h1>
              </div>
              <div className="flex flex-col p-2  items-center">
                <div className="flex items-center gap-8 my-2 w-full">
                  <span className="text-xs font-normal w-[20%]">Order ID</span>
                  <span className="text-xs font-semibold">{order.id}</span>
                </div>
                <div className="flex items-center gap-8 my-2 w-full">
                  <span className="text-xs font-normal w-[20%]">
                    Payment Method
                  </span>
                  <span className="text-xs font-semibold">{order.method}</span>
                </div>
                <div className="flex items-center gap-8 my-2 w-full">
                  <span className="text-xs font-normal w-[20%]">
                    Order Date
                  </span>
                  <span className="text-xs font-semibold">
                    {order.order_created_at}
                  </span>
                </div>
                <div className="flex items-center gap-8 my-2 w-full">
                  <span className="text-xs font-normal w-[20%]">
                    Receiver Mob
                  </span>
                  <span className="text-xs font-semibold">
                    {order.recipient_mobile}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </Modal>
      )}
    </>
  );
};

export default OrderModal;
