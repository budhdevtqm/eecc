"use client";
import React, { useEffect, useState } from "react";
import Button from "@/app/components/Button";
import FileCard from "../../FileCard";
import FormError from "@/app/components/FormError";
import {
  ProductValues,
  File,
  getProduct,
  FetchedProduct,
  deleteImage,
  updateProduct,
  allCategory,
  ProductFormCategories,
} from "@/app/redux/productSlice";
import { validateProduct } from "@/app/common-utils/validations";
import useFetch from "@/app/custom-hooks/useFetch";
import { useParams } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/app/redux/hooks";
import { removeFile } from "@/app/common-utils/common-fns";
import { MdCancel } from "react-icons/md";
import { FaImage } from "react-icons/fa";
import usePatch from "@/app/custom-hooks/usePatch";
import FormCard from "@/app/components/admin/FormCard";
import Loader from "@/app/components/Loader";

const values = {
  name: "",
  price: "",
  quantity: "",
  store: "",
  category: "",
  description: "",
  images: [],
};

const UpdateProduct = () => {
  const [loading, setLoading] = useState(false);
  const params = useParams() as { id: string };
  const productId = params.id;
  const dispatch = useAppDispatch();
  const { fetchById, handleFetch } = useFetch();
  const update = usePatch();
  const [files, setFiles] = useState<File[] | []>([]);
  const [formValues, setFormValues] = useState<ProductValues>(values);
  const [errors, setErrors] = useState<Partial<ProductValues>>(values);

  const product = useAppSelector(
    (state) => state.product.product
  ) as FetchedProduct | null;

  const categories = useAppSelector((state) => state.product.categories) as
    | ProductFormCategories[]
    | [];

  const fileRemoveHandler = (id: number) => {
    const filtered = removeFile(id, files);
    setFiles(filtered);
    setFormValues({ ...formValues, images: filtered });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = e.target.files;
    const updatedValues = Object.assign([], selectedFiles);
    setFormValues({ ...formValues, images: updatedValues });
    setFiles(updatedValues);
  };

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const handleTextareaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrors(values);
    setLoading(true);
    const validationResults = validateProduct(
      { ...formValues, images: files },
      "update"
    );

    if (Object.keys(validationResults).length > 0) {
      setErrors(validationResults);
      setLoading(false);
      return;
    }

    const formData = new FormData();
    for (const file of files) {
      formData.append("files", file as any);
    }
    formData.append("name", formValues.name);
    formData.append("price", formValues.price as string);
    formData.append("quantity", formValues.quantity as string);
    formData.append("category", formValues.category);
    formData.append("description", formValues.description);

    await update(updateProduct, { formData, productId }, "/admin/product");
    setLoading(false);
  };

  useEffect(() => {
    if (productId) {
      fetchById(getProduct, productId);
      handleFetch(allCategory);
    }
  }, []);

  useEffect(() => {
    if (product !== null) {
      const {
        id,
        name,
        category,
        price,
        description,
        quantity,
        created_by,
        created_at,
        updated_at,
        status,
        images,
      } = product;
      setFormValues({
        id,
        name,
        category,
        price,
        description,
        created_by,
        created_at,
        updated_at,
        status,
        images,
        quantity: `${quantity}` as string,
      });
    }
  }, [product]);

  const deleteFile = async (
    imagesArr: string[] | [],
    imageName: string,
    productId: string
  ) => {
    const filtered = imagesArr.filter(
      (filename: string) => filename !== imageName
    );

    const response = await dispatch(
      deleteImage({ id: productId, images: filtered })
    );

    if (response.type.includes("fulfilled")) {
      setFormValues({ ...formValues, images: filtered });
      return;
    }
  };

  return (
    <FormCard title="Update Product" path="/admin/product">
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <div className="flex flex-col gap-1 my-3">
          <label className="ml-1 text-gray-500 ">Name</label>
          <input
            type="text"
            name="name"
            placeholder="product name!"
            className="border-2 py-1 px-2 outline-primary text-black rounded-lg"
            onChange={handleChange}
            value={formValues.name}
          />
          <FormError message={errors.name || ""} />
        </div>
        <div className="flex flex-col gap-1 my-3">
          <label className="ml-1 text-gray-500 ">Price</label>
          <input
            type="number"
            name="price"
            placeholder="product price!"
            className="border-2 py-1 px-2 outline-primary text-black rounded-lg"
            onChange={handleChange}
            value={formValues.price}
          />
          <FormError message={(errors.price as string) || ""} />
        </div>
        <div className="flex flex-col gap-1 my-3">
          <label className="ml-1 text-gray-500 ">Quantity</label>
          <input
            type="number"
            name="quantity"
            placeholder="product quantity!"
            className="border-2 py-1 px-2 outline-primary text-black rounded-lg"
            onChange={handleChange}
            value={formValues.quantity}
          />
          <FormError message={(errors.quantity as string) || ""} />
        </div>
        <div className="flex flex-col gap-1 my-3">
          <label className="ml-1 text-gray-500">Category</label>
          <select
            name="category"
            className="border-2 py-1 px-2 outline-primary text-black rounded-lg"
            value={formValues.category}
            onChange={handleSelectChange}
          >
            <option value={formValues.category ?? ""}>
              {formValues?.category?.toUpperCase()}
            </option>
            {categories.map((c, index) => (
              <option key={index} value={c.name}>
                {c.name}
              </option>
            ))}
          </select>
          <FormError message={errors.category || ""} />
        </div>
        <div className="flex flex-col gap-1 my-3">
          <label className="ml-1 text-gray-500">Description</label>
          <textarea
            name="description"
            cols={30}
            rows={3}
            defaultValue={formValues.description ?? ""}
            onChange={handleTextareaChange}
            placeholder="Please enter product description...."
            className="border-2 py-1 px-2 outline-primary text-black rounded-lg"
          ></textarea>
          <FormError message={errors.description || ""} />
        </div>

        <div className="flex flex-col  w-full">
          <label
            htmlFor="dropzone-file"
            className="flex flex-col items-center justify-center w-full h-36 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
          >
            <div className="flex flex-col items-center justify-center pt-5 pb-6">
              <svg
                className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 20 16"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                />
              </svg>
              <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                <span className="font-semibold">Click to upload</span>
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                Only Image Files
              </p>
            </div>
            <input
              id="dropzone-file"
              type="file"
              className="hidden"
              name="images"
              accept="image/*"
              multiple
              onChange={handleFileChange}
            />
          </label>

          <FormError message={(errors.images as string) || ("" as string)} />
        </div>
        {files.length > 0 && (
          <div className="grid grid-rows-1 grid-cols-4 my-4 gap-4">
            {Object.values(files).map((file: File, index) => (
              <FileCard
                name={(file?.name as string) ?? ""}
                index={index}
                key={index}
                fileRemoveHandler={fileRemoveHandler}
                files={files}
              />
            ))}
          </div>
        )}

        {formValues?.images?.length > 0 && (
          <div className="flex flex-col gap-1 my-3">
            <h1 className="ml-1 text-gray-500">Uploaded</h1>
            <div className="grid grid-rows-1 grid-cols-4 my-4 gap-4">
              {(formValues?.images as string[] | []).map(
                (file: string, index) => (
                  <div
                    className=" border border-gray-400 rounded-lg "
                    key={index}
                  >
                    <div className="flex items-center justify-end text-red-500 pt-1 pr-1 text-[18px]">
                      <MdCancel
                        className="cursor-pointer"
                        title="Delete"
                        onClick={() =>
                          deleteFile(
                            (formValues?.images as string[]) ?? [],
                            file,
                            productId
                          )
                        }
                      />
                    </div>
                    <div className=" px-auto py-4 text-[50px] flex items-center justify-center">
                      <FaImage title={file} />
                    </div>
                  </div>
                )
              )}
            </div>
          </div>
        )}

        <div className="my-4 flex items-center justify-center">
          {loading ? (
            <Loader loading={loading} />
          ) : (
            <Button variant="primary" type="submit">
              Submit
            </Button>
          )}
        </div>
      </form>
    </FormCard>
  );
};

export default UpdateProduct;
