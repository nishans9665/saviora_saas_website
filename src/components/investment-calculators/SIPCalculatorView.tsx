"use client";

import { InvestmentCalculatorSEOContent } from "./shared/InvestmentCalculatorSEOContent";
import { INVESTMENT_SEO_CONTENT } from "@/lib/investment-calculators/seoContentData";
import { InvestmentContextualFeatures } from "./shared/InvestmentContextualFeatures";
import { trackCalculatorEvent } from "@/lib/investment-calculators/analytics";

import React, { useState, useMemo } from "react";
import { SupportedCurrency, formatInvestmentCurrency } from "@/lib/investment-calculators/currencies";
import { calculateSIP } from "@/lib/investment-calculators/engines/sip";
import { ContributionFrequency, ContributionTiming } from "@/lib/investment-calculators/types";
import { InvestmentBreadcrumb } from "./shared/InvestmentBreadcrumb";
import { InvestmentCalculatorHero } from "./shared/InvestmentCalculatorHero";
import { InvestmentCurrencySelector } from "./shared/InvestmentCurrencySelector";
import { InvestmentVisualBreakdown } from "./shared/InvestmentVisualBreakdown";
import { InvestmentScheduleTable } from "./shared/InvestmentScheduleTable";
import { InvestmentCalculatorFAQ, FAQItem } from "./shared/InvestmentCalculatorFAQ";
import { InvestmentRelatedTools, RelatedToolItem } from "./shared/InvestmentRelatedTools";
import { InvestmentProductCTA } from "./shared/InvestmentProductCTA";
import { InvestmentPrintReport, ReportInputParam, ReportScheduleRow } from "./shared/InvestmentPrintReport";
import { Copy, Check, RotateCcw, TrendingUp, DollarSign, Calendar, Layers, Printer } from "lucide-react";

const FAQS: FAQItem[] = [
  {
    question: "What is a Systematic Investment Plan (SIP)?",
    answer: "A Systematic Investment Plan (SIP) is an investment approach where you commit a fixed sum of money at regular intervals (usually monthly) into an index fund, ETF, or mutual fund. It instills saving discipline and automates dollar-cost averaging.",
  },
  {
    question: "How does rupee/dollar-cost averaging benefit SIP investors?",
    answer: "By investing a fixed dollar amount every period, you automatically purchase more units when prices fall and fewer units when prices rise. Over the long run, this lowers your average purchase price per share without requiring you to time the market.",
  },
  {
    question: "What is the difference between beginning of period and end of period contributions?",
    answer: "Beginning of period (annuity due) assumes each deposit is invested immediately at the start of the period and earns interest throughout that month. End of period (ordinary annuity) assumes contributions are made at the close of the month.",
  },
  {
    question: "Can I increase my SIP amount over time?",
    answer: "Yes, in real-world investing, 'step-up' SIPs allow you to increase your periodic contributions as your salary rises. You can simulate this by adjusting the periodic investment amount in the calculator.",
  },
];

const RELATED_TOOLS: RelatedToolItem[] = [
  {
    name: "Investment Growth Calculator",
    href: "/free-tools/investment-growth-calculator",
    description: "Compare lump-sum + recurring deposits with custom compounding frequencies.",
    tag: "Compound",
  },
  {
    name: "Savings Goal Calculator",
    href: "/free-tools/savings-goal-calculator",
    description: "Calculate how much you need to save every month to reach a specific financial target.",
    tag: "Goals",
  },
  {
    name: "Monthly Savings Calculator",
    href: "/free-tools/monthly-savings-calculator",
    description: "Project how regular deposits accumulate in bank deposits and interest accounts.",
    tag: "Savings",
  },
];

