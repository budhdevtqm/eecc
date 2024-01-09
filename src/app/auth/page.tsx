"use client";
import React from "react";
import Login from "./Login";
import Signup from "./Signup";
import { useAppSelector } from "../redux/hooks";

function AuthPage() {
  const authMode = useAppSelector((state) => state.auth.authMode);

  return <>
  {authMode === "login" ? <Login /> : <Signup />}</>;
}

export default AuthPage;
