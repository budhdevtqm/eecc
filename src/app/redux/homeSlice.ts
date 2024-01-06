"use client";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { headers } from "../common-utils/common-fns";

export interface Product {
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
  is_featured?: number;
}

export interface AddressErrors {
  name: string;
  mobile: string;
  apartment: string;
  pin: string;
  city: string;
  state: string;
  country: string;
}

export interface AddressValues {
  id?: number;
  user_id?: number;
  country: string;
  name: string;
  mobile: string;
  apartment: string;
  area?: string;
  pin: string;
  landmark?: string;
  city: string;
  state: string;
}

export interface ContactValues {
  first_name: string;
  last_name: string;
  email: string;
  message: string;
}

export interface AddCartProduct {
  id?: number;
  user_id: number;
  product_id: number;
  product_name: string;
  product_image: string;
  price: string;
}

export interface AddressTypes {
  id: number;
  user_id: number;
  country: string;
  name: string;
  mobile: number;
  apartment: string;
  area: string;
  pin: number;
  landmark: string;
  city: string;
  state: string;
  created_at: string;
  checked?: boolean;
}

interface PlaceOrderTypes {
  productId: number;
  amount: number;
  quantity: number;
  addressId: number;
}

interface Initials {
  loading: boolean;
  products: Product[] | [];
  product: Product | null;
  addresses: AddressTypes[] | [];
  addressId: number | null;
  address: AddressTypes | null;
  formMode: string;
  addressIdForUpdate: number | null;
}

const initialState: Initials = {
  loading: false,
  products: [],
  product: null,
  addresses: [],
  addressId: null,
  address: null,
  formMode: "create",
  addressIdForUpdate: null,
};

export const deleteAddress = createAsyncThunk(
  "/delete-address",
  async (id: number, { rejectWithValue }) => {
    try {
      const response = await axios.delete(`/api/home/address/${id}`, headers);
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

export const updateAddress = createAsyncThunk(
  "/update-address",
  async (values: AddressValues, { rejectWithValue }) => {
    try {
      const response = await axios.patch(
        `/api/home/address/${values.id}`,
        values,
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

export const getAddress = createAsyncThunk(
  "/get-address",
  async (id: number, { rejectWithValue }) => {
    try {
      const response = await axios.get(`/api/home/address/${id}`, headers);
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

export const addAddress = createAsyncThunk(
  "/add-address",
  async (values: AddressValues, { rejectWithValue }) => {
    try {
      const response = await axios.post("/api/home/address", values, headers);
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

export const getMyAddresses = createAsyncThunk(
  "/get-addresses",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get("/api/home/address", headers);
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

export const getAllProducts = createAsyncThunk(
  "/fetch-all-products",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get("/api/home");
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

export const getSingleProduct = createAsyncThunk(
  "/get-product",
  async (id: string, { rejectWithValue }) => {
    try {
      const response = await axios.get(`/api/home/${id}`);
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

export const addToCart = createAsyncThunk(
  "/add-to-cart",
  async (id: string, { rejectWithValue }) => {
    try {
      const response = await axios.post("/api/home", { id }, headers);
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

export const placeOrder = createAsyncThunk(
  "/place-order",
  async (values: PlaceOrderTypes, { rejectWithValue }) => {
    try {
      const response = await axios.post("/api/home/payment", values, headers);
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

const homeSlice = createSlice({
  name: "home",
  initialState,
  reducers: {
    setAddressId: (state, { payload }) => {
      state.addressId = payload;
    },
    setAddresses: (state, { payload }) => {
      state.addresses = payload;
    },
    setFormMode: (state, { payload }) => {
      state.formMode = payload;
    },
    setUpdateId: (state, { payload }) => {
      state.addressIdForUpdate = payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllProducts.pending, (state) => {
        state.loading = true;
      })
      .addCase(getAllProducts.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.products = payload.data.data;
      });
    builder
      .addCase(getSingleProduct.pending, (state) => {
        state.loading = true;
      })
      .addCase(getSingleProduct.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.product = payload.data.data;
      });

    builder
      .addCase(getMyAddresses.pending, (state) => {
        state.loading = true;
      })
      .addCase(getMyAddresses.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.addresses = payload.data.data;
      });

    builder
      .addCase(getAddress.pending, (state) => {
        state.loading = true;
      })
      .addCase(getAddress.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.address = payload.data.data;
      });

    builder
      .addCase(addToCart.pending, (state) => {
        state.loading = true;
      })
      .addCase(addToCart.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(addToCart.rejected, (state) => {
        state.loading = false;
      });
  },
});

export const { setAddressId, setAddresses, setFormMode, setUpdateId } =
  homeSlice.actions;
export default homeSlice.reducer;
