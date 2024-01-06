"use client";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { headers } from "../common-utils/common-fns";

export interface Profile {
  name: string;
  email: string;
  password: string;
}

interface Initials {
  user: Profile | null;
  loading: boolean;
}

const initialState: Initials = {
  user: null,
  loading: false,
};

export const getMyDetails = createAsyncThunk(
  "/get-my-profile",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get("/api/profile", headers);
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

export const updateProfile = createAsyncThunk(
  "/update-profile",
  async (values: Profile, { rejectWithValue }) => {
    try {
      const response = await axios.patch("/api/profile", values, headers);
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

const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {
    setProfile: (state, { payload }) => {
      state.user = payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getMyDetails.pending, (state) => {
        state.loading = true;
      })
      .addCase(getMyDetails.fulfilled, (state, { payload }) => {
        state.user = payload.data.data;
      });
  },
});

export const { setProfile } = profileSlice.actions;
export default profileSlice.reducer;
