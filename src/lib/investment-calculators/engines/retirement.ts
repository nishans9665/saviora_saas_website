import { RetirementInput, RetirementResult, RetirementYearRow } from "../types";

export function calculateRetirement(input: RetirementInput): RetirementResult {
  const currentAge = Math.max(18, Math.min(99, input.currentAge || 30));
  const retirementAge = Math.max(currentAge + 1, Math.min(100, input.retirementAge || 65));
  const currentSavings = Math.max(0, input.currentSavings || 0);
  const monthlyContribution = Math.max(0, input.monthlyContribution || 0);
  const desiredMonthlyRetirementIncome = Math.max(0, input.desiredMonthlyRetirementIncome || 3000);
  const expectedAnnualReturn = Math.max(0, input.expectedAnnualReturn || 7);
  const expectedInflationRate = Math.max(0, input.expectedInflationRate || 2.5);
  const retirementDurationYears = Math.max(1, Math.min(50, input.retirementDurationYears || 25));

  const yearsToRetire = retirementAge - currentAge;
  const monthsToRetire = yearsToRetire * 12;
  const monthlyRateAccum = (expectedAnnualReturn / 100) / 12;

  // 1. Accumulation Phase: Growth of Current Savings + Monthly Contributions
  const fvCurrentSavings = currentSavings * Math.pow(1 + monthlyRateAccum, monthsToRetire);
  let fvContributions = 0;
  if (monthlyRateAccum > 0) {
    fvContributions = monthlyContribution * ((Math.pow(1 + monthlyRateAccum, monthsToRetire) - 1) / monthlyRateAccum);
  } else {
    fvContributions = monthlyContribution * monthsToRetire;
  }

  const projectedFundAtRetirement = fvCurrentSavings + fvContributions;
  const totalContributionsToRetirement = currentSavings + (monthlyContribution * monthsToRetire);
  const totalGrowthToRetirement = Math.max(0, projectedFundAtRetirement - totalContributionsToRetirement);

  // 2. Inflation-adjusted Monthly Income at Retirement
  const inflationMultiplier = Math.pow(1 + expectedInflationRate / 100, yearsToRetire);
  const futureMonthlyIncomeAtRetirement = desiredMonthlyRetirementIncome * inflationMultiplier;

  // 3. Decumulation Phase: Required Corpus to support future income for retirementDurationYears
  // Real interest rate during retirement (assuming conservative return during retirement, e.g. return - inflation)
  const realRateAnnual = (1 + expectedAnnualReturn / 100) / (1 + expectedInflationRate / 100) - 1;
  const realRateMonthly = Math.max(0.0001, realRateAnnual / 12);
  const retirementMonths = retirementDurationYears * 12;

  // Present Value of Annuity formula for required fund at retirement
  const requiredRetirementCorpus = futureMonthlyIncomeAtRetirement * ((1 - Math.pow(1 + realRateMonthly, -retirementMonths)) / realRateMonthly);

  const shortfallOrSurplus = projectedFundAtRetirement - requiredRetirementCorpus;
  const isFunded = shortfallOrSurplus >= 0;

  // 4. Recommended Monthly Contribution to reach Required Corpus
  let recommendedMonthlySavings = monthlyContribution;
  if (!isFunded && monthsToRetire > 0) {
    const gap = Math.max(0, requiredRetirementCorpus - fvCurrentSavings);
    if (monthlyRateAccum > 0) {
      recommendedMonthlySavings = gap / ((Math.pow(1 + monthlyRateAccum, monthsToRetire) - 1) / monthlyRateAccum);
    } else {
      recommendedMonthlySavings = gap / monthsToRetire;
    }
  }

  // 5. Timeline Generation (Accumulation & Decumulation)
  const timeline: RetirementYearRow[] = [];
  let balance = currentSavings;

  for (let yr = 1; yr <= yearsToRetire; yr++) {
    const age = currentAge + yr;
    const startBal = balance;
    const contribYear = monthlyContribution * 12;
    const growthYear = (startBal + (contribYear * 0.5)) * (expectedAnnualReturn / 100);
    balance = startBal + contribYear + growthYear;

    timeline.push({
      age,
      year: yr,
      phase: "accumulation",
      startingBalance: Math.round(startBal * 100) / 100,
      contributionsOrWithdrawals: Math.round(contribYear * 100) / 100,
      investmentGrowth: Math.round(growthYear * 100) / 100,
      endingBalance: Math.round(balance * 100) / 100,
    });
  }

  // Retirement phase projection (first 10 years sampled)
  let decumBalance = projectedFundAtRetirement;
  const annualWithdrawal = futureMonthlyIncomeAtRetirement * 12;

  for (let rYr = 1; rYr <= Math.min(20, retirementDurationYears); rYr++) {
    const age = retirementAge + rYr;
    const startBal = decumBalance;
    const withdrawal = annualWithdrawal * Math.pow(1 + expectedInflationRate / 100, rYr - 1);
    const growthYear = Math.max(0, (startBal - (withdrawal * 0.5)) * (expectedAnnualReturn / 100));
    decumBalance = Math.max(0, startBal - withdrawal + growthYear);

    timeline.push({
      age,
      year: yearsToRetire + rYr,
      phase: "retirement",
      startingBalance: Math.round(startBal * 100) / 100,
      contributionsOrWithdrawals: -Math.round(withdrawal * 100) / 100,
      investmentGrowth: Math.round(growthYear * 100) / 100,
      endingBalance: Math.round(decumBalance * 100) / 100,
    });
  }

  return {
    currentAge,
    retirementAge,
    yearsToRetire,
    retirementDurationYears,
    projectedFundAtRetirement: Math.round(projectedFundAtRetirement * 100) / 100,
    totalContributionsToRetirement: Math.round(totalContributionsToRetirement * 100) / 100,
    totalGrowthToRetirement: Math.round(totalGrowthToRetirement * 100) / 100,
    futureMonthlyIncomeAtRetirement: Math.round(futureMonthlyIncomeAtRetirement * 100) / 100,
    requiredRetirementCorpus: Math.round(requiredRetirementCorpus * 100) / 100,
    shortfallOrSurplus: Math.round(shortfallOrSurplus * 100) / 100,
    isFunded,
    recommendedMonthlySavings: Math.round(recommendedMonthlySavings * 100) / 100,
    timeline,
  };
}
