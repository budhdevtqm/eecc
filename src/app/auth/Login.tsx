"use client";
import React, { useState } from "react";
import Button from "../components/Button";
import { LoginValues, handleLogin, toggleAuthMode } from "../redux/authSlice";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import FormError from "@/app/components/FormError";
import { validateLogin } from "@/app/common-utils/validations";
import toast, { Toaster } from "react-hot-toast";
import { useRouter } from "next/navigation";
import Loader from "../components/Loader";

const values = {
  email: "",
  password: "",
};

const Login: React.FC = () => {
  const [formValues, setFormValues] = useState<LoginValues>(values);
  const [errors, setErrors] = useState<Partial<LoginValues>>(values);

  const router = useRouter();
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
    const validationResults = validateLogin(formValues);
    if (Object.keys(validationResults).length > 0) {
      setErrors(validationResults);
      return;
    }

    const res: any = await dispatch(handleLogin(formValues));

    if (res.type.includes("fulfilled")) {
      const { role, userEmail, message } = res.payload.data.data;
      localStorage.setItem("role", role);
      localStorage.setItem("userEmail", userEmail);
      toast.success(message, { position: "top-right" });
      if (role === "admin") {
        router.push("/admin");
        return;
      } else if (role === "user") {
        router.push("/");
        return;
      }
    } else {
      toast.error(res.payload.error.message, { position: "top-right" });
    }
  };

  return (
    <div className="h-full w-full px-8 flex flex-col gap-8  h-[415px]">
      <h1 className="text-center font-semibold text-[20px] border-b pb-1 border-primary h-[45px]">
        Log In
      </h1>
      <div className="mt-4 w-[70%] mx-auto h-[350px] flex items-center justify-center">
        <form onSubmit={handleSubmit}>
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
              className=" py-1 px-2 outline-primary text-black rounded-xl border-2"
              onChange={handleChange}
              value={formValues.password}
            />
            <FormError message={errors?.password ?? ""} />
          </div>
          <div className="flex items-center justify-center">
            {loading ? (
              <Loader loading={loading} />
            ) : (
              <Button type="submit">Login</Button>
            )}
          </div>
        </form>
      </div>

      <p
        className="text-center text-gray-600 cursor-pointer hover:text-blue-500 text-[12px] h-[25px]"
        onClick={() => dispatch(toggleAuthMode("signup"))}
      >
        {authMode === "login"
          ? "New user, Please signup ?"
          : "Already have account, Please login"}
      </p>
      <Toaster />
    </div>
  );
};

export default Login;
