import { createAsyncThunk } from "@reduxjs/toolkit";
import { eduAPI } from "../../utils/axiosInstance";

export const signUp = createAsyncThunk(
  "authSlice/signUp",
  async (userData, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;

    try {
      const res = await eduAPI.post("auth/signup", userData);
      console.log("from slice res is");
      console.log(res);
      return res;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);
export const logIn = createAsyncThunk(
  "authSlice/logIn",
  async (userData, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;

    try {
      const res = await eduAPI.post("auth/login", userData);
      console.log("from slice res is");
      console.log(res);
      return res;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);
export const verify = createAsyncThunk(
  "authSlice/verify",
  async ({ token }, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;

    try {
      const res = await eduAPI.post(`auth/verify/${token}`, userData);
      console.log("from slice res is");
      console.log(res);
      return res;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);
export const forgotPassword = createAsyncThunk(
  "authSlice/forgotPassword",
  async ({ email }, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;

    try {
      const res = await eduAPI.post(`user/forgot-password`, { email });
      console.log("from slice res is");
      console.log(res);
      return res;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);
export const resetPassword = createAsyncThunk(
  "authSlice/resetPassword",
  async (data, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;

    try {
      const res = await eduAPI.post(`user/reset-password`, data);
      console.log("from slice res is");
      console.log(res);
      return res;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);
