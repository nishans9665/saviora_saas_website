"use client";

import React from "react";
import { Sparkles, Calendar, BarChart4, Download, ArrowRight } from "lucide-react";
import { AnimatedSection } from "@/components/ui/AnimatedSection";

const steps = [
  {
    step: "1",
    title: "Choose a Reporting Period",
    description: "Use the available date controls to select the start and end dates for the exact financial period you want to review.",
    icon: Calendar,
    stepColor: "bg-amber-600 text-white",
    iconColor: "bg-amber-50 text-amber-700 border-amber-200",
  },
  {
    step: "2",
    title: "Explore Your Analytics",
    description: "Review financial summary cards, category distributions, income-versus-expense comparisons, and daily spending patterns.",
    icon: BarChart4,
    stepColor: "bg-[#16a34a] text-white",
    iconColor: "bg-emerald-50 text-[#16a34a] border-emerald-200",
  },
  {
    step: "3",
    title: "Investigate and Export",
    description: "Use available search, category filters, and export controls to examine underlying expense transactions and download reports.",
    icon: Download,
    stepColor: "bg-blue-600 text-white",
    iconColor: "bg-blue-50 text-blue-600 border-blue-200",
  },
];

export function AnalyticsHowItWorks() {
  return (
    <section className="py-20 sm:py-24 bg-white relative overflow-hidden" id="how-it-works">
      <div className="container mx-auto px-4 md:px-6">
        {/* Header */}
        <AnimatedSection className="text-center max-w-3xl mx-auto mb-14 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-100/80 border border-amber-200/80 text-amber-800 text-xs font-semibold uppercase tracking-wider mb-4 shadow-xs">
            <Sparkles className="w-3.5 h-3.5 text-amber-600 flex-shrink-0" />
            <span>HOW IT WORKS</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 mb-4">
            Understand Your Finances in{" "}
            <span className="text-[#16a34a]">Three Steps</span>
          </h2>

          <p className="text-base sm:text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
            Reviewing your financial reports and expense trends in Saviora is straightforward.
          </p>
        </AnimatedSection>

        {/* 3 Numbered Steps with Horizontal Connecting Arrows on Desktop */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative max-w-6xl mx-auto">
          {steps.map((stepItem, index) => {
            const Icon = stepItem.icon;
            return (
              <AnimatedSection key={index} delay={index * 0.15}>
                <div className="relative bg-white rounded-3xl border border-slate-200/80 p-8 h-full flex flex-col items-center text-center shadow-xs hover:shadow-md hover:-translate-y-1 transition-all duration-300 group">
                  {/* Step Number Pill */}
                  <div
                    className={`w-9 h-9 rounded-full flex items-center justify-center font-extrabold text-sm mb-5 shadow-sm ${stepItem.stepColor}`}
                  >
                    {stepItem.step}
                  </div>

                  {/* Icon */}
                  <div
                    className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-5 border transition-transform duration-300 group-hover:scale-105 ${stepItem.iconColor}`}
                  >
                    <Icon className="w-7 h-7" />
                  </div>

                  {/* Title & Description */}
                  <h3 className="text-xl font-bold text-slate-900 mb-3">
                    {stepItem.title}
                  </h3>

                  <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
                    {stepItem.description}
                  </p>

                  {/* Arrow Indicator on Desktop (between items) */}
                  {index < steps.length - 1 && (
                    <div className="hidden md:flex absolute -right-4 top-1/2 -translate-y-1/2 z-20 w-8 h-8 rounded-full bg-slate-50 border border-slate-200 items-center justify-center text-slate-400">
                      <ArrowRight className="w-4 h-4" />
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
