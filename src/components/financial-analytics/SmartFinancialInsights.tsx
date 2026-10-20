"use client";

import React from "react";
import {
  Sparkles,
  Info,
  AlertTriangle,
  AlertCircle,
  CheckCircle2,
  BellRing,
  PieChart,
  ShieldCheck,
} from "lucide-react";
import { AnimatedSection } from "@/components/ui/AnimatedSection";

const insightsData = [
  {
    type: "info",
    text: "Housing & Rent is your highest spending category this month at $1,450.00 (34.1%).",
    icon: Info,
    bg: "bg-blue-50/70 border-blue-200/80 text-blue-900",
    iconColor: "text-blue-600",
  },
  {
    type: "alert",
    text: "Budget Alert: You have exceeded your Dining Out budget by $42.50.",
    icon: AlertCircle,
    bg: "bg-rose-50/70 border-rose-200/80 text-rose-950",
    iconColor: "text-rose-600",
  },
  {
    type: "warning",
    text: "Budget Warning: You have used 92% of your Transportation budget.",
    icon: AlertTriangle,
    bg: "bg-amber-50/70 border-amber-200/80 text-amber-950",
    iconColor: "text-amber-600",
  },
  {
    type: "warning",
    text: "Budget Warning: You have used 88% of your Entertainment budget.",
    icon: AlertTriangle,
    bg: "bg-amber-50/70 border-amber-200/80 text-amber-950",
    iconColor: "text-amber-600",
  },
  {
    type: "alert",
    text: "Budget Alert: You have exceeded your Personal Care budget by $15.00.",
    icon: AlertCircle,
    bg: "bg-rose-50/70 border-rose-200/80 text-rose-950",
    iconColor: "text-rose-600",
  },
];

const categoryProgress = [
  {
    name: "Housing & Rent",
    amount: "$1,450.00",
    percentage: "34.1%",
    barColor: "bg-[#10b981]",
    width: "85%",
  },
  {
    name: "Food & Groceries",
    amount: "$780.00",
    percentage: "18.4%",
    barColor: "bg-[#f97316]",
    width: "60%",
  },
  {
    name: "Transportation",
    amount: "$420.00",
    percentage: "9.9%",
    barColor: "bg-[#3b82f6]",
    width: "42%",
  },
  {
    name: "Utilities & Bills",
    amount: "$340.00",
    percentage: "8.0%",
    barColor: "bg-[#f59e0b]",
    width: "35%",
  },
  {
    name: "Entertainment & Dining",
    amount: "$310.00",
    percentage: "7.3%",
    barColor: "bg-[#a855f7]",
    width: "30%",
  },
];

const featureCards = [
  {
    title: "Spending Insights",
    description: "Review automated rule-based summaries highlighting your top spending category and notable monthly fluctuations.",
    icon: PieChart,
    color: "bg-blue-50 text-blue-600 border-blue-200/60",
  },
  {
    title: "Budget Alerts and Warnings",
    description: "Visual threshold notifications identify budget categories that have exceeded spending limits or reached warning levels (e.g. 98%+ utilization).",
    icon: BellRing,
    color: "bg-amber-50 text-amber-600 border-amber-200/60",
  },
  {
    title: "Category Performance",
    description: "Compare category totals and their relative contribution to recorded expenses using clear progress indicators.",
    icon: ShieldCheck,
    color: "bg-emerald-50 text-[#16a34a] border-emerald-200/60",
  },
];

export function SmartFinancialInsights() {
  return (
    <section className="py-20 sm:py-24 bg-slate-50/60 relative overflow-hidden" id="insights">
      <div className="container mx-auto px-4 md:px-6">
        {/* Header */}
        <AnimatedSection className="text-center max-w-3xl mx-auto mb-14 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-100/80 border border-blue-200/80 text-blue-800 text-xs font-semibold uppercase tracking-wider mb-4 shadow-xs">
            <Sparkles className="w-3.5 h-3.5 text-blue-600 flex-shrink-0" />
            <span>USEFUL FINANCIAL INFORMATION</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 mb-4">
            Find Important Details in Your Financial Activity
          </h2>

          <p className="text-base sm:text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
            Bring attention to the financial information that deserves a closer look. Saviora&apos;s available insights and alerts can help you review spending categories and understand the status of your budgets.
          </p>
        </AnimatedSection>

        {/* 3 Explanatory Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12 max-w-5xl mx-auto">
          {featureCards.map((card, idx) => {
            const Icon = card.icon;
            return (
              <div
                key={idx}
                className="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-xs hover:shadow-md transition-all duration-300"
              >
                <div className={`w-11 h-11 rounded-xl flex items-center justify-center mb-4 border ${card.color}`}>
                  <Icon className="w-5 h-5" />
                </div>
                <h3 className="text-base font-bold text-slate-900 mb-2">
                  {card.title}
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  {card.description}
                </p>
              </div>
            );
          })}
        </div>

        {/* Dual Panels: Smart Financial Insights + Category Performance (Matches Screenshot 3) */}
        <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Panel: Smart Financial Insights */}
          <div className="lg:col-span-6 bg-white rounded-3xl border border-slate-200/90 p-6 sm:p-7 shadow-lg shadow-slate-900/5">
            <div className="flex items-center gap-2.5 pb-4 mb-4 border-b border-slate-100">
              <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center">
                <Info className="w-4 h-4" />
              </div>
              <h3 className="text-base sm:text-lg font-bold text-slate-900">
                Smart Financial Insights
              </h3>
            </div>

            <div className="space-y-2.5">
              {insightsData.map((item, idx) => {
                const Icon = item.icon;
                return (
                  <div
                    key={idx}
                    className={`p-3 rounded-xl border flex items-start gap-2.5 text-xs sm:text-[13px] leading-relaxed ${item.bg}`}
                  >
                    <Icon className={`w-4 h-4 flex-shrink-0 mt-0.5 ${item.iconColor}`} />
                    <span>{item.text}</span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right Panel: Category Performance */}
          <div className="lg:col-span-6 bg-white rounded-3xl border border-slate-200/90 p-6 sm:p-7 shadow-lg shadow-slate-900/5">
            <div className="flex items-center gap-2.5 pb-4 mb-4 border-b border-slate-100">
              <div className="w-8 h-8 rounded-lg bg-emerald-50 text-[#16a34a] flex items-center justify-center">
                <CheckCircle2 className="w-4 h-4" />
              </div>
              <h3 className="text-base sm:text-lg font-bold text-slate-900">
                Category Performance
              </h3>
            </div>

            <div className="space-y-4 pt-1">
              {categoryProgress.map((item, idx) => (
                <div key={idx} className="space-y-1.5">
                  <div className="flex items-center justify-between text-xs sm:text-sm">
                    <span className="font-semibold text-slate-800">{item.name}</span>
                    <span className="font-bold text-slate-900">
                      {item.amount}{" "}
                      <span className="text-slate-400 font-normal">({item.percentage})</span>
                    </span>
                  </div>
                  <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
                    <div
                      className={`h-2 rounded-full ${item.barColor} transition-all duration-700`}
                      style={{ width: item.width }}
                    />
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 pt-4 border-t border-slate-100 text-[11px] text-slate-400">
              Rule-based spending alerts and proportional category meters derived from your active budget configurations.
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
