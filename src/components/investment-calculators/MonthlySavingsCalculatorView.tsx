"use client";

import { InvestmentCalculatorSEOContent } from "./shared/InvestmentCalculatorSEOContent";
import { INVESTMENT_SEO_CONTENT } from "@/lib/investment-calculators/seoContentData";
import { InvestmentContextualFeatures } from "./shared/InvestmentContextualFeatures";
import { trackCalculatorEvent } from "@/lib/investment-calculators/analytics";

import React, { useState, useMemo } from "react";
import { SupportedCurrency, formatInvestmentCurrency } from "@/lib/investment-calculators/currencies";
import { calculateMonthlySavings } from "@/lib/investment-calculators/engines/monthlySavings";
import { ContributionTiming } from "@/lib/investment-calculators/types";
import { InvestmentBreadcrumb } from "./shared/InvestmentBreadcrumb";
import { InvestmentCalculatorHero } from "./shared/InvestmentCalculatorHero";
import { InvestmentCurrencySelector } from "./shared/InvestmentCurrencySelector";
import { InvestmentVisualBreakdown } from "./shared/InvestmentVisualBreakdown";
import { InvestmentScheduleTable } from "./shared/InvestmentScheduleTable";
import { InvestmentCalculatorFAQ, FAQItem } from "./shared/InvestmentCalculatorFAQ";
import { InvestmentRelatedTools, RelatedToolItem } from "./shared/InvestmentRelatedTools";
import { InvestmentProductCTA } from "./shared/InvestmentProductCTA";
import { InvestmentPrintReport, ReportInputParam, ReportScheduleRow } from "./shared/InvestmentPrintReport";
import { Copy, Check, RotateCcw, PiggyBank, DollarSign, Calendar, Printer } from "lucide-react";

const FAQS: FAQItem[] = [
  {
    question: "How do monthly savings compound over time?",
    answer: "Every monthly deposit adds to your principal balance. In each subsequent period, you earn interest not only on your deposits, but also on the interest previously credited. Over several years, this compound effect produces exponential wealth growth.",
  },
  {
    question: "What is the difference between ordinary cash savings and compound interest savings?",
    answer: "With 0% interest cash savings (like a safe or zero-interest checking account), your final balance is simply your total deposits. With interest accounts, compound returns add a substantial interest bonus on top of your deposited money.",
  },
];

const RELATED_TOOLS: RelatedToolItem[] = [
  {
    name: "Savings Goal Calculator",
    href: "/free-tools/savings-goal-calculator",
    description: "Calculate the exact monthly deposit needed to reach a targeted savings balance.",
    tag: "Target",
  },
  {
    name: "SIP Calculator",
    href: "/free-tools/sip-calculator",
    description: "Model higher-yielding market-linked mutual fund and index investments.",
    tag: "Investing",
  },
  {
    name: "Emergency Fund Calculator",
    href: "/free-tools/emergency-fund-calculator",
    description: "Determine your ideal cash reserve for essential living expenses.",
    tag: "Safety",
  },
];

