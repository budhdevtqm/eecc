import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { headers } from "../common-utils/common-fns";

export interface Order {
  address_id: number;
  amount: number;
  created_at: string;
  id: number;
  image: string;
  is_cancelled: number;
  is_returned: number;
  name: string;
  payment_id: string;
  product_id: number;
  quantity: number;
  status: number;
  updated_at: string;
  user_id: number;
}

export interface OrderDetails {
  id: number;
  amount: number;
  quantity: number;
  product_name: string;
  product_image: string;
  order_created_at: string;
  recipient_name: string;
  recipient_mobile: number;
  recipient_apartment: string;
  recipient_area: string;
  recipient_pin: number;
  recipient_landmark: string;
  recipient_city: string;
  recipient_state: string;
  method: string;
  status: number;
}

interface Initals {
  loading: boolean;
  order: OrderDetails | null;
  orderId: null | number;
  orders: Order[] | [];
}

const initialState: Initals = {
  loading: false,
  order: null,
  orderId: null,
  orders: [],
};

export const cancelOrder = createAsyncThunk(
  "/cancel-order",
  async (id: number, { rejectWithValue }) => {
    try {
      const response = await axios.delete(`/api/order/${id}`, headers);
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

export const getMyOrders = createAsyncThunk(
  "/get-my-order",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get("/api/order", headers);
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

export const getSingleOrder = createAsyncThunk(
  "/get-single-order",
  async (id: number, { rejectWithValue }) => {
    try {
      const response = axios.get(`/api/order/${id}`, headers);
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

const orderSlice = createSlice({
  name: "orders",
  initialState,
  reducers: {
    setOrderId: (state, { payload }) => {
      state.orderId = payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getMyOrders.pending, (state) => {
        state.loading = true;
      })
      .addCase(getMyOrders.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.orders = payload.data.data;
      })
      .addCase(getMyOrders.rejected, (state) => {
        state.loading = false;
        state.orders = [];
      });
    builder
      .addCase(getSingleOrder.pending, (state) => {
        state.loading = true;
      })
      .addCase(getSingleOrder.fulfilled, (state, { payload }) => {
        state.order = payload.data.data;
      });
  },
});

export const { setOrderId } = orderSlice.actions;
export default orderSlice.reducer;
