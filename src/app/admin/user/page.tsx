"use client";
import React, { useEffect, useState } from "react";
import { MdEdit, MdDelete } from "react-icons/md";
import { Toaster } from "react-hot-toast";
import Link from "next/link";
import useFetch from "@/app/custom-hooks/useFetch";
import useDelete from "@/app/custom-hooks/useDelete";
import { useAppSelector } from "@/app/redux/hooks";
import { FetchedUser, deleteUser, getAllUsers } from "@/app/redux/userSlice";
import { getDate, getTime } from "@/app/common-utils/common-fns";
import PageHeader from "@/app/components/PageHeader";
import Loading from "@/app/components/Loading";
import Empty from "@/app/components/admin/Empty";
import Pagination from "@/app/components/Pagination";

const Users: React.FC = () => {
  const [users, setUsers] = useState<FetchedUser[] | []>([]);
  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const { handleFetch } = useFetch();
  const handleDelete = useDelete();

  const loading = useAppSelector((state) => state.users.loading);
  const allUser = useAppSelector((state) => state.users.users) as
    | FetchedUser[]
    | [];

  const onPageChange = (pageNo: number) => {
    const copy = [...allUser];
    const lastIndex = pageNo * 10;
    const startIndex = lastIndex - 10;
    setUsers(copy.slice(startIndex, lastIndex));
    setCurrentPage(pageNo);
  };

  const deleteHandler = async (id: number) => {
    await handleDelete(deleteUser, id);
    await handleFetch(getAllUsers);
  };

  useEffect(() => {
    if (allUser.length > 0) {
      onPageChange(1);
      setTotalPages(Math.ceil(allUser.length / 10));
    }
  }, [allUser]);

  useEffect(() => {
    handleFetch(getAllUsers);
  }, []);

  return (
    <>
      <PageHeader title="Users" navigate="/admin/user/create" />
      {loading && allUser.length === 0 && <Loading />}
      {!loading && allUser.length === 0 && <Empty label="No Users Yet!" />}
      {!loading && allUser.length > 0 && (
        <>
          <div className="min-h-[630px] my-4">
            <table className="min-w-full leading-normal">
              <thead>
                <tr>
                  <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                    User Name
                  </th>
                  <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                    Email
                  </th>
                  <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                    Added On
                  </th>
                  <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                    Active
                  </th>
                  <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                    Permissions
                  </th>
                  <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100"></th>
                </tr>
              </thead>
              <tbody>
                {users.map((user: any, index) => (
                  <tr key={index}>
                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                      <div className="flex">
                        <div className="flex-shrink-0 w-10 h-10"></div>
                        <div className="ml-3">
                          <p className="text-gray-900 whitespace-no-wrap">
                            {user.name}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                      <p className="text-gray-900 whitespace-no-wrap">
                        {user.email}
                      </p>
                    </td>
                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                      <p className="text-gray-900 whitespace-no-wrap">
                        {getDate(user?.created_at)}
                      </p>
                      <p className="text-gray-600 whitespace-no-wrap">
                        {getTime(user?.created_at)}
                      </p>
                    </td>
                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                      {user.status == 1 ? (
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
                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                      <p className="text-gray-900 whitespace-no-wrap">
                        {user?.role}
                      </p>
                    </td>
                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm text-right">
                      <span className="flex text-[20px] gap-3 cursor-pointer">
                        <Link href={`/admin/user/update/${user.id}`}>
                          <MdEdit title="Edit" />
                        </Link>
                        <MdDelete
                          title="Delete"
                          onClick={() => deleteHandler(user.id as number)}
                        />
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <Pagination
            totalPages={totalPages}
            currentPage={currentPage}
            onPageChange={onPageChange}
          />
        </>
      )}
    </>
  );
};
export default Users;
