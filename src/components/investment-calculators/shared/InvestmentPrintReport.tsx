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
  startingBalance?: string;
  contributions?: string;
  growth?: string;
  endingBalance: string;
}

export interface InvestmentPrintReportProps {
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
    investedAmount: string;
    investedPercent: string;
    growthAmount: string;
    growthPercent: string;
    totalAmount: string;
  };
  scheduleRows?: ReportScheduleRow[];
  scheduleTitle?: string;
}

export function InvestmentPrintReport({
  reportTitle,
  calculatorName,
  currency,
  inputParams,
  keyMetrics,
  primaryMetric,
  breakdownSummary,
  scheduleRows,
  scheduleTitle = "Annual Wealth & Growth Schedule",
}: InvestmentPrintReportProps) {
  const currentDate = new Date().toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  return (
    <div className="hidden print:block print:w-full print:m-0 print:p-6 bg-white text-slate-900 font-sans">
      {/* 1. Header & Official Branding */}
      <div className="border-b-2 border-slate-800 pb-4 mb-6 flex justify-between items-start">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xl font-black text-slate-900 tracking-tight">SAVIORA</span>
            <span className="text-xs font-bold uppercase tracking-widest text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
              Verified Financial Assessment
            </span>
          </div>
          <h1 className="text-lg font-bold text-slate-900 mt-1">{reportTitle}</h1>
          <p className="text-xs text-slate-500">
            Tool: {calculatorName} | Currency: {currency} | Date Generated: {currentDate}
          </p>
        </div>
        <div className="text-right text-xs text-slate-500">
          <p className="font-semibold text-slate-800">SAVIORA WEALTH TOOLS</p>
          <p>https://saviora.app</p>
          <p className="text-[10px] text-slate-400 mt-0.5">Reference ID: SAV-{Date.now().toString().slice(-6)}</p>
        </div>
      </div>

      {/* 2. Structured Input Parameters */}
      <div className="mb-6">
        <h2 className="text-xs font-bold uppercase tracking-wider text-slate-700 mb-2 border-b border-slate-200 pb-1">
          User Input Parameters &amp; Assumptions
        </h2>
        <div className="grid grid-cols-2 gap-x-6 gap-y-1.5 text-xs">
          {inputParams.map((param, i) => (
            <div key={i} className="flex justify-between py-1 border-b border-slate-100">
              <span className="text-slate-600">{param.label}:</span>
              <span className="font-bold text-slate-900 font-mono">{param.value}</span>
            </div>
          ))}
        </div>
      </div>

      {/* 3. Primary Metric & Key Financial Results */}
      <div className="mb-6 bg-slate-50 p-4 rounded-xl border border-slate-200">
        <div className="text-center pb-3 mb-3 border-b border-slate-200">
          <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">{primaryMetric.label}</p>
          <p className="text-2xl font-black text-slate-900 font-mono mt-0.5">{primaryMetric.value}</p>
          {primaryMetric.subtext && (
            <p className="text-xs text-emerald-700 font-medium mt-0.5">{primaryMetric.subtext}</p>
          )}
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-center">
          {keyMetrics.map((metric, i) => (
            <div key={i} className="p-2 bg-white rounded border border-slate-200">
              <p className="text-[11px] text-slate-500">{metric.label}</p>
              <p className="text-xs font-bold text-slate-900 font-mono mt-0.5">{metric.value}</p>
              {metric.subtext && <p className="text-[10px] text-slate-400 mt-0.5">{metric.subtext}</p>}
            </div>
          ))}
        </div>
      </div>

      {/* 4. Capital vs Growth Breakdown */}
      {breakdownSummary && (
        <div className="mb-6">
          <h2 className="text-xs font-bold uppercase tracking-wider text-slate-700 mb-2 border-b border-slate-200 pb-1">
            Wealth &amp; Capital Accumulation Breakdown
          </h2>
          <table className="w-full text-xs border border-slate-200 text-left">
            <thead className="bg-slate-100 text-slate-700 font-semibold">
              <tr>
                <th className="p-2 border-b border-slate-200">Component</th>
                <th className="p-2 border-b border-slate-200 text-right">Amount ({currency})</th>
                <th className="p-2 border-b border-slate-200 text-right">Share of Total</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              <tr>
                <td className="p-2 text-slate-700">Total Invested Principal</td>
                <td className="p-2 text-right font-mono font-semibold">{breakdownSummary.investedAmount}</td>
                <td className="p-2 text-right font-mono text-slate-500">{breakdownSummary.investedPercent}</td>
              </tr>
              <tr>
                <td className="p-2 text-slate-700">Total Growth / Estimated Interest</td>
                <td className="p-2 text-right font-mono font-semibold text-emerald-700">{breakdownSummary.growthAmount}</td>
                <td className="p-2 text-right font-mono text-slate-500">{breakdownSummary.growthPercent}</td>
              </tr>
              <tr className="bg-slate-50 font-bold">
                <td className="p-2 text-slate-900">Final Accumulated Portfolio Value</td>
                <td className="p-2 text-right font-mono text-slate-900">{breakdownSummary.totalAmount}</td>
                <td className="p-2 text-right font-mono text-slate-900">100.0%</td>
              </tr>
            </tbody>
          </table>
        </div>
      )}

      {/* 5. Schedule Table */}
      {scheduleRows && scheduleRows.length > 0 && (
        <div className="mb-6 page-break-inside-avoid">
          <h2 className="text-xs font-bold uppercase tracking-wider text-slate-700 mb-2 border-b border-slate-200 pb-1">
            {scheduleTitle}
          </h2>
          <table className="w-full text-xs border border-slate-200 text-left">
            <thead className="bg-slate-100 text-slate-700 font-semibold">
              <tr>
                <th className="p-1.5 border-b border-slate-200">Period</th>
                {scheduleRows[0].startingBalance && <th className="p-1.5 border-b border-slate-200 text-right">Start Balance</th>}
                {scheduleRows[0].contributions && <th className="p-1.5 border-b border-slate-200 text-right">Contributions</th>}
                {scheduleRows[0].growth && <th className="p-1.5 border-b border-slate-200 text-right">Growth / Interest</th>}
                <th className="p-1.5 border-b border-slate-200 text-right">Ending Balance</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-mono text-[11px]">
              {scheduleRows.slice(0, 30).map((row, idx) => (
                <tr key={idx} className={idx % 2 === 1 ? "bg-slate-50/50" : ""}>
                  <td className="p-1.5 font-sans font-medium text-slate-800">{row.period}</td>
                  {row.startingBalance && <td className="p-1.5 text-right">{row.startingBalance}</td>}
                  {row.contributions && <td className="p-1.5 text-right text-slate-700">{row.contributions}</td>}
                  {row.growth && <td className="p-1.5 text-right text-emerald-700">{row.growth}</td>}
                  <td className="p-1.5 text-right font-bold text-slate-900">{row.endingBalance}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* 6. Footer & Legal Disclaimer */}
      <div className="border-t border-slate-200 pt-3 text-[10px] text-slate-500 leading-tight">
        <p className="font-semibold text-slate-700 mb-0.5">Mathematical Projection &amp; Disclaimer Notice:</p>
        <p>
          Results are estimates based on user-provided inputs and mathematical financial formulas. Expected returns,
          inflation assumptions, and investment growth are not guaranteed and actual performance may differ due to market
          volatility, taxes, and fees. This report is for educational and planning purposes only and does not constitute
          personalized investment, tax, or legal advice.
        </p>
      </div>
    </div>
  );
}
