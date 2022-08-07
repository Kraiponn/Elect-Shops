import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IGUI, localeType } from "@/features/types";

const initialState: IGUI = {
  showMobileMenu: false,
  menuState: "NORMAL",
  OpenAccountMenu: false,
  darkMode: false,
  currentLocale: "en-US",
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
    toggleOpenAccountMenu: (state) => {
      state.OpenAccountMenu = !state.OpenAccountMenu;
    },
    closeAccountMenu: (state) => {
      state.OpenAccountMenu = false;
    },
    changeThemeMode: (state) => {
      state.darkMode = !state.darkMode;
      state.OpenAccountMenu = false;
    },
    changeLanguagesMode: (state) => {
      if (state.currentLocale === "en-US") state.currentLocale = "th";
      else state.currentLocale = "en-US";

      state.OpenAccountMenu = false;
    },
    changeLocale: (state, { payload }: PayloadAction<localeType>) => {
      state.currentLocale = payload;
      state.OpenAccountMenu = false;
    },
  },
});

export const {
  toggleShowMobileMenu,
  openMobileMenu,
  closeMobileMenu,
  toggleOpenAccountMenu,
  closeAccountMenu,
  changeLanguagesMode,
  changeLocale,
  changeThemeMode,
} = guiSlice.actions;

export default guiSlice.reducer;
