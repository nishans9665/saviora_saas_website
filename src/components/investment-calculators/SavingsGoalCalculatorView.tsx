"use client";

import { InvestmentCalculatorSEOContent } from "./shared/InvestmentCalculatorSEOContent";
import { INVESTMENT_SEO_CONTENT } from "@/lib/investment-calculators/seoContentData";
import { InvestmentContextualFeatures } from "./shared/InvestmentContextualFeatures";
import { trackCalculatorEvent } from "@/lib/investment-calculators/analytics";

import React, { useState, useMemo } from "react";
import { SupportedCurrency, formatInvestmentCurrency } from "@/lib/investment-calculators/currencies";
import { calculateSavingsGoal } from "@/lib/investment-calculators/engines/savingsGoal";
import { InvestmentBreadcrumb } from "./shared/InvestmentBreadcrumb";
import { InvestmentCalculatorHero } from "./shared/InvestmentCalculatorHero";
import { InvestmentCurrencySelector } from "./shared/InvestmentCurrencySelector";
import { InvestmentVisualBreakdown } from "./shared/InvestmentVisualBreakdown";
import { InvestmentScheduleTable } from "./shared/InvestmentScheduleTable";
import { InvestmentCalculatorFAQ, FAQItem } from "./shared/InvestmentCalculatorFAQ";
import { InvestmentRelatedTools, RelatedToolItem } from "./shared/InvestmentRelatedTools";
import { InvestmentProductCTA } from "./shared/InvestmentProductCTA";
import { InvestmentPrintReport, ReportInputParam, ReportScheduleRow } from "./shared/InvestmentPrintReport";
import { Copy, Check, RotateCcw, Target, DollarSign, Calendar, Clock, Printer } from "lucide-react";

const FAQS: FAQItem[] = [
  {
    question: "What is a Sinking Fund calculation?",
    answer: "A sinking fund calculation determines the exact amount of money you must set aside periodically into an interest-bearing account so that the accumulated contributions plus compound interest equal your predetermined financial target by a specific deadline.",
  },
  {
    question: "What happens if I already have current savings?",
    answer: "Our calculator automatically compounds your existing savings forward to your target date. This reduces the remaining amount you need to save from your monthly income.",
  },
  {
    question: "How does the interest rate impact my required monthly savings?",
    answer: "A higher interest or return rate means compound interest does more of the heavy lifting. This directly lowers the monthly cash deposit needed out of your paycheck.",
  },
];

const RELATED_TOOLS: RelatedToolItem[] = [
  {
    name: "Monthly Savings Calculator",
    href: "/free-tools/monthly-savings-calculator",
    description: "Determine how much a fixed monthly savings habit will accumulate over time.",
    tag: "Savings",
  },
  {
    name: "Emergency Fund Calculator",
    href: "/free-tools/emergency-fund-calculator",
    description: "Calculate your ideal 3 to 12-month emergency cash buffer.",
    tag: "Safety",
  },
  {
    name: "SIP Calculator",
    href: "/free-tools/sip-calculator",
    description: "Calculate market-linked returns from disciplined index and ETF investments.",
    tag: "Investing",
  },
];

