"use client";
import React from "react";

interface FormErrorProps {
  message: string;
}

const FormError: React.FC<FormErrorProps> = ({ message }) => {
  return message ? (
    <p className="text-red-500 text-[12px] ml-2">{message}</p>
  ) : (
    <></>
  );
};

export default FormError;
