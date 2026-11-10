"use client";

import React from "react";
import { calculateEPF } from "@/lib/calculators/engines/epf";
import { formatCurrency, formatPercent } from "@/lib/calculators/formatters";
import { NumberInput } from "../shared/NumberInput";
import { ResultCard } from "../shared/ResultCard";
import { BreakdownTable, BreakdownRow } from "../shared/BreakdownTable";
import { CalculatorHero } from "../shared/CalculatorHero";
import { Breadcrumb } from "../shared/Breadcrumb";
import { RelatedTools } from "../shared/RelatedTools";
import { CalculatorFAQ, FAQItem } from "../shared/CalculatorFAQ";
import { ToolFinalCTA } from "../shared/ToolFinalCTA";
import { CountrySelector } from "../shared/CountrySelector";
import { CountryFlag } from "../shared/CountryFlag";
import { SupportedCountryId } from "@/lib/calculators/types";
import { getCountryProfile, normalizeCountryId } from "@/lib/calculators/rules/countryRegistry";
import { RotateCcw, PiggyBank, TrendingUp } from "lucide-react";

const DEFAULT_SALARIES: Record<SupportedCountryId, number> = {
  "usa": 6000,
  "uk": 3500,
  "australia": 7000,
  "canada": 5500,
  "india": 50000,
  "sri-lanka": 150000,
  "singapore": 6000,
  "uae": 15000,
};

interface EPFCalculatorViewProps {
  initialCountry?: SupportedCountryId;
}

