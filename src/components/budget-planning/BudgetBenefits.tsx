"use client";

import React from "react";
import {
  Sparkles,
  Eye,
  SlidersHorizontal,
  AlertOctagon,
  ShieldCheck,
  BrainCircuit,
  Smartphone,
} from "lucide-react";

const benefits = [
  {
    title: "Greater Visibility Into Monthly Expenses",
    description:
      "See all your monthly spending allocations gathered in one coherent dashboard without mental calculations.",
    icon: Eye,
  },
  {
    title: "Clear Category-Based Spending Limits",
    description:
      "Establish unambiguous spending targets tailored for each distinct area of your personal lifestyle.",
    icon: SlidersHorizontal,
  },
  {
    title: "Easier Identification of Overspending",
    description:
      "Spot developing spending spikes early with intuitive color-coded progress indicators and status filters.",
    icon: AlertOctagon,
  },
  {
    title: "Better Control Over Expense Creation",
    description:
      "Deploy Strict Limit rules to prevent qualifying new expenses when a budget threshold is exhausted.",
    icon: ShieldCheck,
  },
  {
    title: "More Informed Financial Decisions",
    description:
      "Ground your monthly spending choices in concrete data, remaining balances, and realistic targets.",
    icon: BrainCircuit,
  },
  {
    title: "Consistent Experience Across Supported Devices",
    description:
      "Review your budgets, check remaining funds, and manage spending smoothly across desktop, tablet, and mobile browsers.",
    icon: Smartphone,
  },
];

export function BudgetBenefits() {
  return (
    <section className="py-20 sm:py-24 bg-white relative" id="benefits">
      <div className="container mx-auto px-4 md:px-6">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-50 border border-emerald-200/80 text-emerald-800 text-xs font-semibold uppercase tracking-wider mb-4 shadow-xs">
            <Sparkles className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0" />
            <span>MEASURABLE ADVANTAGES</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-[40px] font-extrabold tracking-tight text-slate-900 leading-tight mb-4">
            Build Better Money Habits With Smarter Budgeting
          </h2>

          <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-2xl mx-auto">
            Saviora equips you with the tools needed to manage monthly financial obligations clearly, helping you build sustainable money management habits.
          </p>
        </div>

        {/* 6 Visually Balanced Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 max-w-6xl mx-auto">
          {benefits.map((benefit, idx) => {
            const Icon = benefit.icon;
            return (
              <div
                key={idx}
                className="bg-white rounded-3xl border border-slate-200/90 p-7 shadow-xs hover:shadow-md hover:border-emerald-300 transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-700 border border-emerald-200/80 flex items-center justify-center mb-5">
                    <Icon className="w-6 h-6" />
                  </div>

                  <h3 className="text-lg font-bold text-slate-900 mb-2 leading-snug">
                    {benefit.title}
                  </h3>

                  <p className="text-sm text-slate-600 leading-relaxed">
                    {benefit.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
