import { SavingsGoalInput, SavingsGoalResult, InvestmentYearlyRow } from "../types";

export function calculateSavingsGoal(input: SavingsGoalInput): SavingsGoalResult {
  const goalAmount = Math.max(0, input.goalAmount || 0);
  const currentSavings = Math.max(0, input.currentSavings || 0);
  const durationYears = Math.max(0.1, input.durationYears || 1);
  const annualInterestRate = Math.max(0, input.annualInterestRate || 0);

  const monthsTotal = Math.max(1, Math.round(durationYears * 12));
  const monthlyRate = (annualInterestRate / 100) / 12;

  // Future value of current savings
  const futureValueOfCurrentSavings = currentSavings * Math.pow(1 + monthlyRate, monthsTotal);
  const remainingTarget = Math.max(0, goalAmount - futureValueOfCurrentSavings);
  const isAlreadyAchieved = currentSavings >= goalAmount || futureValueOfCurrentSavings >= goalAmount;

  let requiredMonthlyContribution = 0;
  if (!isAlreadyAchieved && remainingTarget > 0) {
    if (monthlyRate === 0) {
      requiredMonthlyContribution = remainingTarget / monthsTotal;
    } else {
      // Sinking fund formula: PMT = FV / (((1+r)^n - 1) / r)
      const annuityFactor = (Math.pow(1 + monthlyRate, monthsTotal) - 1) / monthlyRate;
      requiredMonthlyContribution = remainingTarget / annuityFactor;
    }
  }

  const requiredWeeklyContribution = (requiredMonthlyContribution * 12) / 52;
  const requiredAnnualContribution = requiredMonthlyContribution * 12;
  const totalContributionsNeeded = requiredMonthlyContribution * monthsTotal;
  const totalAccumulated = futureValueOfCurrentSavings + (isAlreadyAchieved ? 0 : remainingTarget);
  const totalInterestEarned = Math.max(0, goalAmount - currentSavings - totalContributionsNeeded);

  // Year-by-year schedule
  const yearlySchedule: InvestmentYearlyRow[] = [];
  const yearsRounded = Math.min(50, Math.max(1, Math.ceil(durationYears)));
  let balance = currentSavings;
  let totalContribSoFar = currentSavings;
  let totalGrowthSoFar = 0;

  for (let yr = 1; yr <= yearsRounded; yr++) {
    const startBal = balance;
    let contribYear = 0;
    let growthYear = 0;

    for (let m = 0; m < 12; m++) {
      const currentMonthIndex = (yr - 1) * 12 + m;
      if (currentMonthIndex < monthsTotal && !isAlreadyAchieved) {
        contribYear += requiredMonthlyContribution;
        const interestMonth = (balance + requiredMonthlyContribution) * monthlyRate;
        balance += requiredMonthlyContribution + interestMonth;
        growthYear += interestMonth;
      } else if (currentMonthIndex < monthsTotal && isAlreadyAchieved) {
        const interestMonth = balance * monthlyRate;
        balance += interestMonth;
        growthYear += interestMonth;
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

  return {
    goalAmount,
    currentSavings,
    remainingTarget: Math.round(remainingTarget * 100) / 100,
    futureValueOfCurrentSavings: Math.round(futureValueOfCurrentSavings * 100) / 100,
    requiredMonthlyContribution: Math.round(requiredMonthlyContribution * 100) / 100,
    requiredWeeklyContribution: Math.round(requiredWeeklyContribution * 100) / 100,
    requiredAnnualContribution: Math.round(requiredAnnualContribution * 100) / 100,
    totalContributionsNeeded: Math.round(totalContributionsNeeded * 100) / 100,
    totalInterestEarned: Math.round(totalInterestEarned * 100) / 100,
    isAlreadyAchieved,
    yearlySchedule,
  };
}
