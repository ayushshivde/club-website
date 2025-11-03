"use client";
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  formData: null,
  formFilled: false,
  videoWatched: false,
  quizCompleted: false,
};

const playerSlice = createSlice({
  name: "player",
  initialState,
  reducers: {
    saveFormData: (state, action) => {
      state.formData = action.payload;
      state.formFilled = true;
    },
    markVideoWatched: (state) => {
      state.videoWatched = true;
    },
    markQuizCompleted: (state) => {
      state.quizCompleted = true;
    },
    resetAll: (state) => {
      return initialState;
    },
  },
});

export const { saveFormData, markVideoWatched, markQuizCompleted, resetAll } =
  playerSlice.actions;
export default playerSlice.reducer;
