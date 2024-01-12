'use client'
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { headers } from "../common-utils/common-fns";

export interface File {
  lastModified: number;
  lastModifiedDate: Date;
  name: string;
  size: number;
  type: string;
  webkitRelativePath: string;
}

export interface ProductValues {
  name: string;
  price: string | number;
  quantity: string | number;
  category: string;
  description: string;
  images: Array<File> | string[] | [] | string;
  id?: number;
  created_by?: number;
  created_at?: string;
  updated_at?: string;
  status?: number;
}

export interface FetchedProduct {
  id: number;
  name: string;
  category: string;
  price: number;
  description: string;
  created_by: number;
  created_at: string;
  updated_at: string;
  status: number;
  images: string[] | [];
  quantity: string | number;
}

interface DeleteImagePayload {
  id: string;
  images: string[] | [];
}

export interface ProductFormCategories {
  id: number;
  name: string;
}

interface InitialTypes {
  loading: boolean;
  products: FetchedProduct[] | [];
  categories: ProductFormCategories[] | [];
  product: FetchedProduct | null;
}

const initialState: InitialTypes = {
  loading: false,
  products: [],
  categories: [],
  product: null,
};

export const getAllProducts = createAsyncThunk(
  "/get-all-products",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get("/api/admin/product", headers);
      return response;
    } catch (er) {
      if (axios.isAxiosError(er)) {
        return rejectWithValue(er.response?.data);
      } else {
        return rejectWithValue("An error occurred");
      }
    }
  }
);

export const allCategory = createAsyncThunk(
  "/all-category",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get("/api/admin/product/category");
      return response;
    } catch (er) {
      if (axios.isAxiosError(er)) {
        return rejectWithValue(er.response?.data);
      } else {
        return rejectWithValue("An error occurred");
      }
    }
  }
);

export const addProduct = createAsyncThunk(
  "/create-product",
  async (values: any, { rejectWithValue }) => {
    try {
      const response = await axios.post("/api/admin/product", values, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      return response;
    } catch (er) {
      if (axios.isAxiosError(er)) {
        return rejectWithValue(er.response?.data);
      } else {
        return rejectWithValue("An error occurred");
      }
    }
  }
);

export const getProduct = createAsyncThunk(
  "/get-product",
  async (id: string, { rejectWithValue }) => {
    try {
      const response = await axios.get(`/api/admin/product/${id}`);
      return response;
    } catch (er) {
      if (axios.isAxiosError(er)) {
        return rejectWithValue(er.response?.data);
      } else {
        return rejectWithValue("An error occurred");
      }
    }
  }
);

export const deleteImage = createAsyncThunk(
  "/delete-image",
  async (values: DeleteImagePayload, { rejectWithValue }) => {
    try {
      const response = await axios.patch(
        `/api/admin/product/remove/${values.id}`,
        {
          images: values.images,
        }
      );
      return response;
    } catch (er) {
      if (axios.isAxiosError(er)) {
        return rejectWithValue(er.response?.data);
      } else {
        return rejectWithValue("An error occurred");
      }
    }
  }
);

export const updateProduct = createAsyncThunk(
  "/update-product",
  async (values: any, { rejectWithValue }) => {
    try {
      const { productId, formData } = values;
      const response = await axios.patch(
        `/api/admin/product/${productId}`,
        formData
      );
      return response;
    } catch (er) {
      if (axios.isAxiosError(er)) {
        return rejectWithValue(er.response?.data);
      } else {
        return rejectWithValue("An error occurred");
      }
    }
  }
);

export const deleteProduct = createAsyncThunk(
  "/delete-product",
  async (id: string, { rejectWithValue }) => {
    try {
      const response = await axios.delete(`/api/admin/product/${id}`);
      return response;
    } catch (er) {
      if (axios.isAxiosError(er)) {
        return rejectWithValue(er.response?.data);
      } else {
        return rejectWithValue("An error occurred");
      }
    }
  }
);

export const featureProduct = createAsyncThunk(
  "/feature-product",
  async (id: number, { rejectWithValue }) => {
    try {
      const response = await axios.patch(
        `/api/admin/product/feature`,
        { id },
        headers
      );
      return response;
    } catch (er) {
      if (axios.isAxiosError(er)) {
        return rejectWithValue(er.response?.data);
      } else {
        return rejectWithValue("An error occurred");
      }
    }
  }
);

const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addProduct.pending, ({ loading }) => {
        loading = true;
      })
      .addCase(addProduct.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(addProduct.rejected, (state) => {
        state.loading = false;
      });

    builder
      .addCase(allCategory.pending, (state) => {
        state.loading = true;
      })
      .addCase(allCategory.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.categories = payload.data.data;
      });
    builder
      .addCase(getAllProducts.pending, (state) => {
        state.loading = true;
      })
      .addCase(getAllProducts.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.products = payload.data.data;
      })
      .addCase(getAllProducts.rejected, (state) => {
        state.loading = false;
        state.products = [];
      });

    builder
      .addCase(getProduct.pending, (state) => {
        state.loading = true;
      })
      .addCase(getProduct.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.product = payload.data.data;
      });

    builder
      .addCase(updateProduct.pending, ({ loading }) => {
        loading = true;
      })
      .addCase(updateProduct.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(updateProduct.rejected, (state) => {
        state.loading = false;
      });
  },
});

export default productSlice.reducer;
