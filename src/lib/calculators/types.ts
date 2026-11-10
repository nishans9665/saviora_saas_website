export type SupportedCountryId =
  | "usa"
  | "uk"
  | "australia"
  | "canada"
  | "india"
  | "sri-lanka"
  | "singapore"
  | "uae";

export type SupportedCountry =
  | SupportedCountryId
  | "US"
  | "GB"
  | "UK"
  | "AU"
  | "CA"
  | "IN"
  | "LK"
  | "SG"
  | "AE"
  | "CUSTOM"
  | string;

export type PayFrequency = "annual" | "monthly" | "biweekly" | "weekly" | "hourly";

export type TaxYear = string;

export interface CountryTaxYearOption {
  readonly id: string;
  readonly label: string;
}

export interface CountryProfile {
  readonly id: SupportedCountryId;
  readonly code: string;
  readonly name: string;
  readonly flag: string;
  readonly defaultCurrency: string;
  readonly currencySymbol: string;
  readonly taxAuthorityName: string;
  readonly taxAuthorityUrl: string;
  readonly pensionName: string;
  readonly consumptionTaxName: string;
  readonly severanceName: string;
  readonly defaultTaxYear: string;
  readonly availableTaxYears: readonly CountryTaxYearOption[];
}

export interface TaxBracketRule {
  readonly threshold: number;
  readonly rate: number;
  readonly label: string;
}

export interface TaxRuleset {
  readonly id: TaxYear;
  readonly name: string;
  readonly effectiveDate: string;
  readonly officialSource: string;
  readonly annualRelief: number;
  readonly monthlyRelief: number;
  readonly slabWidth: number;
  readonly brackets: readonly {
    readonly rate: number;
    readonly annualLimit: number;
  }[];
  readonly topRate: number;
}

export interface TaxSlabBreakdown {
  slabIndex: number;
  slabRangeLabel: string;
  rate: number;
  taxableAmountInSlab: number;
  taxForSlab: number;
}

// --- 01. Salary Calculator ---
export interface SalaryCalculatorInput {
  basicSalary?: number;
  enteredSalary?: number;
  frequency?: PayFrequency;
  hoursPerWeek?: number;
  fixedAllowances?: number;
  additionalAllowances?: number;
  overtimeEarnings?: number;
  otherEarnings?: number;
  otherDeductions?: number;
  country?: SupportedCountry;
  countryId?: SupportedCountryId;
  taxYear?: TaxYear;
  customTaxDeduction?: number;
  customEpfEmployeeRate?: number;
  customEpfEmployerRate?: number;
  customEtfEmployerRate?: number;
  customPensionEmployeeRate?: number;
  customPensionEmployerRate?: number;
}

export interface SalaryCalculatorResult {
  countryId?: SupportedCountryId;
  currency?: string;
  currencySymbol?: string;
  frequency?: PayFrequency;
  basicSalary: number;
  totalAllowances: number;
  grossMonthlySalary: number;
  grossAnnualSalary: number;
  pensionEligibleSalary?: number;
  epfEligibleSalary: number;
  employeeEpfDeduction: number;
  employeePensionDeduction: number;
  employeeSocialSecurityDeduction?: number;
  estimatedIncomeTax: number;
  otherDeductions: number;
  totalEmployeeDeductions: number;
  netMonthlySalary: number;
  netAnnualSalary: number;
  employerEpfContribution: number;
  employerEtfContribution: number;
  employerPensionContribution?: number;
  employerSocialSecurityContribution?: number;
  totalEmployerContributions: number;
  costToCompanyMonthly: number;
  costToCompanyAnnual?: number;
  annualGrossSalary: number;
  annualNetSalary: number;
  annualTotalTax: number;
  effectiveTaxRatePercent: number;
  takeHomePercentOfGross: number;
  pensionName?: string;
}

// --- 02. Income Tax Calculator ---
export interface IncomeTaxInput {
  frequency: "monthly" | "annual";
  incomeAmount: number;
  otherTaxableIncome?: number;
  customRelief?: number;
  country?: SupportedCountry;
  countryId?: SupportedCountryId;
  taxYear?: TaxYear;
}

export interface IncomeTaxResult {
  countryId?: SupportedCountryId;
  currency?: string;
  currencySymbol?: string;
  grossMonthlyIncome: number;
  grossAnnualIncome: number;
  annualTaxFreeAllowance: number;
  monthlyTaxFreeAllowance: number;
  annualTaxableIncome: number;
  monthlyTaxableIncome: number;
  slabs: TaxSlabBreakdown[];
  totalAnnualTax: number;
  estimatedMonthlyTax: number;
  socialSecurityTaxAnnual?: number;
  socialSecurityTaxMonthly?: number;
  totalAnnualDeductions?: number;
  totalMonthlyDeductions?: number;
  effectiveTaxRatePercent: number;
  marginalTaxRatePercent: number;
  netAnnualIncome: number;
  netMonthlyIncome: number;
  taxYear?: TaxYear;
  taxYearLabel: string;
  authorityName?: string;
  authorityUrl?: string;
  regionalNotes?: string;
}

// --- 03. Take-Home Salary Calculator ---
export interface TakeHomeInput {
  grossMonthlySalary: number;
  fixedAllowancesIncludedInGross?: number;
  country?: SupportedCountry;
  countryId?: SupportedCountryId;
  epfEmployeeRatePercent?: number;
  pensionEmployeeRatePercent?: number;
  manualTaxAmount?: number;
  autoCalculateTax?: boolean;
  taxYear?: TaxYear;
  otherDeductions: number;
}

