import { DebtRepaymentInput, DebtRepaymentResult, StrategyPayoffResult, DebtAccount } from "../types";
import { parseSafeNumber } from "../currencies";

function simulateStrategy(
  debtsInput: DebtAccount[],
  extraMonthlyPayment: number,
  strategy: "snowball" | "avalanche" | "minimums",
  baselineMonths = 0,
  baselineInterest = 0
): StrategyPayoffResult {
  // Deep copy debts
  let debts = debtsInput.map((d) => ({
    ...d,
    balance: parseSafeNumber(d.balance),
    apr: parseSafeNumber(d.interestRate),
    minPay: parseSafeNumber(d.minimumPayment),
  }));

  // Sort debts based on strategy
  if (strategy === "snowball") {
    debts.sort((a, b) => a.balance - b.balance);
  } else if (strategy === "avalanche") {
    debts.sort((a, b) => b.apr - a.apr);
  }

  let totalInterestPaid = 0;
  let totalAmountPaid = 0;
  let month = 0;
  const maxMonths = 360;
  const timeline: StrategyPayoffResult["timeline"] = [];

  const initialTotalMinimums = debts.reduce((sum, d) => sum + d.minPay, 0);
  const totalBudget = initialTotalMinimums + (strategy === "minimums" ? 0 : extraMonthlyPayment);

  while (debts.some((d) => d.balance > 0.01) && month < maxMonths) {
    month++;
    let monthInterest = 0;
    let monthPayment = 0;
    const paidOffThisMonth: string[] = [];

    // 1. Accrue monthly interest on each active debt
    for (const d of debts) {
      if (d.balance > 0.01) {
        const int = d.balance * ((d.apr / 100) / 12);
        d.balance += int;
        monthInterest += int;
        totalInterestPaid += int;
      }
    }

    // 2. Pay minimums first
    let moneyLeft = totalBudget;
    for (const d of debts) {
      if (d.balance > 0.01) {
        const minToPay = Math.min(d.balance, d.minPay);
        d.balance -= minToPay;
        monthPayment += minToPay;
        moneyLeft -= minToPay;
        if (d.balance <= 0.01) {
          d.balance = 0;
          paidOffThisMonth.push(d.name);
        }
      }
    }

    // 3. Apply all remaining rollover budget to highest priority active debt
    if (moneyLeft > 0 && strategy !== "minimums") {
      for (const d of debts) {
        if (d.balance > 0.01) {
          const extraToPay = Math.min(d.balance, moneyLeft);
          d.balance -= extraToPay;
          monthPayment += extraToPay;
          moneyLeft -= extraToPay;
          if (d.balance <= 0.01) {
            d.balance = 0;
            if (!paidOffThisMonth.includes(d.name)) {
              paidOffThisMonth.push(d.name);
            }
          }
          if (moneyLeft <= 0.01) break;
        }
      }
    }

    totalAmountPaid += monthPayment;
    const totalRemainingDebt = debts.reduce((sum, d) => sum + d.balance, 0);

    timeline.push({
      month,
      totalPayment: Math.round(monthPayment * 100) / 100,
      totalInterest: Math.round(monthInterest * 100) / 100,
      totalRemainingDebt: Math.round(totalRemainingDebt * 100) / 100,
      paidOffDebtsThisMonth: paidOffThisMonth,
    });
  }

  // Calculate debt-free date
  const now = new Date();
  now.setMonth(now.getMonth() + month);
  const debtFreeDate = now.toLocaleDateString("en-US", { month: "short", year: "numeric" });

  const interestSaved = baselineInterest > 0 ? Math.max(0, baselineInterest - totalInterestPaid) : 0;
  const monthsSaved = baselineMonths > 0 ? Math.max(0, baselineMonths - month) : 0;

  return {
    strategyName: strategy === "snowball" ? "Debt Snowball" : strategy === "avalanche" ? "Debt Avalanche" : "Minimum Payments Only",
    totalMonths: month,
    debtFreeDate,
    totalInterestPaid: Math.round(totalInterestPaid * 100) / 100,
    totalAmountPaid: Math.round(totalAmountPaid * 100) / 100,
    interestSavedVsMinimums: Math.round(interestSaved * 100) / 100,
    monthsSavedVsMinimums: monthsSaved,
    timeline,
  };
}

export function calculateDebtRepayment(input: DebtRepaymentInput): DebtRepaymentResult {
  const extra = Math.max(0, parseSafeNumber(input.extraMonthlyPayment));
  const debts = input.debts || [];

  const totalInitialDebt = debts.reduce((sum, d) => sum + parseSafeNumber(d.balance), 0);
  const totalMinimumPayments = debts.reduce((sum, d) => sum + parseSafeNumber(d.minimumPayment), 0);
  const totalMonthlyPayment = totalMinimumPayments + extra;

  // Check insufficient payment: if any debt's min payment is less than monthly interest
  const insufficientDebts: string[] = [];
  debts.forEach((d) => {
    const bal = parseSafeNumber(d.balance);
    const apr = parseSafeNumber(d.interestRate);
    const minPay = parseSafeNumber(d.minimumPayment);
    const monthlyInt = bal * ((apr / 100) / 12);
    if (minPay <= monthlyInt && bal > 0) {
      insufficientDebts.push(d.name || "Debt");
    }
  });

  const isInsufficientPayment = insufficientDebts.length > 0 && extra === 0;

  // 1. Minimums baseline
  const minResult = simulateStrategy(debts, 0, "minimums");

  // 2. Snowball
  const snowballResult = simulateStrategy(debts, extra, "snowball", minResult.totalMonths, minResult.totalInterestPaid);

  // 3. Avalanche
  const avalancheResult = simulateStrategy(debts, extra, "avalanche", minResult.totalMonths, minResult.totalInterestPaid);

  const avalancheSavingsVsSnowball = Math.max(0, snowballResult.totalInterestPaid - avalancheResult.totalInterestPaid);

  let selectedStrategyResult = snowballResult;
  if (input.strategy === "avalanche") {
    selectedStrategyResult = avalancheResult;
  }

  return {
    totalInitialDebt: Math.round(totalInitialDebt * 100) / 100,
    totalMinimumPayments: Math.round(totalMinimumPayments * 100) / 100,
    extraMonthlyPayment: Math.round(extra * 100) / 100,
    totalMonthlyPayment: Math.round(totalMonthlyPayment * 100) / 100,
    selectedStrategyResult,
    snowballResult,
    avalancheResult,
    minimumsOnlyResult: minResult,
    avalancheSavingsVsSnowball: Math.round(avalancheSavingsVsSnowball * 100) / 100,
    isInsufficientPayment,
    insufficientDebts,
  };
}
