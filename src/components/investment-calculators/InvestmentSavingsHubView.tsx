"use client";

import { InvestmentContextualFeatures } from "./shared/InvestmentContextualFeatures";

import React, { useState } from "react";
import Link from "next/link";
import {
  TrendingUp,
  PiggyBank,
  Target,
  HeartHandshake,
  Tag,
  TrendingDown,
  BarChart3,
  Sliders,
  ShieldCheck,
  ArrowRight,
  Sparkles,
  Coins,
  CheckCircle2,
  FileSpreadsheet,
  Printer,
  Compass,
} from "lucide-react";
import { ALL_CURRENCY_CODES, SUPPORTED_CURRENCIES } from "@/lib/investment-calculators/currencies";
import { InvestmentBreadcrumb } from "./shared/InvestmentBreadcrumb";
import { InvestmentCalculatorFAQ, FAQItem } from "./shared/InvestmentCalculatorFAQ";
import { InvestmentProductCTA } from "./shared/InvestmentProductCTA";

interface ToolCard {
  id: string;
  name: string;
  href: string;
  category: "investing" | "savings" | "longterm";
  icon: any;
  badge: string;
  description: string;
  keyOutputs: string[];
}

const TOOLS: ToolCard[] = [
  {
    id: "investment-return",
    name: "Investment Return Calculator",
    href: "/free-tools/investment-return-calculator",
    category: "investing",
    icon: TrendingUp,
    badge: "CAGR & Net ROI",
    description: "Calculate total percentage return and Compound Annual Growth Rate (CAGR) with cash flow timing, dividends, and fee deductions.",
    keyOutputs: ["CAGR (%)", "Net Investment Gain", "Fee Impact", "Total ROI"],
  },
  {
    id: "sip",
    name: "SIP Calculator",
    href: "/free-tools/sip-calculator",
    category: "investing",
    icon: Sliders,
    badge: "Systematic Plans",
    description: "Estimate future portfolio values from recurring weekly, monthly, or quarterly mutual fund and index ETF contributions.",
    keyOutputs: ["Future Wealth", "Total Invested", "Compound Growth", "Growth Multiple"],
  },
  {
    id: "savings-goal",
    name: "Savings Goal Calculator",
    href: "/free-tools/savings-goal-calculator",
    category: "savings",
    icon: Target,
    badge: "Target Sinking Fund",
    description: "Determine the exact weekly, monthly, or annual cash deposits needed to reach a down payment, car purchase, or education target.",
    keyOutputs: ["Required Monthly Deposit", "Weekly Equivalent", "Interest Earned", "Goal Timeline"],
  },
  {
    id: "retirement",
    name: "Retirement Calculator",
    href: "/free-tools/retirement-calculator",
    category: "longterm",
    icon: HeartHandshake,
    badge: "Nest Egg & Readiness",
    description: "Project how savings accumulate, factor in future inflation-adjusted living costs, and model decumulation during retirement.",
    keyOutputs: ["Required Corpus", "Shortfall/Surplus", "Future Monthly Cost", "Recommended Savings"],
  },
  {
    id: "investment-profit-loss",
    name: "Investment Profit & Loss Calculator",
    href: "/free-tools/investment-profit-loss-calculator",
    category: "investing",
    icon: Tag,
    badge: "Stock & Share Trading",
    description: "Calculate trading profits, percentage gains, brokerage commissions, dividend additions, and your exact break-even price.",
    keyOutputs: ["Net Profit/Loss", "Return %", "Break-Even Price", "Target Price Levels"],
  },
  {
    id: "inflation",
    name: "Inflation Calculator",
    href: "/free-tools/inflation-calculator",
    category: "longterm",
    icon: TrendingDown,
    badge: "Purchasing Power",
    description: "Understand how annual inflation erodes the purchasing power of your money over 1 to 30 years and calculate price doubling times.",
    keyOutputs: ["Future Equivalent Cost", "Purchasing Power Loss", "Inflation Impact", "Doubling Time"],
  },
  {
    id: "monthly-savings",
    name: "Monthly Savings Calculator",
    href: "/free-tools/monthly-savings-calculator",
    category: "savings",
    icon: PiggyBank,
    badge: "Compound Deposits",
    description: "Estimate how disciplined monthly deposits accumulate in high-yield bank savings, certificates, and interest-bearing accounts.",
    keyOutputs: ["Final Balance", "Principal Saved", "Interest Earned", "Cash Comparison"],
  },
  {
    id: "roi",
    name: "ROI Calculator",
    href: "/free-tools/roi-calculator",
    category: "investing",
    icon: BarChart3,
    badge: "Capital Efficiency",
    description: "Evaluate the profitability of any investment. Calculate simple and annualized ROI with ongoing operational expenses and cash inflows.",
    keyOutputs: ["ROI %", "Net Profit", "Annualized Return", "Target 20% & 50% Levels"],
  },
  {
    id: "investment-growth",
    name: "Investment Growth Calculator",
    href: "/free-tools/investment-growth-calculator",
    category: "longterm",
    icon: TrendingUp,
    badge: "Portfolio Simulator",
    description: "Simulate multi-year portfolio accumulation with recurring deposits, custom compounding frequencies, and expense ratio fees.",
    keyOutputs: ["Net Future Value", "Total Invested", "Compound Growth", "Expense Deductions"],
  },
  {
    id: "emergency-fund",
    name: "Emergency Fund Calculator",
    href: "/free-tools/emergency-fund-calculator",
    category: "savings",
    icon: ShieldCheck,
    badge: "Safety Reserve",
    description: "Calculate your ideal 3 to 12-month emergency cash buffer based on essential monthly shelter, food, utility, and debt costs.",
    keyOutputs: ["Emergency Target", "Remaining Gap", "Months to Safety", "Milestone Tiers"],
  },
];

