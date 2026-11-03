"use client";

import React from "react";
import { Sparkles, XCircle, CheckCircle2, } from "lucide-react";
import { AnimatedSection } from "@/components/ui/AnimatedSection";

const traditionalProblems = [
  {
    title: "Manual Re-entry Every Month",
    description: "Typing the exact same rent, internet, and salary numbers month after month takes unnecessary time.",
  },
  {
    title: "Forgotten Recurring Bills",
    description: "It is easy to forget a subscription or quarterly utility until an unexpected charge appears.",
  },
  {
    title: "Repetitive Income Logging",
    description: "Regular paychecks and client retainers must be manually recorded every pay period.",
  },
  {
    title: "Fragmented Financial Records",
    description: "Spending extra time reconciling which recurring payments have already occurred versus upcoming ones.",
  },
  {
    title: "Overlooked Budget Commitments",
    description: "Failing to account for future recurring expenses when planning the current month's spending limits.",
  },
];

const savioraSolutions = [
  {
    title: "Create a Recurring Schedule Once",
    description: "Set your repeating frequency once, and let Saviora handle the ongoing transaction generation.",
  },
  {
    title: "Automatically Generate Upcoming Records",
    description: "Future transactions appear in advance across your financial calendar and active monthly periods.",
  },
  {
    title: "Track Income and Expenses Together",
    description: "Manage both predictable income and recurring bills side-by-side in a unified financial ledger.",
  },
  {
    title: "Automate Status Updates When Due",
    description: "Saviora updates scheduled transactions to completed or received records when due dates arrive.",
  },
  {
    title: "Keep Future Financial Periods Organized",
    description: "Gain clear visibility into upcoming financial obligations before each month even begins.",
  },
];

export function RecurringProblemSolution() {
  return (
    <section className="py-20 sm:py-24 bg-white relative overflow-hidden" id="problem-solution">
      <div className="container mx-auto px-4 md:px-6">
        
        {/* Section Header */}
        <AnimatedSection className="text-center max-w-3xl mx-auto mb-16 sm:mb-20">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-100/80 border border-emerald-200/90 text-emerald-800 text-xs font-semibold uppercase tracking-wider mb-4 shadow-2xs">
            <Sparkles className="w-3.5 h-3.5 text-[#16a34a] flex-shrink-0" />
            <span>THE SMARTER APPROACH</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 mb-4">
            Stop Repeating the Same{" "}
            <span className="text-[#16a34a]">Financial Tasks Every Month</span>
          </h2>

          <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-2xl mx-auto">
            Managing salaries, household bills, subscriptions, and regular payments manually can become repetitive. Forgetting to record an expense or expected income can also make it harder to understand your monthly finances.
          </p>
        </AnimatedSection>

        {/* Comparison Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-8 max-w-5xl mx-auto items-stretch">
          
          {/* Left Column: The Traditional Way */}
          <AnimatedSection delay={0.1} direction="left">
            <div className="rounded-3xl border border-rose-200/80 bg-rose-50/30 p-6 sm:p-8 h-full flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2.5 mb-6 pb-4 border-b border-rose-200/60">
                  <div className="w-8 h-8 rounded-lg bg-rose-100 text-rose-600 flex items-center justify-center flex-shrink-0">
                    <XCircle className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-slate-900">
                      The Traditional Way
                    </h3>
                    <p className="text-xs text-rose-700/80">
                      Manual, repetitive, and error-prone tracking
                    </p>
                  </div>
                </div>

                <ul className="space-y-4">
                  {traditionalProblems.map((problem, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <XCircle className="w-5 h-5 text-rose-500 flex-shrink-0 mt-0.5" />
                      <div>
                        <strong className="block text-sm font-semibold text-slate-800">
                          {problem.title}
                        </strong>
                        <span className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                          {problem.description}
                        </span>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-8 pt-4 border-t border-rose-200/50 text-xs text-rose-800/80 font-medium text-center">
                Requires continual manual effort and leaves blind spots in upcoming cash flow.
              </div>
            </div>
          </AnimatedSection>

          {/* Right Column: The Saviora Way */}
          <AnimatedSection delay={0.2} direction="right">
            <div className="rounded-3xl border border-emerald-300/90 bg-gradient-to-br from-emerald-50/70 via-white to-teal-50/40 p-6 sm:p-8 h-full flex flex-col justify-between shadow-sm relative overflow-hidden">
              {/* Highlight badge */}
              <div className="absolute top-4 right-4">
                <span className="inline-flex items-center gap-1 text-[11px] font-bold px-2.5 py-1 rounded-full bg-[#22c55e] text-white shadow-2xs">
                  Recommended
                </span>
              </div>

              <div>
                <div className="flex items-center gap-2.5 mb-6 pb-4 border-b border-emerald-200/60">
                  <div className="w-8 h-8 rounded-lg bg-emerald-100 text-[#16a34a] flex items-center justify-center flex-shrink-0">
                    <CheckCircle2 className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-slate-900">
                      The Saviora Way
                    </h3>
                    <p className="text-xs text-emerald-700">
                      Automated schedules, organized records, peace of mind
                    </p>
                  </div>
                </div>

                <ul className="space-y-4">
                  {savioraSolutions.map((solution, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-[#16a34a] flex-shrink-0 mt-0.5" />
                      <div>
                        <strong className="block text-sm font-semibold text-slate-900">
                          {solution.title}
                        </strong>
                        <span className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                          {solution.description}
                        </span>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-8 pt-4 border-t border-emerald-200/70 text-xs text-emerald-800 font-medium text-center">
                Configure once and let Saviora maintain your recurring financial schedule automatically.
              </div>
            </div>
          </AnimatedSection>

        </div>

      </div>
    </section>
  );
}
