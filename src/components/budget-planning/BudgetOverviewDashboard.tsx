"use client";

import React, { useState } from "react";
import {
  Sparkles,
  Wallet,
  Activity,
  TrendingUp,
  AlertTriangle,
  ShoppingBag,
  Car,
  Home,
  Film,
  ShieldAlert,
  Calendar,
  Filter,
} from "lucide-react";

interface CategoryBudget {
  id: string;
  name: string;
  group: string;
  spent: number;
  limit: number;
  status: "Safe" | "Warning" | "Overspent";
  strictLimit: boolean;
  icon: React.ElementType;
}

const budgetItems: CategoryBudget[] = [
  {
    id: "groceries",
    name: "Groceries",
    group: "Food & Household",
    spent: 680.0,
    limit: 900.0,
    status: "Safe",
    strictLimit: false,
    icon: ShoppingBag,
  },
  {
    id: "transportation",
    name: "Transportation",
    group: "Car & Transit",
    spent: 465.0,
    limit: 500.0,
    status: "Warning",
    strictLimit: true,
    icon: Car,
  },
  {
    id: "housing",
    name: "Housing",
    group: "Rent & Utilities",
    spent: 1400.0,
    limit: 1500.0,
    status: "Safe",
    strictLimit: true,
    icon: Home,
  },
  {
    id: "entertainment",
    name: "Entertainment",
    group: "Dining & Events",
    spent: 385.0,
    limit: 300.0,
    status: "Overspent",
    strictLimit: false,
    icon: Film,
  },
];

