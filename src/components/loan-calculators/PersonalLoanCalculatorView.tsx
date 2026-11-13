"use client";

import React, { useState, useMemo } from "react";
import { SupportedCurrency, formatLoanCurrency } from "@/lib/loan-calculators/currencies";
import { PersonalLoanMethod } from "@/lib/loan-calculators/types";
import { calculatePersonalLoan } from "@/lib/loan-calculators/engines/personalLoan";
import { LoanBreadcrumb } from "./shared/LoanBreadcrumb";
import { LoanCalculatorHero } from "./shared/LoanCalculatorHero";
import { CurrencySelector } from "./shared/CurrencySelector";
import { LoanVisualBreakdown } from "./shared/LoanVisualBreakdown";
import { AmortizationScheduleTable } from "./shared/AmortizationScheduleTable";
import { LoanCalculatorFAQ, FAQItem } from "./shared/LoanCalculatorFAQ";
import { LoanRelatedTools, RelatedToolItem } from "./shared/LoanRelatedTools";
import { LoanProductCTA } from "./shared/LoanProductCTA";
import { PrintCalculationReport, ReportInputParam, ReportScheduleRow } from "./shared/PrintCalculationReport";
import { Printer, Copy, Check, RotateCcw, Calculator, ArrowRight, DollarSign, Calendar, Percent, AlertCircle } from "lucide-react";

const FAQS: FAQItem[] = [
  {
    question: "What is the difference between Reducing Balance and Flat Rate interest?",
    answer: "In a reducing balance loan, interest is calculated only on the remaining unpaid principal at each period. As you repay the principal, future interest charges decrease. In a flat rate loan, interest is calculated on the entire initial principal amount for the full tenure, meaning you pay interest on money you have already repaid. A 10% flat rate loan is approximately equivalent to an 18% reducing balance loan!",
  },
  {
    question: "What are processing fees and how do they impact my loan?",
    answer: "Lenders often charge an upfront administrative processing fee (typically 1% to 3% of the loan amount). Some lenders deduct this fee directly from your disbursement (you receive less cash than approved), while others add it to the loan. These fees increase your effective Annual Percentage Rate (APR).",
  },
  {
    question: "What is the Total Cost of Borrowing?",
    answer: "The total cost of borrowing includes all expenses incurred beyond the principal you borrowed: total interest charges + loan processing fees + administrative charges. This metric tells you the true financial cost of taking out the loan.",
  },
  {
    question: "Can I use this calculator to compare two loan offers?",
    answer: "Yes! You can test different interest rates, tenure lengths, processing fees, or toggle between flat rate and reducing balance to see which lender offer delivers the lowest monthly payment and lowest total borrowing cost.",
  },
];

const RELATED_TOOLS: RelatedToolItem[] = [
  {
    title: "Loan EMI Calculator",
    description: "Standard reducing balance EMI calculator with detailed amortization schedule.",
    href: "/free-tools/loan-emi-calculator",
    badge: "Core Tool",
  },
  {
    title: "Credit Card Interest Calculator",
    description: "Compare credit card interest and payoff strategies against personal loan consolidation.",
    href: "/free-tools/credit-card-interest-calculator",
    badge: "Debt Management",
  },
  {
    title: "Debt Repayment Calculator",
    description: "Plan multi-debt payoff using the Snowball or Avalanche strategies.",
    href: "/free-tools/debt-repayment-calculator",
    badge: "Debt Payoff",
  },
];

