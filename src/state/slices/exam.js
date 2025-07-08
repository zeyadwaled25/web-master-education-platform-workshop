import { createSlice } from "@reduxjs/toolkit";

import UseInitialStates from "../../hooks/use-initial-state";

import {
  addExam,
  getAllExams,
  getSpecificExam,
  updateExam,
} from "../act/actExam";
const { initialStateExam } = UseInitialStates();

export const examSlice = createSlice({
  name: "examSlice",
  initialState: initialStateExam,
  reducers: {},
  extraReducers: (builder) => {
    builder

      .addCase(addExam.pending, (state, action) => {
        state.loadingAddExam = true;
        state.examError = "";
      })
      .addCase(addExam.fulfilled, (state, action) => {
        state.loadingAddExam = false;
        console.log(action.payload);
        state.examError = "";
      })
      .addCase(addExam.rejected, (state, action) => {
        state.loadingAddExam = false;
        state.examError = action.payload.response.data.message;
      })
      .addCase(updateExam.pending, (state, action) => {
        state.loadingEditExam = true;
        state.examError = "";
      })
      .addCase(updateExam.fulfilled, (state, action) => {
        state.loadingEditExam = false;
        console.log(action.payload);
        state.examError = "";
      })
      .addCase(updateExam.rejected, (state, action) => {
        state.loadingEditExam = false;
        state.examError = action.payload.response.data.message;
      })
      .addCase(getAllExams.pending, (state, action) => {
        state.loadingGetExams = true;
        state.examError = "";
      })
      .addCase(getAllExams.fulfilled, (state, action) => {
        state.loadingGetExams = false;
        console.log(action.payload);
        state.allExams = action.payload.data;
        state.examError = "";
      })
      .addCase(getAllExams.rejected, (state, action) => {
        state.loadingGetExams = false;
        state.examError = action.payload.response.data.message;
      })
      .addCase(getSpecificExam.pending, (state, action) => {
        state.loadingGetExam = true;
        state.examError = "";
      })
      .addCase(getSpecificExam.fulfilled, (state, action) => {
        state.loadingGetExam = false;
        console.log(action.payload);
        state.examError = "";
        state.specificExam = action.payload.data;
        state.examError = "";
      })
      .addCase(getSpecificExam.rejected, (state, action) => {
        state.loadingGetExam = false;
        state.examError = action.payload.response.data.message;
      });
  },
});

export default examSlice.reducer;
