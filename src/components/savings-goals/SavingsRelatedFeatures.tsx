"use client";

import React from "react";
import Link from "next/link";
import { Sparkles, ArrowRight, Wallet, Receipt, PieChart, BarChart3 } from "lucide-react";
import { AnimatedSection } from "@/components/ui/AnimatedSection";

const relatedFeatures = [
  {
    title: "Income Tracking",
    description: "Keep track of the money coming in.",
    icon: Wallet,
    iconColor: "bg-emerald-50 text-[#16a34a] border-emerald-200/60",
    href: "/income-tracker",
    ariaLabel: "Learn more about Income Tracking with Saviora",
  },
  {
    title: "Expense Tracking",
    description: "Understand where your money goes.",
    icon: Receipt,
    iconColor: "bg-orange-50 text-[#ea580c] border-orange-200/60",
    href: "/expense-tracker",
    ariaLabel: "Learn more about Expense Tracking with Saviora",
  },
  {
    title: "Budget Planning",
    description: "Plan spending and monitor your budget limits.",
    icon: PieChart,
    iconColor: "bg-sky-50 text-sky-600 border-sky-100",
    href: "/monthly-budget-planning",
    ariaLabel: "Learn more about Monthly Budget Planning with Saviora",
  },
  {
    title: "Financial Analytics",
    description: "Review your financial activity and reports.",
    icon: BarChart3,
    iconColor: "bg-amber-50 text-amber-600 border-amber-100",
    href: "/features",
    ariaLabel: "Learn more about Financial Analytics on the Saviora features page",
  },
];

export function SavingsRelatedFeatures() {
  return (
    <section className="py-20 sm:py-24 bg-slate-50/50 relative overflow-hidden" id="related-features">
      <div className="container mx-auto px-4 md:px-6">
        {/* Header */}
        <AnimatedSection className="text-center max-w-3xl mx-auto mb-14 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-purple-100/80 border border-purple-200/80 text-purple-700 text-xs font-semibold uppercase tracking-wider mb-4 shadow-xs">
            <Sparkles className="w-3.5 h-3.5 text-purple-600 flex-shrink-0" />
            <span>EXPLORE MORE</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 mb-4">
            Connect Your Savings Goals with Your Financial Plan
          </h2>

          <p className="text-base sm:text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
            Savings goals work best as part of a complete financial plan. Explore these related features:
          </p>
        </AnimatedSection>

        {/* 4 Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {relatedFeatures.map((item, index) => {
            const Icon = item.icon;
            return (
              <AnimatedSection key={index} delay={index * 0.1}>
                <div className="bg-white rounded-2xl border border-slate-200/80 p-6 sm:p-7 shadow-xs hover:shadow-lg hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between group h-full">
                  <div>
                    <div
                      className={`w-12 h-12 rounded-xl flex items-center justify-center mb-5 border transition-transform duration-300 group-hover:scale-105 ${item.iconColor}`}
                    >
                      <Icon className="w-6 h-6" />
                    </div>

                    <h3 className="text-lg font-bold text-slate-900 mb-2">
                      {item.title}
                    </h3>

                    <p className="text-sm text-slate-600 leading-relaxed mb-6">
                      {item.description}
                    </p>
                  </div>

                  <div>
                    <Link
                      href={item.href}
                      aria-label={item.ariaLabel}
                      className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#16a34a] hover:text-[#15803d] transition-colors"
                    >
                      <span>Learn more</span>
                      <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
                    </Link>
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
