/**
 * Official Singapore (IRAS & CPF) Employment & Tax Rules
 * Sources:
 * - Inland Revenue Authority of Singapore (IRAS): https://www.iras.gov.sg/
 * - Central Provident Fund Board (CPF): https://www.cpf.gov.sg/
 * - Ministry of Manpower (MOM): https://www.mom.gov.sg/
 */

export const SINGAPORE_TAX_BRACKETS_YA2024 = {
  taxYear: "YA 2024 / YA 2025",
  authorityName: "Inland Revenue Authority of Singapore (IRAS)",
  authorityUrl: "https://www.iras.gov.sg/",
  taxFreeThreshold: 20000,
  brackets: [
    { rate: 0.02, limit: 30000 },    // $20,001 – $30,000 @ 2%
    { rate: 0.035, limit: 40000 },   // $30,001 – $40,000 @ 3.5%
    { rate: 0.07, limit: 80000 },    // $40,001 – $80,000 @ 7%
    { rate: 0.115, limit: 120000 },  // $80,001 – $120,000 @ 11.5%
    { rate: 0.15, limit: 160000 },   // $120,001 – $160,000 @ 15%
    { rate: 0.18, limit: 200000 },   // $160,001 – $200,000 @ 18%
    { rate: 0.19, limit: 240000 },   // $200,001 – $240,000 @ 19%
    { rate: 0.20, limit: 280000 },   // $240,001 – $280,000 @ 20%
    { rate: 0.22, limit: 320000 },   // $280,001 – $320,000 @ 22%
    { rate: 0.23, limit: 500000 },   // $320,001 – $500,000 @ 23%
  ],
  topRate: 0.24, // Above $500,000 @ 24%
  cpf: {
    // For Singapore Citizen / SPR from 3rd year, age <= 55
    employeeRate: 0.20, // 20%
    employerRate: 0.17, // 17%
    ordinaryWageCeiling2024: 6800, // $6,800/mo (rising to $7,400 in 2025, $8,000 in 2026)
    ordinaryWageCeiling2025: 7400,
  },
  gst: {
    standardRate: 0.09, // 9% effective 1 Jan 2024
    standardRates: [
      { label: "Standard GST (9%)", rate: 9 },
      { label: "Zero-Rated (0%)", rate: 0 },
    ],
  },
  retrenchment: {
    governingAct: "Employment Act (MOM Guidelines)",
    minimumServiceYears: 2,
    customaryPayPerYear: 1.0, // 2 weeks to 1 month salary per year of service
  },
  overtime: {
    governingAct: "Part IV of the Employment Act",
    standardWeeklyHours: 44,
    normalMultiplier: 1.5,
  },
};
