import { InvestmentReturnInput, InvestmentReturnResult, InvestmentYearlyRow } from "../types";

export function calculateInvestmentReturn(input: InvestmentReturnInput): InvestmentReturnResult {
  const initialInvestment = Math.max(0, input.initialInvestment || 0);
  const additionalContributions = Math.max(0, input.additionalContributions || 0);
  const finalValue = Math.max(0, input.finalValue || 0);
  const durationYears = Math.max(0.01, input.durationYears || 1);
  const investmentFees = Math.max(0, input.investmentFees || 0);
  const dividendsIncome = Math.max(0, input.dividendsIncome || 0);

  const totalInvestedCapital = initialInvestment + additionalContributions;
  const grossGain = finalValue + dividendsIncome - totalInvestedCapital;
  const netGain = grossGain - investmentFees;

  const totalReturnPercent = totalInvestedCapital > 0 ? (netGain / totalInvestedCapital) * 100 : 0;

  // Annualized Return (CAGR) for single lump sum or with spread contributions
  let annualizedReturnCAGR = 0;
  if (initialInvestment > 0 && finalValue > 0) {
    if (additionalContributions === 0) {
      annualizedReturnCAGR = (Math.pow(finalValue / initialInvestment, 1 / durationYears) - 1) * 100;
    } else {
      // Modified Dietz / Average capital approximation for CAGR with contributions
      const avgCapital = initialInvestment + (additionalContributions * 0.5);
      const totalGrowthRatio = avgCapital > 0 ? (finalValue + dividendsIncome - investmentFees) / avgCapital : 1;
      if (totalGrowthRatio > 0) {
        annualizedReturnCAGR = (Math.pow(totalGrowthRatio, 1 / durationYears) - 1) * 100;
      }
    }
  }

  const netAnnualizedReturn = Math.max(-100, annualizedReturnCAGR);

  // Generate Year-by-Year Schedule
  const yearlySchedule: InvestmentYearlyRow[] = [];
  const yearsRounded = Math.min(50, Math.max(1, Math.round(durationYears)));
  const effectiveAnnualRate = annualizedReturnCAGR / 100;
  const annualContrib = additionalContributions / yearsRounded;

  let currentBalance = initialInvestment;
  let totalContribAccum = initialInvestment;
  let totalGrowthAccum = 0;

  for (let yr = 1; yr <= yearsRounded; yr++) {
    const startBal = currentBalance;
    const contrib = yr === 1 ? initialInvestment + annualContrib : annualContrib;
    totalContribAccum += (yr === 1 ? 0 : annualContrib);
    
    const growth = Math.max(0, (startBal + (annualContrib * 0.5)) * effectiveAnnualRate);
    totalGrowthAccum += growth;
    currentBalance = startBal + annualContrib + growth;

    yearlySchedule.push({
      year: yr,
      startingBalance: Math.round(startBal * 100) / 100,
      contributionsThisYear: Math.round(annualContrib * 100) / 100,
      totalContributionsToDate: Math.round(totalContribAccum * 100) / 100,
      growthThisYear: Math.round(growth * 100) / 100,
      totalGrowthToDate: Math.round(totalGrowthAccum * 100) / 100,
      endingBalance: yr === yearsRounded ? Math.round(finalValue * 100) / 100 : Math.round(currentBalance * 100) / 100,
    });
  }

  return {
    initialInvestment,
    additionalContributions,
    totalInvestedCapital,
    finalValue,
    dividendsIncome,
    investmentFees,
    grossGain,
    netGain,
    totalReturnPercent,
    annualizedReturnCAGR: Math.round(annualizedReturnCAGR * 100) / 100,
    durationYears,
    netAnnualizedReturn: Math.round(netAnnualizedReturn * 100) / 100,
    yearlySchedule,
  };
}
