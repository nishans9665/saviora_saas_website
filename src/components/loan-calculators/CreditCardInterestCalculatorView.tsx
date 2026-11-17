"use client";

import React, { useState, useMemo } from "react";
import { SupportedCurrency, formatLoanCurrency } from "@/lib/loan-calculators/currencies";
import { CreditCardPaymentMode } from "@/lib/loan-calculators/types";
import { calculateCreditCardInterest } from "@/lib/loan-calculators/engines/creditCardInterest";
import { LoanBreadcrumb } from "./shared/LoanBreadcrumb";
import { LoanCalculatorHero } from "./shared/LoanCalculatorHero";
import { CurrencySelector } from "./shared/CurrencySelector";
import { LoanVisualBreakdown } from "./shared/LoanVisualBreakdown";
import { LoanCalculatorFAQ, FAQItem } from "./shared/LoanCalculatorFAQ";
import { LoanRelatedTools, RelatedToolItem } from "./shared/LoanRelatedTools";
import { LoanProductCTA } from "./shared/LoanProductCTA";
import { PrintCalculationReport, ReportInputParam, ReportScheduleRow } from "./shared/PrintCalculationReport";
import { Printer, Copy, Check, RotateCcw, CreditCard, AlertTriangle, Zap, Download, Table } from "lucide-react";

const FAQS: FAQItem[] = [
  {
    question: "What is the 'Minimum Payment Trap' on credit cards?",
    answer: "Credit card minimum payments are typically calculated as interest plus 1% to 2% of your balance. Because only a tiny fraction goes toward reducing your actual principal, paying only the minimum can stretch repayment over 15 to 25 years and result in paying two to three times your original balance in pure interest!",
  },
  {
    question: "What is negative amortization on a credit card?",
    answer: "Negative amortization occurs when your monthly payment is less than the monthly interest charge. When this happens, unpaid interest is added to your principal balance, causing your debt to grow larger every month despite making payments.",
  },
  {
    question: "How does paying an extra $25 or $50 each month help?",
    answer: "Every dollar above the required minimum goes 100% directly toward reducing your principal. This immediately reduces the interest charged in the following month, compounding into dramatic savings—often cutting years off your repayment timeline and saving thousands in interest.",
  },
  {
    question: "Should I consolidate my credit cards with a personal loan?",
    answer: "If you have high APR credit cards (e.g. 20% to 28%), consolidating them into a fixed-rate personal loan at a lower rate (e.g. 9% to 14%) can save substantial interest and establish a fixed, guaranteed payoff date.",
  },
];

const RELATED_TOOLS: RelatedToolItem[] = [
  {
    title: "Debt Repayment Calculator",
    description: "Combine multiple credit cards and loans into a Snowball or Avalanche payoff plan.",
    href: "/free-tools/debt-repayment-calculator",
    badge: "Multi-Debt Payoff",
  },
  {
    title: "Personal Loan Calculator",
    description: "Explore fixed-rate consolidation loans to refinance credit card debt.",
    href: "/free-tools/personal-loan-calculator",
    badge: "Debt Consolidation",
  },
  {
    title: "Loan EMI Calculator",
    description: "Standard reducing balance loan payment and amortization calculator.",
    href: "/free-tools/loan-emi-calculator",
    badge: "Loan Planning",
  },
];

