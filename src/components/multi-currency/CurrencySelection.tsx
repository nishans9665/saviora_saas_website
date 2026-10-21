"use client";

import React, { useState } from "react";
import {
  Coins,
  ReceiptText,
  SlidersHorizontal,
  CheckCircle2,
  Sparkles,
  ArrowRight,
  TrendingUp,
  Wallet,
  PiggyBank,
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import Link from "next/link";

interface CurrencyOption {
  code: string;
  name: string;
  symbol: string;
  flag: string;
  format: (amount: number) => string;
}

const SUPPORTED_CURRENCIES: CurrencyOption[] = [
  {
    code: "USD",
    name: "US Dollar",
    symbol: "$",
    flag: "🇺🇸",
    format: (amt) => `$${amt.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`,
  },
  {
    code: "EUR",
    name: "Euro",
    symbol: "€",
    flag: "🇪🇺",
    format: (amt) => `€${amt.toLocaleString("de-DE", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`,
  },
  {
    code: "GBP",
    name: "British Pound",
    symbol: "£",
    flag: "🇬🇧",
    format: (amt) => `£${amt.toLocaleString("en-GB", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`,
  },
  {
    code: "CAD",
    name: "Canadian Dollar",
    symbol: "C$",
    flag: "🇨🇦",
    format: (amt) => `C$${amt.toLocaleString("en-CA", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`,
  },
  {
    code: "AUD",
    name: "Australian Dollar",
    symbol: "A$",
    flag: "🇦🇺",
    format: (amt) => `A$${amt.toLocaleString("en-AU", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`,
  },
  {
    code: "JPY",
    name: "Japanese Yen",
    symbol: "¥",
    flag: "🇯🇵",
    format: (amt) => `¥${Math.round(amt).toLocaleString("ja-JP")}`,
  },
];

export function CurrencySelection() {
  const [selectedCurrency, setSelectedCurrency] = useState<CurrencyOption>(
    SUPPORTED_CURRENCIES[0]
  );

  const sampleBalance = 1156.35;
  const sampleIncome = 4392.0;
  const sampleExpenses = 2235.65;
  const sampleSavings = 27131.25;

  return (
    <section className="py-20 sm:py-24 bg-white relative" id="currency-selection">
      <div className="container mx-auto px-4 md:px-6">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-50 border border-emerald-200/80 text-emerald-800 text-xs font-semibold uppercase tracking-wider mb-4 shadow-xs">
            <Coins className="w-3.5 h-3.5 text-primary-600 flex-shrink-0" />
            <span>CURRENCY CONFIGURATION</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 mb-4">
            Your Finances, Your Currency
          </h2>
          <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
            In Saviora&apos;s Localization settings, you can choose a supported main currency that matches how you plan and track your finances. Once saved, your account applies the configured currency formatting across your financial summaries, transaction logs, active budgets, and savings milestones.
          </p>
        </div>

        {/* 3 Core Feature Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 mb-16">
          
          {/* Card 1 */}
          <div className="rounded-3xl border border-slate-200/80 bg-slate-50/50 p-8 hover:shadow-lg hover:border-emerald-200 hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between">
            <div>
              <div className="w-14 h-14 rounded-2xl bg-emerald-100 text-emerald-700 flex items-center justify-center mb-6 shadow-xs">
                <Coins className="w-7 h-7 text-primary-600" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">
                Choose Your Main Currency
              </h3>
              <p className="text-slate-600 leading-relaxed text-sm sm:text-base">
                Select your preferred currency symbol and denomination from the available options in Account Settings. Set the primary currency standard for your entire Saviora workspace.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-slate-200/60 flex items-center gap-2 text-xs font-semibold text-emerald-700">
              <CheckCircle2 className="w-4 h-4 text-primary-500" />
              <span>Independent from country setting</span>
            </div>
          </div>

          {/* Card 2 */}
          <div className="rounded-3xl border border-slate-200/80 bg-slate-50/50 p-8 hover:shadow-lg hover:border-emerald-200 hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between">
            <div>
              <div className="w-14 h-14 rounded-2xl bg-teal-100 text-teal-700 flex items-center justify-center mb-6 shadow-xs">
                <ReceiptText className="w-7 h-7 text-teal-600" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">
                Review Your Financial Activity
              </h3>
              <p className="text-slate-600 leading-relaxed text-sm sm:text-base">
                Review all your income entries, daily expense transactions, remaining budget balances, and savings goal targets formatted cleanly using your selected main currency.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-slate-200/60 flex items-center gap-2 text-xs font-semibold text-emerald-700">
              <CheckCircle2 className="w-4 h-4 text-primary-500" />
              <span>Consistent across all verified views</span>
            </div>
          </div>

          {/* Card 3 */}
          <div className="rounded-3xl border border-slate-200/80 bg-slate-50/50 p-8 hover:shadow-lg hover:border-emerald-200 hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between">
            <div>
              <div className="w-14 h-14 rounded-2xl bg-cyan-100 text-cyan-700 flex items-center justify-center mb-6 shadow-xs">
                <SlidersHorizontal className="w-7 h-7 text-cyan-600" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">
                Personalize Your Settings
              </h3>
              <p className="text-slate-600 leading-relaxed text-sm sm:text-base">
                Easily revisit Settings at any time to adjust your main currency, accounting cycle, or regional timezone whenever your personal finances or location evolve.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-slate-200/60 flex items-center gap-2 text-xs font-semibold text-emerald-700">
              <CheckCircle2 className="w-4 h-4 text-primary-500" />
              <span>Immediate preference updates</span>
            </div>
          </div>

        </div>

        {/* Interactive Currency Preview Sandbox */}
        <div className="rounded-3xl border border-slate-200/90 bg-gradient-to-br from-slate-50 via-white to-emerald-50/30 p-6 sm:p-10 shadow-lg shadow-slate-900/5">
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 pb-6 mb-8 border-b border-slate-200/80">
            <div>
              <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-primary-600 mb-1">
                <Sparkles className="w-4 h-4" />
                <span>Interactive Formatting Preview</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-slate-900">
                See How Your Amounts Format in Different Currencies
              </h3>
              <p className="text-sm text-slate-600 mt-1">
                Tap any supported currency below to see how Saviora applies the currency symbol and formatting to your financial metrics:
              </p>
            </div>

            {/* Currency Selector Pills */}
            <div className="flex flex-wrap gap-2">
              {SUPPORTED_CURRENCIES.map((curr) => {
                const isActive = selectedCurrency.code === curr.code;
                return (
                  <button
                    key={curr.code}
                    type="button"
                    onClick={() => setSelectedCurrency(curr)}
                    className={`inline-flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-200 cursor-pointer ${
                      isActive
                        ? "bg-primary-500 text-white shadow-md shadow-primary-500/25 scale-105"
                        : "bg-white text-slate-700 border border-slate-200/90 hover:bg-slate-100 hover:border-slate-300"
                    }`}
                  >
                    <span>{curr.flag}</span>
                    <span>{curr.code}</span>
                    <span className="opacity-75 text-xs">({curr.symbol})</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Sample Metrics Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            
            {/* Metric 1 */}
            <div className="p-5 rounded-2xl bg-white border border-slate-200/80 shadow-xs">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-medium text-slate-500">Monthly Balance</span>
                <Wallet className="w-4 h-4 text-primary-600" />
              </div>
              <div className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
                {selectedCurrency.format(sampleBalance)}
              </div>
              <span className="text-xs text-slate-400 mt-1 block">Net for October 2026</span>
            </div>

            {/* Metric 2 */}
            <div className="p-5 rounded-2xl bg-white border border-slate-200/80 shadow-xs">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-medium text-slate-500">Monthly Income</span>
                <TrendingUp className="w-4 h-4 text-emerald-600" />
              </div>
              <div className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
                {selectedCurrency.format(sampleIncome)}
              </div>
              <span className="text-xs text-slate-400 mt-1 block">Current month earnings</span>
            </div>

            {/* Metric 3 */}
            <div className="p-5 rounded-2xl bg-white border border-slate-200/80 shadow-xs">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-medium text-slate-500">Monthly Expenses</span>
                <ReceiptText className="w-4 h-4 text-orange-500" />
              </div>
              <div className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
                {selectedCurrency.format(sampleExpenses)}
              </div>
              <span className="text-xs text-slate-400 mt-1 block">Current month spending</span>
            </div>

            {/* Metric 4 */}
            <div className="p-5 rounded-2xl bg-white border border-slate-200/80 shadow-xs">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-medium text-slate-500">Total Savings</span>
                <PiggyBank className="w-4 h-4 text-purple-600" />
              </div>
              <div className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
                {selectedCurrency.format(sampleSavings)}
              </div>
              <span className="text-xs text-slate-400 mt-1 block">Total goal contributions</span>
            </div>

          </div>

          <div className="mt-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs text-slate-500 pt-4 border-t border-slate-100">
            <p>
              <strong className="text-slate-700">Display Note:</strong> Main currency selection configures symbol and number formatting for your account views. It does not automatically recalculate past recorded values through live FX conversions.
            </p>
            <Link
              href="https://cloud.saviora.app/register"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary-600 hover:text-primary-700 font-semibold inline-flex items-center whitespace-nowrap"
            >
              Configure in Saviora <ArrowRight className="w-3.5 h-3.5 ml-1" />
            </Link>
          </div>
        </div>

      </div>
    </section>
  );
}
