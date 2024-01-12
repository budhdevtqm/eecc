"use client";
import React, { useState } from "react";
import Button from "../components/Button";
import { SignupValues, toggleAuthMode } from "../redux/authSlice";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { validateSignup } from "@/app/common-utils/validations";
import FormError from "@/app/components/FormError";
import { handleSignup } from "../redux/authSlice";
import { toast, Toaster } from "react-hot-toast";
import Loader from "../components/Loader";

const values = {
  name: "",
  email: "",
  password: "",
};

const Signup: React.FC = () => {
  const [formValues, setFormValues] = useState<SignupValues>(values);
  const [errors, setErrors] = useState<Partial<SignupValues>>(values);

  const dispatch = useAppDispatch();
  const authMode = useAppSelector((state) => state.auth.authMode) as string;
  const loading = useAppSelector((state) => state.auth.loading) as boolean;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setErrors(values);
    const validationResults = validateSignup(formValues);
    if (Object.keys(validationResults).length > 0) {
      setErrors(validationResults);
      return;
    }

    const res: any = await dispatch(handleSignup(formValues));

    if (res.type.includes("fulfilled")) {
      toast.success("Signup successfully.", { position: "top-right" });
      dispatch(toggleAuthMode("login"));
      return;
    }

    if (res.type.includes("rejected")) {
      toast.error(res?.payload?.error?.message, {
        position: "top-right",
        duration: 2000,
      });
    }
  };

  return (
    <div className="h-full w-full px-8 flex flex-col gap-8 h-[415px]">
      <h1 className="text-center font-semibold text-[20px] border-b pb-1 border-primary h-[45px]">
        Sign Up
      </h1>
      <div className="mt-4 w-[70%] mx-auto h-[350px]">
        <form onSubmit={handleSubmit}>
          <div className="flex flex-col gap-1 my-3">
            <label className="ml-1 text-gray-500 ">Name</label>
            <input
              type="text"
              name="name"
              placeholder="Your name!"
              className="py-1 px-2 outline-primary text-black rounded-xl border-2"
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
              className="py-1 px-2 outline-primary text-black rounded-xl border-2 lowercase"
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
              className="py-1 px-2 outline-primary text-black rounded-xl border-2"
              onChange={handleChange}
              value={formValues.password}
            />
            <FormError message={errors?.password ?? ""} />
          </div>
          <div className="flex items-center justify-center my-">
            {loading ? (
              <Loader loading={loading} />
            ) : (
              <Button type="submit">Signup</Button>
            )}
          </div>
        </form>
      </div>
      <p
        className="text-center text-gray-600 cursor-pointer hover:text-blue-500 text-[12px] h-[25px]"
        onClick={() => dispatch(toggleAuthMode("login"))}
      >
        {authMode === "login"
          ? "New user, Please signup ?"
          : "Already have account, Please login"}
      </p >
      <Toaster />
    </div>
  );
};

export default Signup;
