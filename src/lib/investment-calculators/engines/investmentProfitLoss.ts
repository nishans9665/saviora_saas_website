import { InvestmentProfitLossInput, ProfitLossResult } from "../types";

export function calculateInvestmentProfitLoss(input: InvestmentProfitLossInput): ProfitLossResult {
  const purchasePricePerUnit = Math.max(0, input.purchasePricePerUnit || 0);
  const sellingPricePerUnit = Math.max(0, input.sellingPricePerUnit || 0);
  const quantity = Math.max(0, input.quantity || 0);
  const purchaseFees = Math.max(0, input.purchaseFees || 0);
  const sellingFees = Math.max(0, input.sellingFees || 0);
  const additionalCosts = Math.max(0, input.additionalCosts || 0);
  const dividendsIncome = Math.max(0, input.dividendsIncome || 0);

  const rawPurchaseCost = purchasePricePerUnit * quantity;
  const totalPurchaseCost = rawPurchaseCost + purchaseFees + additionalCosts;

  const grossSaleValue = sellingPricePerUnit * quantity;
  const totalFees = purchaseFees + sellingFees + additionalCosts;
  const netSaleValue = grossSaleValue - sellingFees + dividendsIncome;

  const grossProfit = grossSaleValue - rawPurchaseCost;
  const netProfit = netSaleValue - totalPurchaseCost;

  const profitPercentage = totalPurchaseCost > 0 ? (netProfit / totalPurchaseCost) * 100 : 0;
  const isProfit = netProfit >= 0;

  // Break-even selling price per unit
  const breakEvenSellingPrice = quantity > 0
    ? (totalPurchaseCost + sellingFees - dividendsIncome) / quantity
    : purchasePricePerUnit;

  // Target prices
  const priceFor10PercentTarget = quantity > 0
    ? (totalPurchaseCost * 1.1 + sellingFees - dividendsIncome) / quantity
    : purchasePricePerUnit * 1.1;

  const priceFor20PercentTarget = quantity > 0
    ? (totalPurchaseCost * 1.2 + sellingFees - dividendsIncome) / quantity
    : purchasePricePerUnit * 1.2;

  return {
    purchasePricePerUnit,
    sellingPricePerUnit,
    quantity,
    totalPurchaseCost: Math.round(totalPurchaseCost * 100) / 100,
    grossSaleValue: Math.round(grossSaleValue * 100) / 100,
    totalFees: Math.round(totalFees * 100) / 100,
    dividendsIncome: Math.round(dividendsIncome * 100) / 100,
    netSaleValue: Math.round(netSaleValue * 100) / 100,
    grossProfit: Math.round(grossProfit * 100) / 100,
    netProfit: Math.round(netProfit * 100) / 100,
    profitPercentage: Math.round(profitPercentage * 100) / 100,
    breakEvenSellingPrice: Math.round(Math.max(0, breakEvenSellingPrice) * 100) / 100,
    priceFor10PercentTarget: Math.round(Math.max(0, priceFor10PercentTarget) * 100) / 100,
    priceFor20PercentTarget: Math.round(Math.max(0, priceFor20PercentTarget) * 100) / 100,
    isProfit,
  };
}
