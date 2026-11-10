"use client";

import React from "react";
import { calculateETF } from "@/lib/calculators/engines/etf";
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
import { RotateCcw, Building2, CheckCircle2 } from "lucide-react";

const DEFAULT_EARNINGS: Record<SupportedCountryId, number> = {
  "usa": 6000,
  "uk": 3500,
  "australia": 7000,
  "canada": 5500,
  "india": 50000,
  "sri-lanka": 150000,
  "singapore": 6000,
  "uae": 15000,
};

interface ETFCalculatorViewProps {
  initialCountry?: SupportedCountryId;
}

export function ETFCalculatorView({ initialCountry = "sri-lanka" }: ETFCalculatorViewProps) {
  const [countryId, setCountryId] = React.useState<SupportedCountryId>(normalizeCountryId(initialCountry));
  const profile = getCountryProfile(countryId);

  const [monthlyEarnings, setMonthlyEarnings] = React.useState<number>(DEFAULT_EARNINGS[countryId] || 6000);
  const [employmentMonths, setEmploymentMonths] = React.useState<number>(36);
  const [customRate, setCustomRate] = React.useState<number | undefined>(undefined);

  const handleCountryChange = (newCountry: SupportedCountryId) => {
    setCountryId(newCountry);
    setMonthlyEarnings(DEFAULT_EARNINGS[newCountry] || 6000);
    setCustomRate(undefined);
  };

  const result = React.useMemo(() => {
    return calculateETF({
      country: countryId,
      monthlyEligibleEarnings: monthlyEarnings,
      employerRatePercent: customRate,
      employmentMonths,
    });
  }, [countryId, monthlyEarnings, customRate, employmentMonths]);

  const currency = profile.defaultCurrency;
  const sym = profile.currencySymbol.trim();

  const rows: BreakdownRow[] = [
    { label: "Eligible Monthly Earnings", amount: formatCurrency(result.monthlyEligibleEarnings, currency), percentage: "100.00%", type: "income" },
    { label: `Statutory Employer Rate (${result.schemeName})`, amount: formatPercent(result.employerRatePercent), percentage: "100% Employer Paid", type: "info" },
    { label: "Monthly Employer Contribution", amount: formatCurrency(result.monthlyEmployerContribution, currency), percentage: formatPercent(result.employerRatePercent) + " of earnings", type: "subtotal" },
    { label: "Annual Employer Contribution", amount: formatCurrency(result.annualEmployerContribution, currency), percentage: "12 months total", type: "subtotal" },
    { label: `Total Period Contribution (${employmentMonths} Months)`, amount: formatCurrency(result.totalPeriodEmployerContribution, currency), percentage: "Cumulative contributions", type: "highlight" },
    { label: "Estimated Compound Value with Dividends", amount: formatCurrency(result.projectedFundValueWithInterest, currency), percentage: "With reinvested yield", type: "highlight" },
  ];

  const faqs: FAQItem[] = [
    {
      question: "Does the employee pay anything for this contribution?",
      answer: "No. Statutory employer contributions (such as Sri Lanka ETF 3%, Australia Employer Super 11.5%, or US Employer FICA) are 100% funded by the employer. Nothing is deducted from the employee's salary.",
    },
    {
      question: "How does the cumulative fund value grow?",
      answer: "Contributions deposited monthly accumulate statutory dividends and interest over the course of your employment tenure.",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 via-white to-gray-50 text-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 sm:pt-36 lg:pt-40 pb-12 md:pb-16">
        <Breadcrumb items={[{ label: "Employer Contribution Calculator"  }]}
        />

        <CalculatorHero
          title={`${result.schemeName || "Employer Contribution"} Calculator`}
          badge={
            <span className="inline-flex items-center gap-1.5">
              <CountryFlag code={profile.code} className="w-3.5 h-2.5 rounded-2xs shrink-0" />
              100% Employer-Funded Benefit
            </span>
          }
          description={`Calculate statutory employer-paid contributions, annual company cost, and accumulated fund value in ${profile.name}.`}
          authorityName={profile.taxAuthorityName}
          lastUpdated="Statutory Rate"
        />

        <CountrySelector
          selectedCountry={countryId}
          onCountryChange={handleCountryChange}
          showTaxYear={false}
        />

        <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-4 mb-8 flex items-center gap-3">
          <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
          <p className="text-xs sm:text-sm text-emerald-900 font-medium">
            <strong>100% Employer Funded:</strong> Under statutory regulations, this contribution is paid entirely by the employer. 0% is deducted from the employee&apos;s basic salary.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-6 bg-white border border-gray-200 rounded-3xl p-6 sm:p-8 shadow-xs">
            <div className="flex items-center justify-between pb-4 mb-6 border-b border-gray-100">
              <div className="flex items-center gap-2">
                <Building2 className="w-5 h-5 text-emerald-600" />
                <h3 className="text-lg font-bold text-gray-900">Contribution Parameters</h3>
              </div>
              <button
                type="button"
                onClick={() => {
                  setMonthlyEarnings(DEFAULT_EARNINGS[countryId] || 6000);
                  setEmploymentMonths(36);
                  setCustomRate(undefined);
                }}
                className="text-xs text-gray-700 hover:text-emerald-700 flex items-center gap-1 font-medium transition cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                Reset
              </button>
            </div>

            <div className="space-y-5">
              <NumberInput
                label="Monthly Eligible Earnings"
                value={monthlyEarnings}
                onChange={setMonthlyEarnings}
                prefix={sym}
                hint={`Earnings subject to ${result.schemeName}`}
              />

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <NumberInput
                  label="Employer Rate (%)"
                  value={result.employerRatePercent}
                  onChange={setCustomRate}
                  prefix=""
                  suffix="%"
                  hint="Statutory employer rate"
                />
                <NumberInput
                  label="Employment Tenure (Months)"
                  value={employmentMonths}
                  onChange={setEmploymentMonths}
                  prefix=""
                  suffix="mo"
                  min={1}
                  max={480}
                  hint="Total months of service"
                />
              </div>
            </div>
          </div>

          <div className="lg:col-span-6 space-y-6">
            <ResultCard
              title="Employer Contribution"
              subtitle={`Monthly statutory company contribution in ${currency}`}
              primaryValue={formatCurrency(result.monthlyEmployerContribution, currency)}
              primaryLabel="Monthly Employer Contribution"
              badge={`${formatPercent(result.employerRatePercent)} Employer Paid`}
              secondaryMetrics={[
                {
                  label: "Annual Employer Cost",
                  value: formatCurrency(result.annualEmployerContribution, currency),
                  subtext: "12 months total",
                },
                {
                  label: "Cumulative Paid",
                  value: formatCurrency(result.totalPeriodEmployerContribution, currency),
                  subtext: `Over ${employmentMonths} months`,
                },
                {
                  label: "Estimated Fund Value",
                  value: formatCurrency(result.projectedFundValueWithInterest, currency),
                  highlight: true,
                  subtext: "With accrued dividends",
                },
              ]}
              footnote={`Official ${result.schemeName} contribution parameters for ${profile.name}.`}
            />

            <BreakdownTable
              title="Employer Contribution Breakdown"
              subtitle={`Summary of company contributions in ${currency}`}
              rows={rows}
              exportFileName={`saviora-employer-contribution-${countryId}.csv`}
            />
          </div>
        </div>

        <div className="mt-16 space-y-16">
          <CalculatorFAQ
            title={`Frequently Asked Questions: ${result.schemeName}`}
            subtitle="Details on employer-funded benefits and claim requirements."
            items={faqs}
          />

          <RelatedTools
            currentToolId="etf-calculator"
            countryId={countryId}
          />

          <ToolFinalCTA />
        </div>
      </div>
    </div>
  );
}
