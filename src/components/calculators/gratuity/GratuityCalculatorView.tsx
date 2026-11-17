"use client";

import React from "react";
import { calculateGratuity } from "@/lib/calculators/engines/gratuity";
import { formatCurrency } from "@/lib/calculators/formatters";
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
import { RotateCcw, Receipt, CheckCircle, XCircle } from "lucide-react";

const DEFAULT_SALARIES: Record<SupportedCountryId, number> = {
  "usa": 6000,
  "uk": 3500,
  "australia": 7000,
  "canada": 5500,
  "india": 50000,
  "sri-lanka": 100000,
  "singapore": 6000,
  "uae": 12000,
};

interface GratuityCalculatorViewProps {
  initialCountry?: SupportedCountryId;
}

export function GratuityCalculatorView({ initialCountry = "sri-lanka" }: GratuityCalculatorViewProps) {
  const [countryId, setCountryId] = React.useState<SupportedCountryId>(normalizeCountryId(initialCountry));
  const profile = getCountryProfile(countryId);

  const [lastDrawnSalary, setLastDrawnSalary] = React.useState<number>(DEFAULT_SALARIES[countryId] || 6000);
  const [completedYears, setCompletedYears] = React.useState<number>(5);
  const [completedMonths, setCompletedMonths] = React.useState<number>(0);

  const handleCountryChange = (newCountry: SupportedCountryId) => {
    setCountryId(newCountry);
    setLastDrawnSalary(DEFAULT_SALARIES[newCountry] || 6000);
  };

  const result = React.useMemo(() => {
    return calculateGratuity({
      country: countryId,
      lastDrawnMonthlySalary: lastDrawnSalary,
      employeeType: "monthly",
      calculationMethod: "manual_duration",
      completedYears,
      completedMonths,
      organizationHas15PlusEmployees: true,
    });
  }, [countryId, lastDrawnSalary, completedYears, completedMonths]);

  const currency = profile.defaultCurrency;
  const sym = profile.currencySymbol.trim();

  const rows: BreakdownRow[] = [
    { label: "Last Drawn Monthly Basic Salary", amount: formatCurrency(result.lastDrawnMonthlySalary, currency), percentage: "Salary Basis", type: "income" },
    { label: "Completed Service Duration", amount: `${result.completedYears} yrs, ${result.completedMonths} mos`, percentage: `${result.totalMonthsOfService} months`, type: "info" },
    { label: "Statutory Eligibility Status", amount: result.isEligibleStatutory ? "Eligible" : "Not Eligible", percentage: result.eligibilityReason, type: result.isEligibleStatutory ? "income" : "deduction" },
    { label: `Estimated ${result.schemeName || profile.severanceName}`, amount: formatCurrency(result.estimatedGratuityAmount, currency), percentage: result.formulaDescription, type: "highlight" },
  ];

  const faqs: FAQItem[] = [
    {
      question: `How is ${result.schemeName || "severance"} calculated in ${profile.name}?`,
      answer: result.formulaDescription || "Based on your completed service years multiplied by eligible daily or monthly wage rates.",
    },
    {
      question: "What is the tax treatment?",
      answer: result.taxNotes || "Statutory payments typically enjoy specified tax exemptions or relief caps under national tax laws.",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 via-white to-gray-50 text-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 sm:pt-36 lg:pt-40 pb-12 md:pb-16">
        <Breadcrumb
          items={[
            { label: "Free Tools", href: "/free-tools" },
            { label: `${profile.severanceName} Calculator` },
          ]}
        />

        <CalculatorHero
          title={`${result.schemeName || profile.severanceName} Calculator`}
          badge={
            <span className="inline-flex items-center gap-1.5">
              <CountryFlag code={profile.code} className="w-3.5 h-2.5 rounded-2xs shrink-0" />
              ${result.governingAct || profile.name}
            </span>
          }
          description={`Calculate your statutory end-of-service gratuity, redundancy pay, or severance based on service tenure and last drawn basic salary.`}
          authorityName={result.governingAct || profile.taxAuthorityName}
          lastUpdated="Statutory Formula"
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
                <Receipt className="w-5 h-5 text-emerald-600" />
                <h3 className="text-lg font-bold text-gray-900">Employment Service & Salary</h3>
              </div>
              <button
                type="button"
                onClick={() => {
                  setLastDrawnSalary(DEFAULT_SALARIES[countryId] || 6000);
                  setCompletedYears(5);
                  setCompletedMonths(0);
                }}
                className="text-xs text-gray-700 hover:text-emerald-700 flex items-center gap-1 font-medium transition cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                Reset
              </button>
            </div>

            <div className="space-y-5">
              <NumberInput
                label="Last Drawn Monthly Basic Salary"
                value={lastDrawnSalary}
                onChange={setLastDrawnSalary}
                prefix={sym}
                hint="Basic wage excluding non-fixed allowances"
              />

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <NumberInput
                  label="Completed Years of Service"
                  value={completedYears}
                  onChange={setCompletedYears}
                  prefix=""
                  suffix="yrs"
                  min={0}
                  max={50}
                  hint="Full completed years"
                />
                <NumberInput
                  label="Completed Months"
                  value={completedMonths}
                  onChange={setCompletedMonths}
                  prefix=""
                  suffix="mos"
                  min={0}
                  max={11}
                  hint="Additional months"
                />
              </div>

              <div className="p-4 rounded-2xl border text-xs leading-relaxed flex items-start gap-3 bg-gray-50 border-gray-200/80">
                {result.isEligibleStatutory ? (
                  <CheckCircle className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                ) : (
                  <XCircle className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
                )}
                <div>
                  <div className="font-bold text-gray-900 mb-0.5">
                    {result.isEligibleStatutory ? "Statutory Eligibility Confirmed" : "Eligibility Note"}
                  </div>
                  <div className="text-gray-700">{result.eligibilityReason}</div>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-6 space-y-6">
            <ResultCard
              title={`Estimated ${result.schemeName || profile.severanceName}`}
              subtitle={`Calculated based on ${result.totalMonthsOfService} months of service`}
              primaryValue={formatCurrency(result.estimatedGratuityAmount, currency)}
              primaryLabel="Estimated Payout"
              badge={result.isEligibleStatutory ? "Eligible" : "Tenure Ineligible"}
              secondaryMetrics={[
                {
                  label: "Service Tenure",
                  value: `${result.completedYears}y ${result.completedMonths}m`,
                },
                {
                  label: "Governing Statute",
                  value: result.governingAct || profile.name,
                },
              ]}
              footnote={result.taxNotes}
            />

            <BreakdownTable
              title="Calculation Breakdown"
              subtitle={`Summary in ${currency}`}
              rows={rows}
              exportFileName={`saviora-gratuity-${countryId}.csv`}
            />
          </div>
        </div>

        <div className="mt-16 space-y-16">
          <CalculatorFAQ
            title={`Frequently Asked Questions: ${profile.severanceName}`}
            subtitle="Details on statutory criteria, tax exemptions, and payout formulas."
            items={faqs}
          />

          <RelatedTools
            currentToolId="gratuity-calculator"
            countryId={countryId}
          />

          <ToolFinalCTA />
        </div>
      </div>
    </div>
  );
}
