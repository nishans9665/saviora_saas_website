"use client";

import React, { useState } from "react";
import {
  Clock,
  AlertCircle,
  CheckCircle2,
  ArrowDownLeft,
  Sliders,
  XCircle,
  History,
  Calendar,
  Sparkles,
  Check,
  HelpCircle,
} from "lucide-react";
import { AnimatedSection } from "@/components/ui/AnimatedSection";

const statuses = [
  {
    name: "Scheduled",
    badgeBg: "bg-sky-100 text-sky-800 border-sky-200/80",
    icon: Clock,
    iconBg: "bg-sky-50 text-sky-600 border-sky-200",
    description: "A future transaction waiting for its scheduled date.",
    detail: "Generated automatically for active and upcoming financial periods. Visible on your calendar and period forecasts.",
  },
  {
    name: "Pending",
    badgeBg: "bg-amber-100 text-amber-800 border-amber-200/80",
    icon: AlertCircle,
    iconBg: "bg-amber-50 text-amber-600 border-amber-200",
    description: "A transaction requiring payment or receipt status resolution, according to the actual implementation.",
    detail: "Awaiting final confirmation or settlement before being finalized into historical ledger reports.",
  },
  {
    name: "Completed",
    badgeBg: "bg-emerald-100 text-emerald-800 border-emerald-200/80",
    icon: CheckCircle2,
    iconBg: "bg-emerald-50 text-[#16a34a] border-emerald-200",
    description: "An eligible expense recorded as completed.",
    detail: "Automatically logged into the active month's expense totals and subtracted from category budget balances.",
  },
  {
    name: "Received",
    badgeBg: "bg-teal-100 text-teal-800 border-teal-200/80",
    icon: ArrowDownLeft,
    iconBg: "bg-teal-50 text-teal-600 border-teal-200",
    description: "An eligible income transaction recorded as received.",
    detail: "Automatically logged into your current month's realized income totals and cash flow ledger.",
  },
];

