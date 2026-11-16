"use client";

import { InvestmentCalculatorSEOContent } from "./shared/InvestmentCalculatorSEOContent";
import { INVESTMENT_SEO_CONTENT } from "@/lib/investment-calculators/seoContentData";
import { InvestmentContextualFeatures } from "./shared/InvestmentContextualFeatures";
import { trackCalculatorEvent } from "@/lib/investment-calculators/analytics";

import React, { useState, useMemo } from "react";
import { SupportedCurrency, formatInvestmentCurrency } from "@/lib/investment-calculators/currencies";
import { calculateEmergencyFund } from "@/lib/investment-calculators/engines/emergencyFund";
import { InvestmentBreadcrumb } from "./shared/InvestmentBreadcrumb";
import { InvestmentCalculatorHero } from "./shared/InvestmentCalculatorHero";
import { InvestmentCurrencySelector } from "./shared/InvestmentCurrencySelector";
import { InvestmentVisualBreakdown } from "./shared/InvestmentVisualBreakdown";
import { InvestmentCalculatorFAQ, FAQItem } from "./shared/InvestmentCalculatorFAQ";
import { InvestmentRelatedTools, RelatedToolItem } from "./shared/InvestmentRelatedTools";
import { InvestmentProductCTA } from "./shared/InvestmentProductCTA";
import { InvestmentPrintReport, ReportInputParam } from "./shared/InvestmentPrintReport";
import { Copy, Check, RotateCcw, ShieldCheck, DollarSign, Home, ShoppingCart, Zap, Car, Stethoscope, CreditCard, HelpCircle, Printer } from "lucide-react";

const FAQS: FAQItem[] = [
  {
    question: "Why should an emergency fund only cover essential living expenses?",
    answer: "During a genuine emergency (such as job loss or medical disability), discretionary spending like dining out, luxury subscriptions, and vacations can be paused immediately. Your emergency fund should strictly guarantee shelter, food, utilities, medicines, and debt minimums.",
  },
  {
    question: "Where should emergency fund money be kept?",
    answer: "Emergency reserves must be liquid and capital-preserved. Keep them in high-yield savings accounts (HYSA) or money market funds with immediate access, never in volatile stock markets or illiquid certificates.",
  },
  {
    question: "How many months of emergency coverage do financial advisors recommend?",
    answer: "The general rule of thumb is 3 to 6 months of essential living expenses for stable, dual-income households, and 6 to 12 months for single-earner households, freelancers, or business owners.",
  },
];

const RELATED_TOOLS: RelatedToolItem[] = [
  {
    name: "Savings Goal Calculator",
    href: "/free-tools/savings-goal-calculator",
    description: "Build a structured monthly savings plan to reach your emergency fund target.",
    tag: "Target",
  },
  {
    name: "Monthly Savings Calculator",
    href: "/free-tools/monthly-savings-calculator",
    description: "Calculate how regular monthly deposits accumulate in high-yield bank accounts.",
    tag: "Savings",
  },
  {
    name: "Inflation Calculator",
    href: "/free-tools/inflation-calculator",
    description: "Understand why you must periodically adjust emergency funds to reflect rising prices.",
    tag: "Inflation",
  },
];

