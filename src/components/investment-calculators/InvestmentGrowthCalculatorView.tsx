"use client";

import { InvestmentCalculatorSEOContent } from "./shared/InvestmentCalculatorSEOContent";
import { INVESTMENT_SEO_CONTENT } from "@/lib/investment-calculators/seoContentData";
import { InvestmentContextualFeatures } from "./shared/InvestmentContextualFeatures";
import { trackCalculatorEvent } from "@/lib/investment-calculators/analytics";

import React, { useState, useMemo } from "react";
import { SupportedCurrency, formatInvestmentCurrency } from "@/lib/investment-calculators/currencies";
import { calculateInvestmentGrowth } from "@/lib/investment-calculators/engines/investmentGrowth";
import { ContributionFrequency, CompoundingFrequency, ContributionTiming } from "@/lib/investment-calculators/types";
import { InvestmentBreadcrumb } from "./shared/InvestmentBreadcrumb";
import { InvestmentCalculatorHero } from "./shared/InvestmentCalculatorHero";
import { InvestmentCurrencySelector } from "./shared/InvestmentCurrencySelector";
import { InvestmentVisualBreakdown } from "./shared/InvestmentVisualBreakdown";
import { InvestmentScheduleTable } from "./shared/InvestmentScheduleTable";
import { InvestmentCalculatorFAQ, FAQItem } from "./shared/InvestmentCalculatorFAQ";
import { InvestmentRelatedTools, RelatedToolItem } from "./shared/InvestmentRelatedTools";
import { InvestmentProductCTA } from "./shared/InvestmentProductCTA";
import { InvestmentPrintReport, ReportInputParam, ReportScheduleRow } from "./shared/InvestmentPrintReport";
import { Copy, Check, RotateCcw, TrendingUp, DollarSign, Calendar, Sliders, Printer } from "lucide-react";

const FAQS: FAQItem[] = [
  {
    question: "How do compounding frequencies affect long-term returns?",
    answer: "Compounding frequency determines how often earned returns are converted into working principal. Compounding monthly generates marginally higher returns than compounding annually because earnings begin generating returns sooner.",
  },
  {
    question: "How do expense ratios and investment fees impact portfolio growth?",
    answer: "Even seemingly small annual fees (such as 1% to 2% management expense ratios) significantly erode compounded wealth over 20 to 30 years due to the loss of returns that would otherwise compound on that money.",
  },
];

const RELATED_TOOLS: RelatedToolItem[] = [
  {
    name: "SIP Calculator",
    href: "/free-tools/sip-calculator",
    description: "Calculate standard monthly systematic mutual fund investment growth.",
    tag: "SIP",
  },
  {
    name: "Investment Return Calculator",
    href: "/free-tools/investment-return-calculator",
    description: "Determine historical annualized CAGR returns from real portfolio values.",
    tag: "CAGR",
  },
  {
    name: "Retirement Calculator",
    href: "/free-tools/retirement-calculator",
    description: "Align your portfolio accumulation with future retirement living targets.",
    tag: "Retirement",
  },
];

