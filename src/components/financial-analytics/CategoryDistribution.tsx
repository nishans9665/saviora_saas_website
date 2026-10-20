"use client";

import React, { useState } from "react";
import { Sparkles, PieChart, Info, Layers } from "lucide-react";
import { AnimatedSection } from "@/components/ui/AnimatedSection";

const categoryData = [
  {
    name: "Education",
    amount: "$227,611.00",
    percentage: "23.1%",
    transactions: "13 transactions",
    color: "bg-emerald-500",
    textClass: "text-emerald-700",
    strokeColor: "#10b981",
    dashArray: "23.1 100",
    dashOffset: "0",
  },
  {
    name: "Food & Groceries",
    amount: "$181,130.00",
    percentage: "18.4%",
    transactions: "20 transactions",
    color: "bg-orange-500",
    textClass: "text-orange-700",
    strokeColor: "#f97316",
    dashArray: "18.4 100",
    dashOffset: "-23.1",
  },
  {
    name: "Entertainment",
    amount: "$139,279.00",
    percentage: "14.2%",
    transactions: "17 transactions",
    color: "bg-blue-500",
    textClass: "text-blue-700",
    strokeColor: "#3b82f6",
    dashArray: "14.2 100",
    dashOffset: "-41.5",
  },
  {
    name: "Housing & Rent",
    amount: "$90,050.00",
    percentage: "9.2%",
    transactions: "11 transactions",
    color: "bg-purple-500",
    textClass: "text-purple-700",
    strokeColor: "#a855f7",
    dashArray: "9.2 100",
    dashOffset: "-55.7",
  },
  {
    name: "Travel",
    amount: "$60,708.00",
    percentage: "6.2%",
    transactions: "8 transactions",
    color: "bg-rose-500",
    textClass: "text-rose-700",
    strokeColor: "#f43f5e",
    dashArray: "6.2 100",
    dashOffset: "-64.9",
  },
];

export function CategoryDistribution() {
  const [activeCategory, setActiveCategory] = useState<number | null>(null);

  return (
    <section className="py-20 sm:py-24 bg-slate-50/60 relative overflow-hidden" id="category-distribution">
      <div className="container mx-auto px-4 md:px-6">
        {/* Header */}
        <AnimatedSection className="text-center max-w-3xl mx-auto mb-14 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-100/80 border border-amber-200/80 text-amber-800 text-xs font-semibold uppercase tracking-wider mb-4 shadow-xs">
            <Sparkles className="w-3.5 h-3.5 text-amber-600 flex-shrink-0" />
            <span>UNDERSTAND YOUR SPENDING</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 mb-4">
            Discover Where Your Money Goes
          </h2>

          <p className="text-base sm:text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
            Break down your recorded expenses by category to see how your spending is distributed. Identify the categories that account for a larger share of your expenses and explore the details behind the totals.
          </p>
        </AnimatedSection>

        {/* Visualization Grid: Donut + Detailed Table */}
        <div className="max-w-5xl mx-auto">
          <div className="bg-white rounded-3xl border border-slate-200/90 p-6 sm:p-10 shadow-lg shadow-slate-900/5">
            <div className="flex items-center justify-between pb-6 mb-8 border-b border-slate-100">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center">
                  <PieChart className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-slate-900">
                    Category Distribution
                  </h3>
                  <p className="text-xs text-slate-400">
                    Proportional breakdown across recorded expense categories
                  </p>
                </div>
              </div>

              <div className="hidden sm:inline-flex items-center gap-1.5 text-xs text-slate-500 bg-slate-50 px-3 py-1.5 rounded-lg border border-slate-200/60">
                <Layers className="w-3.5 h-3.5 text-slate-400" />
                <span>Total Tracked: $984,113.65</span>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
              {/* Donut Chart Visual */}
              <div className="lg:col-span-5 flex flex-col items-center justify-center">
                <div className="relative w-56 h-56 sm:w-64 sm:h-64 flex items-center justify-center">
                  <svg className="w-full h-full -rotate-90" viewBox="0 0 36 36">
                    {/* Background ring */}
                    <path
                      stroke="#f1f5f9"
                      strokeWidth="4"
                      fill="none"
                      d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                    />
                    {/* Colored Category Slices */}
                    {categoryData.map((cat, idx) => (
                      <path
                        key={idx}
                        stroke={cat.strokeColor}
                        strokeDasharray={cat.dashArray}
                        strokeDashoffset={cat.dashOffset}
                        strokeWidth={activeCategory === idx ? "5.5" : "4.2"}
                        fill="none"
                        className="transition-all duration-300 cursor-pointer"
                        onMouseEnter={() => setActiveCategory(idx)}
                        onMouseLeave={() => setActiveCategory(null)}
                        d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                      />
                    ))}
                  </svg>

                  {/* Donut Center Display */}
                  <div className="absolute inset-0 flex flex-col items-center justify-center text-center pointer-events-none p-4">
                    <span className="text-[11px] font-medium text-slate-400">
                      {activeCategory !== null ? categoryData[activeCategory].name : "Top Category"}
                    </span>
                    <span className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
                      {activeCategory !== null ? categoryData[activeCategory].percentage : "23.1%"}
                    </span>
                    <span className="text-[10px] text-slate-500 font-semibold">
                      {activeCategory !== null ? categoryData[activeCategory].amount : "Education"}
                    </span>
                  </div>
                </div>

                <div className="text-[11px] text-slate-400 mt-4 text-center">
                  Hover over slices or rows to isolate category details
                </div>
              </div>

              {/* Category Breakdown Rows */}
              <div className="lg:col-span-7 space-y-3">
                {categoryData.map((cat, idx) => (
                  <div
                    key={idx}
                    onMouseEnter={() => setActiveCategory(idx)}
                    onMouseLeave={() => setActiveCategory(null)}
                    className={`flex items-center justify-between p-3.5 rounded-2xl border transition-all duration-200 cursor-default ${
                      activeCategory === idx
                        ? "bg-slate-50 border-slate-300 shadow-xs scale-[1.01]"
                        : "bg-white border-slate-100 hover:border-slate-200 hover:bg-slate-50/50"
                    }`}
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <span className={`w-3.5 h-3.5 rounded-full flex-shrink-0 ${cat.color}`} />
                      <div className="truncate">
                        <div className="text-sm font-bold text-slate-900 truncate">
                          {cat.name}
                        </div>
                        <div className="text-[11px] text-slate-400">
                          {cat.transactions}
                        </div>
                      </div>
                    </div>

                    <div className="text-right flex-shrink-0">
                      <div className="text-sm font-extrabold text-slate-900">
                        {cat.amount}
                      </div>
                      <div className={`text-xs font-bold ${cat.textClass}`}>
                        {cat.percentage}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Explanatory Caption */}
            <div className="mt-8 pt-5 border-t border-slate-100 flex items-start gap-2.5 text-xs text-slate-500">
              <Info className="w-4 h-4 text-slate-400 flex-shrink-0 mt-0.5" />
              <span>
                A category breakdown makes it easier to review spending patterns and understand which areas contribute most to your recorded expenses. Note: Category analysis provides visibility and does not guarantee financial savings.
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