export function SIPCalculatorView() {
  const [currency, setCurrency] = useState<SupportedCurrency>("USD");
  const [periodicInvestment, setPeriodicInvestment] = useState<number>(500);
  const [annualReturnRate, setAnnualReturnRate] = useState<number>(12);
  const [durationYears, setDurationYears] = useState<number>(10);
  const [frequency, setFrequency] = useState<ContributionFrequency>("monthly");
  const [timing, setTiming] = useState<ContributionTiming>("end");
  const [copied, setCopied] = useState(false);

  const result = useMemo(() => {
    return calculateSIP({
      periodicInvestment,
      annualReturnRate,
      durationYears,
      frequency,
      timing,
      currency,
    });
  }, [periodicInvestment, annualReturnRate, durationYears, frequency, timing, currency]);

  const handleReset = () => {
    setPeriodicInvestment(500);
    setAnnualReturnRate(12);
    setDurationYears(10);
    setFrequency("monthly");
    setTiming("end");
  };

  const handleCopySummary = () => {
    trackCalculatorEvent("calculator_copy_summary", { tool: "sip-calculator" });
    const summary = [
      "=== Saviora Systematic Investment Plan (SIP) Summary ===",
      `Periodic Investment: ${formatInvestmentCurrency(result.periodicInvestment, currency)} (${result.frequency})`,
      `Expected Annual Return: ${annualReturnRate}% p.a.`,
      `Investment Duration: ${durationYears} Years (${result.totalContributionsCount} contributions)`,
      `Total Amount Invested: ${formatInvestmentCurrency(result.totalInvested, currency)}`,
      `Estimated Wealth Gained (Returns): ${formatInvestmentCurrency(result.estimatedReturns, currency)}`,
      `Total Future Portfolio Value: ${formatInvestmentCurrency(result.futureValue, currency)}`,
      `Growth Multiple: ${result.growthMultiple.toFixed(2)}x invested capital`,
      "Generated at: https://saviora.app/free-tools/sip-calculator",
    ].join("\n");

    navigator.clipboard.writeText(summary);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handlePrint = () => {
    trackCalculatorEvent("calculator_print_report", { tool: "sip-calculator" });
    window.print();
  };

  const inputParams: ReportInputParam[] = [
    { label: "Periodic Contribution", value: `${formatInvestmentCurrency(periodicInvestment, currency)} / ${frequency}` },
    { label: "Expected Annual Return", value: `${annualReturnRate}% p.a.` },
    { label: "Investment Duration", value: `${durationYears} Years (${result.totalContributionsCount} deposits)` },
    { label: "Contribution Timing", value: timing === "beginning" ? "Beginning of Period (Annuity Due)" : "End of Period (Standard)" },
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
        <InvestmentBreadcrumb items={[{ label: "SIP Calculator" }]} />

        <InvestmentCalculatorHero
          badge="Systematic Investment Plan (SIP) Engine"
          title="SIP Calculator – Systematic Investment Returns"
          description="Estimate the future compound growth of regular investments. Compare monthly, weekly, and quarterly contributions across mutual funds and ETF index portfolios."
        />

        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Form */}
          <div className="lg:col-span-7 bg-white rounded-2xl p-6 sm:p-7 border border-slate-200/80 shadow-xs">
            <div className="flex items-center justify-between pb-4 mb-6 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-emerald-600" />
                <h2 className="text-base font-bold text-slate-900">SIP Investment Inputs</h2>
              </div>
              <InvestmentCurrencySelector value={currency} onChange={setCurrency} />
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Periodic Investment Amount ({currency})
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-2.5 text-xs font-bold text-slate-400">
                    <DollarSign className="w-4 h-4 text-slate-400" />
                  </span>
                  <input
                    type="number"
                    min="1"
                    step="50"
                    value={periodicInvestment || ""}
                    onChange={(e) => setPeriodicInvestment(Math.max(0, parseFloat(e.target.value) || 0))}
                    className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm font-semibold text-slate-900 focus:bg-white focus:ring-2 focus:ring-emerald-500 transition"
                    placeholder="500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Expected Annual Return Rate (%)
                  </label>
                  <input
                    type="number"
                    min="0"
                    max="40"
                    step="0.5"
                    value={annualReturnRate || ""}
                    onChange={(e) => setAnnualReturnRate(Math.max(0, parseFloat(e.target.value) || 0))}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm font-semibold text-slate-900 focus:bg-white focus:ring-2 focus:ring-emerald-500 transition"
                    placeholder="12"
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
                      min="1"
                      max="50"
                      step="1"
                      value={durationYears || ""}
                      onChange={(e) => setDurationYears(Math.max(1, parseInt(e.target.value) || 1))}
                      className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm font-semibold text-slate-900 focus:bg-white focus:ring-2 focus:ring-emerald-500 transition"
                      placeholder="10"
                    />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Contribution Frequency
                  </label>
                  <select
                    value={frequency}
                    onChange={(e) => setFrequency(e.target.value as ContributionFrequency)}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-900 focus:bg-white focus:ring-2 focus:ring-emerald-500 transition cursor-pointer"
                  >
                    <option value="weekly">Weekly (52 / year)</option>
                    <option value="monthly">Monthly (12 / year)</option>
                    <option value="quarterly">Quarterly (4 / year)</option>
                    <option value="annually">Annually (1 / year)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Deposit Timing
                  </label>
                  <select
                    value={timing}
                    onChange={(e) => setTiming(e.target.value as ContributionTiming)}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-900 focus:bg-white focus:ring-2 focus:ring-emerald-500 transition cursor-pointer"
                  >
                    <option value="end">End of Period (Standard Annuity)</option>
                    <option value="beginning">Beginning of Period (Annuity Due)</option>
                  </select>
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

          {/* Right Column: Results */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-gradient-to-br from-emerald-50 via-white to-teal-50 rounded-2xl p-6 sm:p-7 border border-emerald-200/80 shadow-xs">
              <div className="flex items-center justify-between pb-3 border-b border-emerald-100">
                <span className="text-xs font-bold uppercase tracking-wider text-emerald-800">
                  Projected Portfolio Value
                </span>
                <span className="text-xs font-semibold text-emerald-700 bg-emerald-100/70 px-2 py-0.5 rounded-full">
                  {result.growthMultiple.toFixed(2)}x Growth
                </span>
              </div>

              <div className="mt-4 text-center">
                <div className="text-3xl sm:text-4xl font-black text-slate-900 font-mono tracking-tight">
                  {formatInvestmentCurrency(result.futureValue, currency)}
                </div>
                <p className="text-xs text-slate-600 mt-1 font-medium">
                  After {durationYears} years ({result.totalContributionsCount} contributions)
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

              {/* Summary Metrics */}
              <div className="mt-5 grid grid-cols-2 gap-3 pt-4 border-t border-emerald-100 text-xs">
                <div className="p-3 bg-white/80 rounded-xl border border-emerald-100">
                  <p className="text-slate-500">Total Invested</p>
                  <p className="text-sm font-bold text-slate-900 font-mono mt-0.5">
                    {formatInvestmentCurrency(result.totalInvested, currency)}
                  </p>
                </div>
                <div className="p-3 bg-white/80 rounded-xl border border-emerald-100">
                  <p className="text-slate-500">Estimated Returns</p>
                  <p className="text-sm font-bold text-emerald-700 font-mono mt-0.5">
                    +{formatInvestmentCurrency(result.estimatedReturns, currency)}
                  </p>
                </div>
              </div>
            </div>

            {/* Visual Breakdown */}
            <InvestmentVisualBreakdown
              title="Principal Invested vs Wealth Generated"
              currency={currency}
              segments={[
                { label: "Total Invested", amount: result.totalInvested, color: "bg-indigo-600" },
                { label: "Estimated Returns", amount: result.estimatedReturns, color: "bg-emerald-500" },
              ]}
            />
          </div>
        </div>

        {/* Schedule Table */}
        <InvestmentScheduleTable
          schedule={result.yearlySchedule}
          currency={currency}
          title="Year-by-Year SIP Compounding Schedule"
          subtitle="Cumulative progression of total invested capital alongside compounded market returns."
        />

        {/* Educational SEO Content & Methodology */}
        {INVESTMENT_SEO_CONTENT["sip-calculator"] && (
          <InvestmentCalculatorSEOContent {...INVESTMENT_SEO_CONTENT["sip-calculator"]} />
        )}

        {/* FAQs */}
        <InvestmentCalculatorFAQ faqs={FAQS} />

        {/* Related Tools */}
        <InvestmentRelatedTools tools={RELATED_TOOLS} />

        {/* Contextual Saviora Core Features */}
        <InvestmentContextualFeatures currentCategory="Systematic Investment Plan" />

        {/* Saviora Product CTA */}
        <InvestmentProductCTA />
      </div>

      {/* Official Printable Assessment Report */}
      <InvestmentPrintReport
        reportTitle="Systematic Investment Plan (SIP) Growth Report"
        calculatorName="SIP Calculator"
        currency={currency}
        inputParams={inputParams}
        primaryMetric={{
          label: "Estimated Future Portfolio Value",
          value: formatInvestmentCurrency(result.futureValue, currency),
          subtext: `Total Wealth Gained: ${formatInvestmentCurrency(result.estimatedReturns, currency)} (${result.growthMultiple.toFixed(2)}x)`,
        }}
        keyMetrics={[
          { label: "Total Invested Principal", value: formatInvestmentCurrency(result.totalInvested, currency) },
          { label: "Estimated Returns", value: formatInvestmentCurrency(result.estimatedReturns, currency) },
          { label: "Contribution Count", value: `${result.totalContributionsCount} deposits` },
          { label: "Annual Rate Assumed", value: `${annualReturnRate}% p.a.` },
          { label: "Investment Horizon", value: `${durationYears} Years` },
        ]}
        breakdownSummary={{
          investedAmount: formatInvestmentCurrency(result.totalInvested, currency),
          investedPercent: `${result.futureValue > 0 ? ((result.totalInvested / result.futureValue) * 100).toFixed(1) : 0}%`,
          growthAmount: formatInvestmentCurrency(result.estimatedReturns, currency),
          growthPercent: `${result.futureValue > 0 ? ((result.estimatedReturns / result.futureValue) * 100).toFixed(1) : 0}%`,
          totalAmount: formatInvestmentCurrency(result.futureValue, currency),
        }}
        scheduleRows={printableScheduleRows}
        scheduleTitle="Annual Compounding Schedule Summary"
      />
    </div>
  );
}
