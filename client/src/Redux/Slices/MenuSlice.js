import { createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import axiosInstance from "../../Utils/axiosInstance";

export const fetchMenu=createAsyncThunk(
    'menu/fetchMenu',
    async(restaurantId,{rejectWithValue})=>{
        
        try {
            const res=await axiosInstance.get(`/restaurants/${restaurantId}/menu`);
        return res.data;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || error.message)
        }
    }
)
const initialState={
    menuItems:[],
    loading:false,
    error:null
}
const MenuSlice=createSlice({
    name:'menu',
    initialState,
    extraReducers:(builder)=>{
        builder.addCase(fetchMenu.pending,(state)=>{
            state.loading=true;
            state.error=null
        })
        builder.addCase(fetchMenu.fulfilled,(state,action)=>{
            state.menuItems=action.payload.menuItems;
            state.loading=false
        })
        builder.addCase(fetchMenu.rejected,(state,action)=>{
            state.error=action.payload;
            state.loading=false;
        })
    }
})

export default MenuSlice.reducer;