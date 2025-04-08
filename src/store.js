import { configureStore } from "@reduxjs/toolkit";
import pasteReducer from "./features/Paste/PasteSlice.js";

export const store = configureStore({
  reducer: {
    paste: pasteReducer,
  },
});
