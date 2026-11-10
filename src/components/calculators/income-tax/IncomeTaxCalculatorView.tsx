"use client";

import React from "react";
import { calculateIncomeTax } from "@/lib/calculators/engines/incomeTax";
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
import { SupportedCountryId, TaxYear } from "@/lib/calculators/types";
import { getCountryProfile, normalizeCountryId } from "@/lib/calculators/rules/countryRegistry";
import { RotateCcw, Scale, CheckCircle2 } from "lucide-react";

const DEFAULT_INCOMES: Record<SupportedCountryId, number> = {
  "usa": 100000,
  "uk": 50000,
  "australia": 90000,
  "canada": 75000,
  "india": 1200000,
  "sri-lanka": 2400000,
  "singapore": 80000,
  "uae": 200000,
};

interface IncomeTaxCalculatorViewProps {
  initialCountry?: SupportedCountryId;
}

export function IncomeTaxCalculatorView({ initialCountry = "usa" }: IncomeTaxCalculatorViewProps) {
  const [countryId, setCountryId] = React.useState<SupportedCountryId>(normalizeCountryId(initialCountry));
  const profile = getCountryProfile(countryId);

  const [frequency, setFrequency] = React.useState<"monthly" | "annual">("annual");
  const [incomeAmount, setIncomeAmount] = React.useState<number>(DEFAULT_INCOMES[countryId] || 100000);
  const [otherTaxableIncome, setOtherTaxableIncome] = React.useState<number>(0);
  const [taxYear, setTaxYear] = React.useState<TaxYear>(profile.defaultTaxYear);

  const handleCountryChange = (newCountry: SupportedCountryId) => {
    setCountryId(newCountry);
    const newProfile = getCountryProfile(newCountry);
    setTaxYear(newProfile.defaultTaxYear);
    setIncomeAmount(DEFAULT_INCOMES[newCountry] || 100000);
    setOtherTaxableIncome(0);
  };

  const result = React.useMemo(() => {
    return calculateIncomeTax({
      country: countryId,
      frequency,
      incomeAmount,
      otherTaxableIncome,
      taxYear,
    });
  }, [countryId, frequency, incomeAmount, otherTaxableIncome, taxYear]);

  const currency = profile.defaultCurrency;
  const sym = profile.currencySymbol.trim();
  const isZeroTaxCountry = countryId === "uae";

  const visualSegments: Segment[] = [
    {
      label: "Net After-Tax Income",
      value: result.netAnnualIncome,
      color: "bg-emerald-500",
      textColor: "text-emerald-700",
      description: formatPercent(100 - result.effectiveTaxRatePercent) + " of gross",
    },
    ...(result.totalAnnualTax > 0
      ? [
          {
            label: "Income Tax",
            value: result.totalAnnualTax,
            color: "bg-amber-500",
            textColor: "text-amber-700",
            description: formatCurrency(result.totalAnnualTax, currency) + "/yr",
          },
        ]
      : []),
    ...(result.socialSecurityTaxAnnual && result.socialSecurityTaxAnnual > 0
      ? [
          {
            label: "Social Security / FICA / NI",
            value: result.socialSecurityTaxAnnual,
            color: "bg-indigo-500",
            textColor: "text-indigo-700",
            description: formatCurrency(result.socialSecurityTaxAnnual, currency) + "/yr",
          },
        ]
      : []),
  ];

  const slabRows: BreakdownRow[] = result.slabs.map((s) => ({
    label: `Slab ${s.slabIndex}: ${s.slabRangeLabel}`,
    amount: formatCurrency(s.taxForSlab, currency),
    percentage: formatPercent(s.rate * 100) + ` (on ${formatCurrency(s.taxableAmountInSlab, currency)})`,
    type: s.taxForSlab > 0 ? "deduction" : "income",
  }));

  const summaryRows: BreakdownRow[] = [
    { label: "Gross Annual Income", amount: formatCurrency(result.grossAnnualIncome, currency), percentage: "100.00%", type: "income" },
    ...(result.annualTaxFreeAllowance > 0
      ? [{ label: "Tax-Free Allowance / Standard Deduction", amount: formatCurrency(result.annualTaxFreeAllowance, currency), percentage: "Tax-Exempt", type: "info" as const }]
      : []),
    { label: "Net Taxable Income", amount: formatCurrency(result.annualTaxableIncome, currency), percentage: formatPercent(result.grossAnnualIncome > 0 ? (result.annualTaxableIncome / result.grossAnnualIncome) * 100 : 0), type: "subtotal" },
    ...slabRows,
    ...(result.socialSecurityTaxAnnual && result.socialSecurityTaxAnnual > 0
      ? [{ label: "Social Security / NI / FICA Tax", amount: formatCurrency(result.socialSecurityTaxAnnual, currency), percentage: "Statutory", type: "deduction" as const }]
      : []),
    { label: "Total Estimated Annual Tax", amount: formatCurrency(result.totalAnnualTax + (result.socialSecurityTaxAnnual || 0), currency), percentage: formatPercent(result.effectiveTaxRatePercent), type: "subtotal" },
    { label: "Net Annual Take-Home Income", amount: formatCurrency(result.netAnnualIncome, currency), percentage: formatPercent(100 - result.effectiveTaxRatePercent), type: "highlight" },
    { label: "Net Monthly Take-Home Income", amount: formatCurrency(result.netMonthlyIncome, currency), percentage: "1/12th of Net", type: "net" },
  ];

  const faqs: FAQItem[] = [
    {
      question: `How does progressive income tax work in ${profile.name}?`,
      answer: `In ${profile.name}, income is taxed across progressive brackets. You only pay the higher tax rate on earnings within that specific bracket, not on your entire income. The first portion of your earnings is either tax-free or taxed at the lowest rate.`,
    },
    {
      question: `What is the difference between Effective and Marginal Tax Rate?`,
      answer: `Your Marginal Tax Rate is the percentage of tax paid on your last dollar of earnings. Your Effective Tax Rate is the total tax paid divided by your total income, which is always lower than your top bracket rate.`,
    },
    {
      question: `Are there social security or payroll deductions in ${profile.name}?`,
      answer: result.regionalNotes || `Yes, statutory deductions like social security or national insurance may apply depending on employment status in ${profile.name}.`,
    },
    {
      question: `Does Saviora store or transmit my salary details?`,
      answer: "Saviora never stores or transmits your financial calculations. All tax figures are computed locally inside your browser session.",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 via-white to-gray-50 text-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 sm:pt-36 lg:pt-40 pb-12 md:pb-16">
        <Breadcrumb
          items={[
            { label: "Free Tools", href: "/free-tools" },
            { label: `${profile.name} Income Tax Calculator` },
          ]}
        />

        <CalculatorHero
          title={`${profile.name} Income Tax Calculator`}
          badge={
            <span className="inline-flex items-center gap-1.5">
              <CountryFlag code={profile.code} className="w-3.5 h-2.5 rounded-2xs shrink-0" />
              ${profile.name} Tax Rules
            </span>
          }
          description={`Calculate your estimated income tax, effective tax rate, and progressive slab breakdown under official ${profile.taxAuthorityName} regulations for ${taxYear}.`}
          authorityName={profile.taxAuthorityName}
          lastUpdated={taxYear}
        />

        <CountrySelector
          selectedCountry={countryId}
          onCountryChange={handleCountryChange}
          selectedTaxYear={taxYear}
          onTaxYearChange={setTaxYear}
        />

        {isZeroTaxCountry && (
          <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-5 mb-8 flex items-start gap-3">
            <CheckCircle2 className="w-6 h-6 text-emerald-600 shrink-0 mt-0.5" />
            <div>
              <h4 className="font-bold text-emerald-900 text-base">
                0% Personal Income Tax in the United Arab Emirates
              </h4>
              <p className="text-sm text-emerald-800 mt-1">
                Under UAE Federal Tax Authority regulations, there is no personal income tax on salaries, bonuses, or employment earnings for individuals working in the UAE. Your gross salary equals your net salary before voluntary deductions.
              </p>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Inputs Section */}
          <div className="lg:col-span-6 bg-white border border-gray-200 rounded-3xl p-6 sm:p-8 shadow-xs">
            <div className="flex items-center justify-between pb-4 mb-6 border-b border-gray-100">
              <div className="flex items-center gap-2">
                <Scale className="w-5 h-5 text-emerald-600" />
                <h3 className="text-lg font-bold text-gray-900">Income & Tax Details</h3>
              </div>
              <button
                type="button"
                onClick={() => {
                  setIncomeAmount(DEFAULT_INCOMES[countryId] || 100000);
                  setOtherTaxableIncome(0);
                }}
                className="text-xs text-gray-700 hover:text-emerald-700 flex items-center gap-1 font-medium transition cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                Reset
              </button>
            </div>

            <div className="space-y-5">
              <div>
                <label className="block text-sm font-semibold text-gray-800 mb-1.5">
                  Calculation Frequency
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {(["annual", "monthly"] as const).map((f) => (
                    <button
                      key={f}
                      type="button"
                      onClick={() => setFrequency(f)}
                      className={`py-2.5 text-xs font-semibold rounded-xl capitalize transition border ${
                        frequency === f
                          ? "bg-emerald-600 text-white border-emerald-600 shadow-xs"
                          : "bg-gray-50 text-gray-700 border-gray-200 hover:bg-gray-100"
                      }`}
                    >
                      {f} Income
                    </button>
                  ))}
                </div>
              </div>

              <NumberInput
                label={`Gross ${frequency === "annual" ? "Annual" : "Monthly"} Income`}
                value={incomeAmount}
                onChange={setIncomeAmount}
                prefix={sym}
                hint={`Total salary earnings in ${profile.defaultCurrency}`}
              />

              <NumberInput
                label="Other Taxable Income"
                value={otherTaxableIncome}
                onChange={setOtherTaxableIncome}
                prefix={sym}
                hint="Consulting, rental, dividends, freelance"
              />

              {result.annualTaxFreeAllowance > 0 && (
                <div className="bg-emerald-50/60 border border-emerald-100 rounded-xl p-3.5 flex items-center justify-between text-xs text-emerald-900 font-medium">
                  <span>Standard Relief / Tax-Free Allowance:</span>
                  <strong className="text-emerald-800">{formatCurrency(result.annualTaxFreeAllowance, currency)}/yr</strong>
                </div>
              )}
            </div>
          </div>

          {/* Results Section */}
          <div className="lg:col-span-6 space-y-6">
            <ResultCard
              title="Estimated Income Tax"
              subtitle={`Total tax liability for ${result.taxYearLabel}`}
              primaryValue={formatCurrency(result.estimatedMonthlyTax, currency)}
              primaryLabel="Estimated Monthly Tax"
              badge={`${formatPercent(result.effectiveTaxRatePercent)} Effective Rate`}
              secondaryMetrics={[
                {
                  label: "Annual Tax",
                  value: formatCurrency(result.totalAnnualTax, currency),
                  highlight: result.totalAnnualTax > 0,
                },
                {
                  label: "Marginal Rate",
                  value: formatPercent(result.marginalTaxRatePercent),
                  subtext: "Top tax bracket",
                },
                {
                  label: "Net Annual Take-Home",
                  value: formatCurrency(result.netAnnualIncome, currency),
                  highlight: true,
                },
                {
                  label: "Net Monthly Take-Home",
                  value: formatCurrency(result.netMonthlyIncome, currency),
                },
              ]}
              footnote={`Official tax rates via ${profile.taxAuthorityName}. No registration required.`}
            />

            <VisualBar
              title="Annual Income vs Tax"
              totalAmount={result.grossAnnualIncome}
              segments={visualSegments}
            />

            <BreakdownTable
              title="Progressive Tax Bracket Breakdown"
              subtitle={`How your income is taxed across ${profile.name} brackets`}
              rows={summaryRows}
              exportFileName={`saviora-tax-breakdown-${countryId}.csv`}
            />
          </div>
        </div>

        <div className="mt-16 space-y-16">
          <CalculatorFAQ
            title={`Frequently Asked Questions: ${profile.name} Income Tax`}
            subtitle={`Key details on tax brackets, standard deductions, and filing rules in ${profile.name}.`}
            items={faqs}
          />

          <RelatedTools
            currentToolId="income-tax-calculator"
            countryId={countryId}
          />

          <ToolFinalCTA />
        </div>
      </div>
    </div>
  );
}
