"use client";

import React from "react";
import Link from "next/link";
import {
  Sparkles,
  ArrowRight,
  CheckCircle2,
  CalendarCheck,
  RefreshCw,
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
        
        {/* Banner Container with lush emerald background matching the visual blueprint */}
        <div className="relative rounded-3xl bg-gradient-to-br from-[#15803d] via-[#16a34a] to-[#047857] text-white p-8 sm:p-12 lg:p-14 overflow-hidden shadow-xl shadow-emerald-950/10">
          
          {/* Subtle Ambient Glows */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-300/15 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-20 -left-20 w-72 h-72 bg-emerald-400/20 rounded-full blur-2xl pointer-events-none" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center relative z-10">
            
            {/* Left Graphic: Calendar Illustration Card */}
            <div className="hidden lg:flex lg:col-span-3 items-center justify-center">
              <div className="relative w-40 h-40 rounded-3xl bg-white/10 backdrop-blur-md border border-white/20 p-5 flex flex-col items-center justify-center shadow-lg">
                <div className="w-16 h-16 rounded-2xl bg-white flex items-center justify-center text-[#16a34a] shadow-md mb-2">
                  <CalendarCheck className="w-9 h-9" />
                </div>
                <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-100">
                  <RefreshCw className="w-3.5 h-3.5 animate-spin-slow" />
                  <span>On Autopilot</span>
                </div>
                {/* Decorative tick badge */}
                <div className="absolute -bottom-2 -right-2 w-9 h-9 rounded-full bg-emerald-300 text-emerald-950 flex items-center justify-center font-bold shadow-md">
                  <CheckCircle2 className="w-5 h-5" />
                </div>
              </div>
            </div>

            {/* Middle/Main Content */}
            <div className="lg:col-span-6 text-left">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/15 border border-white/20 text-emerald-100 text-xs font-semibold uppercase tracking-wider mb-4">
                <Sparkles className="w-3.5 h-3.5 text-emerald-200 flex-shrink-0" />
                <span>YOUR FINANCES, ORGANIZED</span>
              </div>

              <h2 className="text-2xl sm:text-3xl lg:text-[38px] font-extrabold tracking-tight leading-[1.2] mb-4 text-white">
                Spend Less Time on Repetitive Tracking. Focus More on Your Financial Goals.
              </h2>

              <p className="text-emerald-100 text-sm sm:text-base leading-relaxed mb-6 max-w-xl">
                Set up recurring income and expenses, organize your upcoming financial commitments, and keep your Saviora records up to date.
              </p>

              <div className="flex flex-wrap items-center gap-4 text-xs font-medium text-emerald-100/90">
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-300" />
                  <span>90-Day Pro Free Trial</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-300" />
                  <span>No Credit Card Required</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-300" />
                  <span>Cancel Anytime</span>
                </div>
              </div>
            </div>

            {/* Right Action Buttons */}
            <div className="lg:col-span-3 flex flex-col sm:flex-row lg:flex-col items-stretch gap-3.5 w-full">
              <Button
                asChild
                size="lg"
                className="bg-white text-emerald-950 hover:bg-emerald-50 font-bold rounded-full px-6 py-4 shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300 justify-center cursor-pointer text-sm sm:text-base border border-white"
                onClick={handleTrialClick}
              >
                <Link
                  href="https://cloud.saviora.app/register"
                  target="_blank"
                  className="flex items-center justify-center gap-2"
                >
                  <span>Start Your 90-Day Free Trial</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </Button>

              <Button
                asChild
                size="lg"
                variant="outline"
                className="bg-emerald-800/40 border-white/30 text-white hover:bg-emerald-800/60 font-semibold rounded-full px-6 py-3.5 transition-all duration-300 justify-center cursor-pointer text-sm sm:text-base"
              >
                <Link href="/pricing" className="flex items-center justify-center">
                  View Pricing
                </Link>
              </Button>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
