"use client";

import React from "react";
import { TrendingUp, PieChart, Search, FileSpreadsheet } from "lucide-react";
import { AnimatedSection } from "@/components/ui/AnimatedSection";

const benefits = [
  {
    title: "Understand Spending Patterns",
    description: "See how recorded expenses are distributed across categories and dates to recognize seasonal habits and spikes.",
    icon: TrendingUp,
    color: "bg-emerald-50 text-[#16a34a] border-emerald-200/60",
  },
  {
    title: "Review Income and Expenses Together",
    description: "Compare total cash inflows with outgoing expenses across identical reporting periods for balanced cash flow clarity.",
    icon: PieChart,
    color: "bg-blue-50 text-blue-600 border-blue-200/60",
  },
  {
    title: "Investigate Category Changes",
    description: "Identify high-volume spending categories you may want to review more closely or calibrate with monthly budget caps.",
    icon: Search,
    color: "bg-amber-50 text-amber-600 border-amber-200/60",
  },
  {
    title: "Keep Reports Organized",
    description: "Use available search, multi-category filters, and export tools to maintain clean transaction records year-round.",
    icon: FileSpreadsheet,
    color: "bg-purple-50 text-purple-600 border-purple-200/60",
  },
];

export function WhyAnalyticsMatters() {
  return (
    <section className="py-20 sm:py-24 bg-slate-50/50 relative overflow-hidden" id="why-analytics-matters">
      <div className="container mx-auto px-4 md:px-6">
        {/* Header */}
        <AnimatedSection className="text-center max-w-3xl mx-auto mb-14 sm:mb-16">
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 mb-4">
            Make More Sense of Your Everyday Finances
          </h2>

          <p className="text-base sm:text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
            Understanding your recorded financial activity is an important part of managing money. Clear reports and visual summaries can help you identify patterns, review spending categories, and make more informed decisions about your budget.
          </p>
        </AnimatedSection>

        {/* 4 Benefit Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
          {benefits.map((item, idx) => {
            const Icon = item.icon;
            return (
              <AnimatedSection key={idx} delay={idx * 0.1}>
                <div className="bg-white rounded-3xl border border-slate-200/80 p-7 sm:p-8 h-full flex flex-col justify-between shadow-xs hover:shadow-md hover:-translate-y-1 transition-all duration-300 group">
                  <div>
                    <div
                      className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-6 border transition-transform duration-300 group-hover:scale-105 ${item.color}`}
                    >
                      <Icon className="w-7 h-7" />
                    </div>

                    <h3 className="text-lg font-bold text-slate-900 mb-3 leading-snug">
                      {item.title}
                    </h3>

                    <p className="text-sm text-slate-600 leading-relaxed">
                      {item.description}
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
