import { CompoundInterestInput, CompoundInterestResult, CompoundGrowthYearRow } from "../types";
import { parseSafeNumber } from "../currencies";

export function calculateCompoundInterest(input: CompoundInterestInput): CompoundInterestResult {
  const initial = Math.max(0, parseSafeNumber(input.initialInvestment));
  const rate = Math.max(0, parseSafeNumber(input.annualInterestRate));
  const years = Math.max(1, Math.round(parseSafeNumber(input.durationYears)));
  const compFreq = input.compoundingFrequency || "annually";
  const regularContribution = Math.max(0, parseSafeNumber(input.regularContribution));
  const contribFreq = input.contributionFrequency || "monthly";
  const timing = input.contributionTiming || "end";

  let n = 1; // Compounding times per year
  if (compFreq === "daily") n = 365;
  else if (compFreq === "monthly") n = 12;
  else if (compFreq === "quarterly") n = 4;
  else if (compFreq === "semi-annually") n = 2;

  let m = 12; // Contribution times per year
  if (contribFreq === "quarterly") m = 4;
  else if (contribFreq === "annually") m = 1;

  const r = rate / 100;
  const effectiveAnnualRate = Math.pow(1 + r / n, n) - 1;

  // Simulate monthly/annual steps for accurate year-by-year schedule
  const yearByYearGrowth: CompoundGrowthYearRow[] = [];
  let currentBalance = initial;
  let totalDeposited = initial;
  let accumulatedInterest = 0;

  // We simulate period by period across the total years
  // Standard monthly simulation step provides high accuracy
  const totalMonths = years * 12;
  const monthlyRateComp = Math.pow(1 + r / n, n / 12) - 1;

  for (let yr = 1; yr <= years; yr++) {
    const startYrBalance = currentBalance;
    let annualDeposit = 0;
    let interestEarnedThisYear = 0;

    for (let mo = 1; mo <= 12; mo++) {
      // Check if contribution occurs this month
      const monthsPerContrib = 12 / m;
      const isContribMonth = (mo - 1) % monthsPerContrib === 0;
      const depositThisMonth = isContribMonth ? regularContribution : 0;

      if (timing === "beginning" && depositThisMonth > 0) {
        currentBalance += depositThisMonth;
        annualDeposit += depositThisMonth;
        totalDeposited += depositThisMonth;
      }

      const int = currentBalance * monthlyRateComp;
      currentBalance += int;
      interestEarnedThisYear += int;

      if (timing === "end" && depositThisMonth > 0) {
        currentBalance += depositThisMonth;
        annualDeposit += depositThisMonth;
        totalDeposited += depositThisMonth;
      }
    }

    accumulatedInterest += interestEarnedThisYear;

    yearByYearGrowth.push({
      year: yr,
      startingBalance: Math.round(startYrBalance * 100) / 100,
      annualDeposit: Math.round(annualDeposit * 100) / 100,
      totalDepositedToDate: Math.round(totalDeposited * 100) / 100,
      interestEarnedThisYear: Math.round(interestEarnedThisYear * 100) / 100,
      totalInterestToDate: Math.round(accumulatedInterest * 100) / 100,
      endingBalance: Math.round(currentBalance * 100) / 100,
    });
  }

  const finalBalance = currentBalance;
  const totalContributions = totalDeposited - initial;
  const totalPrincipalInvested = totalDeposited;
  const totalInterestEarned = Math.max(0, finalBalance - totalPrincipalInvested);
  const growthMultiple = totalPrincipalInvested > 0 ? finalBalance / totalPrincipalInvested : 0;

  return {
    initialInvestment: Math.round(initial * 100) / 100,
    totalContributions: Math.round(totalContributions * 100) / 100,
    totalPrincipalInvested: Math.round(totalPrincipalInvested * 100) / 100,
    totalInterestEarned: Math.round(totalInterestEarned * 100) / 100,
    finalBalance: Math.round(finalBalance * 100) / 100,
    effectiveAnnualRate: Math.round(effectiveAnnualRate * 10000) / 100, // as percentage
    growthMultiple: Math.round(growthMultiple * 100) / 100,
    yearByYearGrowth,
  };
}
