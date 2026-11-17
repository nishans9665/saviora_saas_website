"use client";

import React, { useState, useMemo } from "react";
import { SupportedCurrency, formatLoanCurrency } from "@/lib/loan-calculators/currencies";
import { calculateSimpleInterest } from "@/lib/loan-calculators/engines/simpleInterest";
import { LoanBreadcrumb } from "./shared/LoanBreadcrumb";
import { LoanCalculatorHero } from "./shared/LoanCalculatorHero";
import { CurrencySelector } from "./shared/CurrencySelector";
import { LoanVisualBreakdown } from "./shared/LoanVisualBreakdown";
import { LoanCalculatorFAQ, FAQItem } from "./shared/LoanCalculatorFAQ";
import { LoanRelatedTools, RelatedToolItem } from "./shared/LoanRelatedTools";
import { LoanProductCTA } from "./shared/LoanProductCTA";
import { PrintCalculationReport, ReportInputParam, ReportScheduleRow } from "./shared/PrintCalculationReport";
import { Printer, Copy, Check, RotateCcw, Calculator, Percent, Sparkles, TrendingUp } from "lucide-react";

const FAQS: FAQItem[] = [
  {
    question: "What is Simple Interest and how is it calculated?",
    answer: "Simple interest is calculated solely on the original principal amount, without compounding. The formula is Simple Interest (I) = P × r × t, where P is the principal amount, r is the annual interest rate as a decimal, and t is the time duration in years.",
  },
  {
    question: "How does simple interest differ from compound interest?",
    answer: "In simple interest, your interest earnings remain constant every period because interest is never added back to the principal. In compound interest, accumulated interest is added to the principal at each compounding interval, meaning you earn 'interest on interest' and your balance grows exponentially.",
  },
  {
    question: "Where is simple interest commonly used in real life?",
    answer: "Simple interest is commonly used for short-term personal loans, car title loans, promissory notes, certain fixed-term certificates of deposit with non-cumulative periodic payouts, and informal borrowing between friends or family.",
  },
];

const RELATED_TOOLS: RelatedToolItem[] = [
  {
    title: "Compound Interest Calculator",
    description: "Compare simple interest against exponential compound interest growth.",
    href: "/free-tools/compound-interest-calculator",
    badge: "Exponential Growth",
  },
  {
    title: "Fixed Deposit Calculator",
    description: "Estimate bank term deposit earnings with cumulative and payout options.",
    href: "/free-tools/fixed-deposit-calculator",
    badge: "Banking",
  },
  {
    title: "Personal Loan Calculator",
    description: "Calculate personal loan instalments comparing flat rate and reducing balance.",
    href: "/free-tools/personal-loan-calculator",
    badge: "Borrowing",
  },
];

