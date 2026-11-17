import { LoanEMIInput, LoanEMIResult, AmortizationRow, YearlyAmortizationSummary } from "../types";
import { parseSafeNumber } from "../currencies";

export function calculateLoanEMI(input: LoanEMIInput): LoanEMIResult {
  const principal = Math.max(0, parseSafeNumber(input.loanAmount));
  const annualRate = Math.max(0, parseSafeNumber(input.annualInterestRate));
  const years = Math.max(0, parseSafeNumber(input.tenureYears));
  const months = Math.max(0, parseSafeNumber(input.tenureMonths));
  const freq = input.paymentFrequency || "monthly";

  let periodsPerYear = 12;
  if (freq === "quarterly") periodsPerYear = 4;
  else if (freq === "semi-annually") periodsPerYear = 2;
  else if (freq === "annually") periodsPerYear = 1;
  else if (freq === "bi-weekly") periodsPerYear = 26;
  else if (freq === "weekly") periodsPerYear = 52;

  const totalYears = years + months / 12;
  const totalPeriods = Math.max(1, Math.round(totalYears * periodsPerYear));
  const periodicRate = (annualRate / 100) / periodsPerYear;

  let periodicPayment = 0;
  if (principal > 0) {
    if (periodicRate === 0) {
      periodicPayment = principal / totalPeriods;
    } else {
      const compoundFactor = Math.pow(1 + periodicRate, totalPeriods);
      periodicPayment = (principal * periodicRate * compoundFactor) / (compoundFactor - 1);
    }
  }

  const monthlyEquivalent = (periodicPayment * periodsPerYear) / 12;

  // Generate Amortization Schedule
  const amortizationSchedule: AmortizationRow[] = [];
  let currentBalance = principal;
  let totalInterest = 0;

  for (let p = 1; p <= totalPeriods; p++) {
    const beginningBalance = currentBalance;
    let interestPayment = beginningBalance * periodicRate;
    let principalPayment = periodicPayment - interestPayment;

    if (p === totalPeriods || principalPayment > beginningBalance) {
      principalPayment = beginningBalance;
      interestPayment = beginningBalance * periodicRate;
    }

    const actualPayment = principalPayment + interestPayment;
    currentBalance = Math.max(0, beginningBalance - principalPayment);
    totalInterest += interestPayment;

    const approxYear = Math.ceil(p / periodsPerYear);

    amortizationSchedule.push({
      period: p,
      label: `Period ${p}`,
      year: approxYear,
      beginningBalance: Math.round(beginningBalance * 100) / 100,
      payment: Math.round(actualPayment * 100) / 100,
      principal: Math.round(principalPayment * 100) / 100,
      interest: Math.round(interestPayment * 100) / 100,
      endingBalance: Math.round(currentBalance * 100) / 100,
      totalInterestToDate: Math.round(totalInterest * 100) / 100,
    });

    if (currentBalance <= 0) break;
  }

  // Generate Yearly Summaries
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

  const yearlySummary = Array.from(yearlyMap.values()).map((item) => ({
    ...item,
    totalPrincipal: Math.round(item.totalPrincipal * 100) / 100,
    totalInterest: Math.round(item.totalInterest * 100) / 100,
    totalPayment: Math.round(item.totalPayment * 100) / 100,
  }));

  const totalRepayment = principal + totalInterest;
  const principalPercentage = totalRepayment > 0 ? (principal / totalRepayment) * 100 : 0;
  const interestPercentage = totalRepayment > 0 ? (totalInterest / totalRepayment) * 100 : 0;

  return {
    principal: Math.round(principal * 100) / 100,
    periodicPayment: Math.round(periodicPayment * 100) / 100,
    monthlyEquivalent: Math.round(monthlyEquivalent * 100) / 100,
    totalPaymentsCount: amortizationSchedule.length,
    totalInterest: Math.round(totalInterest * 100) / 100,
    totalRepayment: Math.round(totalRepayment * 100) / 100,
    principalPercentage: Math.round(principalPercentage * 10) / 10,
    interestPercentage: Math.round(interestPercentage * 10) / 10,
    amortizationSchedule,
    yearlySummary,
  };
}
