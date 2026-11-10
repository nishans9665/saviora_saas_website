"use client";

import React from "react";
import { calculateTakeHome } from "@/lib/calculators/engines/takeHome";
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
import { RotateCcw, Coins } from "lucide-react";

const DEFAULT_SALARIES: Record<SupportedCountryId, number> = {
  "usa": 6500,
  "uk": 3500,
  "australia": 7000,
  "canada": 5500,
  "india": 80000,
  "sri-lanka": 180000,
  "singapore": 5500,
  "uae": 16000,
};

interface TakeHomeCalculatorViewProps {
  initialCountry?: SupportedCountryId;
}

export function TakeHomeCalculatorView({ initialCountry = "usa" }: TakeHomeCalculatorViewProps) {
  const [countryId, setCountryId] = React.useState<SupportedCountryId>(normalizeCountryId(initialCountry));
  const profile = getCountryProfile(countryId);

  const [grossSalary, setGrossSalary] = React.useState<number>(DEFAULT_SALARIES[countryId] || 6500);
  const [allowancesIncluded, setAllowancesIncluded] = React.useState<number>(0);
  const [autoTax, setAutoTax] = React.useState<"auto" | "manual">("auto");
  const [manualTax, setManualTax] = React.useState<number>(0);
  const [otherDeductions, setOtherDeductions] = React.useState<number>(0);
  const [taxYear, setTaxYear] = React.useState<TaxYear>(profile.defaultTaxYear);

  const handleCountryChange = (newCountry: SupportedCountryId) => {
    setCountryId(newCountry);
    const newProfile = getCountryProfile(newCountry);
    setTaxYear(newProfile.defaultTaxYear);
    setGrossSalary(DEFAULT_SALARIES[newCountry] || 6500);
    setAllowancesIncluded(0);
    setOtherDeductions(0);
  };

  const result = React.useMemo(() => {
    return calculateTakeHome({
      country: countryId,
      grossMonthlySalary: grossSalary,
      fixedAllowancesIncludedInGross: allowancesIncluded,
      autoCalculateTax: autoTax === "auto",
      manualTaxAmount: autoTax === "manual" ? manualTax : undefined,
      taxYear,
      otherDeductions,
    });
  }, [countryId, grossSalary, allowancesIncluded, autoTax, manualTax, taxYear, otherDeductions]);

  const currency = profile.defaultCurrency;
  const sym = profile.currencySymbol.trim();

  const visualSegments: Segment[] = [
    {
      label: "Net Take-Home Pay",
      value: result.netTakeHomeMonthly,
      color: "bg-emerald-500",
      textColor: "text-emerald-700",
      description: formatPercent(result.takeHomePercentage) + " in-hand",
    },
    ...(result.pensionDeduction && result.pensionDeduction > 0
      ? [
          {
            label: profile.pensionName,
            value: result.pensionDeduction,
            color: "bg-blue-500",
            textColor: "text-blue-700",
            description: formatCurrency(result.pensionDeduction, currency) + "/mo",
          },
        ]
      : []),
    ...(result.socialSecurityDeduction && result.socialSecurityDeduction > 0
      ? [
          {
            label: "Social Security / FICA / NI",
            value: result.socialSecurityDeduction,
            color: "bg-indigo-500",
            textColor: "text-indigo-700",
            description: formatCurrency(result.socialSecurityDeduction, currency) + "/mo",
          },
        ]
      : []),
    ...(result.incomeTaxDeduction > 0
      ? [
          {
            label: "Income Tax",
            value: result.incomeTaxDeduction,
            color: "bg-amber-500",
            textColor: "text-amber-700",
            description: formatCurrency(result.incomeTaxDeduction, currency) + "/mo",
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

  const rows: BreakdownRow[] = [
    { label: "Gross Monthly Salary", amount: formatCurrency(result.grossMonthlySalary, currency), percentage: "100.00%", type: "income" },
    ...(result.pensionDeduction && result.pensionDeduction > 0
      ? [{ label: "Retirement Deduction (" + profile.pensionName + ")", amount: formatCurrency(result.pensionDeduction, currency), percentage: formatPercent(result.grossMonthlySalary > 0 ? (result.pensionDeduction / result.grossMonthlySalary) * 100 : 0), type: "deduction" as const }]
      : []),
    ...(result.socialSecurityDeduction && result.socialSecurityDeduction > 0
      ? [{ label: "Social Security / NI / FICA Deduction", amount: formatCurrency(result.socialSecurityDeduction, currency), percentage: formatPercent(result.grossMonthlySalary > 0 ? (result.socialSecurityDeduction / result.grossMonthlySalary) * 100 : 0), type: "deduction" as const }]
      : []),
    { label: "Personal Income Tax (" + profile.taxAuthorityName + ")", amount: formatCurrency(result.incomeTaxDeduction, currency), percentage: formatPercent(result.grossMonthlySalary > 0 ? (result.incomeTaxDeduction / result.grossMonthlySalary) * 100 : 0), type: "deduction" },
    ...(otherDeductions > 0 ? [{ label: "Other Salary Deductions", amount: formatCurrency(otherDeductions, currency), percentage: formatPercent(result.grossMonthlySalary > 0 ? (otherDeductions / result.grossMonthlySalary) * 100 : 0), type: "deduction" as const }] : []),
    { label: "Total Deductions", amount: formatCurrency(result.totalDeductions, currency), percentage: formatPercent(result.deductionsPercentage), type: "subtotal" },
    { label: "Net Take-Home Monthly Salary", amount: formatCurrency(result.netTakeHomeMonthly, currency), percentage: formatPercent(result.takeHomePercentage), type: "net" },
    { label: "Annual Take-Home Pay (In-Hand)", amount: formatCurrency(result.netTakeHomeAnnual, currency), percentage: "12 months net", type: "highlight" },
  ];

  const faqs: FAQItem[] = [
    {
      question: "What is the difference between Gross Salary and Take-Home Pay?",
      answer: "Gross salary is your total earned pay before any deductions. Take-home pay (or net pay) is the cash amount transferred directly to your bank account after income tax, retirement savings, and other company deductions.",
    },
    {
      question: `How can I increase my take-home pay in ${profile.name}?`,
      answer: `Check if you qualify for allowable statutory tax reliefs, optimize voluntary contributions, or ensure tax allowances and deductions under ${profile.taxAuthorityName} are properly claimed.`,
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 via-white to-gray-50 text-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 sm:pt-36 lg:pt-40 pb-12 md:pb-16">
        <Breadcrumb
          items={[
            { label: "Free Tools", href: "/free-tools" },
            { label: `${profile.name} Take-Home Salary Calculator` },
          ]}
        />

        <CalculatorHero
          title={`${profile.name} Take-Home Salary Calculator`}
          badge={
            <span className="inline-flex items-center gap-1.5">
              <CountryFlag code={profile.code} className="w-3.5 h-2.5 rounded-2xs shrink-0" />
              In-Hand Salary Estimator
            </span>
          }
          description={`Calculate how much cash you actually receive each month after ${profile.pensionName}, income tax, and company deductions.`}
          authorityName={profile.taxAuthorityName}
          lastUpdated={taxYear}
        />

        <CountrySelector
          selectedCountry={countryId}
          onCountryChange={handleCountryChange}
          selectedTaxYear={taxYear}
          onTaxYearChange={setTaxYear}
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-6 bg-white border border-gray-200 rounded-3xl p-6 sm:p-8 shadow-xs">
            <div className="flex items-center justify-between pb-4 mb-6 border-b border-gray-100">
              <div className="flex items-center gap-2">
                <Coins className="w-5 h-5 text-emerald-600" />
                <h3 className="text-lg font-bold text-gray-900">Salary & Deductions</h3>
              </div>
              <button
                type="button"
                onClick={() => {
                  setGrossSalary(DEFAULT_SALARIES[countryId] || 6500);
                  setAllowancesIncluded(0);
                  setOtherDeductions(0);
                }}
                className="text-xs text-gray-700 hover:text-emerald-700 flex items-center gap-1 font-medium transition cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                Reset
              </button>
            </div>

            <div className="space-y-5">
              <NumberInput
                label="Gross Monthly Salary"
                value={grossSalary}
                onChange={setGrossSalary}
                prefix={sym}
                hint={`Total monthly income in ${currency}`}
              />

              <div className="pt-2 border-t border-gray-100">
                <label className="block text-sm font-semibold text-gray-800 mb-2">
                  Income Tax Calculation Mode
                </label>
                <div className="grid grid-cols-2 gap-2 mb-3">
                  <button
                    type="button"
                    onClick={() => setAutoTax("auto")}
                    className={`py-2.5 text-xs font-semibold rounded-xl transition border ${
                      autoTax === "auto"
                        ? "bg-emerald-600 text-white border-emerald-600 shadow-xs"
                        : "bg-gray-50 text-gray-700 border-gray-200 hover:bg-gray-100"
                    }`}
                  >
                    Official Slabs (Auto)
                  </button>
                  <button
                    type="button"
                    onClick={() => setAutoTax("manual")}
                    className={`py-2.5 text-xs font-semibold rounded-xl transition border ${
                      autoTax === "manual"
                        ? "bg-emerald-600 text-white border-emerald-600 shadow-xs"
                        : "bg-gray-50 text-gray-700 border-gray-200 hover:bg-gray-100"
                    }`}
                  >
                    Manual Override
                  </button>
                </div>

                {autoTax === "manual" ? (
                  <NumberInput
                    label="Manual Income Tax Deduction"
                    value={manualTax}
                    onChange={setManualTax}
                    prefix={sym}
                    hint="Your monthly tax deduction from payslip"
                  />
                ) : (
                  <p className="text-xs text-gray-700 bg-gray-50 p-2.5 rounded-xl border border-gray-200/60">
                    Income tax is automatically calculated using official progressive tax slabs for <strong>{profile.name}</strong> ({taxYear}).
                  </p>
                )}
              </div>

              <div className="pt-2 border-t border-gray-100">
                <NumberInput
                  label="Other Voluntary Deductions"
                  value={otherDeductions}
                  onChange={setOtherDeductions}
                  prefix={sym}
                  hint="Loan repayments, company insurance, advances"
                />
              </div>
            </div>
          </div>

          <div className="lg:col-span-6 space-y-6">
            <ResultCard
              title="Net In-Hand Pay"
              subtitle={`Estimated monthly take-home salary in ${currency}`}
              primaryValue={formatCurrency(result.netTakeHomeMonthly, currency)}
              primaryLabel="Net Monthly Take-Home"
              badge={`${formatPercent(result.takeHomePercentage)} of Gross`}
              secondaryMetrics={[
                {
                  label: "Gross Salary",
                  value: formatCurrency(result.grossMonthlySalary, currency),
                },
                {
                  label: "Total Deductions",
                  value: formatCurrency(result.totalDeductions, currency),
                  highlight: result.totalDeductions > 0,
                  subtext: formatPercent(result.deductionsPercentage) + " deducted",
                },
                {
                  label: "Annual In-Hand",
                  value: formatCurrency(result.netTakeHomeAnnual, currency),
                  highlight: true,
                  subtext: "12 months net",
                },
              ]}
              footnote={`Calculated based on ${profile.name} employment standards. 100% private in browser.`}
            />

            <VisualBar
              title="Take-Home Pay vs Deductions"
              totalAmount={result.grossMonthlySalary}
              segments={visualSegments}
            />

            <BreakdownTable
              title="Take-Home Pay Itemized Breakdown"
              subtitle={`Complete deduction breakdown in ${currency}`}
              rows={rows}
              exportFileName={`saviora-take-home-${countryId}.csv`}
            />
          </div>
        </div>

        <div className="mt-16 space-y-16">
          <CalculatorFAQ
            title={`Frequently Asked Questions: ${profile.name} Take-Home Pay`}
            subtitle="Common questions about in-hand pay and net deductions."
            items={faqs}
          />

          <RelatedTools
            currentToolId="take-home-salary-calculator"
            countryId={countryId}
          />

          <ToolFinalCTA />
        </div>
      </div>
    </div>
  );
}
