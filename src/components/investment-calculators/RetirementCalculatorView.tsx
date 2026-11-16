"use client";

import { InvestmentCalculatorSEOContent } from "./shared/InvestmentCalculatorSEOContent";
import { INVESTMENT_SEO_CONTENT } from "@/lib/investment-calculators/seoContentData";
import { InvestmentContextualFeatures } from "./shared/InvestmentContextualFeatures";
import { trackCalculatorEvent } from "@/lib/investment-calculators/analytics";

import React, { useState, useMemo } from "react";
import { SupportedCurrency, formatInvestmentCurrency } from "@/lib/investment-calculators/currencies";
import { calculateRetirement } from "@/lib/investment-calculators/engines/retirement";
import { InvestmentBreadcrumb } from "./shared/InvestmentBreadcrumb";
import { InvestmentCalculatorHero } from "./shared/InvestmentCalculatorHero";
import { InvestmentCurrencySelector } from "./shared/InvestmentCurrencySelector";
import { InvestmentVisualBreakdown } from "./shared/InvestmentVisualBreakdown";
import { InvestmentScheduleTable } from "./shared/InvestmentScheduleTable";
import { InvestmentCalculatorFAQ, FAQItem } from "./shared/InvestmentCalculatorFAQ";
import { InvestmentRelatedTools, RelatedToolItem } from "./shared/InvestmentRelatedTools";
import { InvestmentProductCTA } from "./shared/InvestmentProductCTA";
import { InvestmentPrintReport, ReportInputParam, ReportScheduleRow } from "./shared/InvestmentPrintReport";
import { Copy, Check, RotateCcw, HeartHandshake, DollarSign, Calendar, Clock, AlertTriangle, ShieldCheck, Printer } from "lucide-react";

const FAQS: FAQItem[] = [
  {
    question: "How does inflation affect my retirement corpus?",
    answer: "A fixed dollar amount in 20 or 30 years will have significantly less purchasing power than today. For example, with an average inflation rate of 2.5% to 3%, a $4,000 monthly living cost today will require over $8,500 to $9,500 monthly by the time you retire 30 years from now. Our calculator automatically adjusts for this inflation gap.",
  },
  {
    question: "What is the difference between nominal returns and real returns?",
    answer: "Nominal return is the raw annual growth percentage before factoring in inflation. Real return is the net growth after subtracting inflation (Real Return ≈ Nominal Return - Inflation). Real return determines whether your true purchasing power expands.",
  },
  {
    question: "Are retirement models guaranteed?",
    answer: "No. All projections are illustrative estimates based on user assumptions. Real retirement security depends on market volatility, health costs, statutory pensions, and dynamic withdrawal choices.",
  },
];

const RELATED_TOOLS: RelatedToolItem[] = [
  {
    name: "Inflation Calculator",
    href: "/free-tools/inflation-calculator",
    description: "Analyze how inflation erodes purchasing power over 1 to 30 years.",
    tag: "Inflation",
  },
  {
    name: "Investment Growth Calculator",
    href: "/free-tools/investment-growth-calculator",
    description: "Model long-term compounding with periodic contributions and fee adjustments.",
    tag: "Wealth",
  },
  {
    name: "SIP Calculator",
    href: "/free-tools/sip-calculator",
    description: "Estimate wealth accumulated through disciplined monthly mutual fund contributions.",
    tag: "SIP",
  },
];

