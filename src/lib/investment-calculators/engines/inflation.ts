import { InflationInput, InflationResult, InflationYearRow } from "../types";

export function calculateInflation(input: InflationInput): InflationResult {
  const currentAmount = Math.max(0, input.currentAmount || 0);
  const annualInflationRate = Math.max(0, input.annualInflationRate || 0);
  const durationYears = Math.max(1, Math.min(100, input.durationYears || 10));

  const rateDec = annualInflationRate / 100;
  const growthMultiplier = Math.pow(1 + rateDec, durationYears);

  // Future equivalent cost to buy same goods
  const estimatedFutureCost = currentAmount * growthMultiplier;
  const inflationImpact = estimatedFutureCost - currentAmount;

  // Purchasing power of today's amount in future
  const futurePurchasingPower = growthMultiplier > 0 ? currentAmount / growthMultiplier : currentAmount;
  const purchasingPowerReductionPercent = currentAmount > 0
    ? ((currentAmount - futurePurchasingPower) / currentAmount) * 100
    : 0;

  // Rule of 72 for price doubling
  const yearsToDoublePrices = annualInflationRate > 0 ? Math.round((72 / annualInflationRate) * 10) / 10 : 0;

  // Year-by-year schedule
  const yearlySchedule: InflationYearRow[] = [];
  for (let yr = 1; yr <= durationYears; yr++) {
    const yrMultiplier = Math.pow(1 + rateDec, yr);
    const yrCost = currentAmount * yrMultiplier;
    const yrPower = currentAmount / yrMultiplier;
    const lossPercent = ((currentAmount - yrPower) / currentAmount) * 100;

    yearlySchedule.push({
      year: yr,
      futureCost: Math.round(yrCost * 100) / 100,
      purchasingPower: Math.round(yrPower * 100) / 100,
      purchasingPowerLossPercent: Math.round(lossPercent * 10) / 10,
    });
  }

  return {
    originalAmount: currentAmount,
    annualInflationRate,
    durationYears,
    estimatedFutureCost: Math.round(estimatedFutureCost * 100) / 100,
    inflationImpact: Math.round(inflationImpact * 100) / 100,
    futurePurchasingPower: Math.round(futurePurchasingPower * 100) / 100,
    purchasingPowerReductionPercent: Math.round(purchasingPowerReductionPercent * 10) / 10,
    yearsToDoublePrices,
    yearlySchedule,
  };
}