export interface TakeHomeResult {
  countryId?: SupportedCountryId;
  currency?: string;
  currencySymbol?: string;
  grossMonthlySalary: number;
  epfEligibleSalary: number;
  epfDeduction: number;
  pensionDeduction: number;
  socialSecurityDeduction?: number;
  incomeTaxDeduction: number;
  otherDeductions: number;
  totalDeductions: number;
  netTakeHomeMonthly: number;
  netTakeHomeAnnual: number;
  takeHomePercentage: number;
  deductionsPercentage: number;
  pensionLabel?: string;
}

// --- 04. Pension / EPF Calculator ---
export interface PensionInput {
  monthlyEligibleSalary: number;
  employeeRatePercent?: number;
  employerRatePercent?: number;
  projectionYears?: number;
  annualReturnRatePercent?: number;
  annualSalaryIncrementPercent?: number;
  country?: SupportedCountry;
  countryId?: SupportedCountryId;
}

export type EPFInput = PensionInput;

export interface PensionResult {
  countryId?: SupportedCountryId;
  currency?: string;
  currencySymbol?: string;
  schemeName?: string;
  pensionSchemeName?: string;
  authorityName?: string;
  monthlyEligibleSalary: number;
  employeeRatePercent: number;
  employerRatePercent: number;
  totalRatePercent: number;
  employeeMonthlyContribution: number;
  employerMonthlyContribution: number;
  totalMonthlyContribution: number;
  employeeAnnualContribution: number;
  employerAnnualContribution: number;
  totalAnnualContribution: number;
  isEmployerOnly?: boolean;
  notes?: string;
  projection?: {
    years: number;
    projectedTotalBalance: number;
    totalEmployeeContributed: number;
    totalEmployerContributed: number;
    totalInterestEarned: number;
  };
}

export type EPFResult = PensionResult;

// --- 05. ETF / Employer Contribution Calculator ---
export interface EmployerContributionInput {
  monthlyEligibleEarnings: number;
  employerRatePercent?: number;
  employmentMonths?: number;
  annualReturnRatePercent?: number;
  country?: SupportedCountry;
  countryId?: SupportedCountryId;
}

export type ETFInput = EmployerContributionInput;

export interface EmployerContributionResult {
  countryId?: SupportedCountryId;
  currency?: string;
  currencySymbol?: string;
  schemeName?: string;
  monthlyEligibleEarnings: number;
  employerRatePercent: number;
  monthlyEmployerContribution: number;
  annualEmployerContribution: number;
  totalPeriodEmployerContribution: number;
  employmentMonths: number;
  employmentYears: number;
  projectedFundValueWithInterest: number;
  estimatedInterestEarned: number;
  isStatutoryEmployerOnly?: boolean;
  benefitsDescription?: string;
}

export type ETFResult = EmployerContributionResult;

// --- 06. VAT / GST / Sales Tax Calculator ---
export type VATMode = "add" | "remove";

export interface VATInput {
  mode: VATMode;
  amount: number;
  vatRatePercent: number;
  country?: SupportedCountry;
  countryId?: SupportedCountryId;
}

export interface VATResult {
  countryId?: SupportedCountryId;
  currency?: string;
  currencySymbol?: string;
  taxName?: string;
  mode: VATMode;
  inputAmount: number;
  vatRatePercent: number;
  vatAmount: number;
  netAmountExclusive: number;
  grossAmountInclusive: number;
  calculationFormula: string;
  standardRates?: readonly { label: string; rate: number }[] | readonly number[];
}

// --- 07. Gratuity / Severance Calculator ---
export type GratuityEmployeeType = "monthly" | "daily";

export interface GratuityInput {
  lastDrawnMonthlySalary: number;
  employeeType?: GratuityEmployeeType;
  calculationMethod: "dates" | "manual_duration";
  startDate?: string;
  endDate?: string;
  completedYears?: number;
  completedMonths?: number;
  organizationHas15PlusEmployees?: boolean;
  country?: SupportedCountry;
  countryId?: SupportedCountryId;
}

export interface GratuityResult {
  countryId?: SupportedCountryId;
  currency?: string;
  currencySymbol?: string;
  schemeName?: string;
  governingAct?: string;
  lastDrawnMonthlySalary: number;
  employeeType: GratuityEmployeeType;
  completedYears: number;
  completedMonths: number;
  totalMonthsOfService: number;
  isEligibleStatutory: boolean;
  eligibilityReason: string;
  eligibleSalaryBasis?: number;
  gratuityRateMultiplierPerYear?: number;
  estimatedGratuityAmount: number;
  formulaDescription: string;
  taxNotes: string;
}

// --- 08. Overtime Calculator ---
export interface OvertimeInput {
  monthlyBasicSalary: number;
  standardMonthlyHours?: number;
  normalOtHours: number;
  normalOtMultiplier?: number;
  holidayOtHours?: number;
  holidayOtMultiplier?: number;
  country?: SupportedCountry;
  countryId?: SupportedCountryId;
}

export interface OvertimeResult {
  countryId?: SupportedCountryId;
  currency?: string;
  currencySymbol?: string;
  governingAct?: string;
  monthlyBasicSalary: number;
  standardMonthlyHours: number;
  normalHourlyRate: number;
  normalOtMultiplier: number;
  normalOtHourlyRate: number;
  normalOtHours: number;
  normalOtEarnings: number;
  holidayOtMultiplier: number;
  holidayOtHourlyRate: number;
  holidayOtHours: number;
  holidayOtEarnings: number;
  totalOtHours: number;
  totalOtEarnings: number;
  estimatedMonthlySalaryWithOt: number;
}
