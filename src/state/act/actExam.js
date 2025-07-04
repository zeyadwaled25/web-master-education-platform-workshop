import { createAsyncThunk } from "@reduxjs/toolkit";
import { eduAPI } from "../../utils/axiosInstance";

export const addExam = createAsyncThunk(
  "examSlice/addExam",
  async (examData, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;

    try {
      const res = await eduAPI.post(`exam`, examData, {
        headers: {
          token: localStorage.getItem("token"), // or 'Authorization': `Bearer ${token}` if using Bearer format
        },
      });
      console.log("from slice res is");
      console.log(res);
      return res;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);
export const updateExam = createAsyncThunk(
  "examSlice/updateExam",
  async ({ examId, ...examData }, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;

    try {
      const res = await eduAPI.put(`exam/${examId}`, examData, {
        headers: {
          token: localStorage.getItem("token"), // or 'Authorization': `Bearer ${token}` if using Bearer format
        },
      });
      console.log("from slice res is");
      console.log(res);
      return res;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);
export const getAllExams = createAsyncThunk(
  "examSlice/getAllExams",
  async (_, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;

    try {
      const res = await eduAPI.get(`exam`, {
        headers: {
          token: localStorage.getItem("token"), // or 'Authorization': `Bearer ${token}` if using Bearer format
        },
      });
      console.log("from slice res is");
      console.log(res);
      return res;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const getSpecificExam = createAsyncThunk(
  "examSlice/getSpecificExam",
  async ({ examId }, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;

    try {
      const res = await eduAPI.get(`exam/${examId}`, {
        headers: {
          token: localStorage.getItem("token"), // or 'Authorization': `Bearer ${token}` if using Bearer format
        },
      });
      console.log("from slice res is");
      console.log(res);
      return res;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);
export const deleteExam = createAsyncThunk(
  "examSlice/deleteExam",
  async ({ examId }, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;

    try {
      const res = await eduAPI.delete(`exam/${examId}`, {
        headers: {
          token: localStorage.getItem("token"), // or 'Authorization': `Bearer ${token}` if using Bearer format
        },
      });
      console.log("from slice res is");
      console.log(res);
      return res;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);
