"use client";
import React, { useEffect } from "react";
import PageHeader from "../../components/PageHeader";
import useFetch from "../../custom-hooks/useFetch";
import { useAppSelector } from "../../redux/hooks";
import Empty from "@/app/components/admin/Empty";
import TableWrapper from "@/app/components/admin/TableWrapper";
import ProductRow from "@/app/components/ProductRow";
import { FetchedProduct, getAllProducts } from "../../redux/productSlice";

const Products: React.FC = () => {
  const { handleFetch } = useFetch();

  const products = useAppSelector((state) => state.product.products) as
    | FetchedProduct[]
    | [];

  useEffect(() => {
    handleFetch(getAllProducts);
  }, []);

  return (
    <>
      <PageHeader title="All Products" navigate="/admin/product/create" />
      <TableWrapper>
        {products.length > 0 ? (
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
        ) : (
          <Empty label="No Products Yet!" />
        )}
      </TableWrapper>
    </>
  );
};

export default Products;
