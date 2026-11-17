"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight, Target, Receipt, PieChart, Coins, BarChart3 } from "lucide-react";

interface ContextualFeatureItem {
  title: string;
  description: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  tag: string;
}

const SAVIORA_FEATURES: ContextualFeatureItem[] = [
  {
    title: "Savings Goals Tracker",
    description: "Turn your calculations into achievable targets. Track progress toward emergency funds, home deposits, and retirement.",
    href: "/savings-goals",
    icon: Target,
    tag: "Milestone Tracking",
  },
  {
    title: "Expense Tracker",
    description: "Audit your daily cash outflows. Find surplus money to increase your monthly SIP and compound investment deposits.",
    href: "/expense-tracker",
    icon: Receipt,
    tag: "Cash Flow",
  },
  {
    title: "Monthly Budget Planning",
    description: "Organize income using the 50/30/20 rule. Ensure essential expenses, lifestyle desires, and future savings stay balanced.",
    href: "/monthly-budget-planning",
    icon: PieChart,
    tag: "Budget Systems",
  },
  {
    title: "Multi-Currency Accounts",
    description: "Hold, track, and manage personal accounts across USD, EUR, GBP, AUD, LKR, INR, and 5 other major currencies seamlessly.",
    href: "/multi-currency-management",
    icon: Coins,
    tag: "Global Finance",
  },
  {
    title: "Financial Analytics & Trends",
    description: "Visualize net worth trajectory, spending breakdown, and portfolio accumulation trends with interactive analytics.",
    href: "/financial-analytics",
    icon: BarChart3,
    tag: "Net Worth Insights",
  },
];

interface Props {
  currentCategory?: string;
}

export function InvestmentContextualFeatures({ currentCategory = "Investing" }: Props) {
  return (
    <section className="mt-14 pt-12 border-t border-slate-200/90 print:hidden" aria-labelledby="saviora-features-heading">
      <div className="max-w-3xl mb-6">
        <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[11px] font-bold uppercase tracking-wider bg-slate-100 text-slate-700 mb-2">
          <span>Connected Financial Tools</span>
        </div>
        <h2 id="saviora-features-heading" className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
          Bridge Future Projections with Real-World Money Management
        </h2>
        <p className="text-xs sm:text-sm text-slate-600 mt-1 leading-relaxed">
          Calculators give you the mathematical target — Saviora provides the daily tools to budget, save, and systematically build wealth.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {SAVIORA_FEATURES.slice(0, 3).map((feat, idx) => {
          const Icon = feat.icon;
          return (
            <Link
              key={idx}
              href={feat.href}
              className="group p-5 bg-white rounded-2xl border border-slate-200/80 hover:border-emerald-500/50 hover:shadow-md transition flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="w-9 h-9 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center group-hover:bg-emerald-600 group-hover:text-white transition">
                    <Icon className="w-4 h-4" />
                  </div>
                  <span className="text-[10px] font-semibold text-slate-500 bg-slate-100 px-2 py-0.5 rounded-full">
                    {feat.tag}
                  </span>
                </div>
                <h3 className="text-sm font-bold text-slate-900 group-hover:text-emerald-700 transition">
                  {feat.title}
                </h3>
                <p className="text-xs text-slate-600 mt-1.5 leading-relaxed">
                  {feat.description}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-semibold text-emerald-700 group-hover:text-emerald-800">
                <span>Explore Feature</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
