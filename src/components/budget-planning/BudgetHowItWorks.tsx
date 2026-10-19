"use client";

import React from "react";
import {
  Sparkles,
  Layers,
  Sliders,
  Receipt,
  CheckCheck,
} from "lucide-react";

const steps = [
  {
    step: "01",
    title: "Choose Your Categories",
    description: "Select the expense categories you want to manage.",
    icon: Layers,
  },
  {
    step: "02",
    title: "Set Your Budget Limits",
    description: "Enter the amount you want to allocate to each category.",
    icon: Sliders,
  },
  {
    step: "03",
    title: "Track Your Expenses",
    description: "Record expenses and monitor how much of each budget has been used.",
    icon: Receipt,
  },
  {
    step: "04",
    title: "Review and Adjust",
    description: "Review your progress, identify overspending, and plan your next month more effectively.",
    icon: CheckCheck,
  },
];

export function BudgetHowItWorks() {
  return (
    <section className="py-20 sm:py-24 bg-slate-50/60 relative" id="how-it-works">
      <div className="container mx-auto px-4 md:px-6">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-50 border border-emerald-200/80 text-emerald-800 text-xs font-semibold uppercase tracking-wider mb-4 shadow-xs">
            <Sparkles className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0" />
            <span>SIMPLE FOUR-STEP PROCESS</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-[40px] font-extrabold tracking-tight text-slate-900 leading-tight mb-4">
            Start Planning Your Monthly Budget in Four Simple Steps
          </h2>

          <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-2xl mx-auto">
            Setting up your financial structure takes only a few minutes. Follow these sequential steps to establish complete control over your monthly spending.
          </p>
        </div>

        {/* 4-Step Horizontal Process (Desktop) / Vertical Timeline (Mobile) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto relative">
          {steps.map((st, idx) => {
            const Icon = st.icon;
            return (
              <div
                key={idx}
                className="bg-white rounded-3xl border border-slate-200/90 p-6 sm:p-7 shadow-xs hover:shadow-md transition-shadow relative flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-5">
                    <span className="text-2xl sm:text-3xl font-extrabold text-emerald-700/30">
                      {st.step}
                    </span>
                    <div className="w-11 h-11 rounded-2xl bg-emerald-50 text-emerald-700 border border-emerald-200 flex items-center justify-center">
                      <Icon className="w-5 h-5" />
                    </div>
                  </div>

                  <h3 className="text-lg font-bold text-slate-900 mb-2">
                    {st.title}
                  </h3>

                  <p className="text-sm text-slate-600 leading-relaxed">
                    {st.description}
                  </p>
                </div>

                <div className="mt-6 pt-3 border-t border-slate-100 flex items-center gap-2 text-xs font-semibold text-emerald-700">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-600" />
                  <span>Step {idx + 1}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
