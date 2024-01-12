"use client";
import React, { useEffect, useState } from "react";
import "react-responsive-modal/styles.css";
import { Modal } from "react-responsive-modal";
import FormError from "./FormError";
import Button from "./Button";
import {
  AddressErrors,
  AddressTypes,
  AddressValues,
  addAddress,
  getAddress,
  getMyAddresses,
  setAddressId,
  setAddresses,
  updateAddress,
} from "../redux/homeSlice";
import { validateAddress } from "../common-utils/validations";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import useFetch from "../custom-hooks/useFetch";
import toast, { Toaster } from "react-hot-toast";

interface PropsType {
  open: boolean;
  onClose: () => void;
  mode: string;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const values = {
  country: "",
  name: "",
  mobile: "",
  apartment: "",
  area: "",
  pin: "",
  landmark: "",
  city: "",
  state: "",
};

const countries = ["India", "USA", "Canada", "Australia"];

const AddressForm: React.FC<PropsType> = ({ open, onClose, mode, setOpen }) => {
  const [formValues, setFormValues] = useState<AddressValues>(values);
  const [errors, setErrors] = useState<Partial<AddressErrors>>(values);

  const { fetchById, handleFetch } = useFetch();
  const dispatch = useAppDispatch();

  const { addressId, address } = useAppSelector((state) => state.home) as {
    addressId: number;
    address: AddressTypes;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };
  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrors({});
    const validationResults = validateAddress(formValues);
    if (Object.keys(validationResults).length > 0) {
      setErrors(validationResults);
      return;
    }

    if (mode === "create") {
      const response: any = await dispatch(addAddress(formValues));
      if (response.type.includes("fulfilled")) {
        toast.success(response.payload.data.message, { position: "top-right" });
        const fetched = await handleFetch(getMyAddresses);
        if (fetched.type.includes("fulfilled")) {
          dispatch(setAddresses(fetched.payload.data.data));
        }
        setTimeout(() => setOpen(false), 500);
        return;
      }
      return;
    }

    if (mode === "update") {
      const response: any = await dispatch(
        updateAddress({ ...formValues, id: addressId })
      );
      if (response.type.includes("fulfilled")) {
        toast.success(response.payload.data.message, { position: "top-right" });
        setTimeout(() => setOpen(false), 500);
        return;
      }
    }
  };

  useEffect(() => {
    if (address) {
      const {
        country,
        name,
        mobile,
        apartment,
        area,
        pin,
        landmark,
        city,
        state,
      } = address;

      setFormValues({
        country,
        name,
        mobile: mobile.toString(),
        apartment,
        area,
        pin: pin.toString(),
        landmark,
        city,
        state,
      });
    }
  }, [address]);

  useEffect(() => {
    if (addressId && mode === "update") {
      fetchById(getAddress, addressId as number);
    }
    if (mode === "create") {
      dispatch(setAddressId(null));
      setFormValues(values);
    }
  }, [addressId]);

  return (
    <div>
      <Modal onClose={onClose} open={open} center>
        <div className="flex items-center justify-center">
          <h1 className="text-center font-semibold text-[18px] border-b px-2 py-1 text-primary border-b-primary">
            {mode === "create" ? "New Address" : "Update Address"}
          </h1>
        </div>
        <form className="min-w-[700px] px-8 py-4" onClick={handleSubmit}>
          <div className="flex flex-col gap-1 my-3">
            <label className="ml-1 text-gray-500">Country</label>
            <select
              name="country"
              className="border-2 py-1 px-2 outline-primary text-black rounded-lg"
              value={formValues.country}
              onChange={handleSelectChange}
            >
              <option value="">None</option>
              {countries.map((country, index) => (
                <option key={index} value={country}>
                  {country}
                </option>
              ))}
            </select>
            <FormError message={errors.country || ""} />
          </div>

          <div className="flex flex-col gap-1 my-3">
            <label className="ml-1 text-gray-500 ">Name</label>
            <input
              type="text"
              name="name"
              placeholder="Receiver name!"
              className="border-2 py-1 px-2 outline-primary text-black rounded-lg"
              onChange={handleChange}
              value={formValues.name}
            />
            <FormError message={errors.name ?? ""} />
          </div>

          <div className="flex flex-col gap-1 my-3">
            <label className="ml-1 text-gray-500 ">Mobile</label>
            <input
              type="number"
              name="mobile"
              placeholder="Mobile!"
              className="border-2 py-1 px-2 outline-primary text-black rounded-lg"
              onChange={handleChange}
              value={formValues.mobile}
            />
            <FormError message={errors.mobile ?? ""} />
          </div>

          <div className="flex flex-col gap-1 my-3">
            <label className="ml-1 text-gray-500 ">Apartment</label>
            <input
              type="text"
              name="apartment"
              placeholder="Apartment"
              className="border-2 py-1 px-2 outline-primary text-black rounded-lg"
              onChange={handleChange}
              value={formValues.apartment}
            />
            <FormError message={errors.apartment ?? ""} />
          </div>

          <div className="flex flex-col gap-1 my-3">
            <label className="ml-1 text-gray-500 ">Area</label>
            <input
              type="text"
              name="area"
              placeholder="area"
              className="border-2 py-1 px-2 outline-primary text-black rounded-lg"
              onChange={handleChange}
              value={formValues.area}
            />
          </div>

          <div className="flex flex-col gap-1 my-3">
            <label className="ml-1 text-gray-500 ">PIN</label>
            <input
              type="number"
              name="pin"
              placeholder="PIN"
              className="border-2 py-1 px-2 outline-primary text-black rounded-lg"
              onChange={handleChange}
              value={formValues.pin}
            />
            <FormError message={errors.pin ?? ""} />
          </div>

          <div className="flex flex-col gap-1 my-3">
            <label className="ml-1 text-gray-500 ">Landmark</label>
            <input
              type="text"
              name="landmark"
              placeholder="landmark"
              className="border-2 py-1 px-2 outline-primary text-black rounded-lg"
              onChange={handleChange}
              value={formValues.landmark}
            />
          </div>

          <div className="flex flex-col gap-1 my-3">
            <label className="ml-1 text-gray-500 ">City</label>
            <input
              type="text"
              name="city"
              placeholder="city"
              className="border-2 py-1 px-2 outline-primary text-black rounded-lg"
              onChange={handleChange}
              value={formValues.city}
            />
            <FormError message={errors.city ?? ""} />
          </div>

          <div className="flex flex-col gap-1 my-3">
            <label className="ml-1 text-gray-500 ">State</label>
            <input
              type="text"
              name="state"
              placeholder="state"
              className="border-2 py-1 px-2 outline-primary text-black rounded-lg"
              onChange={handleChange}
              value={formValues.state}
            />
            <FormError message={errors.state ?? ""} />
          </div>
          <div className="my-4 flex items-center justify-center">
            <Button variant="primary" type="submit">
              Submit
            </Button>
          </div>
        </form>
      </Modal>
      <Toaster />
    </div>
  );
};

export default AddressForm;
