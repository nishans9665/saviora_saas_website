"use client";

import React from "react";
import { Sparkles, FileText, FolderOpen, BarChart3, ArrowRight } from "lucide-react";

const steps = [
  {
    stepNumber: "1",
    badgeColor: "bg-[#22c55e] text-white",
    icon: FileText,
    iconColor: "bg-[#22c55e]/10 text-[#16a34a] border-[#22c55e]/25",
    title: "Add Your Income",
    description: "Enter the amount, date, and relevant details for each income entry.",
  },
  {
    stepNumber: "2",
    badgeColor: "bg-sky-500 text-white",
    icon: FolderOpen,
    iconColor: "bg-sky-50 text-sky-600 border-sky-100",
    title: "Organize and Categorize",
    description: "Select the appropriate income source and category to keep your records organized.",
  },
  {
    stepNumber: "3",
    badgeColor: "bg-purple-500 text-white",
    icon: BarChart3,
    iconColor: "bg-purple-50 text-purple-600 border-purple-100",
    title: "Review and Stay Informed",
    description: "View your income history and summaries to understand your earnings over time.",
  },
];

export function IncomeHowItWorks() {
  return (
    <section className="py-20 sm:py-24 bg-white relative">
      <div className="container mx-auto px-4 md:px-6">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#22c55e]/10 border border-[#22c55e]/25 text-[#16a34a] text-xs font-semibold uppercase tracking-wider mb-4 shadow-xs">
            <Sparkles className="w-3.5 h-3.5 text-[#22c55e] flex-shrink-0" />
            <span>HOW IT WORKS</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 mb-4">
            Start Tracking Your Income in{" "}
            <span className="text-[#22c55e]">Three Steps</span>
          </h2>

          <p className="text-base sm:text-lg text-slate-600 max-w-xl mx-auto leading-relaxed">
            Getting started with income tracking in Saviora is quick and easy.
          </p>
        </div>

        {/* 3 Step Cards with Connection Arrows */}
        <div className="relative">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 relative z-10 items-stretch">
            {steps.map((step, index) => {
              const Icon = step.icon;
              return (
                <div key={index} className="relative flex flex-col">
                  {/* Card container */}
                  <div className="bg-white rounded-2xl border border-slate-200/80 p-6 sm:p-8 shadow-xs hover:shadow-lg transition-all duration-300 flex-1 flex flex-col justify-between">
                    <div>
                      {/* Step Badge */}
                      <div className="flex items-center justify-between mb-5">
                        <span
                          className={`w-7 h-7 rounded-full flex items-center justify-center font-bold text-xs shadow-xs ${step.badgeColor}`}
                        >
                          {step.stepNumber}
                        </span>
                      </div>

                      {/* Icon */}
                      <div
                        className={`w-12 h-12 rounded-xl flex items-center justify-center mb-5 border ${step.iconColor}`}
                      >
                        <Icon className="w-6 h-6" />
                      </div>

                      {/* Title */}
                      <h3 className="text-lg font-bold text-slate-900 mb-2.5">
                        {step.title}
                      </h3>

                      {/* Description */}
                      <p className="text-sm text-slate-600 leading-relaxed">
                        {step.description}
                      </p>
                    </div>
                  </div>

                  {/* Desktop arrow indicator between cards */}
                  {index < steps.length - 1 && (
                    <div className="hidden md:flex absolute -right-3 lg:-right-4 top-1/2 -translate-y-1/2 z-20 pointer-events-none">
                      <div className="w-6 h-6 rounded-full bg-white border border-slate-200 flex items-center justify-center shadow-2xs">
                        <ArrowRight className="w-3.5 h-3.5 text-slate-400" />
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
}
