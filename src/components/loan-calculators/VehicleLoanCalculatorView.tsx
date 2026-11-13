"use client";

import React, { useState, useMemo } from "react";
import { SupportedCurrency, formatLoanCurrency } from "@/lib/loan-calculators/currencies";
import { calculateVehicleLoan } from "@/lib/loan-calculators/engines/vehicleLoan";
import { LoanBreadcrumb } from "./shared/LoanBreadcrumb";
import { LoanCalculatorHero } from "./shared/LoanCalculatorHero";
import { CurrencySelector } from "./shared/CurrencySelector";
import { LoanVisualBreakdown } from "./shared/LoanVisualBreakdown";
import { AmortizationScheduleTable } from "./shared/AmortizationScheduleTable";
import { LoanCalculatorFAQ, FAQItem } from "./shared/LoanCalculatorFAQ";
import { LoanRelatedTools, RelatedToolItem } from "./shared/LoanRelatedTools";
import { LoanProductCTA } from "./shared/LoanProductCTA";
import { PrintCalculationReport, ReportInputParam, ReportScheduleRow } from "./shared/PrintCalculationReport";
import { Copy, Check, RotateCcw, Car, Percent, Printer } from "lucide-react";

const FAQS: FAQItem[] = [
  {
    question: "How does a trade-in value affect my car loan?",
    answer: "A trade-in reduces the net purchase price of your vehicle. The dealer gives you credit for your old car, which acts directly like an additional down payment. This reduces the financed loan amount, lowering both your monthly payment and total interest paid over time.",
  },
  {
    question: "Should I finance sales tax and dealer fees or pay them upfront?",
    answer: "Rolling taxes and registration fees into your loan increases your financed principal and raises your monthly payment. Paying fees upfront lowers your Loan-to-Value (LTV) ratio and prevents you from becoming 'upside-down' (owing more than the vehicle is worth) as the car depreciates.",
  },
  {
    question: "What is the recommended auto loan tenure?",
    answer: "Financial advisors generally recommend a tenure of 48 to 60 months (4 to 5 years). While 72- or 84-month loans offer lower monthly payments, they cause you to pay substantially more in total interest and increase the risk of negative equity.",
  },
  {
    question: "Can I pay bi-weekly instead of monthly?",
    answer: "Yes! Paying bi-weekly results in 26 half-payments per year (equivalent to 13 full monthly payments), which pays down principal faster and saves interest compared to 12 monthly payments.",
  },
];

const RELATED_TOOLS: RelatedToolItem[] = [
  {
    title: "Personal Loan Calculator",
    description: "Compare secured auto financing against unsecured personal loans.",
    href: "/free-tools/personal-loan-calculator",
    badge: "Alternative Financing",
  },
  {
    title: "Loan EMI Calculator",
    description: "General loan instalment calculator with full payment schedules.",
    href: "/free-tools/loan-emi-calculator",
    badge: "Core EMI",
  },
  {
    title: "Debt Repayment Calculator",
    description: "Pay down vehicle debt faster using Snowball or Avalanche strategies.",
    href: "/free-tools/debt-repayment-calculator",
    badge: "Debt Freedom",
  },
];

