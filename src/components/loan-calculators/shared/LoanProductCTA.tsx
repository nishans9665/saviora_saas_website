"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight, ShieldCheck, Sparkles } from "lucide-react";

export function LoanProductCTA() {
  return (
    <section className="mt-16 bg-gradient-to-br from-[#1E104E] via-[#2D1B69] to-[#1E104E] rounded-3xl p-8 sm:p-12 text-white text-center shadow-xl relative overflow-hidden">
      {/* Background radial glow */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-[#F6850C]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 max-w-2xl mx-auto">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-semibold mb-4 border border-emerald-400/30">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Take Full Control of Your Finances</span>
        </div>

        <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
          Take Control of Your Financial Future
        </h2>

        <p className="mt-3 text-sm sm:text-base text-slate-300 leading-relaxed">
          Calculate your financial costs, plan your repayments, manage debts, track spending, and build long-term wealth effectively with Saviora.
        </p>

        <div className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link
            href="https://app.saviora.app/register"
            target="_blank"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white font-bold text-sm shadow-lg hover:shadow-emerald-500/25 transition"
          >
            <span>Start Managing Your Finances</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
          <Link
            href="/pricing"
            className="w-full sm:w-auto inline-flex items-center justify-center px-5 py-3 rounded-xl bg-white/10 hover:bg-white/15 text-white font-semibold text-sm transition"
          >
            <span>View Pricing &amp; Plans</span>
          </Link>
        </div>

        <div className="mt-6 flex flex-wrap items-center justify-center gap-4 text-[11px] text-slate-300">
          <span className="flex items-center gap-1">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" /> 90-Day Free Pro Trial
          </span>
          <span>•</span>
          <span>No Credit Card Required</span>
          <span>•</span>
          <span>Bank-Grade 256-bit Encryption</span>
        </div>
      </div>
    </section>
  );
}
