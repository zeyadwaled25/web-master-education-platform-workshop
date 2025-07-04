import { createAsyncThunk } from "@reduxjs/toolkit";
import { eduAPI } from "../../utils/axiosInstance";

export const startExam = createAsyncThunk(
  "studentExamSlice/startExam",
  async ({ examId }, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;

    try {
      const res = await eduAPI.post(`studentExam/start/${examId}`, {
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
export const submitExam = createAsyncThunk(
  "studentExamSlice/submitExam",
  async ({ examId, ...examdData }, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;

    try {
      const res = await eduAPI.post(`studentExam/submit/${examId}`, examdData, {
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
export const remainingTime = createAsyncThunk(
  "studentExamSlice/remainingTime",
  async ({ examId }, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;

    try {
      const res = await eduAPI.get(`studentExam/remaining-time/${examId}`, {
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
export const getExamScoreAdmin = createAsyncThunk(
  "studentExamSlice/getExamScoreAdmin",
  async ({ examId }, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;

    try {
      const res = await eduAPI.get(`studentExam/exams/${examId}`, {
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
export const getExamScoreToStudent = createAsyncThunk(
  "studentExamSlice/getExamScoreToStudent",
  async ({ examId }, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;

    try {
      const res = await eduAPI.get(`studentExam/exams/score/${examId}`, {
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
