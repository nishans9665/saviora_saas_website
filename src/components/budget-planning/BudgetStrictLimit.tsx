"use client";

import React, { useState } from "react";
import {
  ShieldAlert,
  CheckCircle2,
  AlertTriangle,
  Car,
  Ban,
  Lock,
  ArrowRight,
  Info,
  Sparkles,
} from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";

const supportingBenefits = [
  "Set individual spending limits for selected categories.",
  "Identify categories approaching their limits.",
  "See clear warnings when a budget is nearly exhausted.",
  "Prevent qualifying new expenses when Strict Limit applies.",
  "Maintain greater accountability over your monthly spending.",
];

export function BudgetStrictLimit() {
  const [isStrictLimitOn, setIsStrictLimitOn] = useState(true);
  const [showAttemptModal, setShowAttemptModal] = useState(false);

  return (
    <section
      className="py-20 sm:py-24 bg-gradient-to-b from-emerald-500/10 via-emerald-50/50 to-white relative overflow-hidden"
      id="strict-limit"
    >
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 items-center">
          {/* Left Column: Explanatory Content */}
          <div className="lg:col-span-6 text-left flex flex-col items-start">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-100/80 border border-emerald-300 text-emerald-800 text-xs font-semibold uppercase tracking-wider mb-4 shadow-xs">
              <ShieldAlert className="w-3.5 h-3.5 text-emerald-700 flex-shrink-0" />
              <span>SMART SPENDING CONTROL</span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-[40px] font-extrabold tracking-tight text-slate-900 leading-tight mb-4">
              Set Spending Limits That Help You Stay on Track
            </h2>

            <p className="text-base sm:text-lg text-slate-600 leading-relaxed mb-6">
              Create clear boundaries for your spending with Saviora&apos;s Strict Limit option. Enable the restriction for selected budgets to prevent new expenses from being added when they would exceed the applicable budget limit, according to the configured rules.
            </p>

            {/* Supporting Benefits */}
            <div className="space-y-3.5 w-full mb-8">
              {supportingBenefits.map((benefit, idx) => (
                <div key={idx} className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-emerald-100 border border-emerald-300 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-700" />
                  </div>
                  <span className="text-sm sm:text-base text-slate-700 font-medium">
                    {benefit}
                  </span>
                </div>
              ))}
            </div>

            <div className="p-4 rounded-2xl bg-white/80 border border-emerald-200/90 text-xs text-slate-600 leading-relaxed mb-8 flex items-start gap-3 shadow-xs">
              <Info className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
              <span>
                <strong>Application-level guardrails:</strong> Strict Limit regulates new expense entry inside Saviora according to your configured budget rules. It helps you stay disciplined without interfering with external bank accounts or payment cards.
              </span>
            </div>

            <Button
              asChild
              size="lg"
              className="bg-emerald-700 hover:bg-emerald-800 text-white font-semibold rounded-full px-7 py-3.5 shadow-md shadow-emerald-700/20 hover:shadow-lg hover:shadow-emerald-700/30 transition-all duration-300 cursor-pointer"
            >
              <Link
                href="https://cloud.saviora.app/register"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center"
              >
                <span>Protect Your Monthly Limits</span>
                <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </Button>
          </div>

          {/* Right Column: Visual Example with Transportation Budget */}
          <div className="lg:col-span-6 w-full">
            <div className="relative mx-auto max-w-xl">
              {/* Outer Card with High-Impact Border */}
              <div className="relative rounded-3xl border-2 border-emerald-300/80 bg-white p-4 sm:p-7 md:p-8 shadow-xl shadow-emerald-900/5 text-left">
                {/* Card Top: Category and Toggle */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3.5 pb-4 mb-4 sm:pb-5 sm:mb-5 border-b border-slate-100">
                  <div className="flex items-center gap-3">
                    <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl bg-amber-50 text-amber-700 border border-amber-200/80 flex items-center justify-center flex-shrink-0">
                      <Car className="w-5 h-5 sm:w-6 sm:h-6" />
                    </div>
                    <div className="min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <h3 className="text-base sm:text-lg font-bold text-slate-900 leading-tight">
                          Transportation
                        </h3>
                        <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-100 text-amber-800 border border-amber-200">
                          WARNING
                        </span>
                      </div>
                      <span className="text-xs text-slate-500">October 2026 Budget</span>
                    </div>
                  </div>

                  {/* Interactive Strict Limit Toggle */}
                  <div className="flex items-center justify-between sm:justify-end sm:flex-col sm:items-end gap-1.5 bg-slate-50/80 sm:bg-transparent px-3 py-2 sm:p-0 rounded-xl sm:rounded-none border sm:border-0 border-slate-100">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-slate-700">
                        Strict Limit
                      </span>
                      <button
                        type="button"
                        role="switch"
                        aria-checked={isStrictLimitOn}
                        onClick={() => setIsStrictLimitOn(!isStrictLimitOn)}
                        className={`w-11 h-6 flex items-center rounded-full p-1 transition-colors duration-200 cursor-pointer flex-shrink-0 ${
                          isStrictLimitOn ? "bg-emerald-600" : "bg-slate-300"
                        }`}
                      >
                        <div
                          className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform duration-200 ${
                            isStrictLimitOn ? "translate-x-5" : "translate-x-0"
                          }`}
                        />
                      </button>
                    </div>
                    <span className="text-[10px] font-semibold text-emerald-700">
                      {isStrictLimitOn ? "Active Enforcement" : "Monitoring Only"}
                    </span>
                  </div>
                </div>

                {/* Metrics Breakdown Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 sm:gap-3 mb-5 sm:mb-6">
                  <div className="bg-slate-50 rounded-xl p-2.5 sm:p-3 border border-slate-100">
                    <span className="text-[10px] uppercase font-semibold text-slate-400 block mb-0.5 sm:mb-1">
                      Budget
                    </span>
                    <span className="text-sm sm:text-base font-extrabold text-slate-900">$500.00</span>
                  </div>
                  <div className="bg-slate-50 rounded-xl p-2.5 sm:p-3 border border-slate-100">
                    <span className="text-[10px] uppercase font-semibold text-slate-400 block mb-0.5 sm:mb-1">
                      Spent
                    </span>
                    <span className="text-sm sm:text-base font-extrabold text-amber-700">$465.00</span>
                  </div>
                  <div className="bg-slate-50 rounded-xl p-2.5 sm:p-3 border border-slate-100">
                    <span className="text-[10px] uppercase font-semibold text-slate-400 block mb-0.5 sm:mb-1">
                      Remaining
                    </span>
                    <span className="text-sm sm:text-base font-extrabold text-emerald-700">$35.00</span>
                  </div>
                  <div className="bg-slate-50 rounded-xl p-2.5 sm:p-3 border border-slate-100">
                    <span className="text-[10px] uppercase font-semibold text-slate-400 block mb-0.5 sm:mb-1">
                      Utilization
                    </span>
                    <span className="text-sm sm:text-base font-extrabold text-[#ea580c]">93.0%</span>
                  </div>
                </div>

                {/* Progress Bar with Warning Indicator */}
                <div className="mb-5 sm:mb-6">
                  <div className="flex flex-wrap items-center justify-between text-xs text-slate-600 mb-1.5 font-medium gap-1">
                    <span className="flex items-center gap-1.5 text-amber-700">
                      <AlertTriangle className="w-3.5 h-3.5 flex-shrink-0" />
                      <span>Approaching monthly threshold</span>
                    </span>
                    <span className="font-bold text-slate-900">93% Allocated</span>
                  </div>
                  <div className="w-full bg-slate-100 h-3 rounded-full overflow-hidden">
                    <div className="bg-[#ea580c] h-3 rounded-full w-[93%]" />
                  </div>
                </div>

                {/* Warning Alert Banner */}
                <div className="rounded-2xl border border-amber-300 bg-amber-50/70 p-4 mb-5">
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-xl bg-amber-100 flex items-center justify-center text-amber-700 flex-shrink-0 mt-0.5">
                      <ShieldAlert className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-amber-900 mb-0.5">
                        Strict Limit Guardrail Active
                      </h4>
                      <p className="text-xs text-amber-800 leading-relaxed">
                        Adding any new expense exceeding <strong>$35.00</strong> will be blocked by Saviora until additional budget is allocated or adjusted.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Interactive Demo Simulation Button */}
                <div className="pt-2 border-t border-slate-100">
                  <button
                    type="button"
                    onClick={() => setShowAttemptModal(!showAttemptModal)}
                    className="w-full py-2.5 px-4 rounded-xl border border-slate-200 bg-slate-50 hover:bg-slate-100 text-xs font-semibold text-slate-700 flex items-center justify-center gap-2 transition-colors cursor-pointer"
                  >
                    <Ban className="w-3.5 h-3.5 text-rose-500" />
                    <span>{showAttemptModal ? "Hide Expense Simulation" : "Simulate Adding $50.00 Expense"}</span>
                  </button>

                  {showAttemptModal && (
                    <div className="mt-3 p-3.5 rounded-xl border border-rose-200 bg-rose-50 text-xs text-rose-900 animate-in fade-in duration-200">
                      <div className="flex items-center gap-2 font-bold mb-1">
                        <Lock className="w-3.5 h-3.5 text-rose-600" />
                        <span>Action Blocked by Strict Limit:</span>
                      </div>
                      <p className="text-[11px] text-rose-800">
                        Cannot add <strong>$50.00 Fuel expense</strong>. It would exceed remaining Transportation balance of <strong>$35.00</strong> by $15.00.
                      </p>
                    </div>
                  )}
                </div>

                <div className="mt-4 text-center text-[10px] text-slate-400">
                  Illustrative product preview with sample values: $500 limit, $465 spent, $35 remaining.
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
