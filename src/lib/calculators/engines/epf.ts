import { PensionInput, PensionResult } from "../types";
import { getCountryProfile, normalizeCountryId } from "../rules/countryRegistry";
import { parseSafeNumber } from "../formatters";

export function calculatePension(input: PensionInput): PensionResult {
  const countryId = normalizeCountryId(input.country);
  const profile = getCountryProfile(countryId);

  const eligibleSalary = Math.max(0, parseSafeNumber(input.monthlyEligibleSalary));

  let employeeRate = 0;
  let employerRate = 0;
  let schemeName = profile.pensionName;
  let isEmployerOnly = false;
  let notes = "";

  if (countryId === "usa") {
    schemeName = "401(k) Retirement Plan";
    employeeRate = input.employeeRatePercent !== undefined ? parseSafeNumber(input.employeeRatePercent) / 100 : 0.05;
    employerRate = input.employerRatePercent !== undefined ? parseSafeNumber(input.employerRatePercent) / 100 : 0.03;
    notes = "Elective 401(k) deferral with employer match. Excludes mandatory FICA Social Security.";
  } else if (countryId === "uk") {
    schemeName = "Workplace Pension Auto-Enrolment";
    employeeRate = input.employeeRatePercent !== undefined ? parseSafeNumber(input.employeeRatePercent) / 100 : 0.05;
    employerRate = input.employerRatePercent !== undefined ? parseSafeNumber(input.employerRatePercent) / 100 : 0.03;
    notes = "Statutory auto-enrolment minimums (5% employee incl. tax relief + 3% employer).";
  } else if (countryId === "australia") {
    schemeName = "Superannuation Guarantee";
    employeeRate = input.employeeRatePercent !== undefined ? parseSafeNumber(input.employeeRatePercent) / 100 : 0.00;
    employerRate = input.employerRatePercent !== undefined ? parseSafeNumber(input.employerRatePercent) / 100 : 0.115;
    isEmployerOnly = true;
    notes = "Superannuation is paid 100% by the employer (11.5% for FY 24/25, rising to 12% in FY 25/26).";
  } else if (countryId === "canada") {
    schemeName = "Canada Pension Plan (CPP)";
    employeeRate = input.employeeRatePercent !== undefined ? parseSafeNumber(input.employeeRatePercent) / 100 : 0.0595;
    employerRate = input.employerRatePercent !== undefined ? parseSafeNumber(input.employerRatePercent) / 100 : 0.0595;
    notes = "Statutory 5.95% employee + 5.95% employer contribution up to YMPE ceiling ($68,500).";
  } else if (countryId === "india") {
    schemeName = "Employees' Provident Fund (EPF)";
    employeeRate = input.employeeRatePercent !== undefined ? parseSafeNumber(input.employeeRatePercent) / 100 : 0.12;
    employerRate = input.employerRatePercent !== undefined ? parseSafeNumber(input.employerRatePercent) / 100 : 0.12;
    notes = "Statutory 12% employee deduction and 12% employer contribution (3.67% EPF + 8.33% EPS).";
  } else if (countryId === "singapore") {
    schemeName = "Central Provident Fund (CPF)";
    employeeRate = input.employeeRatePercent !== undefined ? parseSafeNumber(input.employeeRatePercent) / 100 : 0.20;
    employerRate = input.employerRatePercent !== undefined ? parseSafeNumber(input.employerRatePercent) / 100 : 0.17;
    notes = "Citizen/SPR rate (age <= 55): 20% employee deduction and 17% employer contribution.";
  } else if (countryId === "uae") {
    schemeName = "General Pension & Social Security (GPSSA)";
    employeeRate = input.employeeRatePercent !== undefined ? parseSafeNumber(input.employeeRatePercent) / 100 : 0.05;
    employerRate = input.employerRatePercent !== undefined ? parseSafeNumber(input.employerRatePercent) / 100 : 0.125;
    notes = "Mandatory for UAE/GCC national employees. Expatriates receive End of Service Gratuity instead.";
  } else {
    // Sri Lanka
    schemeName = "Employees' Provident Fund (EPF)";
    employeeRate = input.employeeRatePercent !== undefined ? parseSafeNumber(input.employeeRatePercent) / 100 : 0.08;
    employerRate = input.employerRatePercent !== undefined ? parseSafeNumber(input.employerRatePercent) / 100 : 0.12;
    notes = "Under Act No. 15 of 1958: 8% employee deduction + 12% employer contribution (20% total).";
  }

  const employeeMonthlyContribution = eligibleSalary * employeeRate;
  const employerMonthlyContribution = eligibleSalary * employerRate;
  const totalMonthlyContribution = employeeMonthlyContribution + employerMonthlyContribution;

  const employeeAnnualContribution = employeeMonthlyContribution * 12;
  const employerAnnualContribution = employerMonthlyContribution * 12;
  const totalAnnualContribution = totalMonthlyContribution * 12;

  let projection: PensionResult["projection"] = undefined;
  if (input.projectionYears && input.projectionYears > 0) {
    const years = Math.min(40, Math.max(1, Math.round(input.projectionYears)));
    const annualReturn = (input.annualReturnRatePercent !== undefined ? parseSafeNumber(input.annualReturnRatePercent) : 8) / 100;
    const salaryGrowth = (input.annualSalaryIncrementPercent !== undefined ? parseSafeNumber(input.annualSalaryIncrementPercent) : 4) / 100;

    let totalBalance = 0;
    let totalEmpContributed = 0;
    let totalEmplyrContributed = 0;
    let currentSalary = eligibleSalary;

    for (let yr = 1; yr <= years; yr++) {
      const yearEmpContribution = currentSalary * employeeRate * 12;
      const yearEmplyrContribution = currentSalary * employerRate * 12;
      const yearTotalContribution = yearEmpContribution + yearEmplyrContribution;

      totalEmpContributed += yearEmpContribution;
      totalEmplyrContributed += yearEmplyrContribution;
      totalBalance = (totalBalance + yearTotalContribution) * (1 + annualReturn);
      currentSalary *= (1 + salaryGrowth);
    }

    const totalContributed = totalEmpContributed + totalEmplyrContributed;
    const totalInterestEarned = Math.max(0, totalBalance - totalContributed);

    projection = {
      years,
      projectedTotalBalance: Math.round(totalBalance),
      totalEmployeeContributed: Math.round(totalEmpContributed),
      totalEmployerContributed: Math.round(totalEmplyrContributed),
      totalInterestEarned: Math.round(totalInterestEarned),
    };
  }

  return {
    countryId,
    currency: profile.defaultCurrency,
    currencySymbol: profile.currencySymbol,
    schemeName,
    authorityName: profile.taxAuthorityName,
    monthlyEligibleSalary: Math.round(eligibleSalary * 100) / 100,
    employeeRatePercent: Math.round(employeeRate * 10000) / 100,
    employerRatePercent: Math.round(employerRate * 10000) / 100,
    totalRatePercent: Math.round((employeeRate + employerRate) * 10000) / 100,
    employeeMonthlyContribution: Math.round(employeeMonthlyContribution * 100) / 100,
    employerMonthlyContribution: Math.round(employerMonthlyContribution * 100) / 100,
    totalMonthlyContribution: Math.round(totalMonthlyContribution * 100) / 100,
    employeeAnnualContribution: Math.round(employeeAnnualContribution * 100) / 100,
    employerAnnualContribution: Math.round(employerAnnualContribution * 100) / 100,
    totalAnnualContribution: Math.round(totalAnnualContribution * 100) / 100,
    isEmployerOnly,
    notes,
    projection,
  };
}

export const calculateEPF = calculatePension;
