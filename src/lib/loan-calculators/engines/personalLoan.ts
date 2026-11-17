import { PersonalLoanInput, PersonalLoanResult, AmortizationRow, YearlyAmortizationSummary } from "../types";
import { parseSafeNumber } from "../currencies";
import { calculateLoanEMI } from "./loanEmi";

export function calculatePersonalLoan(input: PersonalLoanInput): PersonalLoanResult {
  const loanAmount = Math.max(0, parseSafeNumber(input.loanAmount));
  const annualRate = Math.max(0, parseSafeNumber(input.annualInterestRate));
  const tenureMonths = Math.max(1, Math.round(parseSafeNumber(input.tenureMonths)));
  const method = input.method || "reducing";
  const feePercent = Math.max(0, parseSafeNumber(input.processingFeePercent));
  const feeFlat = Math.max(0, parseSafeNumber(input.processingFeeFlat));
  const addCharges = Math.max(0, parseSafeNumber(input.additionalCharges));
  const feeDeducted = input.feeDeductedFromDisbursement ?? true;

  const totalProcessingFees = (loanAmount * (feePercent / 100)) + feeFlat;
  const totalLoanCharges = totalProcessingFees + addCharges;
  const netDisbursement = feeDeducted ? Math.max(0, loanAmount - totalLoanCharges) : loanAmount;

  let monthlyPayment = 0;
  let totalInterest = 0;
  let amortizationSchedule: AmortizationRow[] = [];
  let yearlySummary: YearlyAmortizationSummary[] = [];

  if (method === "flat") {
    // Flat rate calculation
    const tenureYears = tenureMonths / 12;
    totalInterest = loanAmount * (annualRate / 100) * tenureYears;
    const totalRepay = loanAmount + totalInterest;
    monthlyPayment = totalRepay / tenureMonths;

    let balance = loanAmount;
    const monthlyPrincipal = loanAmount / tenureMonths;
    const monthlyInt = totalInterest / tenureMonths;
    let accumulatedInterest = 0;

    for (let m = 1; m <= tenureMonths; m++) {
      const beg = balance;
      accumulatedInterest += monthlyInt;
      balance = Math.max(0, beg - monthlyPrincipal);
      const yr = Math.ceil(m / 12);

      amortizationSchedule.push({
        period: m,
        label: `Month ${m}`,
        year: yr,
        beginningBalance: Math.round(beg * 100) / 100,
        payment: Math.round(monthlyPayment * 100) / 100,
        principal: Math.round(monthlyPrincipal * 100) / 100,
        interest: Math.round(monthlyInt * 100) / 100,
        endingBalance: Math.round(balance * 100) / 100,
        totalInterestToDate: Math.round(accumulatedInterest * 100) / 100,
      });
    }

    // Yearly summary
    const yearlyMap = new Map<number, YearlyAmortizationSummary>();
    amortizationSchedule.forEach((row) => {
      const yr = row.year || 1;
      if (!yearlyMap.has(yr)) {
        yearlyMap.set(yr, {
          year: yr,
          beginningBalance: row.beginningBalance,
          totalPrincipal: 0,
          totalInterest: 0,
          totalPayment: 0,
          endingBalance: row.endingBalance,
        });
      }
      const item = yearlyMap.get(yr)!;
      item.totalPrincipal += row.principal;
      item.totalInterest += row.interest;
      item.totalPayment += row.payment;
      item.endingBalance = row.endingBalance;
    });

    yearlySummary = Array.from(yearlyMap.values()).map((item) => ({
      ...item,
      totalPrincipal: Math.round(item.totalPrincipal * 100) / 100,
      totalInterest: Math.round(item.totalInterest * 100) / 100,
      totalPayment: Math.round(item.totalPayment * 100) / 100,
    }));
  } else {
    // Reducing balance
    const emiRes = calculateLoanEMI({
      loanAmount,
      annualInterestRate: annualRate,
      tenureYears: 0,
      tenureMonths,
      paymentFrequency: "monthly",
    });
    monthlyPayment = emiRes.periodicPayment;
    totalInterest = emiRes.totalInterest;
    amortizationSchedule = emiRes.amortizationSchedule;
    yearlySummary = emiRes.yearlySummary;
  }

  const totalRepayment = loanAmount + totalInterest;
  const totalCostOfBorrowing = totalInterest + totalLoanCharges;

  // Effective APR approximation
  // Flat rate effective APR is approximately ~ 1.8x to 1.9x flat rate
  let effectiveAPR = annualRate;
  if (method === "flat" && tenureMonths > 1) {
    effectiveAPR = (2 * tenureMonths * annualRate) / (tenureMonths + 1);
  }
  // Include fees impact into APR
  if (loanAmount > 0 && totalLoanCharges > 0) {
    const feeImpact = ((totalLoanCharges / loanAmount) / (tenureMonths / 12)) * 100;
    effectiveAPR += feeImpact;
  }

  return {
    loanAmount: Math.round(loanAmount * 100) / 100,
    monthlyPayment: Math.round(monthlyPayment * 100) / 100,
    totalInterest: Math.round(totalInterest * 100) / 100,
    totalProcessingFees: Math.round(totalProcessingFees * 100) / 100,
    totalAdditionalCharges: Math.round(addCharges * 100) / 100,
    totalLoanCharges: Math.round(totalLoanCharges * 100) / 100,
    totalRepayment: Math.round(totalRepayment * 100) / 100,
    netDisbursement: Math.round(netDisbursement * 100) / 100,
    totalCostOfBorrowing: Math.round(totalCostOfBorrowing * 100) / 100,
    effectiveAPR: Math.round(effectiveAPR * 100) / 100,
    method,
    amortizationSchedule,
    yearlySummary,
  };
}
