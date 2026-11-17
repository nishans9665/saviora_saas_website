import { ROIInput, ROIResult } from "../types";

export function calculateROI(input: ROIInput): ROIResult {
  const initialCost = Math.max(0, input.initialCost || 0);
  const finalValue = Math.max(0, input.finalValue || 0);
  const additionalIncome = Math.max(0, input.additionalIncome || 0);
  const expenses = Math.max(0, input.expenses || 0);
  const durationYears = input.durationYears && input.durationYears > 0 ? input.durationYears : undefined;

  const totalReturnInDollars = finalValue + additionalIncome - expenses;
  const netProfit = totalReturnInDollars - initialCost;
  const roiPercentage = initialCost > 0 ? (netProfit / initialCost) * 100 : 0;
  const isProfit = netProfit >= 0;

  let annualizedROI: number | undefined = undefined;
  if (durationYears && durationYears > 0 && initialCost > 0 && totalReturnInDollars > 0) {
    annualizedROI = (Math.pow(totalReturnInDollars / initialCost, 1 / durationYears) - 1) * 100;
  }

  // Scenarios
  const target20PercentValue = (initialCost * 1.20) + expenses - additionalIncome;
  const target50PercentValue = (initialCost * 1.50) + expenses - additionalIncome;

  return {
    initialCost,
    finalValue,
    additionalIncome,
    expenses,
    netProfit: Math.round(netProfit * 100) / 100,
    roiPercentage: Math.round(roiPercentage * 100) / 100,
    annualizedROI: annualizedROI !== undefined ? Math.round(annualizedROI * 100) / 100 : undefined,
    durationYears,
    isProfit,
    target20PercentValue: Math.round(Math.max(0, target20PercentValue) * 100) / 100,
    target50PercentValue: Math.round(Math.max(0, target50PercentValue) * 100) / 100,
  };
}
