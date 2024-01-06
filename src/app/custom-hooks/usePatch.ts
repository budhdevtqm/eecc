import toast from "react-hot-toast";
import { useAppDispatch } from "../redux/hooks";
import { useRouter } from "next/navigation";

const usePatch = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();

  const update = async (fn: any, values: any, path?: string) => {
    const response = await dispatch(fn(values));

    if (response.type?.includes("fulfilled")) {
      toast.success(response.payload.data.message, { position: "top-right" });
      if (path) {
        setTimeout(() => router.push(path), 500);
      }
      return response;
    }

    if (response.type?.includes("rejected")) {
      toast.error(response.payload.message, { position: "top-right" });
      return response;
    }
  };
  return update;
};

export default usePatch;
