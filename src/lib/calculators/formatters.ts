const CURRENCY_SYMBOLS: Record<string, string> = {
  LKR: "Rs. ",
  USD: "$",
  GBP: "£",
  AUD: "A$",
  CAD: "C$",
  INR: "₹",
  SGD: "S$",
  AED: "AED ",
};

export function getCurrencyPrefix(currencyOrSymbol: string = "LKR"): string {
  const upper = currencyOrSymbol.toUpperCase().trim();
  if (CURRENCY_SYMBOLS[upper]) {
    return CURRENCY_SYMBOLS[upper];
  }
  return currencyOrSymbol.endsWith(" ") || currencyOrSymbol.length === 1 ? currencyOrSymbol : currencyOrSymbol + " ";
}

export function formatCurrency(
  amount: number,
  currency: string = "LKR",
  options?: { hideDecimals?: boolean; compact?: boolean }
): string {
  if (isNaN(amount) || !isFinite(amount)) {
    const sym = getCurrencyPrefix(currency);
    return `${sym}0.00`;
  }

  const absAmount = Math.abs(amount);
  const isNegative = amount < 0;
  const sym = getCurrencyPrefix(currency);

  if (options?.compact && absAmount >= 1000000) {
    const formattedCompact = (absAmount / 1000000).toFixed(2) + "M";
    return (isNegative ? "-" : "") + sym + formattedCompact;
  }

  const fractionDigits = options?.hideDecimals ? 0 : 2;
  const formattedNumber = absAmount.toLocaleString("en-US", {
    minimumFractionDigits: fractionDigits,
    maximumFractionDigits: fractionDigits,
  });

  const sign = isNegative ? "-" : "";
  return sign + sym + formattedNumber;
}

export function formatPercent(value: number, decimals: number = 2): string {
  if (isNaN(value) || !isFinite(value)) return "0%";
  return value.toFixed(decimals) + "%";
}

export function parseSafeNumber(val: unknown, fallback: number = 0): number {
  if (typeof val === "number") {
    if (isNaN(val) || !isFinite(val)) return fallback;
    return val;
  }
  if (typeof val === "string") {
    const clean = val.replace(/,/g, "").trim();
    if (clean === "") return fallback;
    const parsed = parseFloat(clean);
    return isNaN(parsed) || !isFinite(parsed) ? fallback : parsed;
  }
  return fallback;
}

export function clamp(val: number, min: number, max: number): number {
  return Math.max(min, Math.min(max, val));
}
