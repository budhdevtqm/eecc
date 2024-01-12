"use client";
import React, { useEffect, useState } from "react";
import Wrapper from "../components/Wrapper";
import PageHeader from "../components/PageHeader";
import Pagination from "../components/Pagination";
import ItemRow from "../components/ItemRow";
import TableWrapper from "../components/admin/TableWrapper";
import Empty from "../components/admin/Empty";
import { useAppSelector } from "../redux/hooks";
import { Product, getAllProducts } from "../redux/homeSlice";
import useFetch from "../custom-hooks/useFetch";
import Image from "next/image";
import { useRouter } from "next/navigation";
import Loading from "../components/Loading";

const AllProducts: React.FC = () => {
  const [records, setRecords] = useState<any>([]);
  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);

  const { handleFetch } = useFetch();
  const router = useRouter();

  const loading = useAppSelector((state) => state.home.loading) as boolean;
  const products = useAppSelector((state) => state.home.products) as
    | Product[]
    | [];

  const onPageChange = (pageNo: number) => {
    const lastIndex = pageNo * 10;
    const startIndex = lastIndex - 10;
    const productsCopy = [...products];
    const result = productsCopy.slice(startIndex, lastIndex);
    setCurrentPage(pageNo);
    setRecords(result);
  };

  useEffect(() => {
    handleFetch(getAllProducts);
  }, []);

  useEffect(() => {
    if (products.length > 0) {
      const totalPage = Math.ceil(products.length / 10);
      setTotalPages(totalPage);
      setCurrentPage(1);
      onPageChange(1);
    }
  }, [products]);
  return (
    <Wrapper>
      <PageHeader title="Products" />
      {loading && products.length === 0 && <Loading />}
      {!loading && products.length === 0 && <Empty label="No Products Yet!" />}
      {!loading && products.length > 0 && <>
        <div className="min-h-[66vh]">
          <table className="min-w-full leading-normal">
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
                  Left Items
                </th>
              </tr>
            </thead>
            <tbody>
              {records.map((item: Product) => (
                <tr
                  key={item.id}
                  onClick={() => router.push(`/item/${item.id}`)}
                  className="cursor-pointer h-fit"
                >
                  <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                    <p className="text-gray-900 whitespace-no-wrap text-center">
                      <Image
                        src={
                          item.images.length > 0
                            ? `/upload/products/${item.images[0]}`
                            : `/images/no-image.png`
                        }
                        alt={name + "image"}
                        width={50}
                        height={50}
                      />
                    </p>
                  </td>
                  <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm max-w-[500px] text-wrap">
                    {item.name}
                  </td>

                  <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                    <p className="text-gray-900 whitespace-no-wrap">
                      {item.price}
                    </p>
                  </td>
                  <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                    <p className="text-gray-900 whitespace-no-wrap">
                      {item.quantity}
                    </p>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div>
          <Pagination
            onPageChange={onPageChange}
            totalPages={totalPages}
            currentPage={currentPage}
          />
        </div>
      </>}


    </Wrapper>
  );
};

export default AllProducts;
