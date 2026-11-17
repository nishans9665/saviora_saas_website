import { calculateInvestmentReturn } from "../engines/investmentReturn";
import { calculateSIP } from "../engines/sip";
import { calculateSavingsGoal } from "../engines/savingsGoal";
import { calculateRetirement } from "../engines/retirement";
import { calculateInvestmentProfitLoss } from "../engines/investmentProfitLoss";
import { calculateInflation } from "../engines/inflation";
import { calculateMonthlySavings } from "../engines/monthlySavings";
import { calculateROI } from "../engines/roi";
import { calculateInvestmentGrowth } from "../engines/investmentGrowth";
import { calculateEmergencyFund } from "../engines/emergencyFund";

function assert(condition: boolean, msg: string) {
  if (!condition) throw new Error(`Assertion failed: ${msg}`);
}

function assertClose(actual: number, expected: number, tolerance = 0.5, msg = "") {
  if (Math.abs(actual - expected) > tolerance) {
    throw new Error(`Expected ${expected} ±${tolerance}, got ${actual}. ${msg}`);
  }
}

export function runAllInvestmentCalculatorTests(): { passed: number; total: number; details: string[] } {
  const details: string[] = [];
  let passed = 0;

  // 1. Investment Return
  try {
    const res = calculateInvestmentReturn({
      initialInvestment: 10000,
      finalValue: 20000,
      durationYears: 5,
    });
    assertClose(res.netGain, 10000, 0.01, "Lump sum gain");
    assertClose(res.totalReturnPercent, 100, 0.01, "100% gain");
    // CAGR: (20000/10000)^(1/5) - 1 = 14.87%
    assertClose(res.annualizedReturnCAGR, 14.87, 0.05, "5-year CAGR 14.87%");
    passed++;
    details.push("✓ Investment Return: 5-year 100% gain CAGR calculation");
  } catch (e: any) {
    details.push(`✗ Investment Return failed: ${e.message}`);
  }

  // 2. SIP Calculator
  try {
    const res = calculateSIP({
      periodicInvestment: 500,
      annualReturnRate: 12,
      durationYears: 10,
      frequency: "monthly",
      timing: "end",
    });
    // Total invested: 500 * 120 = 60,000
    assertClose(res.totalInvested, 60000, 0.01, "Total SIP invested");
    // FV of 500/mo at 12% annual (1% mo) for 120 months = 500 * ((1.01^120 - 1)/0.01) = 115,019.34
    assertClose(res.futureValue, 115019.34, 1.0, "SIP FV at 12%");
    assertClose(res.estimatedReturns, 55019.34, 1.0, "SIP returns");
    passed++;
    details.push("✓ SIP: 10-year monthly SIP at 12% compounding");
  } catch (e: any) {
    details.push(`✗ SIP failed: ${e.message}`);
  }

  // 3. Savings Goal
  try {
    const res = calculateSavingsGoal({
      goalAmount: 50000,
      currentSavings: 10000,
      durationYears: 3,
      annualInterestRate: 6,
    });
    // FV of 10000 at 6% for 3 yrs (monthly 0.5% for 36 mos) = 10000 * 1.005^36 = 11966.81
    assertClose(res.futureValueOfCurrentSavings, 11966.81, 1.0, "FV of existing savings");
    assert(res.requiredMonthlyContribution > 0, "Required monthly contribution positive");
    passed++;
    details.push("✓ Savings Goal: Sinking fund required contribution calculation");
  } catch (e: any) {
    details.push(`✗ Savings Goal failed: ${e.message}`);
  }

  // 4. Retirement Calculator
  try {
    const res = calculateRetirement({
      currentAge: 30,
      retirementAge: 65,
      currentSavings: 25000,
      monthlyContribution: 1000,
      desiredMonthlyRetirementIncome: 4000,
      expectedAnnualReturn: 7,
      expectedInflationRate: 2.5,
      retirementDurationYears: 25,
    });
    assert(res.yearsToRetire === 35, "35 years to retire");
    assert(res.projectedFundAtRetirement > 1000000, "Corpus exceeds $1M");
    assert(res.timeline.length > 35, "Timeline generated");
    passed++;
    details.push("✓ Retirement: 35-year accumulation + inflation adjusted decumulation");
  } catch (e: any) {
    details.push(`✗ Retirement failed: ${e.message}`);
  }

  // 5. Investment Profit & Loss
  try {
    const res = calculateInvestmentProfitLoss({
      purchasePricePerUnit: 150,
      sellingPricePerUnit: 195,
      quantity: 100,
      purchaseFees: 15,
      sellingFees: 15,
      dividendsIncome: 200,
    });
    // Cost: 15000 + 15 = 15015
    // Sale: 19500 - 15 + 200 = 19685
    // Net: 19685 - 15015 = 4670
    assertClose(res.totalPurchaseCost, 15015, 0.01, "Purchase cost");
    assertClose(res.netProfit, 4670, 0.01, "Net profit with dividends & fees");
    assert(res.isProfit === true, "Is profitable");
    passed++;
    details.push("✓ Profit & Loss: Stock trades with fees and dividend yields");
  } catch (e: any) {
    details.push(`✗ Profit & Loss failed: ${e.message}`);
  }

  // 6. Inflation Calculator
  try {
    const res = calculateInflation({
      currentAmount: 100000,
      annualInflationRate: 3,
      durationYears: 10,
    });
    // 100000 * (1.03^10) = 134391.64
    assertClose(res.estimatedFutureCost, 134391.64, 1.0, "Future cost with 3% inflation");
    assertClose(res.yearsToDoublePrices, 24, 0.5, "Rule of 72 doubling years");
    passed++;
    details.push("✓ Inflation: 10-year compounding purchasing power erosion");
  } catch (e: any) {
    details.push(`✗ Inflation failed: ${e.message}`);
  }

  // 7. Monthly Savings Calculator
  try {
    const res = calculateMonthlySavings({
      initialSavings: 5000,
      monthlyContribution: 300,
      annualInterestRate: 5,
      durationYears: 5,
    });
    assertClose(res.totalPrincipal, 5000 + (300 * 60), 0.01, "Total principal 23,000");
    assert(res.finalBalance > res.totalPrincipal, "Interest increases final balance");
    assert(res.interestAdvantage > 0, "Interest advantage positive");
    passed++;
    details.push("✓ Monthly Savings: Compound interest vs zero-interest savings");
  } catch (e: any) {
    details.push(`✗ Monthly Savings failed: ${e.message}`);
  }

  // 8. ROI Calculator
  try {
    const res = calculateROI({
      initialCost: 50000,
      finalValue: 75000,
      additionalIncome: 5000,
      expenses: 2000,
      durationYears: 3,
    });
    // Net: 75000 + 5000 - 50000 - 2000 = 28000
    // ROI: (28000 / 50000) * 100 = 56%
    assertClose(res.netProfit, 28000, 0.01, "ROI net profit");
    assertClose(res.roiPercentage, 56, 0.01, "ROI 56%");
    assert(res.annualizedROI !== undefined && res.annualizedROI > 0, "Annualized ROI computed");
    passed++;
    details.push("✓ ROI: Multi-year return with maintenance expenses & rental income");
  } catch (e: any) {
    details.push(`✗ ROI failed: ${e.message}`);
  }

  // 9. Investment Growth Calculator
  try {
    const res = calculateInvestmentGrowth({
      initialInvestment: 20000,
      regularContribution: 400,
      annualReturnRate: 8,
      durationYears: 10,
      contributionFrequency: "monthly",
      compoundingFrequency: "monthly",
      expenseRatioPercent: 0.5,
    });
    assertClose(res.totalInvestedCapital, 20000 + (400 * 120), 0.01, "Invested capital 68,000");
    assert(res.netFutureValue > res.totalInvestedCapital, "Portfolio growth verified");
    assert(res.totalFeesPaid > 0, "Expense ratio deductions verified");
    passed++;
    details.push("✓ Investment Growth: Multi-frequency compounding with expense ratio fees");
  } catch (e: any) {
    details.push(`✗ Investment Growth failed: ${e.message}`);
  }

  // 10. Emergency Fund Calculator
  try {
    const res = calculateEmergencyFund({
      monthlyHousing: 1200,
      monthlyFood: 600,
      monthlyUtilities: 300,
      monthlyTransportation: 250,
      monthlyHealthcare: 150,
      monthlyDebtMinimums: 200,
      monthlyOtherEssentials: 100,
      existingSavings: 5000,
      desiredMonths: 6,
      monthlyContribution: 500,
    });
    // Total monthly: 1200+600+300+250+150+200+100 = 2800
    assertClose(res.totalEssentialMonthlyExpenses, 2800, 0.01, "Total monthly essentials");
    // Target: 2800 * 6 = 16800
    assertClose(res.emergencyFundTarget, 16800, 0.01, "6-month emergency target");
    assertClose(res.remainingAmountNeeded, 11800, 0.01, "Remaining needed");
    // Months to reach: 11800 / 500 = 24 months
    assert(res.estimatedMonthsToReachGoal === 24, "24 months to reach goal");
    assert(res.milestones.length === 4, "4 milestone comparisons");
    passed++;
    details.push("✓ Emergency Fund: Itemized essentials with 4 milestone tiers");
  } catch (e: any) {
    details.push(`✗ Emergency Fund failed: ${e.message}`);
  }

  return { passed, total: 10, details };
}
