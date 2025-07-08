import { createSlice } from "@reduxjs/toolkit";

import { signUp, logIn, verify } from "../act/actAuth";
import UseInitialStates from "../../hooks/use-initial-state";
import {
  addLesson,
  deleteLesson,
  getLesson,
  getLessons,
  getLessonsAdmin,
  getPurchasedLessons,
  payLesson,
  updateLesson,
} from "../act/actLessons";
const { initialStateLesson } = UseInitialStates();

export const lessonSlice = createSlice({
  name: "lessonSlice",
  initialState: initialStateLesson,
  reducers: {},
  extraReducers: (builder) => {
    builder

      .addCase(addLesson.pending, (state, action) => {
        state.loadingAddLessson = true;
        state.lessonsError = "";
      })
      .addCase(addLesson.fulfilled, (state, action) => {
        state.loadingAddLessson = false;
        console.log(action.payload);
        state.lessonsError = "";
      })
      .addCase(addLesson.rejected, (state, action) => {
        state.loadingAddLessson = false;
        state.lessonsError = action.payload?.response?.data?.message;
      })
      .addCase(updateLesson.pending, (state, action) => {
        state.loadingUpdateLesson = true;
        state.lessonsError = "";
      })
      .addCase(updateLesson.fulfilled, (state, action) => {
        state.loadingUpdateLesson = false;
        state.lessonsError = "";
        console.log(action.payload);
      })
      .addCase(updateLesson.rejected, (state, action) => {
        state.loadingUpdateLesson = false;
        state.lessonsError = action.payload?.response?.data?.message;
      })
      .addCase(getLessonsAdmin.pending, (state, action) => {
        state.loadingGetLessonsAdmin = true;
        state.lessonsError = "";
      })
      .addCase(getLessonsAdmin.fulfilled, (state, action) => {
        state.loadingGetLessonsAdmin = false;
        state.lessonsError = "";
        console.log(action.payload);
        state.lessonsAdmin = action.payload.data;
      })
      .addCase(getLessonsAdmin.rejected, (state, action) => {
        state.loadingGetLessonsAdmin = false;
        state.lessonsError = action.payload?.response?.data?.message;
      })
      .addCase(getLessons.pending, (state, action) => {
        state.loadingGetLessons = true;
        state.lessonsError = "";
      })
      .addCase(getLessons.fulfilled, (state, action) => {
        state.loadingGetLessons = false;
        console.log(action.payload);
        state.lessonsError = "";
        state.lessons = action.payload.data;
      })
      .addCase(getLessons.rejected, (state, action) => {
        state.loadingGetLessons = false;
        state.lessonsError = action.payload?.response?.data?.message;
      })
      .addCase(getLesson.pending, (state, action) => {
        state.loadingGetLesson = true;
        state.lessonsError = "";
      })
      .addCase(getLesson.fulfilled, (state, action) => {
        state.loadingGetLesson = false;
        console.log(action.payload);
        state.lessonsError = "";
        state.specificLesson = action.payload.data;
      })
      .addCase(getLesson.rejected, (state, action) => {
        state.loadingGetLesson = false;
        state.lessonsError = action.payload?.response?.data?.message;
      })
      .addCase(getPurchasedLessons.pending, (state, action) => {
        state.loadingGetPurchased = true;
        state.lessonsError = "";
      })
      .addCase(getPurchasedLessons.fulfilled, (state, action) => {
        state.loadingGetPurchased = false;
        state.lessonsError = "";
        console.log(action.payload);
        state.purchasedLessons = action.payload.data;
      })
      .addCase(getPurchasedLessons.rejected, (state, action) => {
        state.loadingGetPurchased = false;
        state.lessonsError = action.payload?.response?.data?.message;
      })
      .addCase(deleteLesson.pending, (state, action) => {
        state.loadingDeleteLesson = true;
        state.lessonsError = "";
      })
      .addCase(deleteLesson.fulfilled, (state, action) => {
        state.loadingDeleteLesson = false;
        console.log(action.payload);
        state.lessonsError = "";
        console.log("action.meta", action.meta.arg.lessonId);
        state.lessons = state.lessons.filter(
          (lesson) => lesson._id !== action.meta.arg.lessonId
        );
      })
      .addCase(deleteLesson.rejected, (state, action) => {
        state.loadingDeleteLesson = false;
        state.lessonsError = action.payload?.response?.data?.message;
      })
      .addCase(payLesson.pending, (state, action) => {
        state.loadingpayLesson = true;
        state.lessonsError = "";
      })
      .addCase(payLesson.fulfilled, (state, action) => {
        state.loadingpayLesson = false;
        state.lessonMessage = action.payload.message;
        state.paymentUrl = action.payload.paymentUrl;
        console.log(action.payload);
        state.lessonsError = "";
      })
      .addCase(payLesson.rejected, (state, action) => {
        state.loadingpayLesson = false;
        state.lessonsError = action.payload?.response?.data?.message;
      });
  },
});

export default lessonSlice.reducer;
export { getLessons };
