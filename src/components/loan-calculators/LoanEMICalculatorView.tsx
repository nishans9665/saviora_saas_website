"use client";

import React, { useState, useMemo } from "react";
import { SupportedCurrency, formatLoanCurrency } from "@/lib/loan-calculators/currencies";
import { PaymentFrequency } from "@/lib/loan-calculators/types";
import { calculateLoanEMI } from "@/lib/loan-calculators/engines/loanEmi";
import { LoanBreadcrumb } from "./shared/LoanBreadcrumb";
import { LoanCalculatorHero } from "./shared/LoanCalculatorHero";
import { CurrencySelector } from "./shared/CurrencySelector";
import { LoanVisualBreakdown } from "./shared/LoanVisualBreakdown";
import { AmortizationScheduleTable } from "./shared/AmortizationScheduleTable";
import { LoanCalculatorFAQ, FAQItem } from "./shared/LoanCalculatorFAQ";
import { LoanRelatedTools, RelatedToolItem } from "./shared/LoanRelatedTools";
import { LoanProductCTA } from "./shared/LoanProductCTA";
import { PrintCalculationReport, ReportInputParam, ReportScheduleRow } from "./shared/PrintCalculationReport";
import { Printer, Copy, Check, RotateCcw, Calculator, ArrowRight, DollarSign, Calendar, Percent } from "lucide-react";

const FAQS: FAQItem[] = [
  {
    question: "What is an Equated Monthly Instalment (EMI)?",
    answer: "An EMI is a fixed monthly payment made by a borrower to a lender on a specified date each month. Each EMI is divided into two parts: one portion pays the interest accrued for the month, and the remaining portion reduces the outstanding principal balance. Over the loan tenure, the principal portion steadily increases while the interest portion decreases.",
  },
  {
    question: "How does the reducing-balance EMI formula work?",
    answer: "The reducing-balance formula is EMI = [P × r × (1 + r)^n] / [(1 + r)^n - 1], where P is the loan principal, r is the periodic interest rate (annual interest rate divided by payments per year), and n is the total number of payment periods. Interest is only charged on the remaining unpaid loan balance at the beginning of each period.",
  },
  {
    question: "How does loan tenure affect my monthly EMI and total interest?",
    answer: "Choosing a longer loan tenure reduces your monthly EMI, making payments more manageable in the short term. However, you will pay interest over more months, which significantly increases the total interest paid over the life of the loan. A shorter tenure increases your monthly payment but saves substantial money on total interest.",
  },
  {
    question: "Can I pay off my loan early or make prepayments?",
    answer: "Most financial institutions allow prepayments or lump-sum principal payments. Prepayments directly reduce your outstanding principal balance, which immediately lowers future interest charges and either shortens your remaining loan term or reduces your future EMI. Always check your lender's policy regarding prepayment penalties.",
  },
  {
    question: "What happens if the interest rate is 0%?",
    answer: "For zero-interest promotions (such as 0% APR financing on electronics or promotional vehicle offers), your EMI is calculated simply as the loan principal divided by the total number of payment periods. There are zero interest charges, so your total repayment equals your original borrowed principal.",
  },
];

const RELATED_TOOLS: RelatedToolItem[] = [
  {
    title: "Personal Loan Calculator",
    description: "Compare reducing balance vs flat rate loans and estimate fees.",
    href: "/free-tools/personal-loan-calculator",
    badge: "Personal Finance",
  },
  {
    title: "Home Loan & Mortgage Calculator",
    description: "Calculate mortgage payments with down payment, taxes, and extra payments.",
    href: "/free-tools/home-loan-calculator",
    badge: "Property",
  },
  {
    title: "Vehicle Loan Calculator",
    description: "Calculate auto financing with trade-in credits, sales tax, and dealer fees.",
    href: "/free-tools/vehicle-loan-calculator",
    badge: "Auto Finance",
  },
  {
    title: "Debt Repayment Calculator",
    description: "Accelerate debt freedom using the Snowball or Avalanche strategies.",
    href: "/free-tools/debt-repayment-calculator",
    badge: "Debt Free",
  },
];

