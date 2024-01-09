"use client";
import React, { use, useEffect, useState } from "react";
import Image from "next/image";
import useFetch from "@/app/custom-hooks/useFetch";
import {
  Order,
  cancelOrder,
  getMyOrders,
  setOrderId,
} from "@/app/redux/orderSlice";
import { useAppDispatch, useAppSelector } from "@/app/redux/hooks";
import PageHeader from "@/app/components/PageHeader";
import OrderModal from "./OrderModel";
import Empty from "@/app/components/admin/Empty";
import Pagination from "@/app/components/Pagination";
import Loading from "@/app/components/Loading";
import useDelete from "@/app/custom-hooks/useDelete";
import Loader from "@/app/components/Loader";

const Orders: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [orders, setOrders] = useState<Order[] | []>([]);
  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [loader, setLoader] = useState(false);

  const dispatch = useAppDispatch();
  const { handleFetch } = useFetch();
  const handleDelete = useDelete();

  const loading = useAppSelector((state) => state.order.loading) as boolean;
  const allOrder = useAppSelector((state) => state.order.orders) as
    | Order[]
    | [];

  const handleOpen = (id: number) => {
    dispatch(setOrderId(id));
    setOpen(true);
  };

  const onPageChange = (pageNo: number) => {
    const copy = [...allOrder];
    const lastIndex = pageNo * 10;
    const startIndex = lastIndex - 10;
    setOrders(copy.slice(startIndex, lastIndex));
    setCurrentPage(pageNo);
  };

  const handleOrderCancel = async (id: number) => {
    setLoader(true);
    await handleDelete(cancelOrder, id as number);
    await handleFetch(getMyOrders);
    setLoader(false);
  };

  const handleClose = async () => {
    dispatch(setOrderId(null));
    await handleFetch(getMyOrders);
    setOpen(false);
  };

  useEffect(() => {
    if (allOrder.length > 0) {
      onPageChange(1);
      setTotalPages(Math.ceil(allOrder.length / 10));
    }
  }, [allOrder]);

  useEffect(() => {
    handleFetch(getMyOrders);
    dispatch(setOrderId(null));
  }, []);

  const orderConditon =
    (open && !loading && orders.length) || (!open && !loading && orders.length);

  return (
    <>
      <PageHeader title="Orders" />
      {open && <OrderModal open={open} onClose={handleClose} />}
      {loading && orders.length === 0 && <Loading />}
      {!loading && orders.length === 0 && <Empty label="No Orders Yet!" />}
      {orderConditon && (
        <div>
          <div className=" p-2 border-t-2 border-primary min-h-[630px]">
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
                          <p className="text-gray-500 font-semibold">
                            Cancelled
                          </p>
                        ) : loader ? (
                          <Loader loading={loader} />
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
          <Pagination
            totalPages={totalPages}
            currentPage={currentPage}
            onPageChange={onPageChange}
          />
        </div>
      )}
    </>
  );
};

export default Orders;