export function CreditCardInterestCalculatorView() {
  const [currency, setCurrency] = useState<SupportedCurrency>("USD");
  const [balance, setBalance] = useState<number>(5000);
  const [apr, setApr] = useState<number>(21.5);
  const [mode, setMode] = useState<CreditCardPaymentMode>("fixed");
  const [fixedPay, setFixedPay] = useState<number>(180);
  const [minPercent, setMinPercent] = useState<number>(2.5);
  const [targetMonths, setTargetMonths] = useState<number>(24);
  const [copied, setCopied] = useState<boolean>(false);

  const result = useMemo(() => {
    return calculateCreditCardInterest({
      balance,
      apr,
      paymentMode: mode,
      fixedMonthlyPayment: fixedPay,
      minimumPaymentPercent: minPercent,
      targetMonths,
      currency,
    });
  }, [balance, apr, mode, fixedPay, minPercent, targetMonths, currency]);

  
  const inputParams: ReportInputParam[] = [
    { label: "Current Balance", value: formatLoanCurrency(balance, currency) },
    { label: "Annual Interest Rate (APR)", value: `${apr}%` },
    { label: "Payment Strategy", value: mode === "fixed" ? "Fixed Monthly Payment" : mode === "minimum" ? "Minimum Payment Only" : "Target Payoff Months" },
    { label: "Minimum Payment Rate", value: `${minPercent}% of balance` },
    { label: "Fixed Monthly Budget", value: mode === "fixed" ? formatLoanCurrency(fixedPay, currency) : "N/A" },
    { label: "Target Timeline", value: mode === "target-months" ? `${targetMonths} months` : "N/A" },
    { label: "Reporting Currency", value: currency },
  ];

  const printableScheduleRows: ReportScheduleRow[] = result.schedule.slice(0, 36).map((r) => ({
    period: `Month ${r.month}`,
    beginningBalance: formatLoanCurrency(r.startingBalance, currency),
    principal: formatLoanCurrency(r.principalPaid, currency),
    interest: formatLoanCurrency(r.interestCharged, currency),
    payment: formatLoanCurrency(r.payment, currency),
    endingBalance: formatLoanCurrency(r.endingBalance, currency),
  }));

  const handlePrint = () => {
    window.print();
  };

  const handleCopySummary = () => {
    const summary = [
      "=== Saviora Credit Card Interest Calculation Summary ===",
      `Current Card Balance: ${formatLoanCurrency(result.currentBalance, currency)}`,
      `Annual APR: ${result.apr}%`,
      `Payment Strategy: ${mode}`,
      `Initial Monthly Payment: ${formatLoanCurrency(result.monthlyPaymentInitial, currency)}`,
      result.isNegativeAmortization
        ? `ALERT: ${result.warningMessage}`
        : [
            `Estimated Payoff Time: ${result.monthsToPayOff} Months (${(result.monthsToPayOff / 12).toFixed(1)} Years)`,
            `Total Interest Paid: ${formatLoanCurrency(result.totalInterestPaid, currency)}`,
            `Total Amount Paid: ${formatLoanCurrency(result.totalAmountPaid, currency)}`,
          ].join("\n"),
      "Calculated free at https://saviora.app/free-tools/credit-card-interest-calculator",
    ].join("\n");

    navigator.clipboard.writeText(summary);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleDownloadCSV = () => {
    let csv = "Month,Starting Balance,Interest Charged,Payment,Principal Paid,Ending Balance\n";
    result.schedule.forEach((r) => {
      csv += `${r.month},${r.startingBalance},${r.interestCharged},${r.payment},${r.principalPaid},${r.endingBalance}\n`;
    });

    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "credit-card-payoff-schedule.csv";
    link.click();
    URL.revokeObjectURL(url);
  };

  const handleReset = () => {
    setBalance(5000);
    setApr(21.5);
    setMode("fixed");
    setFixedPay(180);
    setMinPercent(2.5);
    setTargetMonths(24);
  };

  const breakdownSlices = [
    { label: "Original Balance", amount: result.currentBalance, color: "#10b981" },
    { label: "Total Interest Paid", amount: result.totalInterestPaid, color: "#F6850C" },
  ];

  return (
    <div className="pt-32 sm:pt-36 lg:pt-40 pb-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* On-screen Interactive UI (Hidden during print) */}
      <div className="print:hidden">
      <LoanBreadcrumb items={[{ label: "Credit Card Interest Calculator" }]} />

      <LoanCalculatorHero
        badge="Credit Card & APR Calculator"
        title="Credit Card Interest & Payoff Calculator"
        description="Calculate credit card payoff timelines, expose the minimum payment trap, prevent negative amortization, and see how small extra payments save thousands."
      />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Form */}
        <div className="lg:col-span-6 bg-white rounded-3xl p-6 sm:p-8 border border-gray-200/80 shadow-xs">
          <div className="flex items-center justify-between pb-5 border-b border-gray-100 mb-6">
            <h2 className="text-lg font-bold text-gray-900 flex items-center gap-2">
              <CreditCard className="w-5 h-5 text-emerald-600" />
              <span>Card Balance &amp; Rate</span>
            </h2>
            <CurrencySelector selectedCurrency={currency} onSelectCurrency={setCurrency} />
          </div>

          <div className="space-y-5">
            {/* Balance */}
            <div>
              <div className="flex justify-between items-center mb-1.5">
                <label className="text-xs font-semibold text-gray-700">Current Credit Card Balance</label>
                <span className="text-xs font-bold text-emerald-700">
                  {formatLoanCurrency(balance, currency)}
                </span>
              </div>
              <input
                type="number"
                min="0"
                step="250"
                value={balance || ""}
                onChange={(e) => setBalance(Number(e.target.value))}
                className="w-full text-sm font-semibold text-gray-900 bg-gray-50/80 border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-white transition"
              />
              <div className="flex gap-2 mt-2">
                {[1000, 2500, 5000, 10000].map((amt) => (
                  <button
                    key={amt}
                    type="button"
                    onClick={() => setBalance(amt)}
                    className="text-[10px] font-semibold bg-gray-100 hover:bg-gray-200 text-gray-700 px-2.5 py-1 rounded-md transition"
                  >
                    {formatLoanCurrency(amt, currency, { compact: true })}
                  </button>
                ))}
              </div>
            </div>

            {/* APR */}
            <div>
              <div className="flex justify-between items-center mb-1.5">
                <label className="text-xs font-semibold text-gray-700">Annual Percentage Rate (APR %)</label>
                <span className="text-xs font-bold text-emerald-700">{apr}%</span>
              </div>
              <input
                type="number"
                min="0"
                max="60"
                step="0.1"
                value={apr || ""}
                onChange={(e) => setApr(Number(e.target.value))}
                className="w-full text-sm font-semibold text-gray-900 bg-gray-50/80 border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-white transition"
              />
              <div className="flex gap-2 mt-2">
                {[14.9, 18.9, 21.5, 24.9, 29.9].map((r) => (
                  <button
                    key={r}
                    type="button"
                    onClick={() => setApr(r)}
                    className="text-[10px] font-semibold bg-gray-100 hover:bg-gray-200 text-gray-700 px-2 py-1 rounded-md transition"
                  >
                    {r}%
                  </button>
                ))}
              </div>
            </div>

            {/* Payment Strategy Mode */}
            <div>
              <label className="text-xs font-semibold text-gray-700 block mb-1.5">Payment Strategy</label>
              <div className="grid grid-cols-3 gap-2 p-1 bg-gray-100 rounded-xl">
                <button
                  type="button"
                  onClick={() => setMode("fixed")}
                  className={`py-2 text-[11px] font-bold rounded-lg transition text-center ${
                    mode === "fixed" ? "bg-white text-gray-900 shadow-2xs" : "text-gray-600 hover:text-gray-900"
                  }`}
                >
                  Fixed Monthly
                </button>
                <button
                  type="button"
                  onClick={() => setMode("minimum")}
                  className={`py-2 text-[11px] font-bold rounded-lg transition text-center ${
                    mode === "minimum" ? "bg-white text-gray-900 shadow-2xs" : "text-gray-600 hover:text-gray-900"
                  }`}
                >
                  Minimum Only
                </button>
                <button
                  type="button"
                  onClick={() => setMode("target-months")}
                  className={`py-2 text-[11px] font-bold rounded-lg transition text-center ${
                    mode === "target-months" ? "bg-white text-gray-900 shadow-2xs" : "text-gray-600 hover:text-gray-900"
                  }`}
                >
                  Target Payoff
                </button>
              </div>
            </div>

            {/* Mode-specific input */}
            {mode === "fixed" && (
              <div>
                <label className="text-xs font-semibold text-gray-700 block mb-1.5">
                  Monthly Payment ({currency})
                </label>
                <input
                  type="number"
                  min="10"
                  step="10"
                  value={fixedPay || ""}
                  onChange={(e) => setFixedPay(Number(e.target.value))}
                  className="w-full text-sm font-semibold text-gray-900 bg-gray-50/80 border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-white transition"
                />
              </div>
            )}

            {mode === "minimum" && (
              <div>
                <label className="text-xs font-semibold text-gray-700 block mb-1.5">
                  Minimum Payment (% of balance)
                </label>
                <input
                  type="number"
                  min="1"
                  max="10"
                  step="0.5"
                  value={minPercent || ""}
                  onChange={(e) => setMinPercent(Number(e.target.value))}
                  className="w-full text-sm font-semibold text-gray-900 bg-gray-50/80 border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-white transition"
                />
              </div>
            )}

            {mode === "target-months" && (
              <div>
                <label className="text-xs font-semibold text-gray-700 block mb-1.5">
                  Desired Payoff Duration (Months)
                </label>
                <input
                  type="number"
                  min="1"
                  max="120"
                  value={targetMonths || ""}
                  onChange={(e) => setTargetMonths(Number(e.target.value))}
                  className="w-full text-sm font-semibold text-gray-900 bg-gray-50/80 border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-white transition"
                />
              </div>
            )}

            {/* Negative Amortization Warning */}
            {result.isNegativeAmortization && (
              <div className="p-4 rounded-2xl bg-red-50 border border-red-200 text-red-900 text-xs flex items-start gap-2.5">
                <AlertTriangle className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
                <div>
                  <strong className="block font-bold">Negative Amortization Warning</strong>
                  <p className="mt-1 leading-relaxed">{result.warningMessage}</p>
                </div>
              </div>
            )}

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
                Estimated Repayment Duration
              </div>
              <div className="mt-2 text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-white">
                {result.isNegativeAmortization
                  ? "Never Paid Off"
                  : `${result.monthsToPayOff} Months`}
              </div>

              {!result.isNegativeAmortization && (
                <div className="text-xs text-emerald-100 mt-1">
                  Payoff Timeline: <strong>{(result.monthsToPayOff / 12).toFixed(1)} Years</strong>
                </div>
              )}

              <div className="grid grid-cols-2 gap-4 mt-6 pt-6 border-t border-emerald-500/30">
                <div>
                  <div className="text-xs text-emerald-200">Initial Payment</div>
                  <div className="text-lg sm:text-xl font-bold text-white mt-0.5">
                    {formatLoanCurrency(result.monthlyPaymentInitial, currency)}/mo
                  </div>
                </div>
                <div>
                  <div className="text-xs text-emerald-200">Total Interest Paid</div>
                  <div className="text-lg sm:text-xl font-bold text-white mt-0.5">
                    {formatLoanCurrency(result.totalInterestPaid, currency)}
                  </div>
                </div>
                <div>
                  <div className="text-xs text-emerald-200">Total Amount Paid</div>
                  <div className="text-base sm:text-lg font-bold text-white mt-0.5">
                    {formatLoanCurrency(result.totalAmountPaid, currency)}
                  </div>
                </div>
                <div>
                  <div className="text-xs text-emerald-200">Interest-to-Balance</div>
                  <div className="text-base sm:text-lg font-bold text-white mt-0.5">
                    {result.currentBalance > 0
                      ? Math.round((result.totalInterestPaid / result.currentBalance) * 100)
                      : 0}%
                  </div>
                </div>
              </div>

              {/* Extra Payment Comparison Callout */}
              {result.extraPaymentComparison && !result.isNegativeAmortization && (
                <div className="mt-5 p-3.5 rounded-2xl bg-white/10 border border-white/20 text-xs">
                  <div className="font-bold flex items-center gap-1.5 text-amber-300">
                    <Zap className="w-4 h-4" />
                    <span>Pay +{formatLoanCurrency(result.extraPaymentComparison.extraAmount, currency)}/mo Power Strategy</span>
                  </div>
                  <p className="mt-1 text-slate-100 text-[11px] leading-relaxed">
                    By adding just {formatLoanCurrency(result.extraPaymentComparison.extraAmount, currency)}/mo to your payments, you become debt-free{" "}
                    <strong>{result.extraPaymentComparison.monthsSaved} months sooner</strong> and save{" "}
                    <strong>{formatLoanCurrency(result.extraPaymentComparison.interestSaved, currency)} in interest</strong>!
                  </p>
                </div>
              )}
            </div>
          </div>

          {!result.isNegativeAmortization && (
            <LoanVisualBreakdown
              slices={breakdownSlices}
              currency={currency}
              centerTitle="Total"
              centerValue={formatLoanCurrency(result.totalAmountPaid, currency, { compact: true })}
            />
          )}
        </div>
      </div>

      {/* Schedule Table */}
      {!result.isNegativeAmortization && result.schedule.length > 0 && (
        <div className="bg-white rounded-2xl border border-gray-200/80 shadow-xs overflow-hidden mt-8 print:border-none print:shadow-none">
          <div className="p-4 sm:p-5 border-b border-gray-100 flex items-center justify-between bg-gray-50/50">
            <div>
              <h3 className="text-base font-bold text-gray-900 flex items-center gap-2">
                <Table className="w-4 h-4 text-emerald-600" />
                <span>Credit Card Month-by-Month Payoff Schedule</span>
              </h3>
              <p className="text-xs text-gray-500 mt-0.5">
                Simulated month-by-month balance reduction and interest charges.
              </p>
            </div>
            <button
              type="button"
              onClick={handleDownloadCSV}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-emerald-700 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200/60 transition shadow-2xs"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Export CSV</span>
            </button>
          </div>

          <div className="overflow-x-auto max-h-[400px] overflow-y-auto">
            <table className="w-full text-left text-xs text-gray-600 border-collapse">
              <thead className="bg-gray-50/90 text-gray-700 font-semibold sticky top-0 border-b border-gray-200/70 z-10">
                <tr>
                  <th className="py-2.5 px-3 sm:px-4">Month</th>
                  <th className="py-2.5 px-3 sm:px-4 text-right">Starting Balance</th>
                  <th className="py-2.5 px-3 sm:px-4 text-right text-amber-700">Interest Charged</th>
                  <th className="py-2.5 px-3 sm:px-4 text-right">Payment</th>
                  <th className="py-2.5 px-3 sm:px-4 text-right text-emerald-700">Principal Paid</th>
                  <th className="py-2.5 px-3 sm:px-4 text-right">Ending Balance</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {result.schedule.slice(0, 36).map((r) => (
                  <tr key={r.month} className="hover:bg-emerald-50/30 transition">
                    <td className="py-2 px-3 sm:px-4 font-bold text-gray-900">Month {r.month}</td>
                    <td className="py-2 px-3 sm:px-4 text-right">{formatLoanCurrency(r.startingBalance, currency)}</td>
                    <td className="py-2 px-3 sm:px-4 text-right text-amber-600 font-semibold">
                      {formatLoanCurrency(r.interestCharged, currency)}
                    </td>
                    <td className="py-2 px-3 sm:px-4 text-right font-medium text-gray-800">
                      {formatLoanCurrency(r.payment, currency)}
                    </td>
                    <td className="py-2 px-3 sm:px-4 text-right text-emerald-600 font-semibold">
                      {formatLoanCurrency(r.principalPaid, currency)}
                    </td>
                    <td className="py-2 px-3 sm:px-4 text-right font-bold text-gray-900">
                      {formatLoanCurrency(r.endingBalance, currency)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      <LoanCalculatorFAQ faqs={FAQS} />
      <LoanRelatedTools tools={RELATED_TOOLS} />
      <LoanProductCTA />
    
      </div>

      {/* Official Printable Financial Assessment Report (Rendered only on print / PDF generation) */}
      <PrintCalculationReport
        reportTitle="Credit Card Payoff &amp; Interest Assessment Report"
        calculatorName="Credit Card Interest Calculator"
        currency={currency}
        inputParams={inputParams}
        primaryMetric={{
          label: "Total Cost to Clear Balance",
          value: formatLoanCurrency(result.totalAmountPaid, currency),
          subtext: `Debt-Free In: ${result.monthsToPayOff} months | Total Interest: ${formatLoanCurrency(result.totalInterestPaid, currency)}`,
        }}
        keyMetrics={[
          { label: "Current Balance", value: formatLoanCurrency(result.currentBalance, currency) },
          { label: "Total Interest Paid", value: formatLoanCurrency(result.totalInterestPaid, currency) },
          { label: "Total Amount Paid", value: formatLoanCurrency(result.totalAmountPaid, currency) },
          { label: "Months to Pay Off", value: `${result.monthsToPayOff} months (${(result.monthsToPayOff / 12).toFixed(1)} years)` },
          { label: "Initial Payment", value: formatLoanCurrency(result.monthlyPaymentInitial, currency) },
          { label: "Extra Payment Savings", value: result.extraPaymentComparison ? formatLoanCurrency(result.extraPaymentComparison.interestSaved, currency) : "N/A" },
        ]}
        breakdownSummary={{
          principalAmount: formatLoanCurrency(result.currentBalance, currency),
          principalPercent: `${result.totalAmountPaid > 0 ? ((result.currentBalance / result.totalAmountPaid) * 100).toFixed(1) : 0}%`,
          interestAmount: formatLoanCurrency(result.totalInterestPaid, currency),
          interestPercent: `${result.totalAmountPaid > 0 ? ((result.totalInterestPaid / result.totalAmountPaid) * 100).toFixed(1) : 0}%`,
          totalAmount: formatLoanCurrency(result.totalAmountPaid, currency),
        }}
        scheduleRows={printableScheduleRows}
        scheduleTitle="Monthly Debt Payoff Schedule"
      />
    </div>
  );
}