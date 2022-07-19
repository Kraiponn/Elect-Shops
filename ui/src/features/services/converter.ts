import NumberFormat from "numeral";

export enum NumberFormatType {
  COMMA = "0,0",
  DECIMAL_2_DIGIT = "0.00",
  COMMA_AND_DECIMAL_2_DIGIT = "0,0.00",
  COMMA_AND_DECIMAL_3_DIGIT = "0,0.000",
}

export type LocalesType = "th-TH" | "en-US";
export type CurrencyType = "THB" | "USD";

export const MyNumberFormat = (value: number, formatType: NumberFormatType) => {
  return NumberFormat(value).format(formatType);
};

export const CurrencyFormatWithBuildIn = (
  value: number,
  locales: LocalesType,
  currencyType: CurrencyType
) => {
  return new Intl.NumberFormat(locales, {
    style: "currency",
    currency: currencyType,
  }).format(value);
};

export const ThaiCurrencyFormatWithBuildIn = (value: number) => {
  return new Intl.NumberFormat("th-TH", {
    style: "currency",
    currency: "THB",
  }).format(value);
};

export const USCurrencyFormatWithBuildIn = (value: number) => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(value);
};

// Number.toLocaleString("en-US", { style: "currency", currency: "USD" });
