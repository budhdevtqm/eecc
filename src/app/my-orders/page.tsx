"use client";
import React, { useEffect, useState } from "react";
import Wrapper from "../components/Wrapper";
import PageHeader from "../components/PageHeader";
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
import Loader from "../components/Loader";
import Loading from "../components/Loading";
import Empty from "../components/admin/Empty";
import Pagination from "../components/Pagination";
import OrderRow from "../components/OrderRow";

const Orders: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [orders, setOrders] = useState<Order[] | []>([]);
  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);

  const dispatch = useAppDispatch();

  const loading = useAppSelector((state) => state.order.loading) as boolean;
  const myOrders = useAppSelector((state) => state.order.orders) as
    | Order[]
    | [];

 

  const handleOpen = (id: number) => {
    dispatch(setOrderId(id));
    setOpen(true);
  };

  const onPageChange = (pageNo: number) => {
    const copy = [...myOrders];
    const lastIndex = pageNo * 10;
    const startIndex = lastIndex - 10;
    setCurrentPage(pageNo);
    setOrders(copy.slice(startIndex, lastIndex));
  };

  useEffect(() => {
    if (myOrders.length > 0) {
      setTotalPages(Math.ceil(myOrders.length / 10));
      onPageChange(1);
    }
  }, [myOrders]);

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
      {loading && myOrders.length === 0 && <Loading />}
      {!loading && myOrders.length === 0 && <Empty label="No Orders Yet!" />}
      {!open && myOrders.length > 0 && (
        <>
          <div className="my-8 p-2 border-t-2 border-primary min-h-[63vh]">
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
                {orders.map((o: any) => (
                  <OrderRow id={o.id} name={o.name} amount={o.amount} is_cancelled={o.is_cancelled} handleOpen={handleOpen} image={o.image} quantity={o.quantity} />
                ))}
              </tbody>
            </table>
          </div>
          <Pagination
            totalPages={totalPages}
            currentPage={currentPage}
            onPageChange={onPageChange}
          />
        </>
      )}
    </Wrapper>
  );
};

export default Orders;
