"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Calculator,
  ArrowRight,
  Sparkles,
  CreditCard,
  Home,
  Car,
  TrendingUp,
  Landmark,
  ShieldCheck,
  CheckCircle2,
  DollarSign,
  HelpCircle,
} from "lucide-react";
import { LoanProductCTA } from "./shared/LoanProductCTA";

interface ToolCard {
  title: string;
  description: string;
  href: string;
  category: "borrowing" | "investing" | "debt";
  badge: string;
  icon: any;
  formula: string;
}

const ALL_LOAN_TOOLS: ToolCard[] = [
  {
    title: "Loan EMI Calculator",
    description: "Calculate periodic loan instalments, total interest payable, and export complete amortization schedules.",
    href: "/free-tools/loan-emi-calculator",
    category: "borrowing",
    badge: "Most Popular",
    icon: Calculator,
    formula: "EMI = [P × r × (1+r)^n] / [(1+r)^n - 1]",
  },
  {
    title: "Personal Loan Calculator",
    description: "Compare reducing balance vs flat rate loans, factor in lender processing fees, and see true APR.",
    href: "/free-tools/personal-loan-calculator",
    category: "borrowing",
    badge: "Personal Finance",
    icon: DollarSign,
    formula: "Total Cost = Interest + Processing Fees",
  },
  {
    title: "Home Loan & Mortgage Calculator",
    description: "Estimate mortgage payments with property taxes, home insurance, HOA dues, and extra payment accelerators.",
    href: "/free-tools/home-loan-calculator",
    category: "borrowing",
    badge: "Mortgage",
    icon: Home,
    formula: "P&I + Taxes + Insurance + HOA",
  },
  {
    title: "Vehicle Loan Calculator",
    description: "Calculate auto financing with trade-in credits, sales tax, dealer fees, and side-by-side tenure comparisons.",
    href: "/free-tools/vehicle-loan-calculator",
    category: "borrowing",
    badge: "Auto Finance",
    icon: Car,
    formula: "Financed = Price - Down - TradeIn + Fees",
  },
  {
    title: "Simple Interest Calculator",
    description: "Calculate linear simple interest on promissory notes, deposits, and short loans across days, months, and years.",
    href: "/free-tools/simple-interest-calculator",
    category: "investing",
    badge: "Linear Returns",
    icon: Calculator,
    formula: "Simple Interest = P × r × t",
  },
  {
    title: "Compound Interest Calculator",
    description: "Project wealth compounding with regular monthly deposits, custom compounding frequencies, and growth tables.",
    href: "/free-tools/compound-interest-calculator",
    category: "investing",
    badge: "Wealth Growth",
    icon: TrendingUp,
    formula: "A = P(1 + r/n)^(nt) + Contributions",
  },
  {
    title: "Fixed Deposit (FD) Calculator",
    description: "Calculate bank term deposit maturity values with cumulative compounding vs regular monthly or quarterly payouts.",
    href: "/free-tools/fixed-deposit-calculator",
    category: "investing",
    badge: "Term Deposits",
    icon: Landmark,
    formula: "Gross Interest - Withholding Tax = Net Return",
  },
  {
    title: "Credit Card Interest Calculator",
    description: "Calculate credit card payoff timelines, expose the minimum payment trap, and avoid negative amortization.",
    href: "/free-tools/credit-card-interest-calculator",
    category: "debt",
    badge: "Credit Relief",
    icon: CreditCard,
    formula: "Monthly Interest = Balance × (APR / 12)",
  },
  {
    title: "Debt Repayment Calculator",
    description: "Combine multiple debts into a structured Debt Snowball or Debt Avalanche plan and track your debt-free milestone.",
    href: "/free-tools/debt-repayment-calculator",
    category: "debt",
    badge: "Debt Free",
    icon: ShieldCheck,
    formula: "Snowball vs Avalanche Payoff Acceleration",
  },
];

export function LoanFinancialHubView() {
  const [filter, setFilter] = useState<"all" | "borrowing" | "investing" | "debt">("all");

  const filteredTools = ALL_LOAN_TOOLS.filter((t) => {
    if (filter === "all") return true;
    return t.category === filter;
  });

  return (
    <div className="pt-32 sm:pt-36 lg:pt-40 pb-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Category Hero */}
      <div className="text-center max-w-4xl mx-auto mb-12">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200/60 text-xs font-semibold mb-4 shadow-2xs">
          <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
          <span>9 Free Interactive Financial Tools</span>
        </div>

        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-gray-900 tracking-tight leading-tight">
          Free Loan &amp; Financial Calculators
        </h1>

        <p className="mt-4 text-base sm:text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
          Plan borrowing, project investment returns, and eliminate debt faster with Saviora&apos;s verified in-browser financial calculators. 100% free with no registration required.
        </p>

        {/* Filter Pills */}
        <div className="flex flex-wrap items-center justify-center gap-2 mt-8">
          {[
            { id: "all", label: "All 9 Calculators" },
            { id: "borrowing", label: "Borrowing & Loans (4)" },
            { id: "investing", label: "Investing & Growth (3)" },
            { id: "debt", label: "Debt Elimination (2)" },
          ].map((btn) => (
            <button
              key={btn.id}
              type="button"
              onClick={() => setFilter(btn.id as any)}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition ${
                filter === btn.id
                  ? "bg-emerald-600 text-white shadow-xs"
                  : "bg-white text-gray-700 hover:bg-gray-50 border border-gray-200"
              }`}
            >
              {btn.label}
            </button>
          ))}
        </div>
      </div>

      {/* Tools Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredTools.map((tool, idx) => {
          const Icon = tool.icon;
          return (
            <Link
              key={idx}
              href={tool.href}
              className="group bg-white rounded-3xl p-6 border border-gray-200/80 shadow-2xs hover:border-emerald-400 hover:shadow-md transition flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="w-10 h-10 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center shadow-2xs">
                    <Icon className="w-5 h-5" />
                  </span>
                  <span className="text-[10px] font-bold text-emerald-800 bg-emerald-100/70 px-2.5 py-1 rounded-full">
                    {tool.badge}
                  </span>
                </div>

                <h3 className="text-base font-bold text-gray-900 group-hover:text-emerald-600 transition">
                  {tool.title}
                </h3>
                <p className="text-xs text-gray-600 mt-2 line-clamp-3 leading-relaxed">
                  {tool.description}
                </p>

                <div className="mt-4 p-2.5 rounded-xl bg-gray-50 border border-gray-100 text-[11px] font-mono text-gray-500">
                  {tool.formula}
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-gray-100 flex items-center justify-between text-xs font-semibold text-emerald-600 group-hover:text-emerald-700">
                <span>Open Calculator</span>
                <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition" />
              </div>
            </Link>
          );
        })}
      </div>

      {/* Cross link to Salary & Tax category */}
      <div className="mt-12 p-6 rounded-3xl bg-slate-900 text-white flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <h3 className="text-base font-bold">Looking for Gross-to-Net Pay or Income Tax Calculators?</h3>
          <p className="text-xs text-slate-300 mt-1">
            Explore Saviora&apos;s 8 Salary, Income Tax, EPF, ETF, and VAT calculators tailored for US, UK, Australia, Canada, India, and Sri Lanka.
          </p>
        </div>
        <Link
          href="/free-tools/salary-and-tax-tools"
          className="whitespace-nowrap px-4 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white font-bold text-xs shadow-md transition flex items-center gap-1.5"
        >
          <span>Explore Salary &amp; Tax Tools</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>

      {/* Saviora Product CTA */}
      <LoanProductCTA />
    </div>
  );
}
