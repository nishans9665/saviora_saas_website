import { GratuityInput, GratuityResult } from "../types";
import { getCountryProfile, normalizeCountryId } from "../rules/countryRegistry";
import { parseSafeNumber } from "../formatters";

export function calculateGratuity(input: GratuityInput): GratuityResult {
  const countryId = normalizeCountryId(input.country);
  const profile = getCountryProfile(countryId);

  const lastDrawnSalary = Math.max(0, parseSafeNumber(input.lastDrawnMonthlySalary));
  let completedYears = 0;
  let completedMonths = 0;
  let totalMonths = 0;

  if (input.calculationMethod === "dates" && input.startDate && input.endDate) {
    const start = new Date(input.startDate);
    const end = new Date(input.endDate);
    if (!isNaN(start.getTime()) && !isNaN(end.getTime()) && end >= start) {
      let yearsDiff = end.getFullYear() - start.getFullYear();
      let monthsDiff = end.getMonth() - start.getMonth();
      const daysDiff = end.getDate() - start.getDate();
      if (daysDiff < 0) monthsDiff--;
      if (monthsDiff < 0) { yearsDiff--; monthsDiff += 12; }
      completedYears = Math.max(0, yearsDiff);
      completedMonths = Math.max(0, monthsDiff);
      totalMonths = completedYears * 12 + completedMonths;
    }
  } else {
    completedYears = Math.max(0, Math.floor(parseSafeNumber(input.completedYears, 0)));
    completedMonths = Math.max(0, Math.min(11, Math.floor(parseSafeNumber(input.completedMonths, 0))));
    totalMonths = completedYears * 12 + completedMonths;
  }

  let schemeName = profile.severanceName;
  let governingAct = "";
  let isEligibleStatutory = false;
  let eligibilityReason = "";
  let estimatedGratuityAmount = 0;
  let formulaDescription = "";
  let taxNotes = "";

  if (countryId === "india") {
    schemeName = "Statutory Gratuity";
    governingAct = "Payment of Gratuity Act, 1972";
    isEligibleStatutory = completedYears >= 5;
    if (isEligibleStatutory) {
      // 15 days out of 26 working days per year of service
      estimatedGratuityAmount = (15 / 26) * lastDrawnSalary * completedYears;
      eligibilityReason = `Eligible under Payment of Gratuity Act, 1972 (requires ≥ 5 completed continuous years of service).`;
      formulaDescription = `Gratuity = (15 / 26) × Last Drawn Basic (${lastDrawnSalary.toLocaleString()}) × ${completedYears} Years = ${profile.currencySymbol}${Math.round(estimatedGratuityAmount).toLocaleString()}`;
    } else {
      eligibilityReason = "Under Indian law, employees become entitled to statutory gratuity only after 5 completed years of continuous service.";
      formulaDescription = "Requires at least 5 completed years of service.";
    }
    taxNotes = "Gratuity is tax-exempt up to ₹20 Lakhs under Section 10(10) of the Indian Income Tax Act.";

  } else if (countryId === "uae") {
    schemeName = "End of Service Gratuity";
    governingAct = "Federal Decree-Law No. 33 of 2021 (UAE Labour Law)";
    isEligibleStatutory = completedYears >= 1;
    if (isEligibleStatutory) {
      const dailyWage = lastDrawnSalary / 30;
      const yearsUnder5 = Math.min(completedYears, 5);
      const yearsOver5 = Math.max(0, completedYears - 5);
      // 21 days for first 5 years, 30 days for each additional year
      estimatedGratuityAmount = (yearsUnder5 * 21 * dailyWage) + (yearsOver5 * 30 * dailyWage);
      // Cap at 2 years' gross salary
      const cap = lastDrawnSalary * 24;
      estimatedGratuityAmount = Math.min(estimatedGratuityAmount, cap);
      eligibilityReason = "Eligible under UAE Labour Law (Article 51). Requires at least 1 year of continuous service.";
      formulaDescription = `Gratuity = (${yearsUnder5} yrs × 21 days + ${yearsOver5} yrs × 30 days) × Daily Basic = AED ${Math.round(estimatedGratuityAmount).toLocaleString()}`;
    } else {
      eligibilityReason = "Under UAE Labour Law, at least 1 full year of continuous service is required for end of service benefits.";
      formulaDescription = "Requires at least 1 year of continuous service.";
    }
    taxNotes = "The UAE levies 0% personal tax on end of service benefits.";

  } else if (countryId === "uk") {
    schemeName = "Statutory Redundancy Pay";
    governingAct = "Employment Rights Act 1996";
    isEligibleStatutory = completedYears >= 2;
    if (isEligibleStatutory) {
      // 1 week's pay per year (subject to statutory weekly cap £700)
      const weeklyPay = Math.min(700, (lastDrawnSalary * 12) / 52);
      estimatedGratuityAmount = weeklyPay * completedYears;
      eligibilityReason = "Eligible under Employment Rights Act 1996 (requires ≥ 2 continuous years of service).";
      formulaDescription = `Redundancy = Weekly Pay (capped at £700) × ${completedYears} Years = £${Math.round(estimatedGratuityAmount).toLocaleString()}`;
    } else {
      eligibilityReason = "UK statutory redundancy pay requires a minimum of 2 years continuous employment.";
      formulaDescription = "Requires at least 2 years continuous service.";
    }
    taxNotes = "Statutory redundancy pay is tax-free up to £30,000 under UK tax law.";

  } else if (countryId === "australia") {
    schemeName = "NES Redundancy Pay";
    governingAct = "Fair Work Act 2009 (National Employment Standards)";
    isEligibleStatutory = completedYears >= 1;
    if (isEligibleStatutory) {
      const weeklyPay = (lastDrawnSalary * 12) / 52;
      let weeksPay = 4;
      if (completedYears >= 2) weeksPay = 6;
      if (completedYears >= 3) weeksPay = 7;
      if (completedYears >= 4) weeksPay = 8;
      if (completedYears >= 5) weeksPay = 10;
      if (completedYears >= 9) weeksPay = 16;
      estimatedGratuityAmount = weeklyPay * weeksPay;
      eligibilityReason = "Eligible under National Employment Standards (NES) redundancy provisions.";
      formulaDescription = `NES Redundancy = ${weeksPay} Weeks × Weekly Pay = A$${Math.round(estimatedGratuityAmount).toLocaleString()}`;
    } else {
      eligibilityReason = "Australian NES redundancy pay requires at least 1 year of continuous service.";
      formulaDescription = "Requires at least 1 year of service.";
    }
    taxNotes = "Genuine redundancy payments receive concessional tax-free base and service year limits under ATO rules.";

  } else if (countryId === "singapore") {
    schemeName = "Retrenchment Benefit";
    governingAct = "Singapore Employment Act (MOM Guidelines)";
    isEligibleStatutory = completedYears >= 2;
    if (isEligibleStatutory) {
      // Customary 1 month per year of service
      estimatedGratuityAmount = lastDrawnSalary * completedYears;
      eligibilityReason = "Eligible under MOM Retrenchment Guidelines (typically ≥ 2 years service).";
      formulaDescription = `Retrenchment Benefit = ~1 Month Salary × ${completedYears} Years = S$${Math.round(estimatedGratuityAmount).toLocaleString()}`;
    } else {
      eligibilityReason = "Under MOM guidelines, retrenchment benefits customarily apply after 2 years of service.";
      formulaDescription = "Customarily requires 2 years service.";
    }
    taxNotes = "Compensation for loss of employment is generally not taxable in Singapore.";

  } else if (countryId === "usa") {
    schemeName = "Severance Pay";
    governingAct = "US Department of Labor / Company Severance Policy";
    isEligibleStatutory = completedYears >= 1;
    // Typical US benchmark: 2 weeks per completed year
    const weeklyPay = (lastDrawnSalary * 12) / 52;
    estimatedGratuityAmount = weeklyPay * 2 * completedYears;
    eligibilityReason = "Severance in the US depends on company policy or employment contract (customary benchmark: 2 weeks per year).";
    formulaDescription = `Estimated Severance = 2 Weeks Pay × ${completedYears} Years = $${Math.round(estimatedGratuityAmount).toLocaleString()}`;
    taxNotes = "Severance pay is treated as taxable supplemental wage income by the IRS.";

  } else if (countryId === "canada") {
    schemeName = "Statutory Severance Pay";
    governingAct = "Canada Labour Code / Provincial Employment Standards";
    isEligibleStatutory = completedYears >= 1;
    // Canada Labour Code: 2 days wages per year or minimum 5 days
    const dailyWage = lastDrawnSalary / 21.67;
    estimatedGratuityAmount = Math.max(5 * dailyWage, completedYears * 2 * dailyWage);
    eligibilityReason = "Eligible under Canada Labour Code (requires at least 12 consecutive months of employment).";
    formulaDescription = `Severance = 2 Days Pay × ${completedYears} Years = C$${Math.round(estimatedGratuityAmount).toLocaleString()}`;
    taxNotes = "Severance pay is taxable employment income in Canada, with options to transfer into an RRSP.";

  } else {
    // Sri Lanka
    schemeName = "Statutory Gratuity";
    governingAct = "Payment of Gratuity Act No. 12 of 1983";
    isEligibleStatutory = completedYears >= 5;
    if (isEligibleStatutory) {
      estimatedGratuityAmount = lastDrawnSalary * 0.5 * completedYears;
      eligibilityReason = `Eligible under Payment of Gratuity Act No. 12 of 1983 (${completedYears} completed years).`;
      formulaDescription = `Gratuity = Last Drawn Salary (${lastDrawnSalary.toLocaleString()}) × 0.5 × ${completedYears} Years = Rs. ${Math.round(estimatedGratuityAmount).toLocaleString()}`;
    } else {
      eligibilityReason = "Statutory gratuity requires at least 5 completed years of continuous service under Sri Lankan law.";
      formulaDescription = "Requires at least 5 completed continuous years.";
    }
    taxNotes = "Statutory gratuity has concessional tax treatment under Section 8 of the Inland Revenue Act.";
  }

  return {
    countryId,
    currency: profile.defaultCurrency,
    currencySymbol: profile.currencySymbol,
    schemeName,
    governingAct,
    employeeType: input.employeeType || "monthly",
    lastDrawnMonthlySalary: Math.round(lastDrawnSalary * 100) / 100,
    completedYears,
    completedMonths,
    totalMonthsOfService: totalMonths,
    isEligibleStatutory,
    eligibilityReason,
    estimatedGratuityAmount: Math.round(estimatedGratuityAmount * 100) / 100,
    formulaDescription,
    taxNotes,
  };
}
