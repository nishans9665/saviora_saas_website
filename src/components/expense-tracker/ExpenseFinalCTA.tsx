"use client";

import React from "react";
import Link from "next/link";
import { 
  Sparkles, 
  ArrowRight, 
  CheckCircle2, 
  Wifi,
  ShoppingBag,
  Car,
  Zap,
  Coffee,
  Plus
} from "lucide-react";
import { Button } from "@/components/ui/Button";

const mobileCategories = [
  { name: "Food & Dining", amount: "$1,392.00", pct: "32%", icon: Coffee, color: "bg-[#ea580c]" },
  { name: "Transport", amount: "$652.50", pct: "15%", icon: Car, color: "bg-amber-500" },
  { name: "Shopping", amount: "$522.00", pct: "12%", icon: ShoppingBag, color: "bg-rose-500" },
  { name: "Utilities", amount: "$565.50", pct: "13%", icon: Zap, color: "bg-purple-500" },
];

export function ExpenseFinalCTA() {
  const handleTrialClick = () => {
    if (typeof window !== "undefined" && (window as unknown as Record<string, unknown>).gtag) {
      const gtag = (window as unknown as Record<string, (action: string, eventName: string, params: Record<string, string>) => void>).gtag;
      gtag("event", "expense_tracker_trial_click", {
        event_category: "conversion",
        event_label: "final_cta",
      });
    }
  };

  return (
    <section className="py-14 sm:py-18 lg:py-20 bg-white relative overflow-hidden">
      <div className="container mx-auto px-4 md:px-6">
        
        {/* Banner Container */}
        <div className="relative rounded-3xl border border-[#ea580c]/25 bg-gradient-to-br from-[#ea580c]/10 via-slate-50/60 to-[#ea580c]/5 p-6 sm:p-10 lg:p-12 overflow-hidden shadow-xs">
          
          {/* Ambient Glow */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-[#ea580c]/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-20 -left-20 w-72 h-72 bg-amber-500/10 rounded-full blur-2xl pointer-events-none" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center relative z-10">
            
            {/* Left Content */}
            <div className="lg:col-span-7 text-left">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#ea580c]/15 border border-[#ea580c]/30 text-[#ea580c] text-xs font-semibold uppercase tracking-wider mb-3.5 shadow-xs">
                <Sparkles className="w-3.5 h-3.5 text-[#ea580c] flex-shrink-0" />
                <span>READY TO TAKE CONTROL?</span>
              </div>

              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-slate-900 leading-[1.2] mb-3.5">
                Take Control of Your Spending with Saviora
              </h2>

              <p className="text-sm sm:text-base text-slate-600 leading-relaxed max-w-xl mb-6">
                Start organizing your expenses, understand your spending habits, and build a clearer picture of your finances with Saviora. Try Saviora Pro free for 90 days and explore all features.
              </p>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 w-full sm:w-auto mb-6">
                <Button
                  asChild
                  size="lg"
                  className="bg-[#ea580c] hover:bg-[#c2410c] text-white font-semibold rounded-full px-6 py-3 shadow-md shadow-[#ea580c]/20 hover:shadow-lg hover:shadow-[#ea580c]/30 hover:-translate-y-0.5 transition-all duration-300 justify-center cursor-pointer text-sm"
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
                  className="bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 hover:border-slate-300 font-semibold rounded-full px-6 py-3 shadow-2xs transition-all duration-300 justify-center cursor-pointer text-sm"
                >
                  <Link href="/pricing">
                    View Pricing
                  </Link>
                </Button>
              </div>

              {/* Trust Indicators */}
              <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-xs sm:text-sm font-medium text-slate-600">
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-[#ea580c] flex-shrink-0" />
                  <span>Full access to included trial features</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-[#ea580c] flex-shrink-0" />
                  <span>No credit card required</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-[#ea580c] flex-shrink-0" />
                  <span>Cancel anytime</span>
                </div>
              </div>
            </div>

            {/* Right Visual: Authentic Saviora Smartphone + Expense Category Visual (Reference 3) */}
            <div className="lg:col-span-5 flex justify-center lg:justify-end items-center">
              
              <div className="relative flex items-center justify-center">
                
                {/* Secondary Floating Card: Category Breakdown (Reference 3) */}
                <div className="hidden sm:block absolute -left-12 lg:-left-20 top-8 z-0 w-52 bg-white rounded-2xl p-4 border border-slate-200/90 shadow-xl shadow-slate-900/10 text-left scale-90 lg:scale-95">
                  <div className="flex items-center justify-between pb-2 mb-2 border-b border-slate-100">
                    <span className="text-[11px] font-bold text-slate-800">Categories</span>
                    <span className="text-[10px] text-slate-400">Oct 2026</span>
                  </div>
                  
                  {/* Category Donut Preview Circle */}
                  <div className="flex items-center justify-center my-3">
                    <div className="w-20 h-20 rounded-full border-4 border-[#ea580c] border-t-amber-500 border-r-sky-500 border-b-rose-500 flex items-center justify-center text-center">
                      <div>
                        <div className="text-[11px] font-extrabold text-slate-900">$4,350</div>
                        <div className="text-[8px] text-slate-400 font-bold">TOTAL</div>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-1.5 text-[10px]">
                    <div className="flex items-center justify-between">
                      <span className="flex items-center gap-1 text-slate-600">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#ea580c]" /> Food & Dining
                      </span>
                      <span className="font-bold text-slate-800">32%</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="flex items-center gap-1 text-slate-600">
                        <span className="w-1.5 h-1.5 rounded-full bg-sky-500" /> Housing
                      </span>
                      <span className="font-bold text-slate-800">28%</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="flex items-center gap-1 text-slate-600">
                        <span className="w-1.5 h-1.5 rounded-full bg-amber-500" /> Transport
                      </span>
                      <span className="font-bold text-slate-800">15%</span>
                    </div>
                  </div>
                </div>

                {/* Smartphone Device Frame (Reference 3) */}
                <div className="relative z-10 w-[260px] sm:w-[275px] h-[470px] sm:h-[490px] rounded-[38px] border-[6px] border-slate-900 bg-white shadow-2xl shadow-slate-900/20 overflow-hidden text-left flex flex-col justify-between select-none">
                  
                  {/* Status Bar */}
                  <div className="pt-2 px-5 pb-1 bg-white flex items-center justify-between text-[10px] font-bold text-slate-900 flex-shrink-0">
                    <span>9:41 AM</span>
                    <div className="w-16 h-3 bg-slate-900 rounded-full" />
                    <div className="flex items-center gap-1">
                      <Wifi className="w-2.5 h-2.5" />
                      <div className="w-3.5 h-2 border border-slate-900 rounded-xs flex items-center p-0.5">
                        <div className="w-2 h-full bg-slate-900 rounded-2xs" />
                      </div>
                    </div>
                  </div>

                  {/* App Content */}
                  <div className="flex-1 p-3.5 bg-white flex flex-col justify-between overflow-hidden">
                    
                    {/* Header */}
                    <div>
                      <div className="flex items-center justify-between mb-2 pb-2 border-b border-slate-100">
                        <div>
                          <div className="text-xs font-bold text-slate-900">Expenses</div>
                          <div className="text-[9px] text-slate-400">October 2026</div>
                        </div>
                        <button
                          type="button"
                          className="w-6 h-6 rounded-lg bg-[#ea580c] hover:bg-[#c2410c] text-white flex items-center justify-center shadow-xs cursor-pointer transition-colors"
                          aria-label="Add Expense on mobile"
                        >
                          <Plus className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      {/* Main Mobile Total Card */}
                      <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 mb-3">
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-[9px] font-semibold text-slate-400 uppercase">Total Expenses</span>
                          <span className="text-[9px] font-bold text-[#ea580c] bg-[#ea580c]/10 px-1.5 py-0.5 rounded border border-[#ea580c]/20">
                            -5%
                          </span>
                        </div>
                        <div className="text-xl font-black text-slate-900 tracking-tight mb-2">
                          $4,350.50
                        </div>

                        {/* Mini Sparkline Bar Chart */}
                        <div className="h-10 flex items-end justify-between gap-1.5 pt-1">
                          {[35, 50, 45, 60, 75, 55, 90].map((h, i) => (
                            <div key={i} className="flex-1 bg-slate-100 rounded-t h-full flex items-end">
                              <div
                                className={`w-full rounded-t transition-all ${
                                  i === 6 ? "bg-[#ea580c]" : "bg-[#ea580c]/60"
                                }`}
                                style={{ height: `${h}%` }}
                              />
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Top Categories on Mobile */}
                    <div className="space-y-1.5">
                      <div className="text-[10px] font-bold text-slate-800 mb-1">Top Categories</div>
                      {mobileCategories.map((c, i) => {
                        const Icon = c.icon;
                        return (
                          <div key={i} className="flex items-center justify-between p-1.5 rounded-lg bg-slate-50/70 text-[10px]">
                            <div className="flex items-center gap-1.5">
                              <div className="w-5 h-5 rounded bg-white border border-slate-200 flex items-center justify-center text-slate-600">
                                <Icon className="w-2.5 h-2.5" />
                              </div>
                              <span className="font-semibold text-slate-700 truncate max-w-[90px]">{c.name}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <span className="font-bold text-slate-900">{c.amount}</span>
                              <span className="text-slate-400 font-semibold">{c.pct}</span>
                            </div>
                          </div>
                        );
                      })}
                    </div>

                    {/* Bottom Home Indicator */}
                    <div className="pt-2 text-center">
                      <div className="w-20 h-1 bg-slate-900/30 rounded-full mx-auto" />
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
