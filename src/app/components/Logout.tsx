"use client";
import React, { CSSProperties } from "react";
import Button from "./Button";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { handleLogout } from "../redux/authSlice";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import Loader from "./Loader";

const Logout: React.FC = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();

  const loading = useAppSelector((state) => state.auth.loading) as boolean;

  const handleClick = async () => {
    const response = await dispatch(handleLogout());
    if (response.type.includes("fulfilled")) {
      localStorage.removeItem("userEmail");
      localStorage.removeItem("role");
      toast.success("logout successfuly", { position: "top-right" });
      router.push("/auth");
      return;
    }
  };
  return (
    <>
      {loading ? (
        <Loader loading={loading} />
      ) : (
        <Button onClick={handleClick} variant="primary">
          Logout
        </Button>
      )}
    </>
  );
};

export default Logout;
