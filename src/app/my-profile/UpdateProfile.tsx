"use client";
import { validateUserProfileForm } from "@/app/common-utils/validations";
import Button from "@/app/components/Button";
import FormError from "@/app/components/FormError";
import React, { useEffect, useState } from "react";
import { ProfileValidation } from "../redux/userSlice";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import {
  Profile,
  getMyDetails,
  setProfile,
  updateProfile,
} from "../redux/profileSlice";
import useFetch from "../custom-hooks/useFetch";
import usePatch from "../custom-hooks/usePatch";

const values = {
  name: "",
  email: "",
  password: "",
};

const UpdateProfile: React.FC = () => {
  const [formValues, setFormValues] = useState<ProfileValidation>(values);
  const [errors, setErrors] = useState<Partial<ProfileValidation>>(values);

  const update = usePatch();
  const { handleFetch } = useFetch();
  const dispatch = useAppDispatch();

  const profile = useAppSelector(
    (state) => state.profile.user
  ) as Profile | null;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrors(values);

    const validationResult = validateUserProfileForm(formValues);
    if (Object.keys(validationResult).length > 0) {
      setErrors(validationResult);
      return;
    }
    const response = await update(updateProfile, formValues);
    if (response.type.includes("fulfilled")) {
      dispatch(setProfile({ ...formValues, password: "" }));
    }
  };

  useEffect(() => {
    if (profile) {
      setFormValues(profile);
      return;
    }
    handleFetch(getMyDetails);
  }, [profile]);

  return (
    <div className="flex flex-col items-center justifty-center w-[50%] bg-white p-8 rounded-xl shadow-lg mx-auto my-8">
      <h1 className="mb-4 font-bold text-gray-600">Update Profile</h1>
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
          <FormError message={errors.name ?? ""} />
        </div>
        <div className="flex flex-col gap-1 my-3">
          <label className="ml-1 text-gray-500 ">Email</label>
          <input
            type="text"
            name="email"
            placeholder="email"
            className="border-2 py-1 px-2 outline-primary text-black rounded-lg"
            onChange={handleChange}
            value={formValues.email}
            disabled
          />
        </div>
        <div className="flex flex-col gap-1 my-3">
          <label className="ml-1 text-gray-500 ">Password</label>
          <input
            type="password"
            name="password"
            placeholder="Update password!"
            className="border-2 py-1 px-2 outline-primary text-black rounded-lg"
            onChange={handleChange}
            value={formValues?.password}
          />
          <FormError message={errors.password ?? ""} />
        </div>

        <div className="flex items-center justify-center">
          <Button type="submit" variant="primary">
            Submit
          </Button>
        </div>
      </form>
    </div>
  );
};

export default UpdateProfile;
