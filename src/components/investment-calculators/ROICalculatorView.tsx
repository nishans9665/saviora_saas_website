"use client";

import { InvestmentCalculatorSEOContent } from "./shared/InvestmentCalculatorSEOContent";
import { INVESTMENT_SEO_CONTENT } from "@/lib/investment-calculators/seoContentData";
import { InvestmentContextualFeatures } from "./shared/InvestmentContextualFeatures";
import { trackCalculatorEvent } from "@/lib/investment-calculators/analytics";

import React, { useState, useMemo } from "react";
import { SupportedCurrency, formatInvestmentCurrency } from "@/lib/investment-calculators/currencies";
import { calculateROI } from "@/lib/investment-calculators/engines/roi";
import { InvestmentBreadcrumb } from "./shared/InvestmentBreadcrumb";
import { InvestmentCalculatorHero } from "./shared/InvestmentCalculatorHero";
import { InvestmentCurrencySelector } from "./shared/InvestmentCurrencySelector";
import { InvestmentVisualBreakdown } from "./shared/InvestmentVisualBreakdown";
import { InvestmentCalculatorFAQ, FAQItem } from "./shared/InvestmentCalculatorFAQ";
import { InvestmentRelatedTools, RelatedToolItem } from "./shared/InvestmentRelatedTools";
import { InvestmentProductCTA } from "./shared/InvestmentProductCTA";
import { InvestmentPrintReport, ReportInputParam } from "./shared/InvestmentPrintReport";
import { Copy, Check, RotateCcw, BarChart3, DollarSign, Calendar, Printer } from "lucide-react";

const FAQS: FAQItem[] = [
  {
    question: "What is Return on Investment (ROI)?",
    answer: "ROI is a fundamental profitability metric used to evaluate the efficiency or profitability of an investment. It measures the net return generated relative to the initial cost of investment, expressed as a percentage.",
  },
  {
    question: "Why does simple ROI differ from Annualized ROI?",
    answer: "Simple ROI does not take holding time into consideration—a 50% ROI over 1 year is exceptional, while a 50% ROI over 15 years represents modest annual growth. Annualized ROI standardizes the return into a compound yearly percentage to allow apples-to-apples comparisons.",
  },
  {
    question: "How do ongoing expenses and rental/dividend income affect ROI?",
    answer: "True ROI must include all cash inflows (such as dividends, lease payments, and royalties) and subtract all cash outflows (such as repairs, management fees, and transaction charges) from the capital gain.",
  },
];

const RELATED_TOOLS: RelatedToolItem[] = [
  {
    name: "Investment Return Calculator",
    href: "/free-tools/investment-return-calculator",
    description: "Calculate multi-year annualized CAGR returns across portfolios.",
    tag: "CAGR",
  },
  {
    name: "Investment Profit & Loss Calculator",
    href: "/free-tools/investment-profit-loss-calculator",
    description: "Calculate realized trading gains and break-even stock prices.",
    tag: "Trading",
  },
  {
    name: "Investment Growth Calculator",
    href: "/free-tools/investment-growth-calculator",
    description: "Project long-term compound portfolio accumulation.",
    tag: "Growth",
  },
];

