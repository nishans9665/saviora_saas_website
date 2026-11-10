/**
 * Official USA Federal & Statutory Employment Tax Rules
 * Sources:
 * - Internal Revenue Service (IRS): https://www.irs.gov/
 * - Social Security Administration (SSA): https://www.ssa.gov/
 * - US Department of Labor (FLSA Overtime): https://www.dol.gov/
 */

export const USA_TAX_BRACKETS_2024 = {
  taxYear: "2024",
  authorityName: "Internal Revenue Service (IRS)",
  authorityUrl: "https://www.irs.gov/",
  standardDeduction: {
    single: 14600,
    marriedFilingJointly: 29200,
  },
  bracketsSingle: [
    { rate: 0.10, limit: 11600 },
    { rate: 0.12, limit: 47150 },
    { rate: 0.22, limit: 100525 },
    { rate: 0.24, limit: 191950 },
    { rate: 0.32, limit: 243725 },
    { rate: 0.35, limit: 609350 },
  ],
  topRate: 0.37, // over $609,350
  fica: {
    socialSecurityRateEmployee: 0.062, // 6.2%
    socialSecurityRateEmployer: 0.062, // 6.2%
    socialSecurityWageBaseLimit2024: 168600,
    medicareRateEmployee: 0.0145,       // 1.45%
    medicareRateEmployer: 0.0145,       // 1.45%
    additionalMedicareRate: 0.009,      // 0.9% on earnings > $200k
    additionalMedicareThreshold: 200000,
  },
  pension401k: {
    defaultEmployeeRate: 0.05, // 5% typical default
    typicalEmployerMatchRate: 0.03, // 3% safe harbor / typical match
    electiveDeferralLimit2024: 23000,
  },
  salesTax: {
    averageRate: 0.065, // ~6.5% typical combined state/local
    standardRates: [
      { label: "California Average (~8.8%)", rate: 8.8 },
      { label: "New York Average (~8.5%)", rate: 8.5 },
      { label: "Texas Average (~8.25%)", rate: 8.25 },
      { label: "Florida Average (~7.0%)", rate: 7.0 },
      { label: "No State Sales Tax (OR/NH/DE/MT)", rate: 0.0 },
    ],
  },
  overtime: {
    governingAct: "Fair Labor Standards Act (FLSA)",
    standardWeeklyHours: 40,
    normalMultiplier: 1.5,
  },
};