export function RetirementCalculatorView() {
  const [currency, setCurrency] = useState<SupportedCurrency>("USD");
  const [currentAge, setCurrentAge] = useState<number>(30);
  const [retirementAge, setRetirementAge] = useState<number>(65);
  const [currentSavings, setCurrentSavings] = useState<number>(25000);
  const [monthlyContribution, setMonthlyContribution] = useState<number>(1000);
  const [desiredMonthlyRetirementIncome, setDesiredMonthlyRetirementIncome] = useState<number>(4000);
  const [expectedAnnualReturn, setExpectedAnnualReturn] = useState<number>(7);
  const [expectedInflationRate, setExpectedInflationRate] = useState<number>(2.5);
  const [retirementDurationYears, setRetirementDurationYears] = useState<number>(25);
  const [copied, setCopied] = useState(false);

  const result = useMemo(() => {
    return calculateRetirement({
      currentAge,
      retirementAge,
      currentSavings,
      monthlyContribution,
      desiredMonthlyRetirementIncome,
      expectedAnnualReturn,
      expectedInflationRate,
      retirementDurationYears,
      currency,
    });
  }, [currentAge, retirementAge, currentSavings, monthlyContribution, desiredMonthlyRetirementIncome, expectedAnnualReturn, expectedInflationRate, retirementDurationYears, currency]);

  const handleReset = () => {
    setCurrentAge(30);
    setRetirementAge(65);
    setCurrentSavings(25000);
    setMonthlyContribution(1000);
    setDesiredMonthlyRetirementIncome(4000);
    setExpectedAnnualReturn(7);
    setExpectedInflationRate(2.5);
    setRetirementDurationYears(25);
  };

  const handleCopySummary = () => {
    trackCalculatorEvent("calculator_copy_summary", { tool: "retirement-calculator" });
    const summary = [
      "=== Saviora Retirement Assessment Summary ===",
      `Current Age: ${currentAge} | Planned Retirement Age: ${retirementAge} (${result.yearsToRetire} years to retirement)`,
      `Current Retirement Savings: ${formatInvestmentCurrency(currentSavings, currency)}`,
      `Monthly Contribution: ${formatInvestmentCurrency(monthlyContribution, currency)} / month`,
      `Estimated Fund at Retirement: ${formatInvestmentCurrency(result.projectedFundAtRetirement, currency)}`,
      `Required Retirement Corpus: ${formatInvestmentCurrency(result.requiredRetirementCorpus, currency)}`,
      `Inflation-Adjusted Monthly Income: ${formatInvestmentCurrency(result.futureMonthlyIncomeAtRetirement, currency)} / month`,
      `Retirement Funding Status: ${result.isFunded ? "Fully Funded / Surplus" : `Shortfall of ${formatInvestmentCurrency(Math.abs(result.shortfallOrSurplus), currency)}`}`,
      `Recommended Monthly Contribution: ${formatInvestmentCurrency(result.recommendedMonthlySavings, currency)} / month`,
      "Generated at: https://saviora.app/free-tools/retirement-calculator",
    ].join("\n");

    navigator.clipboard.writeText(summary);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handlePrint = () => {
    trackCalculatorEvent("calculator_print_report", { tool: "retirement-calculator" });
    window.print();
  };

  const inputParams: ReportInputParam[] = [
    { label: "Current Age / Retirement Age", value: `${currentAge} / ${retirementAge} (${result.yearsToRetire} years horizon)` },
    { label: "Current Retirement Savings", value: formatInvestmentCurrency(currentSavings, currency) },
    { label: "Monthly Savings Contribution", value: `${formatInvestmentCurrency(monthlyContribution, currency)} / mo` },
    { label: "Desired Monthly Income (Today's Value)", value: formatInvestmentCurrency(desiredMonthlyRetirementIncome, currency) },
    { label: "Assumed Annual Return / Inflation", value: `${expectedAnnualReturn}% Return / ${expectedInflationRate}% Inflation` },
    { label: "Retirement Duration", value: `${retirementDurationYears} Years` },
    { label: "Reporting Currency", value: currency },
  ];

  const printableScheduleRows: ReportScheduleRow[] = result.timeline.slice(0, 30).map((r) => ({
    period: `Age ${r.age} (Yr ${r.year})`,
    startingBalance: formatInvestmentCurrency(r.startingBalance, currency),
    contributions: r.phase === "accumulation"
      ? formatInvestmentCurrency(r.contributionsOrWithdrawals, currency)
      : `-${formatInvestmentCurrency(Math.abs(r.contributionsOrWithdrawals), currency)}`,
    growth: formatInvestmentCurrency(r.investmentGrowth, currency),
    endingBalance: formatInvestmentCurrency(r.endingBalance, currency),
  }));

  return (
    <div className="pt-32 sm:pt-36 lg:pt-40 pb-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* On-screen Interactive UI */}
      <div className="print:hidden">
        <InvestmentBreadcrumb items={[{ label: "Retirement Calculator" }]} />

        <InvestmentCalculatorHero
          badge="Retirement Readiness & Wealth Planner"
          title="Retirement Calculator – Plan Your Nest Egg"
          description="Project how your savings accumulate, factor in future inflation-adjusted living expenses, and estimate the retirement corpus required for lifelong financial independence."
        />

        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Form */}
          <div className="lg:col-span-7 bg-white rounded-2xl p-6 sm:p-7 border border-slate-200/80 shadow-xs">
            <div className="flex items-center justify-between pb-4 mb-6 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <HeartHandshake className="w-5 h-5 text-emerald-600" />
                <h2 className="text-base font-bold text-slate-900">Retirement Assumptions</h2>
              </div>
              <InvestmentCurrencySelector value={currency} onChange={setCurrency} />
            </div>

            <div className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Current Age
                  </label>
                  <input
                    type="number"
                    min="18"
                    max="90"
                    value={currentAge || ""}
                    onChange={(e) => setCurrentAge(Math.max(18, parseInt(e.target.value) || 18))}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm font-semibold text-slate-900 focus:bg-white focus:ring-2 focus:ring-emerald-500 transition"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Planned Retirement Age
                  </label>
                  <input
                    type="number"
                    min={currentAge + 1}
                    max="100"
                    value={retirementAge || ""}
                    onChange={(e) => setRetirementAge(Math.max(currentAge + 1, parseInt(e.target.value) || 65))}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm font-semibold text-slate-900 focus:bg-white focus:ring-2 focus:ring-emerald-500 transition"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Current Savings ({currency})
                  </label>
                  <input
                    type="number"
                    min="0"
                    step="1000"
                    value={currentSavings || ""}
                    onChange={(e) => setCurrentSavings(Math.max(0, parseFloat(e.target.value) || 0))}
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

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Desired Monthly Income in Retirement ({currency} in Today&apos;s Dollars)
                </label>
                <input
                  type="number"
                  min="500"
                  step="250"
                  value={desiredMonthlyRetirementIncome || ""}
                  onChange={(e) => setDesiredMonthlyRetirementIncome(Math.max(0, parseFloat(e.target.value) || 0))}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm font-semibold text-slate-900 focus:bg-white focus:ring-2 focus:ring-emerald-500 transition"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2 border-t border-slate-100">
                <div>
                  <label className="block text-[11px] font-semibold text-slate-600 mb-1">
                    Expected Return (%)
                  </label>
                  <input
                    type="number"
                    min="0"
                    max="20"
                    step="0.5"
                    value={expectedAnnualReturn || ""}
                    onChange={(e) => setExpectedAnnualReturn(Math.max(0, parseFloat(e.target.value) || 0))}
                    className="w-full px-2.5 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-xs font-semibold text-slate-900 focus:bg-white focus:ring-2 focus:ring-emerald-500 transition"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-slate-600 mb-1">
                    Inflation Rate (%)
                  </label>
                  <input
                    type="number"
                    min="0"
                    max="15"
                    step="0.5"
                    value={expectedInflationRate || ""}
                    onChange={(e) => setExpectedInflationRate(Math.max(0, parseFloat(e.target.value) || 0))}
                    className="w-full px-2.5 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-xs font-semibold text-slate-900 focus:bg-white focus:ring-2 focus:ring-emerald-500 transition"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-slate-600 mb-1">
                    Retirement Years
                  </label>
                  <input
                    type="number"
                    min="10"
                    max="50"
                    value={retirementDurationYears || ""}
                    onChange={(e) => setRetirementDurationYears(Math.max(5, parseInt(e.target.value) || 25))}
                    className="w-full px-2.5 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-xs font-semibold text-slate-900 focus:bg-white focus:ring-2 focus:ring-emerald-500 transition"
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

          {/* Right Column: Readiness Summary */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-gradient-to-br from-emerald-50 via-white to-teal-50 rounded-2xl p-6 sm:p-7 border border-emerald-200/80 shadow-xs">
              <div className="flex items-center justify-between pb-3 border-b border-emerald-100">
                <span className="text-xs font-bold uppercase tracking-wider text-emerald-800">
                  Projected Fund at Age {retirementAge}
                </span>
                <span className={`text-xs font-bold px-2.5 py-0.5 rounded-full ${result.isFunded ? "bg-emerald-100 text-emerald-800" : "bg-amber-100 text-amber-900"}`}>
                  {result.isFunded ? "Fully Funded" : "Shortfall Gap"}
                </span>
              </div>

              <div className="mt-4 text-center">
                <div className="text-3xl sm:text-4xl font-black text-slate-900 font-mono tracking-tight">
                  {formatInvestmentCurrency(result.projectedFundAtRetirement, currency)}
                </div>
                <p className="text-xs text-slate-600 mt-1 font-medium">
                  Required Corpus: {formatInvestmentCurrency(result.requiredRetirementCorpus, currency)}
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

              {/* Status Box */}
              {!result.isFunded && (
                <div className="mt-4 p-3 rounded-xl bg-amber-50 border border-amber-200/60 text-xs text-amber-900">
                  <p className="font-bold flex items-center gap-1.5">
                    <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0" />
                    <span>Estimated Shortfall: {formatInvestmentCurrency(Math.abs(result.shortfallOrSurplus), currency)}</span>
                  </p>
                  <p className="mt-1 text-[11px] text-amber-800">
                    Consider saving <strong>{formatInvestmentCurrency(result.recommendedMonthlySavings, currency)}/mo</strong> to fully fund your target.
                  </p>
                </div>
              )}

              {/* Metrics */}
              <div className="mt-5 grid grid-cols-2 gap-3 pt-4 border-t border-emerald-100 text-xs">
                <div className="p-3 bg-white/80 rounded-xl border border-emerald-100">
                  <p className="text-slate-500">Future Monthly Cost</p>
                  <p className="text-sm font-bold text-slate-900 font-mono mt-0.5">
                    {formatInvestmentCurrency(result.futureMonthlyIncomeAtRetirement, currency)}
                  </p>
                </div>
                <div className="p-3 bg-white/80 rounded-xl border border-emerald-100">
                  <p className="text-slate-500">Investment Growth</p>
                  <p className="text-sm font-bold text-emerald-700 font-mono mt-0.5">
                    +{formatInvestmentCurrency(result.totalGrowthToRetirement, currency)}
                  </p>
                </div>
              </div>
            </div>

            {/* Visual Breakdown */}
            <InvestmentVisualBreakdown
              title="Retirement Accumulation Breakdown"
              currency={currency}
              segments={[
                { label: "Current Savings", amount: currentSavings, color: "bg-slate-600" },
                { label: "New Contributions", amount: result.totalContributionsToRetirement - currentSavings, color: "bg-indigo-600" },
                { label: "Compound Growth", amount: result.totalGrowthToRetirement, color: "bg-emerald-500" },
              ]}
            />
          </div>
        </div>

        {/* Schedule */}
        <InvestmentScheduleTable
          schedule={result.timeline.map((r) => ({
            year: r.year,
            startingBalance: r.startingBalance,
            contributionsThisYear: r.contributionsOrWithdrawals,
            totalContributionsToDate: 0,
            growthThisYear: r.investmentGrowth,
            totalGrowthToDate: 0,
            endingBalance: r.endingBalance,
          }))}
          currency={currency}
          title="Retirement Lifetime Timeline (Accumulation &amp; Decumulation)"
          subtitle="Year-by-year trajectory leading into retirement age and subsequent retirement living withdrawals."
        />

        {/* Educational SEO Content & Methodology */}
        {INVESTMENT_SEO_CONTENT["retirement-calculator"] && (
          <InvestmentCalculatorSEOContent {...INVESTMENT_SEO_CONTENT["retirement-calculator"]} />
        )}

        {/* FAQs */}
        <InvestmentCalculatorFAQ faqs={FAQS} />

        {/* Related Tools */}
        <InvestmentRelatedTools tools={RELATED_TOOLS} />

        {/* Contextual Saviora Core Features */}
        <InvestmentContextualFeatures currentCategory="Retirement Planning" />

        {/* Saviora Product CTA */}
        <InvestmentProductCTA />
      </div>

      {/* Official Printable Assessment Report */}
      <InvestmentPrintReport
        reportTitle="Retirement Planning &amp; Readiness Assessment Report"
        calculatorName="Retirement Calculator"
        currency={currency}
        inputParams={inputParams}
        primaryMetric={{
          label: "Projected Retirement Fund",
          value: formatInvestmentCurrency(result.projectedFundAtRetirement, currency),
          subtext: `Required Fund: ${formatInvestmentCurrency(result.requiredRetirementCorpus, currency)} (${result.isFunded ? "Fully Funded" : "Shortfall Gap"})`,
        }}
        keyMetrics={[
          { label: "Years to Retire", value: `${result.yearsToRetire} Years` },
          { label: "Retirement Horizon", value: `${result.retirementDurationYears} Years` },
          { label: "Future Monthly Living Cost", value: formatInvestmentCurrency(result.futureMonthlyIncomeAtRetirement, currency) },
          { label: "Compound Wealth", value: formatInvestmentCurrency(result.totalGrowthToRetirement, currency) },
          { label: "Recommended Savings", value: `${formatInvestmentCurrency(result.recommendedMonthlySavings, currency)} / mo` },
        ]}
        breakdownSummary={{
          investedAmount: formatInvestmentCurrency(result.totalContributionsToRetirement, currency),
          investedPercent: `${result.projectedFundAtRetirement > 0 ? ((result.totalContributionsToRetirement / result.projectedFundAtRetirement) * 100).toFixed(1) : 0}%`,
          growthAmount: formatInvestmentCurrency(result.totalGrowthToRetirement, currency),
          growthPercent: `${result.projectedFundAtRetirement > 0 ? ((result.totalGrowthToRetirement / result.projectedFundAtRetirement) * 100).toFixed(1) : 0}%`,
          totalAmount: formatInvestmentCurrency(result.projectedFundAtRetirement, currency),
        }}
        scheduleRows={printableScheduleRows}
        scheduleTitle="Retirement Timeline Schedule"
      />
    </div>
  );
}
