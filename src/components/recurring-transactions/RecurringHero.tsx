"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  RefreshCw,
  ArrowRight,
  CheckCircle2,
  Plus,
  Landmark,
  Home,
  Tv,
  Zap,
  MoreVertical,
  } from "lucide-react";
import { Button } from "@/components/ui/Button";

interface TransactionItem {
  id: string;
  title: string;
  category: string;
  type: "income" | "expense";
  frequency: string;
  amount: string;
  status: "Received" | "Completed" | "Scheduled";
  nextDate: string;
  icon: React.ComponentType<{ className?: string }>;
  iconBg: string;
  iconColor: string;
  amountColor: string;
}

const mockTransactions: TransactionItem[] = [
  {
    id: "tx-1",
    title: "Monthly Salary",
    category: "Income • Monthly",
    type: "income",
    frequency: "Monthly",
    amount: "+$3,500.00",
    status: "Received",
    nextDate: "Dec 1, 2026",
    icon: Landmark,
    iconBg: "bg-emerald-50 border-emerald-200/80",
    iconColor: "text-emerald-600",
    amountColor: "text-emerald-600",
  },
  {
    id: "tx-2",
    title: "Apartment Rent",
    category: "Expense • Monthly",
    type: "expense",
    frequency: "Monthly",
    amount: "-$1,200.00",
    status: "Completed",
    nextDate: "Dec 1, 2026",
    icon: Home,
    iconBg: "bg-rose-50 border-rose-200/80",
    iconColor: "text-rose-600",
    amountColor: "text-slate-900",
  },
  {
    id: "tx-3",
    title: "Netflix Subscription",
    category: "Expense • Monthly",
    type: "expense",
    frequency: "Monthly",
    amount: "-$15.99",
    status: "Scheduled",
    nextDate: "Nov 18, 2026",
    icon: Tv,
    iconBg: "bg-red-50 border-red-200/80",
    iconColor: "text-red-500",
    amountColor: "text-slate-900",
  },
  {
    id: "tx-4",
    title: "Electricity Bill",
    category: "Expense • Monthly",
    type: "expense",
    frequency: "Monthly",
    amount: "-$85.00",
    status: "Scheduled",
    nextDate: "Nov 24, 2026",
    icon: Zap,
    iconBg: "bg-amber-50 border-amber-200/80",
    iconColor: "text-amber-500",
    amountColor: "text-slate-900",
  },
];

