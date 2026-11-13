"use client";

import React from "react";
import {
  TrendingUp,
  Receipt,
  CalendarDays,
  RefreshCw,
  Sliders,
  Bell,
  Sparkles,
  ArrowRight,
} from "lucide-react";
import { AnimatedSection } from "@/components/ui/AnimatedSection";

const features = [
  {
    title: "Recurring Income Tracking",
    description:
      "Organize regular income such as salaries, freelance retainers, and other repeating earnings.",
    icon: TrendingUp,
    badge: "Income",
    iconBg: "bg-emerald-50 text-emerald-600 border-emerald-200/80",
    hoverBorder: "hover:border-emerald-300",
  },
  {
    title: "Recurring Expense Tracking",
    description:
      "Set up regular expenses such as rent, utilities, subscriptions, and loan repayments.",
    icon: Receipt,
    badge: "Expense",
    iconBg: "bg-rose-50 text-rose-600 border-rose-200/80",
    hoverBorder: "hover:border-rose-300",
  },
  {
    title: "Flexible Recurrence Schedules",
    description:
      "Choose weekly, bi-weekly, monthly, or yearly schedules for common financial commitments.",
    icon: CalendarDays,
    badge: "Schedules",
    iconBg: "bg-teal-50 text-teal-600 border-teal-200/80",
    hoverBorder: "hover:border-teal-300",
  },
  {
    title: "Automatic Transaction Updates",
    description:
      "Let Saviora process eligible scheduled transactions when their due dates arrive and update their statuses.",
    icon: RefreshCw,
    badge: "Automation",
    iconBg: "bg-blue-50 text-blue-600 border-blue-200/80",
    hoverBorder: "hover:border-blue-300",
  },
  {
    title: "Individual or Series Editing",
    description:
      "Change one transaction occurrence without changing the entire schedule, or update future occurrences when your regular amount or details change.",
    icon: Sliders,
    badge: "Flexibility",
    iconBg: "bg-purple-50 text-purple-600 border-purple-200/80",
    hoverBorder: "hover:border-purple-300",
  },
  {
    title: "In-App Notifications",
    description:
      "Receive notifications when recurring transactions are processed.",
    icon: Bell,
    badge: "Alerts",
    iconBg: "bg-amber-50 text-amber-600 border-amber-200/80",
    hoverBorder: "hover:border-amber-300",
  },
];

export function RecurringFeatures() {
  return (
    <section className="py-20 sm:py-24 bg-slate-50/50 relative overflow-hidden" id="features">
      <div className="container mx-auto px-4 md:px-6">
        
        {/* Header */}
        <AnimatedSection className="text-center max-w-3xl mx-auto mb-14 sm:mb-18">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-100/80 border border-emerald-200/90 text-emerald-800 text-xs font-semibold uppercase tracking-wider mb-4 shadow-2xs">
            <Sparkles className="w-3.5 h-3.5 text-[#16a34a] flex-shrink-0" />
            <span>CORE CAPABILITIES</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 mb-4">
            Everything You Need to Manage{" "}
            <span className="text-[#16a34a]">Recurring Transactions</span>
          </h2>

          <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-2xl mx-auto">
            A simple and reliable way to manage repeating income and expenses with automated recordkeeping and full editing control.
          </p>
        </AnimatedSection>

        {/* 6 Feature Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {features.map((feature, idx) => {
            const Icon = feature.icon;
            return (
              <AnimatedSection key={feature.title} delay={idx * 0.08}>
                <div
                  className={`bg-white rounded-3xl border border-slate-200/80 p-7 shadow-xs hover:shadow-md hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between h-full group ${feature.hoverBorder}`}
                >
                  <div>
                    {/* Top row with icon & badge */}
                    <div className="flex items-center justify-between mb-5">
                      <div
                        className={`w-12 h-12 rounded-2xl flex items-center justify-center border transition-transform duration-300 group-hover:scale-105 ${feature.iconBg}`}
                      >
                        <Icon className="w-6 h-6" />
                      </div>
                      <span className="text-[11px] font-semibold px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-600 border border-slate-200/60">
                        {feature.badge}
                      </span>
                    </div>

                    <h3 className="text-lg sm:text-xl font-bold text-slate-900 mb-2.5">
                      {feature.title}
                    </h3>

                    <p className="text-sm text-slate-600 leading-relaxed">
                      {feature.description}
                    </p>
                  </div>

                  {/* <div className="mt-6 pt-4 border-t border-slate-100 flex items-center text-xs font-semibold text-[#16a34a] group-hover:text-[#15803d]">
                    <span>Learn more in documentation</span>
                    <ArrowRight className="w-3.5 h-3.5 ml-1.5 transition-transform duration-200 group-hover:translate-x-1" />
                  </div> */}
                </div>
              </AnimatedSection>
            );
          })}
        </div>

      </div>
    </section>
  );
}
