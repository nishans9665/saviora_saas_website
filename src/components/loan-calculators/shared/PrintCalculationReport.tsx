"use client";

import React from "react";

export interface ReportInputParam {
  label: string;
  value: string;
}

export interface ReportKeyMetric {
  label: string;
  value: string;
  subtext?: string;
  isPrimary?: boolean;
}

export interface ReportScheduleRow {
  period: string | number;
  beginningBalance: string;
  principal: string;
  interest: string;
  payment: string;
  endingBalance: string;
  extraPayment?: string;
}

export interface PrintCalculationReportProps {
  reportTitle: string;
  calculatorName: string;
  currency: string;
  inputParams: ReportInputParam[];
  keyMetrics: ReportKeyMetric[];
  primaryMetric: {
    label: string;
    value: string;
    subtext?: string;
  };
  breakdownSummary?: {
    principalAmount: string;
    principalPercent: string;
    interestAmount: string;
    interestPercent: string;
    feesAmount?: string;
    totalAmount: string;
  };
  scheduleRows?: ReportScheduleRow[];
  scheduleTitle?: string;
  hasExtraPayments?: boolean;
}

export function PrintCalculationReport({
  reportTitle,
  calculatorName,
  currency,
  inputParams,
  keyMetrics,
  primaryMetric,
  breakdownSummary,
  scheduleRows,
  scheduleTitle = "Amortization & Repayment Schedule",
  hasExtraPayments = false,
}: PrintCalculationReportProps) {
  const currentDate = new Date().toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  return (
    <div className="hidden print:block print:w-full print:m-0 print:p-6 bg-white text-slate-900 font-sans">
      {/* 1. Official Report Header */}
      <div className="border-b-2 border-slate-900 pb-4 mb-6 flex items-start justify-between">
        <div>
          <div className="flex items-center gap-2">
            {/* Minimal SVG Logo mark for print */}
            <div className="w-7 h-7 rounded-lg bg-emerald-600 text-white font-black text-sm flex items-center justify-center">
              S
            </div>
            <div>
              <span className="text-xl font-black tracking-tight text-slate-900 block leading-none">
                Saviora
              </span>
              <span className="text-[9px] uppercase tracking-wider text-slate-500 font-semibold">
                Personal Finance &amp; Calculation Engine
              </span>
            </div>
          </div>
          <h1 className="text-lg font-extrabold text-slate-900 mt-3 uppercase tracking-wide">
            {reportTitle}
          </h1>
          <p className="text-xs text-slate-600 mt-0.5">
            Official Calculation &amp; Financial Assessment Statement
          </p>
        </div>

        <div className="text-right text-xs text-slate-600 space-y-1">
          <div>
            <span className="text-slate-400 font-medium">Generated: </span>
            <span className="font-bold text-slate-800">{currentDate}</span>
          </div>
          <div>
            <span className="text-slate-400 font-medium">Source: </span>
            <span className="font-bold text-slate-800">https://saviora.app</span>
          </div>
          <div>
            <span className="text-slate-400 font-medium">Status: </span>
            <span className="inline-block px-1.5 py-0.5 rounded text-[10px] font-bold bg-emerald-100 text-emerald-800">
              Verified Calculations
            </span>
          </div>
        </div>
      </div>

      {/* 2. Section: Input Parameters Grid */}
      <div className="mb-6 print-avoid-break">
        <h2 className="text-xs font-bold uppercase tracking-wider text-slate-700 pb-1 mb-2.5 border-b border-slate-200">
          1. Input Parameters (User Provided Values)
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 bg-slate-50 p-3 rounded-lg border border-slate-200">
          {inputParams.map((param, idx) => (
            <div key={idx} className="bg-white p-2 rounded border border-slate-200/70">
              <span className="text-[10px] uppercase font-semibold text-slate-500 block truncate">
                {param.label}
              </span>
              <span className="text-xs font-bold text-slate-900 block mt-0.5 truncate">
                {param.value}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* 3. Section: Key Calculation Results */}
      <div className="mb-6 print-avoid-break">
        <h2 className="text-xs font-bold uppercase tracking-wider text-slate-700 pb-1 mb-2.5 border-b border-slate-200">
          2. Calculated Results &amp; Key Financial Metrics
        </h2>

        {/* Primary Highlight Card */}
        <div className="bg-emerald-50 border-2 border-emerald-600 rounded-xl p-4 mb-3 flex items-center justify-between">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-800 block">
              {primaryMetric.label}
            </span>
            <div className="text-2xl font-black text-emerald-950 mt-0.5">
              {primaryMetric.value}
            </div>
          </div>
          {primaryMetric.subtext && (
            <div className="text-right text-xs font-semibold text-emerald-800 max-w-xs">
              {primaryMetric.subtext}
            </div>
          )}
        </div>

        {/* Supporting Metrics Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
          {keyMetrics.map((metric, idx) => (
            <div key={idx} className="bg-white p-2.5 rounded-lg border border-slate-200">
              <span className="text-[10px] uppercase font-semibold text-slate-500 block">
                {metric.label}
              </span>
              <span className="text-sm font-black text-slate-900 block mt-0.5">
                {metric.value}
              </span>
              {metric.subtext && (
                <span className="text-[9px] text-slate-500 block mt-0.5">
                  {metric.subtext}
                </span>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* 4. Section: Breakdown Summary (if provided) */}
      {breakdownSummary && (
        <div className="mb-6 print-avoid-break">
          <h2 className="text-xs font-bold uppercase tracking-wider text-slate-700 pb-1 mb-2.5 border-b border-slate-200">
            3. Financial Cost Breakdown
          </h2>
          <table className="w-full text-xs text-left border-collapse border border-slate-200">
            <thead className="bg-slate-100 text-slate-700 font-bold">
              <tr>
                <th className="py-1.5 px-3 border border-slate-200">Component</th>
                <th className="py-1.5 px-3 text-right border border-slate-200">Amount</th>
                <th className="py-1.5 px-3 text-right border border-slate-200">Percentage</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="py-1.5 px-3 border border-slate-200 font-medium">Financed Principal</td>
                <td className="py-1.5 px-3 text-right border border-slate-200 font-bold">{breakdownSummary.principalAmount}</td>
                <td className="py-1.5 px-3 text-right border border-slate-200 font-semibold">{breakdownSummary.principalPercent}</td>
              </tr>
              <tr>
                <td className="py-1.5 px-3 border border-slate-200 font-medium">Total Interest Charges</td>
                <td className="py-1.5 px-3 text-right border border-slate-200 font-bold text-amber-700">{breakdownSummary.interestAmount}</td>
                <td className="py-1.5 px-3 text-right border border-slate-200 font-semibold text-amber-700">{breakdownSummary.interestPercent}</td>
              </tr>
              {breakdownSummary.feesAmount && (
                <tr>
                  <td className="py-1.5 px-3 border border-slate-200 font-medium">Taxes &amp; Lender Charges</td>
                  <td className="py-1.5 px-3 text-right border border-slate-200 font-bold">{breakdownSummary.feesAmount}</td>
                  <td className="py-1.5 px-3 text-right border border-slate-200 font-semibold">—</td>
                </tr>
              )}
              <tr className="bg-slate-50 font-bold">
                <td className="py-1.5 px-3 border border-slate-200">Total Repayment Outflow</td>
                <td className="py-1.5 px-3 text-right border border-slate-200 text-slate-900 font-black">{breakdownSummary.totalAmount}</td>
                <td className="py-1.5 px-3 text-right border border-slate-200">100.0%</td>
              </tr>
            </tbody>
          </table>
        </div>
      )}

      {/* 5. Section: Amortization Schedule Table */}
      {scheduleRows && scheduleRows.length > 0 && (
        <div className="mb-6">
          <h2 className="text-xs font-bold uppercase tracking-wider text-slate-700 pb-1 mb-2.5 border-b border-slate-200">
            4. {scheduleTitle}
          </h2>
          <table className="w-full text-xs text-left border-collapse border border-slate-200">
            <thead className="bg-slate-100 text-slate-800 font-bold">
              <tr>
                <th className="py-1.5 px-2.5 border border-slate-200">Period</th>
                <th className="py-1.5 px-2.5 text-right border border-slate-200">Beginning Balance</th>
                <th className="py-1.5 px-2.5 text-right border border-slate-200">Principal Paid</th>
                <th className="py-1.5 px-2.5 text-right border border-slate-200">Interest Paid</th>
                {hasExtraPayments && (
                  <th className="py-1.5 px-2.5 text-right border border-slate-200">Extra Principal</th>
                )}
                <th className="py-1.5 px-2.5 text-right border border-slate-200">Total Payment</th>
                <th className="py-1.5 px-2.5 text-right border border-slate-200">Ending Balance</th>
              </tr>
            </thead>
            <tbody>
              {scheduleRows.map((row, i) => (
                <tr key={i} className={i % 2 === 0 ? "bg-white" : "bg-slate-50/60"}>
                  <td className="py-1.5 px-2.5 border border-slate-200 font-semibold">{row.period}</td>
                  <td className="py-1.5 px-2.5 text-right border border-slate-200">{row.beginningBalance}</td>
                  <td className="py-1.5 px-2.5 text-right border border-slate-200 font-semibold text-emerald-700">{row.principal}</td>
                  <td className="py-1.5 px-2.5 text-right border border-slate-200 font-semibold text-amber-700">{row.interest}</td>
                  {hasExtraPayments && (
                    <td className="py-1.5 px-2.5 text-right border border-slate-200 font-medium text-blue-700">{row.extraPayment || "—"}</td>
                  )}
                  <td className="py-1.5 px-2.5 text-right border border-slate-200 font-bold">{row.payment}</td>
                  <td className="py-1.5 px-2.5 text-right border border-slate-200 font-medium">{row.endingBalance}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* 6. Section: Official Disclaimer Footer */}
      <div className="pt-4 border-t-2 border-slate-300 text-[10px] text-slate-500 leading-relaxed print-avoid-break">
        <p className="font-semibold text-slate-600 mb-1">
          IMPORTANT FINANCIAL NOTICE &amp; DISCLAIMER:
        </p>
        <p>
          This report is automatically generated based on user-provided input parameters using Saviora&apos;s verified mathematical calculation engines. It is designed for educational, estimation, and planning purposes only and does not constitute a formal loan offer, credit approval, or financial advice. Actual loan terms, interest rates, APR, insurance, and lender fees are determined by individual lending institutions based on underwriting, credit score, and applicable regulations.
        </p>
        <div className="mt-2 flex justify-between text-slate-400 font-medium">
          <span>Generated by Saviora (https://saviora.app)</span>
          <span>Confidential Personal Assessment</span>
        </div>
      </div>
    </div>
  );
}