export function SimpleInterestCalculatorView() {
  const [currency, setCurrency] = useState<SupportedCurrency>("USD");
  const [principal, setPrincipal] = useState<number>(10000);
  const [rate, setRate] = useState<number>(6.5);
  const [timePeriod, setTimePeriod] = useState<number>(3);
  const [timeUnit, setTimeUnit] = useState<"days" | "months" | "years">("years");
  const [copied, setCopied] = useState<boolean>(false);

  const result = useMemo(() => {
    return calculateSimpleInterest({
      principal,
      annualInterestRate: rate,
      timePeriod,
      timeUnit,
      currency,
    });
  }, [principal, rate, timePeriod, timeUnit, currency]);

  
  const inputParams: ReportInputParam[] = [
    { label: "Initial Principal", value: formatLoanCurrency(principal, currency) },
    { label: "Annual Interest Rate", value: `${rate}%` },
    { label: "Tenure", value: `${timePeriod} ${timeUnit} (${result.timeInYears.toFixed(2)} Years)` },
    { label: "Reporting Currency", value: currency },
  ];

  const printableScheduleRows: ReportScheduleRow[] = [
    {
      period: "Total Term",
      beginningBalance: formatLoanCurrency(result.principal, currency),
      principal: formatLoanCurrency(result.principal, currency),
      interest: formatLoanCurrency(result.totalSimpleInterest, currency),
      payment: formatLoanCurrency(result.finalMaturityAmount, currency),
      endingBalance: formatLoanCurrency(result.finalMaturityAmount, currency),
    }
  ];

  const handlePrint = () => {
    window.print();
  };

  const handleCopySummary = () => {
    const summary = [
      "=== Saviora Simple Interest Calculation Summary ===",
      `Principal Amount: ${formatLoanCurrency(result.principal, currency)}`,
      `Annual Interest Rate: ${rate}%`,
      `Time Period: ${timePeriod} ${timeUnit} (${result.timeInYears} Years)`,
      `Total Simple Interest: ${formatLoanCurrency(result.totalSimpleInterest, currency)}`,
      `Final Maturity Amount: ${formatLoanCurrency(result.finalMaturityAmount, currency)}`,
      `Annual Interest: ${formatLoanCurrency(result.interestPerYear, currency)}/year`,
      `Monthly Interest: ${formatLoanCurrency(result.interestPerMonth, currency)}/month`,
      `Daily Interest: ${formatLoanCurrency(result.interestPerDay, currency)}/day`,
      `Compound Interest Comparison: ${formatLoanCurrency(result.compoundInterestComparison.compoundInterestAnnual, currency)} (Diff: +${formatLoanCurrency(result.compoundInterestComparison.difference, currency)})`,
      "Calculated free at https://saviora.app/free-tools/simple-interest-calculator",
    ].join("\n");

    navigator.clipboard.writeText(summary);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleReset = () => {
    setPrincipal(10000);
    setRate(6.5);
    setTimePeriod(3);
    setTimeUnit("years");
  };

  const breakdownSlices = [
    { label: "Principal", amount: result.principal, color: "#10b981" },
    { label: "Simple Interest", amount: result.totalSimpleInterest, color: "#F6850C" },
  ];

  return (
    <div className="pt-32 sm:pt-36 lg:pt-40 pb-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* On-screen Interactive UI (Hidden during print) */}
      <div className="print:hidden">
      <LoanBreadcrumb items={[{ label: "Simple Interest Calculator" }]} />

      <LoanCalculatorHero
        badge="Simple Interest Calculator"
        title="Simple Interest & Maturity Calculator"
        description="Calculate simple interest earnings on deposits, promissory notes, and loans with flexible day, month, and year durations and compound comparisons."
      />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Form */}
        <div className="lg:col-span-6 bg-white rounded-3xl p-6 sm:p-8 border border-gray-200/80 shadow-xs">
          <div className="flex items-center justify-between pb-5 border-b border-gray-100 mb-6">
            <h2 className="text-lg font-bold text-gray-900 flex items-center gap-2">
              <Calculator className="w-5 h-5 text-emerald-600" />
              <span>Investment / Loan Inputs</span>
            </h2>
            <CurrencySelector selectedCurrency={currency} onSelectCurrency={setCurrency} />
          </div>

          <div className="space-y-5">
            {/* Principal */}
            <div>
              <div className="flex justify-between items-center mb-1.5">
                <label className="text-xs font-semibold text-gray-700">Principal Amount (P)</label>
                <span className="text-xs font-bold text-emerald-700">
                  {formatLoanCurrency(principal, currency)}
                </span>
              </div>
              <input
                type="number"
                min="0"
                step="500"
                value={principal || ""}
                onChange={(e) => setPrincipal(Number(e.target.value))}
                className="w-full text-sm font-semibold text-gray-900 bg-gray-50/80 border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-white transition"
              />
            </div>

            {/* Interest Rate */}
            <div>
              <div className="flex justify-between items-center mb-1.5">
                <label className="text-xs font-semibold text-gray-700">Annual Interest Rate (r %)</label>
                <span className="text-xs font-bold text-emerald-700">{rate}%</span>
              </div>
              <input
                type="number"
                min="0"
                max="100"
                step="0.1"
                value={rate || ""}
                onChange={(e) => setRate(Number(e.target.value))}
                className="w-full text-sm font-semibold text-gray-900 bg-gray-50/80 border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-white transition"
              />
            </div>

            {/* Time Period & Unit */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-semibold text-gray-700 block mb-1.5">Time Duration (t)</label>
                <input
                  type="number"
                  min="1"
                  value={timePeriod || ""}
                  onChange={(e) => setTimePeriod(Math.max(1, Number(e.target.value)))}
                  className="w-full text-sm font-semibold text-gray-900 bg-gray-50/80 border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-white transition"
                />
              </div>
              <div>
                <label className="text-xs font-semibold text-gray-700 block mb-1.5">Time Unit</label>
                <select
                  value={timeUnit}
                  onChange={(e) => setTimeUnit(e.target.value as "days" | "months" | "years")}
                  className="w-full text-sm font-semibold text-gray-900 bg-gray-50/80 border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-white transition cursor-pointer"
                >
                  <option value="years">Years</option>
                  <option value="months">Months</option>
                  <option value="days">Days (365 basis)</option>
                </select>
              </div>
            </div>

            {/* Quick Presets */}
            <div className="flex gap-2">
              {[1, 2, 3, 5, 10].map((yr) => (
                <button
                  key={yr}
                  type="button"
                  onClick={() => { setTimePeriod(yr); setTimeUnit("years"); }}
                  className={`text-[10px] font-semibold px-2.5 py-1 rounded-md transition ${
                    timePeriod === yr && timeUnit === "years"
                      ? "bg-emerald-600 text-white"
                      : "bg-gray-100 hover:bg-gray-200 text-gray-700"
                  }`}
                >
                  {yr} {yr === 1 ? "Year" : "Years"}
                </button>
              ))}
            </div>

            {/* Actions */}
            <div className="pt-4 border-t border-gray-100 flex items-center justify-between">
              <button
                type="button"
                onClick={handleReset}
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-gray-500 hover:text-gray-800 transition"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Reset Defaults</span>
              </button>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={handlePrint}
                  className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold text-slate-700 bg-white hover:bg-slate-100 border border-slate-200 transition shadow-2xs"
                  title="Generate and print or download official PDF report"
                >
                  <Printer className="w-3.5 h-3.5 text-slate-600" />
                  <span>Print / PDF Report</span>
                </button>

                <button
                  type="button"
                  onClick={handleCopySummary}
                  className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold text-emerald-700 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200/60 transition shadow-2xs"
                >
                  {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copied ? "Summary Copied!" : "Copy Summary"}</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Results */}
        <div className="lg:col-span-6 space-y-6">
          <div className="bg-gradient-to-br from-emerald-600 via-teal-700 to-emerald-900 rounded-3xl p-6 sm:p-8 text-white shadow-lg relative overflow-hidden">
            <div className="relative z-10">
              <div className="text-xs font-semibold uppercase tracking-wider text-emerald-200">
                Total Simple Interest Earned
              </div>
              <div className="mt-2 text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-white">
                {formatLoanCurrency(result.totalSimpleInterest, currency)}
              </div>

              <div className="text-xs text-emerald-100 mt-1">
                Final Maturity Value: <strong>{formatLoanCurrency(result.finalMaturityAmount, currency)}</strong>
              </div>

              <div className="grid grid-cols-3 gap-3 mt-6 pt-6 border-t border-emerald-500/30 text-center">
                <div className="bg-white/10 rounded-xl p-2.5">
                  <div className="text-[10px] text-emerald-200">Per Year</div>
                  <div className="text-sm sm:text-base font-bold text-white mt-0.5">
                    {formatLoanCurrency(result.interestPerYear, currency)}
                  </div>
                </div>
                <div className="bg-white/10 rounded-xl p-2.5">
                  <div className="text-[10px] text-emerald-200">Per Month</div>
                  <div className="text-sm sm:text-base font-bold text-white mt-0.5">
                    {formatLoanCurrency(result.interestPerMonth, currency)}
                  </div>
                </div>
                <div className="bg-white/10 rounded-xl p-2.5">
                  <div className="text-[10px] text-emerald-200">Per Day</div>
                  <div className="text-sm sm:text-base font-bold text-white mt-0.5">
                    {formatLoanCurrency(result.interestPerDay, currency)}
                  </div>
                </div>
              </div>

              {/* Compound Comparison Box */}
              <div className="mt-5 p-3.5 rounded-2xl bg-white/10 border border-white/20 text-xs">
                <div className="font-bold flex items-center gap-1.5 text-amber-300">
                  <TrendingUp className="w-4 h-4" />
                  <span>Compound Interest Comparison</span>
                </div>
                <p className="mt-1 text-slate-100 text-[11px] leading-relaxed">
                  With annual compounding, you would earn{" "}
                  <strong>{formatLoanCurrency(result.compoundInterestComparison.compoundInterestAnnual, currency)}</strong>{" "}
                  (an extra <strong>{formatLoanCurrency(result.compoundInterestComparison.difference, currency)}</strong> in compound growth!).
                </p>
              </div>
            </div>
          </div>

          <LoanVisualBreakdown
            slices={breakdownSlices}
            currency={currency}
            centerTitle="Maturity"
            centerValue={formatLoanCurrency(result.finalMaturityAmount, currency, { compact: true })}
          />
        </div>
      </div>

      <LoanCalculatorFAQ faqs={FAQS} />
      <LoanRelatedTools tools={RELATED_TOOLS} />
      <LoanProductCTA />
    
      </div>

      {/* Official Printable Financial Assessment Report (Rendered only on print / PDF generation) */}
      <PrintCalculationReport
        reportTitle="Simple Interest Assessment Report"
        calculatorName="Simple Interest Calculator"
        currency={currency}
        inputParams={inputParams}
        primaryMetric={{
          label: "Total Accumulated Value",
          value: formatLoanCurrency(result.finalMaturityAmount, currency),
          subtext: `Principal: ${formatLoanCurrency(result.principal, currency)} + Interest: ${formatLoanCurrency(result.totalSimpleInterest, currency)}`,
        }}
        keyMetrics={[
          { label: "Initial Principal", value: formatLoanCurrency(result.principal, currency) },
          { label: "Total Simple Interest", value: formatLoanCurrency(result.totalSimpleInterest, currency) },
          { label: "Final Maturity Amount", value: formatLoanCurrency(result.finalMaturityAmount, currency) },
          { label: "Interest per Year", value: formatLoanCurrency(result.interestPerYear, currency) },
          { label: "Interest per Month", value: formatLoanCurrency(result.interestPerMonth, currency) },
        ]}
        breakdownSummary={{
          principalAmount: formatLoanCurrency(result.principal, currency),
          principalPercent: `${result.finalMaturityAmount > 0 ? ((result.principal / result.finalMaturityAmount) * 100).toFixed(1) : 0}%`,
          interestAmount: formatLoanCurrency(result.totalSimpleInterest, currency),
          interestPercent: `${result.finalMaturityAmount > 0 ? ((result.totalSimpleInterest / result.finalMaturityAmount) * 100).toFixed(1) : 0}%`,
          totalAmount: formatLoanCurrency(result.finalMaturityAmount, currency),
        }}
        scheduleRows={printableScheduleRows}
        scheduleTitle="Simple Interest Summary"
      />
    </div>
  );
}