import { SupportedCurrency } from "./currencies";

export type PaymentFrequency = "monthly" | "quarterly" | "semi-annually" | "annually" | "bi-weekly" | "weekly";

export type CompoundingFrequency = "daily" | "monthly" | "quarterly" | "semi-annually" | "annually";

export type ContributionTiming = "beginning" | "end";

export type FixedDepositPayout = "cumulative" | "monthly" | "quarterly" | "annually";

export type PersonalLoanMethod = "reducing" | "flat";

export type CreditCardPaymentMode = "fixed" | "minimum" | "target-months";

export type DebtStrategy = "snowball" | "avalanche" | "custom";

// Shared Amortization Row
export interface AmortizationRow {
  period: number;
  label?: string; // e.g. "Month 1" or "Oct 2026"
  year?: number;
  beginningBalance: number;
  payment: number;
  principal: number;
  interest: number;
  extraPayment?: number;
  endingBalance: number;
  totalInterestToDate: number;
}

export interface YearlyAmortizationSummary {
  year: number;
  beginningBalance: number;
  totalPrincipal: number;
  totalInterest: number;
  totalPayment: number;
  endingBalance: number;
}

// 1. Loan EMI
export interface LoanEMIInput {
  loanAmount: number;
  annualInterestRate: number;
  tenureYears: number;
  tenureMonths?: number;
  paymentFrequency?: PaymentFrequency;
  currency?: SupportedCurrency;
}

export interface LoanEMIResult {
  principal: number;
  periodicPayment: number;
  monthlyEquivalent: number;
  totalPaymentsCount: number;
  totalInterest: number;
  totalRepayment: number;
  principalPercentage: number;
  interestPercentage: number;
  amortizationSchedule: AmortizationRow[];
  yearlySummary: YearlyAmortizationSummary[];
}

// 2. Personal Loan
export interface PersonalLoanInput {
  loanAmount: number;
  annualInterestRate: number;
  tenureMonths: number;
  method?: PersonalLoanMethod;
  processingFeePercent?: number;
  processingFeeFlat?: number;
  additionalCharges?: number;
  feeDeductedFromDisbursement?: boolean;
  currency?: SupportedCurrency;
}

export interface PersonalLoanResult {
  loanAmount: number;
  monthlyPayment: number;
  totalInterest: number;
  totalProcessingFees: number;
  totalAdditionalCharges: number;
  totalLoanCharges: number;
  totalRepayment: number;
  netDisbursement: number;
  totalCostOfBorrowing: number;
  effectiveAPR: number;
  method: PersonalLoanMethod;
  amortizationSchedule: AmortizationRow[];
  yearlySummary: YearlyAmortizationSummary[];
}

// 3. Home Loan / Mortgage
export interface HomeLoanInput {
  propertyPrice: number;
  downPayment: number;
  annualInterestRate: number;
  tenureYears: number;
  propertyTaxAnnual?: number;
  homeInsuranceAnnual?: number;
  monthlyHOA?: number;
  extraMonthlyPayment?: number;
  currency?: SupportedCurrency;
}

export interface HomeLoanResult {
  propertyPrice: number;
  downPayment: number;
  downPaymentPercent: number;
  loanPrincipal: number;
  ltvRatio: number;
  monthlyPrincipalAndInterest: number;
  monthlyPropertyTax: number;
  monthlyHomeInsurance: number;
  monthlyHOA: number;
  totalMonthlyHousingPayment: number;
  totalInterest: number;
  totalPrincipalRepayment: number;
  totalMortgageCost: number;
  // Extra payment accelerator metrics
  originalPayoffMonths: number;
  actualPayoffMonths: number;
  monthsSaved: number;
  interestSaved: number;
  amortizationSchedule: AmortizationRow[];
  yearlySummary: YearlyAmortizationSummary[];
}

// 4. Vehicle Loan
export interface VehicleLoanInput {
  vehiclePrice: number;
  downPayment: number;
  tradeInValue?: number;
  salesTaxRate?: number;
  dealerFees?: number;
  includeFeesInLoan?: boolean;
  annualInterestRate: number;
  tenureMonths: number;
  paymentFrequency?: "monthly" | "bi-weekly";
  currency?: SupportedCurrency;
}

export interface VehicleLoanTenureComparison {
  tenureMonths: number;
  monthlyPayment: number;
  totalInterest: number;
  totalCost: number;
}

export interface VehicleLoanResult {
  vehiclePrice: number;
  downPayment: number;
  tradeInValue: number;
  totalUpfrontCredits: number;
  salesTaxAmount: number;
  dealerFees: number;
  totalFees: number;
  financedAmount: number;
  periodicPayment: number;
  monthlyEquivalent: number;
  totalInterest: number;
  totalLoanRepayment: number;
  totalOutCount: number;
  totalOutOfPocketCost: number; // Down payment + Trade-in + Total Repayments (+ upfront fees if not financed)
  ltvRatio: number;
  tenureComparisons: VehicleLoanTenureComparison[];
  amortizationSchedule: AmortizationRow[];
  yearlySummary: YearlyAmortizationSummary[];
}

