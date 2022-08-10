export type localeType = "en-US" | "th";

export interface IGUI {
  menuState: "NORMAL" | "OPEN" | "CLOSE";
  showMobileMenu: boolean;
  OpenAccountMenu: boolean;
  darkMode: boolean; // True => Dark, False => Light
  currentLocale: localeType;
}
