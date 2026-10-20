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
        <div className="relative rounded-3xl border border-amber-200/70 bg-gradient-to-br from-amber-50/70 via-slate-50/60 to-[#22c55e]/10 p-6 sm:p-10 lg:p-14 overflow-hidden shadow-sm">
          {/* Ambient Glows */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-amber-400/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-20 -left-20 w-72 h-72 bg-[#22c55e]/10 rounded-full blur-2xl pointer-events-none" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center relative z-10">
            {/* Left Content */}
            <div className="lg:col-span-7 text-left">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-100/80 border border-amber-200/80 text-amber-800 text-xs font-semibold uppercase tracking-wider mb-4 shadow-xs">
                <Sparkles className="w-3.5 h-3.5 text-amber-600 flex-shrink-0" />
                <span>TAKE A CLEARER LOOK AT YOUR FINANCES</span>
              </div>

              <h2 className="text-3xl sm:text-4xl lg:text-[42px] font-extrabold tracking-tight text-slate-900 leading-[1.18] mb-4">
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
            <div className="lg:col-span-5 flex justify-center lg:justify-end items-center relative">
              {/* Layered Desktop Preview in Background */}
              <div className="hidden sm:block absolute -left-10 top-4 w-80 bg-white rounded-2xl border border-slate-200/80 p-4 shadow-xl opacity-90 -rotate-2 pointer-events-none">
                <div className="flex items-center justify-between pb-2 mb-2 border-b border-slate-100">
                  <div className="text-xs font-bold text-slate-900">Expense Analytics</div>
                  <span className="text-[9px] bg-emerald-100 text-[#16a34a] px-2 py-0.5 rounded font-bold">79 Records</span>
                </div>
                <div className="grid grid-cols-2 gap-2 text-[10px] mb-2">
                  <div className="bg-slate-50 p-2 rounded-lg">
                    <span className="text-slate-400 block text-[8px]">Total Outflow</span>
                    <span className="font-extrabold text-slate-900 text-xs">$4,250.00</span>
                  </div>
                  <div className="bg-slate-50 p-2 rounded-lg">
                    <span className="text-slate-400 block text-[8px]">Top Category</span>
                    <span className="font-extrabold text-slate-900 text-xs">Housing & Rent</span>
                  </div>
                </div>
                <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                  <div className="bg-emerald-500 h-full w-[70%]" />
                </div>
              </div>

              {/* Smartphone Frame in Foreground */}
              <div className="relative z-10 w-[240px] sm:w-[260px] h-[450px] sm:h-[480px] rounded-[38px] border-[6px] border-slate-900 bg-white shadow-2xl shadow-slate-900/20 overflow-hidden text-left flex flex-col justify-between select-none">
                {/* Status Bar */}
                <div className="pt-2 px-5 pb-1 bg-white flex items-center justify-between text-[10px] font-bold text-slate-900 flex-shrink-0">
                  <span>9:41</span>
                  <div className="w-16 h-3 bg-slate-900 rounded-full mx-auto" />
                  <Wifi className="w-3 h-3 text-slate-800" />
                </div>

                {/* Smartphone App Content */}
                <div className="p-3.5 flex-1 flex flex-col justify-between overflow-hidden">
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <Image src={logoSaviora} alt="Saviora" className="h-4 w-auto object-contain" />
                      <div className="w-6 h-6 rounded-full bg-amber-50 text-amber-700 flex items-center justify-center font-bold text-xs">
                        <BarChart4 className="w-3.5 h-3.5" />
                      </div>
                    </div>

                    <div className="text-xs font-extrabold text-slate-900 mb-0.5">Financial Analytics</div>
                    <div className="text-[10px] text-slate-400 mb-3">Oct 1 - Oct 20 summary</div>

                    {/* Total Expense Card */}
                    <div className="bg-amber-50/70 border border-amber-200/70 rounded-xl p-3 mb-2.5">
                      <span className="text-[9px] font-semibold text-amber-800 block">Total Expenses</span>
                      <span className="text-lg font-extrabold text-slate-900 block mt-0.5">$4,250.00</span>
                      <div className="flex items-center justify-between text-[9px] text-slate-500 mt-1">
                        <span>Top: Housing & Rent</span>
                        <span className="font-bold text-[#16a34a]">34.1% Share</span>
                      </div>
                    </div>

                    {/* Mini Highlights */}
                    <div className="bg-white border border-slate-200/90 rounded-xl p-2.5 shadow-2xs space-y-1.5">
                      <div className="flex items-center justify-between text-[10px]">
                        <span className="text-slate-500">Credit Card</span>
                        <span className="font-bold text-slate-900">62.0%</span>
                      </div>
                      <div className="w-full bg-slate-100 rounded-full h-1 overflow-hidden">
                        <div className="bg-blue-600 h-full w-[62%]" />
                      </div>
                    </div>
                  </div>

                  {/* App CTA Button */}
                  <div className="pt-2">
                    <div className="w-full py-2 bg-[#22c55e] text-white rounded-xl text-center text-xs font-bold shadow-xs">
                      View Detailed Reports
                    </div>
                  </div>
                </div>

                {/* Smartphone Home Bar */}
                <div className="pb-2 pt-1 flex justify-center bg-white flex-shrink-0">
                  <div className="w-24 h-1 bg-slate-300 rounded-full" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