export function EmergencyFundCalculatorView() {
  const [currency, setCurrency] = useState<SupportedCurrency>("USD");
  const [monthlyHousing, setMonthlyHousing] = useState<number>(1200);
  const [monthlyFood, setMonthlyFood] = useState<number>(600);
  const [monthlyUtilities, setMonthlyUtilities] = useState<number>(300);
  const [monthlyTransportation, setMonthlyTransportation] = useState<number>(250);
  const [monthlyHealthcare, setMonthlyHealthcare] = useState<number>(150);
  const [monthlyDebtMinimums, setMonthlyDebtMinimums] = useState<number>(200);
  const [monthlyOtherEssentials, setMonthlyOtherEssentials] = useState<number>(100);
  const [existingSavings, setExistingSavings] = useState<number>(5000);
  const [desiredMonths, setDesiredMonths] = useState<number>(6);
  const [monthlyContribution, setMonthlyContribution] = useState<number>(500);
  const [copied, setCopied] = useState(false);

  const result = useMemo(() => {
    return calculateEmergencyFund({
      monthlyHousing,
      monthlyFood,
      monthlyUtilities,
      monthlyTransportation,
      monthlyHealthcare,
      monthlyDebtMinimums,
      monthlyOtherEssentials,
      existingSavings,
      desiredMonths,
      monthlyContribution,
      currency,
    });
  }, [monthlyHousing, monthlyFood, monthlyUtilities, monthlyTransportation, monthlyHealthcare, monthlyDebtMinimums, monthlyOtherEssentials, existingSavings, desiredMonths, monthlyContribution, currency]);

  const handleReset = () => {
    setMonthlyHousing(1200);
    setMonthlyFood(600);
    setMonthlyUtilities(300);
    setMonthlyTransportation(250);
    setMonthlyHealthcare(150);
    setMonthlyDebtMinimums(200);
    setMonthlyOtherEssentials(100);
    setExistingSavings(5000);
    setDesiredMonths(6);
    setMonthlyContribution(500);
  };

  const handleCopySummary = () => {
    trackCalculatorEvent("calculator_copy_summary", { tool: "emergency-fund-calculator" });
    const summary = [
      "=== Saviora Emergency Fund Assessment Summary ===",
      `Essential Monthly Expenses: ${formatInvestmentCurrency(result.totalEssentialMonthlyExpenses, currency)} / month`,
      `Selected Coverage Target: ${desiredMonths} Months`,
      `Recommended Emergency Fund: ${formatInvestmentCurrency(result.emergencyFundTarget, currency)}`,
      `Current Existing Savings: ${formatInvestmentCurrency(result.existingSavings, currency)} (${result.progressPercent}% funded)`,
      `Remaining Cash Gap: ${result.isGoalMet ? "Goal Fully Met!" : formatInvestmentCurrency(result.remainingAmountNeeded, currency)}`,
      `Estimated Months to Full Safety: ${result.isGoalMet ? "0 months (Funded)" : `${result.estimatedMonthsToReachGoal} months @ ${formatInvestmentCurrency(monthlyContribution, currency)}/mo`}`,
      "Generated at: https://saviora.app/free-tools/emergency-fund-calculator",
    ].join("\n");

    navigator.clipboard.writeText(summary);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handlePrint = () => {
    trackCalculatorEvent("calculator_print_report", { tool: "emergency-fund-calculator" });
    window.print();
  };

  const inputParams: ReportInputParam[] = [
    { label: "Housing & Shelter", value: formatInvestmentCurrency(monthlyHousing, currency) },
    { label: "Food & Groceries", value: formatInvestmentCurrency(monthlyFood, currency) },
    { label: "Utilities (Water, Power, Internet)", value: formatInvestmentCurrency(monthlyUtilities, currency) },
    { label: "Transportation & Fuel", value: formatInvestmentCurrency(monthlyTransportation, currency) },
    { label: "Healthcare & Insurance", value: formatInvestmentCurrency(monthlyHealthcare, currency) },
    { label: "Debt Minimums & Other", value: formatInvestmentCurrency(monthlyDebtMinimums + monthlyOtherEssentials, currency) },
    { label: "Existing Emergency Savings", value: formatInvestmentCurrency(existingSavings, currency) },
    { label: "Selected Target Months", value: `${desiredMonths} Months` },
    { label: "Reporting Currency", value: currency },
  ];

  return (
    <div className="pt-32 sm:pt-36 lg:pt-40 pb-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* On-screen Interactive UI */}
      <div className="print:hidden">
        <InvestmentBreadcrumb items={[{ label: "Emergency Fund Calculator" }]} />

        <InvestmentCalculatorHero
          badge="Essential Financial Safety Net"
          title="Emergency Fund Calculator – Safety Buffer"
          description="Calculate your ideal 3 to 12-month emergency cash buffer based on essential monthly living expenses. Plan how long it takes to become fully protected."
        />

        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Essential Expense Breakdown Form */}
          <div className="lg:col-span-7 bg-white rounded-2xl p-6 sm:p-7 border border-slate-200/80 shadow-xs">
            <div className="flex items-center justify-between pb-4 mb-6 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-emerald-600" />
                <h2 className="text-base font-bold text-slate-900">Essential Monthly Expenses</h2>
              </div>
              <InvestmentCurrencySelector value={currency} onChange={setCurrency} />
            </div>

            <div className="space-y-3.5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1 flex items-center gap-1">
                    <Home className="w-3.5 h-3.5 text-slate-400" />
                    <span>Rent / Mortgage ({currency})</span>
                  </label>
                  <input
                    type="number"
                    min="0"
                    step="50"
                    value={monthlyHousing || ""}
                    onChange={(e) => setMonthlyHousing(Math.max(0, parseFloat(e.target.value) || 0))}
                    className="w-full px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-900 focus:bg-white focus:ring-2 focus:ring-emerald-500 transition"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1 flex items-center gap-1">
                    <ShoppingCart className="w-3.5 h-3.5 text-slate-400" />
                    <span>Food &amp; Groceries ({currency})</span>
                  </label>
                  <input
                    type="number"
                    min="0"
                    step="50"
                    value={monthlyFood || ""}
                    onChange={(e) => setMonthlyFood(Math.max(0, parseFloat(e.target.value) || 0))}
                    className="w-full px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-900 focus:bg-white focus:ring-2 focus:ring-emerald-500 transition"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1 flex items-center gap-1">
                    <Zap className="w-3.5 h-3.5 text-slate-400" />
                    <span>Utilities &amp; Bills ({currency})</span>
                  </label>
                  <input
                    type="number"
                    min="0"
                    step="25"
                    value={monthlyUtilities || ""}
                    onChange={(e) => setMonthlyUtilities(Math.max(0, parseFloat(e.target.value) || 0))}
                    className="w-full px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-900 focus:bg-white focus:ring-2 focus:ring-emerald-500 transition"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1 flex items-center gap-1">
                    <Car className="w-3.5 h-3.5 text-slate-400" />
                    <span>Transportation / Fuel ({currency})</span>
                  </label>
                  <input
                    type="number"
                    min="0"
                    step="25"
                    value={monthlyTransportation || ""}
                    onChange={(e) => setMonthlyTransportation(Math.max(0, parseFloat(e.target.value) || 0))}
                    className="w-full px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-900 focus:bg-white focus:ring-2 focus:ring-emerald-500 transition"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block text-[11px] font-semibold text-slate-700 mb-1 flex items-center gap-1">
                    <Stethoscope className="w-3 h-3 text-slate-400" />
                    <span>Healthcare</span>
                  </label>
                  <input
                    type="number"
                    min="0"
                    step="25"
                    value={monthlyHealthcare || ""}
                    onChange={(e) => setMonthlyHealthcare(Math.max(0, parseFloat(e.target.value) || 0))}
                    className="w-full px-2.5 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-xs font-semibold text-slate-900 focus:bg-white focus:ring-2 focus:ring-emerald-500 transition"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-slate-700 mb-1 flex items-center gap-1">
                    <CreditCard className="w-3 h-3 text-slate-400" />
                    <span>Debt Minimums</span>
                  </label>
                  <input
                    type="number"
                    min="0"
                    step="25"
                    value={monthlyDebtMinimums || ""}
                    onChange={(e) => setMonthlyDebtMinimums(Math.max(0, parseFloat(e.target.value) || 0))}
                    className="w-full px-2.5 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-xs font-semibold text-slate-900 focus:bg-white focus:ring-2 focus:ring-emerald-500 transition"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-slate-700 mb-1 flex items-center gap-1">
                    <HelpCircle className="w-3 h-3 text-slate-400" />
                    <span>Other Essentials</span>
                  </label>
                  <input
                    type="number"
                    min="0"
                    step="25"
                    value={monthlyOtherEssentials || ""}
                    onChange={(e) => setMonthlyOtherEssentials(Math.max(0, parseFloat(e.target.value) || 0))}
                    className="w-full px-2.5 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-xs font-semibold text-slate-900 focus:bg-white focus:ring-2 focus:ring-emerald-500 transition"
                  />
                </div>
              </div>

              {/* Savings & Target */}
              <div className="pt-3 border-t border-slate-100 grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block text-[11px] font-semibold text-slate-700 mb-1">
                    Existing Savings ({currency})
                  </label>
                  <input
                    type="number"
                    min="0"
                    step="500"
                    value={existingSavings || ""}
                    onChange={(e) => setExistingSavings(Math.max(0, parseFloat(e.target.value) || 0))}
                    className="w-full px-2.5 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-xs font-semibold text-slate-900 focus:bg-white focus:ring-2 focus:ring-emerald-500 transition"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-slate-700 mb-1">
                    Target Coverage (Months)
                  </label>
                  <select
                    value={desiredMonths}
                    onChange={(e) => setDesiredMonths(parseInt(e.target.value) || 6)}
                    className="w-full px-2.5 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-xs font-semibold text-slate-900 focus:bg-white focus:ring-2 focus:ring-emerald-500 transition cursor-pointer"
                  >
                    <option value={3}>3 Months (Starter)</option>
                    <option value={6}>6 Months (Standard)</option>
                    <option value={9}>9 Months (Solid)</option>
                    <option value={12}>12 Months (Comprehensive)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-slate-700 mb-1">
                    Monthly Savings ({currency})
                  </label>
                  <input
                    type="number"
                    min="0"
                    step="50"
                    value={monthlyContribution || ""}
                    onChange={(e) => setMonthlyContribution(Math.max(0, parseFloat(e.target.value) || 0))}
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

          {/* Right Column: Emergency Target & Progress */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-gradient-to-br from-emerald-50 via-white to-teal-50 rounded-2xl p-6 sm:p-7 border border-emerald-200/80 shadow-xs">
              <div className="flex items-center justify-between pb-3 border-b border-emerald-100">
                <span className="text-xs font-bold uppercase tracking-wider text-emerald-800">
                  Recommended Target ({desiredMonths} Months)
                </span>
                <span className={`text-xs font-bold px-2.5 py-0.5 rounded-full ${result.isGoalMet ? "bg-emerald-100 text-emerald-800" : "bg-indigo-100 text-indigo-800"}`}>
                  {result.progressPercent}% Funded
                </span>
              </div>

              <div className="mt-4 text-center">
                <div className="text-3xl sm:text-4xl font-black text-slate-900 font-mono tracking-tight">
                  {formatInvestmentCurrency(result.emergencyFundTarget, currency)}
                </div>
                <p className="text-xs text-slate-600 mt-1 font-medium">
                  {result.isGoalMet
                    ? "Congratulations! Your emergency buffer is fully funded."
                    : `Remaining Gap: ${formatInvestmentCurrency(result.remainingAmountNeeded, currency)} (${result.estimatedMonthsToReachGoal} months left)`}
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
                  <p className="text-slate-500">Essential Monthly Outlay</p>
                  <p className="text-sm font-bold text-slate-900 font-mono mt-0.5">
                    {formatInvestmentCurrency(result.totalEssentialMonthlyExpenses, currency)} / mo
                  </p>
                </div>
                <div className="p-3 bg-white/80 rounded-xl border border-emerald-100">
                  <p className="text-slate-500">Current Cash Reserve</p>
                  <p className="text-sm font-bold text-slate-900 font-mono mt-0.5">
                    {formatInvestmentCurrency(result.existingSavings, currency)}
                  </p>
                </div>
              </div>
            </div>

            {/* Visual Breakdown of Monthly Essentials */}
            <InvestmentVisualBreakdown
              title="Monthly Essential Expense Allocation"
              currency={currency}
              segments={[
                { label: "Housing", amount: monthlyHousing, color: "bg-indigo-600" },
                { label: "Food", amount: monthlyFood, color: "bg-emerald-500" },
                { label: "Utilities", amount: monthlyUtilities, color: "bg-amber-400" },
                { label: "Transport & Health", amount: monthlyTransportation + monthlyHealthcare, color: "bg-sky-500" },
                { label: "Debt & Other", amount: monthlyDebtMinimums + monthlyOtherEssentials, color: "bg-purple-500" },
              ]}
            />
          </div>
        </div>

        {/* Milestone Targets Table */}
        <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs overflow-hidden mt-8">
          <div className="p-4 sm:p-5 border-b border-slate-100 bg-slate-50/50">
            <h3 className="text-base font-bold text-slate-900">Emergency Fund Milestone Comparison</h3>
            <p className="text-xs text-slate-500 mt-0.5">Compare savings targets across 3, 6, 9, and 12-month coverage benchmarks.</p>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead className="bg-slate-50 text-slate-700 font-semibold border-b border-slate-200">
                <tr>
                  <th className="py-2.5 px-4">Milestone Tier</th>
                  <th className="py-2.5 px-4 text-right">Target Amount</th>
                  <th className="py-2.5 px-4 text-right">Remaining Gap</th>
                  <th className="py-2.5 px-4 text-right">Timeline (@ {formatInvestmentCurrency(monthlyContribution, currency)}/mo)</th>
                  <th className="py-2.5 px-4 text-center">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-600">
                {result.milestones.map((m) => (
                  <tr key={m.months} className="hover:bg-slate-50/80 transition">
                    <td className="py-2.5 px-4 font-semibold text-slate-900">{m.label} ({m.months} Mos)</td>
                    <td className="py-2.5 px-4 text-right font-mono font-bold text-slate-900">
                      {formatInvestmentCurrency(m.targetAmount, currency)}
                    </td>
                    <td className="py-2.5 px-4 text-right font-mono text-slate-700">
                      {m.remainingAmount === 0 ? "Funded" : formatInvestmentCurrency(m.remainingAmount, currency)}
                    </td>
                    <td className="py-2.5 px-4 text-right font-mono text-slate-600">
                      {m.isAchieved ? "Reached" : m.monthsToReach > 0 ? `${m.monthsToReach} months` : "N/A"}
                    </td>
                    <td className="py-2.5 px-4 text-center">
                      <span className={`inline-block px-2 py-0.5 rounded text-[10px] font-bold ${
                        m.isAchieved ? "bg-emerald-100 text-emerald-800" : "bg-slate-100 text-slate-600"
                      }`}>
                        {m.isAchieved ? "Achieved" : "Pending"}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Educational SEO Content & Methodology */}
        {INVESTMENT_SEO_CONTENT["emergency-fund-calculator"] && (
          <InvestmentCalculatorSEOContent {...INVESTMENT_SEO_CONTENT["emergency-fund-calculator"]} />
        )}

        {/* FAQs */}
        <InvestmentCalculatorFAQ faqs={FAQS} />

        {/* Related Tools */}
        <InvestmentRelatedTools tools={RELATED_TOOLS} />

        {/* Contextual Saviora Core Features */}
        <InvestmentContextualFeatures currentCategory="Emergency Savings" />

        {/* Saviora Product CTA */}
        <InvestmentProductCTA />
      </div>

      {/* Official Printable Assessment Report */}
      <InvestmentPrintReport
        reportTitle="Emergency Fund Safety Assessment Report"
        calculatorName="Emergency Fund Calculator"
        currency={currency}
        inputParams={inputParams}
        primaryMetric={{
          label: `Recommended Emergency Target (${desiredMonths} Months)`,
          value: formatInvestmentCurrency(result.emergencyFundTarget, currency),
          subtext: `Monthly Essentials: ${formatInvestmentCurrency(result.totalEssentialMonthlyExpenses, currency)} / mo (${result.progressPercent}% Funded)`,
        }}
        keyMetrics={[
          { label: "Essential Monthly Budget", value: formatInvestmentCurrency(result.totalEssentialMonthlyExpenses, currency) },
          { label: "Current Cash Reserves", value: formatInvestmentCurrency(result.existingSavings, currency) },
          { label: "Remaining Gap", value: result.isGoalMet ? "Fully Funded" : formatInvestmentCurrency(result.remainingAmountNeeded, currency) },
          { label: "Months to Full Safety", value: result.isGoalMet ? "0 (Funded)" : `${result.estimatedMonthsToReachGoal} months` },
          { label: "Monthly Savings Rate", value: `${formatInvestmentCurrency(monthlyContribution, currency)} / mo` },
        ]}
        breakdownSummary={{
          investedAmount: formatInvestmentCurrency(result.existingSavings, currency),
          investedPercent: `${result.emergencyFundTarget > 0 ? ((result.existingSavings / result.emergencyFundTarget) * 100).toFixed(1) : 0}%`,
          growthAmount: formatInvestmentCurrency(result.remainingAmountNeeded, currency),
          growthPercent: `${result.emergencyFundTarget > 0 ? ((result.remainingAmountNeeded / result.emergencyFundTarget) * 100).toFixed(1) : 0}%`,
          totalAmount: formatInvestmentCurrency(result.emergencyFundTarget, currency),
        }}
      />
    </div>
  );
}
