"use client";
import React from "react";
import { AddressTypes, setAddressId } from "../redux/homeSlice";
import { MdDelete, MdEdit } from "react-icons/md";
interface PropsTypes {
  address: AddressTypes;
  handleSelectAddress: (id: number) => void;
  updateAddress: (id: number) => void;
  handleDelete: (id: number) => void;
}

const AddressCard: React.FC<PropsTypes> = (props) => {
  const { address, handleSelectAddress, updateAddress, handleDelete } = props;
  const { id, name, apartment, area, city, state, pin, country, checked } =
    address;

  return (
    <div className="flex items-center gap-8 w-full">
      <span className=" w-[10%] flex items-center justify-center">
        <span
          className="py-2  px-3 rounded hover:bg-gray-200"
          onClick={() => handleSelectAddress(id)}
        >
          <input
            type="radio"
            name="address"
            className="cursor-pointer"
            defaultChecked={checked ? true : false}
          />
        </span>
      </span>

      <label className="w-[90%]">
        <div className="flex items-center justify-between my-1 p-2 border rounded-lg">
          <div>
            <p>{`${name}  ${apartment}, ${area}, ${city}, ${state}, ${pin}, ${country}`}</p>
          </div>
          <div className="flex items-center gap-2 text-[20px]">
            <span
              className="p-2 rounded hover:bg-gray-200 cursor-pointer"
              onClick={() => updateAddress(id)}
            >
              <MdEdit />
            </span>
            <span
              className="p-2 rounded hover:bg-red-200 cursor-pointer"
              onClick={() => handleDelete(id)}
            >
              <MdDelete />
            </span>
          </div>
        </div>
      </label>
    </div>
  );
};

export default AddressCard;
