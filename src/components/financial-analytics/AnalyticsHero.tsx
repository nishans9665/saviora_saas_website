"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import {
  ArrowRight,
  CheckCircle2,
  BarChart4,
  LayoutDashboard,
  TrendingUp,
  CreditCard,
  PieChart,
  Target,
  Settings,
  Calendar,
  Download,
  DollarSign,
  TrendingDown,
  Clock,
  ChevronDown,
  Sun,
  Moon,
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import logoSaviora from "@/assets/logo/logo-saviora-web-tag.svg";

export function AnalyticsHero() {
  const handlePrimaryCtaClick = () => {
    if (typeof window !== "undefined" && (window as unknown as Record<string, unknown>).gtag) {
      const gtag = (window as unknown as Record<string, (action: string, eventName: string, params: Record<string, string>) => void>).gtag;
      gtag("event", "financial_analytics_trial_click", {
        event_category: "conversion",
        event_label: "hero_cta",
      });
    }
  };

  return (
    <section className="relative pt-28 sm:pt-32 md:pt-36 pb-16 sm:pb-24 overflow-hidden bg-gradient-to-b from-amber-50/40 via-slate-50/50 to-white">
      {/* Ambient background glows */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[600px] bg-[radial-gradient(ellipse_75%_55%_at_50%_0%,rgba(245,158,11,0.08),transparent_70%)]" />
        <div className="absolute top-24 right-[-80px] w-96 h-96 bg-[#22c55e]/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute top-48 left-[-100px] w-96 h-96 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
      </div>

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-10 items-center">
          {/* Left Column: Heading, Copy & CTAs */}
          <div className="lg:col-span-6 xl:col-span-6 text-left flex flex-col items-start">
            {/* Eyebrow Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-100/80 border border-amber-200/80 text-amber-800 text-xs font-semibold uppercase tracking-wider mb-6 shadow-xs">
              <BarChart4 className="w-3.5 h-3.5 text-amber-600 flex-shrink-0" />
              <span>FINANCIAL ANALYTICS &amp; REPORTS</span>
            </div>

            {/* H1 Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-[52px] font-extrabold tracking-tight text-slate-900 leading-[1.14] mb-6">
              Understand Your Finances with{" "}
              <span className="text-[#16a34a] relative inline-block">
                Clear, Visual Analytics
              </span>
            </h1>

            {/* Description */}
            <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-xl mb-8">
              Turn your financial activity into a clearer picture of your money. Saviora Financial Analytics helps you review spending patterns, compare income and expenses, understand category-level spending, and explore detailed expense reports in one place.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 w-full sm:w-auto mb-8">
              <Button
                asChild
                size="lg"
                className="bg-[#22c55e] hover:bg-[#16a34a] text-white font-semibold rounded-full px-7 py-3.5 shadow-md shadow-[#22c55e]/25 hover:shadow-lg hover:shadow-[#22c55e]/35 hover:-translate-y-0.5 transition-all duration-300 justify-center cursor-pointer"
                onClick={handlePrimaryCtaClick}
              >
                <Link
                  href="https://cloud.saviora.app/register"
                  target="_blank"
                  className="flex items-center justify-center"
                >
                  <span>Get Started</span>
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Link>
              </Button>

              <Button
                asChild
                size="lg"
                variant="outline"
                className="bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 hover:border-slate-300 font-semibold rounded-full px-7 py-3.5 shadow-xs transition-all duration-300 justify-center cursor-pointer"
              >
                <Link href="/features">
                  Explore Saviora Features
                </Link>
              </Button>
            </div>

            {/* Verified Trust Indicators */}
            <div className="flex flex-wrap items-center gap-x-6 gap-y-2.5 text-xs sm:text-sm font-medium text-slate-600">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#22c55e] flex-shrink-0" />
                <span>Clear visual insights</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#22c55e] flex-shrink-0" />
                <span>Works across all your devices</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#22c55e] flex-shrink-0" />
                <span>90-day free trial, no card required</span>
              </div>
            </div>
          </div>

          {/* Right Column: Accurate Saviora Analytics Dashboard UI Mockup */}
          <div className="lg:col-span-6 xl:col-span-6 w-full">
            <div className="relative mx-auto max-w-xl lg:max-w-none">
              {/* Subtle ambient aura */}
              <div className="absolute -inset-1.5 bg-gradient-to-r from-amber-500/15 via-emerald-500/10 to-blue-500/15 rounded-3xl blur-xl opacity-75 pointer-events-none" />

              {/* Main Card Frame */}
              <div className="relative rounded-2xl sm:rounded-3xl border border-slate-200/90 bg-white shadow-xl shadow-slate-900/5 overflow-hidden flex flex-col sm:flex-row text-left">
                {/* Left Mini Sidebar */}
                <div className="hidden sm:flex flex-col w-40 bg-slate-50/80 border-r border-slate-100 p-3 justify-between flex-shrink-0">
                  <div>
                    {/* Brand Header */}
                    <div className="flex items-center justify-between pb-2.5 mb-2 border-b border-slate-200/60">
                      <Image
                        src={logoSaviora}
                        alt="Saviora"
                        className="h-5 w-auto object-contain"
                      />
                      <ChevronDown className="w-3 h-3 text-slate-400" />
                    </div>

                    {/* Nav List */}
                    <nav className="space-y-1">
                      <div className="flex items-center gap-2 px-2 py-1.5 rounded-lg text-xs font-medium text-slate-500">
                        <LayoutDashboard className="w-3.5 h-3.5 text-slate-400" />
                        <span>Dashboard</span>
                      </div>
                      <div className="flex items-center gap-2 px-2 py-1.5 rounded-lg text-xs font-medium text-slate-500">
                        <TrendingUp className="w-3.5 h-3.5 text-slate-400" />
                        <span>Income</span>
                      </div>
                      <div className="flex items-center gap-2 px-2 py-1.5 rounded-lg text-xs font-medium text-slate-500">
                        <CreditCard className="w-3.5 h-3.5 text-slate-400" />
                        <span>Expenses</span>
                      </div>
                      {/* Active Analytics Tab */}
                      <div className="flex items-center gap-2 px-2 py-1.5 rounded-lg text-xs font-bold text-[#16a34a] bg-emerald-50 border border-emerald-200/70">
                        <BarChart4 className="w-3.5 h-3.5 text-[#16a34a]" />
                        <span>Analytics</span>
                      </div>
                      <div className="flex items-center gap-2 px-2 py-1.5 rounded-lg text-xs font-medium text-slate-500">
                        <PieChart className="w-3.5 h-3.5 text-slate-400" />
                        <span>Budgets</span>
                      </div>
                      <div className="flex items-center gap-2 px-2 py-1.5 rounded-lg text-xs font-medium text-slate-500">
                        <Target className="w-3.5 h-3.5 text-slate-400" />
                        <span>Savings Goals</span>
                      </div>
                      <div className="flex items-center gap-2 px-2 py-1.5 rounded-lg text-xs font-medium text-slate-500">
                        <Settings className="w-3.5 h-3.5 text-slate-400" />
                        <span>Settings</span>
                      </div>
                    </nav>
                  </div>

                  {/* Sidebar Bottom */}
                  <div className="pt-2 border-t border-slate-200/60 space-y-1.5">
                    <div className="bg-slate-100/70 p-1.5 rounded-lg">
                      <div className="flex items-center justify-between text-[8px] uppercase font-bold text-slate-500">
                        <span>Plan</span>
                        <span className="bg-emerald-100 text-emerald-700 px-1 py-0.2 rounded text-[7px]">Trial</span>
                      </div>
                      <div className="text-[10px] font-bold text-slate-800">76 Days Left</div>
                    </div>
                    <div className="flex items-center justify-between text-[9px] text-slate-500 px-1">
                      <span className="flex items-center gap-1 font-medium"><Sun className="w-2.5 h-2.5 text-amber-500" /> Light</span>
                      <span className="flex items-center gap-1 text-slate-400"><Moon className="w-2.5 h-2.5" /> Dark</span>
                    </div>
                  </div>
                </div>

                {/* Main Workspace Area */}
                <div className="flex-1 p-3.5 sm:p-4 flex flex-col justify-between bg-white min-w-0">
                  {/* Top Bar: Title, Date Picker, Export */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-2.5 mb-2.5 border-b border-slate-100 gap-2">
                    <div>
                      <div className="text-sm sm:text-base font-bold text-slate-900 leading-tight">
                        Expense Analytics
                      </div>
                      <p className="text-[10px] text-slate-400">
                        Deep dive into your spending patterns and financial habits
                      </p>
                    </div>

                    <div className="flex items-center gap-1.5 self-start sm:self-auto">
                      <div className="flex items-center gap-1 px-2 py-1 rounded-md bg-slate-50 border border-slate-200 text-[9px] text-slate-600">
                        <Calendar className="w-2.5 h-2.5 text-slate-400" />
                        <span>Oct 1, 2026 – Oct 20, 2026</span>
                      </div>
                      <button
                        type="button"
                        className="inline-flex items-center gap-1 px-2 py-1 rounded-md bg-slate-100 hover:bg-slate-200 text-[9px] font-semibold text-slate-700 cursor-default"
                      >
                        <Download className="w-2.5 h-2.5" />
                        <span>Export</span>
                      </button>
                    </div>
                  </div>

                  {/* 6 Metric KPI Cards from real Saviora Analytics dashboard */}
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-1.5 mb-2.5">
                    {/* Card 1: Total Expenses */}
                    <div className="bg-slate-50/80 border border-slate-100 rounded-lg p-2">
                      <div className="flex items-center justify-between text-[9px] text-slate-500 mb-0.5">
                        <span>Total Expenses</span>
                        <div className="w-4 h-4 rounded bg-orange-100 text-orange-600 flex items-center justify-center">
                          <DollarSign className="w-2.5 h-2.5" />
                        </div>
                      </div>
                      <div className="text-xs sm:text-sm font-extrabold text-slate-900 truncate">$4,250.00</div>
                    </div>

                    {/* Card 2: Top Category */}
                    <div className="bg-slate-50/80 border border-slate-100 rounded-lg p-2">
                      <div className="flex items-center justify-between text-[9px] text-slate-500 mb-0.5">
                        <span>Top Category</span>
                        <div className="w-4 h-4 rounded bg-emerald-100 text-[#16a34a] flex items-center justify-center">
                          <PieChart className="w-2.5 h-2.5" />
                        </div>
                      </div>
                      <div className="text-xs sm:text-sm font-extrabold text-slate-900 truncate">Housing & Rent</div>
                    </div>

                    {/* Card 3: Most Used Payment */}
                    <div className="bg-slate-50/80 border border-slate-100 rounded-lg p-2">
                      <div className="flex items-center justify-between text-[9px] text-slate-500 mb-0.5">
                        <span>Most Used Payment</span>
                        <div className="w-4 h-4 rounded bg-blue-100 text-blue-600 flex items-center justify-center">
                          <CreditCard className="w-2.5 h-2.5" />
                        </div>
                      </div>
                      <div className="text-xs sm:text-sm font-extrabold text-slate-900 truncate">Credit Card</div>
                    </div>

                    {/* Card 4: Avg. Daily Spend */}
                    <div className="bg-slate-50/80 border border-slate-100 rounded-lg p-2">
                      <div className="flex items-center justify-between text-[9px] text-slate-500 mb-0.5">
                        <span>Avg. Daily Spend</span>
                        <div className="w-4 h-4 rounded bg-purple-100 text-purple-600 flex items-center justify-center">
                          <TrendingDown className="w-2.5 h-2.5" />
                        </div>
                      </div>
                      <div className="text-xs sm:text-sm font-extrabold text-slate-900 truncate">$137.10</div>
                    </div>

                    {/* Card 5: Monthly Growth */}
                    <div className="bg-slate-50/80 border border-slate-100 rounded-lg p-2">
                      <div className="flex items-center justify-between text-[9px] text-slate-500 mb-0.5">
                        <span>Monthly Growth</span>
                        <div className="w-4 h-4 rounded bg-emerald-100 text-[#16a34a] flex items-center justify-center">
                          <TrendingDown className="w-2.5 h-2.5" />
                        </div>
                      </div>
                      <div className="text-xs sm:text-sm font-extrabold text-slate-900 truncate">-2.4%</div>
                    </div>

                    {/* Card 6: Transactions */}
                    <div className="bg-slate-50/80 border border-slate-100 rounded-lg p-2">
                      <div className="flex items-center justify-between text-[9px] text-slate-500 mb-0.5">
                        <span>Transactions</span>
                        <div className="w-4 h-4 rounded bg-purple-100 text-purple-600 flex items-center justify-center">
                          <Clock className="w-2.5 h-2.5" />
                        </div>
                      </div>
                      <div className="text-xs sm:text-sm font-extrabold text-slate-900 truncate">79</div>
                    </div>
                  </div>

                  {/* Dual Chart Previews: Category Distribution & Income vs Expenses */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-2">
                    {/* Donut Mini Preview */}
                    <div className="border border-slate-100 rounded-xl p-2.5 bg-white shadow-2xs">
                      <div className="text-[10px] font-bold text-slate-800 mb-2 flex items-center gap-1">
                        <PieChart className="w-3 h-3 text-emerald-600" />
                        <span>Category Distribution</span>
                      </div>
                      <div className="flex items-center gap-2">
                        {/* CSS SVG Donut */}
                        <div className="relative w-14 h-14 flex-shrink-0">
                          <svg className="w-full h-full -rotate-90" viewBox="0 0 36 36">
                            <path
                              className="text-emerald-500"
                              strokeDasharray="23.1, 100"
                              strokeWidth="5"
                              stroke="currentColor"
                              fill="none"
                              d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                            />
                            <path
                              className="text-orange-500"
                              strokeDasharray="18.4, 100"
                              strokeDashoffset="-23.1"
                              strokeWidth="5"
                              stroke="currentColor"
                              fill="none"
                              d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                            />
                            <path
                              className="text-blue-500"
                              strokeDasharray="14.2, 100"
                              strokeDashoffset="-41.5"
                              strokeWidth="5"
                              stroke="currentColor"
                              fill="none"
                              d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                            />
                            <path
                              className="text-purple-500"
                              strokeDasharray="9.2, 100"
                              strokeDashoffset="-55.7"
                              strokeWidth="5"
                              stroke="currentColor"
                              fill="none"
                              d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                            />
                            <path
                              className="text-cyan-500"
                              strokeDasharray="7.6, 100"
                              strokeDashoffset="-64.9"
                              strokeWidth="5"
                              stroke="currentColor"
                              fill="none"
                              d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                            />
                            <path
                              className="text-rose-500"
                              strokeDasharray="6.2, 100"
                              strokeDashoffset="-72.5"
                              strokeWidth="5"
                              stroke="currentColor"
                              fill="none"
                              d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                            />
                            <path
                              className="text-amber-500"
                              strokeDasharray="6.2, 100"
                              strokeDashoffset="-78.7"
                              strokeWidth="5"
                              stroke="currentColor"
                              fill="none"
                              d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                            />
                            <path
                              className="text-teal-500"
                              strokeDasharray="5.0, 100"
                              strokeDashoffset="-84.9"
                              strokeWidth="5"
                              stroke="currentColor"
                              fill="none"
                              d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                            />
                            <path
                              className="text-slate-400"
                              strokeDasharray="10.1, 100"
                              strokeDashoffset="-89.9"
                              strokeWidth="5"
                              stroke="currentColor"
                              fill="none"
                              d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                            />
                          </svg>
                        </div>
                        <div className="text-[9px] space-y-0.5 truncate">
                          <div className="flex items-center gap-1 truncate font-medium text-slate-700">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 flex-shrink-0" />
                            <span className="truncate">Housing: $1,450 (34%)</span>
                          </div>
                          <div className="flex items-center gap-1 truncate font-medium text-slate-700">
                            <span className="w-1.5 h-1.5 rounded-full bg-orange-500 flex-shrink-0" />
                            <span className="truncate">Food: $780 (18%)</span>
                          </div>
                          <div className="flex items-center gap-1 truncate font-medium text-slate-700">
                            <span className="w-1.5 h-1.5 rounded-full bg-blue-500 flex-shrink-0" />
                            <span className="truncate">Transit: $420 (10%)</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Income vs Expenses Mini Preview */}
                    <div className="border border-slate-100 rounded-xl p-2.5 bg-white shadow-2xs">
                      <div className="text-[10px] font-bold text-slate-800 mb-1 flex items-center justify-between">
                        <span className="flex items-center gap-1">
                          <TrendingUp className="w-3 h-3 text-[#16a34a]" />
                          <span>Income vs Expenses</span>
                        </span>
                        <div className="flex items-center gap-1 text-[8px]">
                          <span className="text-red-500">● exp</span>
                          <span className="text-emerald-500">● inc</span>
                        </div>
                      </div>
                      {/* Trend Curve simulation */}
                      <div className="h-14 flex items-end justify-between gap-1 pt-1">
                        <div className="w-full h-full relative">
                          <svg className="w-full h-full" viewBox="0 0 100 40" preserveAspectRatio="none">
                            {/* Income line */}
                            <path
                              d="M0,24 C30,22 65,16 100,6"
                              fill="none"
                              stroke="#22c55e"
                              strokeWidth="2.5"
                              strokeLinecap="round"
                            />
                            {/* Expenses line */}
                            <path
                              d="M0,30 C35,29 70,26 100,18"
                              fill="none"
                              stroke="#ef4444"
                              strokeWidth="2.5"
                              strokeLinecap="round"
                            />
                          </svg>
                          <div className="flex justify-between text-[8px] text-slate-400 mt-0.5">
                            <span>May</span>
                            <span>Jul</span>
                            <span>Sep</span>
                            <span>Oct</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Footnote */}
                  <div className="text-[9px] text-slate-400 text-center pt-1 border-t border-slate-50">
                    Product preview: actual Saviora Expense Analytics interface demonstration
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
