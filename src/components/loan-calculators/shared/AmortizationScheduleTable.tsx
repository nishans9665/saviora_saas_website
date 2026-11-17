"use client";

import React, { useState } from "react";
import { AmortizationRow, YearlyAmortizationSummary } from "@/lib/loan-calculators/types";
import { formatLoanCurrency, SupportedCurrency } from "@/lib/loan-calculators/currencies";
import { Download, Printer, Table, Calendar } from "lucide-react";

interface AmortizationScheduleTableProps {
  schedule: AmortizationRow[];
  yearlySummary?: YearlyAmortizationSummary[];
  currency: SupportedCurrency;
  loanTitle?: string;
  allowExtraPayments?: boolean;
}

export function AmortizationScheduleTable({
  schedule,
  yearlySummary,
  currency,
  loanTitle = "Loan Repayment Schedule",
  allowExtraPayments = false,
}: AmortizationScheduleTableProps) {
  const [viewMode, setViewMode] = useState<"yearly" | "monthly">(
    yearlySummary && yearlySummary.length > 0 ? "yearly" : "monthly"
  );
  const [showAllRows, setShowAllRows] = useState(false);

  // CSV Exporter
  const handleDownloadCSV = () => {
    let csv = "";
    if (viewMode === "yearly" && yearlySummary) {
      csv = "Year,Beginning Balance,Principal Paid,Interest Paid,Total Payment,Ending Balance\n";
      yearlySummary.forEach((r) => {
        csv += `${r.year},${r.beginningBalance},${r.totalPrincipal},${r.totalInterest},${r.totalPayment},${r.endingBalance}\n`;
      });
    } else {
      csv = `Period,Beginning Balance,Payment,Principal,Interest${allowExtraPayments ? ",Extra Principal" : ""},Ending Balance,Total Interest to Date\n`;
      schedule.forEach((r) => {
        csv += `${r.period},${r.beginningBalance},${r.payment},${r.principal},${r.interest}${allowExtraPayments ? `,${r.extraPayment || 0}` : ""},${r.endingBalance},${r.totalInterestToDate}\n`;
      });
    }

    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `${loanTitle.toLowerCase().replace(/\s+/g, "-")}-schedule.csv`;
    link.click();
    URL.revokeObjectURL(url);
  };

  const handlePrint = () => {
    window.print();
  };

  const displaySchedule = showAllRows ? schedule : schedule.slice(0, 36);

  return (
    <div className="bg-white rounded-2xl border border-gray-200/80 shadow-xs overflow-hidden mt-8 print:border-none print:shadow-none">
      {/* Header bar */}
      <div className="p-4 sm:p-5 border-b border-gray-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-gray-50/50">
        <div>
          <h3 className="text-base font-bold text-gray-900 flex items-center gap-2">
            <Table className="w-4 h-4 text-emerald-600" />
            <span>{loanTitle}</span>
          </h3>
          <p className="text-xs text-gray-500 mt-0.5">
            Full breakdown of principal reduction and accrued interest over time.
          </p>
        </div>

        <div className="flex items-center gap-2 self-start sm:self-auto print:hidden">
          {/* Yearly vs Monthly view toggle */}
          {yearlySummary && yearlySummary.length > 0 && (
            <div className="flex bg-gray-200/70 p-0.5 rounded-lg text-xs font-semibold">
              <button
                type="button"
                onClick={() => setViewMode("yearly")}
                className={`px-2.5 py-1 rounded-md transition ${
                  viewMode === "yearly"
                    ? "bg-white text-gray-900 shadow-2xs"
                    : "text-gray-600 hover:text-gray-900"
                }`}
              >
                Yearly
              </button>
              <button
                type="button"
                onClick={() => setViewMode("monthly")}
                className={`px-2.5 py-1 rounded-md transition ${
                  viewMode === "monthly"
                    ? "bg-white text-gray-900 shadow-2xs"
                    : "text-gray-600 hover:text-gray-900"
                }`}
              >
                Monthly
              </button>
            </div>
          )}

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
            onClick={handlePrint}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-gray-700 bg-white hover:bg-gray-100 border border-gray-200 transition shadow-2xs"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>Print</span>
          </button>
        </div>
      </div>

      {/* Table view */}
      <div className="overflow-x-auto max-h-[500px] overflow-y-auto">
        {viewMode === "yearly" && yearlySummary ? (
          <table className="w-full text-left text-xs text-gray-600 border-collapse">
            <thead className="bg-gray-50/90 text-gray-700 font-semibold sticky top-0 border-b border-gray-200/70 z-10">
              <tr>
                <th className="py-2.5 px-3 sm:px-4">Year</th>
                <th className="py-2.5 px-3 sm:px-4 text-right">Beginning Balance</th>
                <th className="py-2.5 px-3 sm:px-4 text-right text-emerald-700">Principal Paid</th>
                <th className="py-2.5 px-3 sm:px-4 text-right text-amber-700">Interest Paid</th>
                <th className="py-2.5 px-3 sm:px-4 text-right">Total Payments</th>
                <th className="py-2.5 px-3 sm:px-4 text-right">Ending Balance</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {yearlySummary.map((r) => (
                <tr key={r.year} className="hover:bg-emerald-50/30 transition">
                  <td className="py-2.5 px-3 sm:px-4 font-bold text-gray-900">Year {r.year}</td>
                  <td className="py-2.5 px-3 sm:px-4 text-right">{formatLoanCurrency(r.beginningBalance, currency)}</td>
                  <td className="py-2.5 px-3 sm:px-4 text-right font-semibold text-emerald-600">
                    {formatLoanCurrency(r.totalPrincipal, currency)}
                  </td>
                  <td className="py-2.5 px-3 sm:px-4 text-right font-semibold text-amber-600">
                    {formatLoanCurrency(r.totalInterest, currency)}
                  </td>
                  <td className="py-2.5 px-3 sm:px-4 text-right font-bold text-gray-800">
                    {formatLoanCurrency(r.totalPayment, currency)}
                  </td>
                  <td className="py-2.5 px-3 sm:px-4 text-right font-medium text-gray-700">
                    {formatLoanCurrency(r.endingBalance, currency)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <table className="w-full text-left text-xs text-gray-600 border-collapse">
            <thead className="bg-gray-50/90 text-gray-700 font-semibold sticky top-0 border-b border-gray-200/70 z-10">
              <tr>
                <th className="py-2.5 px-3 sm:px-4">Period</th>
                <th className="py-2.5 px-3 sm:px-4 text-right">Beginning Balance</th>
                <th className="py-2.5 px-3 sm:px-4 text-right text-emerald-700">Principal</th>
                <th className="py-2.5 px-3 sm:px-4 text-right text-amber-700">Interest</th>
                {allowExtraPayments && (
                  <th className="py-2.5 px-3 sm:px-4 text-right text-blue-700">Extra Principal</th>
                )}
                <th className="py-2.5 px-3 sm:px-4 text-right">Total Payment</th>
                <th className="py-2.5 px-3 sm:px-4 text-right">Ending Balance</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {displaySchedule.map((r) => (
                <tr key={r.period} className="hover:bg-emerald-50/30 transition">
                  <td className="py-2.5 px-3 sm:px-4 font-semibold text-gray-900">
                    {r.label || `Month ${r.period}`}
                  </td>
                  <td className="py-2.5 px-3 sm:px-4 text-right">{formatLoanCurrency(r.beginningBalance, currency)}</td>
                  <td className="py-2.5 px-3 sm:px-4 text-right font-semibold text-emerald-600">
                    {formatLoanCurrency(r.principal, currency)}
                  </td>
                  <td className="py-2.5 px-3 sm:px-4 text-right font-semibold text-amber-600">
                    {formatLoanCurrency(r.interest, currency)}
                  </td>
                  {allowExtraPayments && (
                    <td className="py-2.5 px-3 sm:px-4 text-right text-blue-600 font-medium">
                      {formatLoanCurrency(r.extraPayment || 0, currency)}
                    </td>
                  )}
                  <td className="py-2.5 px-3 sm:px-4 text-right font-bold text-gray-800">
                    {formatLoanCurrency(r.payment, currency)}
                  </td>
                  <td className="py-2.5 px-3 sm:px-4 text-right font-medium text-gray-700">
                    {formatLoanCurrency(r.endingBalance, currency)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {viewMode === "monthly" && schedule.length > 36 && (
        <div className="p-3 text-center border-t border-gray-100 bg-gray-50/50 print:hidden">
          <button
            type="button"
            onClick={() => setShowAllRows(!showAllRows)}
            className="text-xs font-bold text-emerald-600 hover:text-emerald-700 transition"
          >
            {showAllRows
              ? "Show First 36 Months Only"
              : `View All ${schedule.length} Months (or switch to Yearly View)`}
          </button>
        </div>
      )}
    </div>
  );
}
