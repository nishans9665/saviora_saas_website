"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Sparkles,
  ArrowRight,
  CheckCircle2,
  Globe2,
  ShieldCheck,
  CreditCard,
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import logoSaviora from "@/assets/logo/logo-saviora-web-tag.svg";

export function CurrencyFinalCTA() {
  const handleTrialClick = () => {
    if (typeof window !== "undefined" && (window as unknown as Record<string, unknown>).gtag) {
      const gtag = (
        window as unknown as Record<
          string,
          (action: string, eventName: string, params: Record<string, string>) => void
        >
      ).gtag;
      gtag("event", "multi_currency_final_cta_click", {
        event_category: "conversion",
        event_label: "final_cta",
      });
    }
  };

  return (
    <section className="py-16 sm:py-20 lg:py-24 bg-white relative overflow-hidden" id="final-cta">
      <div className="container mx-auto px-4 md:px-6">
        
        {/* Banner Container with soft green & slate background */}
        <div className="relative rounded-3xl border border-emerald-200/80 bg-gradient-to-br from-emerald-50/70 via-slate-50/60 to-teal-50/50 p-6 sm:p-10 lg:p-14 overflow-hidden shadow-sm">
          
          {/* Ambient Glows */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-primary-400/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-20 -left-20 w-72 h-72 bg-emerald-500/10 rounded-full blur-2xl pointer-events-none" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center relative z-10">
            
            {/* Left Content */}
            <div className="lg:col-span-7 text-left">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-100/80 border border-emerald-200/80 text-emerald-800 text-xs font-semibold uppercase tracking-wider mb-4 shadow-xs">
                <Sparkles className="w-3.5 h-3.5 text-primary-600 flex-shrink-0" />
                <span>START CUSTOMIZING YOUR EXPERIENCE</span>
              </div>

              <h2 className="text-3xl sm:text-4xl lg:text-[42px] font-extrabold tracking-tight text-slate-900 leading-[1.18] mb-4">
                Make Saviora Work for{" "}
                <span className="text-primary-600">Your Financial Preferences</span>
              </h2>

              <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-xl mb-8">
                Choose your available regional settings and organize your income, expenses, budgets, and savings goals with Saviora.
              </p>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 w-full sm:w-auto mb-8">
                <Button
                  asChild
                  size="lg"
                  className="bg-primary-500 hover:bg-primary-600 text-white font-semibold rounded-full px-7 py-3.5 shadow-md shadow-primary-500/25 hover:shadow-lg hover:shadow-primary-500/35 hover:-translate-y-0.5 transition-all duration-300 justify-center cursor-pointer text-sm sm:text-base"
                  onClick={handleTrialClick}
                >
                  <Link
                    href="https://cloud.saviora.app/register"
                    target="_blank"
                    rel="noopener noreferrer"
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
                  className="bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 hover:border-slate-300 font-semibold rounded-full px-7 py-3.5 shadow-xs transition-all duration-300 justify-center cursor-pointer text-sm sm:text-base"
                >
                  <Link href="/pricing">
                    View Pricing
                  </Link>
                </Button>
              </div>

              {/* Trust Indicators */}
              <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-xs sm:text-sm font-medium text-slate-600">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-primary-500 flex-shrink-0" />
                  <span>90-day free trial</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-primary-500 flex-shrink-0" />
                  <span>No credit card required</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-primary-500 flex-shrink-0" />
                  <span>Cancel anytime</span>
                </div>
              </div>

            </div>

            {/* Right Mini Preview Card */}
            <div className="lg:col-span-5 w-full">
              <div className="rounded-2xl border border-slate-200/90 bg-white/95 backdrop-blur-xs p-6 shadow-xl shadow-slate-900/5 max-w-md mx-auto">
                <div className="flex items-center justify-between pb-4 mb-4 border-b border-slate-100">
                  <Image src={logoSaviora} alt="Saviora" className="h-6 w-auto object-contain" priority />
                  <span className="text-[11px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
                    All-in-One Finance
                  </span>
                </div>

                <div className="space-y-3 mb-5">
                  <div className="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-100 text-xs">
                    <span className="text-slate-500">Configured Currency</span>
                    <span className="font-bold text-slate-800 font-mono">USD ($) · Global</span>
                  </div>
                  <div className="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-100 text-xs">
                    <span className="text-slate-500">Accounting Cycle</span>
                    <span className="font-bold text-slate-800">January - December</span>
                  </div>
                  <div className="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-100 text-xs">
                    <span className="text-slate-500">Active Modules</span>
                    <span className="font-bold text-emerald-600">Income · Expenses · Budgets · Savings</span>
                  </div>
                </div>

                <Link
                  href="https://cloud.saviora.app/register"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-2.5 rounded-xl bg-primary-500 hover:bg-primary-600 text-white font-semibold text-xs flex items-center justify-center gap-1.5 transition-colors"
                >
                  <span>Start Free Trial</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