export function InvestmentGrowthCalculatorView() {
  const [currency, setCurrency] = useState<SupportedCurrency>("USD");
  const [initialInvestment, setInitialInvestment] = useState<number>(20000);
  const [regularContribution, setRegularContribution] = useState<number>(400);
  const [annualReturnRate, setAnnualReturnRate] = useState<number>(8);
  const [durationYears, setDurationYears] = useState<number>(10);
  const [contributionFrequency, setContributionFrequency] = useState<ContributionFrequency>("monthly");
  const [compoundingFrequency, setCompoundingFrequency] = useState<CompoundingFrequency>("monthly");
  const [timing, setTiming] = useState<ContributionTiming>("end");
  const [expenseRatioPercent, setExpenseRatioPercent] = useState<number>(0.5);
  const [copied, setCopied] = useState(false);

  const result = useMemo(() => {
    return calculateInvestmentGrowth({
      initialInvestment,
      regularContribution,
      annualReturnRate,
      durationYears,
      contributionFrequency,
      compoundingFrequency,
      timing,
      expenseRatioPercent,
      currency,
    });
  }, [initialInvestment, regularContribution, annualReturnRate, durationYears, contributionFrequency, compoundingFrequency, timing, expenseRatioPercent, currency]);

  const handleReset = () => {
    setInitialInvestment(20000);
    setRegularContribution(400);
    setAnnualReturnRate(8);
    setDurationYears(10);
    setContributionFrequency("monthly");
    setCompoundingFrequency("monthly");
    setTiming("end");
    setExpenseRatioPercent(0.5);
  };

  const handleCopySummary = () => {
    trackCalculatorEvent("calculator_copy_summary", { tool: "investment-growth-calculator" });
    const summary = [
      "=== Saviora Investment Growth Projection Summary ===",
      `Initial Capital: ${formatInvestmentCurrency(result.initialInvestment, currency)}`,
      `Regular Deposit: ${formatInvestmentCurrency(regularContribution, currency)} (${contributionFrequency})`,
      `Annual Return Assumed: ${annualReturnRate}% (Net of fees: ${result.netAnnualReturnRate}%)`,
      `Investment Horizon: ${durationYears} Years`,
      `Total Invested Capital: ${formatInvestmentCurrency(result.totalInvestedCapital, currency)}`,
      `Compound Growth Earned: ${formatInvestmentCurrency(result.totalGrowthAmount, currency)}`,
      `Net Future Portfolio Value: ${formatInvestmentCurrency(result.netFutureValue, currency)}`,
      `Total Fees Deducted: ${formatInvestmentCurrency(result.totalFeesPaid, currency)}`,
      "Generated at: https://saviora.app/free-tools/investment-growth-calculator",
    ].join("\n");

    navigator.clipboard.writeText(summary);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handlePrint = () => {
    trackCalculatorEvent("calculator_print_report", { tool: "investment-growth-calculator" });
    window.print();
  };

  const inputParams: ReportInputParam[] = [
    { label: "Initial Capital Investment", value: formatInvestmentCurrency(initialInvestment, currency) },
    { label: "Regular Periodic Deposit", value: `${formatInvestmentCurrency(regularContribution, currency)} / ${contributionFrequency}` },
    { label: "Gross Return Rate", value: `${annualReturnRate}% p.a.` },
    { label: "Annual Expense Ratio / Fees", value: `${expenseRatioPercent}% p.a. (Net Return: ${result.netAnnualReturnRate}%)` },
    { label: "Compounding Frequency", value: compoundingFrequency },
    { label: "Investment Horizon", value: `${durationYears} Years` },
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
        <InvestmentBreadcrumb items={[{ label: "Investment Growth Calculator" }]} />

        <InvestmentCalculatorHero
          badge="Long-Term Compound Portfolio Simulator"
          title="Investment Growth Calculator – Future Value"
          description="Simulate the long-term compounding growth of your investment portfolio with recurring contributions, multi-frequency compounding, and expense ratio adjustments."
        />

        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Form */}
          <div className="lg:col-span-7 bg-white rounded-2xl p-6 sm:p-7 border border-slate-200/80 shadow-xs">
            <div className="flex items-center justify-between pb-4 mb-6 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <Sliders className="w-5 h-5 text-emerald-600" />
                <h2 className="text-base font-bold text-slate-900">Portfolio Growth Settings</h2>
              </div>
              <InvestmentCurrencySelector value={currency} onChange={setCurrency} />
            </div>

            <div className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Initial Investment ({currency})
                  </label>
                  <input
                    type="number"
                    min="0"
                    step="1000"
                    value={initialInvestment || ""}
                    onChange={(e) => setInitialInvestment(Math.max(0, parseFloat(e.target.value) || 0))}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm font-semibold text-slate-900 focus:bg-white focus:ring-2 focus:ring-emerald-500 transition"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Regular Deposit ({currency})
                  </label>
                  <input
                    type="number"
                    min="0"
                    step="50"
                    value={regularContribution || ""}
                    onChange={(e) => setRegularContribution(Math.max(0, parseFloat(e.target.value) || 0))}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm font-semibold text-slate-900 focus:bg-white focus:ring-2 focus:ring-emerald-500 transition"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block text-[11px] font-semibold text-slate-700 mb-1">
                    Annual Return (%)
                  </label>
                  <input
                    type="number"
                    min="0"
                    max="30"
                    step="0.5"
                    value={annualReturnRate || ""}
                    onChange={(e) => setAnnualReturnRate(Math.max(0, parseFloat(e.target.value) || 0))}
                    className="w-full px-2.5 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-xs font-semibold text-slate-900 focus:bg-white focus:ring-2 focus:ring-emerald-500 transition"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-slate-700 mb-1">
                    Expense Ratio / Fee (%)
                  </label>
                  <input
                    type="number"
                    min="0"
                    max="5"
                    step="0.1"
                    value={expenseRatioPercent || ""}
                    onChange={(e) => setExpenseRatioPercent(Math.max(0, parseFloat(e.target.value) || 0))}
                    className="w-full px-2.5 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-xs font-semibold text-slate-900 focus:bg-white focus:ring-2 focus:ring-emerald-500 transition"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-slate-700 mb-1">
                    Duration (Years)
                  </label>
                  <input
                    type="number"
                    min="1"
                    max="50"
                    value={durationYears || ""}
                    onChange={(e) => setDurationYears(Math.max(1, parseInt(e.target.value) || 1))}
                    className="w-full px-2.5 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-xs font-semibold text-slate-900 focus:bg-white focus:ring-2 focus:ring-emerald-500 transition"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Contribution Frequency
                  </label>
                  <select
                    value={contributionFrequency}
                    onChange={(e) => setContributionFrequency(e.target.value as ContributionFrequency)}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-900 focus:bg-white focus:ring-2 focus:ring-emerald-500 transition cursor-pointer"
                  >
                    <option value="weekly">Weekly (52/yr)</option>
                    <option value="monthly">Monthly (12/yr)</option>
                    <option value="quarterly">Quarterly (4/yr)</option>
                    <option value="annually">Annually (1/yr)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Compounding Frequency
                  </label>
                  <select
                    value={compoundingFrequency}
                    onChange={(e) => setCompoundingFrequency(e.target.value as CompoundingFrequency)}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-900 focus:bg-white focus:ring-2 focus:ring-emerald-500 transition cursor-pointer"
                  >
                    <option value="daily">Daily</option>
                    <option value="monthly">Monthly</option>
                    <option value="quarterly">Quarterly</option>
                    <option value="semi-annually">Semi-Annually</option>
                    <option value="annually">Annually</option>
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
                  Net Return: {result.netAnnualReturnRate}% p.a.
                </span>
              </div>

              <div className="mt-4 text-center">
                <div className="text-3xl sm:text-4xl font-black text-slate-900 font-mono tracking-tight">
                  {formatInvestmentCurrency(result.netFutureValue, currency)}
                </div>
                <p className="text-xs text-slate-600 mt-1 font-medium">
                  Includes {formatInvestmentCurrency(result.totalGrowthAmount, currency)} in compound growth
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
                  <p className="text-slate-500">Total Invested Capital</p>
                  <p className="text-sm font-bold text-slate-900 font-mono mt-0.5">
                    {formatInvestmentCurrency(result.totalInvestedCapital, currency)}
                  </p>
                </div>
                <div className="p-3 bg-white/80 rounded-xl border border-emerald-100">
                  <p className="text-slate-500">Fees Deducted</p>
                  <p className="text-sm font-bold text-slate-500 font-mono mt-0.5">
                    {formatInvestmentCurrency(result.totalFeesPaid, currency)}
                  </p>
                </div>
              </div>
            </div>

            {/* Visual Breakdown */}
            <InvestmentVisualBreakdown
              title="Portfolio Asset Distribution"
              currency={currency}
              segments={[
                { label: "Initial Deposit", amount: result.initialInvestment, color: "bg-slate-600" },
                { label: "New Contributions", amount: result.totalContributions, color: "bg-indigo-600" },
                { label: "Investment Growth", amount: result.totalGrowthAmount, color: "bg-emerald-500" },
              ]}
            />
          </div>
        </div>

        {/* Schedule */}
        <InvestmentScheduleTable
          schedule={result.yearlySchedule}
          currency={currency}
          title="Year-by-Year Portfolio Compounding Schedule"
          subtitle="Annual breakdown showing capital accumulation, gross returns, and fee deductions."
        />

        {/* Educational SEO Content & Methodology */}
        {INVESTMENT_SEO_CONTENT["investment-growth-calculator"] && (
          <InvestmentCalculatorSEOContent {...INVESTMENT_SEO_CONTENT["investment-growth-calculator"]} />
        )}

        {/* FAQs */}
        <InvestmentCalculatorFAQ faqs={FAQS} />

        {/* Related Tools */}
        <InvestmentRelatedTools tools={RELATED_TOOLS} />

        {/* Contextual Saviora Core Features */}
        <InvestmentContextualFeatures currentCategory="Portfolio Growth" />

        {/* Saviora Product CTA */}
        <InvestmentProductCTA />
      </div>

      {/* Official Printable Assessment Report */}
      <InvestmentPrintReport
        reportTitle="Investment Growth &amp; Portfolio Assessment Report"
        calculatorName="Investment Growth Calculator"
        currency={currency}
        inputParams={inputParams}
        primaryMetric={{
          label: "Net Future Portfolio Value",
          value: formatInvestmentCurrency(result.netFutureValue, currency),
          subtext: `Growth Earned: ${formatInvestmentCurrency(result.totalGrowthAmount, currency)} | Fees: ${formatInvestmentCurrency(result.totalFeesPaid, currency)}`,
        }}
        keyMetrics={[
          { label: "Total Invested Capital", value: formatInvestmentCurrency(result.totalInvestedCapital, currency) },
          { label: "Initial Capital", value: formatInvestmentCurrency(result.initialInvestment, currency) },
          { label: "Recurring Deposits", value: formatInvestmentCurrency(result.totalContributions, currency) },
          { label: "Net Annual Return", value: `${result.netAnnualReturnRate}% p.a.` },
          { label: "Investment Horizon", value: `${durationYears} Years` },
        ]}
        breakdownSummary={{
          investedAmount: formatInvestmentCurrency(result.totalInvestedCapital, currency),
          investedPercent: `${result.netFutureValue > 0 ? ((result.totalInvestedCapital / result.netFutureValue) * 100).toFixed(1) : 0}%`,
          growthAmount: formatInvestmentCurrency(result.totalGrowthAmount, currency),
          growthPercent: `${result.netFutureValue > 0 ? ((result.totalGrowthAmount / result.netFutureValue) * 100).toFixed(1) : 0}%`,
          totalAmount: formatInvestmentCurrency(result.netFutureValue, currency),
        }}
        scheduleRows={printableScheduleRows}
        scheduleTitle="Annual Portfolio Compounding Schedule"
      />
    </div>
  );
}