export function MonthlySavingsCalculatorView() {
  const [currency, setCurrency] = useState<SupportedCurrency>("USD");
  const [initialSavings, setInitialSavings] = useState<number>(5000);
  const [monthlyContribution, setMonthlyContribution] = useState<number>(300);
  const [annualInterestRate, setAnnualInterestRate] = useState<number>(5);
  const [durationYears, setDurationYears] = useState<number>(5);
  const [timing, setTiming] = useState<ContributionTiming>("end");
  const [copied, setCopied] = useState(false);

  const result = useMemo(() => {
    return calculateMonthlySavings({
      initialSavings,
      monthlyContribution,
      annualInterestRate,
      durationYears,
      timing,
      currency,
    });
  }, [initialSavings, monthlyContribution, annualInterestRate, durationYears, timing, currency]);

  const handleReset = () => {
    setInitialSavings(5000);
    setMonthlyContribution(300);
    setAnnualInterestRate(5);
    setDurationYears(5);
    setTiming("end");
  };

  const handleCopySummary = () => {
    trackCalculatorEvent("calculator_copy_summary", { tool: "monthly-savings-calculator" });
    const summary = [
      "=== Saviora Monthly Savings Growth Summary ===",
      `Initial Deposit: ${formatInvestmentCurrency(result.initialSavings, currency)}`,
      `Monthly Savings: ${formatInvestmentCurrency(result.monthlyContribution, currency)} / month`,
      `Total Savings Period: ${durationYears} Years (${result.totalMonths} months)`,
      `Interest Rate: ${annualInterestRate}% p.a.`,
      `Total Principal Saved: ${formatInvestmentCurrency(result.totalPrincipal, currency)}`,
      `Total Interest Earned: ${formatInvestmentCurrency(result.totalInterestEarned, currency)}`,
      `Final Accumulated Balance: ${formatInvestmentCurrency(result.finalBalance, currency)}`,
      `Interest Bonus vs Cash: +${formatInvestmentCurrency(result.interestAdvantage, currency)}`,
      "Generated at: https://saviora.app/free-tools/monthly-savings-calculator",
    ].join("\n");

    navigator.clipboard.writeText(summary);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handlePrint = () => {
    trackCalculatorEvent("calculator_print_report", { tool: "monthly-savings-calculator" });
    window.print();
  };

  const inputParams: ReportInputParam[] = [
    { label: "Initial Savings Deposit", value: formatInvestmentCurrency(initialSavings, currency) },
    { label: "Monthly Savings Contribution", value: `${formatInvestmentCurrency(monthlyContribution, currency)} / mo` },
    { label: "Savings Duration", value: `${durationYears} Years (${result.totalMonths} months)` },
    { label: "Annual Interest Rate", value: `${annualInterestRate}% p.a.` },
    { label: "Deposit Timing", value: timing === "beginning" ? "Beginning of Month" : "End of Month" },
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
        <InvestmentBreadcrumb items={[{ label: "Monthly Savings Calculator" }]} />

        <InvestmentCalculatorHero
          badge="Compound Savings Planner"
          title="Monthly Savings Calculator – Grow Regular Deposits"
          description="Estimate how much your money will grow through disciplined monthly bank deposits, high-yield savings accounts, and fixed-income instruments."
        />

        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Form */}
          <div className="lg:col-span-7 bg-white rounded-2xl p-6 sm:p-7 border border-slate-200/80 shadow-xs">
            <div className="flex items-center justify-between pb-4 mb-6 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <PiggyBank className="w-5 h-5 text-emerald-600" />
                <h2 className="text-base font-bold text-slate-900">Savings Plan Parameters</h2>
              </div>
              <InvestmentCurrencySelector value={currency} onChange={setCurrency} />
            </div>

            <div className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Initial Deposit ({currency})
                  </label>
                  <input
                    type="number"
                    min="0"
                    step="500"
                    value={initialSavings || ""}
                    onChange={(e) => setInitialSavings(Math.max(0, parseFloat(e.target.value) || 0))}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm font-semibold text-slate-900 focus:bg-white focus:ring-2 focus:ring-emerald-500 transition"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Monthly Contribution ({currency})
                  </label>
                  <input
                    type="number"
                    min="0"
                    step="50"
                    value={monthlyContribution || ""}
                    onChange={(e) => setMonthlyContribution(Math.max(0, parseFloat(e.target.value) || 0))}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm font-semibold text-slate-900 focus:bg-white focus:ring-2 focus:ring-emerald-500 transition"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Annual Interest Rate (%)
                  </label>
                  <input
                    type="number"
                    min="0"
                    max="25"
                    step="0.25"
                    value={annualInterestRate || ""}
                    onChange={(e) => setAnnualInterestRate(Math.max(0, parseFloat(e.target.value) || 0))}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm font-semibold text-slate-900 focus:bg-white focus:ring-2 focus:ring-emerald-500 transition"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Duration (Years)
                  </label>
                  <input
                    type="number"
                    min="0.5"
                    max="50"
                    step="0.5"
                    value={durationYears || ""}
                    onChange={(e) => setDurationYears(Math.max(0.5, parseFloat(e.target.value) || 1))}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm font-semibold text-slate-900 focus:bg-white focus:ring-2 focus:ring-emerald-500 transition"
                  />
                </div>
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
                  <option value="end">End of Month (Standard)</option>
                  <option value="beginning">Beginning of Month</option>
                </select>
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
                  Final Savings Balance
                </span>
                <span className="text-xs font-semibold text-emerald-700 bg-emerald-100/70 px-2 py-0.5 rounded-full">
                  +{result.growthPercentage.toFixed(1)}% Growth
                </span>
              </div>

              <div className="mt-4 text-center">
                <div className="text-3xl sm:text-4xl font-black text-slate-900 font-mono tracking-tight">
                  {formatInvestmentCurrency(result.finalBalance, currency)}
                </div>
                <p className="text-xs text-slate-600 mt-1 font-medium">
                  After {durationYears} years ({result.totalMonths} monthly deposits)
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
                  <p className="text-slate-500">Total Principal Saved</p>
                  <p className="text-sm font-bold text-slate-900 font-mono mt-0.5">
                    {formatInvestmentCurrency(result.totalPrincipal, currency)}
                  </p>
                </div>
                <div className="p-3 bg-white/80 rounded-xl border border-emerald-100">
                  <p className="text-slate-500">Interest Earned</p>
                  <p className="text-sm font-bold text-emerald-700 font-mono mt-0.5">
                    +{formatInvestmentCurrency(result.totalInterestEarned, currency)}
                  </p>
                </div>
              </div>
            </div>

            {/* Visual Breakdown */}
            <InvestmentVisualBreakdown
              title="Savings Balance Components"
              currency={currency}
              segments={[
                { label: "Starting Deposit", amount: result.initialSavings, color: "bg-slate-600" },
                { label: "Monthly Deposits", amount: result.totalContributions, color: "bg-indigo-600" },
                { label: "Interest Earned", amount: result.totalInterestEarned, color: "bg-emerald-500" },
              ]}
            />
          </div>
        </div>

        {/* Schedule */}
        <InvestmentScheduleTable
          schedule={result.yearlySchedule}
          currency={currency}
          title="Annual Savings Growth Progression"
          subtitle="Cumulative yearly balance showing monthly contributions combined with compound interest."
        />

        {/* Educational SEO Content & Methodology */}
        {INVESTMENT_SEO_CONTENT["monthly-savings-calculator"] && (
          <InvestmentCalculatorSEOContent {...INVESTMENT_SEO_CONTENT["monthly-savings-calculator"]} />
        )}

        {/* FAQs */}
        <InvestmentCalculatorFAQ faqs={FAQS} />

        {/* Related Tools */}
        <InvestmentRelatedTools tools={RELATED_TOOLS} />

        {/* Contextual Saviora Core Features */}
        <InvestmentContextualFeatures currentCategory="Cash Savings" />

        {/* Saviora Product CTA */}
        <InvestmentProductCTA />
      </div>

      {/* Official Printable Assessment Report */}
      <InvestmentPrintReport
        reportTitle="Monthly Savings &amp; Compounding Assessment Report"
        calculatorName="Monthly Savings Calculator"
        currency={currency}
        inputParams={inputParams}
        primaryMetric={{
          label: "Final Accumulated Savings Balance",
          value: formatInvestmentCurrency(result.finalBalance, currency),
          subtext: `Total Interest Earned: ${formatInvestmentCurrency(result.totalInterestEarned, currency)} (+${result.growthPercentage.toFixed(1)}%)`,
        }}
        keyMetrics={[
          { label: "Initial Deposit", value: formatInvestmentCurrency(result.initialSavings, currency) },
          { label: "Total Monthly Deposits", value: formatInvestmentCurrency(result.totalContributions, currency) },
          { label: "Total Principal Saved", value: formatInvestmentCurrency(result.totalPrincipal, currency) },
          { label: "Interest Bonus vs Cash", value: formatInvestmentCurrency(result.interestAdvantage, currency) },
          { label: "Savings Duration", value: `${durationYears} Years` },
        ]}
        breakdownSummary={{
          investedAmount: formatInvestmentCurrency(result.totalPrincipal, currency),
          investedPercent: `${result.finalBalance > 0 ? ((result.totalPrincipal / result.finalBalance) * 100).toFixed(1) : 0}%`,
          growthAmount: formatInvestmentCurrency(result.totalInterestEarned, currency),
          growthPercent: `${result.finalBalance > 0 ? ((result.totalInterestEarned / result.finalBalance) * 100).toFixed(1) : 0}%`,
          totalAmount: formatInvestmentCurrency(result.finalBalance, currency),
        }}
        scheduleRows={printableScheduleRows}
        scheduleTitle="Annual Savings Schedule Summary"
      />
    </div>
  );
}
