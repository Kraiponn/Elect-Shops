export enum NavMenuType {
  ACCOUNT = "dashboard/ACCOUNT",
  ACCOUNT_SETTING = "dashboard/ACCOUNT_SETTING",
  PROFILE = "dashboard/PROFILE",
  BANK_CARD = "dashboard/BANK_CARD",
  BILLING = "dashboard/BILLING",
  CHANGE_PASSWORD = "dashboard/CHANGE_PASSWORD",
  SECURITY = "dashboard/SECURITY",
  TEAM = "dashboard/TEAM",
  PURCHASE = "dashboard/PURCHASE",
  NOTIFICATION = "dashboard/NOTIFICATION",
  CUSTOMER = "dashboard/CUSTOMER",
  PRODUCT = "dashboard/PRODUCT",
  ORDER = "dashboard/ORDER",
  INVOICE = "dashboard/INVOICE",
  SETTING = "dashboard/SETTING",
  ANALYTIC = "dashboard/ANALYTIC",
  LOGOUT = "dashboard/LOGOUT",
}

export enum AccountMenuType {
  PROFILE,
  CHANGE_PASSWORD,
  SECURITY,
  TEAM,
}

export interface ISidebarMenu {
  account: boolean;
  accountSetting: boolean;
  bankCard: boolean;
  billing: boolean;
  team: boolean;
  changePassword: boolean;
  security: boolean;
  purchase: boolean;
  notifications: boolean;
  customers: boolean;
  products: boolean;
  orders: boolean;
  invoices: boolean;
}

export interface IAccountListMenu {
  open: boolean;
  profile: boolean;
  changePassword: boolean;
  security: boolean;
  team: boolean;
}

export interface IDashboardUI {
  sidebarListItemMenu: ISidebarMenu;
}
