import { SalaryCalculatorInput, SalaryCalculatorResult } from "../types";
import { getCountryProfile, normalizeCountryId } from "../rules/countryRegistry";
import { calculateIncomeTax } from "./incomeTax";
import { calculatePension } from "./epf";
import { calculateEmployerContribution } from "./etf";
import { parseSafeNumber } from "../formatters";

export function calculateSalary(input: SalaryCalculatorInput): SalaryCalculatorResult {
  const countryId = normalizeCountryId(input.country);
  const profile = getCountryProfile(countryId);

  const freq = input.frequency || "monthly";
  let basicSalary = Math.max(0, parseSafeNumber(input.basicSalary));

  // If user entered salary under a specific pay frequency (e.g. annual, weekly, hourly)
  if (input.enteredSalary !== undefined && input.enteredSalary > 0) {
    const entered = parseSafeNumber(input.enteredSalary);
    if (freq === "annual") {
      basicSalary = entered / 12;
    } else if (freq === "weekly") {
      basicSalary = (entered * 52) / 12;
    } else if (freq === "biweekly") {
      basicSalary = (entered * 26) / 12;
    } else if (freq === "hourly") {
      const hrsPerWeek = input.hoursPerWeek && input.hoursPerWeek > 0 ? input.hoursPerWeek : 40;
      basicSalary = (entered * hrsPerWeek * 52) / 12;
    } else {
      basicSalary = entered;
    }
  }

  const fixedAllowances = Math.max(0, parseSafeNumber(input.fixedAllowances));
  const additionalAllowances = Math.max(0, parseSafeNumber(input.additionalAllowances));
  const overtimeEarnings = Math.max(0, parseSafeNumber(input.overtimeEarnings));
  const otherEarnings = Math.max(0, parseSafeNumber(input.otherEarnings));
  const otherDeductions = Math.max(0, parseSafeNumber(input.otherDeductions));

  const totalAllowances = fixedAllowances + additionalAllowances;
  const grossMonthlySalary = basicSalary + totalAllowances + overtimeEarnings + otherEarnings;
  const grossAnnualSalary = grossMonthlySalary * 12;

  const pensionEligibleSalary = basicSalary + fixedAllowances;

  // Pension calculation
  const pensionRes = calculatePension({
    country: countryId,
    monthlyEligibleSalary: pensionEligibleSalary,
    employeeRatePercent: input.customPensionEmployeeRate,
    employerRatePercent: input.customPensionEmployerRate,
  });

  // Employer benefits calculation
  const employerRes = calculateEmployerContribution({
    country: countryId,
    monthlyEligibleEarnings: pensionEligibleSalary,
    employmentMonths: 12,
  });

  // Income Tax & Social Security
  let estimatedIncomeTax = 0;
  let employeeSocialSecurityDeduction = 0;
  if (input.customTaxDeduction !== undefined && input.customTaxDeduction >= 0) {
    estimatedIncomeTax = parseSafeNumber(input.customTaxDeduction);
  } else {
    const taxRes = calculateIncomeTax({
      country: countryId,
      frequency: "monthly",
      incomeAmount: grossMonthlySalary,
      otherTaxableIncome: 0,
      taxYear: input.taxYear,
    });
    estimatedIncomeTax = taxRes.estimatedMonthlyTax;
    employeeSocialSecurityDeduction = taxRes.socialSecurityTaxMonthly ?? 0;
  }

  const employeePensionDeduction = pensionRes.employeeMonthlyContribution;
  const totalEmployeeDeductions = employeePensionDeduction + employeeSocialSecurityDeduction + estimatedIncomeTax + otherDeductions;
  const netMonthlySalary = Math.max(0, grossMonthlySalary - totalEmployeeDeductions);
  const netAnnualSalary = netMonthlySalary * 12;

  const employerPensionContribution = pensionRes.employerMonthlyContribution;
  const employerSocialSecurityContribution = employerRes.monthlyEmployerContribution;
  const totalEmployerContributions = employerPensionContribution + employerSocialSecurityContribution;

  const costToCompanyMonthly = grossMonthlySalary + totalEmployerContributions;
  const costToCompanyAnnual = costToCompanyMonthly * 12;

  const effectiveTaxRatePercent = grossMonthlySalary > 0
    ? ((estimatedIncomeTax + employeeSocialSecurityDeduction) / grossMonthlySalary) * 100
    : 0;

  const takeHomePercentOfGross = grossMonthlySalary > 0
    ? (netMonthlySalary / grossMonthlySalary) * 100
    : 0;

  return {
    countryId,
    currency: profile.defaultCurrency,
    currencySymbol: profile.currencySymbol,
    frequency: freq,
    basicSalary: Math.round(basicSalary * 100) / 100,
    totalAllowances: Math.round(totalAllowances * 100) / 100,
    grossMonthlySalary: Math.round(grossMonthlySalary * 100) / 100,
    grossAnnualSalary: Math.round(grossAnnualSalary * 100) / 100,
    pensionEligibleSalary: Math.round(pensionEligibleSalary * 100) / 100,
    employeePensionDeduction: Math.round(employeePensionDeduction * 100) / 100,
    employeeEpfDeduction: Math.round(employeePensionDeduction * 100) / 100,
    epfEligibleSalary: Math.round(pensionEligibleSalary * 100) / 100,
    employeeSocialSecurityDeduction: Math.round(employeeSocialSecurityDeduction * 100) / 100,
    estimatedIncomeTax: Math.round(estimatedIncomeTax * 100) / 100,
    otherDeductions: Math.round(otherDeductions * 100) / 100,
    totalEmployeeDeductions: Math.round(totalEmployeeDeductions * 100) / 100,
    netMonthlySalary: Math.round(netMonthlySalary * 100) / 100,
    netAnnualSalary: Math.round(netAnnualSalary * 100) / 100,
    employerPensionContribution: Math.round(employerPensionContribution * 100) / 100,
    employerEpfContribution: Math.round(employerPensionContribution * 100) / 100,
    employerEtfContribution: Math.round(employerSocialSecurityContribution * 100) / 100,
    annualGrossSalary: Math.round(grossAnnualSalary * 100) / 100,
    annualNetSalary: Math.round(netAnnualSalary * 100) / 100,
    annualTotalTax: Math.round(estimatedIncomeTax * 12 * 100) / 100,
    employerSocialSecurityContribution: Math.round(employerSocialSecurityContribution * 100) / 100,
    totalEmployerContributions: Math.round(totalEmployerContributions * 100) / 100,
    costToCompanyMonthly: Math.round(costToCompanyMonthly * 100) / 100,
    costToCompanyAnnual: Math.round(costToCompanyAnnual * 100) / 100,
    effectiveTaxRatePercent: Math.round(effectiveTaxRatePercent * 100) / 100,
    takeHomePercentOfGross: Math.round(takeHomePercentOfGross * 100) / 100,
    pensionName: profile.pensionName,
  };
}
