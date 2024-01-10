"use client";
import React, { useEffect, useState } from "react";
import Wrapper from "@/app/components/Wrapper";
import PageHeader from "../components/PageHeader";
import Button from "../components/Button";
import useFetch from "../custom-hooks/useFetch";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import CartCard from "./CartCard";
import useDelete from "../custom-hooks/useDelete";
import { useRouter } from "next/navigation";
import {
  CartItem,
  deleteCartItem,
  getAllCartItems,
  setCartProducts,
} from "../redux/cartSlice";
import Empty from "../components/admin/Empty";
import Loading from "../components/Loading";

const CartPage: React.FC = () => {
  const [myCart, setMyCart] = useState<CartItem[] | []>([]);
  const [total, setTotal] = useState<number>(0);


  const { handleFetch } = useFetch();
  const handleDelete = useDelete();
  const dispatch = useAppDispatch();
  const router = useRouter();

  const loading = useAppSelector((state) => state.cart.loading) as boolean;
  const cartItems = useAppSelector((state) => state.cart.cartItems) as
    | CartItem[]
    | [];

  useEffect(() => {
    handleFetch(getAllCartItems);
  }, []);

  const deleteHandler = async (id: number) => {
    const deleted: any = await handleDelete(deleteCartItem, id);
    if (deleted.type.includes("fulfilled")) {
      const fetched = await handleFetch(getAllCartItems);
      setMyCart(fetched.payload.data.data);
    }
  };

  const goToPlaceOrder = () => {
    dispatch(setCartProducts(myCart));
    router.push("/cart/place-order");
  };

  useEffect(() => {
    if (cartItems.length > 0) {
      setMyCart(cartItems);
      const allItemsTotal = cartItems.map(
        (item: CartItem) => item.qty! * item.price
      );
      setTotal(allItemsTotal.reduce((a, b) => a + b, 0));
    }
  }, [cartItems]);

  useEffect(() => {
    const allItemsTotal = cartItems.map(
      (item: CartItem) => item.qty! * item.price
    );
    setTotal(allItemsTotal.reduce((a, b) => a + b, 0));
  }, [myCart]);

  return (
    <Wrapper>
      <PageHeader title="My Cart" />
      {loading && cartItems.length === 0 && <Loading />}
      {!loading && cartItems.length === 0 && <Empty label="No Cart Items Yet!" />}
      {!loading && cartItems.length > 0 && <>
        <div>
          {
            myCart.map((i: CartItem) => (
              <CartCard
                key={i.id}
                item={i}
                remover={deleteHandler}
                myCart={myCart}
                setMyCart={setMyCart}
                setTotal={setTotal}
              />
            ))
          }
        </div>
        {total !== 0 && (
          <div className="w-[90%] mx-auto flex items-center justify-end my-4">
            <div className="w-[60%] flex items-center justify-between pr-36">
              <Button variant="primary" onClick={goToPlaceOrder}>
                Order Now
              </Button>
              <span className="font-semibold text-[18px]">{`₹ ${total}`}</span>
            </div>
          </div>
        )}
      </>}

    </Wrapper>
  );
};

export default CartPage;
