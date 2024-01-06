"use client";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { headerConfig } from "../common-utils/common-vars";

export interface UserValues {
  name: string;
  email: string;
  password: string;
  role: string;
  id?: string;
}

export interface UserProfile {
  _id: string;
  name: string;
  password: string;
  role: string;
  email: string;
}

export interface ProfileValidation {
  name: string;
  email: string;
  password: string;
}

export interface FetchedUser {
  createAt: string;
  email: string;
  id: number;
  name: string;
  password: string;
  role: string;
  status: number;
  updatedAt: string;
}

export const getAllUsers = createAsyncThunk(
  "/get-all-users",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get("/api/admin/user");
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

export const addUser = createAsyncThunk(
  "/create-user",
  async (values: UserValues, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        "/api/admin/user",
        values,
        headerConfig
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

export const fetchUser = createAsyncThunk(
  "/get-user",
  async (id: string, { rejectWithValue }) => {
    try {
      const response = await axios.get(`/api/admin/user/${id}`, headerConfig);
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

export const updateUser = createAsyncThunk(
  "/update-user",
  async (values: UserValues, { rejectWithValue }) => {
    try {
      const { name, email, password, role, id } = values;
      const response = await axios.patch(
        `/api/admin/user/${id}`,
        { name, email, password, role },
        headerConfig
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

export const deleteUser = createAsyncThunk(
  "/delete-user",
  async (id: string, { rejectWithValue }) => {
    try {
      const response = await axios.delete(`/api/admin/user/${id}`, headerConfig);
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

interface InitalsType {
  users: [] | FetchedUser[];
  loading: boolean;
  user: FetchedUser | null;
}

const initialState: InitalsType = {
  users: [],
  user: null,
  loading: false,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllUsers.pending, (state) => {
        state.loading = true;
      })
      .addCase(getAllUsers.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.users = payload.data.data;
      });
    builder
      .addCase(fetchUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchUser.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.user = payload.data.data[0];
      });
  },
});

export default userSlice.reducer;
