import { createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";

const initialState = {
  pastes: localStorage.getItem("pastes")
    ? JSON.parse(localStorage.getItem("pastes"))
    : [],
};

export const pasteSlice = createSlice({
  name: "paste",
  initialState,
  reducers: {
    addToPastes: (state, action) => {
      const paste = action.payload;

      const isTitleExisted = state.pastes.find(
        (p) => p.title.toLowerCase() === paste.title.toLowerCase()
      );

      if (isTitleExisted) {
        toast.error("Title already existed");
        return;
      }

      state.pastes.push(paste);

      localStorage.setItem("pastes", JSON.stringify(state.pastes));
      toast.success("Paste Created Successfully");
    },
    updateToPastes: (state, action) => {
      const paste = action.payload;
      const pasteIndex = state.pastes.findIndex((p) => p._id === paste._id);

      if (pasteIndex >= 0) {
        state.pastes[pasteIndex] = paste;
        localStorage.setItem("pastes", JSON.stringify(state.pastes));
        toast.success(`Paste with ID ${paste._id} is Updated Successfully`);
      }
    },
    resetAllPastes: (state, action) => {
      state.pastes = [];
      localStorage.removeItem("pastes");

      toast.success("Reset Pastes Successfully");
    },
    removeFromPastes: (state, action) => {
      const pasteId = action.payload;

      const pasteIndex = state.pastes.findIndex((p) => p._id === pasteId);

      state.pastes.splice(pasteIndex, 1);
      localStorage.setItem("pastes", JSON.stringify(state.pastes));
      toast.success("Paste Deleted Successfully");
    },
  },
});

export const { addToPastes, updateToPastes, resetAllPastes, removeFromPastes } =
  pasteSlice.actions;

export default pasteSlice.reducer;
