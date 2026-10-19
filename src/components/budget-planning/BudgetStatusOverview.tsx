"use client";

import React from "react";
import {
  Sparkles,
  CheckCircle2,
  AlertTriangle,
  AlertCircle,
  Filter,
  ArrowRight,
} from "lucide-react";

const statuses = [
  {
    title: "Safe Budget",
    badge: "SAFE",
    badgeStyle: "bg-emerald-100 text-emerald-800 border-emerald-200",
    progressColor: "bg-emerald-600",
    borderColor: "border-slate-200 hover:border-emerald-300",
    samplePercent: 65,
    sampleSpent: "$650.00",
    sampleLimit: "$1,000.00",
    sampleRemaining: "$350.00",
    icon: CheckCircle2,
    iconColor: "text-emerald-600 bg-emerald-50 border-emerald-200",
    description:
      "Your spending is within the configured budget threshold. Keep tracking your day-to-day transactions with confidence.",
    insight: "Sufficient runway for remaining calendar days",
  },
  {
    title: "Approaching Limit",
    badge: "WARNING",
    badgeStyle: "bg-amber-100 text-amber-800 border-amber-200",
    progressColor: "bg-[#ea580c]",
    borderColor: "border-amber-200/90 hover:border-amber-400",
    samplePercent: 92,
    sampleSpent: "$460.00",
    sampleLimit: "$500.00",
    sampleRemaining: "$40.00",
    icon: AlertTriangle,
    iconColor: "text-amber-600 bg-amber-50 border-amber-200",
    description:
      "Spending is close to the limit and may require attention. Slow down non-essential purchases or review assigned items.",
    insight: "Prompt alerts help prevent accidental overspending",
  },
  {
    title: "Overspent Budget",
    badge: "OVERSPENT",
    badgeStyle: "bg-rose-100 text-rose-800 border-rose-200",
    progressColor: "bg-rose-500",
    borderColor: "border-rose-200/90 hover:border-rose-400",
    samplePercent: 110,
    sampleSpent: "$550.00",
    sampleLimit: "$500.00",
    sampleRemaining: "-$50.00",
    icon: AlertCircle,
    iconColor: "text-rose-600 bg-rose-50 border-rose-200",
    description:
      "Your spending has reached or exceeded the budget limit. Identify where excess costs occurred and adjust subsequent spending.",
    insight: "Immediate visual indicator on your dashboard",
  },
];

export function BudgetStatusOverview() {
  return (
    <section className="py-20 sm:py-24 bg-slate-50/60 relative" id="budget-status">
      <div className="container mx-auto px-4 md:px-6">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-50 border border-emerald-200/80 text-emerald-800 text-xs font-semibold uppercase tracking-wider mb-4 shadow-xs">
            <Sparkles className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0" />
            <span>REAL-TIME STATUS MONITORING</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-[40px] font-extrabold tracking-tight text-slate-900 leading-tight mb-4">
            Recognize Spending Problems Before the Month Ends
          </h2>

          <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-2xl mx-auto">
            Saviora automatically assigns dynamic status indicators to every monthly budget. With clear visual cues and quick filter tabs, you immediately identify which categories are thriving and which need attention.
          </p>
        </div>

        {/* 3 Status Cards Side-by-Side */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 max-w-6xl mx-auto mb-10">
          {statuses.map((st, idx) => {
            const Icon = st.icon;
            return (
              <div
                key={idx}
                className={`bg-white rounded-3xl border p-6 sm:p-7 shadow-xs hover:shadow-lg transition-all duration-300 flex flex-col justify-between ${st.borderColor}`}
              >
                <div>
                  {/* Status header */}
                  <div className="flex items-center justify-between mb-5">
                    <div
                      className={`w-12 h-12 rounded-2xl border flex items-center justify-center ${st.iconColor}`}
                    >
                      <Icon className="w-6 h-6" />
                    </div>
                    <span
                      className={`px-2.5 py-1 rounded-full text-xs font-bold border ${st.badgeStyle}`}
                    >
                      {st.badge}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold text-slate-900 mb-2">
                    {st.title}
                  </h3>

                  <p className="text-sm text-slate-600 leading-relaxed mb-6">
                    {st.description}
                  </p>

                  {/* Representative Progress Gauge */}
                  <div className="bg-slate-50 rounded-2xl p-4 border border-slate-100 mb-4">
                    <div className="flex items-baseline justify-between mb-1.5">
                      <span className="text-xs text-slate-500 font-medium">
                        Utilization
                      </span>
                      <span className="text-xs font-bold text-slate-900">
                        {st.samplePercent}%
                      </span>
                    </div>

                    <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden mb-2">
                      <div
                        className={`h-2 rounded-full ${st.progressColor}`}
                        style={{ width: `${Math.min(100, st.samplePercent)}%` }}
                      />
                    </div>

                    <div className="flex items-center justify-between text-[11px] text-slate-500 pt-1 border-t border-slate-200/60">
                      <span>{st.sampleSpent} spent</span>
                      <span className="font-semibold text-slate-700">
                        {st.sampleRemaining} remaining
                      </span>
                    </div>
                  </div>
                </div>

                <div className="pt-3 border-t border-slate-100 flex items-center gap-2 text-xs font-medium text-slate-500">
                  <span className="w-1.5 h-1.5 rounded-full bg-slate-400" />
                  <span>{st.insight}</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Filter Explanation Box */}
        <div className="max-w-4xl mx-auto rounded-2xl border border-slate-200 bg-white p-5 sm:p-6 shadow-xs flex flex-col sm:flex-row items-center gap-4 text-center sm:text-left">
          <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-700 border border-emerald-200/80 flex items-center justify-center flex-shrink-0">
            <Filter className="w-6 h-6" />
          </div>
          <div className="flex-1">
            <h4 className="text-sm sm:text-base font-bold text-slate-900 mb-1">
              Filter By Status For Instant Clarity
            </h4>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              When managing dozens of categories, toggle between <strong>All</strong>, <strong>Safe</strong>, <strong>Warning</strong>, and <strong>Overspent</strong> filters directly in the Saviora dashboard to isolate items that require immediate adjustment.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
