"use client";

import React from "react";
import {
  Sparkles,
  PieChart,
  BarChart3,
  TrendingUp,
  CheckCircle2,
  Calendar,
} from "lucide-react";

const analyticsCards = [
  {
    title: "Category Spending Reports",
    description:
      "Review total expenses organized by category to understand exactly how each budget allocated funds throughout the month.",
    icon: PieChart,
    color: "bg-emerald-50 text-emerald-700 border-emerald-200",
  },
  {
    title: "Budget Utilization",
    description:
      "Track overall percentage metrics across all active budgets to ensure your monthly expenses align with planned financial goals.",
    icon: BarChart3,
    color: "bg-teal-50 text-teal-700 border-teal-200",
  },
  {
    title: "Monthly Financial Trends",
    description:
      "Observe month-over-month spending patterns to make calibrated adjustments for future financial periods and budgets.",
    icon: TrendingUp,
    color: "bg-amber-50 text-amber-700 border-amber-200",
  },
];

const categoryComparisons = [
  {
    category: "Housing",
    budgeted: 1800,
    actual: 1750,
    budgetedPct: 100,
    actualPct: 97,
  },
  {
    category: "Groceries",
    budgeted: 850,
    actual: 920,
    budgetedPct: 100,
    actualPct: 108,
  },
  {
    category: "Transport",
    budgeted: 500,
    actual: 465,
    budgetedPct: 100,
    actualPct: 93,
  },
  {
    category: "Utilities",
    budgeted: 400,
    actual: 360,
    budgetedPct: 100,
    actualPct: 90,
  },
  {
    category: "Entertainment",
    budgeted: 300,
    actual: 385,
    budgetedPct: 100,
    actualPct: 128,
  },
];

export function BudgetAnalytics() {
  return (
    <section className="py-20 sm:py-24 bg-white relative overflow-hidden" id="analytics">
      <div className="container mx-auto px-4 md:px-6">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-50 border border-emerald-200/80 text-emerald-800 text-xs font-semibold uppercase tracking-wider mb-4 shadow-xs">
            <Sparkles className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0" />
            <span>DATA-BACKED INTELLIGENCE</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-[40px] font-extrabold tracking-tight text-slate-900 leading-tight mb-4">
            Turn Monthly Spending Into Useful Insights
          </h2>

          <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-2xl mx-auto">
            Understand how your actual spending compares with your planned budget. Review category-wise totals, identify recurring spending patterns, and use your monthly financial information to improve future budgeting decisions.
          </p>
        </div>

        {/* 3 Feature Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 max-w-6xl mx-auto mb-14">
          {analyticsCards.map((card, idx) => {
            const Icon = card.icon;
            return (
              <div
                key={idx}
                className="rounded-3xl border border-slate-200/90 bg-white p-7 shadow-xs hover:shadow-md transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div
                    className={`w-12 h-12 rounded-2xl border flex items-center justify-center mb-5 ${card.color}`}
                  >
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 mb-2">
                    {card.title}
                  </h3>
                  <p className="text-sm text-slate-600 leading-relaxed">
                    {card.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Representative Visual Comparison Chart */}
        <div className="max-w-4xl mx-auto rounded-3xl border border-slate-200 bg-slate-50/60 p-4 sm:p-6 md:p-8 shadow-xs">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-5 mb-6 border-b border-slate-200/80 gap-3">
            <div>
              <h3 className="text-base sm:text-lg font-bold text-slate-900">
                Budget vs. Actual Spending Comparison
              </h3>
              <p className="text-xs text-slate-500">
                Visual category distribution for October 2026
              </p>
            </div>

            {/* Legend */}
            <div className="flex items-center gap-4 text-xs font-semibold self-start sm:self-auto">
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded bg-slate-300" />
                <span className="text-slate-600">Budgeted Limit</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded bg-emerald-600" />
                <span className="text-slate-900">Actual Spent</span>
              </div>
            </div>
          </div>

          {/* Bar Chart Representation */}
          <div className="space-y-4">
            {categoryComparisons.map((item) => {
              const isOver = item.actual > item.budgeted;
              return (
                <div key={item.category} className="space-y-1.5">
                  <div className="flex flex-wrap items-center justify-between gap-1 text-xs">
                    <span className="font-bold text-slate-800">{item.category}</span>
                    <div className="flex items-center gap-2.5">
                      <span className="text-slate-400">
                        Budget: ${item.budgeted.toLocaleString()}
                      </span>
                      <span
                        className={`font-semibold ${
                          isOver ? "text-rose-600" : "text-emerald-700"
                        }`}
                      >
                        Spent: ${item.actual.toLocaleString()}
                      </span>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {/* Budgeted bar */}
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] text-slate-400 w-12 font-medium">
                        Budget
                      </span>
                      <div className="flex-1 bg-slate-200 h-2.5 rounded-full overflow-hidden">
                        <div className="bg-slate-400 h-2.5 rounded-full w-full" />
                      </div>
                    </div>

                    {/* Actual bar */}
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] text-slate-400 w-12 font-medium">
                        Actual
                      </span>
                      <div className="flex-1 bg-slate-200 h-2.5 rounded-full overflow-hidden">
                        <div
                          className={`h-2.5 rounded-full ${
                            isOver ? "bg-rose-500" : "bg-emerald-600"
                          }`}
                          style={{
                            width: `${Math.min(100, (item.actual / item.budgeted) * 100)}%`,
                          }}
                        />
                      </div>
                      <span
                        className={`text-[10px] font-bold w-10 text-right ${
                          isOver ? "text-rose-600" : "text-emerald-700"
                        }`}
                      >
                        {Math.round((item.actual / item.budgeted) * 100)}%
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="mt-6 pt-4 border-t border-slate-200/80 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-2">
            <span>Consistent color coding: Red highlights categories where actual exceeds budget.</span>
            {/* <span className="font-medium text-emerald-700">Illustrative sample view</span> */}
          </div>
        </div>
      </div>
    </section>
  );
}
