"use client";

import React, { useState, useMemo } from "react";
import { SupportedCurrency, formatLoanCurrency } from "@/lib/loan-calculators/currencies";
import { DebtAccount, DebtStrategy } from "@/lib/loan-calculators/types";
import { calculateDebtRepayment } from "@/lib/loan-calculators/engines/debtRepayment";
import { LoanBreadcrumb } from "./shared/LoanBreadcrumb";
import { LoanCalculatorHero } from "./shared/LoanCalculatorHero";
import { CurrencySelector } from "./shared/CurrencySelector";
import { LoanVisualBreakdown } from "./shared/LoanVisualBreakdown";
import { LoanCalculatorFAQ, FAQItem } from "./shared/LoanCalculatorFAQ";
import { LoanRelatedTools, RelatedToolItem } from "./shared/LoanRelatedTools";
import { LoanProductCTA } from "./shared/LoanProductCTA";
import { PrintCalculationReport, ReportInputParam, ReportScheduleRow } from "./shared/PrintCalculationReport";
import { Printer, Copy, Check, RotateCcw, Plus, Trash2, ShieldCheck, Zap, Download, Table, Trophy } from "lucide-react";

const INITIAL_DEBTS: DebtAccount[] = [
  { id: "1", name: "Credit Card (Bank of America)", balance: 3200, interestRate: 23.5, minimumPayment: 90 },
  { id: "2", name: "Personal Loan (SoFi)", balance: 6500, interestRate: 11.0, minimumPayment: 170 },
  { id: "3", name: "Car Loan (Toyota)", balance: 14000, interestRate: 5.5, minimumPayment: 290 },
];

const FAQS: FAQItem[] = [
  {
    question: "What is the difference between the Debt Snowball and Debt Avalanche methods?",
    answer: "The Debt Snowball method prioritizes debts by balance from smallest to largest, regardless of interest rates. Paying off small debts quickly provides immediate psychological motivation. The Debt Avalanche method prioritizes debts by interest rate from highest to lowest. Mathematically, Avalanche always saves the most money on interest and can make you debt-free faster.",
  },
  {
    question: "How does payment rollover work in debt snowballing?",
    answer: "When a debt is fully paid off, you do not absorb that freed-up cash back into spending. Instead, you roll its entire monthly payment over into the payment of the next priority debt! As more debts are eliminated, your monthly punch on the remaining debt gets larger and larger—like a snowball rolling downhill.",
  },
  {
    question: "What happens if I cannot afford the minimum payments?",
    answer: "If your minimum payments are insufficient to cover the monthly interest, your debt balance will grow. In this case, consider contacting your creditors for hardship programs, negotiating lower interest rates, seeking non-profit credit counseling, or exploring debt consolidation.",
  },
];

const RELATED_TOOLS: RelatedToolItem[] = [
  {
    title: "Credit Card Interest Calculator",
    description: "Analyze individual credit card payoff scenarios and avoid the minimum payment trap.",
    href: "/free-tools/credit-card-interest-calculator",
    badge: "Credit Cards",
  },
  {
    title: "Personal Loan Calculator",
    description: "Compare consolidation loans to combine multiple high-rate debts into one payment.",
    href: "/free-tools/personal-loan-calculator",
    badge: "Consolidation",
  },
  {
    title: "Loan EMI Calculator",
    description: "General loan instalment calculator with full payment schedules.",
    href: "/free-tools/loan-emi-calculator",
    badge: "EMI Planning",
  },
];

