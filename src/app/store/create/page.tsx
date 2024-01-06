"use client";
import React, { useState } from "react";
import FormCard from "@/app/components/FormCard";
import Button from "@/app/components/Button";

const users = [
  { _id: "2312341324", name: "Admin" },
  { _id: "2312341324", name: "SuperAdmin" },
  { _id: "2312341324", name: "admin" },
];

const CreateStore: React.FC = () => {
  const [formValues, setFormValues] = useState({
    name: "",
    discount: 0,
    owner: "",
  });

  const role = "superAdmin";

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("store-values", formValues);
  };

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };
  return (
    <FormCard title="Add Store" navigate="/store">
      <form onSubmit={submitHandler}>
        <div className="flex flex-col gap-1 my-3">
          <label className="ml-1 text-gray-500 ">Name</label>
          <input
            type="text"
            name="name"
            placeholder="Your name!"
            className="border-2 py-1 px-2 outline-primary text-black rounded-lg"
            onChange={handleChange}
            value={formValues.name}
          />
          <p className="text-red-500 text-[12px] ml-2">Error</p>
        </div>
        <div className="flex flex-col gap-1 my-3">
          <label className="ml-1 text-gray-500 ">Discount (%)</label>
          <input
            type="number"
            name="discount"
            placeholder="Your discount!"
            className="border-2 py-1 px-2 outline-primary text-black rounded-lg"
            onChange={handleChange}
            value={formValues.discount}
          />
          <p className="text-red-500 text-[12px] ml-2">Error</p>
        </div>

        {role === "superAdmin" && (
          <div className="flex flex-col gap-1 my-3">
            <label className="ml-1 text-gray-500">Owner</label>
            <select
              name="role"
              className="border-2 py-1 px-2 outline-primary text-black rounded-lg"
              value={formValues.owner}
              onChange={handleSelectChange}
            >
              <option value="">None</option>
              {users.map((user: { _id: string; name: string }, index) => (
                <option key={user._id} value={user._id}>
                  {user.name}
                </option>
              ))}
            </select>
            <p className="text-red-500 text-[12px] ml-2">Error</p>
          </div>
        )}
        <div className="my-4 flex items-center justify-center">
          <Button variant="primary" type="submit">
            Submit
          </Button>
        </div>
      </form>
    </FormCard>
  );
};

export default CreateStore;
