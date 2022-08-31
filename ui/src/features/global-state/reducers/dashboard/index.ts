import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ISidebarMenu, NavMenuType, IDashboardUI } from "@/features/interfaces";
import { getSelectNavDrawerMenu } from "@/features/global-state/reducers/dashboard/drawer-nav-menu";

const initSidebarListItemMenu: ISidebarMenu = {
  account: true,
  accountSetting: true,
  bankCard: false,
  billing: false,
  team: false,
  changePassword: false,
  security: false,
  purchase: false,
  notifications: false,
  customers: false,
  categories: false,
  products: false,
  orders: false,
};

const initialState: IDashboardUI = {
  sidebarListItemMenu: initSidebarListItemMenu,
};

const dashboardSlice = createSlice({
  name: "dashboard",
  initialState,
  reducers: {
    navDrawerSelectItemChange: (
      state,
      { payload }: PayloadAction<NavMenuType>
    ) => {
      state.sidebarListItemMenu = getSelectNavDrawerMenu(
        state,
        payload,
        initSidebarListItemMenu
      );
    },
  },
});

export const { navDrawerSelectItemChange } = dashboardSlice.actions;

export default dashboardSlice.reducer;
