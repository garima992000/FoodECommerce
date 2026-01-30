import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../../Utils/axiosInstance";

export const fetchRestaurants = createAsyncThunk(
  "restaurant/fetchRestaurants",
  async (searchText='', { rejectWithValue }) => {
    try {
      const url=searchText?`/restaurants?search=${searchText}`:`/restaurants`;
      const res = await axiosInstance.get(url);
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

export const fetchOwnerRestaurants=createAsyncThunk(
  "restaurant/fetOwnerRestaurants",
  async(_,{rejectWithValue})=>{
    try {
      const res=await axiosInstance.get('/restaurants/my');
      return res.data;
    } catch (error) {
        return rejectWithValue(error.response?.data?.message || error.message);

    }
  }
)

export const createRestaurant=createAsyncThunk(
  "restaurant/create",
  async(data,{rejectWithValue})=>{
    try {
      const res=await axiosInstance.post('/restaurants',data);
      return res.data;
    } catch (error) {
        return rejectWithValue(error.response?.data?.message || error.message);

    }
  }
)

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
    builder.addCase(fetchOwnerRestaurants.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(fetchOwnerRestaurants.fulfilled, (state, action) => {
      state.loading = false;
      state.restaurants = action.payload.restaurant;
    });
    builder.addCase(fetchOwnerRestaurants.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
    builder.addCase(createRestaurant.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(createRestaurant.fulfilled, (state, action) => {
      state.loading = false;
      state.restaurants = action.payload.restaurant;
    });
    builder.addCase(createRestaurant.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
  },
});

export default RestaurantSlice.reducer;
