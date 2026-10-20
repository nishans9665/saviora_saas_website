"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Sparkles,
  ArrowRight,
  CheckCircle2,
  BarChart4,
  DollarSign,
  PieChart,
  Wifi,
  Calendar,
  CreditCard,
  LayoutDashboard,
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import logoSaviora from "@/assets/logo/logo-saviora-web-tag.svg";

export function AnalyticsFinalCTA() {
  const handleTrialClick = () => {
    if (typeof window !== "undefined" && (window as unknown as Record<string, unknown>).gtag) {
      const gtag = (window as unknown as Record<string, (action: string, eventName: string, params: Record<string, string>) => void>).gtag;
      gtag("event", "financial_analytics_trial_click", {
        event_category: "conversion",
        event_label: "final_cta",
      });
    }
  };

  return (
    <section className="py-16 sm:py-20 lg:py-24 bg-white relative overflow-hidden" id="final-cta">
      <div className="container mx-auto px-4 md:px-6">
        {/* Banner Container with soft amber and green gradient background */}
        <div className="relative rounded-3xl border border-amber-200/70 bg-gradient-to-br from-amber-50/70 via-slate-50/60 to-[#22c55e]/10 p-6 sm:p-10 lg:p-12 overflow-hidden shadow-sm">
          {/* Ambient Glows */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-amber-400/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-20 -left-20 w-72 h-72 bg-[#22c55e]/10 rounded-full blur-2xl pointer-events-none" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center relative z-10">
            {/* Left Content */}
            <div className="lg:col-span-6 text-left">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-100/80 border border-amber-200/80 text-amber-800 text-xs font-semibold uppercase tracking-wider mb-4 shadow-xs">
                <Sparkles className="w-3.5 h-3.5 text-amber-600 flex-shrink-0" />
                <span>TAKE A CLEARER LOOK AT YOUR FINANCES</span>
              </div>

              <h2 className="text-3xl sm:text-4xl lg:text-[40px] font-extrabold tracking-tight text-slate-900 leading-[1.18] mb-4">
                Understand Your Money with{" "}
                <span className="text-[#16a34a]">Saviora Financial Analytics</span>
              </h2>

              <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-xl mb-8">
                Explore your spending patterns, review expense categories, compare recorded income and expenses, and keep your financial reports organized with Saviora.
              </p>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 w-full sm:w-auto mb-8">
                <Button
                  asChild
                  size="lg"
                  className="bg-[#22c55e] hover:bg-[#16a34a] text-white font-semibold rounded-full px-7 py-3.5 shadow-md shadow-[#22c55e]/25 hover:shadow-lg hover:shadow-[#22c55e]/35 hover:-translate-y-0.5 transition-all duration-300 justify-center cursor-pointer text-sm sm:text-base"
                  onClick={handleTrialClick}
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
                  className="bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 hover:border-slate-300 font-semibold rounded-full px-7 py-3.5 shadow-2xs transition-all duration-300 justify-center cursor-pointer text-sm sm:text-base"
                >
                  <Link href="/pricing">
                    Explore Pricing
                  </Link>
                </Button>
              </div>

              {/* Trust Indicators */}
              <div className="flex flex-wrap items-center gap-x-6 gap-y-2.5 text-xs sm:text-sm font-medium text-slate-600">
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-[#22c55e] flex-shrink-0" />
                  <span>Full access to all features</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-[#22c55e] flex-shrink-0" />
                  <span>90-day free trial</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-[#22c55e] flex-shrink-0" />
                  <span>No credit card required</span>
                </div>
              </div>
            </div>

            {/* Right Visual: Desktop & Smartphone Mockups */}
            <div className="lg:col-span-6 flex justify-center lg:justify-end items-center relative min-h-[500px]">
              {/* Layered Desktop Preview in Background */}
              <div className="hidden md:block absolute left-0 lg:-left-4 xl:left-2 top-4 w-[290px] sm:w-[310px] bg-white/95 backdrop-blur-md rounded-2xl border border-slate-200/90 p-4 shadow-xl shadow-slate-900/10 -rotate-2 pointer-events-none z-0">
                <div className="flex items-center justify-between pb-2 mb-2.5 border-b border-slate-100">
                  <div className="flex items-center gap-1.5">
                    <BarChart4 className="w-3.5 h-3.5 text-emerald-600" />
                    <span className="text-xs font-bold text-slate-900">Expense Analytics</span>
                  </div>
                  <span className="text-[9px] bg-emerald-100 text-[#16a34a] px-2 py-0.5 rounded font-bold">79 Records</span>
                </div>

                {/* Metrics Grid */}
                <div className="grid grid-cols-2 gap-2 text-[10px] mb-2.5">
                  <div className="bg-slate-50 p-2 rounded-lg">
                    <span className="text-slate-400 block text-[8px]">Total Outflow</span>
                    <span className="font-extrabold text-slate-900 text-xs">$4,250.00</span>
                    <span className="text-[8px] text-[#16a34a] font-bold block mt-0.5">↓ 2.4% vs Sept</span>
                  </div>
                  <div className="bg-slate-50 p-2 rounded-lg">
                    <span className="text-slate-400 block text-[8px]">Top Category</span>
                    <span className="font-extrabold text-slate-900 text-xs truncate block">Housing &amp; Rent</span>
                    <span className="text-[8px] text-slate-500 font-semibold block mt-0.5">$1,450 (34.1%)</span>
                  </div>
                </div>

                {/* Mini Income vs Expenses SVG Graph */}
                <div className="bg-slate-50/70 rounded-lg p-2 mb-2.5">
                  <div className="flex items-center justify-between text-[8px] text-slate-500 mb-1">
                    <span>Income vs Expenses</span>
                    <span className="text-[#16a34a] font-bold">+$2,250 Surplus</span>
                  </div>
                  <div className="h-8 w-full relative">
                    <svg className="w-full h-full" viewBox="0 0 100 24" preserveAspectRatio="none">
                      <path d="M0,18 C25,16 60,10 100,4" fill="none" stroke="#22c55e" strokeWidth="2" strokeLinecap="round" />
                      <path d="M0,22 C30,20 65,18 100,12" fill="none" stroke="#ef4444" strokeWidth="2" strokeLinecap="round" />
                    </svg>
                  </div>
                </div>

                {/* Mini category tag strip */}
                <div className="flex items-center gap-1.5 text-[8px] text-slate-500">
                  <span className="px-1.5 py-0.5 rounded bg-emerald-50 text-emerald-700 font-semibold">Rent 34%</span>
                  <span className="px-1.5 py-0.5 rounded bg-orange-50 text-orange-700 font-semibold">Food 18%</span>
                  <span className="px-1.5 py-0.5 rounded bg-blue-50 text-blue-700 font-semibold">Transit 10%</span>
                </div>
              </div>

              {/* Smartphone Frame in Foreground */}
              <div className="relative z-10 w-[245px] sm:w-[260px] rounded-[38px] border-[6px] border-slate-900 bg-white shadow-2xl shadow-slate-900/25 overflow-hidden text-left flex flex-col justify-between select-none transition-transform duration-300 hover:-translate-y-1">
                {/* Status Bar */}
                <div className="pt-2 px-5 pb-1 bg-white flex items-center justify-between text-[10px] font-bold text-slate-900 flex-shrink-0">
                  <span>9:41</span>
                  <div className="w-16 h-3 bg-slate-900 rounded-full mx-auto" />
                  <div className="flex items-center gap-1">
                    <Wifi className="w-2.5 h-2.5 text-slate-800" />
                    <div className="w-3.5 h-2 border border-slate-900 rounded-2xs flex items-center p-0.5">
                      <div className="w-2 h-full bg-slate-900 rounded-2xs" />
                    </div>
                  </div>
                </div>

                {/* Smartphone App Content */}
                <div className="p-3 bg-white flex-1 flex flex-col justify-between space-y-2 overflow-hidden">
                  <div>
                    {/* App Top Bar */}
                    <div className="flex items-center justify-between pb-1.5 mb-1.5 border-b border-slate-100">
                      <Image src={logoSaviora} alt="Saviora" className="h-3.5 w-auto object-contain" />
                      <div className="flex items-center gap-1 px-1.5 py-0.5 rounded-full bg-emerald-50 text-[#16a34a] text-[8px] font-bold border border-emerald-200/60">
                        <Calendar className="w-2.5 h-2.5" />
                        <span>Oct 2026</span>
                      </div>
                    </div>

                    {/* Total Expense Hero Card */}
                    <div className="bg-gradient-to-br from-amber-50/80 via-white to-emerald-50/50 border border-amber-200/80 rounded-xl p-2.5 mb-2 shadow-2xs">
                      <div className="flex items-center justify-between">
                        <span className="text-[8px] font-bold uppercase tracking-wider text-slate-400">Total Outflow</span>
                        <span className="text-[8px] font-bold px-1.5 py-0.5 rounded bg-emerald-100 text-[#16a34a]">
                          ↓ -2.4% MoM
                        </span>
                      </div>
                      <div className="text-xl font-black text-slate-900 tracking-tight mt-0.5">$4,250.00</div>
                      <div className="flex items-center justify-between text-[8px] text-slate-500 mt-1 pt-1 border-t border-slate-100">
                        <span>Daily Avg: $137.10</span>
                        <span>79 recorded txns</span>
                      </div>
                    </div>

                    {/* Category Distribution Breakdown */}
                    <div className="bg-slate-50/90 border border-slate-200/70 rounded-xl p-2 mb-2">
                      <div className="flex items-center justify-between text-[9px] font-bold text-slate-800 mb-1.5">
                        <span className="flex items-center gap-1">
                          <PieChart className="w-2.5 h-2.5 text-emerald-600" />
                          <span>Top Categories</span>
                        </span>
                        <span className="text-[8px] font-bold text-emerald-600">100% Tracked</span>
                      </div>

                      <div className="space-y-1.5">
                        {/* Cat 1: Housing */}
                        <div>
                          <div className="flex items-center justify-between text-[8px] font-medium text-slate-700 mb-0.5">
                            <span className="flex items-center gap-1">
                              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                              <span>Housing &amp; Rent</span>
                            </span>
                            <span className="font-bold text-slate-900">$1,450 (34.1%)</span>
                          </div>
                          <div className="h-1 w-full bg-slate-200/60 rounded-full overflow-hidden">
                            <div className="bg-emerald-500 h-full rounded-full" style={{ width: "34.1%" }} />
                          </div>
                        </div>

                        {/* Cat 2: Groceries */}
                        <div>
                          <div className="flex items-center justify-between text-[8px] font-medium text-slate-700 mb-0.5">
                            <span className="flex items-center gap-1">
                              <span className="w-1.5 h-1.5 rounded-full bg-orange-500" />
                              <span>Food &amp; Groceries</span>
                            </span>
                            <span className="font-bold text-slate-900">$780 (18.4%)</span>
                          </div>
                          <div className="h-1 w-full bg-slate-200/60 rounded-full overflow-hidden">
                            <div className="bg-orange-500 h-full rounded-full" style={{ width: "18.4%" }} />
                          </div>
                        </div>

                        {/* Cat 3: Transportation */}
                        <div>
                          <div className="flex items-center justify-between text-[8px] font-medium text-slate-700 mb-0.5">
                            <span className="flex items-center gap-1">
                              <span className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                              <span>Transportation</span>
                            </span>
                            <span className="font-bold text-slate-900">$420 (9.9%)</span>
                          </div>
                          <div className="h-1 w-full bg-slate-200/60 rounded-full overflow-hidden">
                            <div className="bg-blue-500 h-full rounded-full" style={{ width: "9.9%" }} />
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Payment Breakdown */}
                    <div className="bg-white border border-slate-200/90 rounded-xl p-2 shadow-2xs mb-1">
                      <div className="flex items-center justify-between text-[8px] text-slate-600 mb-1">
                        <span className="font-bold text-slate-800">Payment Breakdown</span>
                        <span className="font-semibold text-purple-600">Credit: 62% ($2,635)</span>
                      </div>
                      <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden flex">
                        <div className="bg-purple-500 h-full" style={{ width: "62%" }} />
                        <div className="bg-blue-500 h-full" style={{ width: "32%" }} />
                        <div className="bg-emerald-500 h-full" style={{ width: "6%" }} />
                      </div>
                      <div className="flex items-center justify-between text-[7px] text-slate-400 mt-1">
                        <span>● Credit (62%)</span>
                        <span>● Bank (32%)</span>
                        <span>● Cash (6%)</span>
                      </div>
                    </div>
                  </div>

                  {/* Bottom Action & Tab Bar */}
                  <div>
                    {/* Action button */}
                    <div className="w-full py-1.5 rounded-lg bg-[#22c55e] text-white text-center text-[10px] font-bold shadow-xs mb-2">
                      View Detailed Reports →
                    </div>

                    {/* Mini Native App Tab Bar */}
                    <div className="pt-1.5 border-t border-slate-100 flex items-center justify-around text-slate-400 text-[8px]">
                      <div className="flex flex-col items-center">
                        <LayoutDashboard className="w-3 h-3 text-slate-400" />
                        <span className="text-[7px] mt-0.5">Home</span>
                      </div>
                      <div className="flex flex-col items-center text-[#16a34a] font-bold">
                        <BarChart4 className="w-3 h-3 text-[#16a34a]" />
                        <span className="text-[7px] mt-0.5">Analytics</span>
                      </div>
                      <div className="flex flex-col items-center">
                        <PieChart className="w-3 h-3 text-slate-400" />
                        <span className="text-[7px] mt-0.5">Budgets</span>
                      </div>
                      <div className="flex flex-col items-center">
                        <CreditCard className="w-3 h-3 text-slate-400" />
                        <span className="text-[7px] mt-0.5">Reports</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Smartphone Home Bar */}
                <div className="pb-2 pt-1 flex justify-center bg-white flex-shrink-0">
                  <div className="w-20 h-1 bg-slate-300 rounded-full" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
