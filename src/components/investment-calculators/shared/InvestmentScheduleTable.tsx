"use client";

import React, { useState } from "react";
import { InvestmentYearlyRow } from "@/lib/investment-calculators/types";
import { formatInvestmentCurrency, SupportedCurrency } from "@/lib/investment-calculators/currencies";
import { Download, Printer, Table } from "lucide-react";

interface InvestmentScheduleTableProps {
  schedule: InvestmentYearlyRow[];
  currency: SupportedCurrency;
  title?: string;
  subtitle?: string;
}

export function InvestmentScheduleTable({
  schedule,
  currency,
  title = "Year-by-Year Growth Schedule",
  subtitle = "Annual breakdown of invested capital, compound returns, and accumulated balance.",
}: InvestmentScheduleTableProps) {
  const [showAllRows, setShowAllRows] = useState(false);

  const handleDownloadCSV = () => {
    let csv = "Year,Starting Balance,Contributions,Total Contributions To Date,Growth This Year,Total Growth To Date,Ending Balance\n";
    schedule.forEach((r) => {
      csv += `${r.year},${r.startingBalance},${r.contributionsThisYear},${r.totalContributionsToDate},${r.growthThisYear},${r.totalGrowthToDate},${r.endingBalance}\n`;
    });
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${title.toLowerCase().replace(/\s+/g, "_")}_schedule.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handlePrint = () => {
    window.print();
  };

  const displayRows = showAllRows ? schedule : schedule.slice(0, 15);

  return (
    <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs overflow-hidden mt-8 print:border-none print:shadow-none">
      <div className="p-4 sm:p-5 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-slate-50/50">
        <div>
          <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
            <Table className="w-4 h-4 text-emerald-600" />
            <span>{title}</span>
          </h3>
          <p className="text-xs text-slate-500 mt-0.5">{subtitle}</p>
        </div>

        <div className="flex items-center gap-2 self-start sm:self-auto print:hidden">
          <button
            type="button"
            onClick={handleDownloadCSV}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-emerald-700 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200/60 transition shadow-2xs cursor-pointer"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Export CSV</span>
          </button>

          <button
            type="button"
            onClick={handlePrint}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-slate-700 bg-white hover:bg-slate-100 border border-slate-200 transition shadow-2xs cursor-pointer"
            title="Print or Save as PDF Report"
          >
            <Printer className="w-3.5 h-3.5 text-slate-600" />
            <span>Print / PDF Report</span>
          </button>
        </div>
      </div>

      <div className="overflow-x-auto max-h-[500px] overflow-y-auto print:max-h-none print:overflow-visible">
        <table className="w-full text-left text-xs border-collapse">
          <thead className="bg-slate-50 text-slate-700 font-semibold sticky top-0 border-b border-slate-200 shadow-2xs">
            <tr>
              <th className="py-2.5 px-3 sm:px-4">Year</th>
              <th className="py-2.5 px-3 sm:px-4 text-right">Starting Balance</th>
              <th className="py-2.5 px-3 sm:px-4 text-right">Annual Deposit</th>
              <th className="py-2.5 px-3 sm:px-4 text-right text-emerald-700">Growth / Interest</th>
              <th className="py-2.5 px-3 sm:px-4 text-right font-bold text-slate-900">Ending Balance</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 text-slate-600">
            {displayRows.map((r) => (
              <tr key={r.year} className="hover:bg-slate-50/80 transition">
                <td className="py-2.5 px-3 sm:px-4 font-semibold text-slate-900">Year {r.year}</td>
                <td className="py-2.5 px-3 sm:px-4 text-right font-mono text-slate-500">
                  {formatInvestmentCurrency(r.startingBalance, currency)}
                </td>
                <td className="py-2.5 px-3 sm:px-4 text-right font-mono text-slate-700">
                  {formatInvestmentCurrency(r.contributionsThisYear, currency)}
                </td>
                <td className="py-2.5 px-3 sm:px-4 text-right font-mono font-medium text-emerald-600">
                  +{formatInvestmentCurrency(r.growthThisYear, currency)}
                </td>
                <td className="py-2.5 px-3 sm:px-4 text-right font-mono font-bold text-slate-900">
                  {formatInvestmentCurrency(r.endingBalance, currency)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {schedule.length > 15 && (
        <div className="p-3 text-center border-t border-slate-100 bg-slate-50/30 print:hidden">
          <button
            type="button"
            onClick={() => setShowAllRows(!showAllRows)}
            className="text-xs font-semibold text-emerald-700 hover:text-emerald-800 transition cursor-pointer"
          >
            {showAllRows ? "Show Less (First 15 Years)" : `View All ${schedule.length} Years`}
          </button>
        </div>
      )}
    </div>
  );
}