// 5. Simple Interest
export interface SimpleInterestInput {
  principal: number;
  annualInterestRate: number;
  timePeriod: number;
  timeUnit: "days" | "months" | "years";
  currency?: SupportedCurrency;
}

export interface SimpleInterestResult {
  principal: number;
  annualInterestRate: number;
  timeInYears: number;
  totalSimpleInterest: number;
  finalMaturityAmount: number;
  interestPerYear: number;
  interestPerMonth: number;
  interestPerDay: number;
  compoundInterestComparison: {
    compoundInterestAnnual: number;
    difference: number;
  };
}

// 6. Compound Interest
export interface CompoundInterestInput {
  initialInvestment: number;
  annualInterestRate: number;
  durationYears: number;
  compoundingFrequency: CompoundingFrequency;
  regularContribution?: number;
  contributionFrequency?: "monthly" | "quarterly" | "annually";
  contributionTiming?: ContributionTiming;
  currency?: SupportedCurrency;
}

export interface CompoundGrowthYearRow {
  year: number;
  startingBalance: number;
  annualDeposit: number;
  totalDepositedToDate: number;
  interestEarnedThisYear: number;
  totalInterestToDate: number;
  endingBalance: number;
}

export interface CompoundInterestResult {
  initialInvestment: number;
  totalContributions: number;
  totalPrincipalInvested: number;
  totalInterestEarned: number;
  finalBalance: number;
  effectiveAnnualRate: number;
  growthMultiple: number;
  yearByYearGrowth: CompoundGrowthYearRow[];
}

// 7. Fixed Deposit
export interface FixedDepositInput {
  depositAmount: number;
  annualInterestRate: number;
  tenureValue: number;
  tenureUnit: "days" | "months" | "years";
  compoundingFrequency?: CompoundingFrequency;
  payoutOption: FixedDepositPayout;
  startDate?: string; // YYYY-MM-DD
  withholdingTaxRate?: number; // e.g. 5%
  currency?: SupportedCurrency;
}

export interface FixedDepositScheduleRow {
  period: number;
  payoutDate: string;
  openingBalance: number;
  grossInterestEarned: number;
  taxDeducted: number;
  netInterest: number;
  closingBalance: number;
}

export interface FixedDepositResult {
  initialDeposit: number;
  annualInterestRate: number;
  tenureDays: number;
  tenureMonths: number;
  tenureYears: number;
  maturityDate: string;
  grossInterestEarned: number;
  withholdingTaxAmount: number;
  netInterestEarned: number;
  totalMaturityOrPayoutAmount: number;
  effectiveAnnualYield: number;
  periodicPayoutAmount: number; // for non-cumulative
  isCumulative: boolean;
  schedule: FixedDepositScheduleRow[];
}

// 8. Credit Card Interest
export interface CreditCardInput {
  balance: number;
  apr: number;
  paymentMode: CreditCardPaymentMode;
  fixedMonthlyPayment?: number;
  minimumPaymentPercent?: number; // e.g. 2% or 3%
  minimumPaymentFloor?: number; // e.g. $25
  targetMonths?: number;
  monthlyNewPurchases?: number;
  currency?: SupportedCurrency;
}

export interface CreditCardScheduleRow {
  month: number;
  startingBalance: number;
  interestCharged: number;
  payment: number;
  principalPaid: number;
  endingBalance: number;
  totalInterestToDate: number;
}

export interface CreditCardResult {
  currentBalance: number;
  apr: number;
  isNegativeAmortization: boolean;
  warningMessage?: string;
  monthsToPayOff: number;
  monthlyPaymentInitial: number;
  totalInterestPaid: number;
  totalAmountPaid: number;
  // Extra comparison (what if pay +$25 or +$50 / mo)
  extraPaymentComparison?: {
    extraAmount: number;
    newMonths: number;
    monthsSaved: number;
    interestSaved: number;
  };
  schedule: CreditCardScheduleRow[];
}

// 9. Debt Repayment (Snowball & Avalanche)
export interface DebtAccount {
  id: string;
  name: string;
  balance: number;
  interestRate: number; // APR %
  minimumPayment: number;
}

export interface DebtRepaymentInput {
  debts: DebtAccount[];
  extraMonthlyPayment: number;
  strategy: DebtStrategy;
  currency?: SupportedCurrency;
}

export interface StrategyPayoffResult {
  strategyName: string;
  totalMonths: number;
  debtFreeDate: string;
  totalInterestPaid: number;
  totalAmountPaid: number;
  interestSavedVsMinimums: number;
  monthsSavedVsMinimums: number;
  timeline: {
    month: number;
    totalPayment: number;
    totalInterest: number;
    totalRemainingDebt: number;
    paidOffDebtsThisMonth: string[];
  }[];
}

export interface DebtRepaymentResult {
  totalInitialDebt: number;
  totalMinimumPayments: number;
  extraMonthlyPayment: number;
  totalMonthlyPayment: number;
  selectedStrategyResult: StrategyPayoffResult;
  snowballResult: StrategyPayoffResult;
  avalancheResult: StrategyPayoffResult;
  minimumsOnlyResult: StrategyPayoffResult;
  avalancheSavingsVsSnowball: number;
  isInsufficientPayment: boolean;
  insufficientDebts: string[];
}
