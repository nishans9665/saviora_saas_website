/**
 * Official Australia (ATO) Employment & Tax Rules
 * Sources:
 * - Australian Taxation Office (ATO): https://www.ato.gov.au/
 * - Fair Work Ombudsman (National Employment Standards): https://www.fairwork.gov.au/
 */

export const AUSTRALIA_TAX_BRACKETS_2024_2025 = {
  taxYear: "2024/2025 (Stage 3 Revised)",
  authorityName: "Australian Taxation Office (ATO)",
  authorityUrl: "https://www.ato.gov.au/",
  taxFreeThreshold: 18200,
  brackets: [
    { rate: 0.16, limit: 45000 },   // $18,201 – $45,000 @ 16%
    { rate: 0.30, limit: 135000 },  // $45,001 – $135,000 @ 30%
    { rate: 0.37, limit: 190000 },  // $135,001 – $190,000 @ 37%
  ],
  topRate: 0.45, // Above $190,000 @ 45%
  medicareLevyRate: 0.02, // 2% Medicare levy
  superannuation: {
    statutoryEmployerRateFY2425: 0.115, // 11.5% from 1 July 2024
    statutoryEmployerRateFY2526: 0.120, // 12% from 1 July 2025
    employeeDeductionRate: 0.00,        // 0% - paid 100% by employer
    maximumContributionBasePerQuarter: 65070,
  },
  gst: {
    standardRate: 0.10, // 10%
    standardRates: [
      { label: "Standard GST (10%)", rate: 10 },
      { label: "GST-Free / Export (0%)", rate: 0 },
    ],
  },
  redundancy: {
    governingAct: "Fair Work Act 2009 (NES)",
    minimumServiceYears: 1,
  },
  overtime: {
    governingAct: "Fair Work Modern Awards",
    standardWeeklyHours: 38,
    standardMonthlyHours: 165,
    normalMultiplier: 1.5,
    holidayMultiplier: 2.0,
  },
};
