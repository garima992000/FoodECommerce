import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../../Utils/axiosInstance";
import { placeOrder } from "./OrderSlice";

export const addToCart = createAsyncThunk(
  "cart/addToCart",
  async ({ foodId, quantity }, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.post("/cart/add", { foodId, quantity });
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  },
);
export const getCart = createAsyncThunk(
  "cart/getCart",
  async (_, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.get("/cart");
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  },
);
export const deleteCart = createAsyncThunk(
  "cart/deleteCart",
  async (foodId, { rejectWithValue }) => {
    try {
      await axiosInstance.delete(`/cart/item/${foodId}`);
      const res = await axiosInstance.get("/cart");

      return res.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  },
);

export const updateCart = createAsyncThunk(
  "cart/updateCart",
  async ({ foodId, quantity }, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.patch(`/cart/item/${foodId}`, {
        quantity,
      });
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  },
);

export const removeCart = createAsyncThunk(
  "cart/removeCart",
  async (_, { rejectWithValue }) => {
    try {
      await axiosInstance.delete("/cart/clear");
      const res = await axiosInstance.get("/cart");

      return res.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  },
);
const CartSlice = createSlice({
  name: "cart",
  initialState: {
    items: [],
    restaurantId: null,
    totalAmount: 0,
    discountPrice: 0,
    originalAmount: 0,
    loading: false,
    error: null,
  },
  extraReducers: (builder) => {
    builder.addCase(addToCart.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(addToCart.fulfilled, (state, action) => {
      state.items = action.payload.cart.items;
      state.loading = false;
      state.error = null;
      state.totalAmount = action.payload.cart.totalAmount;
      state.originalAmount = action.payload.cart.originalAmount;
      state.discountPrice = action.payload.cart.discountPrice;
      state.restaurantId = action.payload.cart.restaurantId;
    });
    builder.addCase(addToCart.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
    builder.addCase(getCart.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(getCart.fulfilled, (state, action) => {
      state.loading = false;
      state.error = null;
      state.items = action.payload.items;
      state.totalAmount = action.payload.totalAmount;
      state.originalAmount = action.payload.originalAmount;
      state.discountPrice = action.payload.discountPrice;
      state.restaurantId = action.payload.restaurantId;
    });
    builder.addCase(getCart.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
    builder.addCase(updateCart.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(updateCart.rejected, (state, action) => {
      state.error = action.payload;
      state.loading = false;
    });
    builder.addCase(updateCart.fulfilled, (state, action) => {
      state.loading = false;
      state.error = null;
      state.items = action.payload.items;
      state.totalAmount = action.payload.totalAmount;
      state.originalAmount = action.payload.originalAmount;
      state.discountPrice = action.payload.discountPrice;
      state.restaurantId = action.payload.restaurantId;
    });
    builder.addCase(deleteCart.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(deleteCart.rejected, (state, action) => {
      state.error = action.payload;
      state.loading = false;
    });
    builder.addCase(deleteCart.fulfilled, (state, action) => {
      state.loading = false;
      state.error = null;
      state.items = action.payload.cart.items;
      state.totalAmount = action.payload.cart.totalAmount;
      state.originalAmount = action.payload.cart.originalAmount;
      state.discountPrice = action.payload.cart.discountPrice;
      state.restaurantId = action.payload.cart.restaurantId;
    });
    builder.addCase(removeCart.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(removeCart.rejected, (state, action) => {
      state.error = action.payload;
      state.loading = false;
    });
    builder.addCase(removeCart.fulfilled, (state, action) => {
      state.loading = false;
      state.error = null;
      state.items = action.payload.items;
      state.totalAmount = action.payload.totalAmount;
      state.originalAmount = action.payload.originalAmount;
      state.discountPrice = action.payload.discountPrice;
      state.restaurantId = action.payload.restaurantId;
    });
    builder.addCase(placeOrder.fulfilled, (state) => {
      state.items = [];
      state.totalAmount = 0;
      state.originalAmount = 0;
      state.discountPrice = 0;
      state.restaurantId = null;
    });
  },
});

export default CartSlice.reducer;
