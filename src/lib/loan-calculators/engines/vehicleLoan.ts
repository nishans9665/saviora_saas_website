import { VehicleLoanInput, VehicleLoanResult, VehicleLoanTenureComparison } from "../types";
import { parseSafeNumber } from "../currencies";
import { calculateLoanEMI } from "./loanEmi";

export function calculateVehicleLoan(input: VehicleLoanInput): VehicleLoanResult {
  const price = Math.max(0, parseSafeNumber(input.vehiclePrice));
  const downPayment = Math.max(0, parseSafeNumber(input.downPayment));
  const tradeIn = Math.max(0, parseSafeNumber(input.tradeInValue));
  const taxRate = Math.max(0, parseSafeNumber(input.salesTaxRate));
  const dealerFees = Math.max(0, parseSafeNumber(input.dealerFees));
  const includeFees = input.includeFeesInLoan ?? true;
  const rate = Math.max(0, parseSafeNumber(input.annualInterestRate));
  const tenureMonths = Math.max(1, Math.round(parseSafeNumber(input.tenureMonths)));
  const freq = input.paymentFrequency || "monthly";

  const salesTaxAmount = price * (taxRate / 100);
  const totalFees = salesTaxAmount + dealerFees;
  const totalUpfrontCredits = downPayment + tradeIn;

  const basePriceAfterCredits = Math.max(0, price - totalUpfrontCredits);
  const financedAmount = includeFees
    ? Math.max(0, price + totalFees - totalUpfrontCredits)
    : basePriceAfterCredits;

  const ltvRatio = price > 0 ? (financedAmount / price) * 100 : 0;

  const emiRes = calculateLoanEMI({
    loanAmount: financedAmount,
    annualInterestRate: rate,
    tenureYears: 0,
    tenureMonths,
    paymentFrequency: freq,
  });

  const totalOutOfPocketCost =
    totalUpfrontCredits +
    emiRes.totalRepayment +
    (includeFees ? 0 : totalFees);

  // Tenure comparison table: 36, 48, 60, 72, 84 months
  const standardTenures = [36, 48, 60, 72, 84];
  const tenureComparisons: VehicleLoanTenureComparison[] = standardTenures.map((m) => {
    const comp = calculateLoanEMI({
      loanAmount: financedAmount,
      annualInterestRate: rate,
      tenureYears: 0,
      tenureMonths: m,
      paymentFrequency: "monthly",
    });
    return {
      tenureMonths: m,
      monthlyPayment: comp.periodicPayment,
      totalInterest: comp.totalInterest,
      totalCost: financedAmount + comp.totalInterest,
    };
  });

  return {
    vehiclePrice: Math.round(price * 100) / 100,
    downPayment: Math.round(downPayment * 100) / 100,
    tradeInValue: Math.round(tradeIn * 100) / 100,
    totalUpfrontCredits: Math.round(totalUpfrontCredits * 100) / 100,
    salesTaxAmount: Math.round(salesTaxAmount * 100) / 100,
    dealerFees: Math.round(dealerFees * 100) / 100,
    totalFees: Math.round(totalFees * 100) / 100,
    financedAmount: Math.round(financedAmount * 100) / 100,
    periodicPayment: emiRes.periodicPayment,
    monthlyEquivalent: emiRes.monthlyEquivalent,
    totalInterest: emiRes.totalInterest,
    totalLoanRepayment: emiRes.totalRepayment,
    totalOutCount: emiRes.totalPaymentsCount,
    totalOutOfPocketCost: Math.round(totalOutOfPocketCost * 100) / 100,
    ltvRatio: Math.round(ltvRatio * 10) / 10,
    tenureComparisons,
    amortizationSchedule: emiRes.amortizationSchedule,
    yearlySummary: emiRes.yearlySummary,
  };
}
