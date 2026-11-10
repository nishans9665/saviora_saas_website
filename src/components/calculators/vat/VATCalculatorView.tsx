"use client";

import React from "react";
import { calculateVAT } from "@/lib/calculators/engines/vat";
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
import { SupportedCountryId, VATMode } from "@/lib/calculators/types";
import { getCountryProfile, normalizeCountryId } from "@/lib/calculators/rules/countryRegistry";
import { RotateCcw, Percent, PlusCircle, MinusCircle } from "lucide-react";

const DEFAULT_RATES: Record<SupportedCountryId, number> = {
  "usa": 7.5,
  "uk": 20,
  "australia": 10,
  "canada": 13,
  "india": 18,
  "sri-lanka": 18,
  "singapore": 9,
  "uae": 5,
};

const COMMON_PRESETS = [5, 7.5, 9, 10, 12, 13, 15, 18, 20];

interface VATCalculatorViewProps {
  initialCountry?: SupportedCountryId;
}

export function VATCalculatorView({ initialCountry = "usa" }: VATCalculatorViewProps) {
  const [countryId, setCountryId] = React.useState<SupportedCountryId>(normalizeCountryId(initialCountry));
  const profile = getCountryProfile(countryId);

  const [mode, setMode] = React.useState<VATMode>("add");
  const [amount, setAmount] = React.useState<number>(1000);
  const [rate, setRate] = React.useState<number>(DEFAULT_RATES[countryId] || 10);

  const handleCountryChange = (newCountry: SupportedCountryId) => {
    setCountryId(newCountry);
    setRate(DEFAULT_RATES[newCountry] || 10);
  };

  const result = React.useMemo(() => {
    return calculateVAT({
      country: countryId,
      mode,
      amount,
      vatRatePercent: rate,
    });
  }, [countryId, mode, amount, rate]);

  const currency = profile.defaultCurrency;
  const sym = profile.currencySymbol.trim();

  const rows: BreakdownRow[] = [
    {
      label: `Net Amount (${profile.consumptionTaxName} Exclusive)`,
      amount: formatCurrency(result.netAmountExclusive, currency),
      percentage: formatPercent((result.netAmountExclusive / result.grossAmountInclusive) * 100),
      type: "income",
    },
    {
      label: `${result.taxName} Amount (${result.vatRatePercent}%)`,
      amount: formatCurrency(result.vatAmount, currency),
      percentage: formatPercent((result.vatAmount / result.grossAmountInclusive) * 100),
      type: "deduction",
    },
    {
      label: `Gross Total (${profile.consumptionTaxName} Inclusive)`,
      amount: formatCurrency(result.grossAmountInclusive, currency),
      percentage: "100.00%",
      type: "highlight",
    },
  ];

  const faqs: FAQItem[] = [
    {
      question: "How do I add tax to a net price?",
      answer: "To add consumption tax to a net price, multiply the net price by (Tax Rate / 100) to find the tax amount, then add it to the net price: Gross = Net × (1 + Rate / 100).",
    },
    {
      question: "How do I extract tax from a gross (inclusive) total?",
      answer: "To remove tax from an inclusive price, do NOT simply subtract the percentage. Instead, divide the gross amount by (1 + Rate / 100) to find the net price, then subtract the net price from the gross price: Tax = Gross - (Gross / (1 + Rate / 100)).",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 via-white to-gray-50 text-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 sm:pt-36 lg:pt-40 pb-12 md:pb-16">
        <Breadcrumb
          items={[
            { label: "Free Tools", href: "/free-tools" },
            { label: `${profile.consumptionTaxName} Calculator` },
          ]}
        />

        <CalculatorHero
          title={`${result.taxName || profile.consumptionTaxName} Calculator`}
          badge={
            <span className="inline-flex items-center gap-1.5">
              <CountryFlag code={profile.code} className="w-3.5 h-2.5 rounded-2xs shrink-0" />
              ${profile.name} Tax Standards
            </span>
          }
          description={`Add or remove ${profile.consumptionTaxName} (Sales Tax, VAT, GST) with 100% mathematical precision and instant price breakdown.`}
          authorityName={profile.taxAuthorityName}
          lastUpdated="Statutory Rate"
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
                <Percent className="w-5 h-5 text-emerald-600" />
                <h3 className="text-lg font-bold text-gray-900">Tax Mode & Calculation</h3>
              </div>
              <button
                type="button"
                onClick={() => {
                  setAmount(1000);
                  setRate(DEFAULT_RATES[countryId] || 10);
                  setMode("add");
                }}
                className="text-xs text-gray-700 hover:text-emerald-700 flex items-center gap-1 font-medium transition cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                Reset
              </button>
            </div>

            <div className="space-y-5">
              <div>
                <label className="block text-sm font-semibold text-gray-800 mb-2">
                  Calculation Mode
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setMode("add")}
                    className={`p-3.5 rounded-2xl border text-left transition flex items-start gap-3 ${
                      mode === "add"
                        ? "bg-emerald-50 border-emerald-500 ring-2 ring-emerald-200"
                        : "bg-gray-50 border-gray-200 hover:bg-gray-100"
                    }`}
                  >
                    <PlusCircle className={`w-5 h-5 mt-0.5 ${mode === "add" ? "text-emerald-600" : "text-gray-700"}`} />
                    <div>
                      <div className="text-sm font-bold text-gray-900">Add Tax</div>
                      <div className="text-xs text-gray-700">Exclusive → Inclusive</div>
                    </div>
                  </button>

                  <button
                    type="button"
                    onClick={() => setMode("remove")}
                    className={`p-3.5 rounded-2xl border text-left transition flex items-start gap-3 ${
                      mode === "remove"
                        ? "bg-emerald-50 border-emerald-500 ring-2 ring-emerald-200"
                        : "bg-gray-50 border-gray-200 hover:bg-gray-100"
                    }`}
                  >
                    <MinusCircle className={`w-5 h-5 mt-0.5 ${mode === "remove" ? "text-emerald-600" : "text-gray-700"}`} />
                    <div>
                      <div className="text-sm font-bold text-gray-900">Remove Tax</div>
                      <div className="text-xs text-gray-700">Inclusive → Exclusive</div>
                    </div>
                  </button>
                </div>
              </div>

              <NumberInput
                label={mode === "add" ? "Net Amount (Exclusive of Tax)" : "Gross Total (Inclusive of Tax)"}
                value={amount}
                onChange={setAmount}
                prefix={sym}
                hint="Enter the monetary price"
              />

              <div>
                <NumberInput
                  label={`${result.taxName || profile.consumptionTaxName} Rate (%)`}
                  value={rate}
                  onChange={setRate}
                  prefix=""
                  suffix="%"
                  min={0}
                  max={100}
                  step={0.5}
                />

                <div className="flex flex-wrap items-center gap-1.5 mt-2.5">
                  <span className="text-xs text-gray-700 mr-1 font-medium">Common Rates:</span>
                  {COMMON_PRESETS.map((p) => (
                    <button
                      key={p}
                      type="button"
                      onClick={() => setRate(p)}
                      className={`text-xs px-2.5 py-1 rounded-lg font-semibold transition ${
                        rate === p
                          ? "bg-emerald-600 text-white"
                          : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                      }`}
                    >
                      {p}%
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-6 space-y-6">
            <ResultCard
              title={mode === "add" ? "Total Gross (Inclusive)" : "Net Amount (Exclusive)"}
              subtitle={`Calculation result in ${currency}`}
              primaryValue={formatCurrency(
                mode === "add" ? result.grossAmountInclusive : result.netAmountExclusive,
                currency
              )}
              primaryLabel={mode === "add" ? "Gross Amount (Tax Included)" : "Net Price (Pre-Tax)"}
              badge={`${result.vatRatePercent}% ${profile.consumptionTaxName}`}
              secondaryMetrics={[
                {
                  label: "Tax Amount",
                  value: formatCurrency(result.vatAmount, currency),
                  highlight: true,
                },
                {
                  label: "Pre-Tax (Net)",
                  value: formatCurrency(result.netAmountExclusive, currency),
                },
                {
                  label: "Gross (Total)",
                  value: formatCurrency(result.grossAmountInclusive, currency),
                },
              ]}
              footnote={result.calculationFormula}
            />

            <BreakdownTable
              title="Price Breakdown Summary"
              subtitle={`Detailed breakdown in ${currency}`}
              rows={rows}
              exportFileName={`saviora-tax-calc-${countryId}.csv`}
            />
          </div>
        </div>

        <div className="mt-16 space-y-16">
          <CalculatorFAQ
            title={`Frequently Asked Questions: ${profile.consumptionTaxName}`}
            subtitle="Details on statutory rates, addition, and reverse deduction."
            items={faqs}
          />

          <RelatedTools
            currentToolId="vat-calculator"
            countryId={countryId}
          />

          <ToolFinalCTA />
        </div>
      </div>
    </div>
  );
}
