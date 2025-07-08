import { createSlice } from "@reduxjs/toolkit";

import UseInitialStates from "../../hooks/use-initial-state";

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
        state.questionError = "";
      })
      .addCase(addQuestion.fulfilled, (state, action) => {
        state.loadingAddQuestion = false;
        console.log(action.payload);
        state.questionError = "";
      })
      .addCase(addQuestion.rejected, (state, action) => {
        state.loadingAddQuestion = false;
        state.questionError = action.payload.response.data.message;
      })
      .addCase(updateQuestion.pending, (state, action) => {
        state.loadingEditQuestion = true;
        state.questionError = "";
      })
      .addCase(updateQuestion.fulfilled, (state, action) => {
        state.loadingEditQuestion = false;
        console.log(action.payload);
        state.questionError = "";
      })
      .addCase(updateQuestion.rejected, (state, action) => {
        state.loadingEditQuestion = false;
        state.questionError = action.payload.response.data.message;
      })
      .addCase(getQuestions.pending, (state, action) => {
        state.loadingGetQuestions = true;
        state.questionError = "";
      })
      .addCase(getQuestions.fulfilled, (state, action) => {
        state.loadingGetQuestions = false;
        state.questionError = "";
        console.log(action.payload);
        state.allQuestions = action.payload.data;
      })
      .addCase(getQuestions.rejected, (state, action) => {
        state.loadingGetQuestions = false;
        state.questionError = action.payload.response.data.message;
      })
      .addCase(getSpecificQuestion.pending, (state, action) => {
        state.loadingGetQuestion = true;
        state.questionError = "";
      })
      .addCase(getSpecificQuestion.fulfilled, (state, action) => {
        state.loadingGetQuestion = false;
        console.log(action.payload);
        state.questionError = "";
        state.specificQuestion = action.payload.data;
      })
      .addCase(getSpecificQuestion.rejected, (state, action) => {
        state.loadingGetQuestion = false;
        state.questionError = action.payload.response.data.message;
      })
      .addCase(deleteQuestion.pending, (state, action) => {
        state.loadingDeleteQuestion = true;
        state.questionError = "";
      })
      .addCase(deleteQuestion.fulfilled, (state, action) => {
        state.loadingDeleteQuestion = false;
        console.log(action.payload);
        state.questionError = "";
      })
      .addCase(deleteQuestion.rejected, (state, action) => {
        state.loadingDeleteQuestion = false;
        state.questionError = action.payload.response.data.message;
      });
  },
});

export default questionSlice.reducer;
