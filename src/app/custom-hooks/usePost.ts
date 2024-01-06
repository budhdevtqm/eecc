"use client";
import { useAppDispatch } from "../redux/hooks";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";

const usePost = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();

  const create = async (fn: any, values: any, path?: string) => {
    const response: any = await dispatch(fn(values));
    if (response.type.includes("fulfilled")) {
      toast.success(response.payload.data.message, { position: "top-right" });
      if (path) {
        setTimeout(() => router.push(path), 500);
      }
      return response;
    }

    if (response.type.includes("rejected")) {
      toast.error(response.payload.message, { position: "top-right" });
      return response;
    }
  };

  return { create };
};

export default usePost;
