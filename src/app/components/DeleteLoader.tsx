"use client";
import React from "react";
import { ClipLoader } from "react-spinners";

interface PropsType {
  loading: boolean;
}

const DeleteLoader: React.FC<PropsType> = ({ loading }) => {
  return (
    <ClipLoader
      color={"#82b440"}
      loading={loading}
      size={16}
      aria-label="Loading Spinner"
      data-testid="loader"
    />
  );
};
export default DeleteLoader;
