"use client";
import React, { useEffect, useState } from "react";
import AddressCard from "./AddressCard";
import Button from "./Button";
import useFetch from "../custom-hooks/useFetch";
import {
  getMyAddresses,
  AddressTypes,
  setAddressId,
  deleteAddress,
  setAddresses,
  setFormMode,
  setUpdateId,
} from "../redux/homeSlice";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import useDelete from "../custom-hooks/useDelete";
import { Toaster } from "react-hot-toast";
import { useRouter } from "next/navigation";

type Addresses = AddressTypes[] | [];

const Address: React.FC = () => {
  const [allAddress, setAllAddress] = useState<Addresses>([]);
  const [address, setAddress] = useState<AddressTypes | null>(null);
  const [change, setChange] = useState<boolean>(false);

  const dispatch = useAppDispatch();
  const deleteHandler = useDelete();
  const { handleFetch } = useFetch();
  const router = useRouter();

  const addresses = useAppSelector(
    (state) => state.home.addresses
  ) as Addresses;

  const handleSelectAddress = (id: number) => {
    const targetIndex = allAddress.findIndex((address) => address.id === id);
    const modifiedTarget = { ...allAddress[targetIndex], checked: true };
    const modified = allAddress.map((address) => ({
      ...address,
      checked: false,
    }));
    modified.splice(targetIndex, 1, modifiedTarget);
    setAllAddress(modified);
    setAddress(modifiedTarget);
    dispatch(setAddressId(id));
  };

  const updateAddress = (id: number) => {
    dispatch(setFormMode("update"));
    dispatch(setUpdateId(id));
    router.push("/cart/place-order/address-form");
  };

  const handleDelete = async (id: number) => {
    await deleteHandler(deleteAddress, id);
    setAddress(null);

    const response = await handleFetch(getMyAddresses);
    if (response.type.includes("fulfilled")) {
      const fetched = response.payload.data.data;
      dispatch(setAddresses(fetched));

      if (fetched.length > 0) {
        const latest = { ...fetched[0], checked: true };
        const addressesCopy = [...fetched];
        addressesCopy.splice(0, 1, latest);
        setAddress(latest);
        dispatch(setAddressId(latest.id));
        setAllAddress(addressesCopy);
        return;
      }

      setAddress(null);
      setAllAddress([]);
      dispatch(setAddressId(null));
      dispatch(setAddresses([]));
    }
  };

  const addNewAddress = () => {
    dispatch(setFormMode("create"));
    router.push("/cart/place-order/address-form");
  };

  useEffect(() => {
    if (addresses.length > 0) {
      const latest = { ...addresses[0], checked: true };
      const addressesCopy = [...addresses];
      addressesCopy.splice(0, 1, latest);
      setAddress(latest);
      dispatch(setAddressId(latest.id));
      setAllAddress(addressesCopy);
      return;
    }
  }, [addresses]);

  useEffect(() => {
    handleFetch(getMyAddresses);
    dispatch(setFormMode("create"));
    dispatch(setUpdateId(null));
  }, []);

  return (
    <React.Fragment>
      <div className="flex flex-col p-8 bg-white shadow-lg">
        <div className="flex justify-between">
          <div className="my-2">
            <h1 className="font-bold text-[20px]">1. Delivery address</h1>
          </div>
          {address && (
            <div className="flex flex-col text-[15px] my-2">
              <p>{address?.name},</p>
              <p>{address?.apartment},</p>
              <p>{address?.area},</p>
              <p>{`${address?.city}, ${address?.state} ${address?.pin}`}</p>
            </div>
          )}
          <div className="my-2">
            <button
              onClick={() => setChange(!change)}
              className="text-blue-500 w-[100px]"
            >
              {change ? "Close" : "Change"}
            </button>
          </div>
        </div>
        {change && (
          <div>
            <div className="my-1">
              <h5 className="font-semibold px-4 py-1">Your Addresses</h5>
            </div>
            <div className="px-8">
              {allAddress.length > 0 &&
                allAddress.map((address) => (
                  <AddressCard
                    key={address.id}
                    address={address}
                    handleSelectAddress={handleSelectAddress}
                    updateAddress={updateAddress}
                    handleDelete={handleDelete}
                  />
                ))}
              <div className="my-3">
                <Button onClick={addNewAddress} variant="primary">
                  Add address
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
      <Toaster />
    </React.Fragment>
  );
};

export default Address;
