import { createAsyncThunk } from "@reduxjs/toolkit";
import { eduAPI } from "../../utils/axiosInstance";

export const addLesson = createAsyncThunk(
  "lessonSlice/addLesson",
  async (lessonData, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;

    try {
      const res = await eduAPI.post("lesson", lessonData, {
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
export const updateLesson = createAsyncThunk(
  "lessonSlice/updateLesson",
  async ({ lessonId, ...lessonData }, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;

    try {
      const res = await eduAPI.put(`lesson/${lessonId}`, lessonData, {
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
export const getLesson = createAsyncThunk(
  "lessonSlice/getLesson",
  async ({ lessonId }, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;

    try {
      const res = await eduAPI.get(`lesson/${lessonId}`, {
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
export const getPurchasedLessons = createAsyncThunk(
  "lessonSlice/getPurchasedLessons",
  async (_, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;

    try {
      const res = await eduAPI.get(`lesson/my/purchased`, {
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

export const deleteLesson = createAsyncThunk(
  "lessonSlice/deleteLesson",
  async ({ lessonId }, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;

    try {
      const res = await eduAPI.delete(`lesson/${lessonId}`, {
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
export const payLesson = createAsyncThunk(
  "lessonSlice/payLesson",
  async ({ lessonId }, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;

    try {
      const res = await eduAPI.post(`lesson/pay/${lessonId}`, {}, {
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
export const getLessonsAdmin = createAsyncThunk(
  "lessonSlice/getLessonsAdmin",
  async ({ classLevel, isPaid, title, sortBy, sortOrder }, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;

    try {
      // Build query parameters object, only including truthy values
      const params = {};
      if (classLevel) params.classLevel = classLevel;
      if (isPaid !== undefined && isPaid !== null) params.isPaid = isPaid; // Handle boolean false
      if (title) params.title = title;
      if (sortBy) params.sortBy = sortBy;
      if (sortOrder) params.sortOrder = sortOrder;

      // Convert params object to query string
      const queryString = new URLSearchParams(params).toString();
      const url = queryString ? `lesson/?${queryString}` : "lesson";

      const res = await eduAPI.get(url, {
        headers: {
          token: localStorage.getItem("token"),
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
export const getLessons = createAsyncThunk(
  "lessonSlice/getLessons",
  async (
    {
      isPaid,
      title,
      sortBy,
      sortOrder,
      priceMin,
      priceMax,
      scheduledAfter,
      limit,
      page,
    },
    thunkAPI
  ) => {
    const { rejectWithValue } = thunkAPI;

    try {
      // Build query parameters object, only including truthy values
      const params = {};
      if (isPaid !== undefined && isPaid !== null) params.isPaid = isPaid; // Handle boolean false
      if (title) params.title = title;
      if (sortBy) params.sortBy = sortBy;
      if (sortOrder) params.sortOrder = sortOrder;
      if (priceMin) params.priceMin = priceMin;
      if (priceMax) params.priceMax = priceMax;
      if (scheduledAfter) params.scheduledAfter = scheduledAfter;
      if (page) params.page = page;
      if (limit) params.limit = limit;

      // Convert params object to query string
      const queryString = new URLSearchParams(params).toString();
      const url = queryString ? `lesson/?${queryString}` : "lesson";

      const res = await eduAPI.get(url, {
        headers: {
          token: localStorage.getItem("token"),
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
