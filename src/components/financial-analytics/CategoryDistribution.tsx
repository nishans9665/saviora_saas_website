"use client";

import React, { useState } from "react";
import { Sparkles, PieChart, Info, Layers, Search, ArrowUpRight } from "lucide-react";
import { AnimatedSection } from "@/components/ui/AnimatedSection";

export interface CategoryItem {
  id: string;
  name: string;
  amount: string;
  rawAmount: number;
  percentage: string;
  percentValue: number;
  transactions: string;
  color: string;
  bgLight: string;
  borderColor: string;
  strokeColor: string;
  dashLength: number;
  dashOffset: number;
}

// 11 Realistic Personal Finance Categories summing to $4,250.00 (100.0%)
// Circumference = 100. Slices have a subtle 0.8% gap for clean modern aesthetics.
export const personalCategoryData: CategoryItem[] = [
  {
    id: "cat-housing",
    name: "Housing & Rent",
    amount: "$1,450.00",
    rawAmount: 1450,
    percentage: "34.1%",
    percentValue: 34.1,
    transactions: "2 transactions",
    color: "bg-emerald-500",
    bgLight: "bg-emerald-50/70",
    borderColor: "border-emerald-500",
    strokeColor: "#10b981",
    dashLength: 33.3, // 34.1 - 0.8 gap
    dashOffset: 0,
  },
  {
    id: "cat-groceries",
    name: "Food & Groceries",
    amount: "$780.00",
    rawAmount: 780,
    percentage: "18.4%",
    percentValue: 18.4,
    transactions: "16 transactions",
    color: "bg-orange-500",
    bgLight: "bg-orange-50/70",
    borderColor: "border-orange-500",
    strokeColor: "#f97316",
    dashLength: 17.6,
    dashOffset: -34.1,
  },
  {
    id: "cat-transport",
    name: "Transportation",
    amount: "$420.00",
    rawAmount: 420,
    percentage: "9.9%",
    percentValue: 9.9,
    transactions: "12 transactions",
    color: "bg-blue-500",
    bgLight: "bg-blue-50/70",
    borderColor: "border-blue-500",
    strokeColor: "#3b82f6",
    dashLength: 9.1,
    dashOffset: -52.5,
  },
  {
    id: "cat-utilities",
    name: "Utilities & Bills",
    amount: "$340.00",
    rawAmount: 340,
    percentage: "8.0%",
    percentValue: 8.0,
    transactions: "5 transactions",
    color: "bg-amber-500",
    bgLight: "bg-amber-50/70",
    borderColor: "border-amber-500",
    strokeColor: "#f59e0b",
    dashLength: 7.2,
    dashOffset: -62.4,
  },
  {
    id: "cat-dining",
    name: "Entertainment & Dining",
    amount: "$310.00",
    rawAmount: 310,
    percentage: "7.3%",
    percentValue: 7.3,
    transactions: "8 transactions",
    color: "bg-purple-500",
    bgLight: "bg-purple-50/70",
    borderColor: "border-purple-500",
    strokeColor: "#a855f7",
    dashLength: 6.5,
    dashOffset: -70.4,
  },
  {
    id: "cat-shopping",
    name: "Shopping & Apparel",
    amount: "$260.00",
    rawAmount: 260,
    percentage: "6.1%",
    percentValue: 6.1,
    transactions: "6 transactions",
    color: "bg-cyan-500",
    bgLight: "bg-cyan-50/70",
    borderColor: "border-cyan-500",
    strokeColor: "#06b6d4",
    dashLength: 5.3,
    dashOffset: -77.7,
  },
  {
    id: "cat-healthcare",
    name: "Healthcare & Wellness",
    amount: "$210.00",
    rawAmount: 210,
    percentage: "4.9%",
    percentValue: 4.9,
    transactions: "4 transactions",
    color: "bg-teal-500",
    bgLight: "bg-teal-50/70",
    borderColor: "border-teal-500",
    strokeColor: "#14b8a6",
    dashLength: 4.1,
    dashOffset: -83.8,
  },
  {
    id: "cat-subs",
    name: "Subscriptions & Streaming",
    amount: "$165.00",
    rawAmount: 165,
    percentage: "3.9%",
    percentValue: 3.9,
    transactions: "7 transactions",
    color: "bg-indigo-500",
    bgLight: "bg-indigo-50/70",
    borderColor: "border-indigo-500",
    strokeColor: "#6366f1",
    dashLength: 3.1,
    dashOffset: -88.7,
  },
  {
    id: "cat-personal",
    name: "Personal Care",
    amount: "$140.00",
    rawAmount: 140,
    percentage: "3.3%",
    percentValue: 3.3,
    transactions: "4 transactions",
    color: "bg-rose-500",
    bgLight: "bg-rose-50/70",
    borderColor: "border-rose-500",
    strokeColor: "#f43f5e",
    dashLength: 2.5,
    dashOffset: -92.6,
  },
  {
    id: "cat-education",
    name: "Education & Courses",
    amount: "$115.00",
    rawAmount: 115,
    percentage: "2.7%",
    percentValue: 2.7,
    transactions: "3 transactions",
    color: "bg-pink-500",
    bgLight: "bg-pink-50/70",
    borderColor: "border-pink-500",
    strokeColor: "#ec4899",
    dashLength: 1.9,
    dashOffset: -95.9,
  },
  {
    id: "cat-misc",
    name: "Miscellaneous",
    amount: "$60.00",
    rawAmount: 60,
    percentage: "1.4%",
    percentValue: 1.4,
    transactions: "2 transactions",
    color: "bg-slate-500",
    bgLight: "bg-slate-100",
    borderColor: "border-slate-500",
    strokeColor: "#64748b",
    dashLength: 1.2,
    dashOffset: -98.6,
  },
];

