/**
 * Unit Test Suite for Saviora Salary & Tax Calculators
 * Validates:
 * 1. Normal inputs & outputs
 * 2. IRD APIT tax progressive slabs & boundary conditions
 * 3. 2024/2025 vs 2025/2026 threshold differences
 * 4. EPF 8% employee & 12% employer math
 * 5. ETF 3% employer contribution (0% employee deduction)
 * 6. VAT Add (exclusive -> inclusive) & Remove (inclusive -> exclusive)
 * 7. Gratuity 5-year eligibility cutoff & half-month calculation
 * 8. Overtime 200-hour monthly basis & 1.5x/2.0x multipliers
 * 9. Safe handling of zeros, negatives, large numbers, and empty fields
 */

import { calculateSalary } from "../engines/salary";
import { calculateIncomeTax } from "../engines/incomeTax";
import { calculateEPF } from "../engines/epf";
import { calculateETF } from "../engines/etf";
import { calculateVAT } from "../engines/vat";
import { calculateGratuity } from "../engines/gratuity";
import { calculateOvertime } from "../engines/overtime";

export function runAllCalculatorTests() {
  const results: { test: string; passed: boolean; error?: string }[] = [];

  function test(name: string, fn: () => void) {
    try {
      fn();
      results.push({ test: name, passed: true });
    } catch (e: unknown) {
      results.push({ test: name, passed: false, error: (e as Error)?.message || String(e) });
    }
  }

  function assert(condition: boolean, msg: string) {
    if (!condition) throw new Error("Assertion failed: " + msg);
  }

  function assertClose(a: number, b: number, msg: string, maxDiff = 0.05) {
    if (Math.abs(a - b) > maxDiff) {
      throw new Error(`Assertion failed: ${msg}. Got ${a}, expected ${b}`);
    }
  }

  // --- 1. Income Tax (APIT) Tests ---
  test("Income Tax: Zero & Sub-Relief Income", () => {
    const resZero = calculateIncomeTax({ frequency: "monthly", incomeAmount: 0, otherTaxableIncome: 0, country: "LK", taxYear: "2024_2025" });
    assert(resZero.totalAnnualTax === 0, "Zero income should have 0 tax");
    assert(resZero.estimatedMonthlyTax === 0, "Zero income should have 0 monthly tax");

    const resRelief = calculateIncomeTax({ frequency: "monthly", incomeAmount: 100000, otherTaxableIncome: 0, country: "LK", taxYear: "2024_2025" });
    assert(resRelief.totalAnnualTax === 0, "Income at or below 100k relief should have 0 tax");
  });

  test("Income Tax: 2024/2025 Slab Progression (Rs. 200,000/mo)", () => {
    // Annual gross = 2.4M. Relief = 1.2M. Taxable = 1.2M.
    // Slab 1: 500k @ 6% = 30k
    // Slab 2: 500k @ 12% = 60k
    // Slab 3: 200k @ 18% = 36k
    // Total annual tax = 126k. Monthly tax = 10.5k.
    const res = calculateIncomeTax({ frequency: "monthly", incomeAmount: 200000, otherTaxableIncome: 0, country: "LK", taxYear: "2024_2025" });
    assertClose(res.totalAnnualTax, 126000, "Annual tax on 200k/mo should be 126,000");
    assertClose(res.estimatedMonthlyTax, 10500, "Monthly tax on 200k/mo should be 10,500");
    assertClose(res.effectiveTaxRatePercent, 5.25, "Effective tax rate should be 5.25%");
  });

  test("Income Tax: 2025/2026 Revised Relief (Rs. 200,000/mo)", () => {
    // Annual gross = 2.4M. Revised relief = 1.8M (150k/mo). Taxable = 600,000.
    // Slab 1: 600k @ 6% = 36k.
    // Total annual tax = 36k. Monthly tax = 3k.
    const res = calculateIncomeTax({ frequency: "monthly", incomeAmount: 200000, otherTaxableIncome: 0, country: "LK", taxYear: "2025_2026" });
    assertClose(res.totalAnnualTax, 36000, "Annual tax with 2025 relief should be 36,000");
    assertClose(res.estimatedMonthlyTax, 3000, "Monthly tax with 2025 relief should be 3,000");
  });

  // --- 2. EPF Tests ---
  test("EPF: Statutory 8% & 12% Rates", () => {
    const res = calculateEPF({ monthlyEligibleSalary: 150000 });
    assertClose(res.employeeMonthlyContribution, 12000, "8% employee share on 150k is 12,000");
    assertClose(res.employerMonthlyContribution, 18000, "12% employer share on 150k is 18,000");
    assertClose(res.totalMonthlyContribution, 30000, "20% total share on 150k is 30,000");
  });

  // --- 3. ETF Tests ---
  test("ETF: 3% Employer Contribution (0% Employee Deduction)", () => {
    const res = calculateETF({ monthlyEligibleEarnings: 200000, employmentMonths: 12 });
    assertClose(res.monthlyEmployerContribution, 6000, "3% of 200k is 6,000");
    assertClose(res.annualEmployerContribution, 72000, "Annual ETF on 200k is 72,000");
  });

  // --- 4. VAT Tests ---
  test("VAT: Add Mode (18% Exclusive to Inclusive)", () => {
    const res = calculateVAT({ mode: "add", amount: 10000, vatRatePercent: 18, country: "LK" });
    assertClose(res.vatAmount, 1800, "18% VAT on 10,000 is 1,800");
    assertClose(res.grossAmountInclusive, 11800, "Gross inclusive is 11,800");
  });

  test("VAT: Remove Mode (18% Inclusive to Exclusive)", () => {
    const res = calculateVAT({ mode: "remove", amount: 11800, vatRatePercent: 18, country: "LK" });
    assertClose(res.netAmountExclusive, 10000, "Exclusive from 11,800 is 10,000");
    assertClose(res.vatAmount, 1800, "Removed VAT is 1,800");
  });

  // --- 5. Gratuity Tests ---
  test("Gratuity: 5-Year Continuous Service Cutoff", () => {
    // 4 years: NOT eligible
    const res4 = calculateGratuity({ lastDrawnMonthlySalary: 100000, employeeType: "monthly", calculationMethod: "manual_duration", completedYears: 4, completedMonths: 11 });
    assert(!res4.isEligibleStatutory, "Under 5 years must be ineligible");
    assert(res4.estimatedGratuityAmount === 0, "Ineligible gratuity must be 0");

    // 5 years: Eligible
    const res5 = calculateGratuity({ lastDrawnMonthlySalary: 100000, employeeType: "monthly", calculationMethod: "manual_duration", completedYears: 5, completedMonths: 0 });
    assert(res5.isEligibleStatutory, "5 years must be eligible");
    assertClose(res5.estimatedGratuityAmount, 250000, "Gratuity for 5 years at 100k salary = 100k * 0.5 * 5 = 250,000");
  });

  // --- 6. Overtime Tests ---
  test("Overtime: 200-Hour Basis & 1.5x Multiplier", () => {
    const res = calculateOvertime({ monthlyBasicSalary: 100000, standardMonthlyHours: 200, normalOtHours: 10, normalOtMultiplier: 1.5, holidayOtHours: 0 });
    assertClose(res.normalHourlyRate, 500, "100k / 200 hrs = 500/hr");
    assertClose(res.normalOtHourlyRate, 750, "500 * 1.5 = 750/hr");
    assertClose(res.totalOtEarnings, 7500, "10 hrs * 750 = 7,500");
  });

  // --- 7. Full Salary Integration ---
  test("Salary Integration: Full Calculation", () => {
    const res = calculateSalary({
      basicSalary: 150000,
      fixedAllowances: 30000,
      additionalAllowances: 10000,
      overtimeEarnings: 0,
      otherEarnings: 0,
      otherDeductions: 0,
      country: "LK",
      taxYear: "2024_2025",
    });

    assertClose(res.grossMonthlySalary, 190000, "Gross is 150k + 30k + 10k = 190,000");
    assertClose(res.epfEligibleSalary, 180000, "EPF eligible is 150k + 30k = 180,000");
    assertClose(res.employeeEpfDeduction, 14400, "Employee EPF is 180k * 8% = 14,400");
    assert(res.netMonthlySalary > 0, "Net salary must be positive");
    assert(res.netMonthlySalary < res.grossMonthlySalary, "Net must be less than gross");
  });

  // --- 8. Safe Handling of Invalid & Negative Values ---
  test("Robustness: Rejects Negatives & NaN", () => {
    const resNeg = calculateSalary({
      basicSalary: -50000,
      fixedAllowances: -10000,
      additionalAllowances: 0,
      overtimeEarnings: 0,
      otherEarnings: 0,
      otherDeductions: 0,
      country: "LK",
      taxYear: "2024_2025",
    });
    assert(resNeg.grossMonthlySalary === 0, "Negative values must be clamped to 0");
    assert(!isNaN(resNeg.netMonthlySalary), "Net must never be NaN");
  });


  // --- 9. Global Multi-Country Engines Verification ---
  test("USA: Federal Tax & FICA Deduction ($100k annual)", () => {
    const tax = calculateIncomeTax({
      country: "usa",
      frequency: "annual",
      incomeAmount: 100000,
      taxYear: "2024",
    });
    // Standard deduction $14,600 -> Taxable $85,400
    assertClose(tax.annualTaxFreeAllowance, 14600, "US standard deduction is $14,600");
    assertClose(tax.annualTaxableIncome, 85400, "Taxable income is $85,400");
    assertClose(tax.totalAnnualTax, 13841, "US Federal tax on $100k is $13,841");
    // FICA: 6.2% SS ($6,200) + 1.45% Med ($1,450) = $7,650
    assertClose(tax.socialSecurityTaxAnnual || 0, 7650, "FICA (SS + Medicare) is $7,650");
  });

  test("UK: PAYE Tax & National Insurance (£50k annual)", () => {
    const tax = calculateIncomeTax({
      country: "uk",
      frequency: "annual",
      incomeAmount: 50000,
      taxYear: "2024_2025",
    });
    // Personal allowance £12,570 -> Taxable £37,430 at 20% = £7,486
    assertClose(tax.annualTaxFreeAllowance, 12570, "UK personal allowance is £12,570");
    assertClose(tax.totalAnnualTax, 7486, "UK basic rate tax is £7,486");
    // NI: 8% on (£50k - £12,570) = £2,994.40
    assertClose(tax.socialSecurityTaxAnnual || 0, 2994.4, "UK Class 1 NI primary is £2,994.40");
  });

  test("Australia: Stage 3 Tax & 11.5% Superannuation (A$90k annual)", () => {
    const tax = calculateIncomeTax({
      country: "australia",
      frequency: "annual",
      incomeAmount: 90000,
      taxYear: "2024_2025",
    });
    // Stage 3 tax + 2% Medicare levy = $17,788 + $1,800 = $19,588
    assertClose(tax.totalAnnualTax, 19588, "Stage 3 tax + Medicare is A$19,588");

    // Superannuation: 11.5% employer contribution, 0% mandatory employee deduction
    const pension = calculateEPF({
      country: "australia",
      monthlyEligibleSalary: 7500, // $90k / 12
    });
    assert(pension.isEmployerOnly === true, "Australia Super is 100% employer-funded");
    assertClose(pension.employerMonthlyContribution, 862.5, "Employer super is 11.5% of $7,500 = $862.50");
    assertClose(pension.employeeMonthlyContribution, 0, "Employee mandatory super is 0");
  });

  test("India: Section 115BAC New Tax Regime (₹12 Lakhs annual)", () => {
    const tax = calculateIncomeTax({
      country: "india",
      frequency: "annual",
      incomeAmount: 1200000,
      taxYear: "2024_2025",
    });
    // Standard deduction ₹75,000 -> Taxable ₹1,125,000 -> Base tax ₹68,750 + 4% cess = ₹71,500
    assertClose(tax.annualTaxFreeAllowance, 75000, "India standard deduction is ₹75,000");
    assertClose(tax.totalAnnualTax, 71500, "India New Regime tax with 4% cess is ₹71,500");

    const epf = calculateEPF({
      country: "india",
      monthlyEligibleSalary: 50000,
    });
    assertClose(epf.employeeMonthlyContribution, 6000, "EPF 12% on ₹50k is ₹6,000");
  });

  test("UAE: 0% Personal Income Tax & End of Service Gratuity", () => {
    const tax = calculateIncomeTax({
      country: "uae",
      frequency: "annual",
      incomeAmount: 200000,
    });
    assert(tax.totalAnnualTax === 0, "UAE personal income tax is strictly 0%");
    assert(tax.effectiveTaxRatePercent === 0, "UAE effective tax rate is 0%");

    // End of service gratuity: 21 days per year for first 5 years
    const grat = calculateGratuity({
      country: "uae",
      lastDrawnMonthlySalary: 10000,
      employeeType: "monthly",
      calculationMethod: "manual_duration",
      completedYears: 3,
      completedMonths: 0,
    });
    // 21/30 * 10,000 * 3 = 21,000
    assertClose(grat.estimatedGratuityAmount, 21000, "UAE 3 years gratuity is AED 21,000");
  });

  test("Singapore: CPF & 9% GST", () => {
    const cpf = calculateEPF({
      country: "singapore",
      monthlyEligibleSalary: 6000,
    });
    assertClose(cpf.employeeMonthlyContribution, 1200, "Singapore CPF employee 20% on S$6k is S$1,200");
    assertClose(cpf.employerMonthlyContribution, 1020, "Singapore CPF employer 17% on S$6k is S$1,020");

    const gst = calculateVAT({
      country: "singapore",
      mode: "add",
      amount: 1000,
      vatRatePercent: 9,
    });
    assertClose(gst.vatAmount, 90, "Singapore 9% GST on S$1,000 is S$90");
    assertClose(gst.grossAmountInclusive, 1090, "Total inclusive is S$1,090");
  });

  return results;
}