export function VehicleLoanCalculatorView() {
  const [currency, setCurrency] = useState<SupportedCurrency>("USD");
  const [price, setPrice] = useState<number>(32000);
  const [downPayment, setDownPayment] = useState<number>(4000);
  const [tradeIn, setTradeIn] = useState<number>(3000);
  const [taxRate, setTaxRate] = useState<number>(6.0);
  const [dealerFees, setDealerFees] = useState<number>(500);
  const [includeFees, setIncludeFees] = useState<boolean>(true);
  const [annualRate, setAnnualRate] = useState<number>(5.9);
  const [tenureMonths, setTenureMonths] = useState<number>(60);
  const [frequency, setFrequency] = useState<"monthly" | "bi-weekly">("monthly");
  const [copied, setCopied] = useState<boolean>(false);

  const result = useMemo(() => {
    return calculateVehicleLoan({
      vehiclePrice: price,
      downPayment,
      tradeInValue: tradeIn,
      salesTaxRate: taxRate,
      dealerFees,
      includeFeesInLoan: includeFees,
      annualInterestRate: annualRate,
      tenureMonths,
      paymentFrequency: frequency,
      currency,
    });
  }, [price, downPayment, tradeIn, taxRate, dealerFees, includeFees, annualRate, tenureMonths, frequency, currency]);

  const inputParams: ReportInputParam[] = [
    { label: "Vehicle Purchase Price", value: formatLoanCurrency(price, currency) },
    { label: "Cash Down Payment", value: formatLoanCurrency(downPayment, currency) },
    { label: "Trade-in Credit", value: formatLoanCurrency(tradeIn, currency) },
    { label: "Annual Interest Rate", value: `${annualRate}%` },
    { label: "Loan Tenure", value: `${tenureMonths} Months (${(tenureMonths / 12).toFixed(1)} Years)` },
    { label: "Payment Frequency", value: frequency === "monthly" ? "Monthly (12/year)" : "Bi-Weekly (26/year)" },
    { label: "Sales Tax Rate", value: `${taxRate}% (${formatLoanCurrency(result.salesTaxAmount, currency)})` },
    { label: "Dealer & Admin Fees", value: formatLoanCurrency(dealerFees, currency) },
    { label: "Fees Financed in Loan", value: includeFees ? "Yes (Rolled into loan)" : "No (Paid upfront)" },
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
      "=== Saviora Vehicle Loan Calculation Summary ===",
      `Vehicle Price: ${formatLoanCurrency(result.vehiclePrice, currency)}`,
      `Down Payment & Trade-In: ${formatLoanCurrency(result.totalUpfrontCredits, currency)}`,
      `Sales Tax & Fees: ${formatLoanCurrency(result.totalFees, currency)}`,
      `Financed Amount: ${formatLoanCurrency(result.financedAmount, currency)}`,
      `Annual Interest Rate: ${annualRate}%`,
      `Tenure: ${tenureMonths} Months (${tenureMonths / 12} Years)`,
      `Monthly Payment: ${formatLoanCurrency(result.periodicPayment, currency)}`,
      `Total Interest: ${formatLoanCurrency(result.totalInterest, currency)}`,
      `Total Vehicle Financing Cost: ${formatLoanCurrency(result.totalLoanRepayment, currency)}`,
      `Total Out-of-Pocket Cost: ${formatLoanCurrency(result.totalOutOfPocketCost, currency)}`,
      "Calculated free at https://saviora.app/free-tools/vehicle-loan-calculator",
    ].join("\n");

    navigator.clipboard.writeText(summary);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleReset = () => {
    setPrice(32000);
    setDownPayment(4000);
    setTradeIn(3000);
    setTaxRate(6.0);
    setDealerFees(500);
    setIncludeFees(true);
    setAnnualRate(5.9);
    setTenureMonths(60);
    setFrequency("monthly");
  };

  const breakdownSlices = [
    { label: "Financed Principal", amount: result.financedAmount, color: "#10b981" },
    { label: "Total Interest", amount: result.totalInterest, color: "#F6850C" },
    { label: "Down Payment & Trade-In", amount: result.totalUpfrontCredits, color: "#6366f1" },
  ];

  return (
    <div className="pt-32 sm:pt-36 lg:pt-40 pb-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* On-screen Interactive UI (Hidden during print) */}
      <div className="print:hidden">
      <LoanBreadcrumb items={[{ label: "Vehicle Loan Calculator" }]} />

      <LoanCalculatorHero
        badge="Car & Auto Loan Calculator"
        title="Vehicle & Car Loan EMI Calculator"
        description="Calculate monthly auto loan payments, apply down payments and trade-in credits, factor in sales taxes and fees, and compare different loan tenures side by side."
      />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Form */}
        <div className="lg:col-span-6 bg-white rounded-3xl p-6 sm:p-8 border border-gray-200/80 shadow-xs">
          <div className="flex items-center justify-between pb-5 border-b border-gray-100 mb-6">
            <h2 className="text-lg font-bold text-gray-900 flex items-center gap-2">
              <Car className="w-5 h-5 text-emerald-600" />
              <span>Vehicle Details</span>
            </h2>
            <CurrencySelector selectedCurrency={currency} onSelectCurrency={setCurrency} />
          </div>

          <div className="space-y-5">
            {/* Vehicle Price */}
            <div>
              <div className="flex justify-between items-center mb-1.5">
                <label className="text-xs font-semibold text-gray-700">Vehicle Purchase Price</label>
                <span className="text-xs font-bold text-emerald-700">
                  {formatLoanCurrency(price, currency)}
                </span>
              </div>
              <input
                type="number"
                min="0"
                step="1000"
                value={price || ""}
                onChange={(e) => setPrice(Number(e.target.value))}
                className="w-full text-sm font-semibold text-gray-900 bg-gray-50/80 border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-white transition"
              />
            </div>

            {/* Down Payment & Trade-in */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-semibold text-gray-700 block mb-1.5">Cash Down Payment</label>
                <input
                  type="number"
                  min="0"
                  step="500"
                  value={downPayment || ""}
                  onChange={(e) => setDownPayment(Number(e.target.value))}
                  className="w-full text-sm font-semibold text-gray-900 bg-gray-50/80 border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-white transition"
                />
              </div>
              <div>
                <label className="text-xs font-semibold text-gray-700 block mb-1.5">Trade-in Credit</label>
                <input
                  type="number"
                  min="0"
                  step="500"
                  value={tradeIn || ""}
                  onChange={(e) => setTradeIn(Number(e.target.value))}
                  className="w-full text-sm font-semibold text-gray-900 bg-gray-50/80 border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-white transition"
                />
              </div>
            </div>

            {/* Interest Rate & Frequency */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-semibold text-gray-700 block mb-1.5">Interest Rate (%)</label>
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
              <div>
                <label className="text-xs font-semibold text-gray-700 block mb-1.5">Payment Frequency</label>
                <select
                  value={frequency}
                  onChange={(e) => setFrequency(e.target.value as "monthly" | "bi-weekly")}
                  className="w-full text-sm font-semibold text-gray-900 bg-gray-50/80 border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-white transition cursor-pointer"
                >
                  <option value="monthly">Monthly (12/yr)</option>
                  <option value="bi-weekly">Bi-Weekly (26/yr)</option>
                </select>
              </div>
            </div>

            {/* Tenure Options */}
            <div>
              <div className="flex justify-between items-center mb-1.5">
                <label className="text-xs font-semibold text-gray-700">Loan Tenure</label>
                <span className="text-xs font-bold text-emerald-700">
                  {tenureMonths} Months ({tenureMonths / 12} Yrs)
                </span>
              </div>
              <div className="grid grid-cols-5 gap-2">
                {[36, 48, 60, 72, 84].map((m) => (
                  <button
                    key={m}
                    type="button"
                    onClick={() => setTenureMonths(m)}
                    className={`py-2 rounded-xl text-xs font-bold transition text-center ${
                      tenureMonths === m
                        ? "bg-emerald-600 text-white shadow-2xs"
                        : "bg-gray-100 hover:bg-gray-200 text-gray-700"
                    }`}
                  >
                    {m}M
                  </button>
                ))}
              </div>
            </div>

            {/* Taxes & Dealer Fees */}
            <div className="p-4 bg-gray-50/80 rounded-2xl border border-gray-200/70 space-y-3">
              <span className="text-xs font-bold text-gray-800 block">Sales Tax &amp; Dealer Fees</span>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-[11px] text-gray-600 block mb-1">Sales Tax (%)</label>
                  <input
                    type="number"
                    min="0"
                    step="0.1"
                    value={taxRate || ""}
                    onChange={(e) => setTaxRate(Number(e.target.value))}
                    className="w-full text-xs font-semibold text-gray-900 bg-white border border-gray-200 rounded-lg p-2 focus:ring-2 focus:ring-emerald-500 outline-none"
                  />
                </div>
                <div>
                  <label className="text-[11px] text-gray-600 block mb-1">Dealer Fees ({currency})</label>
                  <input
                    type="number"
                    min="0"
                    value={dealerFees || ""}
                    onChange={(e) => setDealerFees(Number(e.target.value))}
                    className="w-full text-xs font-semibold text-gray-900 bg-white border border-gray-200 rounded-lg p-2 focus:ring-2 focus:ring-emerald-500 outline-none"
                  />
                </div>
              </div>
              <label className="flex items-center gap-2 cursor-pointer pt-1">
                <input
                  type="checkbox"
                  checked={includeFees}
                  onChange={(e) => setIncludeFees(e.target.checked)}
                  className="rounded text-emerald-600 focus:ring-emerald-500"
                />
                <span className="text-[11px] text-gray-600">
                  Roll taxes and fees into monthly financing
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
                Estimated Auto Payment
              </div>
              <div className="mt-2 text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-white">
                {formatLoanCurrency(result.periodicPayment, currency)}
                <span className="text-xs sm:text-sm font-medium text-emerald-200 ml-1.5">
                  / {frequency === "bi-weekly" ? "2-weeks" : "month"}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-4 mt-6 pt-6 border-t border-emerald-500/30">
                <div>
                  <div className="text-xs text-emerald-200">Financed Amount</div>
                  <div className="text-lg sm:text-xl font-bold text-white mt-0.5">
                    {formatLoanCurrency(result.financedAmount, currency)}
                  </div>
                </div>
                <div>
                  <div className="text-xs text-emerald-200">Total Interest</div>
                  <div className="text-lg sm:text-xl font-bold text-white mt-0.5">
                    {formatLoanCurrency(result.totalInterest, currency)}
                  </div>
                </div>
                <div>
                  <div className="text-xs text-emerald-200">Total Loan Cost</div>
                  <div className="text-base sm:text-lg font-bold text-white mt-0.5">
                    {formatLoanCurrency(result.totalLoanRepayment, currency)}
                  </div>
                </div>
                <div>
                  <div className="text-xs text-emerald-200">Total Out-of-Pocket</div>
                  <div className="text-base sm:text-lg font-bold text-white mt-0.5">
                    {formatLoanCurrency(result.totalOutOfPocketCost, currency)}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Tenure Comparison Table */}
          <div className="bg-white rounded-3xl p-6 border border-gray-200/80 shadow-xs">
            <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-3">
              Compare Different Auto Loan Tenures
            </h3>
            <div className="overflow-x-auto">
              <table className="w-full text-xs text-left">
                <thead className="bg-gray-50 text-gray-600 font-semibold border-b border-gray-100">
                  <tr>
                    <th className="py-2 px-3">Tenure</th>
                    <th className="py-2 px-3 text-right">Monthly EMI</th>
                    <th className="py-2 px-3 text-right">Total Interest</th>
                    <th className="py-2 px-3 text-right">Total Financed Cost</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {result.tenureComparisons.map((c) => {
                    const isSelected = c.tenureMonths === tenureMonths;
                    return (
                      <tr
                        key={c.tenureMonths}
                        onClick={() => setTenureMonths(c.tenureMonths)}
                        className={`cursor-pointer transition ${
                          isSelected ? "bg-emerald-50/70 font-bold text-emerald-950" : "hover:bg-gray-50 text-gray-700"
                        }`}
                      >
                        <td className="py-2.5 px-3">
                          {c.tenureMonths} Months ({c.tenureMonths / 12}Y)
                          {isSelected && <span className="ml-1 text-[10px] text-emerald-600">● Selected</span>}
                        </td>
                        <td className="py-2.5 px-3 text-right text-emerald-700 font-bold">
                          {formatLoanCurrency(c.monthlyPayment, currency)}
                        </td>
                        <td className="py-2.5 px-3 text-right text-amber-700">
                          {formatLoanCurrency(c.totalInterest, currency)}
                        </td>
                        <td className="py-2.5 px-3 text-right">
                          {formatLoanCurrency(c.totalCost, currency)}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>

          <LoanVisualBreakdown
            slices={breakdownSlices}
            currency={currency}
            centerTitle="Total"
            centerValue={formatLoanCurrency(result.totalOutOfPocketCost, currency, { compact: true })}
          />
        </div>
      </div>

      <AmortizationScheduleTable
        schedule={result.amortizationSchedule}
        yearlySummary={result.yearlySummary}
        currency={currency}
        loanTitle="Vehicle Loan Amortization Schedule"
      />

      <LoanCalculatorFAQ faqs={FAQS} />
      <LoanRelatedTools tools={RELATED_TOOLS} />
      <LoanProductCTA />
      </div>

      {/* Dedicated Printable Assessment Report */}
      <PrintCalculationReport
        reportTitle="Vehicle &amp; Auto Loan Assessment Report"
        calculatorName="Vehicle Loan Calculator"
        currency={currency}
        inputParams={inputParams}
        primaryMetric={{
          label: "Estimated Vehicle Payment",
          value: `${formatLoanCurrency(result.periodicPayment, currency)} ${frequency === "bi-weekly" ? "/ 2-weeks" : "/ month"}`,
          subtext: frequency !== "monthly" ? `Monthly Equivalent: ${formatLoanCurrency(result.monthlyEquivalent, currency)}` : undefined,
        }}
        keyMetrics={[
          { label: "Financed Principal", value: formatLoanCurrency(result.financedAmount, currency) },
          { label: "Total Interest", value: formatLoanCurrency(result.totalInterest, currency) },
          { label: "Total Loan Repayment", value: formatLoanCurrency(result.totalLoanRepayment, currency) },
          { label: "Total Out-of-Pocket", value: formatLoanCurrency(result.totalOutOfPocketCost, currency) },
          { label: "Loan-to-Value (LTV)", value: `${result.ltvRatio}%` },
          { label: "Total Payments", value: `${result.totalOutCount} instalments` },
        ]}
        breakdownSummary={{
          principalAmount: formatLoanCurrency(result.financedAmount, currency),
          principalPercent: `${result.totalLoanRepayment > 0 ? ((result.financedAmount / result.totalLoanRepayment) * 100).toFixed(1) : 0}%`,
          interestAmount: formatLoanCurrency(result.totalInterest, currency),
          interestPercent: `${result.totalLoanRepayment > 0 ? ((result.totalInterest / result.totalLoanRepayment) * 100).toFixed(1) : 0}%`,
          feesAmount: formatLoanCurrency(result.totalFees, currency),
          totalAmount: formatLoanCurrency(result.totalLoanRepayment, currency),
        }}
        scheduleRows={printableScheduleRows}
        scheduleTitle="Repayment Schedule Summary"
      />
    </div>
  );
}
