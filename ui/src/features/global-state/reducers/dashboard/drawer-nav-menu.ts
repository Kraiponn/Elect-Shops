import { WritableDraft } from "immer/dist/internal";
import { IDashboardUI, ISidebarMenu, NavMenuType } from "@/features/interfaces";

export const getSelectNavDrawerMenu = (
  state: WritableDraft<IDashboardUI>,
  payload: NavMenuType,
  initSidebarListItemMenu: ISidebarMenu
) => {
  let updateState: WritableDraft<ISidebarMenu>;

  switch (payload) {
    case NavMenuType.ACCOUNT:
      updateState = {
        ...state.sidebarListItemMenu,
        account: !state.sidebarListItemMenu.account,
      };
      break;

    case NavMenuType.ACCOUNT_SETTING:
      updateState = {
        ...initSidebarListItemMenu,
        account: true,
        accountSetting: true,
      };
      break;

    case NavMenuType.BANK_CARD:
      updateState = {
        ...initSidebarListItemMenu,
        account: true,
        accountSetting: false,
        bankCard: true,
      };
      break;

    case NavMenuType.BILLING:
      updateState = {
        ...initSidebarListItemMenu,
        account: true,
        accountSetting: false,
        billing: true,
      };
      break;

    case NavMenuType.TEAM:
      updateState = {
        ...initSidebarListItemMenu,
        account: true,
        accountSetting: false,
        team: true,
      };
      break;

    case NavMenuType.PURCHASE:
      updateState = {
        ...initSidebarListItemMenu,
        account: state.sidebarListItemMenu.account,
        accountSetting: false,
        purchase: true,
      };
      break;

    case NavMenuType.NOTIFICATION:
      updateState = {
        ...initSidebarListItemMenu,
        account: state.sidebarListItemMenu.account,
        accountSetting: false,
        notifications: true,
      };
      break;

    case NavMenuType.CUSTOMER:
      updateState = {
        ...initSidebarListItemMenu,
        account: state.sidebarListItemMenu.account,
        accountSetting: false,
        customers: true,
      };
      break;

    case NavMenuType.PRODUCT:
      updateState = {
        ...initSidebarListItemMenu,
        account: state.sidebarListItemMenu.account,
        accountSetting: false,
        products: true,
      };
      break;

    case NavMenuType.ORDER:
      updateState = {
        ...initSidebarListItemMenu,
        account: state.sidebarListItemMenu.account,
        accountSetting: false,
        orders: true,
      };
      break;

    case NavMenuType.INVOICE:
      updateState = {
        ...initSidebarListItemMenu,
        account: state.sidebarListItemMenu.account,
        accountSetting: false,
        invoices: true,
      };
      break;

    default:
      updateState = {
        ...initSidebarListItemMenu,
        account: !state.sidebarListItemMenu.account,
      };
  }

  return updateState;
};
