"use client";

import React, { useState, useMemo } from "react";
import { SupportedCurrency, formatLoanCurrency } from "@/lib/loan-calculators/currencies";
import { FixedDepositPayout, CompoundingFrequency } from "@/lib/loan-calculators/types";
import { calculateFixedDeposit } from "@/lib/loan-calculators/engines/fixedDeposit";
import { LoanBreadcrumb } from "./shared/LoanBreadcrumb";
import { LoanCalculatorHero } from "./shared/LoanCalculatorHero";
import { CurrencySelector } from "./shared/CurrencySelector";
import { LoanVisualBreakdown } from "./shared/LoanVisualBreakdown";
import { LoanCalculatorFAQ, FAQItem } from "./shared/LoanCalculatorFAQ";
import { LoanRelatedTools, RelatedToolItem } from "./shared/LoanRelatedTools";
import { LoanProductCTA } from "./shared/LoanProductCTA";
import { PrintCalculationReport, ReportInputParam, ReportScheduleRow } from "./shared/PrintCalculationReport";
import { Copy, Check, RotateCcw, Landmark, Download, Printer, Table, Calendar } from "lucide-react";

const FAQS: FAQItem[] = [
  {
    question: "What is the difference between Cumulative and Non-Cumulative Fixed Deposits?",
    answer: "In a cumulative fixed deposit, interest is reinvested at each compounding interval and paid out together with your principal at maturity. In a non-cumulative fixed deposit, interest is paid out to your bank account periodically (monthly, quarterly, or annually) while your principal remains fixed until maturity.",
  },
  {
    question: "How does withholding tax affect my fixed deposit returns?",
    answer: "Many jurisdictions levy a withholding tax on bank interest earnings (e.g. 5%, 10%, or 15% depending on residency and tax status). The bank deducts this tax before crediting interest to you. This calculator allows you to enter your applicable tax rate to see both Gross and Net interest.",
  },
  {
    question: "Can I withdraw a fixed deposit before the maturity date?",
    answer: "Most banks allow premature withdrawal of fixed deposits, but they typically penalize the interest rate by 0.5% to 1.0% or reduce interest to the rate applicable to the actual period the deposit remained with the bank.",
  },
];

const RELATED_TOOLS: RelatedToolItem[] = [
  {
    title: "Simple Interest Calculator",
    description: "Calculate linear returns without reinvestment compounding.",
    href: "/free-tools/simple-interest-calculator",
    badge: "Basic Interest",
  },
  {
    title: "Compound Interest Calculator",
    description: "Forecast growth with recurring monthly contributions and investments.",
    href: "/free-tools/compound-interest-calculator",
    badge: "Wealth Growth",
  },
  {
    title: "Loan EMI Calculator",
    description: "Calculate loan instalments and evaluate borrowing vs deposit opportunities.",
    href: "/free-tools/loan-emi-calculator",
    badge: "Borrowing",
  },
];

