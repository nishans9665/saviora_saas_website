"use client";

import React from "react";
import { calculateSalary } from "@/lib/calculators/engines/salary";
import { formatCurrency, formatPercent } from "@/lib/calculators/formatters";
import { NumberInput } from "../shared/NumberInput";
import { ResultCard } from "../shared/ResultCard";
import { BreakdownTable, BreakdownRow } from "../shared/BreakdownTable";
import { VisualBar, Segment } from "../shared/VisualBar";
import { CalculatorHero } from "../shared/CalculatorHero";
import { Breadcrumb } from "../shared/Breadcrumb";
import { RelatedTools } from "../shared/RelatedTools";
import { CalculatorFAQ, FAQItem } from "../shared/CalculatorFAQ";
import { ToolFinalCTA } from "../shared/ToolFinalCTA";
import { CountrySelector } from "../shared/CountrySelector";
import { CountryFlag } from "../shared/CountryFlag";
import { SupportedCountryId, TaxYear, PayFrequency } from "@/lib/calculators/types";
import { getCountryProfile, normalizeCountryId } from "@/lib/calculators/rules/countryRegistry";
import { RotateCcw, Wallet } from "lucide-react";

const DEFAULT_SALARIES: Record<SupportedCountryId, number> = {
  "usa": 6000,
  "uk": 3500,
  "australia": 6500,
  "canada": 5500,
  "india": 75000,
  "sri-lanka": 150000,
  "singapore": 5000,
  "uae": 15000,
};

interface SalaryCalculatorViewProps {
  initialCountry?: SupportedCountryId;
}

