"use client";

import React from "react";
import Link from "next/link";
import { LocalizationSettingsMockup } from "./LocalizationSettingsMockup";
import {
  Globe2,
  ArrowRight,
  CheckCircle2,
  Sliders,
  DollarSign,
  Calendar,
  Sparkles,
} from "lucide-react";
import { Button } from "@/components/ui/Button";

export function CurrencyHero() {
  const handlePrimaryCtaClick = () => {
    if (typeof window !== "undefined" && (window as unknown as Record<string, unknown>).gtag) {
      const gtag = (
        window as unknown as Record<
          string,
          (action: string, eventName: string, params: Record<string, string>) => void
        >
      ).gtag;
      gtag("event", "multi_currency_trial_click", {
        event_category: "conversion",
        event_label: "hero_cta",
      });
    }
  };

  return (
    <section className="relative pt-28 sm:pt-32 md:pt-36 pb-16 sm:pb-24 overflow-hidden bg-gradient-to-b from-emerald-50/40 via-slate-50/60 to-white">
      {/* Ambient background aura */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[520px] bg-[radial-gradient(ellipse_75%_50%_at_50%_0%,rgba(34,197,94,0.12),transparent_75%)]" />
        <div className="absolute top-24 right-[-120px] w-96 h-96 bg-primary-400/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute top-44 left-[-120px] w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
      </div>

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-10 items-center">
          
          {/* Left Column: Heading, Copy & CTAs */}
          <div className="lg:col-span-5 xl:col-span-5 text-left flex flex-col items-start">
            
            {/* Eyebrow Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-100/80 border border-emerald-200/80 text-emerald-800 text-xs font-semibold uppercase tracking-wider mb-6 shadow-xs">
              <Globe2 className="w-3.5 h-3.5 text-primary-600 flex-shrink-0" />
              <span>MULTI-CURRENCY MANAGEMENT</span>
            </div>

            {/* H1 Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-[46px] xl:text-[52px] font-extrabold tracking-tight text-slate-900 leading-[1.15] mb-6">
              Manage Your Money in Your{" "}
              <span className="text-primary-600 relative inline-block">
                Preferred Currency
              </span>
            </h1>

            {/* Description */}
            <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-xl mb-8">
              Choose your main currency and personalize your financial settings with Saviora. Organize your income, expenses, budgets, and savings goals with a financial experience tailored to your preferences.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 w-full sm:w-auto mb-8">
              <Button
                asChild
                size="lg"
                className="bg-primary-500 hover:bg-primary-600 text-white font-semibold rounded-full px-7 py-3.5 shadow-md shadow-primary-500/20 hover:shadow-lg hover:shadow-primary-500/30 hover:-translate-y-0.5 transition-all duration-300 justify-center cursor-pointer"
                onClick={handlePrimaryCtaClick}
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
                className="bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 hover:border-slate-300 font-semibold rounded-full px-7 py-3.5 shadow-xs transition-all duration-300 justify-center cursor-pointer"
              >
                <Link href="#currency-selection">
                  Explore Features
                </Link>
              </Button>
            </div>

            {/* Trust Indicators */}
            <div className="flex flex-wrap items-center gap-x-6 gap-y-2.5 text-xs sm:text-sm font-medium text-slate-600">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-primary-500 flex-shrink-0" />
                <span>Independent currency & country setup</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-primary-500 flex-shrink-0" />
                <span>Consistent dashboard displays</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-primary-500 flex-shrink-0" />
                <span>No credit card required for 90-day trial</span>
              </div>
            </div>

          </div>

          {/* Right Column: Real Localization Settings Mockup */}
          <div className="lg:col-span-7 xl:col-span-7 w-full">
            <div className="relative mx-auto max-w-xl lg:max-w-none">
              
              {/* Subtle background glow - warm emerald/green */}
              <div className="absolute -inset-2 bg-gradient-to-r from-emerald-400/20 via-primary-400/15 to-emerald-500/20 rounded-3xl blur-2xl opacity-75 pointer-events-none" />

              {/* Main Card Wrapper */}
              <div className="relative rounded-2xl sm:rounded-3xl border border-slate-200/90 bg-white shadow-xl shadow-slate-900/5 overflow-hidden">
                
                {/* Browser-style Top Bar */}
                <div className="px-4 py-3 bg-slate-50/90 border-b border-slate-100 flex items-center justify-between text-xs text-slate-500">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-rose-400/80 inline-block" />
                    <span className="w-2.5 h-2.5 rounded-full bg-amber-400/80 inline-block" />
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-400/80 inline-block" />
                    <span className="ml-2 font-medium text-slate-600 hidden sm:inline-flex items-center gap-1.5">
                      <Sliders className="w-3 h-3 text-primary-600" />
                      Saviora App · Settings → Localization
                    </span>
                  </div>
                  <div className="inline-flex items-center gap-1.5 text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200/60 font-medium">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary-500 animate-pulse" />
                    Live Product View
                  </div>
                </div>

                {/* Real Product Visual: Vector-sharp Code Mockup */}
                <LocalizationSettingsMockup />

                {/* Floating Highlight Chips */}
                <div className="p-4 sm:p-5 bg-white border-t border-slate-100/90 flex flex-wrap items-center justify-between gap-3 text-xs">
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-lg bg-emerald-50 text-primary-600 border border-emerald-100 flex items-center justify-center font-bold">
                      <DollarSign className="w-4 h-4" />
                    </div>
                    <div>
                      <span className="block font-semibold text-slate-900">Main Currency</span>
                      <span className="text-slate-500">Configures financial symbols across the app</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-lg bg-emerald-50 text-primary-600 border border-emerald-100 flex items-center justify-center font-bold">
                      <Calendar className="w-4 h-4" />
                    </div>
                    <div>
                      <span className="block font-semibold text-slate-900">Regional Sync</span>
                      <span className="text-slate-500">Independent timezone, country & fiscal cycle</span>
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
