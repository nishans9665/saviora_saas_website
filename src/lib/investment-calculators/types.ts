import { SupportedCurrency } from "./currencies";

export type ContributionFrequency = "weekly" | "monthly" | "quarterly" | "annually";
export type CompoundingFrequency = "annually" | "semi-annually" | "quarterly" | "monthly" | "daily";
export type ContributionTiming = "beginning" | "end";

// Shared Timeline / Growth Row
export interface InvestmentYearlyRow {
  year: number;
  startingBalance: number;
  contributionsThisYear: number;
  totalContributionsToDate: number;
  growthThisYear: number;
  totalGrowthToDate: number;
  endingBalance: number;
}

// 1. Investment Return
export interface InvestmentReturnInput {
  initialInvestment: number;
  finalValue: number;
  additionalContributions?: number;
  durationYears: number;
  investmentFees?: number;
  dividendsIncome?: number;
  currency?: SupportedCurrency;
}

export interface InvestmentReturnResult {
  initialInvestment: number;
  additionalContributions: number;
  totalInvestedCapital: number;
  finalValue: number;
  dividendsIncome: number;
  investmentFees: number;
  grossGain: number;
  netGain: number;
  totalReturnPercent: number;
  annualizedReturnCAGR: number;
  durationYears: number;
  netAnnualizedReturn: number;
  yearlySchedule: InvestmentYearlyRow[];
}

// 2. SIP
export interface SIPInput {
  periodicInvestment: number;
  annualReturnRate: number;
  durationYears: number;
  frequency?: ContributionFrequency;
  timing?: ContributionTiming;
  currency?: SupportedCurrency;
}

export interface SIPComparison {
  frequency: ContributionFrequency;
  totalInvested: number;
  estimatedReturns: number;
  futureValue: number;
}

export interface SIPResult {
  periodicInvestment: number;
  frequency: ContributionFrequency;
  periodsPerYear: number;
  totalContributionsCount: number;
  totalInvested: number;
  estimatedReturns: number;
  futureValue: number;
  growthMultiple: number;
  yearlySchedule: InvestmentYearlyRow[];
  comparisons: {
    monthlyPlus10Percent: number;
    monthlyPlus25Percent: number;
    longerBy3Years: number;
    higherReturnBy2Percent: number;
  };
}

// 3. Savings Goal
export interface SavingsGoalInput {
  goalAmount: number;
  currentSavings: number;
  durationYears: number;
  annualInterestRate?: number;
  frequency?: ContributionFrequency;
  currency?: SupportedCurrency;
}

export interface SavingsGoalResult {
  goalAmount: number;
  currentSavings: number;
  remainingTarget: number;
  futureValueOfCurrentSavings: number;
  requiredMonthlyContribution: number;
  requiredWeeklyContribution: number;
  requiredAnnualContribution: number;
  totalContributionsNeeded: number;
  totalInterestEarned: number;
  isAlreadyAchieved: boolean;
  yearlySchedule: InvestmentYearlyRow[];
}

// 4. Retirement
export interface RetirementInput {
  currentAge: number;
  retirementAge: number;
  currentSavings: number;
  monthlyContribution: number;
  desiredMonthlyRetirementIncome: number;
  expectedAnnualReturn: number;
  expectedInflationRate: number;
  retirementDurationYears: number;
  currency?: SupportedCurrency;
}

export interface RetirementYearRow {
  age: number;
  year: number;
  phase: "accumulation" | "retirement";
  startingBalance: number;
  contributionsOrWithdrawals: number;
  investmentGrowth: number;
  endingBalance: number;
}

export interface RetirementResult {
  currentAge: number;
  retirementAge: number;
  yearsToRetire: number;
  retirementDurationYears: number;
  projectedFundAtRetirement: number;
  totalContributionsToRetirement: number;
  totalGrowthToRetirement: number;
  futureMonthlyIncomeAtRetirement: number;
  requiredRetirementCorpus: number;
  shortfallOrSurplus: number;
  isFunded: boolean;
  recommendedMonthlySavings: number;
  timeline: RetirementYearRow[];
}

// 5. Investment Profit & Loss
export interface InvestmentProfitLossInput {
  purchasePricePerUnit: number;
  sellingPricePerUnit: number;
  quantity: number;
  purchaseFees?: number;
  sellingFees?: number;
  additionalCosts?: number;
  dividendsIncome?: number;
  currency?: SupportedCurrency;
}

