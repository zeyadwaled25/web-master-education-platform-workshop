import { createSlice } from "@reduxjs/toolkit";

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
import {
  addQuestion,
  deleteQuestion,
  getQuestions,
  getSpecificQuestion,
  updateQuestion,
} from "../act/actQuestions";
const { initialStateQuestion } = UseInitialStates();

export const questionSlice = createSlice({
  name: "questionSlice",
  initialState: initialStateQuestion,
  reducers: {},
  extraReducers: (builder) => {
    builder

      .addCase(addQuestion.pending, (state, action) => {
        state.loadingAddQuestion = true;
      })
      .addCase(addQuestion.fulfilled, (state, action) => {
        state.loadingAddQuestion = false;
        console.log(action.payload);
      })
      .addCase(addQuestion.rejected, (state, action) => {
        state.loadingAddQuestion = false;
        state.questionError = action.payload.response.data.message;
      })
      .addCase(updateQuestion.pending, (state, action) => {
        state.loadingEditQuestion = true;
      })
      .addCase(updateQuestion.fulfilled, (state, action) => {
        state.loadingEditQuestion = false;
        console.log(action.payload);
      })
      .addCase(updateQuestion.rejected, (state, action) => {
        state.loadingEditQuestion = false;
        state.questionError = action.payload.response.data.message;
      })
      .addCase(getQuestions.pending, (state, action) => {
        state.loadingGetQuestions = true;
      })
      .addCase(getQuestions.fulfilled, (state, action) => {
        state.loadingGetQuestions = false;
        console.log(action.payload);
        state.allQuestions = action.payload.data;
      })
      .addCase(getQuestions.rejected, (state, action) => {
        state.loadingGetQuestions = false;
        state.questionError = action.payload.response.data.message;
      })
      .addCase(getSpecificQuestion.pending, (state, action) => {
        state.loadingGetQuestion = true;
      })
      .addCase(getSpecificQuestion.fulfilled, (state, action) => {
        state.loadingGetQuestion = false;
        console.log(action.payload);
        state.specificQuestion = action.payload.data;
      })
      .addCase(getSpecificQuestion.rejected, (state, action) => {
        state.loadingGetQuestion = false;
        state.questionError = action.payload.response.data.message;
      })
      .addCase(deleteQuestion.pending, (state, action) => {
        state.loadingDeleteQuestion = true;
      })
      .addCase(deleteQuestion.fulfilled, (state, action) => {
        state.loadingDeleteQuestion = false;
        console.log(action.payload);
      })
      .addCase(deleteQuestion.rejected, (state, action) => {
        state.loadingDeleteQuestion = false;
        state.questionError = action.payload.response.data.message;
      });
  },
});

export default questionSlice.reducer;
