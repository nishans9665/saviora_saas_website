import { SimpleInterestInput, SimpleInterestResult } from "../types";
import { parseSafeNumber } from "../currencies";

export function calculateSimpleInterest(input: SimpleInterestInput): SimpleInterestResult {
  const principal = Math.max(0, parseSafeNumber(input.principal));
  const rate = Math.max(0, parseSafeNumber(input.annualInterestRate));
  const period = Math.max(0, parseSafeNumber(input.timePeriod));
  const unit = input.timeUnit || "years";

  let timeInYears = period;
  if (unit === "days") {
    timeInYears = period / 365;
  } else if (unit === "months") {
    timeInYears = period / 12;
  }

  const totalSimpleInterest = principal * (rate / 100) * timeInYears;
  const finalMaturityAmount = principal + totalSimpleInterest;

  const interestPerYear = principal * (rate / 100);
  const interestPerMonth = interestPerYear / 12;
  const interestPerDay = interestPerYear / 365;

  // Comparison with compound interest over same period
  const compoundFinal = principal * Math.pow(1 + rate / 100, timeInYears);
  const compoundInterestAnnual = compoundFinal - principal;
  const difference = Math.max(0, compoundInterestAnnual - totalSimpleInterest);

  return {
    principal: Math.round(principal * 100) / 100,
    annualInterestRate: Math.round(rate * 100) / 100,
    timeInYears: Math.round(timeInYears * 1000) / 1000,
    totalSimpleInterest: Math.round(totalSimpleInterest * 100) / 100,
    finalMaturityAmount: Math.round(finalMaturityAmount * 100) / 100,
    interestPerYear: Math.round(interestPerYear * 100) / 100,
    interestPerMonth: Math.round(interestPerMonth * 100) / 100,
    interestPerDay: Math.round(interestPerDay * 100) / 100,
    compoundInterestComparison: {
      compoundInterestAnnual: Math.round(compoundInterestAnnual * 100) / 100,
      difference: Math.round(difference * 100) / 100,
    },
  };
}