export function FixedDepositCalculatorView() {
  const [currency, setCurrency] = useState<SupportedCurrency>("USD");
  const [deposit, setDeposit] = useState<number>(50000);
  const [annualRate, setAnnualRate] = useState<number>(7.25);
  const [tenureValue, setTenureValue] = useState<number>(24);
  const [tenureUnit, setTenureUnit] = useState<"days" | "months" | "years">("months");
  const [compFreq, setCompFreq] = useState<CompoundingFrequency>("quarterly");
  const [payoutOption, setPayoutOption] = useState<FixedDepositPayout>("cumulative");
  const [taxRate, setTaxRate] = useState<number>(5);
  const [copied, setCopied] = useState<boolean>(false);

  const result = useMemo(() => {
    return calculateFixedDeposit({
      depositAmount: deposit,
      annualInterestRate: annualRate,
      tenureValue,
      tenureUnit,
      compoundingFrequency: compFreq,
      payoutOption,
      withholdingTaxRate: taxRate,
      currency,
    });
  }, [deposit, annualRate, tenureValue, tenureUnit, compFreq, payoutOption, taxRate, currency]);

  
  const inputParams: ReportInputParam[] = [
    { label: "Deposit Principal", value: formatLoanCurrency(deposit, currency) },
    { label: "Annual Interest Rate", value: `${annualRate}%` },
    { label: "Deposit Tenure", value: `${tenureValue} ${tenureUnit}` },
    { label: "Compounding Frequency", value: compFreq },
    { label: "Payout Option", value: payoutOption.charAt(0).toUpperCase() + payoutOption.slice(1) },
    { label: "Withholding Tax Rate", value: `${taxRate}%` },
    { label: "Reporting Currency", value: currency },
  ];

  const printableScheduleRows: ReportScheduleRow[] = result.schedule.map((r) => ({
    period: r.payoutDate || `Period ${r.period}`,
    beginningBalance: formatLoanCurrency(r.openingBalance, currency),
    principal: formatLoanCurrency(0, currency),
    interest: formatLoanCurrency(r.netInterest, currency),
    payment: formatLoanCurrency(r.netInterest, currency),
    endingBalance: formatLoanCurrency(r.closingBalance, currency),
  }));

  const handlePrint = () => {
    window.print();
  };

  const handleCopySummary = () => {
    const summary = [
      "=== Saviora Fixed Deposit Calculation Summary ===",
      `Deposit Principal: ${formatLoanCurrency(result.initialDeposit, currency)}`,
      `Annual Interest Rate: ${annualRate}%`,
      `Deposit Tenure: ${tenureValue} ${tenureUnit}`,
      `Maturity Date: ${result.maturityDate}`,
      `Payout Type: ${payoutOption === "cumulative" ? "Cumulative (Reinvest Interest)" : `Periodic Payout (${payoutOption})`}`,
      `Gross Interest: ${formatLoanCurrency(result.grossInterestEarned, currency)}`,
      `Withholding Tax (${taxRate}%): -${formatLoanCurrency(result.withholdingTaxAmount, currency)}`,
      `Net Interest: ${formatLoanCurrency(result.netInterestEarned, currency)}`,
      payoutOption === "cumulative"
        ? `Total Maturity Payout: ${formatLoanCurrency(result.totalMaturityOrPayoutAmount, currency)}`
        : `Periodic Payout Amount: ${formatLoanCurrency(result.periodicPayoutAmount, currency)} per period`,
      `Effective APY: ${result.effectiveAnnualYield}%`,
      "Calculated free at https://saviora.app/free-tools/fixed-deposit-calculator",
    ].join("\n");

    navigator.clipboard.writeText(summary);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleReset = () => {
    setDeposit(50000);
    setAnnualRate(7.25);
    setTenureValue(24);
    setTenureUnit("months");
    setCompFreq("quarterly");
    setPayoutOption("cumulative");
    setTaxRate(5);
  };

  const breakdownSlices = [
    { label: "Principal Deposit", amount: result.initialDeposit, color: "#10b981" },
    { label: "Net Interest", amount: result.netInterestEarned, color: "#F6850C" },
    ...(result.withholdingTaxAmount > 0
      ? [{ label: "Withholding Tax", amount: result.withholdingTaxAmount, color: "#ec4899" }]
      : []),
  ];

  return (
    <div className="pt-32 sm:pt-36 lg:pt-40 pb-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* On-screen Interactive UI (Hidden during print) */}
      <div className="print:hidden">
      <LoanBreadcrumb items={[{ label: "Fixed Deposit Calculator" }]} />

      <LoanCalculatorHero
        badge="Fixed Deposit & Term Deposit Calculator"
        title="Fixed Deposit (FD) Maturity Calculator"
        description="Calculate term deposit maturity values, compare cumulative growth vs regular interest payouts, and factor in withholding tax deductions."
      />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Form */}
        <div className="lg:col-span-6 bg-white rounded-3xl p-6 sm:p-8 border border-gray-200/80 shadow-xs">
          <div className="flex items-center justify-between pb-5 border-b border-gray-100 mb-6">
            <h2 className="text-lg font-bold text-gray-900 flex items-center gap-2">
              <Landmark className="w-5 h-5 text-emerald-600" />
              <span>Deposit Details</span>
            </h2>
            <CurrencySelector selectedCurrency={currency} onSelectCurrency={setCurrency} />
          </div>

          <div className="space-y-5">
            {/* Payout Option Toggle */}
            <div>
              <label className="text-xs font-semibold text-gray-700 block mb-1.5">
                Interest Payout Option
              </label>
              <div className="grid grid-cols-2 gap-2 p-1 bg-gray-100 rounded-xl">
                <button
                  type="button"
                  onClick={() => setPayoutOption("cumulative")}
                  className={`py-2 text-xs font-bold rounded-lg transition ${
                    payoutOption === "cumulative"
                      ? "bg-white text-gray-900 shadow-2xs"
                      : "text-gray-600 hover:text-gray-900"
                  }`}
                >
                  Cumulative (Compounded)
                </button>
                <button
                  type="button"
                  onClick={() => setPayoutOption("monthly")}
                  className={`py-2 text-xs font-bold rounded-lg transition ${
                    payoutOption !== "cumulative"
                      ? "bg-white text-gray-900 shadow-2xs"
                      : "text-gray-600 hover:text-gray-900"
                  }`}
                >
                  Regular Payout
                </button>
              </div>
            </div>

            {payoutOption !== "cumulative" && (
              <div>
                <label className="text-xs font-semibold text-gray-700 block mb-1.5">Payout Interval</label>
                <select
                  value={payoutOption}
                  onChange={(e) => setPayoutOption(e.target.value as FixedDepositPayout)}
                  className="w-full text-sm font-semibold text-gray-900 bg-gray-50/80 border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-white transition cursor-pointer"
                >
                  <option value="monthly">Monthly Payout</option>
                  <option value="quarterly">Quarterly Payout</option>
                  <option value="annually">Annual Payout</option>
                </select>
              </div>
            )}

            {/* Deposit Amount */}
            <div>
              <div className="flex justify-between items-center mb-1.5">
                <label className="text-xs font-semibold text-gray-700">Deposit Amount</label>
                <span className="text-xs font-bold text-emerald-700">
                  {formatLoanCurrency(deposit, currency)}
                </span>
              </div>
              <input
                type="number"
                min="0"
                step="1000"
                value={deposit || ""}
                onChange={(e) => setDeposit(Number(e.target.value))}
                className="w-full text-sm font-semibold text-gray-900 bg-gray-50/80 border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-white transition"
              />
            </div>

            {/* Interest Rate */}
            <div>
              <div className="flex justify-between items-center mb-1.5">
                <label className="text-xs font-semibold text-gray-700">Annual Interest Rate (%)</label>
                <span className="text-xs font-bold text-emerald-700">{annualRate}%</span>
              </div>
              <input
                type="number"
                min="0"
                max="100"
                step="0.05"
                value={annualRate || ""}
                onChange={(e) => setAnnualRate(Number(e.target.value))}
                className="w-full text-sm font-semibold text-gray-900 bg-gray-50/80 border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-white transition"
              />
            </div>

            {/* Tenure & Unit */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-semibold text-gray-700 block mb-1.5">Deposit Duration</label>
                <input
                  type="number"
                  min="1"
                  value={tenureValue || ""}
                  onChange={(e) => setTenureValue(Math.max(1, Number(e.target.value)))}
                  className="w-full text-sm font-semibold text-gray-900 bg-gray-50/80 border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-white transition"
                />
              </div>
              <div>
                <label className="text-xs font-semibold text-gray-700 block mb-1.5">Tenure Unit</label>
                <select
                  value={tenureUnit}
                  onChange={(e) => setTenureUnit(e.target.value as "days" | "months" | "years")}
                  className="w-full text-sm font-semibold text-gray-900 bg-gray-50/80 border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-white transition cursor-pointer"
                >
                  <option value="months">Months</option>
                  <option value="years">Years</option>
                  <option value="days">Days</option>
                </select>
              </div>
            </div>

            {/* Compounding frequency for cumulative */}
            {payoutOption === "cumulative" && (
              <div>
                <label className="text-xs font-semibold text-gray-700 block mb-1.5">Compounding Frequency</label>
                <select
                  value={compFreq}
                  onChange={(e) => setCompFreq(e.target.value as CompoundingFrequency)}
                  className="w-full text-sm font-semibold text-gray-900 bg-gray-50/80 border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-white transition cursor-pointer"
                >
                  <option value="monthly">Monthly</option>
                  <option value="quarterly">Quarterly (Most Common)</option>
                  <option value="semi-annually">Semi-Annually</option>
                  <option value="annually">Annually</option>
                </select>
              </div>
            )}

            {/* Withholding Tax */}
            <div>
              <div className="flex justify-between items-center mb-1.5">
                <label className="text-xs font-semibold text-gray-700">Withholding Tax Rate (%)</label>
                <span className="text-xs font-bold text-gray-600">{taxRate}%</span>
              </div>
              <input
                type="number"
                min="0"
                max="50"
                step="1"
                value={taxRate || ""}
                onChange={(e) => setTaxRate(Number(e.target.value))}
                className="w-full text-sm font-semibold text-gray-900 bg-gray-50/80 border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-white transition"
                placeholder="e.g. 5 or 0 if tax-exempt"
              />
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
                {payoutOption === "cumulative" ? "Final Maturity Value" : "Periodic Interest Payout"}
              </div>
              <div className="mt-2 text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-white">
                {payoutOption === "cumulative"
                  ? formatLoanCurrency(result.totalMaturityOrPayoutAmount, currency)
                  : formatLoanCurrency(result.periodicPayoutAmount, currency)}
                {payoutOption !== "cumulative" && (
                  <span className="text-xs sm:text-sm font-medium text-emerald-200 ml-1.5">/ {payoutOption}</span>
                )}
              </div>

              <div className="flex items-center gap-2 text-xs text-emerald-100 mt-2">
                <Calendar className="w-3.5 h-3.5" />
                <span>Estimated Maturity Date: <strong>{result.maturityDate}</strong></span>
              </div>

              <div className="grid grid-cols-2 gap-4 mt-6 pt-6 border-t border-emerald-500/30">
                <div>
                  <div className="text-xs text-emerald-200">Gross Interest</div>
                  <div className="text-lg sm:text-xl font-bold text-white mt-0.5">
                    {formatLoanCurrency(result.grossInterestEarned, currency)}
                  </div>
                </div>
                <div>
                  <div className="text-xs text-emerald-200">Net Interest (After Tax)</div>
                  <div className="text-lg sm:text-xl font-bold text-white mt-0.5">
                    {formatLoanCurrency(result.netInterestEarned, currency)}
                  </div>
                </div>
                <div>
                  <div className="text-xs text-emerald-200">Withholding Tax ({taxRate}%)</div>
                  <div className="text-base sm:text-lg font-bold text-white mt-0.5">
                    {formatLoanCurrency(result.withholdingTaxAmount, currency)}
                  </div>
                </div>
                <div>
                  <div className="text-xs text-emerald-200">Effective Annual Yield (APY)</div>
                  <div className="text-base sm:text-lg font-bold text-white mt-0.5">
                    {result.effectiveAnnualYield}%
                  </div>
                </div>
              </div>
            </div>
          </div>

          <LoanVisualBreakdown
            slices={breakdownSlices}
            currency={currency}
            centerTitle="Return"
            centerValue={formatLoanCurrency(result.totalMaturityOrPayoutAmount, currency, { compact: true })}
          />
        </div>
      </div>

      <LoanCalculatorFAQ faqs={FAQS} />
      <LoanRelatedTools tools={RELATED_TOOLS} />
      <LoanProductCTA />
    
      </div>

      {/* Official Printable Financial Assessment Report (Rendered only on print / PDF generation) */}
      <PrintCalculationReport
        reportTitle="Fixed Deposit (FD) Yield &amp; Maturity Report"
        calculatorName="Fixed Deposit Calculator"
        currency={currency}
        inputParams={inputParams}
        primaryMetric={{
          label: "Total Maturity / Payout Value",
          value: formatLoanCurrency(result.totalMaturityOrPayoutAmount, currency),
          subtext: `Net Interest: ${formatLoanCurrency(result.netInterestEarned, currency)} | APY: ${result.effectiveAnnualYield.toFixed(2)}%`,
        }}
        keyMetrics={[
          { label: "Initial Deposit", value: formatLoanCurrency(result.initialDeposit, currency) },
          { label: "Gross Interest Earned", value: formatLoanCurrency(result.grossInterestEarned, currency) },
          { label: "Withholding Tax Deducted", value: formatLoanCurrency(result.withholdingTaxAmount, currency) },
          { label: "Net Interest Earned", value: formatLoanCurrency(result.netInterestEarned, currency) },
          { label: "Effective Annual Yield", value: `${result.effectiveAnnualYield.toFixed(2)}%` },
          { label: "Maturity Date", value: result.maturityDate },
        ]}
        breakdownSummary={{
          principalAmount: formatLoanCurrency(result.initialDeposit, currency),
          principalPercent: `${result.totalMaturityOrPayoutAmount > 0 ? ((result.initialDeposit / result.totalMaturityOrPayoutAmount) * 100).toFixed(1) : 0}%`,
          interestAmount: formatLoanCurrency(result.netInterestEarned, currency),
          interestPercent: `${result.totalMaturityOrPayoutAmount > 0 ? ((result.netInterestEarned / result.totalMaturityOrPayoutAmount) * 100).toFixed(1) : 0}%`,
          feesAmount: formatLoanCurrency(result.withholdingTaxAmount, currency),
          totalAmount: formatLoanCurrency(result.totalMaturityOrPayoutAmount, currency),
        }}
        scheduleRows={printableScheduleRows}
        scheduleTitle="Fixed Deposit Interest Schedule"
      />
    </div>
  );
}