"use client";

import React from "react";
import { formatLoanCurrency, SupportedCurrency } from "@/lib/loan-calculators/currencies";

export interface BreakdownSlice {
  label: string;
  amount: number;
  color: string; // Tailwind hex or bg class
}

interface LoanVisualBreakdownProps {
  slices: BreakdownSlice[];
  currency: SupportedCurrency;
  centerTitle?: string;
  centerValue?: string;
  className?: string;
}

export function LoanVisualBreakdown({
  slices,
  currency,
  centerTitle = "Total",
  centerValue,
  className = "",
}: LoanVisualBreakdownProps) {
  const total = slices.reduce((sum, s) => sum + Math.max(0, s.amount), 0);

  // SVG Donut calculation
  const size = 160;
  const strokeWidth = 22;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;

  let accumulatedPercent = 0;

  return (
    <div className={`bg-white rounded-2xl p-5 border border-gray-100 shadow-xs ${className}`}>
      <h4 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-4">
        Visual Financial Breakdown
      </h4>

      <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
        {/* SVG Donut */}
        <div className="relative w-36 h-36 shrink-0 flex items-center justify-center">
          <svg className="w-full h-full transform -rotate-90" viewBox={`0 0 ${size} ${size}`}>
            {/* Background track */}
            <circle
              cx={size / 2}
              cy={size / 2}
              r={radius}
              fill="transparent"
              stroke="#f1f5f9"
              strokeWidth={strokeWidth}
            />

            {total > 0 &&
              slices.map((slice, i) => {
                const percent = Math.max(0, slice.amount) / total;
                const dashOffset = circumference * (1 - percent);
                const strokeDasharray = `${circumference * percent} ${circumference * (1 - percent)}`;
                const rotation = accumulatedPercent * 360;
                accumulatedPercent += percent;

                return (
                  <circle
                    key={i}
                    cx={size / 2}
                    cy={size / 2}
                    r={radius}
                    fill="transparent"
                    stroke={slice.color}
                    strokeWidth={strokeWidth}
                    strokeDasharray={strokeDasharray}
                    style={{
                      transform: `rotate(${rotation}deg)`,
                      transformOrigin: "50% 50%",
                      transition: "stroke-dasharray 0.4s ease",
                    }}
                  />
                );
              })}
          </svg>

          {/* Center text */}
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-2">
            <span className="text-[10px] uppercase font-bold text-gray-600 truncate max-w-[80px]">
              {centerTitle}
            </span>
            <span className="text-xs font-extrabold text-gray-900 truncate max-w-[90px]">
              {centerValue || formatLoanCurrency(total, currency, { compact: true })}
            </span>
          </div>
        </div>

        {/* Legend */}
        <div className="flex-1 w-full space-y-2.5">
          {slices.map((slice, i) => {
            const percent = total > 0 ? (slice.amount / total) * 100 : 0;
            return (
              <div key={i} className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <span
                    className="w-3 h-3 rounded-full shrink-0 shadow-2xs"
                    style={{ backgroundColor: slice.color }}
                  />
                  <span className="font-medium text-gray-700">{slice.label}</span>
                </div>
                <div className="text-right">
                  <span className="font-bold text-gray-900 block">
                    {formatLoanCurrency(slice.amount, currency)}
                  </span>
                  <span className="text-[10px] text-gray-600 font-medium">
                    {percent.toFixed(1)}%
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
