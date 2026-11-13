"use client";

import React, { useState, useMemo } from "react";
import { SupportedCurrency, formatLoanCurrency } from "@/lib/loan-calculators/currencies";
import { CompoundingFrequency, ContributionTiming } from "@/lib/loan-calculators/types";
import { calculateCompoundInterest } from "@/lib/loan-calculators/engines/compoundInterest";
import { LoanBreadcrumb } from "./shared/LoanBreadcrumb";
import { LoanCalculatorHero } from "./shared/LoanCalculatorHero";
import { CurrencySelector } from "./shared/CurrencySelector";
import { LoanVisualBreakdown } from "./shared/LoanVisualBreakdown";
import { LoanCalculatorFAQ, FAQItem } from "./shared/LoanCalculatorFAQ";
import { LoanRelatedTools, RelatedToolItem } from "./shared/LoanRelatedTools";
import { LoanProductCTA } from "./shared/LoanProductCTA";
import { PrintCalculationReport, ReportInputParam, ReportScheduleRow } from "./shared/PrintCalculationReport";
import { Copy, Check, RotateCcw, TrendingUp, Download, Printer, Table } from "lucide-react";

const FAQS: FAQItem[] = [
  {
    question: "What is Compound Interest and why is it so powerful?",
    answer: "Compound interest is interest calculated on both the initial principal and the accumulated interest from previous periods. Often called the 'eighth wonder of the world', compounding enables your wealth to grow exponentially rather than linearly over long horizons.",
  },
  {
    question: "How does compounding frequency affect my investment return?",
    answer: "The more frequently interest compounds (daily vs monthly vs annually), the faster your money grows. More frequent compounding results in a higher Effective Annual Rate (EAR) than the stated nominal interest rate.",
  },
  {
    question: "What is the difference between beginning and end of period contributions?",
    answer: "Beginning-of-period contributions (annuity due) start earning compound interest immediately during that period. End-of-period contributions (ordinary annuity) do not begin earning interest until the next period. Over 20 or 30 years, beginning contributions produce significantly higher total wealth.",
  },
  {
    question: "What is the Rule of 72?",
    answer: "The Rule of 72 is a quick mental math shortcut to estimate how many years it takes for an investment to double at a given annual compound interest rate. Divide 72 by your annual interest rate (e.g. 72 / 8% = 9 years to double).",
  },
];

const RELATED_TOOLS: RelatedToolItem[] = [
  {
    title: "Fixed Deposit Calculator",
    description: "Calculate guaranteed term deposit maturity with cumulative compounding.",
    href: "/free-tools/fixed-deposit-calculator",
    badge: "Term Deposits",
  },
  {
    title: "Simple Interest Calculator",
    description: "Compare linear simple interest growth against exponential compound growth.",
    href: "/free-tools/simple-interest-calculator",
    badge: "Linear Interest",
  },
  {
    title: "Debt Repayment Calculator",
    description: "Reverse compound interest working against you on consumer debts.",
    href: "/free-tools/debt-repayment-calculator",
    badge: "Debt Freedom",
  },
];

