import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../../Utils/axiosInstance";

export const fetchAdminRestaurants = createAsyncThunk(
  "admin/fetchAdminRestaurants",
  async (_, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.get("/admin/restaurants");
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

export const fetchPendingRestaurants = createAsyncThunk(
  "admin/fetchPendingRestaurants",
  async (_, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.get("/admin/restaurants/pending");
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

export const fetchUpdateApprove = createAsyncThunk(
  "admin/fetchUpdateApprove",
  async ({ id }, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.patch(`/admin/restaurants/${id}/approve`);
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

export const fetchUpdateBlock = createAsyncThunk(
  "admin/fetchUpdateBlock",
  async ({ id }, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.patch(`/admin/restaurants/${id}/block`);
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

export const fetchUpdateUnblock = createAsyncThunk(
  "admin/fetchUpdateUnblock",
  async ({ id }, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.patch(`/admin/restaurants/${id}/unblock`);
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

export const fetchAllUsers = createAsyncThunk(
  "auth/fetchAllUsers",
  async (searchText, { rejectWithValue }) => {
    try {
      const url=searchText?`/admin/users?search=${searchText}`:`/admin/users`
      const res = await axiosInstance.get(url);
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

export const BlockUser = createAsyncThunk(
  "admin/blockUser",
  async ({ id }, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.patch(`/admin/users/${id}/block`);
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

export const UnblockUser = createAsyncThunk(
  "admin/UnblockUser",
  async ({ id }, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.patch(`/admin/users/${id}/unblock`);
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

const AdminSlice = createSlice({
  name: "admin",
  initialState: {
    restaurants: [],
    pendingRestaurants: [],
    loading: false,
    error: null,
    users: [],
  },
  extraReducers: (builder) => {
    builder.addCase(fetchAdminRestaurants.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(fetchAdminRestaurants.fulfilled, (state, action) => {
      state.restaurants = action.payload.allRestaurants;
      state.error = null;
      state.loading = false;
    });
    builder.addCase(fetchAdminRestaurants.rejected, (state, action) => {
      state.error = action.payload;
      state.loading = false;
    });
    builder.addCase(fetchPendingRestaurants.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(fetchPendingRestaurants.fulfilled, (state, action) => {
      state.pendingRestaurants = action.payload.pendingRestaurants;
      state.loading = false;
      state.error = null;
    });
    builder.addCase(fetchPendingRestaurants.rejected, (state, action) => {
      state.error = action.payload;
      state.loading = false;
    });
    builder.addCase(fetchUpdateApprove.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(fetchUpdateApprove.fulfilled, (state, action) => {
      state.loading = false;
      state.error = null;
    });
    builder.addCase(fetchUpdateApprove.rejected, (state, action) => {
      state.error = action.payload;
      state.loading = false;
    });
    builder.addCase(fetchUpdateBlock.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(fetchUpdateBlock.fulfilled, (state, action) => {
      state.loading = false;
      state.error = null;
    });
    builder.addCase(fetchUpdateBlock.rejected, (state, action) => {
      state.error = action.payload;
      state.loading = false;
    });
    builder.addCase(fetchUpdateUnblock.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(fetchUpdateUnblock.fulfilled, (state, action) => {
      state.loading = false;
      state.error = null;
    });
    builder.addCase(fetchUpdateUnblock.rejected, (state, action) => {
      state.error = action.payload;
      state.loading = false;
    });
    builder.addCase(fetchAllUsers.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(fetchAllUsers.fulfilled, (state, action) => {
      state.loading = false;
      state.error = null;
      state.users = action.payload.allUsers;
    });
    builder.addCase(fetchAllUsers.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
    builder.addCase(BlockUser.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(BlockUser.fulfilled, (state, action) => {
      state.loading = false;
      state.error = null;
      const updatedUser = action.payload.changedUser;
      state.users = state.users.map((user) =>
        user._id === updatedUser._id ? updatedUser : user
      );
    });
    builder.addCase(BlockUser.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
    builder.addCase(UnblockUser.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(UnblockUser.fulfilled, (state, action) => {
      state.loading = false;
      state.error = null;
      const updatedUser = action.payload.user;
      state.users = state.users.map((user) =>
        user._id === updatedUser._id ? updatedUser : user
      );
    });
    builder.addCase(UnblockUser.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
  },
});

export default AdminSlice.reducer;