export function RecurringLifecycleAndEditing() {
  const [selectedEditOption, setSelectedEditOption] = useState<"single" | "future">("single");

  return (
    <section className="py-20 sm:py-24 bg-white relative overflow-hidden" id="lifecycle-editing">
      <div className="container mx-auto px-4 md:px-6">
        
        {/* Header */}
        <AnimatedSection className="text-center max-w-3xl mx-auto mb-16 sm:mb-20">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-100/80 border border-emerald-200/90 text-emerald-800 text-xs font-semibold uppercase tracking-wider mb-4 shadow-2xs">
            <Sparkles className="w-3.5 h-3.5 text-[#16a34a] flex-shrink-0" />
            <span>COMPLETE LIFECYCLE MANAGEMENT</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 mb-4">
            Stay in Control of{" "}
            <span className="text-[#16a34a]">Every Recurring Transaction</span>
          </h2>

          <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-2xl mx-auto">
            Understand every stage of your recurring records and make adjustments whenever your regular amounts or schedules change.
          </p>
        </AnimatedSection>

        {/* Part 1: Status Demonstration */}
        <div className="max-w-6xl mx-auto mb-20">
          <div className="text-center mb-8">
            <h3 className="text-xl sm:text-2xl font-bold text-slate-900 mb-2">
              Transaction Statuses in Saviora
            </h3>
            <p className="text-sm text-slate-500">
              Clear, transparent labels reflect the exact state of every recurring record.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {statuses.map((st, idx) => {
              const Icon = st.icon;
              return (
                <AnimatedSection key={st.name} delay={idx * 0.1}>
                  <div className="rounded-3xl border border-slate-200/80 bg-white p-6 shadow-xs hover:shadow-md hover:-translate-y-1 transition-all duration-300 h-full flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between mb-4">
                        <div className={`w-12 h-12 rounded-2xl flex items-center justify-center border ${st.iconBg}`}>
                          <Icon className="w-6 h-6" />
                        </div>
                        <span className={`px-2.5 py-1 rounded-full text-xs font-bold border ${st.badgeBg}`}>
                          {st.name}
                        </span>
                      </div>

                      <h4 className="text-base font-bold text-slate-900 mb-2">
                        {st.description}
                      </h4>

                      <p className="text-xs text-slate-600 leading-relaxed">
                        {st.detail}
                      </p>
                    </div>

                    <div className="mt-5 pt-3 border-t border-slate-100 flex items-center gap-1.5 text-[11px] text-slate-400">
                      <HelpCircle className="w-3.5 h-3.5 text-slate-400 flex-shrink-0" />
                      <span>Documented Saviora status state</span>
                    </div>
                  </div>
                </AnimatedSection>
              );
            })}
          </div>
        </div>

        {/* Part 2: Dual Content Blocks - Editing Workflow & Cancellation */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 max-w-6xl mx-auto">
          
          {/* Left Block: Individual vs Series Editing */}
          <div className="lg:col-span-7">
            <AnimatedSection delay={0.1}>
              <div className="rounded-3xl border border-slate-200/90 bg-slate-50/50 p-6 sm:p-8 h-full flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-purple-100 text-purple-800 text-xs font-semibold w-fit mb-4 border border-purple-200">
                    <Sliders className="w-3.5 h-3.5" />
                    <span>FLEXIBLE EDITING WORKFLOW</span>
                  </div>

                  <h3 className="text-2xl font-bold text-slate-900 mb-3">
                    Edit One Occurrence or Update Future Transactions
                  </h3>

                  <p className="text-sm sm:text-base text-slate-600 leading-relaxed mb-6">
                    Sometimes a recurring amount changes for only one month. Saviora&apos;s documented editing workflow allows users to edit the current occurrence only or update future occurrences in the recurring series.
                  </p>

                  {/* Interactive Option Selector */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
                    <button
                      type="button"
                      onClick={() => setSelectedEditOption("single")}
                      className={`p-4 rounded-2xl border text-left transition-all ${
                        selectedEditOption === "single"
                          ? "bg-white border-[#22c55e] shadow-sm ring-2 ring-emerald-500/20"
                          : "bg-white/60 border-slate-200 hover:bg-white"
                      }`}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-bold text-slate-900">
                          Edit Current Only
                        </span>
                        {selectedEditOption === "single" && (
                          <Check className="w-4 h-4 text-[#16a34a]" />
                        )}
                      </div>
                      <p className="text-xs text-slate-500 leading-relaxed">
                        Adjusts this specific month&apos;s amount (e.g., utility spike) without touching past or future occurrences.
                      </p>
                    </button>

                    <button
                      type="button"
                      onClick={() => setSelectedEditOption("future")}
                      className={`p-4 rounded-2xl border text-left transition-all ${
                        selectedEditOption === "future"
                          ? "bg-white border-[#22c55e] shadow-sm ring-2 ring-emerald-500/20"
                          : "bg-white/60 border-slate-200 hover:bg-white"
                      }`}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-bold text-slate-900">
                          Update Future Series
                        </span>
                        {selectedEditOption === "future" && (
                          <Check className="w-4 h-4 text-[#16a34a]" />
                        )}
                      </div>
                      <p className="text-xs text-slate-500 leading-relaxed">
                        Applies new amounts or schedule details to all upcoming occurrences starting from this date forward.
                      </p>
                    </button>
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-white border border-slate-200/80 text-xs text-slate-600">
                  <strong className="text-slate-800 font-semibold block mb-0.5">
                    {selectedEditOption === "single" ? "Result:" : "Result:"}
                  </strong>
                  {selectedEditOption === "single"
                    ? "Your November electricity bill reflects $120.00 instead of $85.00. December and beyond remain at your standard $85.00 baseline."
                    : "Your monthly salary updates from $3,500.00 to $3,800.00. All upcoming monthly periods automatically reflect the revised amount."}
                </div>
              </div>
            </AnimatedSection>
          </div>

          {/* Right Block: Cancel a Recurring Schedule */}
          <div className="lg:col-span-5">
            <AnimatedSection delay={0.2}>
              <div className="rounded-3xl border border-slate-200/90 bg-slate-50/50 p-6 sm:p-8 h-full flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-rose-100 text-rose-800 text-xs font-semibold w-fit mb-4 border border-rose-200">
                    <XCircle className="w-3.5 h-3.5" />
                    <span>SAFE CANCELLATION</span>
                  </div>

                  <h3 className="text-2xl font-bold text-slate-900 mb-3">
                    Cancel a Recurring Schedule
                  </h3>

                  <p className="text-sm sm:text-base text-slate-600 leading-relaxed mb-6">
                    Cancel a recurring series when you no longer need it. Future scheduled records are removed while previous transaction history is preserved.
                  </p>

                  <div className="space-y-3 mb-6">
                    <div className="flex items-start gap-3 p-3.5 rounded-2xl bg-white border border-slate-200/70">
                      <History className="w-5 h-5 text-[#16a34a] flex-shrink-0 mt-0.5" />
                      <div>
                        <strong className="block text-sm font-semibold text-slate-900">
                          Historical Data Intact
                        </strong>
                        <span className="text-xs text-slate-500">
                          Past completed and received transactions remain logged in previous monthly periods.
                        </span>
                      </div>
                    </div>

                    <div className="flex items-start gap-3 p-3.5 rounded-2xl bg-white border border-slate-200/70">
                      <Calendar className="w-5 h-5 text-rose-500 flex-shrink-0 mt-0.5" />
                      <div>
                        <strong className="block text-sm font-semibold text-slate-900">
                          Future Records Cleaned Up
                        </strong>
                        <span className="text-xs text-slate-500">
                          Unprocessed scheduled instances are wiped from upcoming periods to keep future views clean.
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="p-3.5 rounded-2xl bg-emerald-50/70 border border-emerald-200 text-xs text-emerald-800 font-medium text-center">
                  Zero risk of breaking historical analytics, export files, or previous budget summaries.
                </div>
              </div>
            </AnimatedSection>
          </div>

        </div>

      </div>
    </section>
  );
}
