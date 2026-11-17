import { TakeHomeInput, TakeHomeResult } from "../types";
import { getCountryProfile, normalizeCountryId } from "../rules/countryRegistry";
import { calculateIncomeTax } from "./incomeTax";
import { calculatePension } from "./epf";
import { parseSafeNumber } from "../formatters";

export function calculateTakeHome(input: TakeHomeInput): TakeHomeResult {
  const countryId = normalizeCountryId(input.country);
  const profile = getCountryProfile(countryId);

  const grossSalary = Math.max(0, parseSafeNumber(input.grossMonthlySalary));

  const pensionRes = calculatePension({
    country: countryId,
    monthlyEligibleSalary: grossSalary,
    employeeRatePercent: input.pensionEmployeeRatePercent,
  });

  let incomeTaxDeduction = 0;
  let socialSecurityDeduction = 0;

  if (input.autoCalculateTax !== false) {
    const taxRes = calculateIncomeTax({
      country: countryId,
      frequency: "monthly",
      incomeAmount: grossSalary,
      otherTaxableIncome: 0,
      taxYear: input.taxYear,
    });
    incomeTaxDeduction = taxRes.estimatedMonthlyTax;
    socialSecurityDeduction = taxRes.socialSecurityTaxMonthly ?? 0;
  } else if (input.manualTaxAmount !== undefined) {
    incomeTaxDeduction = Math.max(0, parseSafeNumber(input.manualTaxAmount));
  }

  const pensionDeduction = pensionRes.employeeMonthlyContribution;
  const otherDeductions = Math.max(0, parseSafeNumber(input.otherDeductions));
  const totalDeductions = pensionDeduction + socialSecurityDeduction + incomeTaxDeduction + otherDeductions;
  const netTakeHomeMonthly = Math.max(0, grossSalary - totalDeductions);
  const netTakeHomeAnnual = netTakeHomeMonthly * 12;

  const takeHomePercentage = grossSalary > 0 ? (netTakeHomeMonthly / grossSalary) * 100 : 0;
  const deductionsPercentage = grossSalary > 0 ? (totalDeductions / grossSalary) * 100 : 0;

  return {
    countryId,
    currency: profile.defaultCurrency,
    currencySymbol: profile.currencySymbol,
    grossMonthlySalary: Math.round(grossSalary * 100) / 100,
    pensionDeduction: Math.round(pensionDeduction * 100) / 100,
    epfDeduction: Math.round(pensionDeduction * 100) / 100,
    epfEligibleSalary: Math.round(grossSalary * 100) / 100,
    socialSecurityDeduction: Math.round(socialSecurityDeduction * 100) / 100,
    incomeTaxDeduction: Math.round(incomeTaxDeduction * 100) / 100,
    otherDeductions: Math.round(otherDeductions * 100) / 100,
    totalDeductions: Math.round(totalDeductions * 100) / 100,
    netTakeHomeMonthly: Math.round(netTakeHomeMonthly * 100) / 100,
    netTakeHomeAnnual: Math.round(netTakeHomeAnnual * 100) / 100,
    takeHomePercentage: Math.round(takeHomePercentage * 100) / 100,
    deductionsPercentage: Math.round(deductionsPercentage * 100) / 100,
    pensionLabel: profile.pensionName,
  };
}
