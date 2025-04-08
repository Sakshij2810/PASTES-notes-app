import { configureStore } from "@reduxjs/toolkit";
import pasteReducer from "./features/Paste/pasteSlice.js";

export const store = configureStore({
  reducer: {
    paste: pasteReducer,
  },
});
