"use client";

import { InvestmentCalculatorSEOContent } from "./shared/InvestmentCalculatorSEOContent";
import { INVESTMENT_SEO_CONTENT } from "@/lib/investment-calculators/seoContentData";
import { InvestmentContextualFeatures } from "./shared/InvestmentContextualFeatures";
import { trackCalculatorEvent } from "@/lib/investment-calculators/analytics";

import React, { useState, useMemo } from "react";
import { SupportedCurrency, formatInvestmentCurrency } from "@/lib/investment-calculators/currencies";
import { calculateInvestmentReturn } from "@/lib/investment-calculators/engines/investmentReturn";
import { InvestmentBreadcrumb } from "./shared/InvestmentBreadcrumb";
import { InvestmentCalculatorHero } from "./shared/InvestmentCalculatorHero";
import { InvestmentCurrencySelector } from "./shared/InvestmentCurrencySelector";
import { InvestmentVisualBreakdown } from "./shared/InvestmentVisualBreakdown";
import { InvestmentScheduleTable } from "./shared/InvestmentScheduleTable";
import { InvestmentCalculatorFAQ, FAQItem } from "./shared/InvestmentCalculatorFAQ";
import { InvestmentRelatedTools, RelatedToolItem } from "./shared/InvestmentRelatedTools";
import { InvestmentProductCTA } from "./shared/InvestmentProductCTA";
import { InvestmentPrintReport, ReportInputParam, ReportScheduleRow } from "./shared/InvestmentPrintReport";
import { Copy, Check, RotateCcw, TrendingUp, DollarSign, Percent, Calendar, ShieldCheck, Printer } from "lucide-react";

const FAQS: FAQItem[] = [
  {
    question: "What is the difference between total return and CAGR (Compound Annual Growth Rate)?",
    answer: "Total return measures the cumulative percentage gain or loss over the entire investment holding period regardless of duration. In contrast, CAGR (Compound Annual Growth Rate) standardizes the return into a smoothed annual percentage, allowing you to accurately compare a 3-year investment with a 10-year investment.",
  },
  {
    question: "How do additional contributions affect annualized return calculations?",
    answer: "When capital is injected over time rather than in a single initial lump sum, a simple CAGR based only on initial principal would distort returns. Our calculator uses an average invested capital method (similar to the modified Dietz standard) to reflect the timing and magnitude of your cash contributions.",
  },
  {
    question: "Why should investment fees and dividend income be included?",
    answer: "Fees directly reduce your net compounded returns, while dividends and distributions represent tangible cash flow that adds to your total return. Evaluating only asset price changes without factoring in fees and dividends produces an incomplete financial picture.",
  },
  {
    question: "Are investment returns guaranteed?",
    answer: "No. All calculation results are mathematical estimates based on user-entered values. Real market investments carry market risks, volatility, tax consequences, and unpredictable economic factors.",
  },
];

const RELATED_TOOLS: RelatedToolItem[] = [
  {
    name: "ROI Calculator",
    href: "/free-tools/roi-calculator",
    description: "Calculate percentage Return on Investment, net gain, and scenario targets.",
    tag: "Essential",
  },
  {
    name: "Investment Growth Calculator",
    href: "/free-tools/investment-growth-calculator",
    description: "Simulate multi-year portfolio accumulation with recurring deposits and expense ratios.",
    tag: "Long-Term",
  },
  {
    name: "Investment Profit & Loss Calculator",
    href: "/free-tools/investment-profit-loss-calculator",
    description: "Determine exact realized or unrealized trading gains, broker fees, and break-even targets.",
    tag: "Trading",
  },
];

