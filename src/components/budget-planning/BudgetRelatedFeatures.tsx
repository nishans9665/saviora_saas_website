"use client";

import React from "react";
import Link from "next/link";
import {
  Sparkles,
  ArrowRight,
  TrendingUp,
  Receipt,
  Target,
  BarChart3,
} from "lucide-react";

const relatedFeatures = [
  {
    title: "Income Tracking",
    description:
      "Monitor all income streams, track regular cash inflows, and analyze your earning capacity.",
    icon: TrendingUp,
    iconColor: "bg-emerald-50 text-emerald-700 border-emerald-200",
    href: "/income-tracker",
    ariaLabel: "Learn more about Income Tracking with Saviora",
  },
  {
    title: "Expense Tracking",
    description:
      "Record daily expenses, organize categories, and track spending history in real-time.",
    icon: Receipt,
    iconColor: "bg-orange-50 text-[#ea580c] border-orange-200",
    href: "/expense-tracker",
    ariaLabel: "Learn more about Expense Tracking with Saviora",
  },
  {
    title: "Savings Goals",
    description:
      "Set milestone targets, track regular contributions, and watch your emergency and dream funds grow.",
    icon: Target,
    iconColor: "bg-purple-50 text-purple-700 border-purple-200",
    href: "/savings-goals",
    ariaLabel: "Learn more about Savings Goal Tracker with Saviora",
  },
  {
    title: "Financial Analytics",
    description:
      "Review monthly reports, net cash flow breakdowns, and visual trends across all your accounts.",
    icon: BarChart3,
    iconColor: "bg-amber-50 text-amber-700 border-amber-200",
    href: "/financial-analytics",
    ariaLabel: "Learn more about Financial Analytics with Saviora",
  },
];

export function BudgetRelatedFeatures() {
  return (
    <section className="py-20 sm:py-24 bg-slate-50/50 relative" id="related-features">
      <div className="container mx-auto px-4 md:px-6">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-50 border border-emerald-200/80 text-emerald-800 text-xs font-semibold uppercase tracking-wider mb-4 shadow-xs">
            <Sparkles className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0" />
            <span>SAVIORA FINANCIAL SUITE</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 mb-4">
            Connect Budget Planning with the Full Saviora Suite
          </h2>

          <p className="text-base sm:text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
            Budgeting works best when unified with daily expense tracking, income visibility, and long-term savings goals.
          </p>
        </div>

        {/* 4 Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {relatedFeatures.map((item, index) => {
            const Icon = item.icon;
            return (
              <div
                key={index}
                className="bg-white rounded-3xl border border-slate-200/90 p-6 sm:p-7 shadow-xs hover:shadow-lg hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between group"
              >
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
                    className="inline-flex items-center gap-1.5 text-sm font-semibold text-emerald-700 hover:text-emerald-800 transition-colors"
                  >
                    <span>Explore feature</span>
                    <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
