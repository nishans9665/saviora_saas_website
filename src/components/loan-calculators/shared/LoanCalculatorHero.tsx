"use client";

import React from "react";
import { Sparkles, CheckCircle2 } from "lucide-react";

interface LoanCalculatorHeroProps {
  badge?: string;
  title: string;
  description: string;
  highlightPills?: string[];
}

export function LoanCalculatorHero({
  badge = "Free Financial Calculator",
  title,
  description,
  highlightPills = [
    "Instant In-Browser Calculations",
    "No Registration Required",
    "Download Amortization CSV",
    "Verified Mathematical Formulas",
  ],
}: LoanCalculatorHeroProps) {
  return (
    <div className="text-center max-w-4xl mx-auto mb-10">
      <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200/60 text-xs font-semibold mb-4 shadow-2xs">
        <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
        <span>{badge}</span>
      </div>

      <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-gray-900 tracking-tight leading-tight">
        {title}
      </h1>

      <p className="mt-4 text-base sm:text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
        {description}
      </p>

      {highlightPills && highlightPills.length > 0 && (
        <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 mt-6 text-xs text-gray-500 font-medium">
          {highlightPills.map((pill, idx) => (
            <div key={idx} className="flex items-center gap-1.5 bg-gray-50/80 px-2.5 py-1 rounded-md border border-gray-200/50">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
              <span>{pill}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