export function LoanEMICalculatorView() {
  const [currency, setCurrency] = useState<SupportedCurrency>("USD");
  const [loanAmount, setLoanAmount] = useState<number>(100000);
  const [annualRate, setAnnualRate] = useState<number>(7.5);
  const [tenureYears, setTenureYears] = useState<number>(15);
  const [tenureMonths, setTenureMonths] = useState<number>(0);
  const [frequency, setFrequency] = useState<PaymentFrequency>("monthly");
  const [copied, setCopied] = useState<boolean>(false);

  const result = useMemo(() => {
    return calculateLoanEMI({
      loanAmount,
      annualInterestRate: annualRate,
      tenureYears,
      tenureMonths,
      paymentFrequency: frequency,
      currency,
    });
  }, [loanAmount, annualRate, tenureYears, tenureMonths, frequency, currency]);

  
  const inputParams: ReportInputParam[] = [
    { label: "Loan Principal", value: formatLoanCurrency(loanAmount, currency) },
    { label: "Annual Interest Rate", value: `${annualRate}%` },
    { label: "Loan Tenure", value: `${tenureYears} Years (${tenureMonths} Months)` },
    { label: "Payment Frequency", value: frequency.charAt(0).toUpperCase() + frequency.slice(1) },
    { label: "Reporting Currency", value: currency },
  ];

  const printableScheduleRows: ReportScheduleRow[] = (result.yearlySummary && result.yearlySummary.length > 0)
    ? result.yearlySummary.map((y) => ({
        period: `Year ${y.year}`,
        beginningBalance: formatLoanCurrency(y.beginningBalance, currency),
        principal: formatLoanCurrency(y.totalPrincipal, currency),
        interest: formatLoanCurrency(y.totalInterest, currency),
        payment: formatLoanCurrency(y.totalPayment, currency),
        endingBalance: formatLoanCurrency(y.endingBalance, currency),
      }))
    : result.amortizationSchedule.slice(0, 36).map((r) => ({
        period: r.label || `Month ${r.period}`,
        beginningBalance: formatLoanCurrency(r.beginningBalance, currency),
        principal: formatLoanCurrency(r.principal, currency),
        interest: formatLoanCurrency(r.interest, currency),
        payment: formatLoanCurrency(r.payment, currency),
        endingBalance: formatLoanCurrency(r.endingBalance, currency),
      }));

  const handlePrint = () => {
    window.print();
  };

  const handleCopySummary = () => {
    const summary = [
      "=== Saviora Loan EMI Calculation Summary ===",
      `Loan Principal: ${formatLoanCurrency(result.principal, currency)}`,
      `Annual Interest Rate: ${annualRate}%`,
      `Loan Tenure: ${tenureYears} Years ${tenureMonths > 0 ? `${tenureMonths} Months` : ""}`,
      `Payment Frequency: ${frequency}`,
      `Periodic Payment: ${formatLoanCurrency(result.periodicPayment, currency)}`,
      `Total Number of Payments: ${result.totalPaymentsCount}`,
      `Total Interest Payable: ${formatLoanCurrency(result.totalInterest, currency)}`,
      `Total Repayment Amount: ${formatLoanCurrency(result.totalRepayment, currency)}`,
      `Principal vs Interest: ${result.principalPercentage}% / ${result.interestPercentage}%`,
      "Calculated free at https://saviora.app/free-tools/loan-emi-calculator",
    ].join("\n");

    navigator.clipboard.writeText(summary);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleReset = () => {
    setLoanAmount(100000);
    setAnnualRate(7.5);
    setTenureYears(15);
    setTenureMonths(0);
    setFrequency("monthly");
  };

  const breakdownSlices = [
    { label: "Principal", amount: result.principal, color: "#10b981" },
    { label: "Total Interest", amount: result.totalInterest, color: "#F6850C" },
  ];

  return (
    <div className="pt-32 sm:pt-36 lg:pt-40 pb-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* On-screen Interactive UI (Hidden during print) */}
      <div className="print:hidden">
      <LoanBreadcrumb items={[{ label: "Loan EMI Calculator" }]} />

      <LoanCalculatorHero
        badge="Free Loan EMI Calculator"
        title="Loan EMI & Amortization Calculator"
        description="Calculate your exact monthly loan instalment, total interest charges, and comprehensive amortization schedule for any fixed-rate loan worldwide."
      />

      {/* Main Calculator Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Form Inputs */}
        <div className="lg:col-span-6 bg-white rounded-3xl p-6 sm:p-8 border border-gray-200/80 shadow-xs">
          <div className="flex items-center justify-between pb-5 border-b border-gray-100 mb-6">
            <h2 className="text-lg font-bold text-gray-900 flex items-center gap-2">
              <Calculator className="w-5 h-5 text-emerald-600" />
              <span>Loan Details</span>
            </h2>
            <CurrencySelector selectedCurrency={currency} onSelectCurrency={setCurrency} />
          </div>

          <div className="space-y-5">
            {/* Loan Amount */}
            <div>
              <div className="flex justify-between items-center mb-1.5">
                <label className="text-xs font-semibold text-gray-700">Loan Principal Amount</label>
                <span className="text-xs font-bold text-emerald-700">
                  {formatLoanCurrency(loanAmount, currency)}
                </span>
              </div>
              <div className="relative">
                <input
                  type="number"
                  min="0"
                  step="1000"
                  value={loanAmount || ""}
                  onChange={(e) => setLoanAmount(Number(e.target.value))}
                  className="w-full text-sm font-semibold text-gray-900 bg-gray-50/80 border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-white transition"
                  placeholder="e.g. 100000"
                />
              </div>
              <div className="flex gap-2 mt-2">
                {[10000, 50000, 100000, 250000, 500000].map((amt) => (
                  <button
                    key={amt}
                    type="button"
                    onClick={() => setLoanAmount(amt)}
                    className="text-[10px] font-semibold bg-gray-100 hover:bg-gray-200 text-gray-700 px-2 py-1 rounded-md transition"
                  >
                    +{formatLoanCurrency(amt, currency, { compact: true })}
                  </button>
                ))}
              </div>
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
                step="0.1"
                value={annualRate || ""}
                onChange={(e) => setAnnualRate(Number(e.target.value))}
                className="w-full text-sm font-semibold text-gray-900 bg-gray-50/80 border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-white transition"
                placeholder="e.g. 7.5"
              />
              <div className="flex gap-2 mt-2">
                {[5, 7.5, 9, 11, 14].map((r) => (
                  <button
                    key={r}
                    type="button"
                    onClick={() => setAnnualRate(r)}
                    className="text-[10px] font-semibold bg-gray-100 hover:bg-gray-200 text-gray-700 px-2 py-1 rounded-md transition"
                  >
                    {r}%
                  </button>
                ))}
              </div>
            </div>

            {/* Tenure */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-semibold text-gray-700 block mb-1.5">Tenure (Years)</label>
                <input
                  type="number"
                  min="0"
                  max="40"
                  value={tenureYears}
                  onChange={(e) => setTenureYears(Math.max(0, Number(e.target.value)))}
                  className="w-full text-sm font-semibold text-gray-900 bg-gray-50/80 border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-white transition"
                />
              </div>
              <div>
                <label className="text-xs font-semibold text-gray-700 block mb-1.5">Extra (Months)</label>
                <input
                  type="number"
                  min="0"
                  max="11"
                  value={tenureMonths}
                  onChange={(e) => setTenureMonths(Math.max(0, Number(e.target.value)))}
                  className="w-full text-sm font-semibold text-gray-900 bg-gray-50/80 border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-white transition"
                />
              </div>
            </div>

            <div className="flex gap-2">
              {[3, 5, 10, 15, 20, 30].map((yr) => (
                <button
                  key={yr}
                  type="button"
                  onClick={() => { setTenureYears(yr); setTenureMonths(0); }}
                  className={`text-[10px] font-semibold px-2 py-1 rounded-md transition ${
                    tenureYears === yr && tenureMonths === 0
                      ? "bg-emerald-600 text-white"
                      : "bg-gray-100 hover:bg-gray-200 text-gray-700"
                  }`}
                >
                  {yr}Y
                </button>
              ))}
            </div>

            {/* Payment Frequency */}
            <div>
              <label className="text-xs font-semibold text-gray-700 block mb-1.5">Payment Frequency</label>
              <select
                value={frequency}
                onChange={(e) => setFrequency(e.target.value as PaymentFrequency)}
                className="w-full text-sm font-semibold text-gray-900 bg-gray-50/80 border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-white transition cursor-pointer"
              >
                <option value="monthly">Monthly (12 payments/yr)</option>
                <option value="quarterly">Quarterly (4 payments/yr)</option>
                <option value="semi-annually">Semi-Annually (2 payments/yr)</option>
                <option value="annually">Annually (1 payment/yr)</option>
                <option value="bi-weekly">Bi-Weekly (26 payments/yr)</option>
                <option value="weekly">Weekly (52 payments/yr)</option>
              </select>
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

        {/* Right Column: Results & Visual Breakdown */}
        <div className="lg:col-span-6 space-y-6">
          {/* Main EMI Card */}
          <div className="bg-gradient-to-br from-emerald-600 via-teal-700 to-emerald-900 rounded-3xl p-6 sm:p-8 text-white shadow-lg relative overflow-hidden">
            <div className="relative z-10">
              <div className="text-xs font-semibold uppercase tracking-wider text-emerald-200">
                Estimated Periodic Payment
              </div>
              <div className="mt-2 text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-white">
                {formatLoanCurrency(result.periodicPayment, currency)}
                <span className="text-xs sm:text-sm font-medium text-emerald-200 ml-1.5">
                  / {frequency === "bi-weekly" ? "2-weeks" : frequency === "weekly" ? "week" : "month"}
                </span>
              </div>

              {frequency !== "monthly" && (
                <div className="text-xs text-emerald-100 mt-1">
                  Monthly Equivalent: <strong>{formatLoanCurrency(result.monthlyEquivalent, currency)}</strong>
                </div>
              )}

              {/* Stats Grid */}
              <div className="grid grid-cols-2 gap-4 mt-6 pt-6 border-t border-emerald-500/30">
                <div>
                  <div className="text-xs text-emerald-200">Total Interest Payable</div>
                  <div className="text-lg sm:text-xl font-bold text-white mt-0.5">
                    {formatLoanCurrency(result.totalInterest, currency)}
                  </div>
                </div>
                <div>
                  <div className="text-xs text-emerald-200">Total Repayment Amount</div>
                  <div className="text-lg sm:text-xl font-bold text-white mt-0.5">
                    {formatLoanCurrency(result.totalRepayment, currency)}
                  </div>
                </div>
                <div>
                  <div className="text-xs text-emerald-200">Total Payments</div>
                  <div className="text-base sm:text-lg font-bold text-white mt-0.5">
                    {result.totalPaymentsCount} instalments
                  </div>
                </div>
                <div>
                  <div className="text-xs text-emerald-200">Interest-to-Principal</div>
                  <div className="text-base sm:text-lg font-bold text-white mt-0.5">
                    {result.interestPercentage}% / {result.principalPercentage}%
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Visual Breakdown Donut */}
          <LoanVisualBreakdown
            slices={breakdownSlices}
            currency={currency}
            centerTitle="Repayment"
            centerValue={formatLoanCurrency(result.totalRepayment, currency, { compact: true })}
          />
        </div>
      </div>

      {/* Amortization Table */}
      <AmortizationScheduleTable
        schedule={result.amortizationSchedule}
        yearlySummary={result.yearlySummary}
        currency={currency}
        loanTitle="Loan Amortization & Repayment Schedule"
      />

      {/* Educational & Explanatory Sections */}
      <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-8 text-gray-700">
        <div className="bg-white p-6 sm:p-8 rounded-3xl border border-gray-200/80 shadow-xs">
          <h3 className="text-lg font-bold text-gray-900 mb-3">How to Use This Calculator</h3>
          <ol className="list-decimal list-inside space-y-2 text-xs sm:text-sm text-gray-600 leading-relaxed">
            <li><strong>Enter your Loan Amount:</strong> Type the total borrowed principal amount.</li>
            <li><strong>Input the Interest Rate:</strong> Enter the annual interest rate quoted by your lender.</li>
            <li><strong>Select Tenure:</strong> Set your preferred duration in years and additional months.</li>
            <li><strong>Choose Payment Frequency:</strong> Default is monthly, or choose bi-weekly/weekly.</li>
            <li><strong>Analyze the Results:</strong> Review your periodic EMI, total interest, and full amortization schedule.</li>
            <li><strong>Export or Print:</strong> Click "Export CSV" to save the payment breakdown for budgeting.</li>
          </ol>
        </div>

        <div className="bg-white p-6 sm:p-8 rounded-3xl border border-gray-200/80 shadow-xs">
          <h3 className="text-lg font-bold text-gray-900 mb-3">How the Calculation Works</h3>
          <p className="text-xs sm:text-sm text-gray-600 mb-3">
            This calculator implements the standard reducing-balance periodic payment formula:
          </p>
          <div className="bg-gray-50 p-3 rounded-xl font-mono text-xs text-emerald-800 border border-gray-200 mb-3 text-center">
            EMI = [P × r × (1 + r)^n] / [(1 + r)^n - 1]
          </div>
          <ul className="text-xs text-gray-600 space-y-1">
            <li><strong>P</strong> = Principal borrowed amount</li>
            <li><strong>r</strong> = Periodic interest rate (Annual Rate / Periods per Year)</li>
            <li><strong>n</strong> = Total number of repayment periods</li>
          </ul>
        </div>
      </div>

      {/* Worked Example */}
      <div className="mt-8 bg-emerald-50/50 p-6 sm:p-8 rounded-3xl border border-emerald-100">
        <h3 className="text-lg font-bold text-emerald-950 mb-2">Example Calculation</h3>
        <p className="text-xs sm:text-sm text-emerald-900 leading-relaxed">
          Suppose you borrow <strong>$100,000</strong> at an annual fixed rate of <strong>7.5%</strong> for <strong>15 years</strong> (180 monthly payments):
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-4 text-xs font-semibold">
          <div className="bg-white p-3 rounded-xl border border-emerald-200/60">
            <span className="text-gray-500 block text-[10px]">Monthly EMI</span>
            <span className="text-base font-bold text-emerald-800">$927.01</span>
          </div>
          <div className="bg-white p-3 rounded-xl border border-emerald-200/60">
            <span className="text-gray-500 block text-[10px]">Total Interest Paid</span>
            <span className="text-base font-bold text-amber-700">$66,862.27</span>
          </div>
          <div className="bg-white p-3 rounded-xl border border-emerald-200/60">
            <span className="text-gray-500 block text-[10px]">Total Repayment</span>
            <span className="text-base font-bold text-gray-900">$166,862.27</span>
          </div>
        </div>
      </div>

      {/* FAQs */}
      <LoanCalculatorFAQ faqs={FAQS} />

      {/* Related Tools */}
      <LoanRelatedTools tools={RELATED_TOOLS} />

      {/* Saviora Product CTA */}
      <LoanProductCTA />
    
      </div>

      {/* Official Printable Financial Assessment Report (Rendered only on print / PDF generation) */}
      <PrintCalculationReport
        reportTitle="Loan EMI &amp; Repayment Assessment Report"
        calculatorName="Loan EMI Calculator"
        currency={currency}
        inputParams={inputParams}
        primaryMetric={{
          label: "Monthly EMI Payment",
          value: `${formatLoanCurrency(result.periodicPayment, currency)} / month`,
          subtext: `Total Repayment: ${formatLoanCurrency(result.totalRepayment, currency)}`,
        }}
        keyMetrics={[
          { label: "Principal Amount", value: formatLoanCurrency(result.principal, currency) },
          { label: "Total Interest Payable", value: formatLoanCurrency(result.totalInterest, currency) },
          { label: "Total Repayment", value: formatLoanCurrency(result.totalRepayment, currency) },
          { label: "Total Payments", value: `${result.totalPaymentsCount} installments` },
          { label: "Principal Share", value: `${result.principalPercentage.toFixed(1)}%` },
          { label: "Interest Share", value: `${result.interestPercentage.toFixed(1)}%` },
        ]}
        breakdownSummary={{
          principalAmount: formatLoanCurrency(result.principal, currency),
          principalPercent: `${result.principalPercentage.toFixed(1)}%`,
          interestAmount: formatLoanCurrency(result.totalInterest, currency),
          interestPercent: `${result.interestPercentage.toFixed(1)}%`,
          totalAmount: formatLoanCurrency(result.totalRepayment, currency),
        }}
        scheduleRows={printableScheduleRows}
        scheduleTitle="Annual Repayment Schedule Summary"
      />
    </div>
  );
}