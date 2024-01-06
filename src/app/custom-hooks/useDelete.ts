import toast from "react-hot-toast";
import { useAppDispatch } from "../redux/hooks";

const useDelete = () => {
  const disptach = useAppDispatch();

  const handleDelete = async (fn: any, id: number) => {
    const response: any = await disptach(fn(id));
    if (response.type.includes("fulfilled")) {
      toast.success(response.payload.data.message, { position: "top-right" });
      return response;
    }
    return response;
  };
  return handleDelete;
};

export default useDelete;
