"use client";
import React from "react";
import { PulseLoader } from "react-spinners";

interface PropsType {
  loading: boolean;
}

const Loader: React.FC<PropsType> = ({ loading }) => {
  return (
    <PulseLoader
      color={"#82b440"}
      loading={loading}
      size={16}
      aria-label="Loading Spinner"
      data-testid="loader"
    />
  );
};

export default Loader;
