"use client";

import React from "react";
import { PlusCircle, Sliders, CalendarCheck2, CheckCheck, ArrowRight, Sparkles } from "lucide-react";
import { AnimatedSection } from "@/components/ui/AnimatedSection";

const steps = [
  {
    step: "1",
    title: "Create a Recurring Transaction",
    description:
      "Add your income or expense details, including title, amount, category, currency, payment method, and start date.",
    icon: PlusCircle,
    stepColor: "bg-[#16a34a] text-white",
    iconBg: "bg-emerald-50 text-[#16a34a] border-emerald-200/80",
  },
  {
    step: "2",
    title: "Choose Your Schedule",
    description:
      "Enable the recurring option and select a supported frequency: weekly, bi-weekly, monthly, or yearly.",
    icon: Sliders,
    stepColor: "bg-teal-600 text-white",
    iconBg: "bg-teal-50 text-teal-600 border-teal-200/80",
  },
  {
    step: "3",
    title: "Saviora Generates Upcoming Records",
    description:
      "The system creates scheduled transaction instances and places them into the appropriate financial periods.",
    icon: CalendarCheck2,
    stepColor: "bg-blue-600 text-white",
    iconBg: "bg-blue-50 text-blue-600 border-blue-200/80",
  },
  {
    step: "4",
    title: "Track Automatically Updated Transactions",
    description:
      "When eligible transactions reach their scheduled dates, Saviora updates their statuses, records the financial activity, and prepares the next occurrence.",
    icon: CheckCheck,
    stepColor: "bg-purple-600 text-white",
    iconBg: "bg-purple-50 text-purple-600 border-purple-200/80",
  },
];

export function RecurringHowItWorks() {
  return (
    <section className="py-20 sm:py-24 bg-slate-50/50 relative overflow-hidden" id="how-it-works">
      <div className="container mx-auto px-4 md:px-6">
        
        {/* Header */}
        <AnimatedSection className="text-center max-w-3xl mx-auto mb-16 sm:mb-20">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-100/80 border border-emerald-200/90 text-emerald-800 text-xs font-semibold uppercase tracking-wider mb-4 shadow-2xs">
            <Sparkles className="w-3.5 h-3.5 text-[#16a34a] flex-shrink-0" />
            <span>HOW IT WORKS</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 mb-4">
            Set It Up Once.{" "}
            <span className="text-[#16a34a]">Keep Your Financial Records Organized.</span>
          </h2>

          <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-2xl mx-auto">
            Configure repeating transactions in seconds and let Saviora automate your transaction lifecycle from scheduled plan to finalized record.
          </p>
        </AnimatedSection>

        {/* 4 Connected Workflow Steps */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative max-w-6xl mx-auto">
          {steps.map((item, index) => {
            const Icon = item.icon;
            return (
              <AnimatedSection key={item.step} delay={index * 0.12}>
                <div className="relative bg-white rounded-3xl border border-slate-200/80 p-7 h-full flex flex-col items-center text-center shadow-xs hover:shadow-md hover:-translate-y-1 transition-all duration-300 group">
                  
                  {/* Step Pill */}
                  <div
                    className={`w-9 h-9 rounded-full flex items-center justify-center font-extrabold text-sm mb-5 shadow-xs ${item.stepColor}`}
                  >
                    {item.step}
                  </div>

                  {/* Icon */}
                  <div
                    className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-5 border transition-transform duration-300 group-hover:scale-105 ${item.iconBg}`}
                  >
                    <Icon className="w-7 h-7" />
                  </div>

                  {/* Title & Description */}
                  <h3 className="text-lg font-bold text-slate-900 mb-3">
                    {item.title}
                  </h3>

                  <p className="text-sm text-slate-600 leading-relaxed">
                    {item.description}
                  </p>

                  {/* Arrow Indicator on Desktop between steps */}
                  {index < steps.length - 1 && (
                    <div className="hidden lg:flex absolute -right-3.5 top-1/2 -translate-y-1/2 z-20 w-7 h-7 rounded-full bg-white border border-slate-200 items-center justify-center text-slate-400 shadow-2xs">
                      <ArrowRight className="w-3.5 h-3.5" />
                    </div>
                  )}
                </div>
              </AnimatedSection>
            );
          })}
        </div>

      </div>
    </section>
  );
}
