"use client";

import React from "react";
import {
  Calendar,
  Clock,
  CalendarDays,
  CalendarRange,
  RotateCw,
  Sparkles,
  ShieldCheck,
  Info,
} from "lucide-react";
import { AnimatedSection } from "@/components/ui/AnimatedSection";

const schedules = [
  {
    frequency: "Weekly",
    badge: "52x / year",
    subtitle: "Weekly allowances or regular payments",
    examples: "Weekly grocery budget, transit passes, weekly contractor payroll.",
    timing: "Repeats every 7 days on your chosen weekday",
    accentBg: "bg-emerald-50 text-[#16a34a] border-emerald-200/80",
    icon: Calendar,
  },
  {
    frequency: "Bi-weekly",
    badge: "26x / year",
    subtitle: "Salaries or payments every two weeks",
    examples: "Bi-weekly paychecks, recurring loan payments, bi-weekly service contracts.",
    timing: "Repeats every 14 days on scheduled cycle",
    accentBg: "bg-teal-50 text-teal-600 border-teal-200/80",
    icon: CalendarDays,
  },
  {
    frequency: "Monthly",
    badge: "12x / year",
    subtitle: "Rent, utilities, and subscriptions",
    examples: "Apartment rent, internet, mobile bills, cloud subscriptions, gym memberships.",
    timing: "Repeats on the same calendar day each month",
    accentBg: "bg-blue-50 text-blue-600 border-blue-200/80",
    icon: CalendarRange,
  },
  {
    frequency: "Yearly",
    badge: "1x / year",
    subtitle: "Annual memberships and renewals",
    examples: "Software annual subscriptions, car insurance, professional licenses, domain renewals.",
    timing: "Repeats annually on your designated calendar date",
    accentBg: "bg-purple-50 text-purple-600 border-purple-200/80",
    icon: RotateCw,
  },
];

export function RecurringFlexibleScheduling() {
  return (
    <section className="py-20 sm:py-24 bg-white relative overflow-hidden" id="flexible-scheduling">
      <div className="container mx-auto px-4 md:px-6">
        
        {/* Header */}
        <AnimatedSection className="text-center max-w-3xl mx-auto mb-14 sm:mb-18">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-100/80 border border-emerald-200/90 text-emerald-800 text-xs font-semibold uppercase tracking-wider mb-4 shadow-2xs">
            <Sparkles className="w-3.5 h-3.5 text-[#16a34a] flex-shrink-0" />
            <span>FLEXIBLE CADENCE</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 mb-4">
            Create Schedules That Match{" "}
            <span className="text-[#16a34a]">Your Financial Routine</span>
          </h2>

          <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-2xl mx-auto">
            Different financial commitments follow different schedules. Saviora helps you organize repeating transactions around your income and payment routines.
          </p>
        </AnimatedSection>

        {/* 4 Schedule Cards (Horizontal timeline on desktop, stacked on mobile) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto mb-12">
          {schedules.map((item, idx) => {
            const Icon = item.icon;
            return (
              <AnimatedSection key={item.frequency} delay={idx * 0.1}>
                <div className="bg-white rounded-3xl border border-slate-200/80 p-6 sm:p-7 shadow-xs hover:shadow-md hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between h-full group">
                  <div>
                    {/* Top Row */}
                    <div className="flex items-center justify-between mb-5">
                      <div
                        className={`w-12 h-12 rounded-2xl flex items-center justify-center border transition-transform duration-300 group-hover:scale-105 ${item.accentBg}`}
                      >
                        <Icon className="w-6 h-6" />
                      </div>
                      <span className="text-[11px] font-bold px-2.5 py-1 rounded-full bg-slate-100 text-slate-700 border border-slate-200/70">
                        {item.badge}
                      </span>
                    </div>

                    <h3 className="text-xl font-bold text-slate-900 mb-1.5">
                      {item.frequency}
                    </h3>

                    <p className="text-sm font-semibold text-[#16a34a] mb-3">
                      {item.subtitle}
                    </p>

                    <p className="text-xs text-slate-600 leading-relaxed mb-4">
                      {item.examples}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-slate-100 text-[11px] text-slate-500 flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-slate-400 flex-shrink-0" />
                    <span>{item.timing}</span>
                  </div>
                </div>
              </AnimatedSection>
            );
          })}
        </div>

        {/* Shorter Months & Duplicate Prevention Technical Safeguards Card */}
        <AnimatedSection delay={0.3} className="max-w-4xl mx-auto">
          <div className="rounded-3xl border border-emerald-200/80 bg-gradient-to-r from-emerald-50/60 via-slate-50/50 to-teal-50/60 p-6 sm:p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
              
              {/* Shorter Calendar Month Logic */}
              <div className="flex items-start gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-white border border-emerald-200 flex items-center justify-center text-[#16a34a] flex-shrink-0 shadow-2xs">
                  <Info className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 text-sm sm:text-base mb-1">
                    Smart Handling of Shorter Calendar Months
                  </h4>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    If a monthly recurring bill is scheduled on the 31st, Saviora automatically resolves to the final calendar day in months with 28, 29, or 30 days (such as February, April, and September). No payments are skipped.
                  </p>
                </div>
              </div>

              {/* Duplicate Prevention Guarantee */}
              <div className="flex items-start gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-white border border-emerald-200 flex items-center justify-center text-[#16a34a] flex-shrink-0 shadow-2xs">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 text-sm sm:text-base mb-1">
                    Built-In Duplicate Record Prevention
                  </h4>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    Saviora enforces unique period keys and verification checks before generating scheduled instances, ensuring transactions are never created or counted twice across rolling financial cycles.
                  </p>
                </div>
              </div>

            </div>
          </div>
        </AnimatedSection>

      </div>
    </section>
  );
}