export interface ProfitLossResult {
  purchasePricePerUnit: number;
  sellingPricePerUnit: number;
  quantity: number;
  totalPurchaseCost: number;
  grossSaleValue: number;
  totalFees: number;
  dividendsIncome: number;
  netSaleValue: number;
  grossProfit: number;
  netProfit: number;
  profitPercentage: number;
  breakEvenSellingPrice: number;
  priceFor10PercentTarget: number;
  priceFor20PercentTarget: number;
  isProfit: boolean;
}

// 6. Inflation
export interface InflationInput {
  currentAmount: number;
  annualInflationRate: number;
  durationYears: number;
  currency?: SupportedCurrency;
}

export interface InflationYearRow {
  year: number;
  futureCost: number;
  purchasingPower: number;
  purchasingPowerLossPercent: number;
}

export interface InflationResult {
  originalAmount: number;
  annualInflationRate: number;
  durationYears: number;
  estimatedFutureCost: number;
  inflationImpact: number;
  futurePurchasingPower: number;
  purchasingPowerReductionPercent: number;
  yearsToDoublePrices: number;
  yearlySchedule: InflationYearRow[];
}

// 7. Monthly Savings
export interface MonthlySavingsInput {
  initialSavings: number;
  monthlyContribution: number;
  annualInterestRate?: number;
  durationYears: number;
  timing?: ContributionTiming;
  currency?: SupportedCurrency;
}

export interface MonthlySavingsResult {
  initialSavings: number;
  monthlyContribution: number;
  totalMonths: number;
  totalContributions: number;
  totalPrincipal: number;
  totalInterestEarned: number;
  finalBalance: number;
  growthPercentage: number;
  withoutInterestFinalBalance: number;
  interestAdvantage: number;
  yearlySchedule: InvestmentYearlyRow[];
}

// 8. ROI
export interface ROIInput {
  initialCost: number;
  finalValue: number;
  additionalIncome?: number;
  expenses?: number;
  durationYears?: number;
  currency?: SupportedCurrency;
}

export interface ROIResult {
  initialCost: number;
  finalValue: number;
  additionalIncome: number;
  expenses: number;
  netProfit: number;
  roiPercentage: number;
  annualizedROI?: number;
  durationYears?: number;
  isProfit: boolean;
  target20PercentValue: number;
  target50PercentValue: number;
}

// 9. Investment Growth
export interface InvestmentGrowthInput {
  initialInvestment: number;
  regularContribution?: number;
  annualReturnRate: number;
  durationYears: number;
  contributionFrequency?: ContributionFrequency;
  compoundingFrequency?: CompoundingFrequency;
  timing?: ContributionTiming;
  expenseRatioPercent?: number;
  currency?: SupportedCurrency;
}

export interface InvestmentGrowthResult {
  initialInvestment: number;
  totalContributions: number;
  totalInvestedCapital: number;
  grossFutureValue: number;
  netFutureValue: number;
  totalGrowthAmount: number;
  totalFeesPaid: number;
  netAnnualReturnRate: number;
  yearlySchedule: InvestmentYearlyRow[];
}

// 10. Emergency Fund
export interface EmergencyFundInput {
  monthlyHousing: number;
  monthlyFood: number;
  monthlyUtilities: number;
  monthlyTransportation: number;
  monthlyHealthcare: number;
  monthlyDebtMinimums: number;
  monthlyOtherEssentials: number;
  existingSavings: number;
  desiredMonths: number;
  monthlyContribution: number;
  currency?: SupportedCurrency;
}

export interface EmergencyFundMilestone {
  months: number;
  label: string;
  targetAmount: number;
  remainingAmount: number;
  monthsToReach: number;
  isAchieved: boolean;
}

export interface EmergencyFundResult {
  totalEssentialMonthlyExpenses: number;
  desiredMonths: number;
  emergencyFundTarget: number;
  existingSavings: number;
  remainingAmountNeeded: number;
  surplusAmount: number;
  estimatedMonthsToReachGoal: number;
  isGoalMet: boolean;
  progressPercent: number;
  milestones: EmergencyFundMilestone[];
}
