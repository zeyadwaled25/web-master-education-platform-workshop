import { createSlice } from "@reduxjs/toolkit";

import {
  signUp,
  logIn,
  verify,
  forgotPassword,
  resetPassword,
} from "../act/actAuth";
import UseInitialStates from "../../hooks/use-initial-state";
const { initialStateAuth } = UseInitialStates();

export const authSlice = createSlice({
  name: "authSlice",
  initialState: initialStateAuth,
  reducers: {
    handlelogOutState: (state) => {
      localStorage.removeItem("token");
      state.token = "";
      state.authMessage = "";
    },
  },
  extraReducers: (builder) => {
    builder

      .addCase(signUp.pending, (state, action) => {
        state.loadingAuth = true;
        state.error = "";
        state.authMessage = "";
      })
      .addCase(signUp.fulfilled, (state, action) => {
        state.loadingAuth = false;
        state.error = "";
        state.authMessage = action.payload.message;
        console.log(action.payload);
      })
      .addCase(signUp.rejected, (state, action) => {
        state.error = action.payload.response.data.message;
        state.loadingAuth = false;
        state.authMessage = "";
      })
      .addCase(logIn.pending, (state, action) => {
        state.loadingAuth = true;
        state.error = "";
        state.authMessage = "";
      })
      .addCase(logIn.fulfilled, (state, action) => {
        state.loadingAuth = false;
        state.error = "";
        console.log("from state", action.payload);
        state.authMessage = action.payload.message;
        localStorage.setItem("token", action.payload?.token);
        state.token = action.payload?.token;
      })
      .addCase(logIn.rejected, (state, action) => {
        state.error = action.payload.response.data.message;
        state.loadingAuth = false;
        state.authMessage = "";
      })
      .addCase(verify.pending, (state, action) => {
        state.loadingAuth = true;
        state.error = "";
        state.authMessage = "";
      })
      .addCase(verify.fulfilled, (state, action) => {
        state.loadingAuth = false;
        state.error = "";
        state.authMessage = action.payload.message;
      })
      .addCase(verify.rejected, (state, action) => {
        state.error = action.payload.response.data.message;
        state.loadingAuth = false;
        state.authMessage = "";
      })
      .addCase(forgotPassword.pending, (state, action) => {
        state.loadingAuth = true;
        state.error = "";
        state.authMessage = "";
      })
      .addCase(forgotPassword.fulfilled, (state, action) => {
        state.loadingAuth = false;
        state.error = "";
        state.authMessage = action.payload.message;
      })
      .addCase(forgotPassword.rejected, (state, action) => {
        state.error = action.payload.response.data.message;
        state.loadingAuth = false;
        state.authMessage = "";
      })
      .addCase(resetPassword.pending, (state, action) => {
        state.loadingAuth = true;
        state.error = "";
        state.authMessage = "";
      })
      .addCase(resetPassword.fulfilled, (state, action) => {
        state.loadingAuth = false;
        state.error = "";
        state.authMessage = action.payload.message;
      })
      .addCase(resetPassword.rejected, (state, action) => {
        state.error = action.payload.response.data.message;
        state.loadingAuth = false;
        state.authMessage = "";
      });
  },
});

export default authSlice.reducer;
export { signUp, logIn, verify };
export const { handlelogOutState } = authSlice.actions;
