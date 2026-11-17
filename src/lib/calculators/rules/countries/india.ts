/**
 * Official India (Income Tax Department & EPFO) Employment & Tax Rules
 * Sources:
 * - Income Tax Department: https://www.incometax.gov.in/
 * - Employees' Provident Fund Organisation (EPFO): https://www.epfindia.gov.in/
 * - Payment of Gratuity Act, 1972
 */

export const INDIA_TAX_BRACKETS_FY2425 = {
  taxYear: "FY 2024-25 (AY 2025-26 Revised)",
  authorityName: "Income Tax Department of India",
  authorityUrl: "https://www.incometax.gov.in/",
  newRegime: {
    standardDeduction: 75000, // Budget 2024 increased to ₹75,000 for salaried
    rebate87ALimit: 700000,   // Nil tax up to ₹7,00,000 taxable (₹7.75L gross)
    brackets: [
      { rate: 0.05, limit: 700000 },   // ₹3,00,001 – ₹7,00,000 @ 5%
      { rate: 0.10, limit: 1000000 },  // ₹7,00,001 – ₹10,00,000 @ 10%
      { rate: 0.15, limit: 1200000 },  // ₹10,00,001 – ₹12,00,000 @ 15%
      { rate: 0.20, limit: 1500000 },  // ₹12,00,001 – ₹15,00,000 @ 20%
    ],
    topRate: 0.30, // Above ₹15,00,000 @ 30%
    cessRate: 0.04, // 4% Health & Education Cess
  },
  epf: {
    statutoryEmployeeRate: 0.12, // 12%
    statutoryEmployerRate: 0.12, // 12% (3.67% EPF + 8.33% EPS)
    statutoryWageCeilingMonthly: 15000,
  },
  gratuity: {
    governingAct: "Payment of Gratuity Act, 1972",
    minimumServiceYears: 5,
    multiplierFraction: 15 / 26, // 15 days wages out of 26 working days per year
    statutoryCap: 2000000,       // ₹20 Lakhs statutory tax exemption limit
  },
  gst: {
    standardRates: [
      { label: "Standard GST (18%)", rate: 18 },
      { label: "Essential Goods GST (12%)", rate: 12 },
      { label: "Basic Goods GST (5%)", rate: 5 },
      { label: "Luxury / Sin Goods GST (28%)", rate: 28 },
    ],
  },
  overtime: {
    governingAct: "Factories Act, 1948",
    standardDailyHours: 9,
    standardWeeklyHours: 48,
    standardMultiplier: 2.0, // Double normal rate of wages
  },
};