export function EPFCalculatorView({ initialCountry = "sri-lanka" }: EPFCalculatorViewProps) {
  const [countryId, setCountryId] = React.useState<SupportedCountryId>(normalizeCountryId(initialCountry));
  const profile = getCountryProfile(countryId);

  const [monthlySalary, setMonthlySalary] = React.useState<number>(DEFAULT_SALARIES[countryId] || 6000);
  const [customEmployeeRate, setCustomEmployeeRate] = React.useState<number | undefined>(undefined);
  const [customEmployerRate, setCustomEmployerRate] = React.useState<number | undefined>(undefined);
  const [projectionYears, setProjectionYears] = React.useState<number>(15);
  const [annualReturn, setAnnualReturn] = React.useState<number>(7);

  const handleCountryChange = (newCountry: SupportedCountryId) => {
    setCountryId(newCountry);
    setMonthlySalary(DEFAULT_SALARIES[newCountry] || 6000);
    setCustomEmployeeRate(undefined);
    setCustomEmployerRate(undefined);
  };

  const result = React.useMemo(() => {
    return calculateEPF({
      country: countryId,
      monthlyEligibleSalary: monthlySalary,
      employeeRatePercent: customEmployeeRate,
      employerRatePercent: customEmployerRate,
      projectionYears,
      annualReturnRatePercent: annualReturn,
    });
  }, [countryId, monthlySalary, customEmployeeRate, customEmployerRate, projectionYears, annualReturn]);

  const currency = profile.defaultCurrency;
  const sym = profile.currencySymbol.trim();

  const rows: BreakdownRow[] = [
    { label: "Eligible Monthly Salary", amount: formatCurrency(result.monthlyEligibleSalary, currency), percentage: "100.00%", type: "income" },
    ...(result.employeeRatePercent > 0
      ? [{ label: `Employee Contribution (${formatPercent(result.employeeRatePercent)})`, amount: formatCurrency(result.employeeMonthlyContribution, currency), percentage: "Salary Deduction", type: "deduction" as const }]
      : [{ label: "Employee Mandatory Contribution", amount: formatCurrency(0, currency), percentage: "0.00% (Employer-Funded)", type: "info" as const }]),
    { label: `Employer Contribution (${formatPercent(result.employerRatePercent)})`, amount: formatCurrency(result.employerMonthlyContribution, currency), percentage: "Paid by Employer", type: "subtotal" },
    { label: "Total Monthly Retirement Contribution", amount: formatCurrency(result.totalMonthlyContribution, currency), percentage: formatPercent(result.totalRatePercent) + " combined", type: "highlight" },
    { label: "Total Annual Retirement Contribution", amount: formatCurrency(result.totalAnnualContribution, currency), percentage: "12 months total", type: "highlight" },
    ...(result.projection
      ? [
          { label: `Projected Fund Balance after ${projectionYears} Years`, amount: formatCurrency(result.projection.projectedTotalBalance, currency), percentage: `Compounded at ${annualReturn}%`, type: "highlight" as const },
          { label: "Total Contributions Contributed", amount: formatCurrency(result.projection.totalEmployeeContributed + result.projection.totalEmployerContributed, currency), percentage: "Principal Invested", type: "subtotal" as const },
          { label: "Total Compound Interest / Dividends", amount: formatCurrency(result.projection.totalInterestEarned, currency), percentage: "Investment Growth", type: "income" as const },
        ]
      : []),
  ];

  const faqs: FAQItem[] = [
    {
      question: `What retirement scheme is modeled for ${profile.name}?`,
      answer: `This calculator applies statutory parameters for ${profile.pensionName} under ${profile.taxAuthorityName} regulations, including standard mandatory employee deductions and employer contribution mandates.`,
    },
    {
      question: "How does the compound interest projection work?",
      answer: "The projection models monthly recurring contributions growing at your selected annual rate of return, compounding month-over-month to show your estimated future nest egg.",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 via-white to-gray-50 text-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 sm:pt-36 lg:pt-40 pb-12 md:pb-16">
        <Breadcrumb
          items={[
            { label: "Free Tools", href: "/free-tools" },
            { label: `${profile.pensionName} Calculator` },
          ]}
        />

        <CalculatorHero
          title={`${profile.pensionName} Calculator`}
          badge={
            <span className="inline-flex items-center gap-1.5">
              <CountryFlag code={profile.code} className="w-3.5 h-2.5 rounded-2xs shrink-0" />
              ${profile.name} Retirement System
            </span>
          }
          description={`Calculate employee contributions, employer contributions, and long-term retirement wealth projections for ${profile.name}.`}
          authorityName={profile.taxAuthorityName}
          lastUpdated="Current Statutory Rules"
        />

        <CountrySelector
          selectedCountry={countryId}
          onCountryChange={handleCountryChange}
          showTaxYear={false}
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-6 bg-white border border-gray-200 rounded-3xl p-6 sm:p-8 shadow-xs">
            <div className="flex items-center justify-between pb-4 mb-6 border-b border-gray-100">
              <div className="flex items-center gap-2">
                <PiggyBank className="w-5 h-5 text-emerald-600" />
                <h3 className="text-lg font-bold text-gray-900">Salary & Contribution Rates</h3>
              </div>
              <button
                type="button"
                onClick={() => {
                  setMonthlySalary(DEFAULT_SALARIES[countryId] || 6000);
                  setCustomEmployeeRate(undefined);
                  setCustomEmployerRate(undefined);
                }}
                className="text-xs text-gray-700 hover:text-emerald-700 flex items-center gap-1 font-medium transition cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                Reset
              </button>
            </div>

            <div className="space-y-5">
              <NumberInput
                label="Monthly Eligible Salary"
                value={monthlySalary}
                onChange={setMonthlySalary}
                prefix={sym}
                hint={`Base qualifying salary for ${profile.pensionName}`}
              />

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <NumberInput
                  label="Employee Rate (%)"
                  value={result.employeeRatePercent}
                  onChange={setCustomEmployeeRate}
                  prefix=""
                  suffix="%"
                  hint="Statutory employee share"
                />
                <NumberInput
                  label="Employer Rate (%)"
                  value={result.employerRatePercent}
                  onChange={setCustomEmployerRate}
                  prefix=""
                  suffix="%"
                  hint="Employer statutory share"
                />
              </div>

              <div className="pt-4 border-t border-gray-100 space-y-4">
                <div className="flex items-center gap-2">
                  <TrendingUp className="w-4 h-4 text-emerald-600" />
                  <h4 className="text-sm font-bold text-gray-900">Retirement Wealth Projection</h4>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <NumberInput
                    label="Projection Period (Years)"
                    value={projectionYears}
                    onChange={setProjectionYears}
                    prefix=""
                    suffix="yrs"
                    min={1}
                    max={40}
                  />
                  <NumberInput
                    label="Expected Annual Return (%)"
                    value={annualReturn}
                    onChange={setAnnualReturn}
                    prefix=""
                    suffix="%"
                    min={0}
                    max={25}
                    step={0.5}
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-6 space-y-6">
            <ResultCard
              title={`Total ${profile.pensionName} Monthly`}
              subtitle={`Combined employee and employer contribution in ${currency}`}
              primaryValue={formatCurrency(result.totalMonthlyContribution, currency)}
              primaryLabel="Total Monthly Contribution"
              badge={`${formatPercent(result.totalRatePercent)} Total Rate`}
              secondaryMetrics={[
                {
                  label: "Employee Share",
                  value: formatCurrency(result.employeeMonthlyContribution, currency),
                  subtext: formatPercent(result.employeeRatePercent) + " of salary",
                },
                {
                  label: "Employer Share",
                  value: formatCurrency(result.employerMonthlyContribution, currency),
                  highlight: true,
                  subtext: formatPercent(result.employerRatePercent) + " of salary",
                },
                {
                  label: "Annual Total",
                  value: formatCurrency(result.totalAnnualContribution, currency),
                },
                ...(result.projection
                  ? [
                      {
                        label: `Forecast (${projectionYears}y)`,
                        value: formatCurrency(result.projection.projectedTotalBalance, currency),
                        highlight: true,
                        subtext: `At ${annualReturn}% annual yield`,
                      },
                    ]
                  : []),
              ]}
              footnote={`Official ${profile.pensionName} rates modeled for ${profile.name}.`}
            />

            <BreakdownTable
              title="Contribution & Projection Summary"
              subtitle={`Detailed breakdown in ${currency}`}
              rows={rows}
              exportFileName={`saviora-pension-${countryId}.csv`}
            />
          </div>
        </div>

        <div className="mt-16 space-y-16">
          <CalculatorFAQ
            title={`Frequently Asked Questions: ${profile.pensionName}`}
            subtitle="Details on statutory rates, benefits, and retirement accumulation."
            items={faqs}
          />

          <RelatedTools
            currentToolId="epf-calculator"
            countryId={countryId}
          />

          <ToolFinalCTA />
        </div>
      </div>
    </div>
  );
}
