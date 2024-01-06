"use client";
import React, { useState } from "react";
import Button from "@/app/components/Button";
import FormError from "@/app/components/FormError";
import { CategoryValues, addCategory } from "@/app/redux/categorySlice";
import { validateCategory } from "@/app/common-utils/validations";
import usePost from "@/app/custom-hooks/usePost";
import FormCard from "@/app/components/admin/FormCard";
import { useAppSelector } from "@/app/redux/hooks";
import Loader from "@/app/components/Loader";

const CreateCategory: React.FC = () => {
  const [formValues, setFormValues] = useState<CategoryValues>({ name: "" });
  const [errors, setErrors] = useState<Partial<CategoryValues>>({ name: "" });
  const { create } = usePost();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const loading = useAppSelector((state) => state.category.loading) as boolean;

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const validationResults = validateCategory(formValues);
    if (Object.keys(validationResults).length > 0) {
      setErrors(validationResults);
      return;
    }
    await create(addCategory, formValues, "/admin/categories");
  };
  return (
    <FormCard title="Add Category" path="/admin/categories">
      <form onSubmit={handleSubmit}>
        <div className="flex flex-col gap-1 my-3">
          <label className="ml-1 text-gray-500 ">Name</label>
          <input
            type="text"
            name="name"
            placeholder="Category name!"
            className="border-2 py-1 px-2 outline-primary text-black rounded-lg"
            onChange={handleChange}
            value={formValues.name}
          />
          <FormError message={errors.name ?? ""} />
        </div>
        <div className="flex items-center justify-center">
          {loading ? (
            <Loader loading={loading} />
          ) : (
            <Button type="submit" variant="primary">
              Submit
            </Button>
          )}
        </div>
      </form>
    </FormCard>
  );
};

export default CreateCategory;
