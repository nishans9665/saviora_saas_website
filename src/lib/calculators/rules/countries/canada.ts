/**
 * Official Canada (CRA) Employment & Tax Rules
 * Sources:
 * - Canada Revenue Agency (CRA): https://www.canada.ca/en/revenue-agency.html
 * - Canada Labour Code
 */

export const CANADA_TAX_BRACKETS_2024 = {
  taxYear: "2024",
  authorityName: "Canada Revenue Agency (CRA)",
  authorityUrl: "https://www.canada.ca/en/revenue-agency.html",
  basicPersonalAmountFederal: 15705,
  federalBrackets: [
    { rate: 0.15, limit: 55867 },
    { rate: 0.205, limit: 111733 },
    { rate: 0.26, limit: 173205 },
    { rate: 0.29, limit: 246752 },
  ],
  federalTopRate: 0.33,
  estimatedProvincialBenchmarkRate: 0.09, // ~9% average provincial tax
  cpp: {
    employeeRate: 0.0595, // 5.95%
    employerRate: 0.0595, // 5.95%
    basicExemption: 3500,
    ympe2024: 68500,
  },
  ei: {
    employeeRate: 0.0166, // 1.66%
    employerRate: 0.02324, // 1.4x employee rate = ~2.324%
    maximumInsurableEarnings: 63200,
  },
  salesTax: {
    standardRates: [
      { label: "Ontario HST (13%)", rate: 13 },
      { label: "BC (5% GST + 7% PST = 12%)", rate: 12 },
      { label: "Alberta (5% GST only)", rate: 5 },
      { label: "Quebec (GST + QST = ~14.975%)", rate: 14.975 },
      { label: "Atlantic HST (15%)", rate: 15 },
    ],
  },
  severance: {
    governingAct: "Canada Labour Code / Provincial Employment Standards",
    minimumServiceMonths: 12,
  },
  overtime: {
    governingAct: "Canada Labour Code",
    standardWeeklyHours: 40,
    normalMultiplier: 1.5,
  },
};
