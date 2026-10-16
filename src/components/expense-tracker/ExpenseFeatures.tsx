"use client";

import React from "react";
import { Sparkles, Receipt, FolderKanban, History, BarChart3 } from "lucide-react";

const keyFeatures = [
  {
    title: "Record Expenses Easily",
    description:
      "Add expenses with the details you need, including title, amount, date, category, payment method, and optional notes.",
    icon: Receipt,
    colorClasses: "bg-[#ea580c]/10 text-[#ea580c] border-[#ea580c]/25",
  },
  {
    title: "Organize by Category",
    description:
      "Group expenses into categories to understand where your money goes and identify spending patterns.",
    icon: FolderKanban,
    colorClasses: "bg-sky-50 text-sky-600 border-sky-100",
  },
  {
    title: "Track Your Transactions",
    description:
      "Keep a clear record of your expenses and review previous entries whenever you need to.",
    icon: History,
    colorClasses: "bg-purple-50 text-purple-600 border-purple-100",
  },
  {
    title: "Review Your Spending",
    description:
      "Use available financial summaries and reports to understand your expenses and how your spending changes over time.",
    icon: BarChart3,
    colorClasses: "bg-amber-50 text-amber-600 border-amber-100",
  },
];

export function ExpenseFeatures() {
  return (
    <section className="py-20 sm:py-24 bg-white relative">
      <div className="container mx-auto px-4 md:px-6">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#ea580c]/10 border border-[#ea580c]/25 text-[#ea580c] text-xs font-semibold uppercase tracking-wider mb-4 shadow-xs">
            <Sparkles className="w-3.5 h-3.5 text-[#ea580c] flex-shrink-0" />
            <span>KEY FEATURES</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 mb-4">
            Everything You Need to Manage Your Expenses
          </h2>

          <p className="text-base sm:text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
            Saviora helps you record, organize, and review your expenses so you can understand your spending and take control of your finances.
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
