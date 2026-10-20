"use client";

import React from "react";
import Link from "next/link";
import { Sparkles, ArrowRight, TrendingUp, Receipt, PieChart, Target } from "lucide-react";
import { AnimatedSection } from "@/components/ui/AnimatedSection";

const relatedFeatures = [
  {
    title: "Income Tracking",
    description: "Organize recorded income and review your income history across multiple revenue streams.",
    icon: TrendingUp,
    iconColor: "bg-emerald-50 text-[#16a34a] border-emerald-200/60",
    href: "/income-tracker",
    ctaText: "Explore Income Tracking",
    ariaLabel: "Learn more about Income Tracking with Saviora",
  },
  {
    title: "Expense Tracking",
    description: "Record daily expenses, categorize transactions into clear buckets, and review where your money goes.",
    icon: Receipt,
    iconColor: "bg-orange-50 text-[#ea580c] border-orange-200/60",
    href: "/expense-tracker",
    ctaText: "Explore Expense Tracking",
    ariaLabel: "Learn more about Expense Tracking with Saviora",
  },
  {
    title: "Budget Planning",
    description: "Set monthly category spending limits, monitor remaining balances, and maintain healthy spending habits.",
    icon: PieChart,
    iconColor: "bg-sky-50 text-sky-600 border-sky-100",
    href: "/monthly-budget-planning",
    ctaText: "Explore Budget Planning",
    ariaLabel: "Learn more about Monthly Budget Planning with Saviora",
  },
  {
    title: "Savings Goals",
    description: "Define milestone targets, record savings contributions, and track progress visually over time.",
    icon: Target,
    iconColor: "bg-purple-50 text-purple-600 border-purple-100",
    href: "/savings-goals",
    ctaText: "Explore Savings Goals",
    ariaLabel: "Learn more about Savings Goal Tracker with Saviora",
  },
];

export function AnalyticsRelatedFeatures() {
  return (
    <section className="py-20 sm:py-24 bg-slate-50/50 relative overflow-hidden" id="related-features">
      <div className="container mx-auto px-4 md:px-6">
        {/* Header */}
        <AnimatedSection className="text-center max-w-3xl mx-auto mb-14 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-100/80 border border-amber-200/80 text-amber-800 text-xs font-semibold uppercase tracking-wider mb-4 shadow-xs">
            <Sparkles className="w-3.5 h-3.5 text-amber-600 flex-shrink-0" />
            <span>YOUR FINANCES, CONNECTED</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 mb-4">
            Bring Your Financial Activity into One Clearer View
          </h2>

          <p className="text-base sm:text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
            Financial analytics works alongside Saviora&apos;s other personal finance tools to help you organize your financial activity.
          </p>
        </AnimatedSection>

        {/* 4 Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
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
                      <span>{item.ctaText}</span>
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
