import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./slices/auth";
import lessonSlice from "./slices/lesson";
import questionSlice from "./slices/questions";

export const store = configureStore({
  reducer: {
    auth: authSlice,
    lessons: lessonSlice,
    question: questionSlice,
  },
});
