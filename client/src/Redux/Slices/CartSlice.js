import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../../Utils/axiosInstance";


export const addToCart=createAsyncThunk(
    'cart/addToCart',
    async( {foodId,quantity},{ rejectWithValue })=>{
        try {
            const res=await axiosInstance.post('/cart/add',{foodId,quantity});
            return res.data;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || error.message);
        }
    }
)
export const getCart=createAsyncThunk(
    'cart/getCart',
    async(_,{rejectWithValue})=>{
        try {
            const res=axiosInstance.get('/cart');
            return res.data;
        } catch (error) {
         return rejectWithValue(error.response?.data?.message || error.message);
 
        }
    }
)
const CartSlice=createSlice({
    name:'cart',
    initialState:{
        items:[],
        restaurantId:null,
        totalAmount:0,
        loading:false,
        error:null
    },
    extraReducers:(builder)=>{
        builder.addCase(addToCart.pending,(state)=>{
            state.loading=true;
            state.error=null;
        })
        builder.addCase(addToCart.fulfilled,(state,action)=>{
            state.items=action.payload.cart.items;
            state.loading=false;
            state.error=null;
            state.totalAmount=action.payload.cart.totalAmount;
            state.restaurantId=action.payload.cart.restaurantId;
        })
        builder.addCase(addToCart.rejected,(state,action)=>{
            console.log("ADD TO CART PAYLOAD:", action.payload);
            state.loading=false;
            state.error=action.payload;
        })
    }
})

export default CartSlice.reducer;