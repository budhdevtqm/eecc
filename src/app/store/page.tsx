"use client";
import React from "react";
import Wrapper from "../components/Wrapper";
import PageHeader from "../components/PageHeader";
import { MdInfo, MdEdit, MdDelete } from "react-icons/md";
import { getDate, getTime } from "../common-utils/common-fns";
import Link from "next/link";

export const allStores = [
  {
    _id: 1,
    name: "TM Store",
    discount: 10,
    owner: { name: "Admin", id: "12313131232" },
    status: false,
    createdAt: new Date().getTime(),
    updatedAt: new Date().getTime(),
  },
  {
    _id: 2,
    name: "Live Store",
    discount: 12,
    owner: { name: "Admin", id: "12313131232" },
    status: true,
    createdAt: new Date().getTime(),
    updatedAt: new Date().getTime(),
  },
  {
    _id: 3,
    name: "MD Store",
    discount: 10,
    owner: { name: "Admin", id: "12313131232" },
    status: false,
    createdAt: new Date().getTime(),
    updatedAt: new Date().getTime(),
  },
];

const Stores: React.FC = () => {
  return (
    <Wrapper>
      <PageHeader title="All Stores" navigate="/store/create" />
      <div className="my-8 p-2 border-t-2 border-primary">
        <table className="min-w-full leading-normal">
          <thead>
            <tr>
              <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                Name
              </th>
              {/* <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                Email
              </th> */}
              <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                Added On
              </th>
              <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                Active
              </th>
              {/* <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                Permissions
              </th> */}
              <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100"></th>
            </tr>
          </thead>
          <tbody>
            {allStores.map((store: any, index) => (
              <tr key={index}>
                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                  {store.name}
                </td>
                {/* <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                  <p className="text-gray-900 whitespace-no-wrap">
                    {store.email}
                  </p>
                </td> */}
                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                  <p className="text-gray-900 whitespace-no-wrap">
                    {getDate(store.createdAt)}
                  </p>
                  <p className="text-gray-600 whitespace-no-wrap">
                    {getTime(store.createdAt)}
                  </p>
                </td>
                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                  {store.status ? (
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
                {/* <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                  <p className="text-gray-900 whitespace-no-wrap">
                    {store?.role}
                  </p>
                </td> */}
                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm text-right">
                  <span className="flex text-[20px] gap-3 cursor-pointer">
                    {/* <MdInfo
                      title="Info"
                      onClick={() => viewUserHandler(user)}
                    /> */}

                    <Link href={`/store/update/${store._id}`}>
                      <MdEdit title="Edit" />
                    </Link>
                    <MdDelete
                      title="Delete"
                      // onClick={() => deleteHandler(user._id as String)}
                    />
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Wrapper>
  );
};

export default Stores;
