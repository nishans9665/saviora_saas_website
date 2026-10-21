"use client";

import React from "react";
import { SavioraInteractiveDashboard } from "./SavioraInteractiveDashboard";
import {
  BarChart3,
  Wallet,
  TrendingUp,
  Receipt,
  PiggyBank,
} from "lucide-react";

const VERIFIED_MODULES = [
  {
    icon: Wallet,
    title: "Financial Overview Dashboard",
    description:
      "High-level monthly summaries showing your net balance, total income, current spending, and overall savings formatted with your configured currency.",
  },
  {
    icon: TrendingUp,
    title: "Income & Cash Inflows",
    description:
      "Monitor earnings across salary, freelance work, investments, and side hustles in the currency you use to plan your livelihood.",
  },
  {
    icon: Receipt,
    title: "Expense Tracking & Budgets",
    description:
      "Record everyday expenses and keep category budgets (such as groceries, transport, housing) organized under one clear financial denomination.",
  },
  {
    icon: PiggyBank,
    title: "Savings Goals & Milestones",
    description:
      "Define target milestone figures and track cumulative contributions toward emergency funds, travel, or major purchases.",
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

        {/* Interactive Dashboard Showcase (Matching Home Dashboard) */}
        <div className="max-w-6xl mx-auto mb-16">
          <SavioraInteractiveDashboard />
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
                  <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
