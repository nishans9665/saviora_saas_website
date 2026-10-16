"use client";

import React, { useState } from "react";
import { 
  Sparkles, 
  CheckCircle2, 
  TrendingDown, 
  ShoppingBag, 
  Home, 
  Car, 
  Zap, 
  Coffee, 
  ChevronRight 
} from "lucide-react";

const categoryBreakdowns = [
  {
    name: "Food & Groceries",
    amount: "$1,392.00",
    percent: 32,
    color: "bg-[#ea580c]",
    textColor: "text-[#ea580c]",
    icon: Coffee,
  },
  {
    name: "Housing & Rent",
    amount: "$1,218.00",
    percent: 28,
    color: "bg-sky-500",
    textColor: "text-sky-600",
    icon: Home,
  },
  {
    name: "Transportation",
    amount: "$652.50",
    percent: 15,
    color: "bg-amber-500",
    textColor: "text-amber-600",
    icon: Car,
  },
  {
    name: "Utilities & Bills",
    amount: "$565.50",
    percent: 13,
    color: "bg-purple-500",
    textColor: "text-purple-600",
    icon: Zap,
  },
  {
    name: "Shopping & Other",
    amount: "$522.00",
    percent: 12,
    color: "bg-rose-500",
    textColor: "text-rose-600",
    icon: ShoppingBag,
  },
];

const insightsBenefits = [
  "Keep expense records organized in one place.",
  "Understand spending across available categories.",
  "Review transactions to identify spending patterns.",
  "Use expense information to support budgeting decisions.",
];