export function RecurringHero() {
  const [activeFilter, setActiveFilter] = useState<"all" | "income" | "expense">("all");
  const [selectedTx, setSelectedTx] = useState<string | null>(null);

  const filteredTransactions = mockTransactions.filter((tx) => {
    if (activeFilter === "income") return tx.type === "income";
    if (activeFilter === "expense") return tx.type === "expense";
    return true;
  });

  const handleTrialClick = () => {
    if (typeof window !== "undefined" && (window as unknown as Record<string, unknown>).gtag) {
      const gtag = (window as unknown as Record<string, (action: string, eventName: string, params: Record<string, string>) => void>).gtag;
      gtag("event", "recurring_transactions_trial_click", {
        event_category: "conversion",
        event_label: "hero_cta",
      });
    }
  };

  return (
    <section className="relative pt-32 pb-20 sm:pt-36 sm:pb-24 lg:pt-40 lg:pb-28 overflow-hidden bg-gradient-to-b from-emerald-50/40 via-white to-slate-50/50">
      {/* Background Glows */}
      <div className="absolute top-12 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-gradient-to-tr from-emerald-200/25 to-teal-100/20 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute top-40 right-10 w-72 h-72 bg-emerald-100/30 rounded-full blur-2xl pointer-events-none -z-10" />

      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Headline and CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.21, 0.47, 0.32, 0.98] }}
            className="lg:col-span-6 text-left"
          >
            {/* Eyebrow Pill */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-100/80 border border-emerald-200/90 text-emerald-800 text-xs font-semibold uppercase tracking-wider mb-6 shadow-2xs">
              <RefreshCw className="w-3.5 h-3.5 text-emerald-600 animate-spin-slow" />
              <span>RECURRING TRANSACTIONS</span>
            </div>

            {/* H1 */}
            <h1 className="text-3xl sm:text-4xl lg:text-[46px] font-extrabold tracking-tight text-slate-900 leading-[1.16] mb-6">
              Manage Recurring Income and Expenses Without{" "}
              <span className="text-[#16a34a]">Repetitive Manual Tracking</span>
            </h1>

            {/* Description */}
            <p className="text-base sm:text-lg text-slate-600 leading-relaxed mb-8 max-w-xl">
              Set up repeating income and expenses with Saviora. Organize salaries, rent, bills, and subscriptions using flexible schedules while keeping your financial records updated automatically.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 mb-8">
              <Button
                asChild
                size="lg"
                className="bg-[#22c55e] hover:bg-[#16a34a] text-white font-semibold rounded-full px-7 py-3.5 shadow-md shadow-[#22c55e]/25 hover:shadow-lg hover:shadow-[#22c55e]/35 hover:-translate-y-0.5 transition-all duration-300 justify-center cursor-pointer text-sm sm:text-base"
                onClick={handleTrialClick}
              >
                <Link
                  href="https://cloud.saviora.app/register"
                  target="_blank"
                  className="flex items-center justify-center gap-2"
                >
                  <span>Start 90-Day Free Trial</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </Button>

              <Button
                asChild
                size="lg"
                variant="outline"
                className="bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 hover:border-slate-300 font-semibold rounded-full px-7 py-3.5 shadow-2xs transition-all duration-300 justify-center cursor-pointer text-sm sm:text-base"
              >
                <Link href="/features" className="flex items-center justify-center">
                  Explore Features
                </Link>
              </Button>
            </div>

            {/* Feature Highlights */}
            <div className="flex flex-wrap items-center gap-4 sm:gap-6 text-sm text-slate-600 pt-2 border-t border-slate-200/70">
              <div className="flex items-center gap-2 font-medium">
                <CheckCircle2 className="w-4 h-4 text-[#16a34a] flex-shrink-0" />
                <span>Save time</span>
              </div>
              <div className="flex items-center gap-2 font-medium">
                <CheckCircle2 className="w-4 h-4 text-[#16a34a] flex-shrink-0" />
                <span>Stay on track</span>
              </div>
              <div className="flex items-center gap-2 font-medium">
                <CheckCircle2 className="w-4 h-4 text-[#16a34a] flex-shrink-0" />
                <span>Keep budgets accurate</span>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Hero Interactive Product Preview Mockup */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.15, ease: [0.21, 0.47, 0.32, 0.98] }}
            className="lg:col-span-6"
          >
            <div className="relative mx-auto max-w-lg lg:max-w-none">
              
              {/* Outer decorative card frame with soft glow */}
              <div className="rounded-3xl border border-slate-200/90 bg-white shadow-xl shadow-slate-200/60 p-5 sm:p-7 relative backdrop-blur-xs">
                
                {/* Card Header: Matching the visual mockup */}
                <div className="flex items-center justify-between gap-4 pb-5 border-b border-slate-100">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-emerald-50 border border-emerald-100 flex items-center justify-center text-[#16a34a]">
                      <RefreshCw className="w-5 h-5 animate-spin-slow" />
                    </div>
                    <div>
                      <h2 className="text-base sm:text-lg font-bold text-slate-900 leading-tight">
                        Recurring Transactions
                      </h2>
                      <p className="text-xs text-slate-500">
                        Automated record keeping
                      </p>
                    </div>
                  </div>

                  <button
                    type="button"
                    className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-[#22c55e] hover:bg-[#16a34a] text-white text-xs font-semibold shadow-xs hover:shadow-sm transition-all duration-200 cursor-default"
                    aria-label="Add Recurring transaction demonstration"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>+ Add Recurring</span>
                  </button>
                </div>

                {/* Filter Tabs */}
                <div className="flex items-center gap-2 pt-4 pb-3">
                  <button
                    type="button"
                    onClick={() => setActiveFilter("all")}
                    className={`px-3 py-1 rounded-lg text-xs font-medium transition-all ${
                      activeFilter === "all"
                        ? "bg-slate-900 text-white"
                        : "bg-slate-100 text-slate-600 hover:bg-slate-200/70"
                    }`}
                  >
                    All (4)
                  </button>
                  <button
                    type="button"
                    onClick={() => setActiveFilter("income")}
                    className={`px-3 py-1 rounded-lg text-xs font-medium transition-all ${
                      activeFilter === "income"
                        ? "bg-emerald-600 text-white"
                        : "bg-slate-100 text-slate-600 hover:bg-slate-200/70"
                    }`}
                  >
                    Income (1)
                  </button>
                  <button
                    type="button"
                    onClick={() => setActiveFilter("expense")}
                    className={`px-3 py-1 rounded-lg text-xs font-medium transition-all ${
                      activeFilter === "expense"
                        ? "bg-rose-600 text-white"
                        : "bg-slate-100 text-slate-600 hover:bg-slate-200/70"
                    }`}
                  >
                    Expenses (3)
                  </button>
                </div>

                {/* Transactions List */}
                <div className="space-y-2.5 pt-1">
                  {filteredTransactions.map((tx) => {
                    const Icon = tx.icon;
                    const isSelected = selectedTx === tx.id;
                    return (
                      <div
                        key={tx.id}
                        onClick={() => setSelectedTx(isSelected ? null : tx.id)}
                        className={`flex items-center justify-between p-3 sm:p-3.5 rounded-2xl border transition-all duration-200 cursor-pointer ${
                          isSelected
                            ? "bg-emerald-50/40 border-emerald-300 shadow-2xs"
                            : "bg-white hover:bg-slate-50/80 border-slate-100/90 hover:border-slate-200"
                        }`}
                      >
                        {/* Left: Icon and Details */}
                        <div className="flex items-center gap-3 min-w-0">
                          <div
                            className={`w-10 h-10 rounded-xl flex items-center justify-center border flex-shrink-0 ${tx.iconBg} ${tx.iconColor}`}
                          >
                            <Icon className="w-5 h-5" />
                          </div>

                          <div className="min-w-0">
                            <div className="font-semibold text-sm text-slate-900 truncate">
                              {tx.title}
                            </div>
                            <div className="text-xs text-slate-500 flex items-center gap-1.5 truncate">
                              <span>{tx.category}</span>
                              <span className="text-slate-300">•</span>
                              <span className="text-slate-400">Next: {tx.nextDate}</span>
                            </div>
                          </div>
                        </div>

                        {/* Right: Amount & Status Badge */}
                        <div className="flex items-center gap-2.5 sm:gap-3 flex-shrink-0 ml-3">
                          <span className={`text-sm sm:text-base font-bold ${tx.amountColor}`}>
                            {tx.amount}
                          </span>

                          <span
                            className={`px-2.5 py-1 rounded-full text-xs font-semibold tracking-tight ${
                              tx.status === "Received" || tx.status === "Completed"
                                ? "bg-emerald-100/90 text-emerald-800 border border-emerald-200/60"
                                : "bg-sky-100/90 text-sky-800 border border-sky-200/60"
                            }`}
                          >
                            {tx.status}
                          </span>

                          <button
                            type="button"
                            aria-label={`Options for ${tx.title}`}
                            className="text-slate-400 hover:text-slate-600 p-1 rounded-lg hover:bg-slate-100 transition-colors"
                          >
                            <MoreVertical className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Summary Footer Bar */}
                <div className="mt-4 pt-4 border-t border-slate-100 grid grid-cols-3 gap-2 text-center bg-slate-50/70 p-3 rounded-2xl border border-slate-100">
                  <div>
                    <span className="block text-[11px] font-medium text-slate-500 uppercase tracking-wider">
                      Monthly In
                    </span>
                    <span className="text-xs sm:text-sm font-bold text-emerald-600">
                      +$3,500.00
                    </span>
                  </div>
                  <div className="border-x border-slate-200/70">
                    <span className="block text-[11px] font-medium text-slate-500 uppercase tracking-wider">
                      Monthly Out
                    </span>
                    <span className="text-xs sm:text-sm font-bold text-slate-800">
                      -$1,300.99
                    </span>
                  </div>
                  <div>
                    <span className="block text-[11px] font-medium text-slate-500 uppercase tracking-wider">
                      Net Recurring
                    </span>
                    <span className="text-xs sm:text-sm font-bold text-[#16a34a]">
                      +$2,199.01
                    </span>
                  </div>
                </div>

                {/* Subtitle clarification */}
                {/* <p className="mt-3 text-center text-[11px] text-slate-400">
                  Illustrative demonstration. Automates transaction entries and records, not bank withdrawals.
                </p> */}

              </div>

            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
