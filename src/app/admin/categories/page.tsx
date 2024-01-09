"use client";
import React, { Suspense, useEffect, useState } from "react";
import PageHeader from "../../components/PageHeader";
import useFetch from "../../custom-hooks/useFetch";
import { useAppSelector } from "../../redux/hooks";
import TableWrapper from "@/app/components/admin/TableWrapper";
import Empty from "@/app/components/admin/Empty";
import CategoryRow from "@/app/components/CategoryRow";
import { FetchedCategory, getAllCategory } from "../../redux/categorySlice";
import Pagination from "@/app/components/Pagination";
import Loading from "@/app/components/Loading";

const Categories: React.FC = () => {
  const [categories, setCategories] = useState<FetchedCategory[] | []>([]);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const { handleFetch } = useFetch();

  const loading = useAppSelector((state) => state.category.loading) as boolean;
  const allCategory = useAppSelector((state) => state.category.categories) as
    | FetchedCategory[]
    | [];

  const onPageChange = (pageNo: number) => {
    const lastIndex = pageNo * 10;
    const startIndex = lastIndex - 10;
    setCategories(allCategory.slice(startIndex, lastIndex));
    setCurrentPage(pageNo);
  };

  useEffect(() => {
    handleFetch(getAllCategory);
  }, []);

  useEffect(() => {
    if (allCategory.length > 0) {
      setTotalPages(Math.ceil(allCategory.length / 10));
      onPageChange(1);
      setCurrentPage(1);
    }
  }, [allCategory]);

  return (
    <>
      <PageHeader title="Categories" navigate="/admin/categories/create" />
      {loading && <Loading />}
      {!loading && categories.length === 0 && (
        <Empty label="No Categories Yet!" />
      )}
      {!loading && categories.length > 0 && (
        <div>
          <div className="min-h-[590px]">
            <TableWrapper>
              <table className="min-w-full leading-normal">
                <thead>
                  <tr>
                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                      Name
                    </th>
                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                      Added On
                    </th>
                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                      Active
                    </th>
                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100"></th>
                  </tr>
                </thead>
                <tbody>
                  {categories.map((c: FetchedCategory, index) => (
                    <CategoryRow
                      id={c.id}
                      index={index}
                      name={c.name}
                      status={c.status}
                      created_at={c.created_at}
                    />
                  ))}
                </tbody>
              </table>
            </TableWrapper>
          </div>
          <Pagination
            totalPages={totalPages}
            currentPage={currentPage}
            onPageChange={onPageChange}
          />
        </div>
      )}
    </>
  );
};

export default Categories;
<></>;
