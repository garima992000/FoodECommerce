import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../../Utils/axiosInstance";

export const fetchMenu = createAsyncThunk(
  "menu/fetchMenu",
  async (restaurantId, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.get(`/restaurants/${restaurantId}/menu`);
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

export const fetchOwnerMenu = createAsyncThunk(
  "menu/fetchOwnerMenu",
  async (restaurantId, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.get(`/restaurants/${restaurantId}/foods`);
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

export const addFood = createAsyncThunk(
  "menu/addFood",
  async ({data, restaurantId}, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.post(
        `/restaurants/${restaurantId}/foods`,
        data
      );
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

export const updateFood=createAsyncThunk(
  "menu/updateFood",
  async({data,foodId},{rejectWithValue})=>{
    try {
      const res=await axiosInstance.patch(`/foods/${foodId}`,data);
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);

    }
  }
)

export const deleteFood=createAsyncThunk(
  "menu/deleteFood",
  async({foodId},{rejectWithValue})=>{
    try {
      const res=await axiosInstance.delete(`/foods/${foodId}`);
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
 
    }
  }
)
const initialState = {
  menuItems: [],
  loading: false,
  error: null,
};
const MenuSlice = createSlice({
  name: "menu",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(fetchMenu.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(fetchMenu.fulfilled, (state, action) => {
      state.menuItems = action.payload.menuItems;
      state.loading = false;
    });
    builder.addCase(fetchMenu.rejected, (state, action) => {
      state.error = action.payload;
      state.loading = false;
    });
    builder.addCase(fetchOwnerMenu.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(fetchOwnerMenu.fulfilled, (state, action) => {
      state.menuItems = action.payload.foodItems;
      state.loading = false;
    });
    builder.addCase(fetchOwnerMenu.rejected, (state, action) => {
      state.error = action.payload;
      state.loading = false;
    });
    builder.addCase(addFood.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(addFood.fulfilled, (state, action) => {
      if (action.payload?.foodItem) {
    state.menuItems.push(action.payload.foodItem);
  }
      state.loading = false;
      state.error=null;
    });
    builder.addCase(addFood.rejected, (state, action) => {
      state.error = action.payload;
      state.loading = false;
    });
    builder.addCase(updateFood.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(updateFood.fulfilled, (state, action) => {
      const updatedFoodItem=action.payload.updatedFoodItem;
      state.menuItems=state.menuItems.map((item)=>(
        item._id===updatedFoodItem._id?updatedFoodItem:item
      ))
      state.loading = false;
      state.error=null;
    });
    builder.addCase(updateFood.rejected, (state, action) => {
      state.error = action.payload;
      state.loading = false;
    });
     builder.addCase(deleteFood.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(deleteFood.fulfilled, (state, action) => {
      const deletedId=action.payload.deletedFoodId;
      state.menuItems=state.menuItems.filter(item=>(
        item.id!=deletedId
      ))
      state.loading = false;
      state.error=null;
    });
    builder.addCase(deleteFood.rejected, (state, action) => {
      state.error = action.payload;
      state.loading = false;
    });
  },
});

export default MenuSlice.reducer;
