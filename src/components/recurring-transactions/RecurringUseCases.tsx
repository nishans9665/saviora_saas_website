"use client";

import React from "react";
import {
  Briefcase,
  Home,
  CreditCard,
  Building2,
  Sparkles,
  CheckCircle,
} from "lucide-react";
import { AnimatedSection } from "@/components/ui/AnimatedSection";

const useCases = [
  {
    title: "Regular Salary and Income",
    category: "Personal Cash Flow",
    description:
      "Organize monthly salaries, freelance retainers, and regular client payments without manually recreating the same records.",
    points: [
      "Consistent income entries on paydays",
      "Accurate monthly period starting balances",
      "Clear visibility into expected cash flow",
    ],
    icon: Briefcase,
    iconBg: "bg-emerald-50 text-[#16a34a] border-emerald-200/80",
    badge: "Income Routine",
  },
  {
    title: "Household Bills",
    category: "Living Expenses",
    description:
      "Organize rent, utilities, internet, and other repeating household expenses.",
    points: [
      "Track fixed monthly rent and mortgage",
      "Anticipate regular internet and phone bills",
      "Account for recurring utility commitments",
    ],
    icon: Home,
    iconBg: "bg-rose-50 text-rose-600 border-rose-200/80",
    badge: "Fixed Costs",
  },
  {
    title: "Subscriptions and Memberships",
    category: "Digital Services",
    description:
      "Track recurring software, streaming, and membership expenses.",
    points: [
      "Monitor video and music streaming services",
      "Track recurring cloud storage and apps",
      "Record gym and association memberships",
    ],
    icon: CreditCard,
    iconBg: "bg-blue-50 text-blue-600 border-blue-200/80",
    badge: "Subscriptions",
  },
  {
    title: "Freelance and Business Income",
    category: "Self-Employed & Small Business",
    description:
      "Organize repeating client retainers and recurring operating expenses.",
    points: [
      "Track recurring client retainers effortlessly",
      "Log predictable software SaaS tool expenses",
      "Simplify monthly tax and income reconciliation",
    ],
    icon: Building2,
    iconBg: "bg-purple-50 text-purple-600 border-purple-200/80",
    badge: "Business Ops",
  },
];

export function RecurringUseCases() {
  return (
    <section className="py-20 sm:py-24 bg-white relative overflow-hidden" id="use-cases">
      <div className="container mx-auto px-4 md:px-6">
        
        {/* Header */}
        <AnimatedSection className="text-center max-w-3xl mx-auto mb-16 sm:mb-20">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-100/80 border border-emerald-200/90 text-emerald-800 text-xs font-semibold uppercase tracking-wider mb-4 shadow-2xs">
            <Sparkles className="w-3.5 h-3.5 text-[#16a34a] flex-shrink-0" />
            <span>REAL-WORLD ROUTINES</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 mb-4">
            One Feature for{" "}
            <span className="text-[#16a34a]">Different Financial Routines</span>
          </h2>

          <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-2xl mx-auto">
            Whether organizing monthly household expenses or managing recurring client retainers, Saviora fits seamlessly into your financial rhythm.
          </p>
        </AnimatedSection>

        {/* 4 Use Case Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
          {useCases.map((uc, index) => {
            const Icon = uc.icon;
            return (
              <AnimatedSection key={uc.title} delay={index * 0.1}>
                <div className="bg-white rounded-3xl border border-slate-200/80 p-6 sm:p-7 shadow-xs hover:shadow-md hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between h-full group">
                  <div>
                    {/* Badge and Icon */}
                    <div className="flex items-center justify-between mb-5">
                      <div
                        className={`w-12 h-12 rounded-2xl flex items-center justify-center border transition-transform duration-300 group-hover:scale-105 ${uc.iconBg}`}
                      >
                        <Icon className="w-6 h-6" />
                      </div>
                      <span className="text-[11px] font-semibold px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-600 border border-slate-200/60">
                        {uc.badge}
                      </span>
                    </div>

                    <h3 className="text-lg sm:text-xl font-bold text-slate-900 mb-1">
                      {uc.title}
                    </h3>

                    <p className="text-xs font-semibold text-[#16a34a] mb-3">
                      {uc.category}
                    </p>

                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-5">
                      {uc.description}
                    </p>

                    {/* Bullet Points */}
                    <ul className="space-y-2 pt-3 border-t border-slate-100">
                      {uc.points.map((pt, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-xs text-slate-600">
                          <CheckCircle className="w-3.5 h-3.5 text-[#16a34a] flex-shrink-0 mt-0.5" />
                          <span>{pt}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="mt-6 pt-3 border-t border-slate-100 text-[11px] text-slate-400">
                    Automated schedule management
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
