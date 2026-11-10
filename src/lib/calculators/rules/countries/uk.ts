/**
 * Official United Kingdom (HMRC) Employment & Tax Rules
 * Sources:
 * - HM Revenue & Customs (HMRC): https://www.gov.uk/government/organisations/hm-revenue-customs
 * - Employment Rights Act 1996 (Statutory Redundancy)
 */

export const UK_TAX_BRACKETS_2024_2025 = {
  taxYear: "2024/2025",
  authorityName: "HM Revenue & Customs (HMRC)",
  authorityUrl: "https://www.gov.uk/government/organisations/hm-revenue-customs",
  personalAllowance: 12570,
  personalAllowanceTaperThreshold: 100000, // Tapers by £1 for every £2 above £100,000
  brackets: [
    { rate: 0.20, limit: 50270 },   // Basic rate: £12,571 to £50,270
    { rate: 0.40, limit: 125140 },  // Higher rate: £50,271 to £125,140
  ],
  topRate: 0.45, // Additional rate: above £125,140
  nationalInsurance: {
    primaryThresholdAnnual: 12570,     // £1,048/month
    upperEarningsLimitAnnual: 50270,   // £4,189/month
    mainRateEmployee: 0.08,            // 8% (effective from April 2024)
    higherRateEmployee: 0.02,          // 2% above UEL
    secondaryRateEmployer: 0.138,      // 13.8% employer NI
  },
  workplacePension: {
    qualifyingEarningsLowerAnnual: 6240,
    qualifyingEarningsUpperAnnual: 50270,
    statutoryEmployeeRate: 0.05,       // 5% (includes 1% tax relief)
    statutoryEmployerRate: 0.03,       // 3% minimum employer contribution
    totalStatutoryRate: 0.08,
  },
  vat: {
    standardRate: 0.20, // 20%
    reducedRate: 0.05,  // 5%
    zeroRate: 0.00,
    standardRates: [
      { label: "Standard Rate (20%)", rate: 20 },
      { label: "Reduced Rate (5%)", rate: 5 },
      { label: "Zero Rate (0%)", rate: 0 },
    ],
  },
  redundancy: {
    governingAct: "Employment Rights Act 1996",
    minimumServiceYears: 2,
    weeklyCap: 700, // Statutory maximum weekly cap
  },
  overtime: {
    governingAct: "Working Time Regulations 1998",
    standardMonthlyHoursBasis: 162.5, // 37.5 hr week basis
    normalMultiplier: 1.5,
  },
};
