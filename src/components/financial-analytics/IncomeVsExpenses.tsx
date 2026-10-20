"use client";

import React, { useState } from "react";
import {
  Sparkles,
  TrendingUp,
  Info,
  ArrowUpRight,
  ArrowDownRight,
  Eye,
  EyeOff,
  Coins,
} from "lucide-react";
import { AnimatedSection } from "@/components/ui/AnimatedSection";

interface MonthData {
  month: string;
  fullName: string;
  income: number;
  expenses: number;
  incomeFormatted: string;
  expensesFormatted: string;
  netFormatted: string;
  isPositive: boolean;
  savingsRate: string;
}

const monthlyData: MonthData[] = [
  {
    month: "May",
    fullName: "May 2026",
    income: 5400,
    expenses: 3650,
    incomeFormatted: "$5,400.00",
    expensesFormatted: "$3,650.00",
    netFormatted: "+$1,750.00",
    isPositive: true,
    savingsRate: "32.4%",
  },
  {
    month: "Jun",
    fullName: "June 2026",
    income: 5600,
    expenses: 3820,
    incomeFormatted: "$5,600.00",
    expensesFormatted: "$3,820.00",
    netFormatted: "+$1,780.00",
    isPositive: true,
    savingsRate: "31.8%",
  },
  {
    month: "Jul",
    fullName: "July 2026",
    income: 5850,
    expenses: 3710,
    incomeFormatted: "$5,850.00",
    expensesFormatted: "$3,710.00",
    netFormatted: "+$2,140.00",
    isPositive: true,
    savingsRate: "36.6%",
  },
  {
    month: "Aug",
    fullName: "August 2026",
    income: 6100,
    expenses: 4100,
    incomeFormatted: "$6,100.00",
    expensesFormatted: "$4,100.00",
    netFormatted: "+$2,000.00",
    isPositive: true,
    savingsRate: "32.8%",
  },
  {
    month: "Sep",
    fullName: "September 2026",
    income: 6050,
    expenses: 3980,
    incomeFormatted: "$6,050.00",
    expensesFormatted: "$3,980.00",
    netFormatted: "+$2,070.00",
    isPositive: true,
    savingsRate: "34.2%",
  },
  {
    month: "Oct",
    fullName: "October 2026",
    income: 6500,
    expenses: 4250,
    incomeFormatted: "$6,500.00",
    expensesFormatted: "$4,250.00",
    netFormatted: "+$2,250.00",
    isPositive: true,
    savingsRate: "34.6%",
  },
];

// SVG Dimensions & Scales
const SVG_WIDTH = 700;
const SVG_HEIGHT = 280;
const PADDING_LEFT = 75;
const PADDING_RIGHT = 45;
const Y_BASELINE = 240; // $0 level
const Y_TOP = 35; // $8k level
const MAX_VALUE = 8000;

function getY(val: number): number {
  const ratio = Math.max(0, Math.min(1, val / MAX_VALUE));
  return Y_BASELINE - ratio * (Y_BASELINE - Y_TOP);
}

function getX(index: number, total: number): number {
  const usableWidth = SVG_WIDTH - PADDING_LEFT - PADDING_RIGHT;
  return PADDING_LEFT + (index / (total - 1)) * usableWidth;
}

// Generate smooth, strictly monotonic cubic Bezier curve without loops
function createSmoothPath(points: { x: number; y: number }[]): string {
  if (points.length === 0) return "";
  if (points.length === 1) return `M ${points[0].x},${points[0].y}`;

  let d = `M ${points[0].x},${points[0].y}`;
  const tension = 0.22; // Controlled tension prevents overshoot

  for (let i = 0; i < points.length - 1; i++) {
    const p0 = points[i === 0 ? 0 : i - 1];
    const p1 = points[i];
    const p2 = points[i + 1];
    const p3 = points[i + 2 < points.length ? i + 2 : i + 1];

    // Strictly monotonic control points in X
    const cp1x = p1.x + (p2.x - p0.x) * tension;
    const cp1y = p1.y + (p2.y - p0.y) * tension;
    const cp2x = p2.x - (p3.x - p1.x) * tension;
    const cp2y = p2.y - (p3.y - p1.y) * tension;

    d += ` C ${cp1x.toFixed(1)},${cp1y.toFixed(1)} ${cp2x.toFixed(1)},${cp2y.toFixed(1)} ${p2.x.toFixed(1)},${p2.y.toFixed(1)}`;
  }
  return d;
}

