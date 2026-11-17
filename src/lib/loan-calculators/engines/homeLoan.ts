import { HomeLoanInput, HomeLoanResult, AmortizationRow, YearlyAmortizationSummary } from "../types";
import { parseSafeNumber } from "../currencies";
import { calculateLoanEMI } from "./loanEmi";

export function calculateHomeLoan(input: HomeLoanInput): HomeLoanResult {
  const propertyPrice = Math.max(0, parseSafeNumber(input.propertyPrice));
  const downPayment = Math.max(0, parseSafeNumber(input.downPayment));
  const annualRate = Math.max(0, parseSafeNumber(input.annualInterestRate));
  const tenureYears = Math.max(1, parseSafeNumber(input.tenureYears));
  const propTaxAnnual = Math.max(0, parseSafeNumber(input.propertyTaxAnnual));
  const insuranceAnnual = Math.max(0, parseSafeNumber(input.homeInsuranceAnnual));
  const monthlyHOA = Math.max(0, parseSafeNumber(input.monthlyHOA));
  const extraMonthly = Math.max(0, parseSafeNumber(input.extraMonthlyPayment));

  const loanPrincipal = Math.max(0, propertyPrice - downPayment);
  const downPaymentPercent = propertyPrice > 0 ? (downPayment / propertyPrice) * 100 : 0;
  const ltvRatio = propertyPrice > 0 ? (loanPrincipal / propertyPrice) * 100 : 0;

  // Base EMI without extra payments
  const baseRes = calculateLoanEMI({
    loanAmount: loanPrincipal,
    annualInterestRate: annualRate,
    tenureYears,
    paymentFrequency: "monthly",
  });

  const monthlyPrincipalAndInterest = baseRes.periodicPayment;
  const monthlyPropertyTax = propTaxAnnual / 12;
  const monthlyHomeInsurance = insuranceAnnual / 12;
  const totalMonthlyHousingPayment =
    monthlyPrincipalAndInterest + monthlyPropertyTax + monthlyHomeInsurance + monthlyHOA + extraMonthly;

  const originalPayoffMonths = baseRes.totalPaymentsCount;
  const periodicRate = (annualRate / 100) / 12;

  // Amortization schedule with extra payment support
  const amortizationSchedule: AmortizationRow[] = [];
  let currentBalance = loanPrincipal;
  let totalInterest = 0;
  let month = 0;
  const maxMonths = tenureYears * 12;

  while (currentBalance > 0 && month < maxMonths) {
    month++;
    const beginningBalance = currentBalance;
    const interestPayment = beginningBalance * periodicRate;
    let basePrincipalPayment = monthlyPrincipalAndInterest - interestPayment;
    let extra = extraMonthly;

    if (basePrincipalPayment + extra >= beginningBalance) {
      basePrincipalPayment = Math.min(basePrincipalPayment, beginningBalance);
      extra = Math.max(0, beginningBalance - basePrincipalPayment);
    }

    const totalPrincipalThisMonth = basePrincipalPayment + extra;
    const actualPayment = totalPrincipalThisMonth + interestPayment;
    currentBalance = Math.max(0, beginningBalance - totalPrincipalThisMonth);
    totalInterest += interestPayment;

    const approxYear = Math.ceil(month / 12);

    amortizationSchedule.push({
      period: month,
      label: `Month ${month}`,
      year: approxYear,
      beginningBalance: Math.round(beginningBalance * 100) / 100,
      payment: Math.round(actualPayment * 100) / 100,
      principal: Math.round(basePrincipalPayment * 100) / 100,
      interest: Math.round(interestPayment * 100) / 100,
      extraPayment: Math.round(extra * 100) / 100,
      endingBalance: Math.round(currentBalance * 100) / 100,
      totalInterestToDate: Math.round(totalInterest * 100) / 100,
    });
  }

  // Yearly Summary
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
    item.totalPrincipal += row.principal + (row.extraPayment || 0);
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

  const actualPayoffMonths = amortizationSchedule.length;
  const monthsSaved = Math.max(0, originalPayoffMonths - actualPayoffMonths);
  const interestSaved = Math.max(0, baseRes.totalInterest - totalInterest);

  return {
    propertyPrice: Math.round(propertyPrice * 100) / 100,
    downPayment: Math.round(downPayment * 100) / 100,
    downPaymentPercent: Math.round(downPaymentPercent * 10) / 10,
    loanPrincipal: Math.round(loanPrincipal * 100) / 100,
    ltvRatio: Math.round(ltvRatio * 10) / 10,
    monthlyPrincipalAndInterest: Math.round(monthlyPrincipalAndInterest * 100) / 100,
    monthlyPropertyTax: Math.round(monthlyPropertyTax * 100) / 100,
    monthlyHomeInsurance: Math.round(monthlyHomeInsurance * 100) / 100,
    monthlyHOA: Math.round(monthlyHOA * 100) / 100,
    totalMonthlyHousingPayment: Math.round(totalMonthlyHousingPayment * 100) / 100,
    totalInterest: Math.round(totalInterest * 100) / 100,
    totalPrincipalRepayment: Math.round(loanPrincipal * 100) / 100,
    totalMortgageCost: Math.round((loanPrincipal + totalInterest) * 100) / 100,
    originalPayoffMonths,
    actualPayoffMonths,
    monthsSaved,
    interestSaved: Math.round(interestSaved * 100) / 100,
    amortizationSchedule,
    yearlySummary,
  };
}
