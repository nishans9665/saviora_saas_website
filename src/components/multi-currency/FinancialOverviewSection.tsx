"use client";

import React from "react";
import Image from "next/image";
import {
  BarChart3,
  CheckCircle2,
  PieChart,
  Wallet,
  TrendingUp,
  Receipt,
  PiggyBank,
  ArrowUpRight,
} from "lucide-react";
import Link from "next/link";

const VERIFIED_MODULES = [
  {
    icon: Wallet,
    title: "Financial Overview Dashboard",
    description:
      "High-level monthly summaries showing your net balance, total income, current spending, and overall savings formatted with your configured currency.",
    metricExample: "Monthly Balance: $1,628,156.35",
  },
  {
    icon: TrendingUp,
    title: "Income & Cash Inflows",
    description:
      "Monitor earnings across salary, freelance work, investments, and side hustles in the currency you use to plan your livelihood.",
    metricExample: "Monthly Income: $2,649,392.00",
  },
  {
    icon: Receipt,
    title: "Expense Tracking & Budgets",
    description:
      "Record everyday expenses and keep category budgets (such as groceries, transport, housing) organized under one clear financial denomination.",
    metricExample: "Monthly Expenses: $1,021,235.65",
  },
  {
    icon: PiggyBank,
    title: "Savings Goals & Milestones",
    description:
      "Define target milestone figures and track cumulative contributions toward emergency funds, travel, or major purchases.",
    metricExample: "Total Savings: $1,827,131.25",
  },
];

export function FinancialOverviewSection() {
  return (
    <section className="py-20 sm:py-24 bg-white relative" id="financial-overview">
      <div className="container mx-auto px-4 md:px-6">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-50 border border-emerald-200/80 text-emerald-800 text-xs font-semibold uppercase tracking-wider mb-4 shadow-xs">
            <BarChart3 className="w-3.5 h-3.5 text-primary-600 flex-shrink-0" />
            <span>UNIFIED FINANCIAL CLARITY</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 mb-4">
            See Your Finances More Clearly
          </h2>
          <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
            Review your financial activity across Saviora, including income, expenses, budgets, savings goals, and financial analytics.
          </p>
        </div>

        {/* Dashboard Real Screenshot Showcase */}
        <div className="max-w-6xl mx-auto mb-16">
          <div className="rounded-3xl border border-slate-200/90 bg-slate-50/70 p-4 sm:p-7 shadow-xl shadow-slate-900/5">
            
            {/* Top Toolbar */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 mb-4 border-b border-slate-200/70 gap-3 text-xs">
              <div className="flex items-center gap-2.5">
                <span className="font-bold text-slate-800 text-sm">Saviora Financial Dashboard Preview</span>
                <span className="px-2 py-0.5 rounded-md bg-emerald-100 text-emerald-800 font-semibold text-[11px]">
                  Verified USD Display
                </span>
              </div>
              <div className="text-slate-500 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-primary-500 animate-pulse" />
                <span>Financial Period: October 2026 · Status: Open</span>
              </div>
            </div>

            {/* Real Dashboard Image */}
            <div className="relative w-full aspect-[1024/486] rounded-2xl overflow-hidden border border-slate-200/80 bg-white shadow-sm">
              <Image
                src="/images/features/multi-currency/saviora-dashboard-overview.png"
                alt="Saviora Financial Overview dashboard displaying Monthly Balance $1,628,156.35, Monthly Income $2,649,392.00, Monthly Expenses $1,021,235.65, and Total Savings $1,827,131.25"
                fill
                sizes="(max-width: 1200px) 100vw, 1200px"
                className="object-cover object-top"
              />
            </div>

            {/* Verified Data Caption */}
            <div className="mt-4 pt-3 flex flex-wrap items-center justify-between gap-3 text-xs text-slate-500">
              <div className="flex items-center gap-1.5 text-slate-700 font-medium">
                <CheckCircle2 className="w-4 h-4 text-primary-500" />
                <span>Currency symbol and amounts are verified consistently across all primary summary cards</span>
              </div>
              <Link
                href="/financial-analytics"
                className="text-primary-600 hover:text-primary-700 font-semibold inline-flex items-center"
              >
                Explore Analytics Reports <ArrowUpRight className="w-3.5 h-3.5 ml-0.5" />
              </Link>
            </div>
          </div>
        </div>

        {/* 4 Feature Alignment Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
          {VERIFIED_MODULES.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="rounded-2xl border border-slate-200/80 bg-white p-6 shadow-xs hover:shadow-md hover:border-emerald-200 transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="w-10 h-10 rounded-xl bg-emerald-50 text-primary-600 flex items-center justify-center mb-4 border border-emerald-100">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="font-bold text-slate-900 text-base mb-2">
                    {item.title}
                  </h3>
                  <p className="text-slate-600 text-xs sm:text-sm leading-relaxed mb-4">
                    {item.description}
                  </p>
                </div>
                <div className="pt-3 border-t border-slate-100">
                  <span className="text-[11px] font-semibold text-slate-400 block mb-0.5">Verified Sample</span>
                  <span className="text-xs font-mono font-bold text-emerald-700 bg-emerald-50/80 px-2 py-1 rounded inline-block">
                    {item.metricExample}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
