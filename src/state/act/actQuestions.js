import { createAsyncThunk } from "@reduxjs/toolkit";
import { eduAPI } from "../../utils/axiosInstance";

export const addQuestion = createAsyncThunk(
  "questionSlice/addQuestion",
  async (questionData, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;

    try {
      const res = await eduAPI.post("question", questionData, {
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
export const updateQuestion = createAsyncThunk(
  "questionSlice/updateQuestion",
  async ({ questionId, ...questionData }, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;

    try {
      const res = await eduAPI.put(`question/${questionId}`, questionData, {
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
export const deleteQuestion = createAsyncThunk(
  "questionSlice/deleteQuestion",
  async ({ questionId }, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;

    try {
      const res = await eduAPI.delete(`question/${questionId}`, {
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

export const getQuestions = createAsyncThunk(
  "questionSlice/getQuestions",
  async (_, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;

    try {
      const res = await eduAPI.get("question", {
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
export const getSpecificQuestion = createAsyncThunk(
  "questionSlice/getSpecificQuestion",
  async ({ questionId }, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;

    try {
      const res = await eduAPI.get(`question/${questionId}`, {
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
