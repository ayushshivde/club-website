"use client";
import { configureStore } from "@reduxjs/toolkit";
import playerSlice from "../store/PlayerSlice"


export const store = configureStore({
  reducer: {
    playerReducer: playerSlice,
  },
});

