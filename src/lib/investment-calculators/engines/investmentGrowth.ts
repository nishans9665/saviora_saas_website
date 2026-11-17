import { InvestmentGrowthInput, InvestmentGrowthResult, InvestmentYearlyRow, ContributionFrequency, CompoundingFrequency } from "../types";

export function calculateInvestmentGrowth(input: InvestmentGrowthInput): InvestmentGrowthResult {
  const initialInvestment = Math.max(0, input.initialInvestment || 0);
  const regularContribution = Math.max(0, input.regularContribution || 0);
  const annualReturnRate = Math.max(0, input.annualReturnRate || 0);
  const durationYears = Math.max(0.1, input.durationYears || 10);
  const frequency: ContributionFrequency = input.contributionFrequency || "monthly";
  const compounding: CompoundingFrequency = input.compoundingFrequency || "monthly";
  const timing = input.timing || "end";
  const expenseRatioPercent = Math.max(0, input.expenseRatioPercent || 0);

  const netAnnualReturnRate = Math.max(0, annualReturnRate - expenseRatioPercent);

  let contribsPerYear = 12;
  if (frequency === "weekly") contribsPerYear = 52;
  else if (frequency === "quarterly") contribsPerYear = 4;
  else if (frequency === "annually") contribsPerYear = 1;

  let compoundsPerYear = 12;
  if (compounding === "annually") compoundsPerYear = 1;
  else if (compounding === "semi-annually") compoundsPerYear = 2;
  else if (compounding === "quarterly") compoundsPerYear = 4;
  else if (compounding === "daily") compoundsPerYear = 365;

  const totalYearsRounded = Math.min(50, Math.max(1, Math.ceil(durationYears)));
  const totalContributionsCount = Math.round(durationYears * contribsPerYear);
  const totalContributions = regularContribution * totalContributionsCount;
  const totalInvestedCapital = initialInvestment + totalContributions;

  // Simulate month by month or period by period for accurate compounding + timing
  const stepsPerYear = Math.max(contribsPerYear, compoundsPerYear);
  const stepReturnRate = (annualReturnRate / 100) / stepsPerYear;
  const stepFeeRate = (expenseRatioPercent / 100) / stepsPerYear;

  let grossBal = initialInvestment;
  let netBal = initialInvestment;
  let totalFeesAccum = 0;
  let totalContribAccum = initialInvestment;

  const yearlySchedule: InvestmentYearlyRow[] = [];

  for (let yr = 1; yr <= totalYearsRounded; yr++) {
    const startBal = netBal;
    let contribThisYear = 0;
    let growthThisYear = 0;

    for (let step = 0; step < stepsPerYear; step++) {
      const stepIndex = (yr - 1) * stepsPerYear + step;
      const isContribStep = step % Math.round(stepsPerYear / contribsPerYear) === 0;

      if (isContribStep && (stepIndex / (stepsPerYear / contribsPerYear)) < totalContributionsCount) {
        contribThisYear += regularContribution;
        if (timing === "beginning") {
          grossBal += regularContribution;
          netBal += regularContribution;
        }
      }

      // Interest
      const grossGainStep = grossBal * stepReturnRate;
      grossBal += grossGainStep;

      const feeStep = netBal * stepFeeRate;
      totalFeesAccum += feeStep;
      const netGainStep = Math.max(0, (netBal * stepReturnRate) - feeStep);
      growthThisYear += netGainStep;
      netBal += netGainStep;

      if (isContribStep && timing === "end" && (stepIndex / (stepsPerYear / contribsPerYear)) < totalContributionsCount) {
        grossBal += regularContribution;
        netBal += regularContribution;
      }
    }

    totalContribAccum += contribThisYear;

    yearlySchedule.push({
      year: yr,
      startingBalance: Math.round(startBal * 100) / 100,
      contributionsThisYear: Math.round(contribThisYear * 100) / 100,
      totalContributionsToDate: Math.round(totalContribAccum * 100) / 100,
      growthThisYear: Math.round(growthThisYear * 100) / 100,
      totalGrowthToDate: Math.round((netBal - totalContribAccum) * 100) / 100,
      endingBalance: Math.round(netBal * 100) / 100,
    });
  }

  const totalGrowthAmount = Math.max(0, netBal - totalInvestedCapital);

  return {
    initialInvestment,
    totalContributions: Math.round(totalContributions * 100) / 100,
    totalInvestedCapital: Math.round(totalInvestedCapital * 100) / 100,
    grossFutureValue: Math.round(grossBal * 100) / 100,
    netFutureValue: Math.round(netBal * 100) / 100,
    totalGrowthAmount: Math.round(totalGrowthAmount * 100) / 100,
    totalFeesPaid: Math.round(totalFeesAccum * 100) / 100,
    netAnnualReturnRate: Math.round(netAnnualReturnRate * 100) / 100,
    yearlySchedule,
  };
}
