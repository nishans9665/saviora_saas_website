"use client";

import { InvestmentCalculatorSEOContent } from "./shared/InvestmentCalculatorSEOContent";
import { INVESTMENT_SEO_CONTENT } from "@/lib/investment-calculators/seoContentData";
import { InvestmentContextualFeatures } from "./shared/InvestmentContextualFeatures";
import { trackCalculatorEvent } from "@/lib/investment-calculators/analytics";

import React, { useState, useMemo } from "react";
import { SupportedCurrency, formatInvestmentCurrency } from "@/lib/investment-calculators/currencies";
import { calculateInflation } from "@/lib/investment-calculators/engines/inflation";
import { InvestmentBreadcrumb } from "./shared/InvestmentBreadcrumb";
import { InvestmentCalculatorHero } from "./shared/InvestmentCalculatorHero";
import { InvestmentCurrencySelector } from "./shared/InvestmentCurrencySelector";
import { InvestmentVisualBreakdown } from "./shared/InvestmentVisualBreakdown";
import { InvestmentCalculatorFAQ, FAQItem } from "./shared/InvestmentCalculatorFAQ";
import { InvestmentRelatedTools, RelatedToolItem } from "./shared/InvestmentRelatedTools";
import { InvestmentProductCTA } from "./shared/InvestmentProductCTA";
import { InvestmentPrintReport, ReportInputParam, ReportScheduleRow } from "./shared/InvestmentPrintReport";
import { Copy, Check, RotateCcw, TrendingDown, DollarSign, Calendar, Clock, Printer } from "lucide-react";

const FAQS: FAQItem[] = [
  {
    question: "What is purchasing power risk?",
    answer: "Purchasing power risk is the risk that inflation will reduce the real goods and services a fixed quantity of money can buy over time. Cash sitting in zero-interest accounts is guaranteed to lose purchasing power year after year.",
  },
  {
    question: "What is the Rule of 72 in inflation?",
    answer: "The Rule of 72 is a quick mathematical shortcut to estimate how many years it will take for prices to double at a constant inflation rate: divide 72 by the annual inflation percentage. For instance, at 3% inflation, prices double every 24 years.",
  },
  {
    question: "How can investors protect their capital from inflation?",
    answer: "Historically, asset classes like broad equity index funds, dividend-growing stocks, inflation-protected bonds (TIPS), and real estate tend to outpace inflation over extended multi-decade horizons.",
  },
];

const RELATED_TOOLS: RelatedToolItem[] = [
  {
    name: "Retirement Calculator",
    href: "/free-tools/retirement-calculator",
    description: "Model how inflation impacts your living costs during multi-decade retirement.",
    tag: "Retirement",
  },
  {
    name: "Savings Goal Calculator",
    href: "/free-tools/savings-goal-calculator",
    description: "Calculate required savings to hit future goals before inflation erodes them.",
    tag: "Goals",
  },
  {
    name: "Investment Growth Calculator",
    href: "/free-tools/investment-growth-calculator",
    description: "Project real investment growth against annual inflation rates.",
    tag: "Growth",
  },
];