export function CategoryDistribution() {
  const [activeCategory, setActiveCategory] = useState<number | null>(null);
  const [filterQuery, setFilterQuery] = useState<string>("");

  const filteredCategories = personalCategoryData.filter((cat) =>
    cat.name.toLowerCase().includes(filterQuery.toLowerCase())
  );

  const activeItem = activeCategory !== null ? personalCategoryData[activeCategory] : null;

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
            Break down your recorded personal expenses by category to see how your monthly budget is distributed. Identify top spending areas and explore the exact transactions behind each category.
          </p>
        </AnimatedSection>

        {/* 2-Column Showcase */}
        <div className="max-w-5xl mx-auto">
          <div className="bg-white rounded-3xl border border-slate-200/90 p-6 sm:p-10 shadow-lg shadow-slate-900/5">
            {/* Top Bar */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 mb-8 border-b border-slate-100 gap-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center">
                  <PieChart className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-slate-900">Category Distribution</h3>
                  <p className="text-xs text-slate-400">Monthly personal outflow breakdown across 11 categories</p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <div className="text-xs font-semibold px-3 py-1.5 rounded-full bg-slate-100 text-slate-700 border border-slate-200/60 flex items-center gap-1.5">
                  <Layers className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Total Tracked: $4,250.00</span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              {/* Donut Visualization */}
              <div className="lg:col-span-5 flex flex-col items-center justify-center">
                <div className="relative w-64 h-64 sm:w-72 sm:h-72">
                  <svg className="w-full h-full -rotate-90 transform" viewBox="0 0 36 36">
                    <defs>
                      <filter id="donutGlow" x="-20%" y="-20%" width="140%" height="140%">
                        <feDropShadow dx="0" dy="0" stdDeviation="0.6" floodColor="#000" floodOpacity="0.15" />
                      </filter>
                    </defs>

                    {/* Subtle Base Track */}
                    <circle
                      cx="18"
                      cy="18"
                      r="15.9155"
                      fill="none"
                      stroke="#f1f5f9"
                      strokeWidth="3.8"
                    />

                    {/* Slices covering 100% with clean modern gaps and no stroke clipping */}
                    {personalCategoryData.map((cat, idx) => {
                      const isHovered = activeCategory === idx;
                      return (
                        <circle
                          key={cat.id}
                          cx="18"
                          cy="18"
                          r="15.9155"
                          stroke={cat.strokeColor}
                          strokeDasharray={`${cat.dashLength} 100`}
                          strokeDashoffset={cat.dashOffset}
                          strokeWidth={isHovered ? "5.0" : "3.8"}
                          strokeLinecap="round"
                          fill="none"
                          filter={isHovered ? "url(#donutGlow)" : undefined}
                          className="transition-all duration-300 cursor-pointer"
                          onMouseEnter={() => setActiveCategory(idx)}
                          onMouseLeave={() => setActiveCategory(null)}
                        />
                      );
                    })}
                  </svg>

                  {/* Donut Center Display */}
                  <div className="absolute inset-0 flex flex-col items-center justify-center text-center pointer-events-none p-4 transition-all duration-300">
                    <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wide">
                      {activeItem ? activeItem.name : "Top Category"}
                    </span>
                    <span className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight my-0.5">
                      {activeItem ? activeItem.percentage : "34.1%"}
                    </span>
                    <span
                      className="text-xs font-bold transition-colors"
                      style={{ color: activeItem ? activeItem.strokeColor : "#10b981" }}
                    >
                      {activeItem ? `${activeItem.amount} (${activeItem.transactions})` : "Housing & Rent ($1,450.00)"}
                    </span>
                  </div>
                </div>

                <div className="text-[11px] text-slate-400 mt-5 text-center flex items-center justify-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  <span>Hover any slice or row to inspect spending allocation</span>
                </div>
              </div>

              {/* Category Breakdown Scrollable List */}
              <div className="lg:col-span-7">
                {/* Search Bar within Category List */}
                <div className="mb-3 relative">
                  <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                  <input
                    type="text"
                    placeholder="Filter categories (e.g. Groceries, Utilities)..."
                    value={filterQuery}
                    onChange={(e) => setFilterQuery(e.target.value)}
                    className="w-full pl-8 pr-3 py-1.5 text-xs rounded-xl border border-slate-200 bg-slate-50/60 text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-amber-500/30 focus:border-amber-400"
                  />
                </div>

                {/* Scrollable list with custom scrollbar and vivid hover synchronization */}
                <div className="space-y-2 max-h-[380px] overflow-y-auto pr-1.5 scrollbar-thin scrollbar-thumb-slate-200 hover:scrollbar-thumb-slate-300">
                  {filteredCategories.map((cat) => {
                    const originalIdx = personalCategoryData.findIndex((c) => c.id === cat.id);
                    const isHovered = activeCategory === originalIdx;

                    return (
                      <div
                        key={cat.id}
                        onMouseEnter={() => setActiveCategory(originalIdx)}
                        onMouseLeave={() => setActiveCategory(null)}
                        className={`flex items-center justify-between p-3 rounded-2xl border transition-all duration-200 cursor-pointer ${
                          isHovered
                            ? `${cat.bgLight} border-l-4 ${cat.borderColor} border-t-slate-200 border-r-slate-200 border-b-slate-200 shadow-sm scale-[1.01]`
                            : "bg-white border-slate-100 hover:border-slate-200 hover:bg-slate-50/60"
                        }`}
                      >
                        <div className="flex items-center gap-3 min-w-0">
                          <span
                            className={`w-3.5 h-3.5 rounded-full flex-shrink-0 transition-transform ${isHovered ? "scale-125 ring-2 ring-white shadow-xs" : ""}`}
                            style={{ backgroundColor: cat.strokeColor }}
                          />
                          <div className="truncate">
                            <div className="text-sm font-bold text-slate-900 truncate">
                              {cat.name}
                            </div>
                            <div className="text-[11px] text-slate-500">
                              {cat.transactions}
                            </div>
                          </div>
                        </div>

                        <div className="text-right flex-shrink-0 pl-3">
                          <div className="text-sm font-extrabold text-slate-900">
                            {cat.amount}
                          </div>
                          <div
                            className="text-xs font-bold"
                            style={{ color: cat.strokeColor }}
                          >
                            {cat.percentage}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Bottom Insight Note */}
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
