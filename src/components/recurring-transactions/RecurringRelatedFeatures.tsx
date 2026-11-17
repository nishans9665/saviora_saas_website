"use client";

import React from "react";
import Link from "next/link";
import {
  Sparkles,
  ArrowRight,
  TrendingUp,
  Receipt,
  PieChart,
  BarChart3,
  LayoutDashboard,
  } from "lucide-react";
import { AnimatedSection } from "@/components/ui/AnimatedSection";

const connectedFeatures = [
  {
    title: "Income Tracking",
    description:
      "Organize regular earnings, salary deposits, and expected recurring income streams alongside irregular earnings.",
    icon: TrendingUp,
    iconColor: "bg-emerald-50 text-[#16a34a] border-emerald-200/80",
    href: "/income-tracker",
    ctaText: "Explore Income Tracking",
    ariaLabel: "Learn more about Income Tracking with Saviora",
  },
  {
    title: "Expense Tracking",
    description:
      "Keep repeating household bills, subscriptions, and regular living expenses organized in your unified transaction ledger.",
    icon: Receipt,
    iconColor: "bg-orange-50 text-[#ea580c] border-orange-200/80",
    href: "/expense-tracker",
    ctaText: "Explore Expense Tracking",
    ariaLabel: "Learn more about Expense Tracking with Saviora",
  },
  {
    title: "Budget Planning",
    description:
      "Reflect scheduled recurring expenses directly into relevant category spending limits before the month starts.",
    icon: PieChart,
    iconColor: "bg-teal-50 text-teal-600 border-teal-200/80",
    href: "/monthly-budget-planning",
    ctaText: "Explore Budget Planning",
    ariaLabel: "Learn more about Monthly Budget Planning with Saviora",
  },
  {
    title: "Financial Analytics",
    description:
      "Review recurring costs and spending patterns across reporting periods using interactive analytics and visual charts.",
    icon: BarChart3,
    iconColor: "bg-amber-50 text-amber-600 border-amber-200/80",
    href: "/financial-analytics",
    ctaText: "Explore Financial Analytics",
    ariaLabel: "Learn more about Financial Analytics with Saviora",
  },
];

export function RecurringRelatedFeatures() {
  return (
    <section className="py-20 sm:py-24 bg-slate-50/50 relative overflow-hidden" id="connected-features">
      <div className="container mx-auto px-4 md:px-6">
        
        {/* Header */}
        <AnimatedSection className="text-center max-w-3xl mx-auto mb-14 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-100/80 border border-emerald-200/90 text-emerald-800 text-xs font-semibold uppercase tracking-wider mb-4 shadow-2xs">
            <Sparkles className="w-3.5 h-3.5 text-[#16a34a] flex-shrink-0" />
            <span>CONNECTED SAVIORA PLATFORM</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 mb-4">
            Recurring Transactions Work Alongside{" "}
            <span className="text-[#16a34a]">Your Financial Plan</span>
          </h2>

          <p className="text-base sm:text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
            Recurring schedules are deeply integrated with Saviora&apos;s personal finance suite, ensuring your budgets, reports, and dashboards stay synchronized automatically.
          </p>
        </AnimatedSection>

        {/* 4 Feature Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto mb-12">
          {connectedFeatures.map((item, index) => {
            const Icon = item.icon;
            return (
              <AnimatedSection key={item.title} delay={index * 0.1}>
                <div className="bg-white rounded-3xl border border-slate-200/80 p-6 sm:p-7 shadow-xs hover:shadow-lg hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between group h-full">
                  <div>
                    <div
                      className={`w-12 h-12 rounded-2xl flex items-center justify-center mb-5 border transition-transform duration-300 group-hover:scale-105 ${item.iconColor}`}
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
                      <span>{item.ctaText}</span>
                      <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
                    </Link>
                  </div>
                </div>
              </AnimatedSection>
            );
          })}
        </div>

        {/* Additional Integrations Strip: Dashboard & Notifications */}
        <AnimatedSection delay={0.3} className="max-w-4xl mx-auto">
          <div className="rounded-2xl border border-slate-200/80 bg-white p-5 sm:p-6 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-2xs">
            <div className="flex items-center gap-4 text-left">
              <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center text-slate-700 flex-shrink-0">
                <LayoutDashboard className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-slate-900">
                  Visible in Saviora Dashboard &amp; In-App Notifications
                </h4>
                <p className="text-xs text-slate-500">
                  Track upcoming schedules on your main financial overview and receive in-app alerts whenever recurring items process.
                </p>
              </div>
            </div>

            <Link
              href="/#dashboard"
              className="inline-flex items-center gap-1 text-xs font-semibold text-[#16a34a] hover:underline whitespace-nowrap"
            >
              <span>View Dashboard Overview</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </AnimatedSection>

      </div>
    </section>
  );
}