export function InflationCalculatorView() {
  const [currency, setCurrency] = useState<SupportedCurrency>("USD");
  const [currentAmount, setCurrentAmount] = useState<number>(100000);
  const [annualInflationRate, setAnnualInflationRate] = useState<number>(3);
  const [durationYears, setDurationYears] = useState<number>(10);
  const [copied, setCopied] = useState(false);

  const result = useMemo(() => {
    return calculateInflation({
      currentAmount,
      annualInflationRate,
      durationYears,
      currency,
    });
  }, [currentAmount, annualInflationRate, durationYears, currency]);

  const handleReset = () => {
    setCurrentAmount(100000);
    setAnnualInflationRate(3);
    setDurationYears(10);
  };

  const handleCopySummary = () => {
    trackCalculatorEvent("calculator_copy_summary", { tool: "inflation-calculator" });
    const summary = [
      "=== Saviora Inflation & Purchasing Power Summary ===",
      `Current Amount: ${formatInvestmentCurrency(result.originalAmount, currency)}`,
      `Annual Inflation Rate: ${annualInflationRate}% p.a.`,
      `Duration: ${durationYears} Years`,
      `Future Equivalent Cost to Buy Same Goods: ${formatInvestmentCurrency(result.estimatedFutureCost, currency)}`,
      `Purchasing Power of Today's Amount in ${durationYears} Years: ${formatInvestmentCurrency(result.futurePurchasingPower, currency)}`,
      `Purchasing Power Loss: ${result.purchasingPowerReductionPercent.toFixed(1)}%`,
      `Estimated Years for Prices to Double: ${result.yearsToDoublePrices} years`,
      "Generated at: https://saviora.app/free-tools/inflation-calculator",
    ].join("\n");

    navigator.clipboard.writeText(summary);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handlePrint = () => {
    trackCalculatorEvent("calculator_print_report", { tool: "inflation-calculator" });
    window.print();
  };

  const inputParams: ReportInputParam[] = [
    { label: "Today's Purchasing Amount", value: formatInvestmentCurrency(currentAmount, currency) },
    { label: "Annual Inflation Rate", value: `${annualInflationRate}% p.a.` },
    { label: "Evaluation Timeframe", value: `${durationYears} Years` },
    { label: "Reporting Currency", value: currency },
  ];

  const printableScheduleRows: ReportScheduleRow[] = result.yearlySchedule.map((y) => ({
    period: `Year ${y.year}`,
    startingBalance: formatInvestmentCurrency(y.futureCost, currency),
    endingBalance: formatInvestmentCurrency(y.purchasingPower, currency),
    growth: `-${y.purchasingPowerLossPercent.toFixed(1)}%`,
  }));

  return (
    <div className="pt-32 sm:pt-36 lg:pt-40 pb-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* On-screen Interactive UI */}
      <div className="print:hidden">
        <InvestmentBreadcrumb items={[{ label: "Inflation Calculator" }]} />

        <InvestmentCalculatorHero
          badge="Purchasing Power & Cost of Living Engine"
          title="Inflation Calculator – Future Value of Money"
          description="Understand how compound annual inflation erodes the purchasing power of your money and see how much goods will cost in the future."
        />

        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Form */}
          <div className="lg:col-span-7 bg-white rounded-2xl p-6 sm:p-7 border border-slate-200/80 shadow-xs">
            <div className="flex items-center justify-between pb-4 mb-6 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <TrendingDown className="w-5 h-5 text-emerald-600" />
                <h2 className="text-base font-bold text-slate-900">Inflation Parameters</h2>
              </div>
              <InvestmentCurrencySelector value={currency} onChange={setCurrency} />
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Current Amount / Cost Today ({currency})
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-2.5 text-xs font-bold text-slate-400">
                    <DollarSign className="w-4 h-4 text-slate-400" />
                  </span>
                  <input
                    type="number"
                    min="1"
                    step="1000"
                    value={currentAmount || ""}
                    onChange={(e) => setCurrentAmount(Math.max(0, parseFloat(e.target.value) || 0))}
                    className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm font-semibold text-slate-900 focus:bg-white focus:ring-2 focus:ring-emerald-500 transition"
                    placeholder="100000"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Annual Inflation Rate (%)
                  </label>
                  <input
                    type="number"
                    min="0"
                    max="50"
                    step="0.5"
                    value={annualInflationRate || ""}
                    onChange={(e) => setAnnualInflationRate(Math.max(0, parseFloat(e.target.value) || 0))}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm font-semibold text-slate-900 focus:bg-white focus:ring-2 focus:ring-emerald-500 transition"
                    placeholder="3"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Number of Years
                  </label>
                  <div className="relative">
                    <span className="absolute left-3 top-2.5 text-xs font-bold text-slate-400">
                      <Calendar className="w-4 h-4 text-slate-400" />
                    </span>
                    <input
                      type="number"
                      min="1"
                      max="100"
                      step="1"
                      value={durationYears || ""}
                      onChange={(e) => setDurationYears(Math.max(1, parseInt(e.target.value) || 1))}
                      className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm font-semibold text-slate-900 focus:bg-white focus:ring-2 focus:ring-emerald-500 transition"
                      placeholder="10"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-100 flex justify-end">
              <button
                type="button"
                onClick={handleReset}
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-slate-800 transition cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Reset to Defaults</span>
              </button>
            </div>
          </div>

          {/* Right Column: Key Results */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-gradient-to-br from-emerald-50 via-white to-teal-50 rounded-2xl p-6 sm:p-7 border border-emerald-200/80 shadow-xs">
              <div className="flex items-center justify-between pb-3 border-b border-emerald-100">
                <span className="text-xs font-bold uppercase tracking-wider text-emerald-800">
                  Future Equivalent Cost
                </span>
                <span className="text-xs font-semibold text-emerald-700 bg-emerald-100/70 px-2 py-0.5 rounded-full">
                  +{((result.estimatedFutureCost / (result.originalAmount || 1) - 1) * 100).toFixed(1)}%
                </span>
              </div>

              <div className="mt-4 text-center">
                <div className="text-3xl sm:text-4xl font-black text-slate-900 font-mono tracking-tight">
                  {formatInvestmentCurrency(result.estimatedFutureCost, currency)}
                </div>
                <p className="text-xs text-slate-600 mt-1 font-medium">
                  Needed in {durationYears} years to match what {formatInvestmentCurrency(currentAmount, currency)} buys today
                </p>
              </div>

              {/* Action Buttons */}
              <div className="mt-5 pt-4 border-t border-emerald-100 flex items-center justify-center gap-2">
                <button
                  type="button"
                  onClick={handlePrint}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold text-slate-700 bg-white hover:bg-slate-100 border border-slate-200 transition shadow-2xs cursor-pointer"
                  title="Print or Save as Official PDF Assessment Report"
                >
                  <Printer className="w-3.5 h-3.5 text-slate-600" />
                  <span>Print / PDF Report</span>
                </button>

                <button
                  type="button"
                  onClick={handleCopySummary}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold text-emerald-800 bg-emerald-100/80 hover:bg-emerald-200/80 border border-emerald-200 transition shadow-2xs cursor-pointer"
                >
                  {copied ? <Check className="w-3.5 h-3.5 text-emerald-700" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copied ? "Copied!" : "Copy Summary"}</span>
                </button>
              </div>

              {/* Metrics */}
              <div className="mt-5 grid grid-cols-2 gap-3 pt-4 border-t border-emerald-100 text-xs">
                <div className="p-3 bg-white/80 rounded-xl border border-emerald-100">
                  <p className="text-slate-500">Future Purchasing Power</p>
                  <p className="text-sm font-bold text-rose-600 font-mono mt-0.5">
                    {formatInvestmentCurrency(result.futurePurchasingPower, currency)}
                  </p>
                </div>
                <div className="p-3 bg-white/80 rounded-xl border border-emerald-100">
                  <p className="text-slate-500">Purchasing Power Loss</p>
                  <p className="text-sm font-bold text-slate-900 font-mono mt-0.5">
                    -{result.purchasingPowerReductionPercent.toFixed(1)}%
                  </p>
                </div>
              </div>
            </div>

            {/* Visual Breakdown */}
            <InvestmentVisualBreakdown
              title="Today's Value vs Future Cost Impact"
              currency={currency}
              segments={[
                { label: "Today's Cost", amount: result.originalAmount, color: "bg-slate-600" },
                { label: "Inflation Surcharge", amount: result.inflationImpact, color: "bg-rose-500" },
              ]}
            />
          </div>
        </div>

        {/* Year-by-year Inflation Schedule Table */}
        <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs overflow-hidden mt-8">
          <div className="p-4 sm:p-5 border-b border-slate-100 bg-slate-50/50">
            <h3 className="text-base font-bold text-slate-900">Year-by-Year Inflation &amp; Purchasing Power Erosion</h3>
            <p className="text-xs text-slate-500 mt-0.5">Estimated future cost to buy identical goods and the purchasing power of your current capital.</p>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead className="bg-slate-50 text-slate-700 font-semibold border-b border-slate-200">
                <tr>
                  <th className="py-2.5 px-4">Year</th>
                  <th className="py-2.5 px-4 text-right">Future Equivalent Cost</th>
                  <th className="py-2.5 px-4 text-right">Purchasing Power of Cash</th>
                  <th className="py-2.5 px-4 text-right text-rose-600">Purchasing Power Loss</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-600">
                {result.yearlySchedule.map((r) => (
                  <tr key={r.year} className="hover:bg-slate-50/80 transition">
                    <td className="py-2.5 px-4 font-semibold text-slate-900">Year {r.year}</td>
                    <td className="py-2.5 px-4 text-right font-mono font-bold text-slate-900">
                      {formatInvestmentCurrency(r.futureCost, currency)}
                    </td>
                    <td className="py-2.5 px-4 text-right font-mono text-slate-600">
                      {formatInvestmentCurrency(r.purchasingPower, currency)}
                    </td>
                    <td className="py-2.5 px-4 text-right font-mono font-medium text-rose-600">
                      -{r.purchasingPowerLossPercent.toFixed(1)}%
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Educational SEO Content & Methodology */}
        {INVESTMENT_SEO_CONTENT["inflation-calculator"] && (
          <InvestmentCalculatorSEOContent {...INVESTMENT_SEO_CONTENT["inflation-calculator"]} />
        )}

        {/* FAQs */}
        <InvestmentCalculatorFAQ faqs={FAQS} />

        {/* Related Tools */}
        <InvestmentRelatedTools tools={RELATED_TOOLS} />

        {/* Contextual Saviora Core Features */}
        <InvestmentContextualFeatures currentCategory="Inflation & Purchasing Power" />

        {/* Saviora Product CTA */}
        <InvestmentProductCTA />
      </div>

      {/* Official Printable Assessment Report */}
      <InvestmentPrintReport
        reportTitle="Inflation &amp; Purchasing Power Assessment Report"
        calculatorName="Inflation Calculator"
        currency={currency}
        inputParams={inputParams}
        primaryMetric={{
          label: "Future Equivalent Cost",
          value: formatInvestmentCurrency(result.estimatedFutureCost, currency),
          subtext: `Inflation Impact: +${formatInvestmentCurrency(result.inflationImpact, currency)} over ${durationYears} Years`,
        }}
        keyMetrics={[
          { label: "Original Capital", value: formatInvestmentCurrency(result.originalAmount, currency) },
          { label: "Future Purchasing Power", value: formatInvestmentCurrency(result.futurePurchasingPower, currency) },
          { label: "Purchasing Power Loss", value: `-${result.purchasingPowerReductionPercent.toFixed(1)}%` },
          { label: "Price Doubling Time", value: `${result.yearsToDoublePrices} years` },
          { label: "Annual Rate Assumed", value: `${annualInflationRate}% p.a.` },
        ]}
        breakdownSummary={{
          investedAmount: formatInvestmentCurrency(result.originalAmount, currency),
          investedPercent: `${result.estimatedFutureCost > 0 ? ((result.originalAmount / result.estimatedFutureCost) * 100).toFixed(1) : 0}%`,
          growthAmount: formatInvestmentCurrency(result.inflationImpact, currency),
          growthPercent: `${result.estimatedFutureCost > 0 ? ((result.inflationImpact / result.estimatedFutureCost) * 100).toFixed(1) : 0}%`,
          totalAmount: formatInvestmentCurrency(result.estimatedFutureCost, currency),
        }}
        scheduleRows={printableScheduleRows}
        scheduleTitle="Annual Inflation Erosion Schedule"
      />
    </div>
  );
}
