"use client";

import React from "react";
import { Sparkles, CreditCard, Users, FolderKanban, BarChart3 } from "lucide-react";

const keyFeatures = [
  {
    title: "Record Income Easily",
    description:
      "Add income entries with the details you need, including amount, date, category, and notes.",
    icon: CreditCard,
    colorClasses: "bg-emerald-50 text-emerald-600 border-emerald-100",
  },
  {
    title: "Multiple Income Sources",
    description:
      "Track salary, freelance work, side income, investments, and any other earnings—all in one place.",
    icon: Users,
    colorClasses: "bg-sky-50 text-sky-600 border-sky-100",
  },
  {
    title: "Organize with Categories",
    description:
      "Use income categories to keep your records organized and understand where your money comes from.",
    icon: FolderKanban,
    colorClasses: "bg-rose-50 text-rose-500 border-rose-100",
  },
  {
    title: "View Income History",
    description:
      "Review past income entries and monthly summaries to see how your earnings change over time.",
    icon: BarChart3,
    colorClasses: "bg-amber-50 text-amber-600 border-amber-100",
  },
];

export function IncomeFeatures() {
  return (
    <section className="py-20 sm:py-24 bg-white relative">
      <div className="container mx-auto px-4 md:px-6">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-50 border border-emerald-200/70 text-emerald-700 text-xs font-semibold uppercase tracking-wider mb-4 shadow-xs">
            <Sparkles className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0" />
            <span>KEY FEATURES</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 mb-4">
            Everything You Need to Track Your Income
          </h2>

          <p className="text-base sm:text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
            Saviora makes it easy to record, organize, and review your income so you can understand your earnings and plan for the future.
          </p>
        </div>

        {/* 4 Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {keyFeatures.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div
                key={index}
                className="bg-white rounded-2xl border border-slate-200/80 p-6 sm:p-7 shadow-xs hover:shadow-lg hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between group"
              >
                <div>
                  <div
                    className={`w-12 h-12 rounded-xl flex items-center justify-center mb-5 border transition-transform duration-300 group-hover:scale-105 ${feature.colorClasses}`}
                  >
                    <Icon className="w-6 h-6" />
                  </div>

                  <h3 className="text-lg font-bold text-slate-900 mb-2.5">
                    {feature.title}
                  </h3>

                  <p className="text-sm text-slate-600 leading-relaxed">
                    {feature.description}
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
