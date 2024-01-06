"use client";
import React, { useState } from "react";
import { getDate, getTime } from "../common-utils/common-fns";
import Link from "next/link";
import { MdDelete, MdEdit } from "react-icons/md";
import DeleteLoader from "./DeleteLoader";
import useFetch from "../custom-hooks/useFetch";
import useDelete from "../custom-hooks/useDelete";
import { deleteCategory, getAllCategory } from "../redux/categorySlice";

interface PropsType {
  index: number;
  name: string;
  created_at: string;
  status: number;
  id: number;
}

const CategoryRow: React.FC<PropsType> = (props) => {
  const [loading, setLoading] = useState(false);
  const { handleFetch } = useFetch();
  const handleDelete = useDelete();
  const { index, name, created_at, status, id } = props;

  const deleteHandler = async (id: number) => {
    setLoading(true);
    await handleDelete(deleteCategory, id);
    await handleFetch(getAllCategory);
    setLoading(false);
  };
  return (
    <tr key={index}>
      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
        {name}
      </td>

      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
        <p className="text-gray-900 whitespace-no-wrap">
          {getDate(created_at)}
        </p>
        <p className="text-gray-600 whitespace-no-wrap">
          {getTime(created_at)}
        </p>
      </td>
      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
        {status ? (
          <span className="relative inline-block px-3 py-1 font-semibold text-green-900 leading-tight">
            <span
              aria-hidden
              className="absolute inset-0 bg-green-200 opacity-50 rounded-full"
            ></span>
            <span className="relative">Yes</span>
          </span>
        ) : (
          <span className="relative inline-block px-3 py-1 font-semibold text-orange-900 leading-tight">
            <span
              aria-hidden
              className="absolute inset-0 bg-orange-200 opacity-50 rounded-full"
            ></span>
            <span className="relative">No</span>
          </span>
        )}
      </td>
      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm text-right">
        <span className="flex text-[20px] gap-3 cursor-pointer">
          <Link href={`/admin/categories/update/${id}`}>
            <MdEdit title="Edit" />
          </Link>
          {loading ? (
            <DeleteLoader loading={loading} />
          ) : (
            <MdDelete
              title="Delete"
              onClick={() => deleteHandler(id)}
            />
          )}
        </span>
      </td>
    </tr>
  );
};

export default CategoryRow;
