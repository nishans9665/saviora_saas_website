"use client";

import React, { useState } from "react";
import {
  Sparkles,
  Car,
  ChevronDown,
  ChevronUp,
  Receipt,
  Fuel,
  Wrench,
  Clock,
  ArrowUpRight,
  ShieldCheck,
  CheckCircle2,
} from "lucide-react";

interface AssignedTransaction {
  id: string;
  description: string;
  date: string;
  amount: number;
  type: string;
  note?: string;
}

const initialTransactions: AssignedTransaction[] = [
  {
    id: "tx-1",
    description: "Shell Fuel Station",
    date: "Oct 15, 2026",
    amount: -45.0,
    type: "Fuel & Gas",
    note: "Highway commute tank refill",
  },
  {
    id: "tx-2",
    description: "Monthly City Parking Permit",
    date: "Oct 12, 2026",
    amount: -150.0,
    type: "Parking",
    note: "Downtown parking pass",
  },
  {
    id: "tx-3",
    description: "Vehicle Service & Synthetic Oil Change",
    date: "Oct 08, 2026",
    amount: -180.0,
    type: "Maintenance",
    note: "Routine scheduled service",
  },
  {
    id: "tx-4",
    description: "Express Tollway Passes",
    date: "Oct 04, 2026",
    amount: -90.0,
    type: "Tolls",
    note: "Electronic toll auto-replenish",
  },
];

export function BudgetAssignedExpenses() {
  const [isExpanded, setIsExpanded] = useState(true);

  return (
    <section className="py-20 sm:py-24 bg-white relative" id="assigned-expenses">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 items-center">
          {/* Left Column: Realistic Expanded Budget Card (Matching Screenshot 3 Car card) */}
          <div className="lg:col-span-6 w-full order-2 lg:order-1">
            <div className="relative mx-auto max-w-xl">
              <div className="rounded-3xl border border-slate-200/90 bg-white p-4 sm:p-7 shadow-lg shadow-slate-900/5 text-left">
                {/* Header */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 mb-4 border-b border-slate-100">
                  <div className="flex items-center gap-3">
                    <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl bg-amber-50 text-amber-700 border border-amber-200/80 flex items-center justify-center flex-shrink-0">
                      <Car className="w-5 h-5 sm:w-6 sm:h-6" />
                    </div>
                    <div className="min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <h3 className="text-base sm:text-lg font-bold text-slate-900 leading-tight">Car</h3>
                        <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-100 text-amber-800 border border-amber-200">
                          WARNING
                        </span>
                      </div>
                      <span className="text-xs text-slate-400">Category: Transportation</span>
                    </div>
                  </div>

                  <div className="self-start sm:self-auto">
                    <span className="inline-flex items-center text-xs font-semibold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
                      Strict Limit Active
                    </span>
                  </div>
                </div>

                {/* Numbers */}
                <div className="flex items-baseline justify-between mb-2">
                  <div>
                    <span className="text-2xl font-extrabold text-slate-900">$465.00</span>
                    <span className="text-xs text-slate-400 ml-1.5">spent of $500.00</span>
                  </div>
                  <span className="text-xs font-bold text-amber-700">93.0% Used</span>
                </div>

                {/* Progress bar */}
                <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden mb-4">
                  <div className="bg-[#ea580c] h-2.5 rounded-full w-[93%]" />
                </div>

                {/* Remaining summary pill */}
                <div className="flex items-center justify-between text-xs py-2 px-3 rounded-xl bg-slate-50 border border-slate-100 mb-5">
                  <span className="text-slate-500 font-medium">Remaining Category Balance:</span>
                  <span className="text-emerald-700 font-bold">$35.00 available</span>
                </div>

                {/* Assigned Expenses Header matching Screenshot 3 */}
                <div className="border-t border-slate-100 pt-4">
                  <button
                    type="button"
                    onClick={() => setIsExpanded(!isExpanded)}
                    className="w-full flex items-center justify-between py-1 text-xs font-bold text-slate-800 hover:text-emerald-700 transition-colors cursor-pointer"
                  >
                    <div className="flex items-center gap-2">
                      <Receipt className="w-4 h-4 text-emerald-600" />
                      <span>Assigned Expenses ({initialTransactions.length})</span>
                    </div>
                    {isExpanded ? (
                      <ChevronUp className="w-4 h-4 text-slate-400" />
                    ) : (
                      <ChevronDown className="w-4 h-4 text-slate-400" />
                    )}
                  </button>

                  {/* Transaction items */}
                  {isExpanded && (
                    <div className="mt-3 space-y-2 animate-in fade-in duration-200">
                      {initialTransactions.map((tx) => (
                        <div
                          key={tx.id}
                          className="flex items-center justify-between p-2.5 rounded-xl border border-slate-100 bg-slate-50/70 hover:bg-slate-50 transition-colors"
                        >
                          <div className="flex items-center gap-2.5 min-w-0">
                            <div className="w-8 h-8 rounded-lg bg-white border border-slate-200 flex items-center justify-center text-slate-500 flex-shrink-0">
                              <Receipt className="w-4 h-4" />
                            </div>
                            <div className="truncate">
                              <p className="text-xs font-bold text-slate-900 truncate">
                                {tx.description}
                              </p>
                              <div className="flex items-center gap-2 text-[10px] text-slate-400">
                                <span>{tx.date}</span>
                                <span>•</span>
                                <span>{tx.type}</span>
                              </div>
                            </div>
                          </div>

                          <div className="text-right flex-shrink-0 ml-3">
                            <span className="text-xs font-bold text-rose-600">
                              -${Math.abs(tx.amount).toFixed(2)}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                <div className="mt-4 pt-3 border-t border-slate-100 text-center text-[10px] text-slate-400">
                  Illustrative assigned expense breakdown based on Saviora Budget Management
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Explanatory Content */}
          <div className="lg:col-span-6 text-left flex flex-col items-start order-1 lg:order-2">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-50 border border-emerald-200/80 text-emerald-800 text-xs font-semibold uppercase tracking-wider mb-4 shadow-xs">
              <Sparkles className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0" />
              <span>TRANSACTION TRANSPARENCY</span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-[40px] font-extrabold tracking-tight text-slate-900 leading-tight mb-4">
              Understand Every Expense Within Your Budget
            </h2>

            <p className="text-base sm:text-lg text-slate-600 leading-relaxed mb-5">
              See which transactions contribute to each category&apos;s budget. Review individual expense amounts and dates to understand how daily purchases affect your monthly spending limit.
            </p>

            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 text-sm text-slate-600 leading-relaxed mb-6 space-y-3">
              <p>
                Category-level expense tracking helps you quickly identify unnecessary spending and make thoughtful adjustments before the month ends. Instead of guessing why a balance is running low, you can examine every purchase assigned to that specific budget.
              </p>
              <div className="flex items-center gap-2 text-xs font-semibold text-emerald-700">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                <span>Assign transactions directly or categorize recorded expenses seamlessly</span>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full">
              <div className="p-4 rounded-xl border border-slate-200 bg-white shadow-2xs">
                <span className="text-xs font-bold text-slate-900 block mb-1">
                  Accurate Attribution
                </span>
                <p className="text-xs text-slate-500">
                  Each purchase links to its corresponding category so balances update in real-time.
                </p>
              </div>

              <div className="p-4 rounded-xl border border-slate-200 bg-white shadow-2xs">
                <span className="text-xs font-bold text-slate-900 block mb-1">
                  No Surprises
                </span>
                <p className="text-xs text-slate-500">
                  Spot recurring micro-expenses that gradually drain your budget limit.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
