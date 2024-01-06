"use client";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { headers } from "../common-utils/common-fns";

export interface CartItem {
  created_at: string;
  id: number;
  image: string;
  name: string;
  price: number;
  product_id: number;
  status: number;
  updated_at: string;
  user_id: number;
  qty?: number;
}

interface updateQuantity {
  id: number;
  operationType: string;
}

interface Initials {
  loading: boolean;
  cartItems: CartItem[] | [];
  cartProducts: [];
}

interface OrderValues {
  items: CartItem[];
  addressId: number;
}

const initialState: Initials = {
  loading: false,
  cartItems: [],
  cartProducts: [],
};

export const getAllCartItems = createAsyncThunk(
  "/get-cart-items",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get("/api/cart", headers);
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

export const deleteCartItem = createAsyncThunk(
  "/delete-cart-item",
  async (id: number, { rejectWithValue }) => {
    try {
      const response = await axios.delete(`/api/cart/${id}`, headers);
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

export const updateQuantity = createAsyncThunk(
  "/update-quantity",
  async (values: updateQuantity, { rejectWithValue }) => {
    try {
      const { operationType, id } = values;
      const response = await axios.patch(
        `/api/cart/${id}`,
        { operationType },
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

export const placeOrder = createAsyncThunk(
  "/place-order",
  async (values: OrderValues, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        "/api/cart/place-order",
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

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    setCartProducts: (state, { payload }) => {
      state.cartProducts = payload;
    },
    setCartItems: (state, { payload }) => {
      state.cartItems = payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllCartItems.pending, (state) => {
        state.loading = true;
      })
      .addCase(getAllCartItems.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.cartItems = payload.data.data;
      });
  },
});

export const { setCartProducts, setCartItems } = cartSlice.actions;
export default cartSlice.reducer;