export function ExpenseSpendingInsights() {
  const [activeView, setActiveView] = useState<"categories" | "trends">("categories");

  return (
    <section className="py-20 sm:py-24 bg-white relative overflow-hidden">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column: Explanatory Content & Benefits */}
          <div className="lg:col-span-6 text-left flex flex-col items-start">
            
            {/* Eyebrow Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#ea580c]/10 border border-[#ea580c]/25 text-[#ea580c] text-xs font-semibold uppercase tracking-wider mb-6 shadow-xs">
              <Sparkles className="w-3.5 h-3.5 text-[#ea580c] flex-shrink-0" />
              <span>A CLEARER FINANCIAL PICTURE</span>
            </div>

            {/* H2 Headline */}
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 leading-tight mb-4">
              Get a Clearer Picture of Your Spending
            </h2>

            {/* Description */}
            <p className="text-base sm:text-lg text-slate-600 leading-relaxed mb-8">
              Managing expenses starts with knowing where your money goes. Saviora helps you keep your spending organized, review your transactions, and use that information when planning your budget and savings goals.
            </p>

            {/* Benefits List */}
            <div className="space-y-4 w-full mb-8">
              {insightsBenefits.map((benefit, index) => (
                <div key={index} className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-[#ea580c]/15 border border-[#ea580c]/30 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#ea580c]" />
                  </div>
                  <span className="text-sm sm:text-base font-medium text-slate-700 leading-snug">
                    {benefit}
                  </span>
                </div>
              ))}
            </div>

          </div>

          {/* Right Column: Spending Summary & Category Visual Breakdown */}
          <div className="lg:col-span-6 w-full">
            <div className="relative mx-auto max-w-lg lg:max-w-none">
              
              {/* Subtle ambient light aura */}
              <div className="absolute -inset-1.5 bg-gradient-to-r from-amber-500/10 via-[#ea580c]/15 to-orange-400/10 rounded-3xl blur-lg pointer-events-none" />

              {/* Card Container */}
              <div className="relative rounded-2xl sm:rounded-3xl border border-slate-200/90 bg-white shadow-xl shadow-slate-900/5 p-5 sm:p-7 text-left">
                
                {/* Header with Switcher Tabs */}
                <div className="flex items-center justify-between pb-4 mb-4 border-b border-slate-100">
                  <div>
                    <h3 className="text-base sm:text-lg font-bold text-slate-900 leading-tight">
                      Monthly Spending Summary
                    </h3>
                    <p className="text-xs text-slate-400">October 2026 Breakdown</p>
                  </div>

                  <div className="flex items-center bg-slate-100 p-1 rounded-xl text-xs font-semibold">
                    <button
                      type="button"
                      onClick={() => setActiveView("categories")}
                      className={`px-3 py-1 rounded-lg transition-all cursor-pointer ${
                        activeView === "categories"
                          ? "bg-white text-slate-900 shadow-2xs"
                          : "text-slate-500 hover:text-slate-800"
                      }`}
                    >
                      Categories
                    </button>
                    <button
                      type="button"
                      onClick={() => setActiveView("trends")}
                      className={`px-3 py-1 rounded-lg transition-all cursor-pointer ${
                        activeView === "trends"
                          ? "bg-white text-slate-900 shadow-2xs"
                          : "text-slate-500 hover:text-slate-800"
                      }`}
                    >
                      Comparison
                    </button>
                  </div>
                </div>

                {/* Total Spending Stat */}
                <div className="bg-slate-50/80 rounded-2xl p-4 border border-slate-100 mb-5 flex items-center justify-between">
                  <div>
                    <div className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-0.5">
                      Total Monthly Spending
                    </div>
                    <div className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                      $4,350.00
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                      <TrendingDown className="w-3.5 h-3.5 text-emerald-600" />
                      <span>-5% vs Sept</span>
                    </span>
                    <div className="text-[11px] text-slate-400 mt-1">Within planned limits</div>
                  </div>
                </div>

                {activeView === "categories" ? (
                  /* Category List with Progress Bars */
                  <div className="space-y-3.5">
                    {categoryBreakdowns.map((cat, idx) => {
                      const Icon = cat.icon;
                      return (
                        <div key={idx} className="group">
                          <div className="flex items-center justify-between text-xs mb-1.5">
                            <div className="flex items-center gap-2">
                              <div className="w-6 h-6 rounded-md bg-slate-100 flex items-center justify-center text-slate-600 group-hover:scale-105 transition-transform">
                                <Icon className="w-3.5 h-3.5" />
                              </div>
                              <span className="font-bold text-slate-800">{cat.name}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <span className="font-extrabold text-slate-900">{cat.amount}</span>
                              <span className="text-[11px] font-semibold text-slate-400 w-8 text-right">
                                {cat.percent}%
                              </span>
                            </div>
                          </div>
                          
                          {/* Animated Progress Track */}
                          <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                            <div
                              className={`h-full rounded-full transition-all duration-700 ${cat.color}`}
                              style={{ width: `${cat.percent}%` }}
                            />
                          </div>
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  /* Comparison View */
                  <div className="space-y-4 animate-in fade-in">
                    <div className="p-4 rounded-xl border border-slate-100 bg-slate-50/50 flex items-center justify-between">
                      <div>
                        <div className="text-xs font-bold text-slate-700">Essential Expenses</div>
                        <div className="text-[11px] text-slate-400">Housing, Utilities, Groceries</div>
                      </div>
                      <div className="text-right">
                        <div className="text-sm font-extrabold text-slate-900">$3,176.00</div>
                        <div className="text-[10px] text-slate-500 font-semibold">73% of total</div>
                      </div>
                    </div>

                    <div className="p-4 rounded-xl border border-slate-100 bg-slate-50/50 flex items-center justify-between">
                      <div>
                        <div className="text-xs font-bold text-slate-700">Discretionary Expenses</div>
                        <div className="text-[11px] text-slate-400">Entertainment, Dining out, Shopping</div>
                      </div>
                      <div className="text-right">
                        <div className="text-sm font-extrabold text-slate-900">$1,174.00</div>
                        <div className="text-[10px] text-slate-500 font-semibold">27% of total</div>
                      </div>
                    </div>

                    <div className="p-4 rounded-xl border border-emerald-100 bg-emerald-50/40 flex items-center justify-between">
                      <div>
                        <div className="text-xs font-bold text-emerald-900">Recurring Subscriptions</div>
                        <div className="text-[11px] text-emerald-700">Fixed monthly cost</div>
                      </div>
                      <div className="text-right">
                        <div className="text-sm font-extrabold text-emerald-800">$248.50</div>
                        <div className="text-[10px] text-emerald-600 font-semibold">6 active services</div>
                      </div>
                    </div>
                  </div>
                )}

                <div className="mt-5 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-400">
                  <span>Updated automatically as you record expenses</span>
                  <span className="font-semibold text-[#ea580c] hover:text-[#c2410c] hover:underline cursor-pointer flex items-center gap-0.5">
                    View reports <ChevronRight className="w-3.5 h-3.5" />
                  </span>
                </div>

              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
