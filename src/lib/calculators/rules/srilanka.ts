import { TaxRuleset } from "../types";

/**
 * Official Sri Lanka Inland Revenue Department (IRD) Tax Rulesets
 * Source: Inland Revenue (Amendment) Act, No. 45 of 2022 & Circular SEC/2022/E/03
 */
export const SRI_LANKA_TAX_RULESET_2024_2025: TaxRuleset = {
  id: "2024_2025",
  name: "Current Slabs (2024/2025 Assessment Year)",
  effectiveDate: "Effective from January 1, 2023 onwards",
  officialSource: "Inland Revenue (Amendment) Act No. 45 of 2022 / IRD Circular SEC/2022/E/03",
  annualRelief: 1200000, // LKR 1,200,000 / year
  monthlyRelief: 100000,  // LKR 100,000 / month
  slabWidth: 500000,     // LKR 500,000 per slab (LKR 41,666.67 / month)
  brackets: [
    { rate: 0.06, annualLimit: 500000 },   // 1st 500k @ 6%
    { rate: 0.12, annualLimit: 1000000 },  // 2nd 500k @ 12%
    { rate: 0.18, annualLimit: 1500000 },  // 3rd 500k @ 18%
    { rate: 0.24, annualLimit: 2000000 },  // 4th 500k @ 24%
    { rate: 0.30, annualLimit: 2500000 },  // 5th 500k @ 30%
  ],
  topRate: 0.36, // Any taxable balance above LKR 2,500,000 (total income > LKR 3,700,000) @ 36%
};

/**
 * Official Sri Lanka Revised Personal Income Tax Ruleset (2025/2026 Proposed)
 * Source: Budget 2025 / IMF agreement increasing personal tax-free relief to LKR 150,000/month
 */
export const SRI_LANKA_TAX_RULESET_2025_2026: TaxRuleset = {
  id: "2025_2026",
  name: "Revised Relief (2025/2026 Assessment Year)",
  effectiveDate: "Effective April 1, 2025",
  officialSource: "Ministry of Finance & IRD 2025 Tax Reform / Tax Relief Expansion",
  annualRelief: 1800000, // LKR 1,800,000 / year
  monthlyRelief: 150000,  // LKR 150,000 / month
  slabWidth: 600000,     // LKR 600,000 per slab (LKR 50,000 / month)
  brackets: [
    { rate: 0.06, annualLimit: 600000 },   // 1st 600k @ 6%
    { rate: 0.12, annualLimit: 1200000 },  // 2nd 600k @ 12%
    { rate: 0.18, annualLimit: 1800000 },  // 3rd 600k @ 18%
    { rate: 0.24, annualLimit: 2400000 },  // 4th 600k @ 24%
    { rate: 0.30, annualLimit: 3000000 },  // 5th 600k @ 30%
  ],
  topRate: 0.36,
};

export const SRI_LANKA_STATUTORY_RATES = {
  epf: {
    employeeStatutoryRate: 0.08, // 8%
    employerStatutoryRate: 0.12, // 12%
    totalStatutoryRate: 0.20,    // 20%
    officialAct: "Employees' Provident Fund Act, No. 15 of 1958",
    administeringBody: "Central Bank of Sri Lanka & Department of Labour",
  },
  etf: {
    employerStatutoryRate: 0.03, // 3%
    employeeDeductionRate: 0.00, // 0% - NEVER deducted from employee
    officialAct: "Employees' Trust Fund Act, No. 46 of 1980",
    administeringBody: "Employees' Trust Fund Board (ETFB)",
  },
  vat: {
    standardRate: 0.18, // 18% effective Jan 1, 2024
    historicalRate: 0.15, // 15% pre-2024
    officialAct: "Value Added Tax (Amendment) Act, No. 32 of 2023",
    effectiveDate: "January 1, 2024",
  },
  gratuity: {
    minimumContinuousServiceYears: 5,
    monthlyPaidMultiplierPerYear: 0.5, // 1/2 month's last drawn basic + COLA per completed year
    dailyPaidDaysPerYear: 14,          // 14 days wages per completed year
    minimumEmployerWorkmenCount: 15,   // Applies to establishments with 15+ workmen
    officialAct: "Payment of Gratuity Act, No. 12 of 1983",
    settlementDeadlineDays: 30,        // Must be paid within 30 days of termination
  },
  overtime: {
    standardMonthlyHoursBasis: 200,    // Shop and Office Employees Act divisor (45 hrs/week / 8 hrs/day)
    wagesBoardMonthlyHoursBasis: 240,  // Wages Board alternate divisor
    normalOvertimeMultiplier: 1.5,     // 1.5x normal hourly rate
    holidayOvertimeMultiplier: 2.0,    // 2.0x normal hourly rate on rest/poya days
    officialAct: "Shop and Office Employees Act, No. 19 of 1954",
  },
};
