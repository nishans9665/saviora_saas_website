"use client";

import React, { useState, useMemo } from "react";
import { SupportedCurrency, formatLoanCurrency } from "@/lib/loan-calculators/currencies";
import { calculateHomeLoan } from "@/lib/loan-calculators/engines/homeLoan";
import { LoanBreadcrumb } from "./shared/LoanBreadcrumb";
import { LoanCalculatorHero } from "./shared/LoanCalculatorHero";
import { CurrencySelector } from "./shared/CurrencySelector";
import { LoanVisualBreakdown } from "./shared/LoanVisualBreakdown";
import { AmortizationScheduleTable } from "./shared/AmortizationScheduleTable";
import { LoanCalculatorFAQ, FAQItem } from "./shared/LoanCalculatorFAQ";
import { LoanRelatedTools, RelatedToolItem } from "./shared/LoanRelatedTools";
import { LoanProductCTA } from "./shared/LoanProductCTA";
import { PrintCalculationReport, ReportInputParam, ReportScheduleRow } from "./shared/PrintCalculationReport";
import { Printer, Copy, Check, RotateCcw, Home, Percent, Zap } from "lucide-react";

const FAQS: FAQItem[] = [
  {
    question: "What is Loan-to-Value (LTV) ratio?",
    answer: "The Loan-to-Value (LTV) ratio measures the percentage of your home's purchase price that is financed through the mortgage. For example, if you buy a $400,000 home and put down $80,000 (20%), your loan is $320,000 and your LTV is 80%. Most lenders prefer an LTV of 80% or lower; an LTV above 80% typically requires Private Mortgage Insurance (PMI).",
  },
  {
    question: "What are the components of a monthly mortgage payment (PITI)?",
    answer: "A complete monthly housing payment often consists of PITI: Principal, Interest, Property Taxes, and Homeowners Insurance. It may also include HOA dues or Private Mortgage Insurance (PMI) if your down payment was less than 20%.",
  },
  {
    question: "How do extra monthly payments accelerate mortgage payoff?",
    answer: "Every extra dollar paid toward your principal balance reduces the principal immediately. Because future interest is calculated only on the remaining balance, extra payments compound your interest savings over time, cutting years off your mortgage tenure.",
  },
  {
    question: "Should I choose a 15-year or 30-year mortgage?",
    answer: "A 30-year mortgage offers lower monthly payments, providing greater cash flow flexibility. A 15-year mortgage requires higher monthly payments but comes with a lower interest rate and saves tens or hundreds of thousands of dollars in total interest.",
  },
];

const RELATED_TOOLS: RelatedToolItem[] = [
  {
    title: "Loan EMI Calculator",
    description: "Calculate standard reducing balance instalments with full amortization schedules.",
    href: "/free-tools/loan-emi-calculator",
    badge: "Core EMI",
  },
  {
    title: "Compound Interest Calculator",
    description: "See how your down payment savings grow over time with compound interest.",
    href: "/free-tools/compound-interest-calculator",
    badge: "Investments",
  },
  {
    title: "Debt Repayment Calculator",
    description: "Eliminate high-interest consumer debt before applying for a mortgage.",
    href: "/free-tools/debt-repayment-calculator",
    badge: "Debt Strategy",
  },
];

