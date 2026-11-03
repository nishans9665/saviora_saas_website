"use client";

import React from "react";
import Link from "next/link";
import {
  Sparkles,
  ArrowRight,
  CheckCircle2,
  RefreshCw,
  Landmark,
  Home,
  Zap,
  CalendarCheck2,
  ShieldCheck,
} from "lucide-react";
import { Button } from "@/components/ui/Button";

export function RecurringFinalCTA() {
  const handleTrialClick = () => {
    if (typeof window !== "undefined" && (window as unknown as Record<string, unknown>).gtag) {
      const gtag = (window as unknown as Record<string, (action: string, eventName: string, params: Record<string, string>) => void>).gtag;
      gtag("event", "recurring_transactions_trial_click", {
        event_category: "conversion",
        event_label: "final_cta",
      });
    }
  };

  return (
    <section className="py-16 sm:py-20 lg:py-24 bg-white relative overflow-hidden" id="final-cta">
      <div className="container mx-auto px-4 md:px-6">
        
        {/* Banner Container matching Saviora light glassmorphism design system */}
        <div className="relative rounded-3xl border border-emerald-200/80 bg-gradient-to-br from-emerald-50/70 via-slate-50/60 to-[#22c55e]/10 p-6 sm:p-10 lg:p-12 overflow-hidden shadow-sm">
          
          {/* Ambient Glows */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-400/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-20 -left-20 w-72 h-72 bg-[#22c55e]/10 rounded-full blur-2xl pointer-events-none" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center relative z-10">
            
            {/* Left Content (matches IncomeFinalCTA & AnalyticsFinalCTA) */}
            <div className="lg:col-span-7 text-left">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-100/80 border border-emerald-200/80 text-emerald-800 text-xs font-semibold uppercase tracking-wider mb-4 shadow-xs">
                <Sparkles className="w-3.5 h-3.5 text-[#16a34a] flex-shrink-0" />
                <span>YOUR FINANCES, ORGANIZED</span>
              </div>

              <h2 className="text-3xl sm:text-4xl lg:text-[40px] font-extrabold tracking-tight text-slate-900 leading-[1.18] mb-4">
                Spend Less Time on Repetitive Tracking. Focus More on Your{" "}
                <span className="text-[#16a34a]">Financial Goals</span>.
              </h2>

              <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-xl mb-8">
                Set up recurring income and expenses, organize your upcoming financial commitments, and keep your Saviora records up to date.
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
                    className="flex items-center justify-center gap-2"
                  >
                    <span>Start Your 90-Day Free Trial</span>
                    <ArrowRight className="w-4 h-4 ml-1" />
                  </Link>
                </Button>

                <Button
                  asChild
                  size="lg"
                  variant="outline"
                  className="bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 hover:border-slate-300 font-semibold rounded-full px-7 py-3.5 shadow-2xs transition-all duration-300 justify-center cursor-pointer text-sm sm:text-base"
                >
                  <Link href="/pricing" className="flex items-center justify-center">
                    View Pricing
                  </Link>
                </Button>
              </div>

              {/* Trust Indicators */}
              <div className="flex flex-wrap items-center gap-x-6 gap-y-2.5 text-xs sm:text-sm font-medium text-slate-600">
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-[#22c55e] flex-shrink-0" />
                  <span>90-Day Pro Free Trial</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-[#22c55e] flex-shrink-0" />
                  <span>No Credit Card Required</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-[#22c55e] flex-shrink-0" />
                  <span>Cancel Anytime</span>
                </div>
              </div>
            </div>

            {/* Right Graphic: Elegant Autopilot Showcase Card */}
            <div className="lg:col-span-5 flex justify-center">
              <div className="w-full max-w-sm rounded-3xl border border-slate-200/90 bg-white/95 backdrop-blur-sm p-5 sm:p-6 shadow-xl shadow-slate-200/60 relative">
                
                {/* Header */}
                <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-4">
                  <div className="flex items-center gap-2.5">
                    <div className="w-9 h-9 rounded-xl bg-emerald-50 border border-emerald-200/70 flex items-center justify-center text-[#16a34a]">
                      <RefreshCw className="w-4 h-4 animate-spin-slow" />
                    </div>
                    <div>
                      <h3 className="text-sm font-bold text-slate-900 leading-tight">
                        Recurring Autopilot
                      </h3>
                      <p className="text-[11px] text-slate-400">
                        Automated schedule engine
                      </p>
                    </div>
                  </div>

                  <span className="inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-200/60">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#16a34a] animate-pulse" />
                    <span>Active</span>
                  </span>
                </div>

                {/* List of sample recurring transactions */}
                <div className="space-y-2 mb-4">
                  {/* Item 1 */}
                  <div className="flex items-center justify-between p-2.5 rounded-xl border border-slate-100 bg-slate-50/60">
                    <div className="flex items-center gap-2.5 min-w-0">
                      <div className="w-7 h-7 rounded-lg bg-emerald-100 text-[#16a34a] flex items-center justify-center flex-shrink-0">
                        <Landmark className="w-3.5 h-3.5" />
                      </div>
                      <div className="min-w-0">
                        <div className="text-xs font-semibold text-slate-900 truncate">Monthly Salary</div>
                        <div className="text-[10px] text-slate-400">Income � 1st of month</div>
                      </div>
                    </div>
                    <div className="text-right flex-shrink-0 ml-2">
                      <div className="text-xs font-bold text-emerald-600">+$3,500.00</div>
                      <span className="text-[9px] font-semibold text-emerald-700 bg-emerald-100/80 px-1.5 py-0.5 rounded-full">Received</span>
                    </div>
                  </div>

                  {/* Item 2 */}
                  <div className="flex items-center justify-between p-2.5 rounded-xl border border-slate-100 bg-slate-50/60">
                    <div className="flex items-center gap-2.5 min-w-0">
                      <div className="w-7 h-7 rounded-lg bg-rose-100 text-rose-600 flex items-center justify-center flex-shrink-0">
                        <Home className="w-3.5 h-3.5" />
                      </div>
                      <div className="min-w-0">
                        <div className="text-xs font-semibold text-slate-900 truncate">Apartment Rent</div>
                        <div className="text-[10px] text-slate-400">Expense � Monthly</div>
                      </div>
                    </div>
                    <div className="text-right flex-shrink-0 ml-2">
                      <div className="text-xs font-bold text-slate-900">-$1,200.00</div>
                      <span className="text-[9px] font-semibold text-emerald-700 bg-emerald-100/80 px-1.5 py-0.5 rounded-full">Completed</span>
                    </div>
                  </div>

                  {/* Item 3 */}
                  <div className="flex items-center justify-between p-2.5 rounded-xl border border-slate-100 bg-slate-50/60">
                    <div className="flex items-center gap-2.5 min-w-0">
                      <div className="w-7 h-7 rounded-lg bg-amber-100 text-amber-600 flex items-center justify-center flex-shrink-0">
                        <Zap className="w-3.5 h-3.5" />
                      </div>
                      <div className="min-w-0">
                        <div className="text-xs font-semibold text-slate-900 truncate">Electricity & Wi-Fi</div>
                        <div className="text-[10px] text-slate-400">Expense � Monthly</div>
                      </div>
                    </div>
                    <div className="text-right flex-shrink-0 ml-2">
                      <div className="text-xs font-bold text-slate-900">-$85.00</div>
                      <span className="text-[9px] font-semibold text-sky-700 bg-sky-100/80 px-1.5 py-0.5 rounded-full">Scheduled</span>
                    </div>
                  </div>
                </div>

                {/* Footer status pill */}
                <div className="p-3 rounded-2xl bg-emerald-50/70 border border-emerald-200/70 flex items-center justify-between text-xs text-emerald-900">
                  <div className="flex items-center gap-2">
                    <CalendarCheck2 className="w-4 h-4 text-[#16a34a] flex-shrink-0" />
                    <span className="font-semibold text-[11px]">Repeats automatically every cycle</span>
                  </div>
                  <div className="flex items-center gap-1 text-[10px] text-emerald-700 font-medium">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    <span>Verified</span>
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
