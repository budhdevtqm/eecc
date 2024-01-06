"use client";
import React from "react";
import Image from "next/image";
import Login from "./Login";
import Signup from "./Signup";
import { useAppSelector } from "../redux/hooks";

function AuthPage() {
  const authMode = useAppSelector((state) => state.auth.authMode);

  return (
    <div className="flex items-center h-[100vh] w-[100vw] bg-primary">
      <div className="flex  justify-center rounded-lg shadow-xl p-[50px] border w-[70vw] mx-auto bg-white">
        <div className="flex items-center justify-start w-[50%]">
          <Image
            src={"/images/auth.jpg"}
            width={400}
            height={400}
            alt="image"
            className="p-4"
          />
        </div>
        <div className="w-[50%]">
          {authMode === "login" ? <Login /> : <Signup />}
        </div>
      </div>
    </div>
  );
}

export default AuthPage;