export function SavingsGoalCalculatorView() {
  const [currency, setCurrency] = useState<SupportedCurrency>("USD");
  const [goalAmount, setGoalAmount] = useState<number>(50000);
  const [currentSavings, setCurrentSavings] = useState<number>(10000);
  const [durationYears, setDurationYears] = useState<number>(3);
  const [annualInterestRate, setAnnualInterestRate] = useState<number>(6);
  const [copied, setCopied] = useState(false);

  const result = useMemo(() => {
    return calculateSavingsGoal({
      goalAmount,
      currentSavings,
      durationYears,
      annualInterestRate,
      currency,
    });
  }, [goalAmount, currentSavings, durationYears, annualInterestRate, currency]);

  const handleReset = () => {
    setGoalAmount(50000);
    setCurrentSavings(10000);
    setDurationYears(3);
    setAnnualInterestRate(6);
  };

  const handleCopySummary = () => {
    trackCalculatorEvent("calculator_copy_summary", { tool: "savings-goal-calculator" });
    const summary = [
      "=== Saviora Savings Goal Plan Summary ===",
      `Target Goal Amount: ${formatInvestmentCurrency(result.goalAmount, currency)}`,
      `Current Savings: ${formatInvestmentCurrency(result.currentSavings, currency)}`,
      `Target Duration: ${durationYears} Years (${Math.round(durationYears * 12)} months)`,
      `Expected Interest Rate: ${annualInterestRate}% p.a.`,
      `Required Monthly Contribution: ${formatInvestmentCurrency(result.requiredMonthlyContribution, currency)} / month`,
      `Required Weekly Contribution: ${formatInvestmentCurrency(result.requiredWeeklyContribution, currency)} / week`,
      `Total Contributions Needed: ${formatInvestmentCurrency(result.totalContributionsNeeded, currency)}`,
      `Estimated Interest Earned: ${formatInvestmentCurrency(result.totalInterestEarned, currency)}`,
      `Goal Status: ${result.isAlreadyAchieved ? "Goal Already Achieved!" : "In Progress"}`,
      "Generated at: https://saviora.app/free-tools/savings-goal-calculator",
    ].join("\n");

    navigator.clipboard.writeText(summary);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handlePrint = () => {
    trackCalculatorEvent("calculator_print_report", { tool: "savings-goal-calculator" });
    window.print();
  };

  const inputParams: ReportInputParam[] = [
    { label: "Target Goal Amount", value: formatInvestmentCurrency(goalAmount, currency) },
    { label: "Current Savings Balance", value: formatInvestmentCurrency(currentSavings, currency) },
    { label: "Timeframe to Goal", value: `${durationYears} Years (${Math.round(durationYears * 12)} months)` },
    { label: "Expected Annual Return", value: `${annualInterestRate}% p.a.` },
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
        <InvestmentBreadcrumb items={[{ label: "Savings Goal Calculator" }]} />

        <InvestmentCalculatorHero
          badge="Sinking Fund & Target Planner"
          title="Savings Goal Calculator – Plan Your Target"
          description="Determine exactly how much you need to set aside every month or week to achieve a down payment, car purchase, education fund, or travel budget."
        />

        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Form */}
          <div className="lg:col-span-7 bg-white rounded-2xl p-6 sm:p-7 border border-slate-200/80 shadow-xs">
            <div className="flex items-center justify-between pb-4 mb-6 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <Target className="w-5 h-5 text-emerald-600" />
                <h2 className="text-base font-bold text-slate-900">Savings Target Parameters</h2>
              </div>
              <InvestmentCurrencySelector value={currency} onChange={setCurrency} />
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Target Savings Goal ({currency})
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-2.5 text-xs font-bold text-slate-400">
                    <DollarSign className="w-4 h-4 text-slate-400" />
                  </span>
                  <input
                    type="number"
                    min="100"
                    step="500"
                    value={goalAmount || ""}
                    onChange={(e) => setGoalAmount(Math.max(0, parseFloat(e.target.value) || 0))}
                    className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm font-semibold text-slate-900 focus:bg-white focus:ring-2 focus:ring-emerald-500 transition"
                    placeholder="50000"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Current Savings Already Saved ({currency})
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-2.5 text-xs font-bold text-slate-400">
                    <DollarSign className="w-4 h-4 text-slate-400" />
                  </span>
                  <input
                    type="number"
                    min="0"
                    step="500"
                    value={currentSavings || ""}
                    onChange={(e) => setCurrentSavings(Math.max(0, parseFloat(e.target.value) || 0))}
                    className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm font-semibold text-slate-900 focus:bg-white focus:ring-2 focus:ring-emerald-500 transition"
                    placeholder="10000"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Timeframe to Reach Goal (Years)
                  </label>
                  <div className="relative">
                    <span className="absolute left-3 top-2.5 text-xs font-bold text-slate-400">
                      <Calendar className="w-4 h-4 text-slate-400" />
                    </span>
                    <input
                      type="number"
                      min="0.2"
                      max="40"
                      step="0.5"
                      value={durationYears || ""}
                      onChange={(e) => setDurationYears(Math.max(0.2, parseFloat(e.target.value) || 1))}
                      className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm font-semibold text-slate-900 focus:bg-white focus:ring-2 focus:ring-emerald-500 transition"
                      placeholder="3"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Expected Interest / Return Rate (%)
                  </label>
                  <input
                    type="number"
                    min="0"
                    max="30"
                    step="0.25"
                    value={annualInterestRate || ""}
                    onChange={(e) => setAnnualInterestRate(Math.max(0, parseFloat(e.target.value) || 0))}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm font-semibold text-slate-900 focus:bg-white focus:ring-2 focus:ring-emerald-500 transition"
                    placeholder="6"
                  />
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

          {/* Right Column: Required Contribution Summary */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-gradient-to-br from-emerald-50 via-white to-teal-50 rounded-2xl p-6 sm:p-7 border border-emerald-200/80 shadow-xs">
              <div className="flex items-center justify-between pb-3 border-b border-emerald-100">
                <span className="text-xs font-bold uppercase tracking-wider text-emerald-800">
                  Required Monthly Contribution
                </span>
                <span className="text-xs font-semibold text-emerald-700 bg-emerald-100/70 px-2 py-0.5 rounded-full">
                  {result.isAlreadyAchieved ? "Goal Reached" : "Required Deposit"}
                </span>
              </div>

              <div className="mt-4 text-center">
                <div className="text-3xl sm:text-4xl font-black text-slate-900 font-mono tracking-tight">
                  {formatInvestmentCurrency(result.requiredMonthlyContribution, currency)} <span className="text-base font-normal text-slate-500">/ mo</span>
                </div>
                <p className="text-xs text-slate-600 mt-1 font-medium">
                  Equivalent to {formatInvestmentCurrency(result.requiredWeeklyContribution, currency)} per week
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
                  <span>{copied ? "Copied!" : "Copy Plan"}</span>
                </button>
              </div>

              {/* Metrics */}
              <div className="mt-5 grid grid-cols-2 gap-3 pt-4 border-t border-emerald-100 text-xs">
                <div className="p-3 bg-white/80 rounded-xl border border-emerald-100">
                  <p className="text-slate-500">Total Cash to Save</p>
                  <p className="text-sm font-bold text-slate-900 font-mono mt-0.5">
                    {formatInvestmentCurrency(result.totalContributionsNeeded, currency)}
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
              title="Target Goal Funding Source"
              currency={currency}
              segments={[
                { label: "Current Savings", amount: result.currentSavings, color: "bg-slate-600" },
                { label: "New Contributions", amount: result.totalContributionsNeeded, color: "bg-indigo-600" },
                { label: "Interest Earned", amount: result.totalInterestEarned, color: "bg-emerald-500" },
              ]}
            />
          </div>
        </div>

        {/* Schedule */}
        <InvestmentScheduleTable
          schedule={result.yearlySchedule}
          currency={currency}
          title="Savings Goal Accumulation Plan"
          subtitle="Annual breakdown showing how periodic deposits and compound interest close the gap to your target."
        />

        {/* Educational SEO Content & Methodology */}
        {INVESTMENT_SEO_CONTENT["savings-goal-calculator"] && (
          <InvestmentCalculatorSEOContent {...INVESTMENT_SEO_CONTENT["savings-goal-calculator"]} />
        )}

        {/* FAQs */}
        <InvestmentCalculatorFAQ faqs={FAQS} />

        {/* Related Tools */}
        <InvestmentRelatedTools tools={RELATED_TOOLS} />

        {/* Contextual Saviora Core Features */}
        <InvestmentContextualFeatures currentCategory="Goal-Based Savings" />

        {/* Saviora Product CTA */}
        <InvestmentProductCTA />
      </div>

      {/* Official Printable Assessment Report */}
      <InvestmentPrintReport
        reportTitle="Savings Goal &amp; Target Assessment Report"
        calculatorName="Savings Goal Calculator"
        currency={currency}
        inputParams={inputParams}
        primaryMetric={{
          label: "Required Monthly Contribution",
          value: `${formatInvestmentCurrency(result.requiredMonthlyContribution, currency)} / month`,
          subtext: `Weekly Equivalent: ${formatInvestmentCurrency(result.requiredWeeklyContribution, currency)} / week`,
        }}
        keyMetrics={[
          { label: "Target Goal", value: formatInvestmentCurrency(result.goalAmount, currency) },
          { label: "Current Savings", value: formatInvestmentCurrency(result.currentSavings, currency) },
          { label: "Total New Deposits", value: formatInvestmentCurrency(result.totalContributionsNeeded, currency) },
          { label: "Interest Yield", value: formatInvestmentCurrency(result.totalInterestEarned, currency) },
          { label: "Target Horizon", value: `${durationYears} Years` },
        ]}
        breakdownSummary={{
          investedAmount: formatInvestmentCurrency(result.currentSavings + result.totalContributionsNeeded, currency),
          investedPercent: `${result.goalAmount > 0 ? (((result.currentSavings + result.totalContributionsNeeded) / result.goalAmount) * 100).toFixed(1) : 0}%`,
          growthAmount: formatInvestmentCurrency(result.totalInterestEarned, currency),
          growthPercent: `${result.goalAmount > 0 ? ((result.totalInterestEarned / result.goalAmount) * 100).toFixed(1) : 0}%`,
          totalAmount: formatInvestmentCurrency(result.goalAmount, currency),
        }}
        scheduleRows={printableScheduleRows}
        scheduleTitle="Annual Savings Accumulation Schedule"
      />
    </div>
  );
}
