import { EmployerContributionInput, EmployerContributionResult } from "../types";
import { getCountryProfile, normalizeCountryId } from "../rules/countryRegistry";
import { parseSafeNumber } from "../formatters";

export function calculateEmployerContribution(input: EmployerContributionInput): EmployerContributionResult {
  const countryId = normalizeCountryId(input.country);
  const profile = getCountryProfile(countryId);

  const eligibleEarnings = Math.max(0, parseSafeNumber(input.monthlyEligibleEarnings));
  const months = Math.max(1, Math.round(parseSafeNumber(input.employmentMonths, 12)));
  const years = Math.round((months / 12) * 10) / 10;

  let schemeName = "Employer Contribution";
  let rate = 0.03;
  const isStatutoryEmployerOnly = true;
  let benefitsDescription = "";

  if (countryId === "sri-lanka") {
    schemeName = "Employees' Trust Fund (ETF)";
    rate = input.employerRatePercent !== undefined ? parseSafeNumber(input.employerRatePercent) / 100 : 0.03;
    benefitsDescription = "Under Act No. 46 of 1980, 3% is paid 100% by the employer. Members also receive medical assistance and university scholarships.";
  } else if (countryId === "australia") {
    schemeName = "Superannuation Guarantee (Employer)";
    rate = input.employerRatePercent !== undefined ? parseSafeNumber(input.employerRatePercent) / 100 : 0.115;
    benefitsDescription = "Mandatory 11.5% employer-paid superannuation deposited into your complying super fund.";
  } else if (countryId === "singapore") {
    schemeName = "Employer CPF Contribution";
    rate = input.employerRatePercent !== undefined ? parseSafeNumber(input.employerRatePercent) / 100 : 0.17;
    benefitsDescription = "17% employer contribution allocated to Ordinary, Special, and MediSave accounts.";
  } else if (countryId === "uk") {
    schemeName = "Employer National Insurance & Pension";
    rate = input.employerRatePercent !== undefined ? parseSafeNumber(input.employerRatePercent) / 100 : 0.168; // 13.8% NI + 3% Pension
    benefitsDescription = "Employer National Insurance (13.8%) and minimum workplace pension contribution (3%).";
  } else if (countryId === "usa") {
    schemeName = "Employer FICA & 401(k) Match";
    rate = input.employerRatePercent !== undefined ? parseSafeNumber(input.employerRatePercent) / 100 : 0.1065; // 7.65% FICA + 3% 401k match
    benefitsDescription = "Employer share of Social Security (6.2%), Medicare (1.45%), and elective 401(k) matching contributions.";
  } else if (countryId === "india") {
    schemeName = "Employer EPF & EPS Contribution";
    rate = input.employerRatePercent !== undefined ? parseSafeNumber(input.employerRatePercent) / 100 : 0.12;
    benefitsDescription = "Statutory 12% employer contribution (3.67% to Provident Fund + 8.33% to Pension Scheme EPS).";
  } else if (countryId === "uae") {
    schemeName = "End of Service Gratuity Accrual";
    rate = input.employerRatePercent !== undefined ? parseSafeNumber(input.employerRatePercent) / 100 : 0.0583; // 21 days / 365 = ~5.83%
    benefitsDescription = "Statutory end of service benefit accrual funded 100% by the employer under Federal Decree-Law No. 33.";
  } else {
    schemeName = "Employer Social Contributions";
    rate = input.employerRatePercent !== undefined ? parseSafeNumber(input.employerRatePercent) / 100 : 0.0827; // ~5.95% CPP + 2.32% EI
    benefitsDescription = "Mandatory employer contributions to Canada Pension Plan (CPP) and Employment Insurance (EI).";
  }

  const monthlyEmployerContribution = eligibleEarnings * rate;
  const annualEmployerContribution = monthlyEmployerContribution * 12;
  const totalPeriodEmployerContribution = monthlyEmployerContribution * months;

  const annualReturn = (input.annualReturnRatePercent !== undefined ? parseSafeNumber(input.annualReturnRatePercent) : 8) / 100;
  const monthlyReturn = annualReturn / 12;

  let projectedFundValueWithInterest = 0;
  for (let m = 1; m <= months; m++) {
    projectedFundValueWithInterest = (projectedFundValueWithInterest + monthlyEmployerContribution) * (1 + monthlyReturn);
  }

  const estimatedInterestEarned = Math.max(0, projectedFundValueWithInterest - totalPeriodEmployerContribution);

  return {
    countryId,
    currency: profile.defaultCurrency,
    currencySymbol: profile.currencySymbol,
    schemeName,
    monthlyEligibleEarnings: Math.round(eligibleEarnings * 100) / 100,
    employerRatePercent: Math.round(rate * 10000) / 100,
    monthlyEmployerContribution: Math.round(monthlyEmployerContribution * 100) / 100,
    annualEmployerContribution: Math.round(annualEmployerContribution * 100) / 100,
    totalPeriodEmployerContribution: Math.round(totalPeriodEmployerContribution * 100) / 100,
    employmentMonths: months,
    employmentYears: years,
    projectedFundValueWithInterest: Math.round(projectedFundValueWithInterest * 100) / 100,
    estimatedInterestEarned: Math.round(estimatedInterestEarned * 100) / 100,
    isStatutoryEmployerOnly,
    benefitsDescription,
  };
}

export const calculateETF = calculateEmployerContribution;
