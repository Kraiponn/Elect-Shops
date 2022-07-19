import { IGUI } from "@/features/types";
import { createSlice } from "@reduxjs/toolkit";

const initialState: IGUI = {
  showMobileMenu: false,
  menuState: "NORMAL",
};

const guiSlice = createSlice({
  name: "gui",
  initialState,
  reducers: {
    toggleShowMobileMenu: (state) => {
      state.showMobileMenu = !state.showMobileMenu;
    },
    openMobileMenu: (state) => {
      state.showMobileMenu = true;
      state.menuState = "NORMAL";
    },
    closeMobileMenu: (state) => {
      state.showMobileMenu = false;
      state.menuState = "CLOSE";
    },
  },
});

export const { toggleShowMobileMenu, openMobileMenu, closeMobileMenu } =
  guiSlice.actions;

export default guiSlice.reducer;
