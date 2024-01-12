"use client";
import React, { useEffect, useState } from "react";
import PageHeader from "../../components/PageHeader";
import useFetch from "../../custom-hooks/useFetch";
import { useAppSelector } from "../../redux/hooks";
import Empty from "@/app/components/admin/Empty";
import ProductRow from "@/app/components/ProductRow";
import { FetchedProduct, getAllProducts } from "../../redux/productSlice";
import Loading from "@/app/components/Loading";
import Pagination from "@/app/components/Pagination";

const Products: React.FC = () => {
  const [products, setProducts] = useState<FetchedProduct[] | []>([]);
  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const { handleFetch } = useFetch();

  const loading = useAppSelector((state) => state.product.loading) as boolean;
  const allProduct = useAppSelector((state) => state.product.products) as
    | FetchedProduct[]
    | [];

  const onPageChange = (pageNo: number) => {
    const copy = [...allProduct];
    const lastIndex = pageNo * 10;
    const startIndex = lastIndex - 10;
    setProducts(copy.slice(startIndex, lastIndex));
    setCurrentPage(pageNo);
  };

  useEffect(() => {
    if (allProduct.length > 0) {
      setTotalPages(Math.ceil(allProduct.length / 10));
      onPageChange(1);
    }
  }, [allProduct]);

  useEffect(() => {
    handleFetch(getAllProducts);
  }, []);

  return (
    <>
      <PageHeader title="All Products" navigate="/admin/product/create" />
      {loading && products.length === 0 && <Loading />}
      {!loading && products.length === 0 && <Empty label="No Products Yet!" />}
      {!loading && products.length > 0 && (
        <>
          <div className="min-h-[70vh]">
            <table className="min-w-full leading-normal ">
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

                  <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100"></th>
                </tr>
              </thead>
              <tbody>
                {products.map((product: FetchedProduct) => (
                  <ProductRow
                    id={product.id}
                    name={product.name}
                    price={product.price}
                    status={product.status}
                    images={product.images}
                  />
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

export default Products;
