import { MonthlySavingsInput, MonthlySavingsResult, InvestmentYearlyRow } from "../types";

export function calculateMonthlySavings(input: MonthlySavingsInput): MonthlySavingsResult {
  const initialSavings = Math.max(0, input.initialSavings || 0);
  const monthlyContribution = Math.max(0, input.monthlyContribution || 0);
  const annualInterestRate = Math.max(0, input.annualInterestRate || 0);
  const durationYears = Math.max(0.1, input.durationYears || 5);
  const timing = input.timing || "end";

  const totalMonths = Math.max(1, Math.round(durationYears * 12));
  const monthlyRate = (annualInterestRate / 100) / 12;

  const totalContributions = monthlyContribution * totalMonths;
  const totalPrincipal = initialSavings + totalContributions;
  const withoutInterestFinalBalance = totalPrincipal;

  let balance = initialSavings;
  const yearlySchedule: InvestmentYearlyRow[] = [];
  const yearsRounded = Math.min(50, Math.max(1, Math.ceil(durationYears)));

  let totalContribSoFar = initialSavings;
  let totalGrowthSoFar = 0;

  for (let yr = 1; yr <= yearsRounded; yr++) {
    const startBal = balance;
    let contribYear = 0;
    let growthYear = 0;

    for (let m = 0; m < 12; m++) {
      const monthIdx = (yr - 1) * 12 + m;
      if (monthIdx < totalMonths) {
        contribYear += monthlyContribution;
        if (timing === "beginning") {
          const interestMonth = (balance + monthlyContribution) * monthlyRate;
          balance += monthlyContribution + interestMonth;
          growthYear += interestMonth;
        } else {
          const interestMonth = balance * monthlyRate;
          balance += monthlyContribution + interestMonth;
          growthYear += interestMonth;
        }
      }
    }

    totalContribSoFar += contribYear;
    totalGrowthSoFar += growthYear;

    yearlySchedule.push({
      year: yr,
      startingBalance: Math.round(startBal * 100) / 100,
      contributionsThisYear: Math.round(contribYear * 100) / 100,
      totalContributionsToDate: Math.round(totalContribSoFar * 100) / 100,
      growthThisYear: Math.round(growthYear * 100) / 100,
      totalGrowthToDate: Math.round(totalGrowthSoFar * 100) / 100,
      endingBalance: Math.round(balance * 100) / 100,
    });
  }

  const finalBalance = balance;
  const totalInterestEarned = Math.max(0, finalBalance - totalPrincipal);
  const growthPercentage = totalPrincipal > 0 ? (totalInterestEarned / totalPrincipal) * 100 : 0;
  const interestAdvantage = Math.max(0, finalBalance - withoutInterestFinalBalance);

  return {
    initialSavings,
    monthlyContribution,
    totalMonths,
    totalContributions: Math.round(totalContributions * 100) / 100,
    totalPrincipal: Math.round(totalPrincipal * 100) / 100,
    totalInterestEarned: Math.round(totalInterestEarned * 100) / 100,
    finalBalance: Math.round(finalBalance * 100) / 100,
    growthPercentage: Math.round(growthPercentage * 100) / 100,
    withoutInterestFinalBalance: Math.round(withoutInterestFinalBalance * 100) / 100,
    interestAdvantage: Math.round(interestAdvantage * 100) / 100,
    yearlySchedule,
  };
}
