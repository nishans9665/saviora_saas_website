"use client";

import React from "react";
import {
  Sparkles,
  Target,
  Calendar,
  History,
  TrendingUp,
  ShieldCheck,
  Layers,
  PlusCircle,
} from "lucide-react";

const contributions = [
  { amount: "+$861.00", date: "Oct 20" },
  { amount: "+$834.00", date: "Oct 20" },
  { amount: "+$864.00", date: "Oct 20" },
];

const benefitPoints = [
  {
    title: "Keep a Record of Contributions",
    description: "Review the full chronological savings history and every recorded entry for each goal.",
    icon: History,
    iconColor: "bg-purple-100 text-purple-600 border-purple-200/60",
  },
  {
    title: "See Your Progress",
    description: "Understand your current saved amount, remaining balance, and completion percentage in real time.",
    icon: TrendingUp,
    iconColor: "bg-blue-100 text-blue-600 border-blue-200/60",
  },
  {
    title: "Stay Focused on Your Goal",
    description: "Use visible progress and monthly benchmarks to review your savings plan and stay motivated.",
    icon: ShieldCheck,
    iconColor: "bg-emerald-100 text-[#16a34a] border-emerald-200/60",
  },
  {
    title: "Manage Multiple Goals",
    description: "Organize different financial goals separately—from emergency reserves to milestone purchases.",
    icon: Layers,
    iconColor: "bg-amber-100 text-amber-600 border-amber-200/60",
  },
];

export function SavingsProgressTracking() {
  return (
    <section className="py-20 sm:py-24 bg-white relative overflow-hidden" id="progress-tracking">
      <div className="container mx-auto px-4 md:px-6">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-purple-100/80 border border-purple-200/80 text-purple-700 text-xs font-semibold uppercase tracking-wider mb-4 shadow-xs">
            <Sparkles className="w-3.5 h-3.5 text-purple-600 flex-shrink-0" />
            <span>TRACK PROGRESS</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 mb-4">
            Every Contribution Brings You Closer to Your Goal
          </h2>

          <p className="text-base sm:text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
            Keep a record of your savings contributions and review your progress as you work toward each financial goal.
          </p>
        </div>

        {/* 2-Column Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 items-center">
          {/* Left Column: Authentic Goal Details Card (Matches Screenshot 3) */}
          <div className="lg:col-span-6 w-full">
            <div className="relative mx-auto max-w-md sm:max-w-lg lg:max-w-none">
              {/* Soft Aura */}
              <div className="absolute -inset-1.5 bg-gradient-to-tr from-purple-500/10 via-indigo-500/10 to-emerald-500/10 rounded-3xl blur-lg pointer-events-none" />

              {/* Product Preview Card */}
              <div className="relative bg-white rounded-2xl sm:rounded-3xl border border-slate-200/90 p-5 sm:p-7 shadow-xl shadow-slate-900/5">
                {/* Header row */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-purple-100/80 text-purple-700 flex items-center justify-center flex-shrink-0">
                      <Target className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="flex items-center gap-1.5">
                        <h3 className="text-base sm:text-lg font-bold text-slate-900">
                          Car buy
                        </h3>
                        <span className="text-purple-600 text-xs font-bold">↗</span>
                      </div>
                      <div className="flex items-center gap-1.5 mt-0.5">
                        <span className="text-[10px] sm:text-xs bg-slate-100 text-slate-600 px-2 py-0.5 rounded font-medium">
                          Car Purchase
                        </span>
                        <span className="text-[10px] sm:text-xs bg-amber-50 text-amber-700 border border-amber-200/60 px-1.5 py-0.5 rounded font-semibold uppercase">
                          MEDIUM
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-lg bg-slate-50 text-purple-600 flex items-center justify-center font-bold text-xs">
                      $
                    </div>
                    <div className="w-7 h-7 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center text-xs">
                      <History className="w-3.5 h-3.5" />
                    </div>
                  </div>
                </div>

                {/* Amount and percentage */}
                <div className="mb-4">
                  <div className="flex items-baseline justify-between text-sm sm:text-base mb-1.5">
                    <span className="font-extrabold text-slate-900">
                      $389,874.91{" "}
                      <span className="font-normal text-slate-400 text-xs sm:text-sm">
                        / $1,000,000.00
                      </span>
                    </span>
                    <span className="font-extrabold text-purple-600 text-sm sm:text-base">
                      39.0%
                    </span>
                  </div>

                  {/* Progress Bar */}
                  <div className="w-full bg-slate-100 rounded-full h-2.5 overflow-hidden">
                    <div
                      className="bg-gradient-to-r from-purple-600 to-indigo-600 h-2.5 rounded-full transition-all duration-1000"
                      style={{ width: "39%" }}
                    />
                  </div>

                  <div className="flex items-center justify-between text-xs text-slate-500 mt-2.5">
                    <span className="flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5 text-slate-400" />
                      4/6/2027
                    </span>
                    <span className="bg-indigo-50 text-indigo-700 font-semibold px-2.5 py-0.5 rounded-md text-xs border border-indigo-100">
                      Target: $10,000.00/mo
                    </span>
                  </div>
                </div>

                {/* Savings History Sub-panel */}
                <div className="pt-4 border-t border-slate-100">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-1.5 text-xs font-bold text-slate-800">
                      <History className="w-3.5 h-3.5 text-slate-400" />
                      <span>Savings History</span>
                    </div>
                    <span className="bg-indigo-50 text-indigo-700 hover:bg-indigo-100 font-semibold px-2.5 py-1 rounded-md text-xs transition-colors cursor-default">
                      + Transact
                    </span>
                  </div>

                  {/* History List */}
                  <div className="space-y-2">
                    {contributions.map((item, idx) => (
                      <div
                        key={idx}
                        className="flex items-center justify-between p-2.5 rounded-xl bg-slate-50/70 border border-slate-100 text-xs"
                      >
                        <div className="flex items-center gap-2">
                          <PlusCircle className="w-4 h-4 text-[#16a34a]" />
                          <span className="font-semibold text-slate-800">Added</span>
                        </div>
                        <div className="text-right">
                          <span className="font-bold text-[#16a34a] block">{item.amount}</span>
                          <span className="text-[10px] text-slate-400 block">{item.date}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Clarification Caption */}
                <div className="mt-4 pt-3 border-t border-slate-100 text-[11px] text-slate-400 text-center">
                  Product demonstration: tracking tool for milestone progress, not a banking transfer interface
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: 4 Benefits */}
          <div className="lg:col-span-6 space-y-6">
            {benefitPoints.map((benefit, index) => {
              const Icon = benefit.icon;
              return (
                <div
                  key={index}
                  className="p-5 sm:p-6 rounded-2xl border border-slate-100 hover:border-slate-200/80 bg-slate-50/40 hover:bg-slate-50/80 transition-all duration-300 flex items-start gap-4 group"
                >
                  <div
                    className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 border transition-transform duration-300 group-hover:scale-105 ${benefit.iconColor}`}
                  >
                    <Icon className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-base sm:text-lg font-bold text-slate-900 mb-1 leading-snug">
                      {benefit.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      {benefit.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