export function ROICalculatorView() {
  const [currency, setCurrency] = useState<SupportedCurrency>("USD");
  const [initialCost, setInitialCost] = useState<number>(50000);
  const [finalValue, setFinalValue] = useState<number>(75000);
  const [additionalIncome, setAdditionalIncome] = useState<number>(5000);
  const [expenses, setExpenses] = useState<number>(2000);
  const [durationYears, setDurationYears] = useState<number>(3);
  const [copied, setCopied] = useState(false);

  const result = useMemo(() => {
    return calculateROI({
      initialCost,
      finalValue,
      additionalIncome,
      expenses,
      durationYears,
      currency,
    });
  }, [initialCost, finalValue, additionalIncome, expenses, durationYears, currency]);

  const handleReset = () => {
    setInitialCost(50000);
    setFinalValue(75000);
    setAdditionalIncome(5000);
    setExpenses(2000);
    setDurationYears(3);
  };

  const handleCopySummary = () => {
    trackCalculatorEvent("calculator_copy_summary", { tool: "roi-calculator" });
    const summary = [
      "=== Saviora Return on Investment (ROI) Summary ===",
      `Initial Capital Cost: ${formatInvestmentCurrency(result.initialCost, currency)}`,
      `Final Asset Value: ${formatInvestmentCurrency(result.finalValue, currency)}`,
      `Additional Cash Inflow: +${formatInvestmentCurrency(result.additionalIncome, currency)}`,
      `Ongoing Expenses: -${formatInvestmentCurrency(result.expenses, currency)}`,
      `Net Profit Realized: ${result.isProfit ? "+" : ""}${formatInvestmentCurrency(result.netProfit, currency)}`,
      `Total ROI: ${result.roiPercentage.toFixed(2)}%`,
      `Annualized ROI (CAGR): ${result.annualizedROI !== undefined ? `${result.annualizedROI.toFixed(2)}% p.a.` : "N/A"}`,
      `Investment Duration: ${durationYears} Years`,
      "Generated at: https://saviora.app/free-tools/roi-calculator",
    ].join("\n");

    navigator.clipboard.writeText(summary);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handlePrint = () => {
    trackCalculatorEvent("calculator_print_report", { tool: "roi-calculator" });
    window.print();
  };

  const inputParams: ReportInputParam[] = [
    { label: "Initial Investment Cost", value: formatInvestmentCurrency(initialCost, currency) },
    { label: "Final Investment Value", value: formatInvestmentCurrency(finalValue, currency) },
    { label: "Additional Incomes (Dividends/Rent)", value: formatInvestmentCurrency(additionalIncome, currency) },
    { label: "Investment Expenses & Outlays", value: formatInvestmentCurrency(expenses, currency) },
    { label: "Investment Duration", value: `${durationYears} Years` },
    { label: "Reporting Currency", value: currency },
  ];

  return (
    <div className="pt-32 sm:pt-36 lg:pt-40 pb-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* On-screen Interactive UI */}
      <div className="print:hidden">
        <InvestmentBreadcrumb items={[{ label: "ROI Calculator" }]} />

        <InvestmentCalculatorHero
          badge="Return on Investment (ROI) Engine"
          title="ROI Calculator – Percentage Return on Investment"
          description="Calculate your simple and annualized Return on Investment (ROI), factor in ancillary cash flows and operating costs, and model target profit scenarios."
        />

        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Form */}
          <div className="lg:col-span-7 bg-white rounded-2xl p-6 sm:p-7 border border-slate-200/80 shadow-xs">
            <div className="flex items-center justify-between pb-4 mb-6 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <BarChart3 className="w-5 h-5 text-emerald-600" />
                <h2 className="text-base font-bold text-slate-900">ROI Calculation Inputs</h2>
              </div>
              <InvestmentCurrencySelector value={currency} onChange={setCurrency} />
            </div>

            <div className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Initial Investment Cost ({currency})
                  </label>
                  <input
                    type="number"
                    min="1"
                    step="1000"
                    value={initialCost || ""}
                    onChange={(e) => setInitialCost(Math.max(0, parseFloat(e.target.value) || 0))}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm font-semibold text-slate-900 focus:bg-white focus:ring-2 focus:ring-emerald-500 transition"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Final Investment Value ({currency})
                  </label>
                  <input
                    type="number"
                    min="0"
                    step="1000"
                    value={finalValue || ""}
                    onChange={(e) => setFinalValue(Math.max(0, parseFloat(e.target.value) || 0))}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm font-semibold text-slate-900 focus:bg-white focus:ring-2 focus:ring-emerald-500 transition"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Additional Income ({currency})
                  </label>
                  <input
                    type="number"
                    min="0"
                    step="500"
                    value={additionalIncome || ""}
                    onChange={(e) => setAdditionalIncome(Math.max(0, parseFloat(e.target.value) || 0))}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm font-semibold text-slate-900 focus:bg-white focus:ring-2 focus:ring-emerald-500 transition"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Investment Expenses ({currency})
                  </label>
                  <input
                    type="number"
                    min="0"
                    step="200"
                    value={expenses || ""}
                    onChange={(e) => setExpenses(Math.max(0, parseFloat(e.target.value) || 0))}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm font-semibold text-slate-900 focus:bg-white focus:ring-2 focus:ring-emerald-500 transition"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Holding Duration (Years, Optional for Annualized ROI)
                </label>
                <input
                  type="number"
                  min="0.1"
                  max="50"
                  step="0.5"
                  value={durationYears || ""}
                  onChange={(e) => setDurationYears(Math.max(0.1, parseFloat(e.target.value) || 1))}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm font-semibold text-slate-900 focus:bg-white focus:ring-2 focus:ring-emerald-500 transition"
                />
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
                  Total Return on Investment
                </span>
                <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
                  {result.roiPercentage >= 0 ? "+" : ""}{result.roiPercentage.toFixed(2)}% ROI
                </span>
              </div>

              <div className="mt-4 text-center">
                <div className="text-3xl sm:text-4xl font-black text-slate-900 font-mono tracking-tight">
                  {result.netProfit >= 0 ? "+" : ""}{formatInvestmentCurrency(result.netProfit, currency)}
                </div>
                <p className="text-xs text-slate-600 mt-1 font-medium">
                  {result.annualizedROI !== undefined
                    ? `Annualized CAGR: ${result.annualizedROI.toFixed(2)}% p.a. over ${durationYears} years`
                    : "Simple Cumulative ROI"}
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

              {/* Scenarios Grid */}
              <div className="mt-5 grid grid-cols-2 gap-3 pt-4 border-t border-emerald-100 text-xs">
                <div className="p-3 bg-white/80 rounded-xl border border-emerald-100">
                  <p className="text-slate-500">Target for +20% ROI</p>
                  <p className="text-xs font-bold text-slate-900 font-mono mt-0.5">
                    {formatInvestmentCurrency(result.target20PercentValue, currency)}
                  </p>
                </div>
                <div className="p-3 bg-white/80 rounded-xl border border-emerald-100">
                  <p className="text-slate-500">Target for +50% ROI</p>
                  <p className="text-xs font-bold text-emerald-700 font-mono mt-0.5">
                    {formatInvestmentCurrency(result.target50PercentValue, currency)}
                  </p>
                </div>
              </div>
            </div>

            {/* Visual Breakdown */}
            <InvestmentVisualBreakdown
              title="Capital vs Gains Breakdown"
              currency={currency}
              segments={[
                { label: "Initial Capital Cost", amount: result.initialCost, color: "bg-indigo-600" },
                { label: "Net Profit", amount: Math.max(0, result.netProfit), color: "bg-emerald-500" },
                { label: "Expenses", amount: result.expenses, color: "bg-amber-400" },
              ]}
            />
          </div>
        </div>

        {/* Educational SEO Content & Methodology */}
        {INVESTMENT_SEO_CONTENT["roi-calculator"] && (
          <InvestmentCalculatorSEOContent {...INVESTMENT_SEO_CONTENT["roi-calculator"]} />
        )}

        {/* FAQs */}
        <InvestmentCalculatorFAQ faqs={FAQS} />

        {/* Related Tools */}
        <InvestmentRelatedTools tools={RELATED_TOOLS} />

        {/* Contextual Saviora Core Features */}
        <InvestmentContextualFeatures currentCategory="Return on Investment" />

        {/* Saviora Product CTA */}
        <InvestmentProductCTA />
      </div>

      {/* Official Printable Assessment Report */}
      <InvestmentPrintReport
        reportTitle="Return on Investment (ROI) Assessment Report"
        calculatorName="ROI Calculator"
        currency={currency}
        inputParams={inputParams}
        primaryMetric={{
          label: "Return on Investment (ROI)",
          value: `${result.roiPercentage >= 0 ? "+" : ""}${result.roiPercentage.toFixed(2)}%`,
          subtext: `Net Profit: ${formatInvestmentCurrency(result.netProfit, currency)}${result.annualizedROI ? ` | Annualized: ${result.annualizedROI.toFixed(2)}% p.a.` : ""}`,
        }}
        keyMetrics={[
          { label: "Initial Investment Cost", value: formatInvestmentCurrency(result.initialCost, currency) },
          { label: "Final Asset Value", value: formatInvestmentCurrency(result.finalValue, currency) },
          { label: "Additional Income", value: formatInvestmentCurrency(result.additionalIncome, currency) },
          { label: "Total Operating Expenses", value: formatInvestmentCurrency(result.expenses, currency) },
          { label: "Target for +20% ROI", value: formatInvestmentCurrency(result.target20PercentValue, currency) },
        ]}
        breakdownSummary={{
          investedAmount: formatInvestmentCurrency(result.initialCost, currency),
          investedPercent: `${(result.initialCost + Math.max(0, result.netProfit)) > 0 ? ((result.initialCost / (result.initialCost + Math.max(0, result.netProfit))) * 100).toFixed(1) : 0}%`,
          growthAmount: formatInvestmentCurrency(Math.max(0, result.netProfit), currency),
          growthPercent: `${(result.initialCost + Math.max(0, result.netProfit)) > 0 ? ((Math.max(0, result.netProfit) / (result.initialCost + Math.max(0, result.netProfit))) * 100).toFixed(1) : 0}%`,
          totalAmount: formatInvestmentCurrency(result.initialCost + Math.max(0, result.netProfit), currency),
        }}
      />
    </div>
  );
}
