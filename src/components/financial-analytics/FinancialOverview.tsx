"use client";

import React from "react";
import {
  Sparkles,
  DollarSign,
  PieChart,
  CreditCard,
  TrendingDown,
  TrendingUp,
  Receipt,
} from "lucide-react";
import { AnimatedSection } from "@/components/ui/AnimatedSection";

const overviewCards = [
  {
    title: "Total Expenses",
    metricValue: "$984,113.65",
    description: "Review the total expenses recorded across all accounts for the selected reporting period.",
    icon: DollarSign,
    color: "bg-orange-50 text-orange-600 border-orange-200/60",
    badge: "Selected Period",
  },
  {
    title: "Top Spending Category",
    metricValue: "Education",
    description: "Identify the category with the highest recorded expense total to highlight key budget drivers.",
    icon: PieChart,
    color: "bg-emerald-50 text-emerald-700 border-emerald-200/60",
    badge: "23.1% Share",
  },
  {
    title: "Most-Used Payment Method",
    metricValue: "Bank Transfer",
    description: "Understand which payment method appears most frequently or prominently across your recorded transactions.",
    icon: CreditCard,
    color: "bg-blue-50 text-blue-600 border-blue-200/60",
    badge: "Primary Channel",
  },
  {
    title: "Average Daily Spending",
    metricValue: "$65,607.58",
    description: "Review your average daily spending benchmark calculated across the active date range.",
    icon: TrendingDown,
    color: "bg-purple-50 text-purple-600 border-purple-200/60",
    badge: "Daily Benchmark",
  },
  {
    title: "Monthly Growth",
    metricValue: "0.0%",
    description: "Explore the displayed monthly growth metric and monitor how spending trends compare between periods.",
    icon: TrendingUp,
    color: "bg-teal-50 text-teal-700 border-teal-200/60",
    badge: "Period-Over-Period",
  },
  {
    title: "Transaction Overview",
    metricValue: "221 Entries",
    description: "See the total transaction count included in the reporting period for complete auditing visibility.",
    icon: Receipt,
    color: "bg-amber-50 text-amber-600 border-amber-200/60",
    badge: "Audited Records",
  },
];

export function FinancialOverview() {
  return (
    <section className="py-20 sm:py-24 bg-white relative overflow-hidden" id="overview">
      <div className="container mx-auto px-4 md:px-6">
        {/* Header */}
        <AnimatedSection className="text-center max-w-3xl mx-auto mb-14 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-100/80 border border-amber-200/80 text-amber-800 text-xs font-semibold uppercase tracking-wider mb-4 shadow-xs">
            <Sparkles className="w-3.5 h-3.5 text-amber-600 flex-shrink-0" />
            <span>YOUR FINANCES AT A GLANCE</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 mb-4">
            See the Bigger Picture Behind Your Spending
          </h2>

          <p className="text-base sm:text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
            Get a quick overview of your financial activity before exploring the details. Review key expense metrics and identify the areas you may want to examine more closely.
          </p>
        </AnimatedSection>

        {/* 6 Feature Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {overviewCards.map((card, index) => {
            const Icon = card.icon;
            return (
              <AnimatedSection key={index} delay={index * 0.08}>
                <div className="bg-white rounded-3xl border border-slate-200/80 p-7 sm:p-8 h-full flex flex-col justify-between shadow-xs hover:shadow-md hover:-translate-y-1 transition-all duration-300 group">
                  <div>
                    <div className="flex items-center justify-between mb-5">
                      <div
                        className={`w-12 h-12 rounded-2xl flex items-center justify-center border transition-transform duration-300 group-hover:scale-105 ${card.color}`}
                      >
                        <Icon className="w-6 h-6" />
                      </div>
                      <span className="text-[11px] font-semibold px-2.5 py-1 rounded-full bg-slate-100 text-slate-600">
                        {card.badge}
                      </span>
                    </div>

                    <div className="text-2xl sm:text-3xl font-extrabold text-slate-900 mb-1 tracking-tight">
                      {card.metricValue}
                    </div>

                    <h3 className="text-lg font-bold text-slate-800 mb-2">
                      {card.title}
                    </h3>

                    <p className="text-sm text-slate-600 leading-relaxed">
                      {card.description}
                    </p>
                  </div>
                </div>
              </AnimatedSection>
            );
          })}
        </div>
      </div>
    </section>
  );
}