export function InvestmentReturnCalculatorView() {
  const [currency, setCurrency] = useState<SupportedCurrency>("USD");
  const [initialInvestment, setInitialInvestment] = useState<number>(10000);
  const [finalValue, setFinalValue] = useState<number>(18500);
  const [additionalContributions, setAdditionalContributions] = useState<number>(2000);
  const [durationYears, setDurationYears] = useState<number>(5);
  const [investmentFees, setInvestmentFees] = useState<number>(250);
  const [dividendsIncome, setDividendsIncome] = useState<number>(600);
  const [copied, setCopied] = useState(false);

  const result = useMemo(() => {
    return calculateInvestmentReturn({
      initialInvestment,
      finalValue,
      additionalContributions,
      durationYears,
      investmentFees,
      dividendsIncome,
      currency,
    });
  }, [initialInvestment, finalValue, additionalContributions, durationYears, investmentFees, dividendsIncome, currency]);

  const handleReset = () => {
    setInitialInvestment(10000);
    setFinalValue(18500);
    setAdditionalContributions(2000);
    setDurationYears(5);
    setInvestmentFees(250);
    setDividendsIncome(600);
  };

  const handleCopySummary = () => {
    trackCalculatorEvent("calculator_copy_summary", { tool: "investment-return-calculator" });
    const summary = [
      "=== Saviora Investment Return Calculation Summary ===",
      `Initial Investment: ${formatInvestmentCurrency(result.initialInvestment, currency)}`,
      `Additional Contributions: ${formatInvestmentCurrency(result.additionalContributions, currency)}`,
      `Total Invested Capital: ${formatInvestmentCurrency(result.totalInvestedCapital, currency)}`,
      `Final Portfolio Value: ${formatInvestmentCurrency(result.finalValue, currency)}`,
      `Dividends / Income: +${formatInvestmentCurrency(result.dividendsIncome, currency)}`,
      `Management & Trading Fees: -${formatInvestmentCurrency(result.investmentFees, currency)}`,
      `Net Investment Gain: ${formatInvestmentCurrency(result.netGain, currency)}`,
      `Total Net Return: ${result.totalReturnPercent.toFixed(2)}%`,
      `Annualized Return (CAGR): ${result.annualizedReturnCAGR.toFixed(2)}% p.a.`,
      `Holding Duration: ${result.durationYears} Years`,
      "Generated at: https://saviora.app/free-tools/investment-return-calculator",
    ].join("\n");

    navigator.clipboard.writeText(summary);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handlePrint = () => {
    trackCalculatorEvent("calculator_print_report", { tool: "investment-return-calculator" });
    window.print();
  };

  const inputParams: ReportInputParam[] = [
    { label: "Initial Investment", value: formatInvestmentCurrency(initialInvestment, currency) },
    { label: "Final Investment Value", value: formatInvestmentCurrency(finalValue, currency) },
    { label: "Additional Contributions", value: formatInvestmentCurrency(additionalContributions, currency) },
    { label: "Investment Duration", value: `${durationYears} Years` },
    { label: "Dividends & Additional Income", value: formatInvestmentCurrency(dividendsIncome, currency) },
    { label: "Investment Fees & Expenses", value: formatInvestmentCurrency(investmentFees, currency) },
    { label: "Reporting Currency", value: currency },
  ];

  const printableScheduleRows: ReportScheduleRow[] = result.yearlySchedule.map((y) => ({
    period: `Year ${y.year}`,
    startingBalance: formatInvestmentCurrency(y.startingBalance, currency),
    contributions: formatInvestmentCurrency(y.contributionsThisYear, currency),
    growth: formatInvestmentCurrency(y.growthThisYear, currency),
    endingBalance: formatInvestmentCurrency(y.endingBalance, currency),
  }));

  return (
    <div className="pt-32 sm:pt-36 lg:pt-40 pb-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* On-screen Interactive UI */}
      <div className="print:hidden">
        <InvestmentBreadcrumb items={[{ label: "Investment Return Calculator" }]} />

        <InvestmentCalculatorHero
          badge="Free Investment Return Calculator"
          title="Investment Return & CAGR Calculator"
          description="Calculate your total net investment returns, compound annual growth rate (CAGR), dividend yields, and fee deductions across stocks, ETFs, mutual funds, and real estate."
        />

        {/* Calculator Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Form Inputs */}
          <div className="lg:col-span-7 bg-white rounded-2xl p-6 sm:p-7 border border-slate-200/80 shadow-xs">
            <div className="flex items-center justify-between pb-4 mb-6 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-emerald-600" />
                <h2 className="text-base font-bold text-slate-900">Investment Parameters</h2>
              </div>
              <InvestmentCurrencySelector value={currency} onChange={setCurrency} />
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Initial Investment Amount ({currency})
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-2.5 text-xs font-bold text-slate-400">
                    <DollarSign className="w-4 h-4 text-slate-400" />
                  </span>
                  <input
                    type="number"
                    min="0"
                    step="100"
                    value={initialInvestment || ""}
                    onChange={(e) => setInitialInvestment(Math.max(0, parseFloat(e.target.value) || 0))}
                    className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm font-semibold text-slate-900 focus:bg-white focus:ring-2 focus:ring-emerald-500 transition"
                    placeholder="10000"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Final Portfolio Value ({currency})
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-2.5 text-xs font-bold text-slate-400">
                    <DollarSign className="w-4 h-4 text-slate-400" />
                  </span>
                  <input
                    type="number"
                    min="0"
                    step="100"
                    value={finalValue || ""}
                    onChange={(e) => setFinalValue(Math.max(0, parseFloat(e.target.value) || 0))}
                    className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm font-semibold text-slate-900 focus:bg-white focus:ring-2 focus:ring-emerald-500 transition"
                    placeholder="18500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Additional Contributions ({currency})
                  </label>
                  <input
                    type="number"
                    min="0"
                    step="100"
                    value={additionalContributions || ""}
                    onChange={(e) => setAdditionalContributions(Math.max(0, parseFloat(e.target.value) || 0))}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm font-semibold text-slate-900 focus:bg-white focus:ring-2 focus:ring-emerald-500 transition"
                    placeholder="2000"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Investment Duration (Years)
                  </label>
                  <div className="relative">
                    <span className="absolute left-3 top-2.5 text-xs font-bold text-slate-400">
                      <Calendar className="w-4 h-4 text-slate-400" />
                    </span>
                    <input
                      type="number"
                      min="0.1"
                      max="60"
                      step="0.5"
                      value={durationYears || ""}
                      onChange={(e) => setDurationYears(Math.max(0.1, parseFloat(e.target.value) || 1))}
                      className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm font-semibold text-slate-900 focus:bg-white focus:ring-2 focus:ring-emerald-500 transition"
                      placeholder="5"
                    />
                  </div>
                </div>
              </div>

              {/* Optional Dividends and Fees Accordion */}
              <div className="pt-2 border-t border-slate-100">
                <p className="text-xs font-bold text-slate-800 mb-3">Optional Adjustments (Fees &amp; Income)</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-slate-600 mb-1">
                      Dividends / Cash Income ({currency})
                    </label>
                    <input
                      type="number"
                      min="0"
                      step="50"
                      value={dividendsIncome || ""}
                      onChange={(e) => setDividendsIncome(Math.max(0, parseFloat(e.target.value) || 0))}
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-900 focus:bg-white focus:ring-2 focus:ring-emerald-500 transition"
                      placeholder="600"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-slate-600 mb-1">
                      Management &amp; Trading Fees ({currency})
                    </label>
                    <input
                      type="number"
                      min="0"
                      step="25"
                      value={investmentFees || ""}
                      onChange={(e) => setInvestmentFees(Math.max(0, parseFloat(e.target.value) || 0))}
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-900 focus:bg-white focus:ring-2 focus:ring-emerald-500 transition"
                      placeholder="250"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Reset Button */}
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

          {/* Right Column: Key Results & Visual Breakdown */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-gradient-to-br from-emerald-50 via-white to-teal-50 rounded-2xl p-6 sm:p-7 border border-emerald-200/80 shadow-xs">
              <div className="flex items-center justify-between pb-3 border-b border-emerald-100">
                <span className="text-xs font-bold uppercase tracking-wider text-emerald-800">
                  Annualized Growth Rate
                </span>
                <span className="text-xs font-semibold text-emerald-700 bg-emerald-100/70 px-2 py-0.5 rounded-full">
                  CAGR
                </span>
              </div>

              <div className="mt-4 text-center">
                <div className="text-4xl sm:text-5xl font-black text-slate-900 font-mono tracking-tight">
                  {result.annualizedReturnCAGR >= 0 ? "+" : ""}{result.annualizedReturnCAGR.toFixed(2)}%
                </div>
                <p className="text-xs text-slate-600 mt-1 font-medium">
                  Annualized return per year over {result.durationYears} years
                </p>
              </div>

              {/* Action Buttons: Print Report & Copy Summary */}
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

              {/* Result Details Grid */}
              <div className="mt-5 grid grid-cols-2 gap-3 pt-4 border-t border-emerald-100 text-xs">
                <div className="p-3 bg-white/80 rounded-xl border border-emerald-100">
                  <p className="text-slate-500">Total Invested</p>
                  <p className="text-sm font-bold text-slate-900 font-mono mt-0.5">
                    {formatInvestmentCurrency(result.totalInvestedCapital, currency)}
                  </p>
                </div>
                <div className="p-3 bg-white/80 rounded-xl border border-emerald-100">
                  <p className="text-slate-500">Net Profit / Gain</p>
                  <p className={`text-sm font-bold font-mono mt-0.5 ${result.netGain >= 0 ? "text-emerald-700" : "text-rose-600"}`}>
                    {result.netGain >= 0 ? "+" : ""}{formatInvestmentCurrency(result.netGain, currency)}
                  </p>
                </div>
                <div className="p-3 bg-white/80 rounded-xl border border-emerald-100">
                  <p className="text-slate-500">Total Return %</p>
                  <p className="text-sm font-bold text-slate-900 font-mono mt-0.5">
                    {result.totalReturnPercent >= 0 ? "+" : ""}{result.totalReturnPercent.toFixed(2)}%
                  </p>
                </div>
                <div className="p-3 bg-white/80 rounded-xl border border-emerald-100">
                  <p className="text-slate-500">Final Portfolio Value</p>
                  <p className="text-sm font-bold text-slate-900 font-mono mt-0.5">
                    {formatInvestmentCurrency(result.finalValue, currency)}
                  </p>
                </div>
              </div>
            </div>

            {/* Visual Breakdown Bar */}
            <InvestmentVisualBreakdown
              title="Capital vs Growth Breakdown"
              currency={currency}
              segments={[
                { label: "Invested Principal", amount: result.totalInvestedCapital, color: "bg-indigo-600" },
                { label: "Net Investment Gain", amount: Math.max(0, result.netGain), color: "bg-emerald-500" },
                { label: "Fees & Deductions", amount: result.investmentFees, color: "bg-amber-400" },
              ]}
            />
          </div>
        </div>

        {/* Schedule Table */}
        <InvestmentScheduleTable
          schedule={result.yearlySchedule}
          currency={currency}
          title="Projected Year-by-Year Growth Summary"
          subtitle="Estimated yearly compounding progress matching your annualized return rate."
        />

        {/* Educational SEO Content & Methodology */}
        {INVESTMENT_SEO_CONTENT["investment-return-calculator"] && (
          <InvestmentCalculatorSEOContent {...INVESTMENT_SEO_CONTENT["investment-return-calculator"]} />
        )}

        {/* FAQs */}
        <InvestmentCalculatorFAQ faqs={FAQS} />

        {/* Related Tools */}
        <InvestmentRelatedTools tools={RELATED_TOOLS} />

        {/* Contextual Saviora Core Features */}
        <InvestmentContextualFeatures currentCategory="Investment Returns" />

        {/* Saviora Product CTA */}
        <InvestmentProductCTA />
      </div>

      {/* Official Printable Financial Assessment Report (Rendered only on print / PDF generation) */}
      <InvestmentPrintReport
        reportTitle="Investment Return &amp; CAGR Assessment Report"
        calculatorName="Investment Return Calculator"
        currency={currency}
        inputParams={inputParams}
        primaryMetric={{
          label: "Compound Annual Growth Rate (CAGR)",
          value: `${result.annualizedReturnCAGR >= 0 ? "+" : ""}${result.annualizedReturnCAGR.toFixed(2)}% p.a.`,
          subtext: `Net Gain: ${formatInvestmentCurrency(result.netGain, currency)} over ${result.durationYears} Years`,
        }}
        keyMetrics={[
          { label: "Total Invested Capital", value: formatInvestmentCurrency(result.totalInvestedCapital, currency) },
          { label: "Final Portfolio Value", value: formatInvestmentCurrency(result.finalValue, currency) },
          { label: "Total Net Gain", value: formatInvestmentCurrency(result.netGain, currency) },
          { label: "Total Return %", value: `${result.totalReturnPercent.toFixed(2)}%` },
          { label: "Dividends Received", value: formatInvestmentCurrency(result.dividendsIncome, currency) },
          { label: "Fees Deducted", value: formatInvestmentCurrency(result.investmentFees, currency) },
        ]}
        breakdownSummary={{
          investedAmount: formatInvestmentCurrency(result.totalInvestedCapital, currency),
          investedPercent: `${result.finalValue > 0 ? ((result.totalInvestedCapital / result.finalValue) * 100).toFixed(1) : 0}%`,
          growthAmount: formatInvestmentCurrency(Math.max(0, result.netGain), currency),
          growthPercent: `${result.finalValue > 0 ? ((Math.max(0, result.netGain) / result.finalValue) * 100).toFixed(1) : 0}%`,
          totalAmount: formatInvestmentCurrency(result.finalValue, currency),
        }}
        scheduleRows={printableScheduleRows}
        scheduleTitle="Annual Compounding &amp; Return Breakdown"
      />
    </div>
  );
}
