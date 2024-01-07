"use client";
import React, { useEffect, useState } from "react";
import Wrapper from "../components/Wrapper";
import PageHeader from "../components/PageHeader";
import Pagination from "../components/Pagination";
import ItemRow from "../components/ItemRow";
import TableWrapper from "../components/admin/TableWrapper";
import Empty from "../components/admin/Empty";

const products = [
  {
    created_at: "2054-07-12T22:06:01.950Z",
    name: "Grant - Hettinger",
    price: 26081,
    status: true,
    is_cancelled: false,
    is_returned: false,
    updated_at: "2099-04-23T07:14:41.079Z",
    images: "/h1.jpg",
    id: "1",
  },
  {
    created_at: "2026-12-09T05:44:10.949Z",
    name: "Turner, Larkin and Halvorson",
    price: 92268,
    status: false,
    is_cancelled: true,
    is_returned: false,
    updated_at: "2094-08-07T00:18:57.783Z",
    images: "/h1.jpg",
    id: "2",
  },
  {
    created_at: "2005-04-14T01:45:01.342Z",
    name: "Moore - Cassin",
    price: 17745,
    status: false,
    is_cancelled: false,
    is_returned: false,
    updated_at: "1999-02-19T07:14:21.835Z",
    images: "/h1.jpg",
    id: "3",
  },
  {
    created_at: "2045-09-03T06:05:56.149Z",
    name: "Torphy and Sons",
    price: 37734,
    status: true,
    is_cancelled: false,
    is_returned: true,
    updated_at: "2036-09-20T01:14:14.564Z",
    images: "/h1.jpg",
    id: "4",
  },
  {
    created_at: "2082-01-26T09:52:40.630Z",
    name: "Osinski Group",
    price: 12815,
    status: true,
    is_cancelled: true,
    is_returned: false,
    updated_at: "2055-09-10T07:02:47.702Z",
    images: "/h1.jpg",
    id: "5",
  },
  {
    created_at: "2031-11-12T11:34:56.635Z",
    name: "Schumm and Sons",
    price: 99391,
    status: false,
    is_cancelled: false,
    is_returned: false,
    updated_at: "2057-10-19T15:41:40.851Z",
    images: "/h1.jpg",
    id: "6",
  },
  {
    created_at: "1996-04-03T20:17:18.495Z",
    name: "Rippin Inc",
    price: 24267,
    status: false,
    is_cancelled: true,
    is_returned: false,
    updated_at: "2019-05-15T15:21:30.970Z",
    images: "/h1.jpg",
    id: "7",
  },
  {
    created_at: "2011-10-16T04:16:39.410Z",
    name: "O'Conner, Witting and Gerhold",
    price: 48418,
    status: false,
    is_cancelled: true,
    is_returned: true,
    updated_at: "2092-02-06T17:06:44.393Z",
    images: "/h1.jpg",
    id: "8",
  },
  {
    created_at: "2052-05-30T08:52:12.505Z",
    name: "Schmidt - Ziemann",
    price: 75608,
    status: true,
    is_cancelled: true,
    is_returned: true,
    updated_at: "2017-12-08T20:41:54.358Z",
    images: "/h1.jpg",
    id: "9",
  },
  {
    created_at: "2006-01-24T02:59:23.319Z",
    name: "Ernser, Fay and Kovacek",
    price: 98916,
    status: true,
    is_cancelled: false,
    is_returned: true,
    updated_at: "2085-07-18T21:41:28.700Z",
    images: "/h1.jpg",
    id: "10",
  },
  {
    created_at: "2059-07-18T07:44:29.330Z",
    name: "Grimes - Lebsack",
    price: 43096,
    status: false,
    is_cancelled: true,
    is_returned: false,
    updated_at: "2009-03-29T18:30:03.463Z",
    images: "/h1.jpg",
    id: "11",
  },
];

const AllProducts: React.FC = () => {
  const [records, setRecords] = useState<any>([]);
  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);

  const onPageChange = (currentPage: number) => {
    const productsCopy = [...products];

    console.log("current", currentPage);
    console.log(records);
  };

  useEffect(() => {
    if (products.length > 0) {
      const totalPage = Math.ceil(products.length / 10);
      setTotalPages(totalPage);
      setCurrentPage(1);
      onPageChange(1);
    }
  }, []);
  return (
    <Wrapper>
      <PageHeader title="Products" />
      <TableWrapper>
        {products.length > 0 ? (
          <>
            <table className="min-w-full leading-normal min-h-[700px]">
              <thead>
                <tr>
                  <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                    Image
                  </th>
                  <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                    Name
                  </th>
                  <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                    Price (₹)
                  </th>
                  <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                    Active
                  </th>
                </tr>
              </thead>
              <tbody>
                {products.map((product: any) => (
                  <ItemRow
                    id={product.id}
                    name={product.name}
                    price={product.price}
                    status={product.status}
                    images={product.images}
                  />
                ))}
              </tbody>
            </table>
            <div>
              <Pagination
                onPageChange={onPageChange}
                totalPages={totalPages}
                currentPage={currentPage}
              />
            </div>
          </>
        ) : (
          <Empty label="No Products Yet!" />
        )}
      </TableWrapper>
    </Wrapper>
  );
};

export default AllProducts;
