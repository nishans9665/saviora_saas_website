"use client";

import React from "react";
import { ShieldCheck, Clock, Calculator, Sparkles } from "lucide-react";

interface CalculatorHeroProps {
  badge?: React.ReactNode;
  title: string;
  highlightedWord?: string;
  description: string;
  lastUpdated?: string;
  authorityName?: string;
}

export function CalculatorHero({
  badge = "Free Financial Tool",
  title,
  highlightedWord,
  description,
  lastUpdated,
  authorityName = "Official Statutory Regulations",
}: CalculatorHeroProps) {
  return (
    <div className="mb-8 sm:mb-12 text-left">
      {/* Badge */}
      <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold uppercase tracking-wider mb-4 shadow-xs">
        <Calculator className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
        <span>{badge}</span>
      </div>

      {/* H1 Heading */}
      <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-[#1E104E] leading-[1.15] mb-4">
        {title}{" "}
        {highlightedWord && (
          <span className="text-emerald-600">{highlightedWord}</span>
        )}
      </h1>

      {/* Description */}
      <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-3xl mb-4">
        {description}
      </p>

      {/* Trust & Verification Meta */}
      <div className="flex flex-wrap items-center gap-4 text-xs font-medium text-slate-500 pt-2 border-t border-slate-100">
        <span className="inline-flex items-center gap-1.5 text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
          Verified Against {authorityName}
        </span>
        {lastUpdated && (
          <span className="inline-flex items-center gap-1.5 text-slate-600">
            <Clock className="w-3.5 h-3.5 text-slate-400 shrink-0" />
            Ruleset: {lastUpdated}
          </span>
        )}
        <span className="inline-flex items-center gap-1.5 text-slate-600">
          <Sparkles className="w-3.5 h-3.5 text-amber-500 shrink-0" />
          100% Free &bull; No Sign Up Required
        </span>
      </div>
    </div>
  );
}