export function IncomeVsExpenses() {
  const [selectedIndex, setSelectedIndex] = useState<number>(5); // Default to October
  const [showIncome, setShowIncome] = useState<boolean>(true);
  const [showExpenses, setShowExpenses] = useState<boolean>(true);

  // Compute coordinates for data series
  const incomePoints = monthlyData.map((d, i) => ({
    x: getX(i, monthlyData.length),
    y: getY(d.income),
  }));

  const expensePoints = monthlyData.map((d, i) => ({
    x: getX(i, monthlyData.length),
    y: getY(d.expenses),
  }));

  const incomePath = createSmoothPath(incomePoints);
  const expensePath = createSmoothPath(expensePoints);

  const incomeArea = `${incomePath} L ${incomePoints[incomePoints.length - 1].x},${Y_BASELINE} L ${incomePoints[0].x},${Y_BASELINE} Z`;
  const expenseArea = `${expensePath} L ${expensePoints[expensePoints.length - 1].x},${Y_BASELINE} L ${expensePoints[0].x},${Y_BASELINE} Z`;

  const activeMonth = monthlyData[selectedIndex];

  return (
    <section className="py-20 sm:py-24 bg-white relative overflow-hidden" id="income-vs-expenses">
      <div className="container mx-auto px-4 md:px-6">
        {/* Header */}
        <AnimatedSection className="text-center max-w-3xl mx-auto mb-14 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-100/80 border border-emerald-200/80 text-emerald-800 text-xs font-semibold uppercase tracking-wider mb-4 shadow-xs">
            <Sparkles className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0" />
            <span>SEE THE DIFFERENCE</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 mb-4">
            Compare Income and Expenses Over Time
          </h2>

          <p className="text-base sm:text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
            Review your recorded income and expenses across a selected reporting period. Visual comparisons can help you understand how money comes in and how much you record as spending.
          </p>
        </AnimatedSection>

        {/* Chart Card */}
        <div className="max-w-5xl mx-auto">
          <div className="bg-white rounded-3xl border border-slate-200/90 p-5 sm:p-10 shadow-lg shadow-slate-900/5">
            {/* Header & Interactive Series Legend */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 mb-6 border-b border-slate-100 gap-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-emerald-50 text-[#16a34a] flex items-center justify-center">
                  <TrendingUp className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-slate-900">
                    Income vs Expenses
                  </h3>
                  <p className="text-xs text-slate-400">
                    Interactive 6-month historical cash flow comparison
                  </p>
                </div>
              </div>

              {/* Series Toggles in Legend */}
              <div className="flex items-center gap-2.5 sm:gap-4 text-xs font-semibold">
                {/* Expenses Toggle */}
                <button
                  type="button"
                  onClick={() => setShowExpenses(!showExpenses)}
                  className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full border transition-all cursor-pointer ${
                    showExpenses
                      ? "bg-rose-50/80 border-rose-200 text-rose-800 shadow-2xs"
                      : "bg-slate-50 border-slate-200 text-slate-400 opacity-60"
                  }`}
                  title="Toggle Expenses series"
                >
                  <span className="w-2.5 h-2.5 rounded-full bg-[#ef4444]" />
                  <span>Expenses</span>
                  {showExpenses ? <Eye className="w-3 h-3 text-rose-500" /> : <EyeOff className="w-3 h-3 text-slate-400" />}
                </button>

                {/* Income Toggle */}
                <button
                  type="button"
                  onClick={() => setShowIncome(!showIncome)}
                  className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full border transition-all cursor-pointer ${
                    showIncome
                      ? "bg-emerald-50/80 border-emerald-200 text-emerald-800 shadow-2xs"
                      : "bg-slate-50 border-slate-200 text-slate-400 opacity-60"
                  }`}
                  title="Toggle Income series"
                >
                  <span className="w-2.5 h-2.5 rounded-full bg-[#22c55e]" />
                  <span>Income</span>
                  {showIncome ? <Eye className="w-3 h-3 text-emerald-600" /> : <EyeOff className="w-3 h-3 text-slate-400" />}
                </button>
              </div>
            </div>

            {/* SVG Visual Graph Container */}
            <div className="relative pt-2 pb-6">
              <div className="h-72 sm:h-80 w-full relative">
                {/* Y-axis Labels & Gridlines */}
                <div className="absolute inset-0 flex flex-col justify-between pointer-events-none text-[11px] font-medium text-slate-400">
                  <div className="border-b border-slate-100 pb-1 flex justify-between">
                    <span className="w-14">$8k</span>
                  </div>
                  <div className="border-b border-slate-100 pb-1 flex justify-between">
                    <span className="w-14">$6k</span>
                  </div>
                  <div className="border-b border-slate-100 pb-1 flex justify-between">
                    <span className="w-14">$4k</span>
                  </div>
                  <div className="border-b border-slate-100 pb-1 flex justify-between">
                    <span className="w-14">$2k</span>
                  </div>
                  <div className="border-b border-slate-200 pb-1 flex justify-between">
                    <span className="w-14">$0</span>
                  </div>
                </div>

                {/* SVG Visual Graph */}
                <svg
                  className="w-full h-full absolute inset-0"
                  viewBox={`0 0 ${SVG_WIDTH} ${SVG_HEIGHT}`}
                  preserveAspectRatio="none"
                >
                  <defs>
                    {/* Income Gradient */}
                    <linearGradient id="incomeAreaGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#22c55e" stopOpacity="0.22" />
                      <stop offset="100%" stopColor="#22c55e" stopOpacity="0.0" />
                    </linearGradient>

                    {/* Expense Gradient */}
                    <linearGradient id="expenseAreaGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#ef4444" stopOpacity="0.14" />
                      <stop offset="100%" stopColor="#ef4444" stopOpacity="0.0" />
                    </linearGradient>

                    {/* Glow filter */}
                    <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
                      <feGaussianBlur stdDeviation="3" result="blur" />
                      <feComposite in="SourceGraphic" in2="blur" operator="over" />
                    </filter>
                  </defs>

                  {/* Active Month Vertical Indicator Bar */}
                  {selectedIndex !== null && (
                    <g>
                      <line
                        x1={getX(selectedIndex, monthlyData.length)}
                        y1={Y_TOP}
                        x2={getX(selectedIndex, monthlyData.length)}
                        y2={Y_BASELINE}
                        stroke="#cbd5e1"
                        strokeWidth="1.5"
                        strokeDasharray="4 4"
                      />
                      <rect
                        x={getX(selectedIndex, monthlyData.length) - 24}
                        y={Y_TOP}
                        width="48"
                        height={Y_BASELINE - Y_TOP}
                        fill="#0f172a"
                        fillOpacity="0.02"
                        rx="6"
                      />
                    </g>
                  )}

                  {/* Income Area Fill */}
                  {showIncome && (
                    <path
                      d={incomeArea}
                      fill="url(#incomeAreaGrad)"
                      className="transition-opacity duration-300"
                    />
                  )}

                  {/* Expense Area Fill */}
                  {showExpenses && (
                    <path
                      d={expenseArea}
                      fill="url(#expenseAreaGrad)"
                      className="transition-opacity duration-300"
                    />
                  )}

                  {/* Income Line */}
                  {showIncome && (
                    <path
                      d={incomePath}
                      fill="none"
                      stroke="#22c55e"
                      strokeWidth="3.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  )}

                  {/* Expense Line */}
                  {showExpenses && (
                    <path
                      d={expensePath}
                      fill="none"
                      stroke="#ef4444"
                      strokeWidth="3.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  )}

                  {/* Income Data Points */}
                  {showIncome &&
                    incomePoints.map((pt, i) => {
                      const isSelected = selectedIndex === i;
                      return (
                        <g key={`inc-pt-${i}`}>
                          {isSelected && (
                            <circle
                              cx={pt.x}
                              cy={pt.y}
                              r="10"
                              fill="#22c55e"
                              fillOpacity="0.2"
                              className="animate-ping"
                            />
                          )}
                          <circle
                            cx={pt.x}
                            cy={pt.y}
                            r={isSelected ? "6.5" : "4.5"}
                            fill="#22c55e"
                            stroke="#ffffff"
                            strokeWidth={isSelected ? "3" : "2"}
                            className="transition-all duration-200 cursor-pointer"
                            onClick={() => setSelectedIndex(i)}
                          />
                        </g>
                      );
                    })}

                  {/* Expense Data Points */}
                  {showExpenses &&
                    expensePoints.map((pt, i) => {
                      const isSelected = selectedIndex === i;
                      return (
                        <g key={`exp-pt-${i}`}>
                          {isSelected && (
                            <circle
                              cx={pt.x}
                              cy={pt.y}
                              r="10"
                              fill="#ef4444"
                              fillOpacity="0.2"
                              className="animate-ping"
                            />
                          )}
                          <circle
                            cx={pt.x}
                            cy={pt.y}
                            r={isSelected ? "6.5" : "4.5"}
                            fill="#ef4444"
                            stroke="#ffffff"
                            strokeWidth={isSelected ? "3" : "2"}
                            className="transition-all duration-200 cursor-pointer"
                            onClick={() => setSelectedIndex(i)}
                          />
                        </g>
                      );
                    })}
                </svg>
              </div>

              {/* Interactive X-axis Month Buttons */}
              <div className="grid grid-cols-6 gap-1 pt-4 text-xs font-semibold px-2 sm:px-6">
                {monthlyData.map((d, i) => {
                  const isSelected = selectedIndex === i;
                  return (
                    <button
                      key={i}
                      type="button"
                      onClick={() => setSelectedIndex(i)}
                      className={`text-center py-2 px-1 rounded-xl transition-all duration-200 cursor-pointer ${
                        isSelected
                          ? "bg-slate-900 text-white shadow-sm ring-2 ring-slate-900/10 scale-105"
                          : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
                      }`}
                    >
                      <span className="block font-bold">{d.month}</span>
                      <span
                        className={`hidden sm:block text-[10px] font-normal transition-colors ${
                          isSelected ? "text-emerald-300" : "text-slate-400"
                        }`}
                      >
                        {d.savingsRate} saved
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Dynamic Month Comparison Metric Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-6 pt-6 border-t border-slate-100">
              {/* Inflow Card */}
              <div className="p-4 rounded-2xl bg-emerald-50/70 border border-emerald-200/80 flex items-center justify-between">
                <div>
                  <div className="text-xs font-semibold text-emerald-800 flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-emerald-500" />
                    <span>Recorded Inflow ({activeMonth.month})</span>
                  </div>
                  <div className="text-xl sm:text-2xl font-black text-emerald-950 mt-1">
                    {activeMonth.incomeFormatted}
                  </div>
                  <div className="text-[11px] text-emerald-700/90 mt-0.5">
                    Total recorded monthly inflows
                  </div>
                </div>
                <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center flex-shrink-0">
                  <ArrowUpRight className="w-5 h-5" />
                </div>
              </div>

              {/* Outflow Card */}
              <div className="p-4 rounded-2xl bg-rose-50/70 border border-rose-200/80 flex items-center justify-between">
                <div>
                  <div className="text-xs font-semibold text-rose-800 flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-rose-500" />
                    <span>Recorded Outflow ({activeMonth.month})</span>
                  </div>
                  <div className="text-xl sm:text-2xl font-black text-rose-950 mt-1">
                    {activeMonth.expensesFormatted}
                  </div>
                  <div className="text-[11px] text-rose-700/90 mt-0.5">
                    Total recorded monthly outflows
                  </div>
                </div>
                <div className="w-10 h-10 rounded-xl bg-rose-100 text-rose-700 flex items-center justify-center flex-shrink-0">
                  <ArrowDownRight className="w-5 h-5" />
                </div>
              </div>

              {/* Net Cash Flow Card */}
              <div className="p-4 rounded-2xl bg-blue-50/70 border border-blue-200/80 flex items-center justify-between">
                <div>
                  <div className="text-xs font-semibold text-blue-800 flex items-center gap-1.5">
                    <Coins className="w-3.5 h-3.5 text-blue-600" />
                    <span>Net Margin ({activeMonth.month})</span>
                  </div>
                  <div className="text-xl sm:text-2xl font-black text-blue-950 mt-1">
                    {activeMonth.netFormatted}
                  </div>
                  <div className="text-[11px] text-blue-700/90 mt-0.5">
                    {activeMonth.savingsRate} retention surplus
                  </div>
                </div>
                <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center flex-shrink-0">
                  <TrendingUp className="w-5 h-5" />
                </div>
              </div>
            </div>

            {/* Explanatory Caption */}
            <div className="mt-6 pt-4 border-t border-slate-100 flex items-start gap-2.5 text-xs text-slate-500">
              <Info className="w-4 h-4 text-slate-400 flex-shrink-0 mt-0.5" />
              <span>
                Compare the two series to understand changes in your financial activity over time. Note: Income vs Expenses displays historical transaction activity and does not provide guaranteed forecasting or investment predictions. Click or tap any month on the axis to inspect that period&apos;s metrics.
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
