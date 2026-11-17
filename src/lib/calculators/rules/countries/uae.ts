/**
 * Official United Arab Emirates (FTA & MOHRE) Employment & Tax Rules
 * Sources:
 * - Federal Tax Authority (FTA): https://tax.gov.ae/
 * - Ministry of Human Resources and Emiratisation (MOHRE): https://www.mohre.gov.ae/
 * - Federal Decree-Law No. 33 of 2021 regarding Regulation of Employment Relationships
 */

export const UAE_TAX_RULES = {
  taxYear: "2024 / 2025",
  authorityName: "Federal Tax Authority (FTA)",
  authorityUrl: "https://tax.gov.ae/",
  personalIncomeTaxRate: 0.00, // 0% Personal Income Tax
  gpssaNationalPension: {
    uaeNationalEmployeeRate: 0.05, // 5% for UAE nationals
    uaeNationalEmployerRate: 0.125, // 12.5%
    expatriateEmployeeRate: 0.00,  // 0% for expatriates
  },
  endOfServiceGratuity: {
    governingAct: "Federal Decree-Law No. 33 of 2021",
    minimumServiceYears: 1,
    tier1DaysPerYear: 21, // 21 days basic wage per year for first 5 years
    tier2DaysPerYear: 30, // 30 days basic wage for each additional year beyond 5 years
    maximumCapYearsGrossSalary: 2, // Maximum cap: 2 years' gross pay
  },
  vat: {
    standardRate: 0.05, // 5% under Federal Decree-Law No. 8 of 2017
    standardRates: [
      { label: "Standard VAT (5%)", rate: 5 },
      { label: "Zero-Rated (0%)", rate: 0 },
    ],
  },
  overtime: {
    governingAct: "UAE Labour Law (Federal Decree-Law No. 33 of 2021)",
    standardDailyHours: 8,
    standardWeeklyHours: 48,
    standardMultiplier: 1.25, // 1.25x normal hourly wage
    nightOrWeekendMultiplier: 1.50, // 1.50x for 10pm-4am or weekend rest days
  },
};
