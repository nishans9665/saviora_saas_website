"use client";

import React from "react";
import { Target, Layers, BellRing, Sparkles } from "lucide-react";

const introCards = [
  {
    title: "Plan With Purpose",
    description:
      "Allocate spending limits based on your monthly income, priorities, and financial goals.",
    icon: Target,
    color: "bg-emerald-50 text-emerald-700 border-emerald-200/80",
    badge: "Strategic Allocation",
  },
  {
    title: "Track Every Category",
    description:
      "Understand how much you spend on groceries, transportation, bills, and other expenses.",
    icon: Layers,
    color: "bg-teal-50 text-teal-700 border-teal-200/80",
    badge: "Granular Visibility",
  },
  {
    title: "Stay Financially Aware",
    description:
      "Identify approaching limits and overspending before they become recurring habits.",
    icon: BellRing,
    color: "bg-amber-50 text-amber-700 border-amber-200/80",
    badge: "Proactive Alerts",
  },
];

export function BudgetIntro() {
  return (
    <section className="py-20 sm:py-24 bg-white relative" id="budget-intro">
      <div className="container mx-auto px-4 md:px-6">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-50 border border-emerald-200/80 text-emerald-800 text-xs font-semibold uppercase tracking-wider mb-4 shadow-xs">
            <Sparkles className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0" />
            <span>CONFIDENT FINANCIAL MANAGEMENT</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-[40px] font-extrabold tracking-tight text-slate-900 leading-tight mb-5">
            Plan Your Monthly Budget With Confidence
          </h2>

          <div className="space-y-4 text-base sm:text-lg text-slate-600 leading-relaxed max-w-2xl mx-auto">
            <p>
              Managing your money becomes easier when you know how much you can spend and where your money is going. Saviora helps you organize your monthly finances by creating individual budgets for the categories that matter most to you.
            </p>
            <p className="text-slate-500 text-sm sm:text-base">
              Set spending limits, monitor your expenses, and review your progress from one simple dashboard. Whether you&apos;re managing everyday purchases or planning for larger monthly expenses, Saviora helps you make informed financial decisions.
            </p>
          </div>
        </div>

        {/* 3 Benefit Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 max-w-6xl mx-auto">
          {introCards.map((card, idx) => {
            const Icon = card.icon;
            return (
              <div
                key={idx}
                className="group rounded-2xl sm:rounded-3xl border border-slate-200/90 bg-white p-7 sm:p-8 shadow-xs hover:shadow-lg hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <div
                      className={`w-13 h-13 rounded-2xl flex items-center justify-center border transition-transform duration-300 group-hover:scale-105 ${card.color}`}
                    >
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider bg-slate-50 px-2.5 py-1 rounded-full border border-slate-100">
                      {card.badge}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-emerald-700 transition-colors">
                    {card.title}
                  </h3>

                  <p className="text-slate-600 leading-relaxed text-sm sm:text-base">
                    {card.description}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-100 flex items-center gap-2 text-xs font-semibold text-emerald-700">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-600" />
                  <span>Integrated in Saviora Budgeting</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
