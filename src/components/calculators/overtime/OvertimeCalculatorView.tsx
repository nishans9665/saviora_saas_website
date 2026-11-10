"use client";

import React from "react";
import { calculateOvertime } from "@/lib/calculators/engines/overtime";
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
import { RotateCcw, Clock } from "lucide-react";

const DEFAULT_SALARIES: Record<SupportedCountryId, number> = {
  "usa": 5000,
  "uk": 3000,
  "australia": 6000,
  "canada": 4500,
  "india": 40000,
  "sri-lanka": 100000,
  "singapore": 4500,
  "uae": 10000,
};

interface OvertimeCalculatorViewProps {
  initialCountry?: SupportedCountryId;
}

export function OvertimeCalculatorView({ initialCountry = "usa" }: OvertimeCalculatorViewProps) {
  const [countryId, setCountryId] = React.useState<SupportedCountryId>(normalizeCountryId(initialCountry));
  const profile = getCountryProfile(countryId);

  const [monthlySalary, setMonthlySalary] = React.useState<number>(DEFAULT_SALARIES[countryId] || 5000);
  const [normalOtHours, setNormalOtHours] = React.useState<number>(10);
  const [holidayOtHours, setHolidayOtHours] = React.useState<number>(4);

  const handleCountryChange = (newCountry: SupportedCountryId) => {
    setCountryId(newCountry);
    setMonthlySalary(DEFAULT_SALARIES[newCountry] || 5000);
  };

  const result = React.useMemo(() => {
    return calculateOvertime({
      country: countryId,
      monthlyBasicSalary: monthlySalary,
      normalOtHours,
      holidayOtHours,
    });
  }, [countryId, monthlySalary, normalOtHours, holidayOtHours]);

  const currency = profile.defaultCurrency;
  const sym = profile.currencySymbol.trim();

  const rows: BreakdownRow[] = [
    { label: "Basic Monthly Salary", amount: formatCurrency(result.monthlyBasicSalary, currency), percentage: "Base Wage", type: "income" },
    { label: "Standard Monthly Hours Basis", amount: `${result.standardMonthlyHours} hrs`, percentage: "Standard Basis", type: "info" },
    { label: "Normal Hourly Rate", amount: formatCurrency(result.normalHourlyRate, currency) + "/hr", percentage: "1.0x Rate", type: "income" },
    { label: `Normal Overtime (${result.normalOtHours} hrs @ ${result.normalOtMultiplier}x)`, amount: formatCurrency(result.normalOtEarnings, currency), percentage: formatCurrency(result.normalOtHourlyRate, currency) + "/hr", type: "income" },
    ...(result.holidayOtHours > 0
      ? [{ label: `Holiday / Rest Day Overtime (${result.holidayOtHours} hrs @ ${result.holidayOtMultiplier}x)`, amount: formatCurrency(result.holidayOtEarnings, currency), percentage: formatCurrency(result.holidayOtHourlyRate, currency) + "/hr", type: "income" as const }]
      : []),
    { label: "Total Overtime Pay", amount: formatCurrency(result.totalOtEarnings, currency), percentage: `${result.totalOtHours} hrs total`, type: "subtotal" },
    { label: "Estimated Total Monthly Salary with OT", amount: formatCurrency(result.estimatedMonthlySalaryWithOt, currency), percentage: "Basic + Overtime", type: "highlight" },
  ];

  const faqs: FAQItem[] = [
    {
      question: "How is hourly rate calculated from monthly salary?",
      answer: `Under ${result.governingAct || profile.name + " labour standards"}, hourly rate is calculated by dividing monthly basic salary by statutory standard monthly hours (typically 160-200 hours depending on standard weekly work hours).`,
    },
    {
      question: "What multiplier applies to holiday and rest day overtime?",
      answer: "Normal overtime is usually paid at 1.5x regular pay. Overtime worked on statutory public holidays or weekly rest days is typically paid at 2.0x (double time) or 1.5x under governing labour law.",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 via-white to-gray-50 text-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 sm:pt-36 lg:pt-40 pb-12 md:pb-16">
        <Breadcrumb items={[{ label: "Overtime Calculator"  }]}
        />

        <CalculatorHero
          title="Overtime Pay Calculator"
          badge={
            <span className="inline-flex items-center gap-1.5">
              <CountryFlag code={profile.code} className="w-3.5 h-2.5 rounded-2xs shrink-0" />
              ${result.governingAct || profile.name}
            </span>
          }
          description={`Calculate standard hourly rates, 1.5x normal overtime, and double-time holiday pay under ${profile.name} labour regulations.`}
          authorityName={result.governingAct || "Governing Labour Standards"}
          lastUpdated="Statutory Work Hours"
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
                <Clock className="w-5 h-5 text-emerald-600" />
                <h3 className="text-lg font-bold text-gray-900">Salary & Overtime Hours</h3>
              </div>
              <button
                type="button"
                onClick={() => {
                  setMonthlySalary(DEFAULT_SALARIES[countryId] || 5000);
                  setNormalOtHours(10);
                  setHolidayOtHours(4);
                }}
                className="text-xs text-gray-700 hover:text-emerald-700 flex items-center gap-1 font-medium transition cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                Reset
              </button>
            </div>

            <div className="space-y-5">
              <NumberInput
                label="Monthly Basic Salary"
                value={monthlySalary}
                onChange={setMonthlySalary}
                prefix={sym}
                hint="Base contracted salary"
              />

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <NumberInput
                  label="Normal Overtime Hours"
                  value={normalOtHours}
                  onChange={setNormalOtHours}
                  prefix=""
                  suffix="hrs"
                  min={0}
                  hint={`Paid at ${result.normalOtMultiplier}x rate`}
                />
                <NumberInput
                  label="Holiday / Rest Day Hours"
                  value={holidayOtHours}
                  onChange={setHolidayOtHours}
                  prefix=""
                  suffix="hrs"
                  min={0}
                  hint={`Paid at ${result.holidayOtMultiplier}x rate`}
                />
              </div>
            </div>
          </div>

          <div className="lg:col-span-6 space-y-6">
            <ResultCard
              title="Total Overtime Pay"
              subtitle={`Additional earnings for ${result.totalOtHours} overtime hours`}
              primaryValue={formatCurrency(result.totalOtEarnings, currency)}
              primaryLabel="Total Overtime Earnings"
              badge={`${result.totalOtHours} Total OT Hours`}
              secondaryMetrics={[
                {
                  label: "Normal Hourly Wage",
                  value: formatCurrency(result.normalHourlyRate, currency) + "/hr",
                },
                {
                  label: "Normal OT Rate (1.5x)",
                  value: formatCurrency(result.normalOtHourlyRate, currency) + "/hr",
                },
                {
                  label: "Total Salary with OT",
                  value: formatCurrency(result.estimatedMonthlySalaryWithOt, currency),
                  highlight: true,
                },
              ]}
              footnote={`Calculated based on ${result.standardMonthlyHours} standard monthly hours under ${result.governingAct || profile.name}.`}
            />

            <BreakdownTable
              title="Overtime Calculation Breakdown"
              subtitle={`Summary in ${currency}`}
              rows={rows}
              exportFileName={`saviora-overtime-${countryId}.csv`}
            />
          </div>
        </div>

        <div className="mt-16 space-y-16">
          <CalculatorFAQ
            title="Frequently Asked Questions: Overtime Pay"
            subtitle="Details on standard hourly wages, multipliers, and holiday rest day rates."
            items={faqs}
          />

          <RelatedTools
            currentToolId="overtime-calculator"
            countryId={countryId}
          />

          <ToolFinalCTA />
        </div>
      </div>
    </div>
  );
}
