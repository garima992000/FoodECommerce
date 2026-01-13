import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../../Utils/axiosInstance";

export const fetchRestaurants = createAsyncThunk(
  "restaurant/fetchRestaurants",
  async (_, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.get("/restaurants");
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

const initialState = {
  restaurants: [],
  loading: false,
  error: null,
};
const RestaurantSlice = createSlice({
  name: "restaurant",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(fetchRestaurants.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(fetchRestaurants.fulfilled, (state, action) => {
      state.loading = false;
      state.restaurants = action.payload.allRestaurants;
    });
    builder.addCase(fetchRestaurants.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
  },
});

export default RestaurantSlice.reducer;
