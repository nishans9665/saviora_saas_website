"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight, Sparkles, ShieldCheck, Zap, TrendingUp } from "lucide-react";
import { LAUNCH_OFFER } from "@/lib/offer-config";

export function InvestmentProductCTA() {
  return (
    <div className="mt-12 bg-gradient-to-br from-slate-900 via-slate-900 to-emerald-950 text-white rounded-3xl p-6 sm:p-10 relative overflow-hidden shadow-xl border border-slate-800 print:hidden">
      {/* Glow aura */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 max-w-2xl">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 mb-4">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Build Better Financial Habits with Saviora</span>
        </div>

        <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight leading-tight">
          Track Your Income, Plan Budgets &amp; Grow Your Wealth
        </h2>

        <p className="mt-3 text-sm sm:text-base text-slate-300 leading-relaxed">
          While free calculators help project future values, Saviora gives you daily visibility into real cash
          flow, recurring investments, savings goals, and multi-currency accounts.
        </p>

        <div className="mt-6 flex flex-wrap items-center gap-3">
          <Link
            href={LAUNCH_OFFER.registerUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-sm bg-emerald-500 hover:bg-emerald-400 text-slate-950 transition shadow-lg hover:shadow-emerald-500/20 group cursor-pointer"
          >
            <span>Start Managing Your Finances</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>

          <Link
            href="/pricing"
            className="inline-flex items-center gap-2 px-5 py-3 rounded-xl font-semibold text-sm text-slate-300 hover:text-white bg-white/5 hover:bg-white/10 border border-white/10 transition"
          >
            <span>View 90-Day Free Trial</span>
          </Link>
        </div>

        <div className="mt-6 flex flex-wrap items-center gap-4 text-xs text-slate-400">
          <span className="flex items-center gap-1">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
            90-Day Full Access
          </span>
          <span className="flex items-center gap-1">
            <Zap className="w-3.5 h-3.5 text-emerald-400" />
            No Credit Card Required
          </span>
          <span className="flex items-center gap-1">
            <TrendingUp className="w-3.5 h-3.5 text-emerald-400" />
            Multi-Currency Support
          </span>
        </div>
      </div>
    </div>
  );
}
