"use client";

import React from "react";
import { cn } from "@/lib/utils";

export interface BreakdownRow {
  label: string;
  amount: string;
  percentage?: string;
  type?: "income" | "deduction" | "subtotal" | "net" | "neutral" | "highlight" | "info";
  info?: string;
}

interface BreakdownTableProps {
  title?: string;
  description?: string;
  subtitle?: string;
  rows: BreakdownRow[];
  _exportFileName?: string;
  exportFileName?: string;
  className?: string;
}

export function BreakdownTable({
  title = "Calculation Breakdown",
  description,
  subtitle,
  rows,
  _exportFileName,
  className,
}: BreakdownTableProps) {
  return (
    <div
      className={cn(
        "rounded-2xl border border-slate-200 bg-white overflow-hidden shadow-2xs",
        className
      )}
    >
      {(title || description) && (
        <div className="p-4 sm:p-5 border-b border-slate-100 bg-slate-50/50">
          {title && (
            <h4 className="font-bold text-slate-900 text-sm sm:text-base">
              {title}
            </h4>
          )}
          {(description || subtitle) && (
          <p className="text-xs text-slate-500 mt-0.5">{description || subtitle}</p>
        )}
        {false && (
            <p className="text-xs text-slate-500 mt-0.5">{description}</p>
          )}
        </div>
      )}

      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse text-xs sm:text-sm">
          <thead>
            <tr className="border-b border-slate-100 text-[11px] font-bold text-slate-400 uppercase tracking-wider bg-slate-50/30">
              <th className="py-2.5 px-4">Component</th>
              <th className="py-2.5 px-4 text-right">Amount</th>
              <th className="py-2.5 px-4 text-right">Share</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {rows.map((row, idx) => {
              const isSubtotal = row.type === "subtotal";
              const isNet = row.type === "net";
              const isDeduction = row.type === "deduction";
              const isIncome = row.type === "income";

              return (
                <tr
                  key={idx}
                  className={cn(
                    "transition-colors",
                    isNet && "bg-emerald-50/60 font-bold text-emerald-950",
                    isSubtotal && "bg-slate-50/80 font-semibold text-slate-900",
                    !isNet && !isSubtotal && "hover:bg-slate-50/50 text-slate-700"
                  )}
                >
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-1.5">
                      <span className={cn(isNet ? "font-bold text-slate-900" : "font-medium")}>
                        {row.label}
                      </span>
                    </div>
                    {row.info && (
                      <span className="block text-[11px] text-slate-400 font-normal">
                        {row.info}
                      </span>
                    )}
                  </td>

                  <td
                    className={cn(
                      "py-3 px-4 text-right font-mono font-semibold",
                      isDeduction && "text-rose-600",
                      isIncome && "text-emerald-700",
                      isNet && "text-emerald-700 font-bold text-sm sm:text-base",
                      !isDeduction && !isIncome && !isNet && "text-slate-800"
                    )}
                  >
                    {isDeduction ? "-" + row.amount : row.amount}
                  </td>

                  <td className="py-3 px-4 text-right text-slate-400 font-medium">
                    {row.percentage || "—"}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
