import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../../Utils/axiosInstance";
export const placeOrder = createAsyncThunk(
  "order/placeOrder",
  async (_, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.post("/orders");
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

export const getMyOrders = createAsyncThunk(
  "order/getMyOrders",
  async (_, { rejectWithValue }) => {
    try {
        const res=await axiosInstance.get('/orders/my');
        return res.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

export const fetchOwnerOrders=createAsyncThunk(
  "order/fetchOwnerOrders",
  async(_,{rejectWithValue})=>{
    try {
      const res=await axiosInstance.get('/restaurant/orders');
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);

    }
  }
)

export const updateOrderStatus=createAsyncThunk(
  "order/updateOrderStatus",
  async({orderId,newStatus},{rejectWithValue})=>{
    try {
      const res=await axiosInstance.patch(`/orders/${orderId}/status`,{newStatus});
      return res.data;
    } catch (error) {
            return rejectWithValue(error.response?.data?.message || error.message);

    }
  }
)
const OrderSlice = createSlice({
  name: "order",
  initialState: {
    loading: false,
    error: null,
    totalAmount: 0,
    success: false,
    orders: [],
    
  },
  extraReducers: (builder) => {
    builder.addCase(placeOrder.pending, (state) => {
      state.loading = true;
      state.error = null;
      state.success = false;
    });
    builder.addCase(placeOrder.fulfilled, (state, action) => {
      state.order = action.payload.order;
      state.success = true;
    });
    builder.addCase(placeOrder.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
      state.success = false;
    });
    builder.addCase(getMyOrders.pending, (state) => {
      state.loading = true;
      state.error = null;
      state.success = false;
    });
    builder.addCase(getMyOrders.fulfilled, (state, action) => {
      state.orders = action.payload.orders;
      state.success = true;
      state.loading=false
    });
    builder.addCase(getMyOrders.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
      state.success = false;
    });
    builder.addCase(fetchOwnerOrders.pending, (state) => {
      state.loading = true;
      state.error = null;
      state.success = false;
    });
    builder.addCase(fetchOwnerOrders.fulfilled, (state, action) => {
      state.orders = action.payload.orders;
      state.success = true;
      state.loading=false
    });
    builder.addCase(fetchOwnerOrders.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
      state.success = false;
    });
    builder.addCase(updateOrderStatus.pending, (state) => {
      state.loading = true;
      state.error = null;
      state.success = false;
    });
    builder.addCase(updateOrderStatus.fulfilled, (state, action) => {
      state.orders = action.payload.orders;
      state.success = true;
      state.loading=false
    });
    builder.addCase(updateOrderStatus.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
      state.success = false;
      const updatedOrder=action.payload.orders;
      state.orders.map((order)=>(
        order._id===updatedOrder._id?updatedOrder:order
      ))
    });
  },
});

export default OrderSlice.reducer;
