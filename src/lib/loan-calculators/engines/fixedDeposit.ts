import { FixedDepositInput, FixedDepositResult, FixedDepositScheduleRow } from "../types";
import { parseSafeNumber } from "../currencies";

export function calculateFixedDeposit(input: FixedDepositInput): FixedDepositResult {
  const deposit = Math.max(0, parseSafeNumber(input.depositAmount));
  const rate = Math.max(0, parseSafeNumber(input.annualInterestRate));
  const tenureVal = Math.max(1, parseSafeNumber(input.tenureValue));
  const unit = input.tenureUnit || "months";
  const compFreq = input.compoundingFrequency || "quarterly";
  const payout = input.payoutOption || "cumulative";
  const taxRate = Math.max(0, parseSafeNumber(input.withholdingTaxRate));

  let tenureDays = 0;
  let tenureMonths = 0;
  let tenureYears = 0;

  if (unit === "days") {
    tenureDays = tenureVal;
    tenureMonths = Math.round((tenureVal / 30.4375) * 10) / 10;
    tenureYears = tenureVal / 365;
  } else if (unit === "months") {
    tenureMonths = tenureVal;
    tenureDays = Math.round(tenureVal * 30.4375);
    tenureYears = tenureVal / 12;
  } else {
    tenureYears = tenureVal;
    tenureMonths = tenureVal * 12;
    tenureDays = Math.round(tenureVal * 365);
  }

  // Calculate maturity date
  const start = input.startDate ? new Date(input.startDate) : new Date();
  const matDate = new Date(start.getTime());
  matDate.setDate(matDate.getDate() + Math.round(tenureDays));
  const maturityDateStr = matDate.toISOString().split("T")[0];

  const r = rate / 100;
  let n = 4; // Compounding periods per year
  if (compFreq === "daily") n = 365;
  else if (compFreq === "monthly") n = 12;
  else if (compFreq === "semi-annually") n = 2;
  else if (compFreq === "annually") n = 1;

  const isCumulative = payout === "cumulative";
  let grossInterestEarned = 0;
  let periodicPayoutAmount = 0;
  const schedule: FixedDepositScheduleRow[] = [];

  if (isCumulative) {
    // A = P * (1 + r/n)^(n*t)
    const maturityAmountBeforeTax = deposit * Math.pow(1 + r / n, n * tenureYears);
    grossInterestEarned = maturityAmountBeforeTax - deposit;

    // Build period by period schedule
    const periodsCount = Math.max(1, Math.round(n * tenureYears));
    let bal = deposit;
    const ratePerPeriod = r / n;

    for (let p = 1; p <= periodsCount; p++) {
      const open = bal;
      const periodGross = open * ratePerPeriod;
      const periodTax = periodGross * (taxRate / 100);
      const periodNet = periodGross - periodTax;
      bal = open + periodNet;

      const pDate = new Date(start.getTime());
      pDate.setDate(pDate.getDate() + Math.round((p / periodsCount) * tenureDays));

      schedule.push({
        period: p,
        payoutDate: pDate.toISOString().split("T")[0],
        openingBalance: Math.round(open * 100) / 100,
        grossInterestEarned: Math.round(periodGross * 100) / 100,
        taxDeducted: Math.round(periodTax * 100) / 100,
        netInterest: Math.round(periodNet * 100) / 100,
        closingBalance: Math.round(bal * 100) / 100,
      });
    }
  } else {
    // Non-cumulative payouts: interest paid out periodically, principal stays constant
    let payoutsPerYear = 12;
    if (payout === "quarterly") payoutsPerYear = 4;
    else if (payout === "annually") payoutsPerYear = 1;

    const totalPayouts = Math.max(1, Math.round(tenureYears * payoutsPerYear));
    const grossPerPayout = deposit * (r / payoutsPerYear);
    periodicPayoutAmount = grossPerPayout * (1 - taxRate / 100);
    grossInterestEarned = grossPerPayout * totalPayouts;

    for (let p = 1; p <= totalPayouts; p++) {
      const periodTax = grossPerPayout * (taxRate / 100);
      const pDate = new Date(start.getTime());
      pDate.setDate(pDate.getDate() + Math.round((p / totalPayouts) * tenureDays));

      schedule.push({
        period: p,
        payoutDate: pDate.toISOString().split("T")[0],
        openingBalance: Math.round(deposit * 100) / 100,
        grossInterestEarned: Math.round(grossPerPayout * 100) / 100,
        taxDeducted: Math.round(periodTax * 100) / 100,
        netInterest: Math.round(periodicPayoutAmount * 100) / 100,
        closingBalance: Math.round(deposit * 100) / 100,
      });
    }
  }

  const withholdingTaxAmount = grossInterestEarned * (taxRate / 100);
  const netInterestEarned = grossInterestEarned - withholdingTaxAmount;
  const totalMaturityOrPayoutAmount = isCumulative ? deposit + netInterestEarned : deposit;
  const effectiveAnnualYield = isCumulative && tenureYears > 0
    ? (Math.pow(1 + r / n, n) - 1) * 100
    : rate;

  return {
    initialDeposit: Math.round(deposit * 100) / 100,
    annualInterestRate: Math.round(rate * 100) / 100,
    tenureDays,
    tenureMonths,
    tenureYears: Math.round(tenureYears * 100) / 100,
    maturityDate: maturityDateStr,
    grossInterestEarned: Math.round(grossInterestEarned * 100) / 100,
    withholdingTaxAmount: Math.round(withholdingTaxAmount * 100) / 100,
    netInterestEarned: Math.round(netInterestEarned * 100) / 100,
    totalMaturityOrPayoutAmount: Math.round(totalMaturityOrPayoutAmount * 100) / 100,
    effectiveAnnualYield: Math.round(effectiveAnnualYield * 100) / 100,
    periodicPayoutAmount: Math.round(periodicPayoutAmount * 100) / 100,
    isCumulative,
    schedule,
  };
}
