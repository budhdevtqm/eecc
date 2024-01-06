"use client";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import { verifyStatus } from "../common-utils/common-fns";

const useNotify = () => {
  const router = useRouter();

  const checkStatus = (
    response: any,
    operationType: string,
    path?: string,
    prefix?: string
  ) => {
    if (response.type.includes("rejected")) {
      const stautsResult = verifyStatus(response.payload.status);

      if (Object.keys(stautsResult).length > 0) {
        toast.error(stautsResult?.message!, { position: "top-right" });
        path && setTimeout(() => router.push(stautsResult?.path!), 1000);
        return;
      }

      if (response.payload.status === 409) {
        toast.error(response.payload.message, { position: "top-right" });
        return;
      }
    }

    if (response.type.includes("fulfilled")) {
      toast.success(`${prefix} ${operationType}.`, { position: "top-right" });
      return;
    }
  };

  return { checkStatus };
};

export default useNotify;
