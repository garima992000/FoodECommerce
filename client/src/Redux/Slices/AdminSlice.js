import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../../Utils/axiosInstance";

export const fetchAdminRestaurants=createAsyncThunk(
    'admin/fetchAdminRestaurants',
    async(_,{rejectWithValue})=>{
        try {
            const res=await axiosInstance.get('/admin/restaurants');
            return res.data;
        } catch (error) {
        return rejectWithValue(error.response?.data?.message || error.message);
        }
    }
)
const AdminSlice=createSlice({
    name:'admin',
    initialState:{
        restaurants:[],
        loading:false,
        error:null
    },
    extraReducers:(builder)=>{
        builder.addCase(fetchAdminRestaurants.pending,(state)=>{
            state.loading=true;
            state.error=null
        })
        builder.addCase(fetchAdminRestaurants.fulfilled,(state,action)=>{
            state.restaurants=action.payload.allRestaurants;
            state.error=null;
            state.loading=false;
        })
        builder.addCase(fetchAdminRestaurants.rejected,(state,action)=>{
            state.error=action.payload;
            state.loading=false;
        })
    }
})

export default AdminSlice.reducer;