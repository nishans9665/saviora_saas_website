"use client";

import React from "react";
import { formatInvestmentCurrency, SupportedCurrency } from "@/lib/investment-calculators/currencies";

interface Segment {
  label: string;
  amount: number;
  color: string;
}

interface InvestmentVisualBreakdownProps {
  title?: string;
  currency: SupportedCurrency;
  segments: Segment[];
}

export function InvestmentVisualBreakdown({
  title = "Wealth Breakdown",
  currency,
  segments,
}: InvestmentVisualBreakdownProps) {
  const total = segments.reduce((sum, s) => sum + Math.max(0, s.amount), 0);

  return (
    <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-xs">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-sm font-bold text-slate-900">{title}</h3>
        <span className="text-xs font-semibold text-slate-500">
          Total: {formatInvestmentCurrency(total, currency)}
        </span>
      </div>

      {/* Multi-segment visual bar */}
      <div className="w-full h-4 rounded-full overflow-hidden flex bg-slate-100 shadow-inner">
        {total > 0 ? (
          segments.map((seg, idx) => {
            const pct = Math.max(0, (seg.amount / total) * 100);
            if (pct <= 0) return null;
            return (
              <div
                key={idx}
                style={{ width: `${pct}%` }}
                className={`${seg.color} transition-all duration-500`}
                title={`${seg.label}: ${pct.toFixed(1)}%`}
              />
            );
          })
        ) : (
          <div className="w-full bg-slate-200" />
        )}
      </div>

      {/* Legend */}
      <div className="mt-4 grid grid-cols-2 sm:grid-cols-3 gap-2.5 pt-2 border-t border-slate-100">
        {segments.map((seg, idx) => {
          const pct = total > 0 ? (seg.amount / total) * 100 : 0;
          return (
            <div key={idx} className="flex items-center gap-2">
              <span className={`w-2.5 h-2.5 rounded-full shrink-0 ${seg.color}`} />
              <div className="min-w-0">
                <p className="text-[11px] font-medium text-slate-500 truncate">{seg.label}</p>
                <p className="text-xs font-bold text-slate-900">
                  {formatInvestmentCurrency(seg.amount, currency)}{" "}
                  <span className="text-[10px] font-normal text-slate-500">
                    ({pct.toFixed(1)}%)
                  </span>
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
