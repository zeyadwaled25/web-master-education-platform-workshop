import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./slices/auth";
import lessonSlice from "./slices/lesson";
import questionSlice from "./slices/questions";
import examSlice from "./slices/exam";
import studentExamSlice from "./slices/studentExam";

export const store = configureStore({
  reducer: {
    auth: authSlice,
    lessons: lessonSlice,
    question: questionSlice,
    exam: examSlice,
    studentExam: studentExamSlice,
  },
});
