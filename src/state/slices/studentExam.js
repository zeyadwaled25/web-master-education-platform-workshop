import { createSlice } from "@reduxjs/toolkit";

import UseInitialStates from "../../hooks/use-initial-state";

import {
  getExamScoreToStudent,
  remainingTime,
  submitExam,
  getExamScoreAdmin,
  startExam,
} from "../act/actStudentExam";
const { initialStateStudentExam } = UseInitialStates();

export const studentExamSlice = createSlice({
  name: "studentExamSlice",
  initialState: initialStateStudentExam,
  reducers: {},
  extraReducers: (builder) => {
    builder

      .addCase(startExam.pending, (state, action) => {
        state.loadingStartExam = true;
      })
      .addCase(startExam.fulfilled, (state, action) => {
        state.loadingStartExam = false;
        state.studentExamData = action.payload.data;
        console.log(action.payload);
      })
      .addCase(startExam.rejected, (state, action) => {
        state.loadingStartExam = false;
        state.studentExamError = action.payload.response.data.message;
      })
      .addCase(submitExam.pending, (state, action) => {
        state.loadingSubmitExam = true;
      })
      .addCase(submitExam.fulfilled, (state, action) => {
        state.loadingSubmitExam = false;
        state.specificExamScore = action.payload.data;
        console.log(action.payload);
      })
      .addCase(submitExam.rejected, (state, action) => {
        state.loadingSubmitExam = false;
        state.studentExamError = action.payload.response.data.message;
      })
      .addCase(remainingTime.pending, (state, action) => {
        state.loadingGetRemainingTime = true;
      })
      .addCase(remainingTime.fulfilled, (state, action) => {
        state.loadingGetRemainingTime = false;
        console.log(action.payload);
        state.remainingTime = action.payload.data;
      })
      .addCase(remainingTime.rejected, (state, action) => {
        state.loadingGetRemainingTime = false;
        state.studentExamError = action.payload.response.data.message;
      })
      .addCase(getExamScoreAdmin.pending, (state, action) => {
        state.loadingGetExamScoreAdmin = true;
      })
      .addCase(getExamScoreAdmin.fulfilled, (state, action) => {
        state.loadingGetExamScoreAdmin = false;
        console.log(action.payload);
        state.adminExamsScore = action.payload.data;
      })
      .addCase(getExamScoreAdmin.rejected, (state, action) => {
        state.loadingGetExamScoreAdmin = false;
        state.studentExamError = action.payload.response.data.message;
      })
      .addCase(getExamScoreToStudent.pending, (state, action) => {
        state.loadingGetExamScoreStudent = true;
      })
      .addCase(getExamScoreToStudent.fulfilled, (state, action) => {
        state.loadingGetExamScoreStudent = false;
        console.log(action.payload);
        state.studentScore = action.payload.data;
      })
      .addCase(getExamScoreToStudent.rejected, (state, action) => {
        state.loadingGetExamScoreStudent = false;
        state.studentExamError = action.payload.response.data.message;
      });
  },
});

export default studentExamSlice.reducer;
