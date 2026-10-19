"use client";

import React from "react";
import Link from "next/link";
import {
  Sparkles,
  ArrowRight,
  CheckCircle2,
  PieChart,
  ShieldCheck,
  TrendingUp,
} from "lucide-react";
import { Button } from "@/components/ui/Button";

export function BudgetFinalCTA() {
  const handleCtaClick = () => {
    if (typeof window !== "undefined" && (window as unknown as Record<string, unknown>).gtag) {
      const gtag = (window as unknown as Record<string, (action: string, eventName: string, params: Record<string, string>) => void>).gtag;
      gtag("event", "budget_planning_trial_click", {
        event_category: "conversion",
        event_label: "final_cta",
      });
    }
  };

  return (
    <section className="py-16 sm:py-20 lg:py-24 bg-white relative overflow-hidden" id="get-started">
      <div className="container mx-auto px-4 md:px-6">
        {/* Banner Container with Rich Green Gradient */}
        <div className="relative rounded-3xl border border-emerald-300/60 bg-gradient-to-br from-emerald-700 via-emerald-800 to-emerald-950 p-8 sm:p-12 lg:p-16 overflow-hidden shadow-xl shadow-emerald-950/10 text-white">
          {/* Ambient background glows */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/20 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-teal-400/10 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 max-w-3xl mx-auto text-center flex flex-col items-center">
            {/* Tagline Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 border border-white/20 text-emerald-200 text-xs font-bold uppercase tracking-widest mb-6 backdrop-blur-md shadow-xs">
              <Sparkles className="w-3.5 h-3.5 text-emerald-300 flex-shrink-0" />
              <span>Track • Save • Grow</span>
            </div>

            {/* H2 Headline */}
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-tight mb-5">
              Take Control of Your Monthly Spending
            </h2>

            {/* Description */}
            <p className="text-base sm:text-lg text-emerald-100/90 leading-relaxed max-w-2xl mb-8">
              Create your budgets, monitor your expenses, and build healthier financial habits with Saviora. Experience full category control and strict spending boundaries today.
            </p>

            {/* CTA Button */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-4 w-full sm:w-auto mb-8">
              <Button
                asChild
                size="lg"
                className="bg-white hover:bg-slate-100 text-emerald-900 font-bold rounded-full px-8 py-4 shadow-lg shadow-black/10 hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300 cursor-pointer text-base"
                onClick={handleCtaClick}
              >
                <Link
                  href="https://cloud.saviora.app/register"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center"
                >
                  <span>Start Budget Planning</span>
                  <ArrowRight className="w-4 h-4 ml-2 text-emerald-700" />
                </Link>
              </Button>

              <Button
                asChild
                size="lg"
                variant="outline"
                className="border-emerald-300/40 bg-white/10 hover:bg-white/20 text-white font-semibold rounded-full px-8 py-4 backdrop-blur-sm transition-all duration-300 cursor-pointer text-base"
              >
                <Link href="/pricing">View Pricing Plans</Link>
              </Button>
            </div>

            {/* Supporting Trust Badges */}
            <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2.5 text-xs sm:text-sm text-emerald-200/90 font-medium">
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-300 flex-shrink-0" />
                <span>90-Day Free Pro Trial</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-300 flex-shrink-0" />
                <span>No Credit Card Required</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-300 flex-shrink-0" />
                <span>Cancel Anytime</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
