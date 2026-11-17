import { VATInput, VATResult } from "../types";
import { getCountryProfile, normalizeCountryId } from "../rules/countryRegistry";
import { parseSafeNumber } from "../formatters";
import { USA_TAX_BRACKETS_2024 } from "../rules/countries/usa";
import { UK_TAX_BRACKETS_2024_2025 } from "../rules/countries/uk";
import { AUSTRALIA_TAX_BRACKETS_2024_2025 } from "../rules/countries/australia";
import { CANADA_TAX_BRACKETS_2024 } from "../rules/countries/canada";
import { INDIA_TAX_BRACKETS_FY2425 } from "../rules/countries/india";
import { SINGAPORE_TAX_BRACKETS_YA2024 } from "../rules/countries/singapore";
import { UAE_TAX_RULES } from "../rules/countries/uae";

export function calculateVAT(input: VATInput): VATResult {
  const countryId = normalizeCountryId(input.country);
  const profile = getCountryProfile(countryId);

  const amount = Math.max(0, parseSafeNumber(input.amount));
  let defaultRate = 18;
  let taxName = profile.consumptionTaxName;
  let standardRates: { label: string; rate: number }[] = [];

  if (countryId === "usa") {
    taxName = "Sales Tax";
    defaultRate = 6.5;
    standardRates = USA_TAX_BRACKETS_2024.salesTax.standardRates;
  } else if (countryId === "uk") {
    taxName = "VAT";
    defaultRate = 20;
    standardRates = UK_TAX_BRACKETS_2024_2025.vat.standardRates;
  } else if (countryId === "australia") {
    taxName = "GST";
    defaultRate = 10;
    standardRates = AUSTRALIA_TAX_BRACKETS_2024_2025.gst.standardRates;
  } else if (countryId === "canada") {
    taxName = "GST / HST";
    defaultRate = 13;
    standardRates = CANADA_TAX_BRACKETS_2024.salesTax.standardRates;
  } else if (countryId === "india") {
    taxName = "GST";
    defaultRate = 18;
    standardRates = INDIA_TAX_BRACKETS_FY2425.gst.standardRates;
  } else if (countryId === "singapore") {
    taxName = "GST";
    defaultRate = 9;
    standardRates = SINGAPORE_TAX_BRACKETS_YA2024.gst.standardRates;
  } else if (countryId === "uae") {
    taxName = "VAT";
    defaultRate = 5;
    standardRates = UAE_TAX_RULES.vat.standardRates;
  } else {
    // Sri Lanka
    taxName = "VAT";
    defaultRate = 18;
    standardRates = [
      { label: "Standard Rate (18%)", rate: 18 },
      { label: "Historical Rate (15%)", rate: 15 },
      { label: "Zero-Rated (0%)", rate: 0 },
    ];
  }

  const ratePercent = input.vatRatePercent !== undefined ? parseSafeNumber(input.vatRatePercent) : defaultRate;
  const rateDecimal = ratePercent / 100;

  let vatAmount = 0;
  let netAmountExclusive = 0;
  let grossAmountInclusive = 0;
  let calculationFormula = "";

  if (input.mode === "add") {
    netAmountExclusive = amount;
    vatAmount = netAmountExclusive * rateDecimal;
    grossAmountInclusive = netAmountExclusive + vatAmount;
    calculationFormula = `${taxName} = Price (${amount}) × ${ratePercent}% = ${vatAmount.toFixed(2)}; Total = Price + ${taxName} = ${grossAmountInclusive.toFixed(2)}`;
  } else {
    grossAmountInclusive = amount;
    netAmountExclusive = rateDecimal > 0 ? grossAmountInclusive / (1 + rateDecimal) : grossAmountInclusive;
    vatAmount = grossAmountInclusive - netAmountExclusive;
    calculationFormula = `Exclusive Price = Price (${amount}) ÷ (1 + ${rateDecimal}) = ${netAmountExclusive.toFixed(2)}; ${taxName} = Total - Exclusive = ${vatAmount.toFixed(2)}`;
  }

  return {
    countryId,
    currency: profile.defaultCurrency,
    currencySymbol: profile.currencySymbol,
    taxName,
    mode: input.mode,
    inputAmount: Math.round(amount * 100) / 100,
    vatRatePercent: Math.round(ratePercent * 100) / 100,
    vatAmount: Math.round(vatAmount * 100) / 100,
    netAmountExclusive: Math.round(netAmountExclusive * 100) / 100,
    grossAmountInclusive: Math.round(grossAmountInclusive * 100) / 100,
    calculationFormula,
    standardRates,
  };
}
