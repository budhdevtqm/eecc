import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export interface CategoryValues {
  name: string;
  id?: string;
}

interface InitalsType {
  categories: FetchedCategory[] | [];
  loading: boolean;
  category: FetchedCategory | null;
}

export interface FetchedCategory {
  created_at: string;
  created_by: number;
  id: number;
  name: string;
  status: number;
  updated_at: null | string;
}

const initialState: InitalsType = {
  categories: [],
  loading: false,
  category: null,
};

export const getAllCategory = createAsyncThunk(
  "/get-all-category",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get("/api/admin/category");
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

export const deleteCategory = createAsyncThunk(
  "/delete-category",
  async (id: string, { rejectWithValue }) => {
    try {
      const response = await axios.delete(`/api/admin/category/${id}`);
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

export const addCategory = createAsyncThunk(
  "/add-category",
  async (values: CategoryValues, { rejectWithValue }) => {
    try {
      const response = await axios.post("/api/admin/category", {
        ...values,
        userEmail: "budhdevtqm@gmail.com",
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

export const fetchCategory = createAsyncThunk(
  "/get-category",
  async (id: string, { rejectWithValue }) => {
    try {
      const response = await axios.get(`/api/admin/category/${id}`);
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

export const upadteCategory = createAsyncThunk(
  "/update-category",
  async (values: CategoryValues, { rejectWithValue }) => {
    try {
      const { name, id } = values;
      const response = await axios.patch(`/api/admin/category/${id}`, {
        name,
        userEmail: "budhdevtqm@gmail.com",
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

const categorySlice = createSlice({
  name: "categories",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllCategory.pending, (state) => {
        state.loading = true;
      })
      .addCase(getAllCategory.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.categories = payload.data.data;
      });

    builder
      .addCase(fetchCategory.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchCategory.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.category = payload.data.data;
      });

    builder
      .addCase(addCategory.pending, (state) => {
        state.loading = true;
      })
      .addCase(addCategory.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(addCategory.rejected, (state) => {
        state.loading = false;
      });

    builder
      .addCase(upadteCategory.pending, (state) => {
        state.loading = true;
      })
      .addCase(upadteCategory.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(upadteCategory.rejected, (state) => {
        state.loading = false;
      });

    builder
      .addCase(deleteCategory.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteCategory.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(deleteCategory.rejected, (state) => {
        state.loading = false;
      });
  },
});

export default categorySlice.reducer;