export function PersonalLoanCalculatorView() {
  const [currency, setCurrency] = useState<SupportedCurrency>("USD");
  const [loanAmount, setLoanAmount] = useState<number>(15000);
  const [annualRate, setAnnualRate] = useState<number>(10.5);
  const [tenureMonths, setTenureMonths] = useState<number>(36);
  const [method, setMethod] = useState<PersonalLoanMethod>("reducing");
  const [feePercent, setFeePercent] = useState<number>(1.5);
  const [feeFlat, setFeeFlat] = useState<number>(0);
  const [addCharges, setAddCharges] = useState<number>(50);
  const [feeDeducted, setFeeDeducted] = useState<boolean>(true);
  const [copied, setCopied] = useState<boolean>(false);

  const result = useMemo(() => {
    return calculatePersonalLoan({
      loanAmount,
      annualInterestRate: annualRate,
      tenureMonths,
      method,
      processingFeePercent: feePercent,
      processingFeeFlat: feeFlat,
      additionalCharges: addCharges,
      feeDeductedFromDisbursement: feeDeducted,
      currency,
    });
  }, [loanAmount, annualRate, tenureMonths, method, feePercent, feeFlat, addCharges, feeDeducted, currency]);

  
  const inputParams: ReportInputParam[] = [
    { label: "Requested Loan Amount", value: formatLoanCurrency(loanAmount, currency) },
    { label: "Annual Interest Rate", value: `${annualRate}%` },
    { label: "Loan Tenure", value: `${tenureMonths} Months (${(tenureMonths / 12).toFixed(1)} Years)` },
    { label: "Calculation Method", value: method === "reducing" ? "Reducing Balance (Standard)" : "Flat Rate" },
    { label: "Processing Fee", value: `${feePercent}% (${formatLoanCurrency(result.totalProcessingFees, currency)})` },
    { label: "Fee Handling", value: feeDeducted ? "Deducted upfront from disbursement" : "Financed into monthly payments" },
    { label: "Additional Charges", value: formatLoanCurrency(addCharges, currency) },
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
      "=== Saviora Personal Loan Calculation Summary ===",
      `Requested Loan Amount: ${formatLoanCurrency(result.loanAmount, currency)}`,
      `Interest Method: ${method === "reducing" ? "Reducing Balance" : "Flat Rate"}`,
      `Interest Rate: ${annualRate}%`,
      `Effective APR: ${result.effectiveAPR}%`,
      `Tenure: ${tenureMonths} Months (${(tenureMonths / 12).toFixed(1)} Years)`,
      `Monthly Payment: ${formatLoanCurrency(result.monthlyPayment, currency)}`,
      `Net Cash Disbursement: ${formatLoanCurrency(result.netDisbursement, currency)}`,
      `Total Interest: ${formatLoanCurrency(result.totalInterest, currency)}`,
      `Total Fees & Charges: ${formatLoanCurrency(result.totalLoanCharges, currency)}`,
      `Total Cost of Borrowing: ${formatLoanCurrency(result.totalCostOfBorrowing, currency)}`,
      `Total Repayment Amount: ${formatLoanCurrency(result.totalRepayment, currency)}`,
      "Calculated free at https://saviora.app/free-tools/personal-loan-calculator",
    ].join("\n");

    navigator.clipboard.writeText(summary);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleReset = () => {
    setLoanAmount(15000);
    setAnnualRate(10.5);
    setTenureMonths(36);
    setMethod("reducing");
    setFeePercent(1.5);
    setFeeFlat(0);
    setAddCharges(50);
    setFeeDeducted(true);
  };

  const breakdownSlices = [
    { label: "Principal", amount: result.loanAmount, color: "#10b981" },
    { label: "Total Interest", amount: result.totalInterest, color: "#F6850C" },
    { label: "Fees & Charges", amount: result.totalLoanCharges, color: "#6366f1" },
  ];

  return (
    <div className="pt-32 sm:pt-36 lg:pt-40 pb-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* On-screen Interactive UI (Hidden during print) */}
      <div className="print:hidden">
      <LoanBreadcrumb items={[{ label: "Personal Loan Calculator" }]} />

      <LoanCalculatorHero
        badge="Personal Loan Calculator"
        title="Personal Loan EMI & Cost of Borrowing Calculator"
        description="Estimate your monthly instalments, compare Reducing Balance vs Flat Rate interest, and understand the true cost of borrowing including processing fees."
      />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Form */}
        <div className="lg:col-span-6 bg-white rounded-3xl p-6 sm:p-8 border border-gray-200/80 shadow-xs">
          <div className="flex items-center justify-between pb-5 border-b border-gray-100 mb-6">
            <h2 className="text-lg font-bold text-gray-900 flex items-center gap-2">
              <Calculator className="w-5 h-5 text-emerald-600" />
              <span>Personal Loan Details</span>
            </h2>
            <CurrencySelector selectedCurrency={currency} onSelectCurrency={setCurrency} />
          </div>

          <div className="space-y-5">
            {/* Interest Method Toggle */}
            <div>
              <label className="text-xs font-semibold text-gray-700 block mb-1.5">
                Interest Calculation Method
              </label>
              <div className="grid grid-cols-2 gap-2 p-1 bg-gray-100 rounded-xl">
                <button
                  type="button"
                  onClick={() => setMethod("reducing")}
                  className={`py-2 text-xs font-bold rounded-lg transition ${
                    method === "reducing"
                      ? "bg-white text-gray-900 shadow-2xs"
                      : "text-gray-600 hover:text-gray-900"
                  }`}
                >
                  Reducing Balance (Standard)
                </button>
                <button
                  type="button"
                  onClick={() => setMethod("flat")}
                  className={`py-2 text-xs font-bold rounded-lg transition ${
                    method === "flat"
                      ? "bg-white text-gray-900 shadow-2xs"
                      : "text-gray-600 hover:text-gray-900"
                  }`}
                >
                  Flat Rate Interest
                </button>
              </div>
              {method === "flat" && (
                <div className="mt-2 p-2.5 rounded-lg bg-amber-50 border border-amber-200 text-[11px] text-amber-800 flex items-start gap-1.5">
                  <AlertCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                  <span>
                    <strong>Caution:</strong> Flat rate interest is charged on the initial principal for the full tenure. A 10% flat rate loan has an effective APR of ~18%!
                  </span>
                </div>
              )}
            </div>

            {/* Loan Amount */}
            <div>
              <div className="flex justify-between items-center mb-1.5">
                <label className="text-xs font-semibold text-gray-700">Requested Loan Amount</label>
                <span className="text-xs font-bold text-emerald-700">
                  {formatLoanCurrency(loanAmount, currency)}
                </span>
              </div>
              <input
                type="number"
                min="0"
                step="500"
                value={loanAmount || ""}
                onChange={(e) => setLoanAmount(Number(e.target.value))}
                className="w-full text-sm font-semibold text-gray-900 bg-gray-50/80 border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-white transition"
              />
              <div className="flex gap-2 mt-2">
                {[5000, 10000, 15000, 25000, 50000].map((amt) => (
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
              />
            </div>

            {/* Tenure in Months */}
            <div>
              <div className="flex justify-between items-center mb-1.5">
                <label className="text-xs font-semibold text-gray-700">Loan Tenure</label>
                <span className="text-xs font-bold text-emerald-700">
                  {tenureMonths} Months ({(tenureMonths / 12).toFixed(1)} Yrs)
                </span>
              </div>
              <input
                type="number"
                min="1"
                max="120"
                value={tenureMonths || ""}
                onChange={(e) => setTenureMonths(Math.max(1, Number(e.target.value)))}
                className="w-full text-sm font-semibold text-gray-900 bg-gray-50/80 border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-white transition"
              />
              <div className="flex gap-2 mt-2">
                {[12, 24, 36, 48, 60].map((m) => (
                  <button
                    key={m}
                    type="button"
                    onClick={() => setTenureMonths(m)}
                    className={`text-[10px] font-semibold px-2.5 py-1 rounded-md transition ${
                      tenureMonths === m
                        ? "bg-emerald-600 text-white"
                        : "bg-gray-100 hover:bg-gray-200 text-gray-700"
                    }`}
                  >
                    {m}M ({m / 12}Y)
                  </button>
                ))}
              </div>
            </div>

            {/* Fees & Charges Section */}
            <div className="p-4 bg-gray-50/80 rounded-2xl border border-gray-200/70 space-y-3">
              <span className="text-xs font-bold text-gray-800 block">Lender Fees &amp; Charges</span>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-[11px] text-gray-600 block mb-1">Processing Fee (%)</label>
                  <input
                    type="number"
                    min="0"
                    step="0.1"
                    value={feePercent || ""}
                    onChange={(e) => setFeePercent(Number(e.target.value))}
                    className="w-full text-xs font-semibold text-gray-900 bg-white border border-gray-200 rounded-lg p-2 focus:ring-2 focus:ring-emerald-500 outline-none"
                  />
                </div>
                <div>
                  <label className="text-[11px] text-gray-600 block mb-1">Additional Charges ({currency})</label>
                  <input
                    type="number"
                    min="0"
                    value={addCharges || ""}
                    onChange={(e) => setAddCharges(Number(e.target.value))}
                    className="w-full text-xs font-semibold text-gray-900 bg-white border border-gray-200 rounded-lg p-2 focus:ring-2 focus:ring-emerald-500 outline-none"
                  />
                </div>
              </div>
              <label className="flex items-center gap-2 cursor-pointer pt-1">
                <input
                  type="checkbox"
                  checked={feeDeducted}
                  onChange={(e) => setFeeDeducted(e.target.checked)}
                  className="rounded text-emerald-600 focus:ring-emerald-500"
                />
                <span className="text-[11px] text-gray-600">
                  Deduct fees upfront from loan disbursement
                </span>
              </label>
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
                Monthly Loan Instalment
              </div>
              <div className="mt-2 text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-white">
                {formatLoanCurrency(result.monthlyPayment, currency)}
                <span className="text-xs sm:text-sm font-medium text-emerald-200 ml-1.5">/ month</span>
              </div>

              <div className="grid grid-cols-2 gap-4 mt-6 pt-6 border-t border-emerald-500/30">
                <div>
                  <div className="text-xs text-emerald-200">Net Cash Disbursed</div>
                  <div className="text-lg sm:text-xl font-bold text-white mt-0.5">
                    {formatLoanCurrency(result.netDisbursement, currency)}
                  </div>
                </div>
                <div>
                  <div className="text-xs text-emerald-200">Total Borrowing Cost</div>
                  <div className="text-lg sm:text-xl font-bold text-white mt-0.5">
                    {formatLoanCurrency(result.totalCostOfBorrowing, currency)}
                  </div>
                </div>
                <div>
                  <div className="text-xs text-emerald-200">Total Interest</div>
                  <div className="text-base sm:text-lg font-bold text-white mt-0.5">
                    {formatLoanCurrency(result.totalInterest, currency)}
                  </div>
                </div>
                <div>
                  <div className="text-xs text-emerald-200">Estimated APR</div>
                  <div className="text-base sm:text-lg font-bold text-white mt-0.5">
                    {result.effectiveAPR}%
                  </div>
                </div>
              </div>
            </div>
          </div>

          <LoanVisualBreakdown
            slices={breakdownSlices}
            currency={currency}
            centerTitle="Total Cost"
            centerValue={formatLoanCurrency(result.totalRepayment + (feeDeducted ? 0 : result.totalLoanCharges), currency, { compact: true })}
          />
        </div>
      </div>

      <AmortizationScheduleTable
        schedule={result.amortizationSchedule}
        yearlySummary={result.yearlySummary}
        currency={currency}
        loanTitle="Personal Loan Amortization Schedule"
      />

      <LoanCalculatorFAQ faqs={FAQS} />
      <LoanRelatedTools tools={RELATED_TOOLS} />
      <LoanProductCTA />
    
      </div>

      {/* Official Printable Financial Assessment Report (Rendered only on print / PDF generation) */}
      <PrintCalculationReport
        reportTitle="Personal Loan Assessment &amp; Cost Report"
        calculatorName="Personal Loan Calculator"
        currency={currency}
        inputParams={inputParams}
        primaryMetric={{
          label: "Monthly Payment (EMI)",
          value: `${formatLoanCurrency(result.monthlyPayment, currency)} / month`,
          subtext: `Disbursed: ${formatLoanCurrency(result.netDisbursement, currency)}`,
        }}
        keyMetrics={[
          { label: "Net Disbursed", value: formatLoanCurrency(result.netDisbursement, currency) },
          { label: "Total Interest", value: formatLoanCurrency(result.totalInterest, currency) },
          { label: "Total Loan Charges", value: formatLoanCurrency(result.totalLoanCharges, currency) },
          { label: "Effective APR", value: `${result.effectiveAPR.toFixed(2)}%` },
          { label: "Total Cost of Borrowing", value: formatLoanCurrency(result.totalCostOfBorrowing, currency) },
          { label: "Total Repayment", value: formatLoanCurrency(result.totalRepayment, currency) },
        ]}
        breakdownSummary={{
          principalAmount: formatLoanCurrency(result.loanAmount, currency),
          principalPercent: `${result.totalRepayment > 0 ? ((result.loanAmount / result.totalRepayment) * 100).toFixed(1) : 0}%`,
          interestAmount: formatLoanCurrency(result.totalInterest, currency),
          interestPercent: `${result.totalRepayment > 0 ? ((result.totalInterest / result.totalRepayment) * 100).toFixed(1) : 0}%`,
          feesAmount: formatLoanCurrency(result.totalLoanCharges, currency),
          totalAmount: formatLoanCurrency(result.totalRepayment, currency),
        }}
        scheduleRows={printableScheduleRows}
        scheduleTitle="Annual Repayment Schedule Summary"
      />
    </div>
  );
}