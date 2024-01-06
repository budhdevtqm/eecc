"use client";
import React, { useEffect, useState } from "react";
import {
  FetchedUser,
  UserValues,
  fetchUser,
  updateUser,
} from "@/app/redux/userSlice";
import { userRoles } from "@/app/common-utils/common-vars";
import Button from "@/app/components/Button";
import { validateUser } from "@/app/common-utils/validations";
import FormError from "@/app/components/FormError";
import { useParams } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/app/redux/hooks";
import usePatch from "@/app/custom-hooks/usePatch";
import FormCard from "@/app/components/admin/FormCard";

const values = {
  name: "",
  email: "",
  password: "",
  role: "",
};

const UpdateUserForm = () => {
  const [formValues, setFormValues] = useState<UserValues>(values);
  const [errors, setErrors] = useState<Partial<UserValues>>(values);

  const update = usePatch();
  const userId = useParams().id;
  const dispatch = useAppDispatch();
  const user = useAppSelector(
    (state) => state.users.user
  ) as FetchedUser | null;

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
    await update(updateUser, { ...formValues, id: userId }, "/admin/user");
  };

  useEffect(() => {
    dispatch(fetchUser(userId as string));
  }, []);

  useEffect(() => {
    if (user) {
      const { name, email, password, role } = user;
      setFormValues({ name, email, password, role });
    }
  }, [user]);

  return (
    <FormCard title="Update User" path="/admin/user">
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
            disabled
          />
          <FormError message={errors?.email ?? ""} />
        </div>
        <div className="flex flex-col gap-1 my-3">
          <label className="ml-1 text-gray-500">Password</label>
          <input
            type="password"
            name="password"
            placeholder="update password!"
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

export default UpdateUserForm;
