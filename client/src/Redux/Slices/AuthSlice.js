import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from 'axios'
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
const initialState = {
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
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
