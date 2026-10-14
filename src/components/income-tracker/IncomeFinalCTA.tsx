"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { 
  Sparkles, 
  ArrowRight, 
  CheckCircle2, 
  Calendar,
  Unlock,
  Download,
  Plus,
  TrendingUp,
  Clock,
  Bell,
  Menu,
  ChevronDown,
  RotateCw,
  Share,
  BookOpen,
  Layers,
  ChevronLeft,
  ChevronRight,
  Lock,
  Wifi
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import logoSaviora from "@/assets/logo/logo-saviora-web-tag.svg";

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
    <section className="py-14 sm:py-18 lg:py-20 bg-white relative overflow-hidden">
      <div className="container mx-auto px-4 md:px-6">
        
        {/* Banner Container */}
        <div className="relative rounded-3xl border border-[#22c55e]/25 bg-gradient-to-br from-[#22c55e]/10 via-slate-50/60 to-[#22c55e]/5 p-6 sm:p-10 lg:p-12 overflow-hidden shadow-xs">
          
          {/* Ambient Glow */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-[#22c55e]/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-20 -left-20 w-72 h-72 bg-emerald-400/10 rounded-full blur-2xl pointer-events-none" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center relative z-10">
            
            {/* Left Content */}
            <div className="lg:col-span-7 text-left">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#22c55e]/15 border border-[#22c55e]/30 text-[#16a34a] text-xs font-semibold uppercase tracking-wider mb-3.5 shadow-xs">
                <Sparkles className="w-3.5 h-3.5 text-[#22c55e] flex-shrink-0" />
                <span>READY TO TAKE CONTROL?</span>
              </div>

              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-slate-900 leading-[1.2] mb-3.5">
                Start Tracking Your Income with Saviora
              </h2>

              <p className="text-sm sm:text-base text-slate-600 leading-relaxed max-w-xl mb-6">
                Join thousands of users who are managing their money with more clarity. Try Saviora Pro free for 90 days and explore all features.
              </p>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 w-full sm:w-auto mb-6">
                <Button
                  asChild
                  size="lg"
                  className="bg-[#22c55e] hover:bg-[#16a34a] text-white font-semibold rounded-full px-6 py-3 shadow-md shadow-[#22c55e]/20 hover:shadow-lg hover:shadow-[#22c55e]/30 hover:-translate-y-0.5 transition-all duration-300 justify-center cursor-pointer text-sm"
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
                  <CheckCircle2 className="w-4 h-4 text-[#22c55e] flex-shrink-0" />
                  <span>Full access to all features</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-[#22c55e] flex-shrink-0" />
                  <span>No credit card required</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-[#22c55e] flex-shrink-0" />
                  <span>Cancel anytime</span>
                </div>
              </div>
            </div>

            {/* Right Visual: Real Saviora Mobile iPhone View Mockup (Authentic Smartphone Dimensions) */}
            <div className="lg:col-span-5 flex justify-center lg:justify-end items-center">
              <div className="w-[270px] sm:w-[285px] h-[485px] sm:h-[505px] rounded-[42px] border-[7px] border-slate-900 bg-white shadow-2xl shadow-slate-900/15 overflow-hidden text-left flex flex-col justify-between select-none">
                
                {/* Status Bar & Dynamic Island */}
                <div className="pt-2.5 px-6 pb-1 bg-white flex items-center justify-between text-[10px] font-bold text-slate-900 flex-shrink-0">
                  <span>10:51 PM</span>
                  {/* Dynamic Island / Speaker Notch */}
                  <div className="w-18 h-3.5 bg-slate-900 rounded-full flex items-center justify-center">
                    <div className="w-2 h-2 rounded-full bg-slate-950 border border-slate-800" />
                  </div>
                  <div className="flex items-center gap-1 text-slate-800">
                    <Wifi className="w-2.5 h-2.5" />
                    <div className="w-4 h-2 rounded-xs border border-slate-800 p-0.5 flex items-center">
                      <div className="w-2.5 h-full bg-[#22c55e] rounded-2xs" />
                    </div>
                  </div>
                </div>

                {/* Saviora Mobile App Top Header */}
                <div className="px-3.5 py-2 flex items-center justify-between border-b border-slate-100 bg-white flex-shrink-0">
                  <div className="flex items-center">
                    <Image src={logoSaviora} alt="Saviora" className="h-5.5 w-auto object-contain" />
                  </div>
                  <div className="flex items-center gap-1.5">
                    <div className="w-6 h-6 rounded-lg bg-slate-50 border border-slate-200/60 flex items-center justify-center text-slate-600">
                      <Bell className="w-3.5 h-3.5" />
                    </div>
                    <div className="flex items-center gap-0.5 bg-slate-50 border border-slate-200/60 rounded-lg p-0.5 pr-1">
                      <div className="w-5 h-5 rounded-md bg-gradient-to-tr from-emerald-500 to-sky-500 text-[9px] text-white font-bold flex items-center justify-center">
                        JD
                      </div>
                      <ChevronDown className="w-2.5 h-2.5 text-slate-400" />
                    </div>
                    <div className="w-6 h-6 flex items-center justify-center text-slate-700">
                      <Menu className="w-4 h-4" />
                    </div>
                  </div>
                </div>

                {/* App Screen Content Body */}
                <div className="p-3 bg-slate-50/50 space-y-2 flex-1 flex flex-col justify-between overflow-hidden">
                  
                  {/* Financial Period Card */}
                  <div className="bg-white rounded-xl border border-slate-200/80 p-2.5 shadow-2xs">
                    <div className="flex items-center gap-2 mb-1.5">
                      <div className="w-5.5 h-5.5 rounded-md bg-[#22c55e]/15 text-[#16a34a] flex items-center justify-center flex-shrink-0">
                        <Calendar className="w-3.5 h-3.5" />
                      </div>
                      <div>
                        <div className="text-[7.5px] font-bold text-slate-400 uppercase tracking-wider leading-none">FINANCIAL PERIOD</div>
                        <div className="text-xs font-bold text-slate-800 flex items-center gap-1 mt-0.5">
                          <span>October 2026</span>
                          <ChevronDown className="w-2.5 h-2.5 text-slate-400" />
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-1.5 border-t border-slate-100">
                      <div>
                        <div className="text-[7.5px] font-bold text-slate-400 uppercase tracking-wider leading-none">STATUS</div>
                        <div className="text-[9.5px] font-bold text-[#16a34a] flex items-center gap-1 mt-0.5">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#22c55e] animate-pulse" />
                          <Unlock className="w-2.5 h-2.5" />
                          <span>OPEN</span>
                        </div>
                      </div>
                      <button
                        type="button"
                        className="px-2 py-0.5 rounded-md bg-slate-50 hover:bg-slate-100 border border-slate-200 text-[9.5px] font-semibold text-slate-700 flex items-center gap-1"
                      >
                        <Unlock className="w-2.5 h-2.5 text-slate-500" />
                        <span>Close Month</span>
                      </button>
                    </div>
                  </div>

                  {/* Export Action Button */}
                  <button
                    type="button"
                    className="w-full py-1.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-[10.5px] font-semibold text-slate-700 flex items-center justify-center gap-1.5 shadow-2xs"
                  >
                    <Download className="w-3 h-3 text-slate-500" />
                    <span>Export</span>
                  </button>

                  {/* Add Income Primary Button */}
                  <button
                    type="button"
                    className="w-full py-2 rounded-xl bg-[#22c55e] hover:bg-[#16a34a] text-white text-[11px] font-bold flex items-center justify-center gap-1.5 shadow-xs"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Add Income</span>
                  </button>

                  {/* Metric Card 1: Monthly Income */}
                  <div className="bg-white rounded-xl border border-slate-200/80 p-2.5 shadow-2xs relative">
                    <TrendingUp className="w-5 h-5 text-slate-200 absolute top-2 right-2 pointer-events-none" />
                    <div className="text-[8px] font-bold text-slate-400 uppercase tracking-wider mb-0.5">MONTHLY INCOME</div>
                    <div className="text-sm font-extrabold text-slate-900">$5,420.00</div>
                    <div className="text-[8.5px] font-semibold text-[#16a34a] flex items-center gap-1 mt-0.5">
                      <CheckCircle2 className="w-2.5 h-2.5" />
                      <span>Total Received Only</span>
                    </div>
                  </div>

                  {/* Metric Card 2: Expected Income */}
                  <div className="bg-white rounded-xl border border-slate-200/80 p-2.5 shadow-2xs relative">
                    <Clock className="w-5 h-5 text-slate-200 absolute top-2 right-2 pointer-events-none" />
                    <div className="text-[8px] font-bold text-slate-400 uppercase tracking-wider mb-0.5">EXPECTED INCOME</div>
                    <div className="text-sm font-extrabold text-slate-900">$0.00</div>
                    <div className="text-[8.5px] font-semibold text-amber-500 mt-0.5">
                      Pending + Scheduled
                    </div>
                  </div>

                  {/* Metric Card 3: Total Planned Income */}
                  <div className="bg-white rounded-xl border border-slate-200/80 p-2 shadow-2xs flex items-center justify-between">
                    <div>
                      <div className="text-[8px] font-bold text-slate-400 uppercase tracking-wider mb-0.5">TOTAL PLANNED INCOME</div>
                      <div className="text-sm font-extrabold text-slate-900">$5,420.00</div>
                    </div>
                    <div className="w-6 h-6 rounded-full bg-[#22c55e] text-white flex items-center justify-center shadow-xs">
                      <Plus className="w-3.5 h-3.5" />
                    </div>
                  </div>

                </div>

                {/* Safari Bottom Browser Toolbar */}
                <div className="bg-slate-100/95 border-t border-slate-200 px-3 py-1.5 flex-shrink-0">
                  {/* Safari URL Bar */}
                  <div className="bg-white rounded-lg border border-slate-200 px-2 py-0.5 flex items-center justify-between text-[8.5px] text-slate-600 mb-1 shadow-2xs">
                    <span className="font-semibold text-slate-400">AA</span>
                    <div className="flex items-center gap-1 font-medium text-slate-700">
                      <Lock className="w-2.5 h-2.5 text-slate-400" />
                      <span>cloud.saviora.app</span>
                    </div>
                    <RotateCw className="w-2.5 h-2.5 text-slate-400" />
                  </div>

                  {/* Safari Nav Icons */}
                  <div className="flex items-center justify-between px-2 pt-0.5 text-sky-600">
                    <ChevronLeft className="w-3.5 h-3.5 text-slate-400" />
                    <ChevronRight className="w-3.5 h-3.5 text-slate-300" />
                    <Share className="w-3.5 h-3.5" />
                    <BookOpen className="w-3.5 h-3.5" />
                    <Layers className="w-3.5 h-3.5" />
                  </div>

                  {/* Home Indicator Bar */}
                  <div className="w-22 h-1 bg-slate-900 rounded-full mx-auto mt-1.5" />
                </div>

              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
