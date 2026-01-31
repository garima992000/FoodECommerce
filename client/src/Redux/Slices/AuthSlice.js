import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from 'axios'
import axiosInstance from "../../Utils/axiosInstance";
export const loginUser = createAsyncThunk(
  "auth/login",
  async (loginData, { rejectWithValue }) => {
    try {
      const res = await axios.post(
        "http://localhost:7000/food/auth/login",
        loginData
      );
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

export const registerUser=createAsyncThunk(
  "auth/register",
  async(registerData,{rejectWithValue})=>{
    try {
      const res=await axiosInstance.post('/auth/register',registerData);
      return res.data;
    } catch (error) {
            return rejectWithValue(error.response?.data?.message || error.message);

    }
  }
)

export const me=createAsyncThunk(
  "auth/me",
  async(_ , {rejectWithValue})=>{
    try {
      const res=await axiosInstance.get('/auth/me');
      return res.data;
    } catch (error) {
                  return rejectWithValue(error.response?.data?.message || error.message);

    }
  }
)


const initialState = {
  users:[],
  user:null,
  loading: false,
  error: null,
  token: localStorage.getItem("token") || null,
  role: localStorage.getItem("role") || null,
  isAuthenticated: !!localStorage.getItem("token"),
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.error = null;
      state.isAuthenticated = false;
      state.role = null;
      localStorage.removeItem("token");
      localStorage.removeItem("role");
    },
  },
  extraReducers: (builder) => {
    builder.addCase(loginUser.pending, (state) => {
      state.loading = true;
       state.error = null;
    });
    builder.addCase(loginUser.fulfilled, (state, action) => {
      state.loading = false;
      state.user = action.payload.user;
      state.role = action.payload.role;
      state.isAuthenticated = true;

      localStorage.setItem("token", action.payload.jwtToken);
      localStorage.setItem("role", action.payload.role);
    });
    builder.addCase(loginUser.rejected, (state, action) => {
      (state.loading = false), (state.error = action.payload);
    });
    builder.addCase(registerUser.pending,(state)=>{
      state.loading=true;
      state.error=null;
    })
    builder.addCase(registerUser.fulfilled,(state,action)=>{
      state.loading=false;
      state.error=null;
    })
    builder.addCase(registerUser.rejected,(state,action)=>{
      state.loading=false;
      state.error=action.payload;
    })
    builder.addCase(me.pending,(state)=>{
      state.loading=true;
      state.error=null;
    })
    builder.addCase(me.fulfilled,(state,action)=>{
      state.loading=false;
      state.error=null;
      state.user=action.payload.user;
    })
    builder.addCase(me.rejected,(state,action)=>{
      state.loading=false;
      state.error=action.payload;
    })
    
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