export function HomeLoanCalculatorView() {
  const [currency, setCurrency] = useState<SupportedCurrency>("USD");
  const [propertyPrice, setPropertyPrice] = useState<number>(400000);
  const [downPayment, setDownPayment] = useState<number>(80000);
  const [annualRate, setAnnualRate] = useState<number>(6.5);
  const [tenureYears, setTenureYears] = useState<number>(30);
  const [propTaxAnnual, setPropTaxAnnual] = useState<number>(4800);
  const [insuranceAnnual, setInsuranceAnnual] = useState<number>(1200);
  const [monthlyHOA, setMonthlyHOA] = useState<number>(150);
  const [extraMonthly, setExtraMonthly] = useState<number>(200);
  const [copied, setCopied] = useState<boolean>(false);

  const result = useMemo(() => {
    return calculateHomeLoan({
      propertyPrice,
      downPayment,
      annualInterestRate: annualRate,
      tenureYears,
      propertyTaxAnnual: propTaxAnnual,
      homeInsuranceAnnual: insuranceAnnual,
      monthlyHOA,
      extraMonthlyPayment: extraMonthly,
      currency,
    });
  }, [propertyPrice, downPayment, annualRate, tenureYears, propTaxAnnual, insuranceAnnual, monthlyHOA, extraMonthly, currency]);

  const handlePriceChange = (val: number) => {
    setPropertyPrice(val);
    // keep 20% down payment by default
    setDownPayment(Math.round(val * 0.2));
  };

  
  const inputParams: ReportInputParam[] = [
    { label: "Property Purchase Price", value: formatLoanCurrency(propertyPrice, currency) },
    { label: "Down Payment", value: `${formatLoanCurrency(downPayment, currency)} (${((downPayment / propertyPrice) * 100).toFixed(1)}%)` },
    { label: "Mortgage Loan Amount", value: formatLoanCurrency(result.loanPrincipal, currency) },
    { label: "Annual Interest Rate", value: `${annualRate}%` },
    { label: "Loan Tenure", value: `${tenureYears} Years (${tenureYears * 12} Months)` },
    { label: "Extra Monthly Prepayment", value: extraMonthly > 0 ? formatLoanCurrency(extraMonthly, currency) : "None" },
    { label: "Annual Property Tax", value: formatLoanCurrency(propTaxAnnual, currency) },
    { label: "Annual Home Insurance", value: formatLoanCurrency(insuranceAnnual, currency) },
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
      "=== Saviora Home Loan & Mortgage Calculation Summary ===",
      `Property Price: ${formatLoanCurrency(result.propertyPrice, currency)}`,
      `Down Payment: ${formatLoanCurrency(result.downPayment, currency)} (${result.downPaymentPercent}%)`,
      `Loan Principal: ${formatLoanCurrency(result.loanPrincipal, currency)} (LTV: ${result.ltvRatio}%)`,
      `Annual Interest Rate: ${annualRate}%`,
      `Loan Tenure: ${tenureYears} Years`,
      `Monthly Principal & Interest (P&I): ${formatLoanCurrency(result.monthlyPrincipalAndInterest, currency)}`,
      `Total Monthly Housing Payment: ${formatLoanCurrency(result.totalMonthlyHousingPayment, currency)}`,
      `Total Mortgage Interest: ${formatLoanCurrency(result.totalInterest, currency)}`,
      `Total Cost of Mortgage: ${formatLoanCurrency(result.totalMortgageCost, currency)}`,
      extraMonthly > 0 ? `Extra Payment Impact: ${result.monthsSaved} months saved, ${formatLoanCurrency(result.interestSaved, currency)} interest saved!` : "No extra monthly payments",
      "Calculated free at https://saviora.app/free-tools/home-loan-calculator",
    ].join("\n");

    navigator.clipboard.writeText(summary);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleReset = () => {
    setPropertyPrice(400000);
    setDownPayment(80000);
    setAnnualRate(6.5);
    setTenureYears(30);
    setPropTaxAnnual(4800);
    setInsuranceAnnual(1200);
    setMonthlyHOA(150);
    setExtraMonthly(200);
  };

  const breakdownSlices = [
    { label: "Principal (P&I)", amount: result.monthlyPrincipalAndInterest, color: "#10b981" },
    { label: "Property Tax", amount: result.monthlyPropertyTax, color: "#F6850C" },
    { label: "Home Insurance", amount: result.monthlyHomeInsurance, color: "#6366f1" },
    { label: "HOA Dues", amount: result.monthlyHOA, color: "#ec4899" },
    { label: "Extra Principal", amount: extraMonthly, color: "#3b82f6" },
  ].filter(s => s.amount > 0);

  return (
    <div className="pt-32 sm:pt-36 lg:pt-40 pb-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* On-screen Interactive UI (Hidden during print) */}
      <div className="print:hidden">
      <LoanBreadcrumb items={[{ label: "Home Loan Calculator" }]} />

      <LoanCalculatorHero
        badge="Mortgage & Home Loan Calculator"
        title="Home Loan & Mortgage Calculator"
        description="Estimate monthly mortgage payments, calculate LTV ratio, factor in taxes & insurance, and discover how extra monthly payments cut years off your mortgage."
      />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Form */}
        <div className="lg:col-span-6 bg-white rounded-3xl p-6 sm:p-8 border border-gray-200/80 shadow-xs">
          <div className="flex items-center justify-between pb-5 border-b border-gray-100 mb-6">
            <h2 className="text-lg font-bold text-gray-900 flex items-center gap-2">
              <Home className="w-5 h-5 text-emerald-600" />
              <span>Property &amp; Mortgage Inputs</span>
            </h2>
            <CurrencySelector selectedCurrency={currency} onSelectCurrency={setCurrency} />
          </div>

          <div className="space-y-5">
            {/* Property Price */}
            <div>
              <div className="flex justify-between items-center mb-1.5">
                <label className="text-xs font-semibold text-gray-700">Property Purchase Price</label>
                <span className="text-xs font-bold text-emerald-700">
                  {formatLoanCurrency(propertyPrice, currency)}
                </span>
              </div>
              <input
                type="number"
                min="0"
                step="10000"
                value={propertyPrice || ""}
                onChange={(e) => handlePriceChange(Number(e.target.value))}
                className="w-full text-sm font-semibold text-gray-900 bg-gray-50/80 border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-white transition"
              />
            </div>

            {/* Down Payment */}
            <div>
              <div className="flex justify-between items-center mb-1.5">
                <label className="text-xs font-semibold text-gray-700">Down Payment</label>
                <span className="text-xs font-bold text-emerald-700">
                  {formatLoanCurrency(downPayment, currency)} ({result.downPaymentPercent}%)
                </span>
              </div>
              <input
                type="number"
                min="0"
                step="5000"
                value={downPayment || ""}
                onChange={(e) => setDownPayment(Number(e.target.value))}
                className="w-full text-sm font-semibold text-gray-900 bg-gray-50/80 border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-white transition"
              />
              <div className="flex gap-2 mt-2">
                {[10, 15, 20, 25, 30].map((pct) => (
                  <button
                    key={pct}
                    type="button"
                    onClick={() => setDownPayment(Math.round(propertyPrice * (pct / 100)))}
                    className="text-[10px] font-semibold bg-gray-100 hover:bg-gray-200 text-gray-700 px-2.5 py-1 rounded-md transition"
                  >
                    {pct}% Down
                  </button>
                ))}
              </div>
            </div>

            {/* Interest Rate & Tenure */}
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
                <label className="text-xs font-semibold text-gray-700 block mb-1.5">Tenure (Years)</label>
                <select
                  value={tenureYears}
                  onChange={(e) => setTenureYears(Number(e.target.value))}
                  className="w-full text-sm font-semibold text-gray-900 bg-gray-50/80 border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-white transition cursor-pointer"
                >
                  <option value={10}>10 Years</option>
                  <option value={15}>15 Years</option>
                  <option value={20}>20 Years</option>
                  <option value={25}>25 Years</option>
                  <option value={30}>30 Years</option>
                </select>
              </div>
            </div>

            {/* Housing Taxes & Extra Payments */}
            <div className="p-4 bg-gray-50/80 rounded-2xl border border-gray-200/70 space-y-3">
              <span className="text-xs font-bold text-gray-800 block">Property Expenses &amp; Extra Payments</span>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="text-[11px] text-gray-600 block mb-1">Annual Tax ({currency})</label>
                  <input
                    type="number"
                    min="0"
                    value={propTaxAnnual || ""}
                    onChange={(e) => setPropTaxAnnual(Number(e.target.value))}
                    className="w-full text-xs font-semibold text-gray-900 bg-white border border-gray-200 rounded-lg p-2 focus:ring-2 focus:ring-emerald-500 outline-none"
                  />
                </div>
                <div>
                  <label className="text-[11px] text-gray-600 block mb-1">Annual Insurance ({currency})</label>
                  <input
                    type="number"
                    min="0"
                    value={insuranceAnnual || ""}
                    onChange={(e) => setInsuranceAnnual(Number(e.target.value))}
                    className="w-full text-xs font-semibold text-gray-900 bg-white border border-gray-200 rounded-lg p-2 focus:ring-2 focus:ring-emerald-500 outline-none"
                  />
                </div>
                <div>
                  <label className="text-[11px] text-gray-600 block mb-1">Monthly HOA ({currency})</label>
                  <input
                    type="number"
                    min="0"
                    value={monthlyHOA || ""}
                    onChange={(e) => setMonthlyHOA(Number(e.target.value))}
                    className="w-full text-xs font-semibold text-gray-900 bg-white border border-gray-200 rounded-lg p-2 focus:ring-2 focus:ring-emerald-500 outline-none"
                  />
                </div>
              </div>

              <div>
                <div className="flex justify-between items-center mb-1">
                  <label className="text-[11px] font-bold text-emerald-800 flex items-center gap-1">
                    <Zap className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Extra Monthly Principal Payment</span>
                  </label>
                  <span className="text-[11px] font-bold text-emerald-700">
                    +{formatLoanCurrency(extraMonthly, currency)}/mo
                  </span>
                </div>
                <input
                  type="number"
                  min="0"
                  step="50"
                  value={extraMonthly || ""}
                  onChange={(e) => setExtraMonthly(Number(e.target.value))}
                  className="w-full text-xs font-semibold text-gray-900 bg-white border border-gray-200 rounded-lg p-2 focus:ring-2 focus:ring-emerald-500 outline-none"
                  placeholder="e.g. 200"
                />
              </div>
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
                Total Monthly Housing Payment
              </div>
              <div className="mt-2 text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-white">
                {formatLoanCurrency(result.totalMonthlyHousingPayment, currency)}
                <span className="text-xs sm:text-sm font-medium text-emerald-200 ml-1.5">/ month</span>
              </div>

              <div className="text-xs text-emerald-100 mt-1">
                Base Principal &amp; Interest: <strong>{formatLoanCurrency(result.monthlyPrincipalAndInterest, currency)}</strong>
              </div>

              <div className="grid grid-cols-2 gap-4 mt-6 pt-6 border-t border-emerald-500/30">
                <div>
                  <div className="text-xs text-emerald-200">Financed Principal</div>
                  <div className="text-lg sm:text-xl font-bold text-white mt-0.5">
                    {formatLoanCurrency(result.loanPrincipal, currency)}
                  </div>
                </div>
                <div>
                  <div className="text-xs text-emerald-200">Loan-to-Value (LTV)</div>
                  <div className="text-lg sm:text-xl font-bold text-white mt-0.5">
                    {result.ltvRatio}%
                  </div>
                </div>
                <div>
                  <div className="text-xs text-emerald-200">Total Mortgage Interest</div>
                  <div className="text-base sm:text-lg font-bold text-white mt-0.5">
                    {formatLoanCurrency(result.totalInterest, currency)}
                  </div>
                </div>
                <div>
                  <div className="text-xs text-emerald-200">Total Mortgage Cost</div>
                  <div className="text-base sm:text-lg font-bold text-white mt-0.5">
                    {formatLoanCurrency(result.totalMortgageCost, currency)}
                  </div>
                </div>
              </div>

              {/* Extra Payment Impact Callout */}
              {extraMonthly > 0 && result.monthsSaved > 0 && (
                <div className="mt-5 p-3 rounded-xl bg-white/10 border border-white/20 text-xs">
                  <div className="font-bold flex items-center gap-1.5 text-amber-300">
                    <Zap className="w-4 h-4" />
                    <span>Extra Payment Savings Accelerator</span>
                  </div>
                  <p className="mt-1 text-slate-100 text-[11px] leading-relaxed">
                    Paying an extra {formatLoanCurrency(extraMonthly, currency)}/mo pays off your mortgage{" "}
                    <strong>{Math.floor(result.monthsSaved / 12)} years {result.monthsSaved % 12} months earlier</strong> and saves{" "}
                    <strong>{formatLoanCurrency(result.interestSaved, currency)} in interest</strong>!
                  </p>
                </div>
              )}
            </div>
          </div>

          <LoanVisualBreakdown
            slices={breakdownSlices}
            currency={currency}
            centerTitle="Monthly"
            centerValue={formatLoanCurrency(result.totalMonthlyHousingPayment, currency, { compact: true })}
          />
        </div>
      </div>

      <AmortizationScheduleTable
        schedule={result.amortizationSchedule}
        yearlySummary={result.yearlySummary}
        currency={currency}
        loanTitle="Mortgage Amortization Schedule"
        allowExtraPayments={extraMonthly > 0}
      />

      <LoanCalculatorFAQ faqs={FAQS} />
      <LoanRelatedTools tools={RELATED_TOOLS} />
      <LoanProductCTA />
    
      </div>

      {/* Official Printable Financial Assessment Report (Rendered only on print / PDF generation) */}
      <PrintCalculationReport
        reportTitle="Home Loan &amp; Mortgage Assessment Report"
        calculatorName="Home Loan Calculator"
        currency={currency}
        inputParams={inputParams}
        primaryMetric={{
          label: "Total Monthly Housing Payment (PITI)",
          value: `${formatLoanCurrency(result.totalMonthlyHousingPayment, currency)} / month`,
          subtext: `P&I: ${formatLoanCurrency(result.monthlyPrincipalAndInterest, currency)} | Tax & Ins: ${formatLoanCurrency(result.monthlyPropertyTax + result.monthlyHomeInsurance, currency)}`,
        }}
        keyMetrics={[
          { label: "Loan Principal", value: formatLoanCurrency(result.loanPrincipal, currency) },
          { label: "Total Mortgage Interest", value: formatLoanCurrency(result.totalInterest, currency) },
          { label: "Total Mortgage Cost", value: formatLoanCurrency(result.totalMortgageCost, currency) },
          { label: "Loan-to-Value (LTV)", value: `${result.ltvRatio}%` },
          { label: "Interest Saved (Accelerated)", value: result.interestSaved > 0 ? formatLoanCurrency(result.interestSaved, currency) : "N/A" },
          { label: "Tenure Shortened By", value: result.monthsSaved > 0 ? `${result.monthsSaved} months` : "N/A" },
        ]}
        breakdownSummary={{
          principalAmount: formatLoanCurrency(result.loanPrincipal, currency),
          principalPercent: `${result.totalPrincipalRepayment > 0 ? ((result.loanPrincipal / result.totalPrincipalRepayment) * 100).toFixed(1) : 0}%`,
          interestAmount: formatLoanCurrency(result.totalInterest, currency),
          interestPercent: `${result.totalPrincipalRepayment > 0 ? ((result.totalInterest / result.totalPrincipalRepayment) * 100).toFixed(1) : 0}%`,
          totalAmount: formatLoanCurrency(result.totalPrincipalRepayment, currency),
        }}
        scheduleRows={printableScheduleRows}
        scheduleTitle="Annual Mortgage Schedule Summary"
      />
    </div>
  );
}