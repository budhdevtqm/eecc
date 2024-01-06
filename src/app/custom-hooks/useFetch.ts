"use client";
import { useAppDispatch } from "../redux/hooks";

const useFetch = () => {
  const disptach = useAppDispatch();

  const handleFetch = async (fn: any) => {
    const response = await disptach(fn());
    return response;
  };

  const fetchById = async (fn: any, id: string | number) => {
    await disptach(fn(id));
  };

  return { handleFetch, fetchById };
};

export default useFetch;