export function SalaryCalculatorView({ initialCountry = "usa" }: SalaryCalculatorViewProps) {
  const [countryId, setCountryId] = React.useState<SupportedCountryId>(normalizeCountryId(initialCountry));
  const profile = getCountryProfile(countryId);

  const [frequency, setFrequency] = React.useState<PayFrequency>("monthly");
  const [basicSalary, setBasicSalary] = React.useState<number>(DEFAULT_SALARIES[countryId] || 6000);
  const [fixedAllowances, setFixedAllowances] = React.useState<number>(0);
  const [additionalAllowances, setAdditionalAllowances] = React.useState<number>(0);
  const [overtimeEarnings, setOvertimeEarnings] = React.useState<number>(0);
  const [otherEarnings, setOtherEarnings] = React.useState<number>(0);
  const [otherDeductions, setOtherDeductions] = React.useState<number>(0);
  const [taxYear, setTaxYear] = React.useState<TaxYear>(profile.defaultTaxYear);

  // When country changes, reset salary defaults to country currency scale
  const handleCountryChange = (newCountry: SupportedCountryId) => {
    setCountryId(newCountry);
    const newProfile = getCountryProfile(newCountry);
    setTaxYear(newProfile.defaultTaxYear);
    setBasicSalary(DEFAULT_SALARIES[newCountry] || 5000);
    setFixedAllowances(0);
    setAdditionalAllowances(0);
    setOvertimeEarnings(0);
    setOtherEarnings(0);
    setOtherDeductions(0);
  };

  const result = React.useMemo(() => {
    return calculateSalary({
      enteredSalary: basicSalary,
      basicSalary,
      frequency,
      fixedAllowances,
      additionalAllowances,
      overtimeEarnings,
      otherEarnings,
      otherDeductions,
      country: countryId,
      taxYear,
    });
  }, [
    basicSalary,
    frequency,
    fixedAllowances,
    additionalAllowances,
    overtimeEarnings,
    otherEarnings,
    otherDeductions,
    countryId,
    taxYear,
  ]);

  const handleReset = () => {
    setBasicSalary(DEFAULT_SALARIES[countryId] || 6000);
    setFixedAllowances(0);
    setAdditionalAllowances(0);
    setOvertimeEarnings(0);
    setOtherEarnings(0);
    setOtherDeductions(0);
  };

  const currency = profile.defaultCurrency;
  const sym = profile.currencySymbol.trim();

  const visualSegments: Segment[] = [
    {
      label: "Net Take-Home Pay",
      value: result.netMonthlySalary,
      color: "bg-emerald-500",
      textColor: "text-emerald-700",
      description: formatPercent(result.takeHomePercentOfGross) + " of gross",
    },
    ...(result.employeePensionDeduction && result.employeePensionDeduction > 0
      ? [
          {
            label: profile.pensionName,
            value: result.employeePensionDeduction,
            color: "bg-blue-500",
            textColor: "text-blue-700",
            description: formatCurrency(result.employeePensionDeduction, currency) + "/mo",
          },
        ]
      : []),
    ...(result.employeeSocialSecurityDeduction && result.employeeSocialSecurityDeduction > 0
      ? [
          {
            label: "Social Security / NI / Medicare",
            value: result.employeeSocialSecurityDeduction,
            color: "bg-indigo-500",
            textColor: "text-indigo-700",
            description: formatCurrency(result.employeeSocialSecurityDeduction, currency) + "/mo",
          },
        ]
      : []),
    ...(result.estimatedIncomeTax > 0
      ? [
          {
            label: "Income Tax",
            value: result.estimatedIncomeTax,
            color: "bg-amber-500",
            textColor: "text-amber-700",
            description: formatCurrency(result.estimatedIncomeTax, currency) + "/mo",
          },
        ]
      : []),
    ...(result.otherDeductions > 0
      ? [
          {
            label: "Other Deductions",
            value: result.otherDeductions,
            color: "bg-rose-500",
            textColor: "text-rose-700",
            description: formatCurrency(result.otherDeductions, currency) + "/mo",
          },
        ]
      : []),
  ];

  const breakdownRows: BreakdownRow[] = [
    { label: "Basic Salary (" + frequency + ")", amount: formatCurrency(result.basicSalary, currency), percentage: formatPercent(result.grossMonthlySalary > 0 ? (result.basicSalary / result.grossMonthlySalary) * 100 : 0), type: "income" },
    ...(result.totalAllowances > 0 ? [{ label: "Total Allowances & Overtime", amount: formatCurrency(result.totalAllowances, currency), percentage: formatPercent(result.grossMonthlySalary > 0 ? (result.totalAllowances / result.grossMonthlySalary) * 100 : 0), type: "income" as const }] : []),
    { label: "Gross Monthly Salary", amount: formatCurrency(result.grossMonthlySalary, currency), percentage: "100.00%", type: "subtotal" },
    ...(result.employeePensionDeduction && result.employeePensionDeduction > 0 ? [{ label: "Employee Retirement Deduction (" + profile.pensionName + ")", amount: formatCurrency(result.employeePensionDeduction, currency), percentage: formatPercent(result.grossMonthlySalary > 0 ? (result.employeePensionDeduction / result.grossMonthlySalary) * 100 : 0), type: "deduction" as const }] : []),
    ...(result.employeeSocialSecurityDeduction && result.employeeSocialSecurityDeduction > 0 ? [{ label: "Employee Social Security / NI / FICA", amount: formatCurrency(result.employeeSocialSecurityDeduction, currency), percentage: formatPercent(result.grossMonthlySalary > 0 ? (result.employeeSocialSecurityDeduction / result.grossMonthlySalary) * 100 : 0), type: "deduction" as const }] : []),
    { label: "Estimated Income Tax (" + profile.taxAuthorityName + ")", amount: formatCurrency(result.estimatedIncomeTax, currency), percentage: formatPercent(result.effectiveTaxRatePercent), type: "deduction" },
    ...(result.otherDeductions > 0 ? [{ label: "Other Deductions", amount: formatCurrency(result.otherDeductions, currency), percentage: formatPercent(result.grossMonthlySalary > 0 ? (result.otherDeductions / result.grossMonthlySalary) * 100 : 0), type: "deduction" as const }] : []),
    { label: "Total Employee Deductions", amount: formatCurrency(result.totalEmployeeDeductions, currency), percentage: formatPercent(result.grossMonthlySalary > 0 ? (result.totalEmployeeDeductions / result.grossMonthlySalary) * 100 : 0), type: "subtotal" },
    { label: "Net Monthly Take-Home Pay", amount: formatCurrency(result.netMonthlySalary, currency), percentage: formatPercent(result.takeHomePercentOfGross), type: "net" },
    { label: "Net Annual Salary (Take-Home)", amount: formatCurrency(result.netAnnualSalary, currency), percentage: "12 months net", type: "highlight" },
    ...(result.totalEmployerContributions > 0 ? [
      { label: "Employer Mandatory Contributions (" + profile.pensionName + ")", amount: formatCurrency(result.totalEmployerContributions, currency), percentage: "Employer Paid", type: "info" as const },
      { label: "Cost to Company (CTC Monthly)", amount: formatCurrency(result.costToCompanyMonthly, currency), percentage: "Gross + Employer Share", type: "subtotal" as const },
    ] : []),
  ];

  const faqs: FAQItem[] = [
    {
      question: `How is gross salary calculated in ${profile.name}?`,
      answer: `In ${profile.name}, gross salary includes your basic pay plus fixed allowances, performance allowances, commissions, and overtime pay before statutory deductions like income tax and retirement contributions (${profile.pensionName}).`,
    },
    {
      question: `What statutory retirement deductions apply in ${profile.name}?`,
      answer: `In ${profile.name}, employment regulations govern retirement contributions via ${profile.pensionName}. Our calculator applies official rates and statutory ceilings enforced by ${profile.taxAuthorityName}.`,
    },
    {
      question: `Does Saviora store my salary information?`,
      answer: `Never. All calculations run 100% locally in your web browser. No financial data is sent to our servers or stored in any database.`,
    },
    {
      question: `How does Cost to Company (CTC) differ from Gross Salary?`,
      answer: `Gross salary is the amount earned by the employee before personal tax and pension deductions. Cost to Company (CTC) includes the gross salary PLUS employer-paid statutory contributions like employer pension, insurance, and payroll taxes.`,
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 via-white to-gray-50 text-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 sm:pt-36 lg:pt-40 pb-12 md:pb-16">
        <Breadcrumb
          items={[
            { label: "Free Tools", href: "/free-tools" },
            { label: `${profile.name} Salary Calculator` },
          ]}
        />

        <CalculatorHero
          title={`${profile.name} Salary Calculator`}
          badge={
            <span className="inline-flex items-center gap-1.5">
              <CountryFlag code={profile.code} className="w-3.5 h-2.5 rounded-2xs shrink-0" />
              ${profile.name} Rules Active
            </span>
          }
          description={`Calculate your exact gross-to-net salary breakdown, ${profile.pensionName} contributions, and estimated income tax under official ${profile.taxAuthorityName} statutory guidelines.`}
          authorityName={profile.taxAuthorityName}
          lastUpdated={taxYear}
        />

        {/* Multi-Country Selector */}
        <CountrySelector
          selectedCountry={countryId}
          onCountryChange={handleCountryChange}
          selectedTaxYear={taxYear}
          onTaxYearChange={setTaxYear}
        />

        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Inputs Section */}
          <div className="lg:col-span-6 bg-white border border-gray-200 rounded-3xl p-6 sm:p-8 shadow-xs">
            <div className="flex items-center justify-between pb-4 mb-6 border-b border-gray-100">
              <div className="flex items-center gap-2">
                <Wallet className="w-5 h-5 text-emerald-600" />
                <h3 className="text-lg font-bold text-gray-900">Salary Earnings & Allowances</h3>
              </div>
              <button
                type="button"
                onClick={handleReset}
                className="text-xs text-gray-700 hover:text-emerald-700 flex items-center gap-1 font-medium transition cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                Reset
              </button>
            </div>

            <div className="space-y-5">
              {/* Pay Frequency */}
              <div>
                <label className="block text-sm font-semibold text-gray-800 mb-1.5">
                  Pay Frequency
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {(["monthly", "annual", "hourly"] as PayFrequency[]).map((f) => (
                    <button
                      key={f}
                      type="button"
                      onClick={() => setFrequency(f)}
                      className={`py-2 text-xs font-semibold rounded-xl capitalize transition border ${
                        frequency === f
                          ? "bg-emerald-600 text-white border-emerald-600 shadow-xs"
                          : "bg-gray-50 text-gray-700 border-gray-200 hover:bg-gray-100"
                      }`}
                    >
                      {f}
                    </button>
                  ))}
                </div>
              </div>

              <NumberInput
                label={`Basic Salary (${frequency})`}
                value={basicSalary}
                onChange={setBasicSalary}
                prefix={sym}
                hint={`Base contracted salary in ${profile.defaultCurrency}`}
              />

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <NumberInput
                  label="Fixed Allowances"
                  value={fixedAllowances}
                  onChange={setFixedAllowances}
                  prefix={sym}
                  hint="Housing, transport, phone"
                />
                <NumberInput
                  label="Additional Allowances"
                  value={additionalAllowances}
                  onChange={setAdditionalAllowances}
                  prefix={sym}
                  hint="Performance, cost-of-living"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <NumberInput
                  label="Overtime Earnings"
                  value={overtimeEarnings}
                  onChange={setOvertimeEarnings}
                  prefix={sym}
                  hint="Overtime hours pay"
                />
                <NumberInput
                  label="Other Bonuses / Earnings"
                  value={otherEarnings}
                  onChange={setOtherEarnings}
                  prefix={sym}
                  hint="Incentives, one-off payments"
                />
              </div>

              <div className="pt-2 border-t border-gray-100">
                <NumberInput
                  label="Other Voluntary Deductions"
                  value={otherDeductions}
                  onChange={setOtherDeductions}
                  prefix={sym}
                  hint="Loan repayments, voluntary savings, insurance"
                />
              </div>
            </div>
          </div>

          {/* Results Section */}
          <div className="lg:col-span-6 space-y-6">
            <ResultCard
              title="Net Take-Home Pay"
              subtitle={`Estimated monthly take-home in ${profile.defaultCurrency}`}
              primaryValue={formatCurrency(result.netMonthlySalary, currency)}
              primaryLabel="Net Monthly Salary"
              badge={`${formatPercent(result.takeHomePercentOfGross)} of Gross`}
              secondaryMetrics={[
                {
                  label: "Gross Monthly",
                  value: formatCurrency(result.grossMonthlySalary, currency),
                  subtext: formatCurrency(result.grossAnnualSalary || result.annualGrossSalary, currency) + " /yr",
                },
                {
                  label: "Total Deductions",
                  value: formatCurrency(result.totalEmployeeDeductions, currency),
                  highlight: result.totalEmployeeDeductions > 0,
                },
                {
                  label: "Income Tax",
                  value: formatCurrency(result.estimatedIncomeTax, currency),
                  subtext: formatPercent(result.effectiveTaxRatePercent) + " effective",
                },
                {
                  label: "Annual Take-Home",
                  value: formatCurrency(result.netAnnualSalary, currency),
                  highlight: true,
                },
              ]}
              footnote={`Calculated under ${profile.taxAuthorityName} guidelines for tax year ${taxYear}.`}
            />

            <VisualBar
              title="Monthly Salary Distribution"
              totalAmount={result.grossMonthlySalary}
              segments={visualSegments}
            />

            <BreakdownTable
              title="Full Gross-to-Net Breakdown"
              subtitle={`Detailed breakdown in ${profile.defaultCurrency} (${profile.name})`}
              rows={breakdownRows}
              exportFileName={`saviora-salary-breakdown-${countryId}.csv`}
            />
          </div>
        </div>

        {/* FAQ & Related */}
        <div className="mt-16 space-y-16">
          <CalculatorFAQ
            title={`Frequently Asked Questions: ${profile.name} Salary`}
            subtitle={`Key details on gross, net, taxes and retirement rules in ${profile.name}.`}
            items={faqs}
          />

          <RelatedTools
            currentToolId="salary-calculator"
            countryId={countryId}
          />

          <ToolFinalCTA />
        </div>
      </div>
    </div>
  );
}