export function BudgetOverviewDashboard() {
  const [filter, setFilter] = useState<"All" | "Safe" | "Warning" | "Overspent">("All");

  const filteredItems = budgetItems.filter((item) => {
    if (filter === "All") return true;
    return item.status === filter;
  });

  return (
    <section className="py-20 sm:py-24 bg-white relative" id="budget-overview">
      <div className="container mx-auto px-4 md:px-6">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-50 border border-emerald-200/80 text-emerald-800 text-xs font-semibold uppercase tracking-wider mb-4 shadow-xs">
            <Sparkles className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0" />
            <span>CENTRALIZED FINANCIAL VISIBILITY</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-[40px] font-extrabold tracking-tight text-slate-900 leading-tight mb-4">
            See Your Complete Budget at a Glance
          </h2>

          <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-2xl mx-auto">
            Get a clear overview of your monthly spending without manually calculating every category. Saviora brings your budget limits, expenses, and remaining balances together in one organized view.
          </p>
        </div>

        {/* 4 Visual Statistic Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-10 max-w-6xl mx-auto">
          {/* Card 1: Total Monthly Budget */}
          <div className="rounded-2xl border border-slate-200/90 bg-white p-6 shadow-xs hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                Total Monthly Budget
              </span>
              <div className="w-9 h-9 rounded-xl bg-slate-100 flex items-center justify-center text-slate-700">
                <Wallet className="w-4 h-4" />
              </div>
            </div>
            <div className="text-2xl sm:text-3xl font-extrabold text-slate-900 mb-1">
              $3,200.00
            </div>
            <div className="text-xs font-medium text-emerald-700 flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-emerald-500" />
              <span>4 Assigned Categories</span>
            </div>
          </div>

          {/* Card 2: Total Spent */}
          <div className="rounded-2xl border border-slate-200/90 bg-white p-6 shadow-xs hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                Total Spent
              </span>
              <div className="w-9 h-9 rounded-xl bg-slate-100 flex items-center justify-center text-slate-700">
                <Activity className="w-4 h-4" />
              </div>
            </div>
            <div className="text-2xl sm:text-3xl font-extrabold text-slate-900 mb-1">
              $2,930.00
            </div>
            <div className="text-xs font-medium text-slate-500">
              <span>91.5% Overall Budget Used</span>
            </div>
          </div>

          {/* Card 3: Remaining Balance */}
          <div className="rounded-2xl border border-slate-200/90 bg-white p-6 shadow-xs hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                Remaining Balance
              </span>
              <div className="w-9 h-9 rounded-xl bg-emerald-50 flex items-center justify-center text-emerald-700">
                <TrendingUp className="w-4 h-4" />
              </div>
            </div>
            <div className="text-2xl sm:text-3xl font-extrabold text-emerald-700 mb-1">
              $270.00
            </div>
            <div className="text-xs font-medium text-slate-400">
              <span>Available for remainder of month</span>
            </div>
          </div>

          {/* Card 4: Overspent Categories */}
          <div className="rounded-2xl border border-rose-200/90 bg-rose-50/20 p-6 shadow-xs hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-semibold uppercase tracking-wider text-rose-700">
                Overspent Categories
              </span>
              <div className="w-9 h-9 rounded-xl bg-rose-100 flex items-center justify-center text-rose-600">
                <AlertTriangle className="w-4 h-4" />
              </div>
            </div>
            <div className="text-2xl sm:text-3xl font-extrabold text-rose-600 mb-1">
              1 Category
            </div>
            <div className="text-xs font-medium text-rose-600">
              <span>Requires attention &amp; adjustment</span>
            </div>
          </div>
        </div>

        {/* Category Budget Section with Filters */}
        <div className="max-w-6xl mx-auto rounded-3xl border border-slate-200 bg-slate-50/50 p-4 sm:p-6 md:p-8">
          {/* Header & Filter Tabs (Matching Screenshot 3) */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 pb-5 border-b border-slate-200/80">
            <div>
              <h3 className="text-lg sm:text-xl font-bold text-slate-900">
                Monthly Category Breakdown
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Monitor individual budget health and real-time utilization
              </p>
            </div>

            {/* Filter Buttons matching Screenshot 3: All, Safe, Warning, Overspent */}
            <div className="inline-flex items-center p-1 rounded-xl bg-white border border-slate-200 shadow-2xs self-start sm:self-auto overflow-x-auto max-w-full">
              {(["All", "Safe", "Warning", "Overspent"] as const).map((tab) => (
                <button
                  key={tab}
                  type="button"
                  onClick={() => setFilter(tab)}
                  className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all duration-200 cursor-pointer whitespace-nowrap ${
                    filter === tab
                      ? tab === "Overspent"
                        ? "bg-rose-500 text-white shadow-xs"
                        : tab === "Warning"
                        ? "bg-[#ea580c] text-white shadow-xs"
                        : tab === "Safe"
                        ? "bg-emerald-600 text-white shadow-xs"
                        : "bg-slate-900 text-white shadow-xs"
                      : "text-slate-600 hover:text-slate-900 hover:bg-slate-50"
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>

          {/* 4 Representative Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5">
            {filteredItems.map((item) => {
              const Icon = item.icon;
              const percentUsed = Math.min(100, Math.round((item.spent / item.limit) * 100));
              const rawPercent = ((item.spent / item.limit) * 100).toFixed(1);
              const remaining = item.limit - item.spent;

              const statusBadgeStyles = {
                Safe: "bg-emerald-100 text-emerald-800 border-emerald-200",
                Warning: "bg-amber-100 text-amber-800 border-amber-200",
                Overspent: "bg-rose-100 text-rose-800 border-rose-200",
              }[item.status];

              const progressColor = {
                Safe: "bg-emerald-600",
                Warning: "bg-[#ea580c]",
                Overspent: "bg-rose-500",
              }[item.status];

              const cardBorder = {
                Safe: "border-slate-200 hover:border-emerald-300",
                Warning: "border-amber-200/90 hover:border-amber-400",
                Overspent: "border-rose-200/90 hover:border-rose-400",
              }[item.status];

              return (
                <div
                  key={item.id}
                  className={`bg-white rounded-2xl border p-4 sm:p-6 shadow-xs transition-all duration-200 ${cardBorder}`}
                >
                  {/* Top row */}
                  <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2.5 mb-4">
                    <div className="flex items-center gap-3 min-w-0">
                      <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-slate-100 text-slate-700 flex items-center justify-center flex-shrink-0">
                        <Icon className="w-5 h-5" />
                      </div>
                      <div className="min-w-0">
                        <div className="flex items-center gap-2 flex-wrap">
                          <h4 className="text-base font-bold text-slate-900 leading-tight">
                            {item.name}
                          </h4>
                          <span
                            className={`px-2 py-0.5 rounded text-[10px] font-bold border ${statusBadgeStyles}`}
                          >
                            {item.status.toUpperCase()}
                          </span>
                        </div>
                        <span className="text-xs text-slate-400">{item.group}</span>
                      </div>
                    </div>

                    {item.strictLimit && (
                      <div className="self-start sm:self-auto">
                        <span className="inline-flex items-center gap-1 px-2 py-1 rounded-md text-[10px] font-semibold bg-emerald-50 text-emerald-800 border border-emerald-200">
                          <ShieldAlert className="w-3 h-3 text-emerald-600" />
                          <span>Strict Limit Active</span>
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Figures */}
                  <div className="flex items-baseline justify-between mb-2">
                    <div>
                      <span className="text-xl font-extrabold text-slate-900">
                        ${item.spent.toLocaleString("en-US", { minimumFractionDigits: 2 })}
                      </span>
                      <span className="text-xs text-slate-400 ml-1">
                        spent of ${item.limit.toLocaleString("en-US", { minimumFractionDigits: 2 })}
                      </span>
                    </div>
                    <span className="text-xs font-bold text-slate-700">
                      {rawPercent}% Used
                    </span>
                  </div>

                  {/* Progress bar */}
                  <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden mb-3">
                    <div
                      className={`h-2.5 rounded-full transition-all duration-500 ${progressColor}`}
                      style={{ width: `${percentUsed}%` }}
                    />
                  </div>

                  {/* Bottom row: remaining */}
                  <div className="flex items-center justify-between text-xs pt-2 border-t border-slate-100">
                    <span className="text-slate-500">Remaining Balance:</span>
                    <span
                      className={`font-bold ${
                        remaining < 0 ? "text-rose-600" : "text-emerald-700"
                      }`}
                    >
                      {remaining < 0 ? "-" : ""}
                      ${Math.abs(remaining).toLocaleString("en-US", {
                        minimumFractionDigits: 2,
                      })}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="mt-5 text-center text-xs text-slate-400">
            Previewing illustrative categories: Groceries (Safe), Transportation (Warning), Housing (Safe), Entertainment (Overspent).
          </div>
        </div>
      </div>
    </section>
  );
}