export function DebtRepaymentCalculatorView() {
  const [currency, setCurrency] = useState<SupportedCurrency>("USD");
  const [debts, setDebts] = useState<DebtAccount[]>(INITIAL_DEBTS);
  const [extraPayment, setExtraPayment] = useState<number>(200);
  const [strategy, setStrategy] = useState<DebtStrategy>("avalanche");
  const [copied, setCopied] = useState<boolean>(false);

  const result = useMemo(() => {
    return calculateDebtRepayment({
      debts,
      extraMonthlyPayment: extraPayment,
      strategy,
      currency,
    });
  }, [debts, extraPayment, strategy, currency]);

  const handleAddDebt = () => {
    const newId = String(Date.now());
    setDebts([
      ...debts,
      { id: newId, name: `Debt ${debts.length + 1}`, balance: 2000, interestRate: 15.0, minimumPayment: 60 },
    ]);
  };

  const handleRemoveDebt = (id: string) => {
    if (debts.length <= 1) return;
    setDebts(debts.filter((d) => d.id !== id));
  };

  const handleUpdateDebt = (id: string, field: keyof DebtAccount, val: any) => {
    setDebts(
      debts.map((d) => (d.id === id ? { ...d, [field]: val } : d))
    );
  };

  
  const inputParams: ReportInputParam[] = [
    { label: "Repayment Strategy", value: strategy === "snowball" ? "Debt Snowball (Lowest Balance First)" : "Debt Avalanche (Highest APR First)" },
    { label: "Total Active Debts", value: `${debts.length} accounts` },
    { label: "Monthly Extra Payment", value: formatLoanCurrency(extraPayment, currency) },
    { label: "Total Debt Principal", value: formatLoanCurrency(result.totalInitialDebt, currency) },
    { label: "Total Monthly Payment", value: formatLoanCurrency(result.totalMonthlyPayment, currency) },
    { label: "Reporting Currency", value: currency },
  ];

  const printableScheduleRows: ReportScheduleRow[] = result.selectedStrategyResult.timeline.slice(0, 36).map((r) => ({
    period: `Month ${r.month}`,
    beginningBalance: formatLoanCurrency(r.totalRemainingDebt + (r.totalPayment - r.totalInterest), currency),
    principal: formatLoanCurrency(r.totalPayment - r.totalInterest, currency),
    interest: formatLoanCurrency(r.totalInterest, currency),
    payment: formatLoanCurrency(r.totalPayment, currency),
    endingBalance: formatLoanCurrency(r.totalRemainingDebt, currency),
  }));

  const handlePrint = () => {
    window.print();
  };

  const handleCopySummary = () => {
    const s = result.selectedStrategyResult;
    const summary = [
      "=== Saviora Debt Repayment Plan Summary ===",
      `Total Debt: ${formatLoanCurrency(result.totalInitialDebt, currency)} across ${debts.length} accounts`,
      `Monthly Budget: ${formatLoanCurrency(result.totalMonthlyPayment, currency)} (${formatLoanCurrency(result.totalMinimumPayments, currency)} min + ${formatLoanCurrency(extraPayment, currency)} extra)`,
      `Chosen Strategy: ${s.strategyName}`,
      `Estimated Debt-Free Date: ${s.debtFreeDate} (${s.totalMonths} Months)`,
      `Total Interest Paid: ${formatLoanCurrency(s.totalInterestPaid, currency)}`,
      `Total Amount Paid: ${formatLoanCurrency(s.totalAmountPaid, currency)}`,
      `Interest Saved vs Minimums: ${formatLoanCurrency(s.interestSavedVsMinimums, currency)}`,
      `Time Saved vs Minimums: ${s.monthsSavedVsMinimums} Months`,
      "Calculated free at https://saviora.app/free-tools/debt-repayment-calculator",
    ].join("\n");

    navigator.clipboard.writeText(summary);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleDownloadCSV = () => {
    let csv = "Month,Total Payment,Interest Paid,Remaining Total Debt,Debts Paid Off\n";
    result.selectedStrategyResult.timeline.forEach((t) => {
      csv += `${t.month},${t.totalPayment},${t.totalInterest},${t.totalRemainingDebt},"${t.paidOffDebtsThisMonth.join(", ")}"\n`;
    });

    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `debt-${strategy}-payoff-plan.csv`;
    link.click();
    URL.revokeObjectURL(url);
  };

  const handleReset = () => {
    setDebts(INITIAL_DEBTS);
    setExtraPayment(200);
    setStrategy("avalanche");
  };

  const breakdownSlices = [
    { label: "Original Debt Principal", amount: result.totalInitialDebt, color: "#10b981" },
    { label: "Total Interest Paid", amount: result.selectedStrategyResult.totalInterestPaid, color: "#F6850C" },
  ];

  return (
    <div className="pt-32 sm:pt-36 lg:pt-40 pb-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* On-screen Interactive UI (Hidden during print) */}
      <div className="print:hidden">
      <LoanBreadcrumb items={[{ label: "Debt Repayment Calculator" }]} />

      <LoanCalculatorHero
        badge="Debt Snowball & Avalanche Calculator"
        title="Debt Repayment & Payoff Strategy Calculator"
        description="Create a clear multi-debt repayment plan, compare Debt Snowball vs Debt Avalanche, see your debt-free date, and discover how fast you can eliminate all debt."
      />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Debts & Controls */}
        <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-8 border border-gray-200/80 shadow-xs">
          <div className="flex items-center justify-between pb-5 border-b border-gray-100 mb-6">
            <h2 className="text-lg font-bold text-gray-900 flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-emerald-600" />
              <span>Your Debts ({debts.length})</span>
            </h2>
            <CurrencySelector selectedCurrency={currency} onSelectCurrency={setCurrency} />
          </div>

          {/* Debt List */}
          <div className="space-y-4">
            {debts.map((d, index) => (
              <div
                key={d.id}
                className="p-4 rounded-2xl bg-gray-50/90 border border-gray-200/80 space-y-3 relative group"
              >
                <div className="flex items-center justify-between">
                  <input
                    type="text"
                    value={d.name}
                    onChange={(e) => handleUpdateDebt(d.id, "name", e.target.value)}
                    className="font-bold text-xs text-gray-900 bg-transparent border-b border-dashed border-gray-300 focus:border-emerald-500 outline-none pb-0.5"
                  />
                  {debts.length > 1 && (
                    <button
                      type="button"
                      onClick={() => handleRemoveDebt(d.id)}
                      className="text-gray-400 hover:text-red-600 transition"
                      title="Remove debt"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  )}
                </div>

                <div className="grid grid-cols-3 gap-3">
                  <div>
                    <label className="text-[10px] text-gray-500 font-semibold block mb-1">Balance ({currency})</label>
                    <input
                      type="number"
                      min="0"
                      step="100"
                      value={d.balance || ""}
                      onChange={(e) => handleUpdateDebt(d.id, "balance", Number(e.target.value))}
                      className="w-full text-xs font-semibold text-gray-900 bg-white border border-gray-200 rounded-lg p-2 focus:ring-2 focus:ring-emerald-500 outline-none"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] text-gray-500 font-semibold block mb-1">Interest Rate (%)</label>
                    <input
                      type="number"
                      min="0"
                      max="60"
                      step="0.1"
                      value={d.interestRate || ""}
                      onChange={(e) => handleUpdateDebt(d.id, "interestRate", Number(e.target.value))}
                      className="w-full text-xs font-semibold text-gray-900 bg-white border border-gray-200 rounded-lg p-2 focus:ring-2 focus:ring-emerald-500 outline-none"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] text-gray-500 font-semibold block mb-1">Min Payment ({currency})</label>
                    <input
                      type="number"
                      min="0"
                      step="10"
                      value={d.minimumPayment || ""}
                      onChange={(e) => handleUpdateDebt(d.id, "minimumPayment", Number(e.target.value))}
                      className="w-full text-xs font-semibold text-gray-900 bg-white border border-gray-200 rounded-lg p-2 focus:ring-2 focus:ring-emerald-500 outline-none"
                    />
                  </div>
                </div>
              </div>
            ))}

            <button
              type="button"
              onClick={handleAddDebt}
              className="w-full py-2.5 rounded-xl border border-dashed border-gray-300 hover:border-emerald-500 text-xs font-bold text-gray-600 hover:text-emerald-700 bg-gray-50/50 hover:bg-emerald-50/30 transition flex items-center justify-center gap-1.5"
            >
              <Plus className="w-4 h-4" />
              <span>Add Another Debt Account</span>
            </button>
          </div>

          {/* Extra Monthly Payment & Strategy */}
          <div className="mt-6 pt-6 border-t border-gray-100 space-y-5">
            <div>
              <div className="flex justify-between items-center mb-1.5">
                <label className="text-xs font-semibold text-gray-700 flex items-center gap-1">
                  <Zap className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Extra Monthly Payment (Above Minimums)</span>
                </label>
                <span className="text-xs font-bold text-emerald-700">
                  +{formatLoanCurrency(extraPayment, currency)}/mo
                </span>
              </div>
              <input
                type="number"
                min="0"
                step="50"
                value={extraPayment || ""}
                onChange={(e) => setExtraPayment(Number(e.target.value))}
                className="w-full text-sm font-semibold text-gray-900 bg-gray-50/80 border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-white transition"
                placeholder="e.g. 200"
              />
              <div className="flex gap-2 mt-2">
                {[50, 100, 200, 350, 500].map((amt) => (
                  <button
                    key={amt}
                    type="button"
                    onClick={() => setExtraPayment(amt)}
                    className="text-[10px] font-semibold bg-gray-100 hover:bg-gray-200 text-gray-700 px-2 py-1 rounded-md transition"
                  >
                    +{formatLoanCurrency(amt, currency, { compact: true })}
                  </button>
                ))}
              </div>
            </div>

            {/* Strategy Selection */}
            <div>
              <label className="text-xs font-semibold text-gray-700 block mb-1.5">
                Repayment Strategy
              </label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setStrategy("avalanche")}
                  className={`p-3 rounded-2xl border text-left transition ${
                    strategy === "avalanche"
                      ? "bg-emerald-50/80 border-emerald-500 shadow-2xs"
                      : "bg-white border-gray-200 hover:border-gray-300"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-gray-900">Debt Avalanche</span>
                    <span className="text-[10px] bg-emerald-100 text-emerald-800 font-bold px-1.5 py-0.5 rounded">
                      Mathematical Winner
                    </span>
                  </div>
                  <p className="text-[11px] text-gray-500 mt-1">
                    Targets highest interest rate first. Minimizes total interest paid.
                  </p>
                </button>

                <button
                  type="button"
                  onClick={() => setStrategy("snowball")}
                  className={`p-3 rounded-2xl border text-left transition ${
                    strategy === "snowball"
                      ? "bg-emerald-50/80 border-emerald-500 shadow-2xs"
                      : "bg-white border-gray-200 hover:border-gray-300"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-gray-900">Debt Snowball</span>
                    <span className="text-[10px] bg-blue-100 text-blue-800 font-bold px-1.5 py-0.5 rounded">
                      Psychological Winner
                    </span>
                  </div>
                  <p className="text-[11px] text-gray-500 mt-1">
                    Targets smallest balance first. Builds fast momentum and quick wins.
                  </p>
                </button>
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

        {/* Right Column: Strategy Comparison & Results */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-gradient-to-br from-emerald-600 via-teal-700 to-emerald-900 rounded-3xl p-6 sm:p-8 text-white shadow-lg relative overflow-hidden">
            <div className="relative z-10">
              <div className="text-xs font-semibold uppercase tracking-wider text-emerald-200 flex items-center gap-1.5">
                <Trophy className="w-4 h-4 text-amber-300" />
                <span>Estimated Debt-Free Date</span>
              </div>
              <div className="mt-2 text-3xl sm:text-4xl font-black tracking-tight text-white">
                {result.selectedStrategyResult.debtFreeDate}
              </div>

              <div className="text-xs text-emerald-100 mt-1">
                Duration: <strong>{result.selectedStrategyResult.totalMonths} Months</strong> (
                {(result.selectedStrategyResult.totalMonths / 12).toFixed(1)} Years)
              </div>

              <div className="grid grid-cols-2 gap-4 mt-6 pt-6 border-t border-emerald-500/30">
                <div>
                  <div className="text-xs text-emerald-200">Total Monthly Budget</div>
                  <div className="text-lg sm:text-xl font-bold text-white mt-0.5">
                    {formatLoanCurrency(result.totalMonthlyPayment, currency)}
                  </div>
                </div>
                <div>
                  <div className="text-xs text-emerald-200">Total Interest Paid</div>
                  <div className="text-lg sm:text-xl font-bold text-white mt-0.5">
                    {formatLoanCurrency(result.selectedStrategyResult.totalInterestPaid, currency)}
                  </div>
                </div>
                <div>
                  <div className="text-xs text-emerald-200">Interest Saved</div>
                  <div className="text-base sm:text-lg font-bold text-amber-300 mt-0.5">
                    {formatLoanCurrency(result.selectedStrategyResult.interestSavedVsMinimums, currency)}
                  </div>
                </div>
                <div>
                  <div className="text-xs text-emerald-200">Time Saved</div>
                  <div className="text-base sm:text-lg font-bold text-emerald-300 mt-0.5">
                    {result.selectedStrategyResult.monthsSavedVsMinimums} Months Sooner
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Strategy Comparison Card */}
          <div className="bg-white rounded-3xl p-6 border border-gray-200/80 shadow-xs">
            <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-3">
              Snowball vs. Avalanche Comparison
            </h3>

            <div className="space-y-3">
              <div className="p-3 rounded-xl bg-gray-50 border border-gray-200 flex justify-between items-center text-xs">
                <div>
                  <strong className="text-gray-900 block">Debt Avalanche</strong>
                  <span className="text-[11px] text-gray-500">{result.avalancheResult.totalMonths} Months</span>
                </div>
                <div className="text-right">
                  <span className="font-bold text-emerald-700 block">
                    {formatLoanCurrency(result.avalancheResult.totalInterestPaid, currency)}
                  </span>
                  <span className="text-[10px] text-emerald-600 font-semibold">Least Interest</span>
                </div>
              </div>

              <div className="p-3 rounded-xl bg-gray-50 border border-gray-200 flex justify-between items-center text-xs">
                <div>
                  <strong className="text-gray-900 block">Debt Snowball</strong>
                  <span className="text-[11px] text-gray-500">{result.snowballResult.totalMonths} Months</span>
                </div>
                <div className="text-right">
                  <span className="font-bold text-gray-800 block">
                    {formatLoanCurrency(result.snowballResult.totalInterestPaid, currency)}
                  </span>
                  {result.avalancheSavingsVsSnowball > 0 && (
                    <span className="text-[10px] text-amber-600 font-semibold">
                      +{formatLoanCurrency(result.avalancheSavingsVsSnowball, currency)} interest
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>

          <LoanVisualBreakdown
            slices={breakdownSlices}
            currency={currency}
            centerTitle="Total Paid"
            centerValue={formatLoanCurrency(result.selectedStrategyResult.totalAmountPaid, currency, { compact: true })}
          />
        </div>
      </div>

      {/* Payoff Timeline Table */}
      {result.selectedStrategyResult.timeline.length > 0 && (
        <div className="bg-white rounded-2xl border border-gray-200/80 shadow-xs overflow-hidden mt-8 print:border-none print:shadow-none">
          <div className="p-4 sm:p-5 border-b border-gray-100 flex items-center justify-between bg-gray-50/50">
            <div>
              <h3 className="text-base font-bold text-gray-900 flex items-center gap-2">
                <Table className="w-4 h-4 text-emerald-600" />
                <span>Monthly Debt Reduction Timeline</span>
              </h3>
              <p className="text-xs text-gray-500 mt-0.5">
                Watch your remaining debt shrink month by month until you reach zero.
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
                  <th className="py-2.5 px-3 sm:px-4 text-right">Payment</th>
                  <th className="py-2.5 px-3 sm:px-4 text-right text-amber-700">Interest Accrued</th>
                  <th className="py-2.5 px-3 sm:px-4 text-right">Remaining Total Debt</th>
                  <th className="py-2.5 px-3 sm:px-4">Milestones</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {result.selectedStrategyResult.timeline.slice(0, 36).map((t) => (
                  <tr key={t.month} className="hover:bg-emerald-50/30 transition">
                    <td className="py-2 px-3 sm:px-4 font-bold text-gray-900">Month {t.month}</td>
                    <td className="py-2 px-3 sm:px-4 text-right font-medium text-gray-800">
                      {formatLoanCurrency(t.totalPayment, currency)}
                    </td>
                    <td className="py-2 px-3 sm:px-4 text-right text-amber-600 font-semibold">
                      {formatLoanCurrency(t.totalInterest, currency)}
                    </td>
                    <td className="py-2 px-3 sm:px-4 text-right font-bold text-gray-900">
                      {formatLoanCurrency(t.totalRemainingDebt, currency)}
                    </td>
                    <td className="py-2 px-3 sm:px-4">
                      {t.paidOffDebtsThisMonth.length > 0 ? (
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800">
                          🎉 Paid Off: {t.paidOffDebtsThisMonth.join(", ")}
                        </span>
                      ) : (
                        <span className="text-gray-400">—</span>
                      )}
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
        reportTitle="Debt Payoff &amp; Elimination Assessment Report"
        calculatorName="Debt Repayment Calculator"
        currency={currency}
        inputParams={inputParams}
        primaryMetric={{
          label: "Total Cost to Become Debt-Free",
          value: formatLoanCurrency(result.selectedStrategyResult.totalAmountPaid, currency),
          subtext: `Debt-Free Date: ${result.selectedStrategyResult.debtFreeDate} (${result.selectedStrategyResult.totalMonths} months)`,
        }}
        keyMetrics={[
          { label: "Total Debt Principal", value: formatLoanCurrency(result.totalInitialDebt, currency) },
          { label: "Total Interest Paid", value: formatLoanCurrency(result.selectedStrategyResult.totalInterestPaid, currency) },
          { label: "Total Amount Paid", value: formatLoanCurrency(result.selectedStrategyResult.totalAmountPaid, currency) },
          { label: "Months Saved vs Minimums", value: `${result.selectedStrategyResult.monthsSavedVsMinimums} months` },
          { label: "Interest Saved vs Minimums", value: formatLoanCurrency(result.selectedStrategyResult.interestSavedVsMinimums, currency) },
          { label: "Avalanche vs Snowball Savings", value: formatLoanCurrency(result.avalancheSavingsVsSnowball, currency) },
        ]}
        breakdownSummary={{
          principalAmount: formatLoanCurrency(result.totalInitialDebt, currency),
          principalPercent: `${result.selectedStrategyResult.totalAmountPaid > 0 ? ((result.totalInitialDebt / result.selectedStrategyResult.totalAmountPaid) * 100).toFixed(1) : 0}%`,
          interestAmount: formatLoanCurrency(result.selectedStrategyResult.totalInterestPaid, currency),
          interestPercent: `${result.selectedStrategyResult.totalAmountPaid > 0 ? ((result.selectedStrategyResult.totalInterestPaid / result.selectedStrategyResult.totalAmountPaid) * 100).toFixed(1) : 0}%`,
          totalAmount: formatLoanCurrency(result.selectedStrategyResult.totalAmountPaid, currency),
        }}
        scheduleRows={printableScheduleRows}
        scheduleTitle="Debt Payoff Timeline Schedule"
      />
    </div>
  );
}