export function CompoundInterestCalculatorView() {
  const [currency, setCurrency] = useState<SupportedCurrency>("USD");
  const [initial, setInitial] = useState<number>(10000);
  const [annualRate, setAnnualRate] = useState<number>(8.0);
  const [years, setYears] = useState<number>(15);
  const [compFreq, setCompFreq] = useState<CompoundingFrequency>("monthly");
  const [regularDeposit, setRegularDeposit] = useState<number>(250);
  const [contribFreq, setContribFreq] = useState<"monthly" | "quarterly" | "annually">("monthly");
  const [timing, setTiming] = useState<ContributionTiming>("beginning");
  const [copied, setCopied] = useState<boolean>(false);

  const result = useMemo(() => {
    return calculateCompoundInterest({
      initialInvestment: initial,
      annualInterestRate: annualRate,
      durationYears: years,
      compoundingFrequency: compFreq,
      regularContribution: regularDeposit,
      contributionFrequency: contribFreq,
      contributionTiming: timing,
      currency,
    });
  }, [initial, annualRate, years, compFreq, regularDeposit, contribFreq, timing, currency]);

  
  const inputParams: ReportInputParam[] = [
    { label: "Initial Investment", value: formatLoanCurrency(initial, currency) },
    { label: "Regular Contribution", value: `${formatLoanCurrency(regularDeposit, currency)} (${contribFreq})` },
    { label: "Annual Interest Rate", value: `${annualRate}%` },
    { label: "Investment Horizon", value: `${years} Years` },
    { label: "Compounding Frequency", value: compFreq },
    { label: "Contribution Timing", value: timing === "beginning" ? "Start of Period" : "End of Period" },
    { label: "Reporting Currency", value: currency },
  ];

  const printableScheduleRows: ReportScheduleRow[] = result.yearByYearGrowth.map((y) => ({
    period: `Year ${y.year}`,
    beginningBalance: formatLoanCurrency(y.startingBalance, currency),
    principal: formatLoanCurrency(y.annualDeposit, currency),
    interest: formatLoanCurrency(y.interestEarnedThisYear, currency),
    payment: formatLoanCurrency(y.annualDeposit + y.interestEarnedThisYear, currency),
    endingBalance: formatLoanCurrency(y.endingBalance, currency),
  }));

  const handlePrint = () => {
    window.print();
  };

  const handleCopySummary = () => {
    const summary = [
      "=== Saviora Compound Interest Calculation Summary ===",
      `Initial Investment: ${formatLoanCurrency(result.initialInvestment, currency)}`,
      `Annual Interest Rate: ${annualRate}%`,
      `Duration: ${years} Years`,
      `Compounding Frequency: ${compFreq}`,
      `Regular Deposit: ${formatLoanCurrency(regularDeposit, currency)} (${contribFreq})`,
      `Total Principal Invested: ${formatLoanCurrency(result.totalPrincipalInvested, currency)}`,
      `Total Compound Interest: ${formatLoanCurrency(result.totalInterestEarned, currency)}`,
      `Final Maturity Balance: ${formatLoanCurrency(result.finalBalance, currency)}`,
      `Effective Annual Rate (EAR): ${result.effectiveAnnualRate}%`,
      `Growth Multiple: ${result.growthMultiple}x`,
      "Calculated free at https://saviora.app/free-tools/compound-interest-calculator",
    ].join("\n");

    navigator.clipboard.writeText(summary);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleDownloadCSV = () => {
    let csv = "Year,Starting Balance,Annual Deposit,Total Deposited to Date,Interest Earned,Ending Balance\n";
    result.yearByYearGrowth.forEach((r) => {
      csv += `${r.year},${r.startingBalance},${r.annualDeposit},${r.totalDepositedToDate},${r.interestEarnedThisYear},${r.endingBalance}\n`;
    });

    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "compound-interest-growth-schedule.csv";
    link.click();
    URL.revokeObjectURL(url);
  };

  const handleReset = () => {
    setInitial(10000);
    setAnnualRate(8.0);
    setYears(15);
    setCompFreq("monthly");
    setRegularDeposit(250);
    setContribFreq("monthly");
    setTiming("beginning");
  };

  const breakdownSlices = [
    { label: "Initial Investment", amount: result.initialInvestment, color: "#10b981" },
    { label: "Regular Deposits", amount: result.totalContributions, color: "#3b82f6" },
    { label: "Compound Interest", amount: result.totalInterestEarned, color: "#F6850C" },
  ];

  return (
    <div className="pt-32 sm:pt-36 lg:pt-40 pb-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* On-screen Interactive UI (Hidden during print) */}
      <div className="print:hidden">
      <LoanBreadcrumb items={[{ label: "Compound Interest Calculator" }]} />

      <LoanCalculatorHero
        badge="Investment & Compound Growth Calculator"
        title="Compound Interest & Wealth Growth Calculator"
        description="See the compounding effect on your wealth over time with regular periodic deposits, custom compounding frequencies, and year-by-year growth tables."
      />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Form */}
        <div className="lg:col-span-6 bg-white rounded-3xl p-6 sm:p-8 border border-gray-200/80 shadow-xs">
          <div className="flex items-center justify-between pb-5 border-b border-gray-100 mb-6">
            <h2 className="text-lg font-bold text-gray-900 flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-emerald-600" />
              <span>Investment Details</span>
            </h2>
            <CurrencySelector selectedCurrency={currency} onSelectCurrency={setCurrency} />
          </div>

          <div className="space-y-5">
            {/* Initial Investment */}
            <div>
              <div className="flex justify-between items-center mb-1.5">
                <label className="text-xs font-semibold text-gray-700">Initial Starting Deposit</label>
                <span className="text-xs font-bold text-emerald-700">
                  {formatLoanCurrency(initial, currency)}
                </span>
              </div>
              <input
                type="number"
                min="0"
                step="500"
                value={initial || ""}
                onChange={(e) => setInitial(Number(e.target.value))}
                className="w-full text-sm font-semibold text-gray-900 bg-gray-50/80 border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-white transition"
              />
            </div>

            {/* Interest Rate & Duration */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-semibold text-gray-700 block mb-1.5">Annual Return (%)</label>
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
                <label className="text-xs font-semibold text-gray-700 block mb-1.5">Duration (Years)</label>
                <input
                  type="number"
                  min="1"
                  max="50"
                  value={years || ""}
                  onChange={(e) => setYears(Math.max(1, Number(e.target.value)))}
                  className="w-full text-sm font-semibold text-gray-900 bg-gray-50/80 border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-white transition"
                />
              </div>
            </div>

            {/* Compounding Frequency */}
            <div>
              <label className="text-xs font-semibold text-gray-700 block mb-1.5">Compounding Frequency</label>
              <select
                value={compFreq}
                onChange={(e) => setCompFreq(e.target.value as CompoundingFrequency)}
                className="w-full text-sm font-semibold text-gray-900 bg-gray-50/80 border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-white transition cursor-pointer"
              >
                <option value="daily">Daily (365 times/year)</option>
                <option value="monthly">Monthly (12 times/year)</option>
                <option value="quarterly">Quarterly (4 times/year)</option>
                <option value="semi-annually">Semi-Annually (2 times/year)</option>
                <option value="annually">Annually (1 time/year)</option>
              </select>
            </div>

            {/* Regular Contributions */}
            <div className="p-4 bg-gray-50/80 rounded-2xl border border-gray-200/70 space-y-3">
              <span className="text-xs font-bold text-gray-800 block">Regular Future Contributions</span>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-[11px] text-gray-600 block mb-1">Additional Deposit ({currency})</label>
                  <input
                    type="number"
                    min="0"
                    step="50"
                    value={regularDeposit || ""}
                    onChange={(e) => setRegularDeposit(Number(e.target.value))}
                    className="w-full text-xs font-semibold text-gray-900 bg-white border border-gray-200 rounded-lg p-2 focus:ring-2 focus:ring-emerald-500 outline-none"
                  />
                </div>
                <div>
                  <label className="text-[11px] text-gray-600 block mb-1">Deposit Frequency</label>
                  <select
                    value={contribFreq}
                    onChange={(e) => setContribFreq(e.target.value as "monthly" | "quarterly" | "annually")}
                    className="w-full text-xs font-semibold text-gray-900 bg-white border border-gray-200 rounded-lg p-2 focus:ring-2 focus:ring-emerald-500 outline-none"
                  >
                    <option value="monthly">Monthly</option>
                    <option value="quarterly">Quarterly</option>
                    <option value="annually">Annually</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="text-[11px] text-gray-600 block mb-1">Deposit Timing</label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setTiming("beginning")}
                    className={`py-1.5 text-xs font-semibold rounded-lg transition text-center ${
                      timing === "beginning"
                        ? "bg-emerald-600 text-white"
                        : "bg-white text-gray-700 border border-gray-200"
                    }`}
                  >
                    Beginning of Period
                  </button>
                  <button
                    type="button"
                    onClick={() => setTiming("end")}
                    className={`py-1.5 text-xs font-semibold rounded-lg transition text-center ${
                      timing === "end"
                        ? "bg-emerald-600 text-white"
                        : "bg-white text-gray-700 border border-gray-200"
                    }`}
                  >
                    End of Period
                  </button>
                </div>
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
                Projected Future Balance
              </div>
              <div className="mt-2 text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-white">
                {formatLoanCurrency(result.finalBalance, currency)}
              </div>

              <div className="grid grid-cols-2 gap-4 mt-6 pt-6 border-t border-emerald-500/30">
                <div>
                  <div className="text-xs text-emerald-200">Total Deposits</div>
                  <div className="text-lg sm:text-xl font-bold text-white mt-0.5">
                    {formatLoanCurrency(result.totalPrincipalInvested, currency)}
                  </div>
                </div>
                <div>
                  <div className="text-xs text-emerald-200">Total Compound Interest</div>
                  <div className="text-lg sm:text-xl font-bold text-white mt-0.5">
                    {formatLoanCurrency(result.totalInterestEarned, currency)}
                  </div>
                </div>
                <div>
                  <div className="text-xs text-emerald-200">Growth Multiple</div>
                  <div className="text-base sm:text-lg font-bold text-white mt-0.5">
                    {result.growthMultiple}x Initial Capital
                  </div>
                </div>
                <div>
                  <div className="text-xs text-emerald-200">Effective Annual Yield</div>
                  <div className="text-base sm:text-lg font-bold text-white mt-0.5">
                    {result.effectiveAnnualRate}% EAR
                  </div>
                </div>
              </div>
            </div>
          </div>

          <LoanVisualBreakdown
            slices={breakdownSlices}
            currency={currency}
            centerTitle="Total"
            centerValue={formatLoanCurrency(result.finalBalance, currency, { compact: true })}
          />
        </div>
      </div>

      {/* Year-by-Year Growth Table */}
      <div className="bg-white rounded-2xl border border-gray-200/80 shadow-xs overflow-hidden mt-8 print:border-none print:shadow-none">
        <div className="p-4 sm:p-5 border-b border-gray-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-gray-50/50">
          <div>
            <h3 className="text-base font-bold text-gray-900 flex items-center gap-2">
              <Table className="w-4 h-4 text-emerald-600" />
              <span>Year-by-Year Compound Investment Growth</span>
            </h3>
            <p className="text-xs text-gray-500 mt-0.5">
              Annual breakdown of starting balances, deposits, interest compounding, and year-end values.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleDownloadCSV}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-emerald-700 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200/60 transition shadow-2xs"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Export CSV</span>
            </button>
            <button
              type="button"
              onClick={() => window.print()}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-gray-700 bg-white hover:bg-gray-100 border border-gray-200 transition shadow-2xs"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print</span>
            </button>
          </div>
        </div>

        <div className="overflow-x-auto max-h-[450px] overflow-y-auto">
          <table className="w-full text-left text-xs text-gray-600 border-collapse">
            <thead className="bg-gray-50/90 text-gray-700 font-semibold sticky top-0 border-b border-gray-200/70 z-10">
              <tr>
                <th className="py-2.5 px-3 sm:px-4">Year</th>
                <th className="py-2.5 px-3 sm:px-4 text-right">Starting Balance</th>
                <th className="py-2.5 px-3 sm:px-4 text-right text-blue-700">Annual Deposit</th>
                <th className="py-2.5 px-3 sm:px-4 text-right text-emerald-700">Deposited to Date</th>
                <th className="py-2.5 px-3 sm:px-4 text-right text-amber-700">Interest Earned</th>
                <th className="py-2.5 px-3 sm:px-4 text-right">Ending Balance</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {result.yearByYearGrowth.map((r) => (
                <tr key={r.year} className="hover:bg-emerald-50/30 transition">
                  <td className="py-2.5 px-3 sm:px-4 font-bold text-gray-900">Year {r.year}</td>
                  <td className="py-2.5 px-3 sm:px-4 text-right">{formatLoanCurrency(r.startingBalance, currency)}</td>
                  <td className="py-2.5 px-3 sm:px-4 text-right text-blue-600 font-medium">
                    {formatLoanCurrency(r.annualDeposit, currency)}
                  </td>
                  <td className="py-2.5 px-3 sm:px-4 text-right text-emerald-600 font-semibold">
                    {formatLoanCurrency(r.totalDepositedToDate, currency)}
                  </td>
                  <td className="py-2.5 px-3 sm:px-4 text-right text-amber-600 font-bold">
                    {formatLoanCurrency(r.interestEarnedThisYear, currency)}
                  </td>
                  <td className="py-2.5 px-3 sm:px-4 text-right font-black text-gray-900">
                    {formatLoanCurrency(r.endingBalance, currency)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <LoanCalculatorFAQ faqs={FAQS} />
      <LoanRelatedTools tools={RELATED_TOOLS} />
      <LoanProductCTA />
    
      </div>

      {/* Official Printable Financial Assessment Report (Rendered only on print / PDF generation) */}
      <PrintCalculationReport
        reportTitle="Compound Interest &amp; Investment Growth Report"
        calculatorName="Compound Interest Calculator"
        currency={currency}
        inputParams={inputParams}
        primaryMetric={{
          label: "Projected Future Balance",
          value: formatLoanCurrency(result.finalBalance, currency),
          subtext: `Total Interest Earned: ${formatLoanCurrency(result.totalInterestEarned, currency)} | Multiple: ${result.growthMultiple.toFixed(2)}x`,
        }}
        keyMetrics={[
          { label: "Initial Investment", value: formatLoanCurrency(result.initialInvestment, currency) },
          { label: "Total Contributions", value: formatLoanCurrency(result.totalContributions, currency) },
          { label: "Total Principal Invested", value: formatLoanCurrency(result.totalPrincipalInvested, currency) },
          { label: "Total Interest Earned", value: formatLoanCurrency(result.totalInterestEarned, currency) },
          { label: "Final Balance", value: formatLoanCurrency(result.finalBalance, currency) },
          { label: "Effective Annual Rate (AER)", value: `${result.effectiveAnnualRate.toFixed(2)}%` },
        ]}
        breakdownSummary={{
          principalAmount: formatLoanCurrency(result.totalPrincipalInvested, currency),
          principalPercent: `${result.finalBalance > 0 ? ((result.totalPrincipalInvested / result.finalBalance) * 100).toFixed(1) : 0}%`,
          interestAmount: formatLoanCurrency(result.totalInterestEarned, currency),
          interestPercent: `${result.finalBalance > 0 ? ((result.totalInterestEarned / result.finalBalance) * 100).toFixed(1) : 0}%`,
          totalAmount: formatLoanCurrency(result.finalBalance, currency),
        }}
        scheduleRows={printableScheduleRows}
        scheduleTitle="Annual Compound Growth Summary"
      />
    </div>
  );
}