const HUB_FAQS: FAQItem[] = [
  {
    question: "Do I need to create an account or provide financial login credentials?",
    answer: "No. All ten Saviora Investment & Savings calculators operate completely in your web browser. We never ask for account credentials or store your private calculation inputs.",
  },
  {
    question: "Can I export or print my calculation results?",
    answer: "Yes. Every calculator supports full CSV data export of year-by-year growth projections and includes a dedicated Print / PDF Report feature that generates a clean, input-value-wise assessment document.",
  },
  {
    question: "How does currency selection work?",
    answer: "You can switch between 11 major global currencies (USD, GBP, EUR, AUD, CAD, INR, LKR, SGD, AED, NZD, JPY) at any time. The currency selector formats symbols, commas, and decimal precisions according to international conventions without altering your input numbers.",
  },
];

export function InvestmentSavingsHubView() {
  const [filter, setFilter] = useState<"all" | "investing" | "savings" | "longterm">("all");

  const filteredTools = TOOLS.filter((t) => filter === "all" || t.category === filter);

  return (
    <div className="pt-32 sm:pt-36 lg:pt-40 pb-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Breadcrumb */}
      <InvestmentBreadcrumb items={[]} />

      {/* Hero Section */}
      <div className="text-center max-w-3xl mx-auto mb-12">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200/60 mb-3 shadow-2xs">
          <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
          <span>Free Global Wealth &amp; Savings Tools</span>
        </div>

        <h1 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight leading-tight">
          Investment &amp; Savings Calculators
        </h1>

        <p className="mt-4 text-base sm:text-lg text-slate-600 leading-relaxed">
          Plan your financial goals, project compound wealth, calculate investment returns, SIP growth,
          retirement readiness, and inflation erosion with our free suite of interactive financial tools.
        </p>

        {/* Global Currency Support Badges */}
        <div className="mt-6 flex flex-wrap items-center justify-center gap-2">
          <span className="text-xs font-semibold text-slate-500 mr-1 flex items-center gap-1">
            <Coins className="w-3.5 h-3.5 text-emerald-600" />
            <span>Supported Currencies:</span>
          </span>
          {ALL_CURRENCY_CODES.map((code) => {
            const cfg = SUPPORTED_CURRENCIES[code];
            return (
              <span
                key={code}
                className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[11px] font-semibold bg-white border border-slate-200 text-slate-700 shadow-2xs"
              >
                <span className="text-emerald-600 font-bold">{cfg.symbol.trim()}</span>
                <span>{code}</span>
              </span>
            );
          })}
        </div>

        {/* Value Proposition Badges */}
        <div className="mt-6 flex flex-wrap items-center justify-center gap-4 text-xs font-medium text-slate-600">
          <span className="flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            100% Free &amp; No Registration
          </span>
          <span className="flex items-center gap-1.5">
            <FileSpreadsheet className="w-4 h-4 text-emerald-600" />
            Export Schedules to CSV
          </span>
          <span className="flex items-center gap-1.5">
            <Printer className="w-4 h-4 text-emerald-600" />
            Download Official PDF Reports
          </span>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center justify-center gap-2 mb-8 flex-wrap">
        {[
          { key: "all", label: "All 10 Calculators" },
          { key: "investing", label: "Investing & Returns" },
          { key: "savings", label: "Savings & Targets" },
          { key: "longterm", label: "Long-Term & Retirement" },
        ].map((tab) => (
          <button
            key={tab.key}
            type="button"
            onClick={() => setFilter(tab.key as any)}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition shadow-2xs cursor-pointer ${
              filter === tab.key
                ? "bg-slate-900 text-white shadow-sm"
                : "bg-white text-slate-600 hover:text-slate-900 border border-slate-200"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tools Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredTools.map((t) => {
          const Icon = t.icon;
          return (
            <Link
              key={t.id}
              href={t.href}
              className="group bg-white rounded-2xl p-6 border border-slate-200/80 hover:border-emerald-400 hover:shadow-lg transition flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="p-2.5 rounded-xl bg-emerald-50 text-emerald-600 group-hover:bg-emerald-600 group-hover:text-white transition">
                    <Icon className="w-5 h-5" />
                  </div>
                  <span className="text-[11px] font-bold text-emerald-800 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-100">
                    {t.badge}
                  </span>
                </div>

                <h2 className="text-base font-bold text-slate-900 group-hover:text-emerald-700 transition">
                  {t.name}
                </h2>

                <p className="mt-2 text-xs text-slate-500 leading-relaxed">
                  {t.description}
                </p>

                {/* Key Outputs Pill */}
                <div className="mt-4 pt-3 border-t border-slate-100 flex flex-wrap gap-1.5">
                  {t.keyOutputs.map((out, idx) => (
                    <span
                      key={idx}
                      className="px-2 py-0.5 rounded text-[10px] font-medium bg-slate-50 text-slate-600 border border-slate-100"
                    >
                      {out}
                    </span>
                  ))}
                </div>
              </div>

              <div className="mt-5 pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-emerald-700 group-hover:text-emerald-800">
                <span>Launch Calculator</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>
          );
        })}
      </div>

      {/* Educational Architecture: 4 Financial Pillars */}
      <section className="mt-16 bg-white rounded-3xl p-6 sm:p-10 border border-slate-200/90 shadow-xs" aria-labelledby="pillars-heading">
        <div className="max-w-3xl mb-8">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md text-[11px] font-bold uppercase tracking-wider bg-slate-100 text-slate-700 mb-2">
            <span>Structured Financial Planning</span>
          </div>
          <h2 id="pillars-heading" className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
            The Four Pillars of Personal Wealth Building
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 mt-1.5 leading-relaxed">
            Successful personal financial management requires balancing cash resilience, compound growth, targeted goals, and disciplined risk management.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-5 rounded-2xl bg-slate-50/80 border border-slate-200/70">
            <h3 className="text-sm font-bold text-slate-900 mb-1.5">1. Emergency Cushion &amp; Purchasing Power</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Before allocating capital to volatile assets, establish a 3-to-6 month liquid emergency fund in a high-yield account. Understand how compound inflation degrades uninvested cash over 10 to 30 years to protect purchasing power.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-slate-50/80 border border-slate-200/70">
            <h3 className="text-sm font-bold text-slate-900 mb-1.5">2. Disciplined Dollar-Cost Averaging (SIP)</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Automating recurring monthly investments through Systematic Investment Plans (SIP) eliminates the temptation to time market cycles, capturing compound market appreciation and dividend reinvestment automatically.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-slate-50/80 border border-slate-200/70">
            <h3 className="text-sm font-bold text-slate-900 mb-1.5">3. Sinking Funds &amp; Milestone Planning</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Rather than taking on high-interest personal loans, use sinking funds to pre-fund major life goals (home down payment, wedding, education) by calculating the exact monthly deposit needed at competitive interest yields.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-slate-50/80 border border-slate-200/70">
            <h3 className="text-sm font-bold text-slate-900 mb-1.5">4. Long-Term Retirement Independence</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Project your retirement nest egg using safe withdrawal rate benchmarks (e.g., the 4% rule). Factor in post-retirement healthcare inflation and calculate the exact monthly savings required during active earning years.
            </p>
          </div>
        </div>
      </section>

      {/* Contextual Saviora Core Features */}
      <InvestmentContextualFeatures currentCategory="Wealth &amp; Savings Tools" />

      {/* FAQs */}
      <InvestmentCalculatorFAQ faqs={HUB_FAQS} title="Investment &amp; Savings Tools FAQ" />

      {/* Saviora Product CTA */}
      <InvestmentProductCTA />
    </div>
  );
}
