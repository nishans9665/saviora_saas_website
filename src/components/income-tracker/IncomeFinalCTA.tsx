"use client";

import React from "react";
import Link from "next/link";
import { Sparkles, ArrowRight, CheckCircle2, Briefcase, Laptop, Smartphone } from "lucide-react";
import { Button } from "@/components/ui/Button";

export function IncomeFinalCTA() {
  const handleTrialClick = () => {
    if (typeof window !== "undefined" && (window as unknown as Record<string, unknown>).gtag) {
      const gtag = (window as unknown as Record<string, (action: string, eventName: string, params: Record<string, string>) => void>).gtag;
      gtag("event", "income_tracker_trial_click", {
        event_category: "conversion",
        event_label: "final_cta",
      });
    }
  };

  return (
    <section className="py-20 sm:py-24 bg-white relative overflow-hidden">
      <div className="container mx-auto px-4 md:px-6">
        
        {/* Banner Container */}
        <div className="relative rounded-3xl border border-[#22c55e]/30 bg-gradient-to-br from-[#22c55e]/10 via-slate-50/50 to-[#22c55e]/5 p-8 sm:p-12 lg:p-14 overflow-hidden shadow-sm">
          
          {/* Ambient Glow */}
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#22c55e]/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-24 -left-24 w-80 h-80 bg-teal-400/10 rounded-full blur-2xl pointer-events-none" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center relative z-10">
            
            {/* Left Content */}
            <div className="lg:col-span-7 text-left">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#22c55e]/15 border border-[#22c55e]/30 text-[#16a34a] text-xs font-semibold uppercase tracking-wider mb-4 shadow-xs">
                <Sparkles className="w-3.5 h-3.5 text-[#22c55e] flex-shrink-0" />
                <span>READY TO TAKE CONTROL?</span>
              </div>

              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-slate-900 leading-[1.15] mb-4">
                Start Tracking Your Income with Saviora
              </h2>

              <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-xl mb-8">
                Join thousands of users who are managing their money with more clarity. Try Saviora Pro free for 90 days and explore all features.
              </p>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 w-full sm:w-auto mb-8">
                <Button
                  asChild
                  size="lg"
                  className="bg-[#22c55e] hover:bg-[#16a34a] text-white font-semibold rounded-full px-7 py-3.5 shadow-md shadow-[#22c55e]/25 hover:shadow-lg hover:shadow-[#22c55e]/35 hover:-translate-y-0.5 transition-all duration-300 justify-center cursor-pointer"
                  onClick={handleTrialClick}
                >
                  <Link href="https://cloud.saviora.app/register" target="_blank" className="flex items-center justify-center">
                    <span>Start Your 90-Day Pro Trial</span>
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Link>
                </Button>

                <Button
                  asChild
                  size="lg"
                  variant="outline"
                  className="bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 hover:border-slate-300 font-semibold rounded-full px-7 py-3.5 shadow-xs transition-all duration-300 justify-center cursor-pointer"
                >
                  <Link href="/pricing">
                    View Pricing
                  </Link>
                </Button>
              </div>

              {/* Trust Indicators */}
              <div className="flex flex-wrap items-center gap-x-6 gap-y-2.5 text-xs sm:text-sm font-medium text-slate-600">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#22c55e] flex-shrink-0" />
                  <span>Full access to all features</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#22c55e] flex-shrink-0" />
                  <span>No credit card required</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#22c55e] flex-shrink-0" />
                  <span>Cancel anytime</span>
                </div>
              </div>
            </div>

            {/* Right Visual: Mobile & Desktop Mockup */}
            <div className="lg:col-span-5 flex justify-center lg:justify-end items-center">
              <div className="relative w-full max-w-[340px] sm:max-w-[400px]">
                
                {/* Desktop Layer Behind */}
                <div className="hidden sm:block absolute -top-4 -right-2 sm:-right-4 w-[240px] sm:w-[280px] bg-white rounded-2xl border border-slate-200/90 shadow-lg p-3.5 z-0 transform translate-x-2 -translate-y-2">
                  <div className="flex items-center justify-between pb-2 mb-2 border-b border-slate-100">
                    <span className="text-[11px] font-bold text-slate-800">Income Sources</span>
                    <span className="text-[10px] text-slate-400">Monthly</span>
                  </div>
                  <div className="space-y-2">
                    <div>
                      <div className="flex justify-between text-[10px] font-semibold text-slate-700 mb-0.5">
                        <span>Salary</span>
                        <span>62%</span>
                      </div>
                      <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                        <div className="h-full bg-[#22c55e] rounded-full w-[62%]" />
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between text-[10px] font-semibold text-slate-700 mb-0.5">
                        <span>Freelance</span>
                        <span>25%</span>
                      </div>
                      <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                        <div className="h-full bg-sky-500 rounded-full w-[25%]" />
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between text-[10px] font-semibold text-slate-700 mb-0.5">
                        <span>Investment</span>
                        <span>9%</span>
                      </div>
                      <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                        <div className="h-full bg-rose-500 rounded-full w-[9%]" />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Smartphone Mockup (Foreground) */}
                <div className="relative z-10 w-[230px] sm:w-[250px] mx-auto lg:mr-auto rounded-[32px] border-4 border-slate-800 bg-white shadow-2xl p-3 overflow-hidden">
                  {/* Phone Notch/Speaker */}
                  <div className="w-16 h-3.5 bg-slate-800 rounded-b-lg mx-auto mb-2 flex items-center justify-center">
                    <div className="w-6 h-1 bg-slate-700 rounded-full" />
                  </div>

                  {/* App Screen Header */}
                  <div className="flex items-center justify-between pb-2 mb-2 border-b border-slate-100">
                    <div className="flex items-center gap-1">
                      <div className="w-4 h-4 rounded bg-[#22c55e] flex items-center justify-center text-[9px] text-white font-bold">
                        S
                      </div>
                      <span className="text-[11px] font-bold text-slate-800">Income</span>
                    </div>
                    <Smartphone className="w-3 h-3 text-slate-400" />
                  </div>

                  {/* Metric Box */}
                  <div className="bg-slate-50 rounded-xl p-2.5 mb-2.5 border border-slate-100">
                    <div className="text-[9px] text-slate-400 font-medium">Total Income</div>
                    <div className="text-base font-extrabold text-slate-900">$5,420.00</div>
                    <div className="text-[9px] font-bold text-[#16a34a] mt-0.5">↑ 15% this month</div>
                    
                    {/* Mini Sparkline Bars */}
                    <div className="flex items-end gap-1 h-8 mt-2 pt-1 border-t border-slate-200/50">
                      <div className="flex-1 bg-[#22c55e]/30 rounded-t h-[40%]" />
                      <div className="flex-1 bg-[#22c55e]/50 rounded-t h-[55%]" />
                      <div className="flex-1 bg-[#22c55e]/60 rounded-t h-[65%]" />
                      <div className="flex-1 bg-[#22c55e]/80 rounded-t h-[75%]" />
                      <div className="flex-1 bg-[#22c55e] rounded-t h-[95%]" />
                    </div>
                  </div>

                  {/* Recent Transactions in Phone */}
                  <div className="space-y-1.5">
                    <div className="flex items-center justify-between p-1.5 rounded-lg bg-slate-50 text-[10px]">
                      <div className="flex items-center gap-1.5">
                        <Briefcase className="w-3 h-3 text-slate-600" />
                        <span className="font-semibold text-slate-800">Salary</span>
                      </div>
                      <span className="font-bold text-[#16a34a]">+$3,500</span>
                    </div>
                    <div className="flex items-center justify-between p-1.5 rounded-lg bg-slate-50 text-[10px]">
                      <div className="flex items-center gap-1.5">
                        <Laptop className="w-3 h-3 text-sky-600" />
                        <span className="font-semibold text-slate-800">Freelance</span>
                      </div>
                      <span className="font-bold text-[#16a34a]">+$1,450</span>
                    </div>
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
