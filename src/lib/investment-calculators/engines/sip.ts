import { SIPInput, SIPResult, InvestmentYearlyRow, ContributionFrequency } from "../types";

export function calculateSIP(input: SIPInput): SIPResult {
  const periodicInvestment = Math.max(0, input.periodicInvestment || 0);
  const annualReturnRate = input.annualReturnRate || 0;
  const durationYears = Math.max(0.1, input.durationYears || 1);
  const frequency: ContributionFrequency = input.frequency || "monthly";
  const timing = input.timing || "end";

  let periodsPerYear = 12;
  if (frequency === "weekly") periodsPerYear = 52;
  else if (frequency === "quarterly") periodsPerYear = 4;
  else if (frequency === "annually") periodsPerYear = 1;

  const totalPeriods = Math.round(durationYears * periodsPerYear);
  const periodicRate = annualReturnRate > 0 ? (annualReturnRate / 100) / periodsPerYear : 0;

  const totalInvested = periodicInvestment * totalPeriods;
  let futureValue = 0;

  if (periodicRate === 0) {
    futureValue = totalInvested;
  } else {
    // Ordinary annuity vs Annuity due (beginning of period)
    const factor = Math.pow(1 + periodicRate, totalPeriods);
    futureValue = periodicInvestment * ((factor - 1) / periodicRate);
    if (timing === "beginning") {
      futureValue *= (1 + periodicRate);
    }
  }

  const estimatedReturns = Math.max(0, futureValue - totalInvested);
  const growthMultiple = totalInvested > 0 ? futureValue / totalInvested : 1;

  // Year-by-year schedule
  const yearlySchedule: InvestmentYearlyRow[] = [];
  const yearsRounded = Math.min(50, Math.max(1, Math.ceil(durationYears)));
  let balance = 0;
  let totalContribSoFar = 0;
  let totalGrowthSoFar = 0;

  for (let yr = 1; yr <= yearsRounded; yr++) {
    const startBal = balance;
    let contribYear = 0;
    let growthYear = 0;

    for (let p = 0; p < periodsPerYear; p++) {
      if ((yr - 1) * periodsPerYear + p < totalPeriods) {
        contribYear += periodicInvestment;
        if (timing === "beginning") {
          const interestPeriod = (balance + periodicInvestment) * periodicRate;
          balance += periodicInvestment + interestPeriod;
          growthYear += interestPeriod;
        } else {
          const interestPeriod = balance * periodicRate;
          balance += periodicInvestment + interestPeriod;
          growthYear += interestPeriod;
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

  // Comparisons
  const calcFV = (amt: number, rate: number, yrs: number) => {
    const pCount = Math.round(yrs * periodsPerYear);
    const pRate = (rate / 100) / periodsPerYear;
    if (pRate === 0) return amt * pCount;
    let fv = amt * ((Math.pow(1 + pRate, pCount) - 1) / pRate);
    if (timing === "beginning") fv *= (1 + pRate);
    return fv;
  };

  return {
    periodicInvestment,
    frequency,
    periodsPerYear,
    totalContributionsCount: totalPeriods,
    totalInvested: Math.round(totalInvested * 100) / 100,
    estimatedReturns: Math.round(estimatedReturns * 100) / 100,
    futureValue: Math.round(futureValue * 100) / 100,
    growthMultiple: Math.round(growthMultiple * 100) / 100,
    yearlySchedule,
    comparisons: {
      monthlyPlus10Percent: Math.round(calcFV(periodicInvestment * 1.1, annualReturnRate, durationYears)),
      monthlyPlus25Percent: Math.round(calcFV(periodicInvestment * 1.25, annualReturnRate, durationYears)),
      longerBy3Years: Math.round(calcFV(periodicInvestment, annualReturnRate, durationYears + 3)),
      higherReturnBy2Percent: Math.round(calcFV(periodicInvestment, annualReturnRate + 2, durationYears)),
    },
  };
}
