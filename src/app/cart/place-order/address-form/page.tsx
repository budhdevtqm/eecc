"use client";
import React, { useEffect, useState } from "react";
import { Toaster } from "react-hot-toast";
import Wrapper from "@/app/components/Wrapper";
import useFetch from "@/app/custom-hooks/useFetch";
import { useAppSelector } from "@/app/redux/hooks";
import { validateAddress } from "@/app/common-utils/validations";
import FormError from "@/app/components/FormError";
import Button from "@/app/components/Button";
import usePost from "@/app/custom-hooks/usePost";
import usePatch from "@/app/custom-hooks/usePatch";
import {
  AddressErrors,
  AddressTypes,
  AddressValues,
  addAddress,
  getAddress,
  updateAddress,
} from "@/app/redux/homeSlice";

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

type AddressID = number | null;
const countries = ["India", "USA", "Canada", "Australia"];

const AddressForm: React.FC = () => {
  const [formValues, setFormValues] = useState<AddressValues>(values);
  const [errors, setErrors] = useState<Partial<AddressErrors>>(values);

  const { fetchById } = useFetch();
  const update = usePatch();
  const { create } = usePost();

  const mode = useAppSelector((state) => state.home.formMode) as string;
  const address = useAppSelector((state) => state.home.address) as AddressTypes;
  const addressId = useAppSelector(
    (state) => state.home.addressIdForUpdate
  ) as AddressID;

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
      await create(addAddress, formValues, "/cart/place-order");
      return;
    }

    if (mode === "update") {
      const values = {
        ...formValues,
        id: addressId,
      };
      await update(updateAddress, values, "/cart/place-order");
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
    if (mode === "create" && !addressId) {
      setFormValues(values);
    }
  }, []);

  return (
    <Wrapper>
      <div className="flex items-center justify-center">
        <h1 className="text-center font-semibold text-[18px] border-b px-2 py-1 text-primary mb-8">
          {mode === "create" ? "Add Address" : "Update Address"}
        </h1>
      </div>
      <form
        className="px-8 py-4 bg-white rounded shadow w-[50%] mx-auto"
        onSubmit={handleSubmit}
      >
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
          {/* <FormError message={errors.area ?? ""} /> */}
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
          {/* <FormError message={errors.landmark ?? ""} /> */}
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
      <Toaster />
    </Wrapper>
  );
};

export default AddressForm;
