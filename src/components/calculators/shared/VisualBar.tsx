"use client";

import React from "react";
import { cn } from "@/lib/utils";

export interface Segment {
  label: string;
  value: number;
  formattedValue?: string;
  colorClass?: string;
  color?: string;
  textColor?: string;
  description?: string;
  percentage?: number;
}

interface VisualBarProps {
  title?: string;
  totalAmount?: number;
  segments: Segment[];
  className?: string;
}

export function VisualBar({
  title = "Income Distribution",
  totalAmount,
  segments,
  className,
}: VisualBarProps) {
  const sum = totalAmount || segments.reduce((acc, s) => acc + Math.max(0, s.value), 0);

  const normalizedSegments = segments
    .filter((s) => s.value > 0)
    .map((s) => {
      const pct = s.percentage !== undefined ? s.percentage : sum > 0 ? (s.value / sum) * 100 : 0;
      return {
        ...s,
        pct,
        colorClass: s.colorClass || s.color || "bg-emerald-500",
        formattedValue: s.formattedValue || s.description || `${pct.toFixed(1)}%`,
      };
    });

  return (
    <div className={cn("p-4 sm:p-5 rounded-2xl bg-white border border-slate-200 shadow-2xs space-y-3", className)}>
      {title && (
        <h4 className="text-xs sm:text-sm font-bold text-slate-800">
          {title}
        </h4>
      )}

      {/* Progress Bar Container */}
      <div className="h-3 w-full rounded-full bg-slate-100 overflow-hidden flex shadow-inner">
        {normalizedSegments.map((seg, idx) => (
          <div
            key={idx}
            style={{ width: `${seg.pct}%` }}
            className={cn("h-full transition-all duration-300", seg.colorClass)}
            title={`${seg.label}: ${seg.formattedValue}`}
          />
        ))}
      </div>

      {/* Legend */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
        {normalizedSegments.map((seg, idx) => (
          <div key={idx} className="flex items-center justify-between text-xs py-1 border-b border-slate-50 last:border-b-0">
            <div className="flex items-center gap-1.5 min-w-0">
              <span className={cn("w-2 h-2 rounded-full shrink-0", seg.colorClass)} />
              <span className="text-slate-600 truncate">{seg.label}</span>
            </div>
            <div className="flex items-center gap-2 font-mono shrink-0">
              <span className="font-semibold text-slate-800">{seg.formattedValue}</span>
              <span className="text-[11px] text-slate-500">({seg.pct.toFixed(1)}%)</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
