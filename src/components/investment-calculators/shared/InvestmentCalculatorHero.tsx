"use client";

import React from "react";
import { Sparkles, CheckCircle2, ShieldCheck, Download } from "lucide-react";

interface InvestmentCalculatorHeroProps {
  badge: string;
  title: string;
  description: string;
}

export function InvestmentCalculatorHero({
  badge,
  title,
  description,
}: InvestmentCalculatorHeroProps) {
  return (
    <div className="mb-8 text-center sm:text-left">
      <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200/60 mb-3 shadow-2xs">
        <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
        <span>{badge}</span>
      </div>

      <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight leading-tight">
        {title}
      </h1>

      <p className="mt-3 text-base sm:text-lg text-slate-600 max-w-3xl leading-relaxed">
        {description}
      </p>

      {/* Trust & Transparency Badges */}
      <div className="mt-4 flex flex-wrap items-center gap-3 sm:gap-4 text-xs font-medium text-slate-500">
        <span className="inline-flex items-center gap-1.5 text-slate-700">
          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          <span>Instant In-Browser Calculations</span>
        </span>
        <span className="inline-flex items-center gap-1.5 text-slate-700">
          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          <span>No Registration Required</span>
        </span>
        <span className="inline-flex items-center gap-1.5 text-slate-700">
          <Download className="w-4 h-4 text-emerald-600" />
          <span>Download Growth CSV</span>
        </span>
        <span className="inline-flex items-center gap-1.5 text-slate-700">
          <ShieldCheck className="w-4 h-4 text-emerald-600" />
          <span>Verified Financial Formulas</span>
        </span>
      </div>
    </div>
  );
}
