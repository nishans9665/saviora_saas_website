"use client";

import React from "react";
import { Sparkles, TrendingUp, Info, ArrowUpRight, ArrowDownRight } from "lucide-react";
import { AnimatedSection } from "@/components/ui/AnimatedSection";

const monthlyData = [
  { month: "May", income: 10000, expenses: 8000, incomeStr: "$10K", expStr: "$8K" },
  { month: "Jun", income: 12000, expenses: 9500, incomeStr: "$12K", expStr: "$9.5K" },
  { month: "Jul", income: 15000, expenses: 14000, incomeStr: "$15K", expStr: "$14K" },
  { month: "Aug", income: 25000, expenses: 22000, incomeStr: "$25K", expStr: "$22K" },
  { month: "Sep", income: 120000, expenses: 110000, incomeStr: "$120K", expStr: "$110K" },
  { month: "Oct", income: 2650000, expenses: 984113, incomeStr: "$2.65M", expStr: "$984.1K" },
];

export function IncomeVsExpenses() {
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
          <div className="bg-white rounded-3xl border border-slate-200/90 p-6 sm:p-10 shadow-lg shadow-slate-900/5">
            {/* Header & Legend */}
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
                    Historical comparison over 6 months
                  </p>
                </div>
              </div>

              {/* Legend with High-Contrast Text Labels */}
              <div className="flex items-center gap-5 text-xs font-semibold">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-[#ef4444]" />
                  <span className="text-slate-700">Expenses</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-[#22c55e]" />
                  <span className="text-slate-700">Income</span>
                </div>
              </div>
            </div>

            {/* SVG Visual Graph */}
            <div className="relative pt-4 pb-6">
              <div className="h-64 sm:h-72 w-full relative">
                {/* Y-axis gridlines */}
                <div className="absolute inset-0 flex flex-col justify-between pointer-events-none text-[11px] text-slate-400">
                  <div className="border-b border-slate-100 pb-1 flex justify-between">
                    <span>2.8M</span>
                  </div>
                  <div className="border-b border-slate-100 pb-1 flex justify-between">
                    <span>2.1M</span>
                  </div>
                  <div className="border-b border-slate-100 pb-1 flex justify-between">
                    <span>1.4M</span>
                  </div>
                  <div className="border-b border-slate-100 pb-1 flex justify-between">
                    <span>700k</span>
                  </div>
                  <div className="border-b border-slate-200 pb-1 flex justify-between">
                    <span>0</span>
                  </div>
                </div>

                {/* SVG Curves */}
                <svg
                  className="w-full h-full absolute inset-0 pt-2 pb-5"
                  viewBox="0 0 600 240"
                  preserveAspectRatio="none"
                >
                  <defs>
                    <linearGradient id="incomeGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#22c55e" stopOpacity="0.25" />
                      <stop offset="100%" stopColor="#22c55e" stopOpacity="0.0" />
                    </linearGradient>
                    <linearGradient id="expenseGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#ef4444" stopOpacity="0.15" />
                      <stop offset="100%" stopColor="#ef4444" stopOpacity="0.0" />
                    </linearGradient>
                  </defs>

                  {/* Income Area Fill */}
                  <path
                    d="M 50,230 Q 300,230 450,210 T 550,20 L 550,230 Z"
                    fill="url(#incomeGrad)"
                  />
                  {/* Expense Area Fill */}
                  <path
                    d="M 50,230 Q 300,230 450,215 T 550,110 L 550,230 Z"
                    fill="url(#expenseGrad)"
                  />

                  {/* Income Stroke Line */}
                  <path
                    d="M 50,230 Q 300,230 450,210 T 550,20"
                    fill="none"
                    stroke="#22c55e"
                    strokeWidth="3.5"
                    strokeLinecap="round"
                  />
                  {/* Expense Stroke Line */}
                  <path
                    d="M 50,230 Q 300,230 450,215 T 550,110"
                    fill="none"
                    stroke="#ef4444"
                    strokeWidth="3.5"
                    strokeLinecap="round"
                  />

                  {/* Data Points on Line */}
                  <circle cx="50" cy="230" r="4.5" fill="#22c55e" stroke="#ffffff" strokeWidth="2" />
                  <circle cx="150" cy="230" r="4.5" fill="#22c55e" stroke="#ffffff" strokeWidth="2" />
                  <circle cx="250" cy="229" r="4.5" fill="#22c55e" stroke="#ffffff" strokeWidth="2" />
                  <circle cx="350" cy="226" r="4.5" fill="#22c55e" stroke="#ffffff" strokeWidth="2" />
                  <circle cx="450" cy="210" r="4.5" fill="#22c55e" stroke="#ffffff" strokeWidth="2" />
                  <circle cx="550" cy="20" r="6" fill="#16a34a" stroke="#ffffff" strokeWidth="2.5" />

                  <circle cx="50" cy="230" r="4.5" fill="#ef4444" stroke="#ffffff" strokeWidth="2" />
                  <circle cx="150" cy="230" r="4.5" fill="#ef4444" stroke="#ffffff" strokeWidth="2" />
                  <circle cx="250" cy="229" r="4.5" fill="#ef4444" stroke="#ffffff" strokeWidth="2" />
                  <circle cx="350" cy="227" r="4.5" fill="#ef4444" stroke="#ffffff" strokeWidth="2" />
                  <circle cx="450" cy="215" r="4.5" fill="#ef4444" stroke="#ffffff" strokeWidth="2" />
                  <circle cx="550" cy="110" r="6" fill="#dc2626" stroke="#ffffff" strokeWidth="2.5" />
                </svg>
              </div>

              {/* X-axis Labels */}
              <div className="flex justify-between text-xs font-semibold text-slate-500 pt-3 px-2 sm:px-6">
                {monthlyData.map((d, i) => (
                  <div key={i} className="text-center">
                    <span className="block text-slate-800">{d.month}</span>
                    <span className="hidden sm:block text-[10px] text-slate-400 font-normal">
                      {d.expStr} exp
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* October Summary Callout */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6 pt-6 border-t border-slate-100">
              <div className="p-4 rounded-2xl bg-emerald-50/60 border border-emerald-100 flex items-center justify-between">
                <div>
                  <div className="text-xs font-medium text-emerald-800">Recorded Inflow (October)</div>
                  <div className="text-xl sm:text-2xl font-extrabold text-emerald-950 mt-0.5">$2,650,000.00</div>
                </div>
                <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center">
                  <ArrowUpRight className="w-5 h-5" />
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-rose-50/60 border border-rose-100 flex items-center justify-between">
                <div>
                  <div className="text-xs font-medium text-rose-800">Recorded Outflow (October)</div>
                  <div className="text-xl sm:text-2xl font-extrabold text-rose-950 mt-0.5">$984,113.65</div>
                </div>
                <div className="w-10 h-10 rounded-xl bg-rose-100 text-rose-700 flex items-center justify-center">
                  <ArrowDownRight className="w-5 h-5" />
                </div>
              </div>
            </div>

            {/* Note */}
            <div className="mt-6 pt-4 border-t border-slate-100 flex items-start gap-2.5 text-xs text-slate-500">
              <Info className="w-4 h-4 text-slate-400 flex-shrink-0 mt-0.5" />
              <span>
                Compare the two series to understand changes in your financial activity over time. Note: Income vs Expenses displays historical transaction activity and does not provide guaranteed forecasting or investment predictions.
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
