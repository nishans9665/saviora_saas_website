"use client";

import React from "react";
import Link from "next/link";
import { Sparkles, ArrowRight, Wallet, Receipt, PieChart, Target, BarChart3 } from "lucide-react";

const relatedFeatures = [
  {
    title: "Income Tracking",
    description: "Track multiple income streams, organize cash inflows, and monitor monthly earning trends in your configured currency.",
    icon: Wallet,
    iconColor: "bg-emerald-50 text-emerald-600 border-emerald-100",
    href: "/income-tracker",
    ariaLabel: "Learn more about Income Tracking with Saviora",
  },
  {
    title: "Expense Tracking",
    description: "Record daily expenses, categorize transactions into buckets, and review your spending history with ease.",
    icon: Receipt,
    iconColor: "bg-orange-50 text-[#ea580c] border-orange-100",
    href: "/expense-tracker",
    ariaLabel: "Learn more about Expense Tracking with Saviora",
  },
  {
    title: "Monthly Budget Planning",
    description: "Set monthly category spending limits, monitor remaining balances, and maintain healthy financial discipline.",
    icon: PieChart,
    iconColor: "bg-emerald-50 text-emerald-700 border-emerald-100",
    href: "/monthly-budget-planning",
    ariaLabel: "Learn more about Monthly Budget Planning with Saviora",
  },
  {
    title: "Savings Goal Tracker",
    description: "Set milestone targets, track regular contributions, and watch your savings progress grow visually.",
    icon: Target,
    iconColor: "bg-purple-50 text-purple-600 border-purple-100",
    href: "/savings-goals",
    ariaLabel: "Learn more about Savings Goals with Saviora",
  },
  {
    title: "Financial Analytics & Reports",
    description: "Interactive visual charts and category breakdowns to help you understand your cash flow and habits.",
    icon: BarChart3,
    iconColor: "bg-amber-50 text-amber-700 border-amber-100",
    href: "/financial-analytics",
    ariaLabel: "Learn more about Financial Analytics with Saviora",
  },
];

export function CurrencyRelatedFeatures() {
  return (
    <section className="py-20 sm:py-24 bg-white relative overflow-hidden" id="related-features">
      <div className="container mx-auto px-4 md:px-6">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-50 border border-emerald-200/80 text-emerald-800 text-xs font-semibold uppercase tracking-wider mb-4 shadow-xs">
            <Sparkles className="w-3.5 h-3.5 text-primary-600 flex-shrink-0" />
            <span>CONNECT YOUR WORKSPACE</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 mb-4">
            Explore More Saviora Features
          </h2>

          <p className="text-base sm:text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
            Your configured main currency powers every area of Saviora. Discover how each feature works seamlessly together:
          </p>
        </div>

        {/* 5-Column / Responsive Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6 max-w-7xl mx-auto">
          {relatedFeatures.map((feature, idx) => {
            const Icon = feature.icon;
            return (
              <Link
                key={idx}
                href={feature.href}
                aria-label={feature.ariaLabel}
                className="group rounded-2xl border border-slate-200/90 bg-slate-50/50 p-6 flex flex-col justify-between hover:bg-white hover:border-emerald-300 hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
              >
                <div>
                  <div
                    className={`w-12 h-12 rounded-xl flex items-center justify-center border mb-5 transition-transform duration-300 group-hover:scale-105 ${feature.iconColor}`}
                  >
                    <Icon className="w-6 h-6" />
                  </div>

                  <h3 className="text-base font-bold text-slate-900 group-hover:text-primary-600 transition-colors mb-2">
                    {feature.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-6">
                    {feature.description}
                  </p>
                </div>

                <div className="pt-3 border-t border-slate-200/60 flex items-center text-xs font-semibold text-primary-600 group-hover:text-primary-700">
                  <span>Explore feature</span>
                  <ArrowRight className="w-3.5 h-3.5 ml-1.5 transition-transform duration-300 group-hover:translate-x-1" />
                </div>
              </Link>
            );
          })}
        </div>

      </div>
    </section>
  );
}
