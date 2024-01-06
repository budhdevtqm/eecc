"use client";
import React, { useState } from "react";
import { UserValues, addUser } from "@/app/redux/userSlice";
import { userRoles } from "@/app/common-utils/common-vars";
import Button from "@/app/components/Button";
import { validateUser } from "@/app/common-utils/validations";
import FormError from "@/app/components/FormError";
import usePost from "@/app/custom-hooks/usePost";
import { Toaster } from "react-hot-toast";
import FormCard from "@/app/components/admin/FormCard";

const values = {
  name: "",
  email: "",
  password: "",
  role: "",
};

const CreateUserForm = () => {
  const [formValues, setFormValues] = useState<UserValues>(values);
  const [errors, setErrors] = useState<Partial<UserValues>>(values);
  const { create } = usePost();

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

    const validationResults = validateUser(formValues);
    if (Object.keys(validationResults).length > 0) {
      setErrors(validationResults);
      return;
    }
    await create(addUser, formValues, "/admin/user");
  };

  return (
    <FormCard title="Add User" path="/admin/user">
      <form onSubmit={handleSubmit}>
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
          <FormError message={errors?.name ?? ""} />
        </div>
        <div className="flex flex-col gap-1 my-3">
          <label className="ml-1 text-gray-500 ">Email</label>
          <input
            type="text"
            name="email"
            placeholder="Your email!"
            className="border-2 py-1 px-2 outline-primary text-black rounded-lg"
            onChange={handleChange}
            value={formValues.email}
          />
          <FormError message={errors?.email ?? ""} />
        </div>
        <div className="flex flex-col gap-1 my-3">
          <label className="ml-1 text-gray-500">Password</label>
          <input
            type="password"
            name="password"
            placeholder="Your password!"
            className="border-2 py-1 px-2 outline-primary text-black rounded-lg"
            onChange={handleChange}
            value={formValues.password}
          />
          <FormError message={errors?.password ?? ""} />
        </div>
        <div className="flex flex-col gap-1 my-3">
          <label className="ml-1 text-gray-500">Permission</label>
          <select
            name="role"
            className="border-2 py-1 px-2 outline-primary text-black rounded-lg"
            value={formValues.role}
            onChange={handleSelectChange}
          >
            <option value="">None</option>
            {userRoles.map((type: string, index) => (
              <option key={index}>{type}</option>
            ))}
          </select>
          <FormError message={errors?.role ?? ""} />
        </div>
        <div className="my-4 flex items-center justify-center">
          <Button variant="primary" type="submit">
            Submit
          </Button>
        </div>
      </form>
    </FormCard>
  );
};

export default CreateUserForm;
