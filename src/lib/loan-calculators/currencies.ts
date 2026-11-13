export type SupportedCurrency =
  | "USD"
  | "GBP"
  | "EUR"
  | "AUD"
  | "CAD"
  | "INR"
  | "LKR"
  | "SGD"
  | "AED"
  | "NZD"
  | "JPY";

export interface CurrencyConfig {
  code: SupportedCurrency;
  symbol: string;
  name: string;
  locale: string;
  decimals: number;
}

export const SUPPORTED_CURRENCIES: Record<SupportedCurrency, CurrencyConfig> = {
  USD: { code: "USD", symbol: "$", name: "US Dollar", locale: "en-US", decimals: 2 },
  GBP: { code: "GBP", symbol: "£", name: "British Pound", locale: "en-GB", decimals: 2 },
  EUR: { code: "EUR", symbol: "€", name: "Euro", locale: "de-DE", decimals: 2 },
  AUD: { code: "AUD", symbol: "A$", name: "Australian Dollar", locale: "en-AU", decimals: 2 },
  CAD: { code: "CAD", symbol: "C$", name: "Canadian Dollar", locale: "en-CA", decimals: 2 },
  INR: { code: "INR", symbol: "₹", name: "Indian Rupee", locale: "en-IN", decimals: 2 },
  LKR: { code: "LKR", symbol: "Rs. ", name: "Sri Lankan Rupee", locale: "en-LK", decimals: 2 },
  SGD: { code: "SGD", symbol: "S$", name: "Singapore Dollar", locale: "en-SG", decimals: 2 },
  AED: { code: "AED", symbol: "AED ", name: "UAE Dirham", locale: "en-AE", decimals: 2 },
  NZD: { code: "NZD", symbol: "NZ$", name: "New Zealand Dollar", locale: "en-NZ", decimals: 2 },
  JPY: { code: "JPY", symbol: "¥", name: "Japanese Yen", locale: "ja-JP", decimals: 0 },
};

export const ALL_CURRENCY_CODES: SupportedCurrency[] = [
  "USD",
  "GBP",
  "EUR",
  "AUD",
  "CAD",
  "INR",
  "LKR",
  "SGD",
  "AED",
  "NZD",
  "JPY",
];

export function getCurrencyConfig(code: string): CurrencyConfig {
  const upper = (code || "USD").toUpperCase().trim() as SupportedCurrency;
  return SUPPORTED_CURRENCIES[upper] || SUPPORTED_CURRENCIES.USD;
}

export function formatLoanCurrency(
  amount: number,
  currencyCode: SupportedCurrency | string = "USD",
  options?: { hideDecimals?: boolean; compact?: boolean }
): string {
  if (isNaN(amount) || !isFinite(amount)) {
    const config = getCurrencyConfig(currencyCode);
    return `${config.symbol}0${config.decimals > 0 && !options?.hideDecimals ? ".00" : ""}`;
  }

  const config = getCurrencyConfig(currencyCode);
  const decimals = options?.hideDecimals ? 0 : config.decimals;
  const absAmount = Math.abs(amount);
  const isNegative = amount < 0;

  if (options?.compact && absAmount >= 1_000_000) {
    const formatted = (absAmount / 1_000_000).toFixed(2) + "M";
    return `${isNegative ? "-" : ""}${config.symbol}${formatted}`;
  }

  if (options?.compact && absAmount >= 1_000) {
    const formatted = (absAmount / 1_000).toFixed(1) + "k";
    return `${isNegative ? "-" : ""}${config.symbol}${formatted}`;
  }

  const parts = absAmount.toLocaleString(config.locale, {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });

  return `${isNegative ? "-" : ""}${config.symbol}${parts}`;
}

export function parseSafeNumber(val: string | number | undefined | null, fallback = 0): number {
  if (val === undefined || val === null) return fallback;
  if (typeof val === "number") return isNaN(val) || !isFinite(val) ? fallback : val;
  const cleaned = String(val).replace(/,/g, "").trim();
  const parsed = parseFloat(cleaned);
  return isNaN(parsed) || !isFinite(parsed) ? fallback : parsed;
}
