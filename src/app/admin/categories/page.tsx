"use client";
import React, { useEffect} from "react";
import PageHeader from "../../components/PageHeader";
import useFetch from "../../custom-hooks/useFetch";
import { useAppSelector } from "../../redux/hooks";
import TableWrapper from "@/app/components/admin/TableWrapper";
import Empty from "@/app/components/admin/Empty";
import CategoryRow from "@/app/components/CategoryRow";
import { FetchedCategory, getAllCategory } from "../../redux/categorySlice";

const Categories: React.FC = () => {
  const { handleFetch } = useFetch();

  const categoreis = useAppSelector((state) => state.category.categories) as
    | FetchedCategory[]
    | [];

  useEffect(() => {
    handleFetch(getAllCategory);
  }, []);
  return (
    <>
      <PageHeader title="Categories" navigate="/admin/categories/create" />
      <TableWrapper>
        {categoreis.length > 0 ? (
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
              {categoreis.map((c: FetchedCategory, index) => (
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
        ) : (
          <Empty label="No Categories Yet!" />
        )}
      </TableWrapper>
    </>
  );
};

export default Categories;
