import { OvertimeInput, OvertimeResult } from "../types";
import { getCountryProfile, normalizeCountryId } from "../rules/countryRegistry";
import { parseSafeNumber } from "../formatters";

export function calculateOvertime(input: OvertimeInput): OvertimeResult {
  const countryId = normalizeCountryId(input.country);
  const profile = getCountryProfile(countryId);

  const basicSalary = Math.max(0, parseSafeNumber(input.monthlyBasicSalary));
  let standardHours = 173.33; // standard ~40 hr week (40 * 52 / 12)
  let normalMultiplier = 1.5;
  let holidayMultiplier = 2.0;
  let governingAct = "Standard Labour Overtime Regulations";

  if (countryId === "usa") {
    governingAct = "Fair Labor Standards Act (FLSA)";
    standardHours = 173.33; // 40 hrs/week
    normalMultiplier = 1.5;
    holidayMultiplier = 2.0;
  } else if (countryId === "uk") {
    governingAct = "Working Time Regulations 1998";
    standardHours = 162.5; // 37.5 hrs/week
    normalMultiplier = 1.5;
    holidayMultiplier = 2.0;
  } else if (countryId === "australia") {
    governingAct = "Fair Work Act Modern Awards";
    standardHours = 165; // 38 hrs/week
    normalMultiplier = 1.5;
    holidayMultiplier = 2.0;
  } else if (countryId === "canada") {
    governingAct = "Canada Labour Code";
    standardHours = 173.33; // 40 hrs/week
    normalMultiplier = 1.5;
    holidayMultiplier = 2.0;
  } else if (countryId === "india") {
    governingAct = "Factories Act, 1948";
    standardHours = 208; // 48 hrs/week
    normalMultiplier = 2.0; // Double wages
    holidayMultiplier = 2.0;
  } else if (countryId === "singapore") {
    governingAct = "Part IV of the Employment Act";
    standardHours = 190.67; // (12 * 52 * 44) / 12 = ~190.67
    normalMultiplier = 1.5;
    holidayMultiplier = 2.0;
  } else if (countryId === "uae") {
    governingAct = "UAE Labour Law (Federal Decree-Law No. 33)";
    standardHours = 208; // 48 hrs/week
    normalMultiplier = 1.25; // 1.25x daytime OT
    holidayMultiplier = 1.50; // 1.5x night / rest day
  } else {
    // Sri Lanka
    governingAct = "Shop and Office Employees Act No. 19 of 1954";
    standardHours = 200; // Statutory 200 divisor
    normalMultiplier = 1.5;
    holidayMultiplier = 2.0;
  }

  if (input.standardMonthlyHours !== undefined && input.standardMonthlyHours > 0) {
    standardHours = parseSafeNumber(input.standardMonthlyHours);
  }
  if (input.normalOtMultiplier !== undefined && input.normalOtMultiplier > 0) {
    normalMultiplier = parseSafeNumber(input.normalOtMultiplier);
  }
  if (input.holidayOtMultiplier !== undefined && input.holidayOtMultiplier > 0) {
    holidayMultiplier = parseSafeNumber(input.holidayOtMultiplier);
  }

  const normalHourlyRate = standardHours > 0 ? basicSalary / standardHours : 0;
  const normalOtHourlyRate = normalHourlyRate * normalMultiplier;
  const normalHours = Math.max(0, parseSafeNumber(input.normalOtHours));
  const normalOtEarnings = normalHours * normalOtHourlyRate;

  const holidayOtHourlyRate = normalHourlyRate * holidayMultiplier;
  const holidayHours = Math.max(0, parseSafeNumber(input.holidayOtHours));
  const holidayOtEarnings = holidayHours * holidayOtHourlyRate;

  const totalOtHours = normalHours + holidayHours;
  const totalOtEarnings = normalOtEarnings + holidayOtEarnings;
  const estimatedMonthlySalaryWithOt = basicSalary + totalOtEarnings;

  return {
    countryId,
    currency: profile.defaultCurrency,
    currencySymbol: profile.currencySymbol,
    governingAct,
    monthlyBasicSalary: Math.round(basicSalary * 100) / 100,
    standardMonthlyHours: standardHours,
    normalHourlyRate: Math.round(normalHourlyRate * 100) / 100,
    normalOtMultiplier: normalMultiplier,
    normalOtHourlyRate: Math.round(normalOtHourlyRate * 100) / 100,
    normalOtHours: Math.round(normalHours * 10) / 10,
    normalOtEarnings: Math.round(normalOtEarnings * 100) / 100,
    holidayOtMultiplier: holidayMultiplier,
    holidayOtHourlyRate: Math.round(holidayOtHourlyRate * 100) / 100,
    holidayOtHours: Math.round(holidayHours * 10) / 10,
    holidayOtEarnings: Math.round(holidayOtEarnings * 100) / 100,
    totalOtHours: Math.round(totalOtHours * 10) / 10,
    totalOtEarnings: Math.round(totalOtEarnings * 100) / 100,
    estimatedMonthlySalaryWithOt: Math.round(estimatedMonthlySalaryWithOt * 100) / 100,
  };
}
