"use client";
import React, { useState } from "react";
import Button from "./components/Button";

const categoreis = [
  {
    _id: 1,
    name: "Electronics",
    createdBy: { name: "ADMIN", id: "123123" },
    createdAt: new Date().getTime(),
    updatedAt: new Date().getTime(),
    status: false,
  },
  {
    _id: 1,
    name: "Mobiles",
    createdBy: { name: "ADMIN", id: "123123" },
    createdAt: new Date().getTime(),
    updatedAt: new Date().getTime(),
    status: true,
  },
  {
    _id: 1,
    name: "Shirts",
    createdBy: { name: "ADMIN", id: "123123" },
    createdAt: new Date().getTime(),
    updatedAt: new Date().getTime(),
    status: true,
  },
  {
    _id: 1,
    name: "Jeans",
    createdBy: { name: "ADMIN", id: "123123" },
    createdAt: new Date().getTime(),
    updatedAt: new Date().getTime(),
    status: true,
  },
  {
    _id: 1,
    name: "Watches",
    createdBy: { name: "ADMIN", id: "123123" },
    createdAt: new Date().getTime(),
    updatedAt: new Date().getTime(),
    status: false,
  },
  {
    _id: 1,
    name: "Shoes",
    createdBy: { name: "ADMIN", id: "123123" },
    createdAt: new Date().getTime(),
    updatedAt: new Date().getTime(),
    status: false,
  },
];

const ProductFilter: React.FC = () => {
  const [searchValues, setSearchValues] = useState({
    searchText: "",
    searchCategory: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setSearchValues({ ...searchValues, [name]: value });
  };

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    setSearchValues({ ...searchValues, [name]: value });
  };

  const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Filter-search-vlaues", searchValues);
  };

  return (
    <form className="flex items-center justify-center" onSubmit={submitHandler}>
      <div className="flex items-center justify-center gap-8 bg-white py-3  px-8 rounded">
        <div>
          <input
            type="text"
            placeholder="Search text"
            name="searchText"
            value={searchValues.searchText}
            className="p-1 rounded bg-gray-200 outline-primary"
            onChange={handleChange}
          />
        </div>
        <div>
          <select
            name="searchCategory"
            className="p-1 rounded bg-gray-200 outline-primary"
            value={searchValues.searchCategory}
            onChange={handleSelectChange}
          >
            <option value="" className="text-gray-500 font-small">
              Search category
            </option>
            {categoreis.map((c, index) => (
              <option key={index} value={c._id}>
                {c.name}
              </option>
            ))}
          </select>
        </div>
        <div className="flex gap-8 ">
          <Button variant="primary" type="submit">
            Search
          </Button>
          <Button variant="secondary">Reset</Button>
        </div>
      </div>
    </form>
  );
};

export default ProductFilter;
