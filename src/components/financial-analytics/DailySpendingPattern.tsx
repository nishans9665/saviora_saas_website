"use client";

import React from "react";
import { Sparkles, Calendar, TrendingUp, Info } from "lucide-react";
import { AnimatedSection } from "@/components/ui/AnimatedSection";

const dailyDates = [
  "Sep 22", "Sep 24", "Sep 26", "Sep 28", "Sep 30",
  "Oct 02", "Oct 04", "Oct 06", "Oct 08", "Oct 10",
  "Oct 12", "Oct 14", "Oct 16", "Oct 18", "Oct 20",
];

export function DailySpendingPattern() {
  return (
    <section className="py-20 sm:py-24 bg-white relative overflow-hidden" id="daily-patterns">
      <div className="container mx-auto px-4 md:px-6">
        {/* Header */}
        <AnimatedSection className="text-center max-w-3xl mx-auto mb-14 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-orange-100/80 border border-orange-200/80 text-orange-800 text-xs font-semibold uppercase tracking-wider mb-4 shadow-xs">
            <Sparkles className="w-3.5 h-3.5 text-orange-600 flex-shrink-0" />
            <span>TRACK SPENDING TRENDS</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 mb-4">
            Explore Your Daily Spending Patterns
          </h2>

          <p className="text-base sm:text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
            Review spending activity across individual dates to see how recorded expenses change over time. Use the timeline to identify days with higher activity and investigate the transactions behind those amounts.
          </p>
        </AnimatedSection>

        {/* Timeline Chart Container */}
        <div className="max-w-5xl mx-auto">
          <div className="bg-white rounded-3xl border border-slate-200/90 p-6 sm:p-10 shadow-lg shadow-slate-900/5">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 mb-6 border-b border-slate-100 gap-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-orange-50 text-orange-600 flex items-center justify-center">
                  <TrendingUp className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-slate-900">
                    Daily Spending Pattern
                  </h3>
                  <p className="text-xs text-slate-400">
                    Daily outflow volume across the selected 30-day window
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2 text-xs font-semibold text-orange-600 bg-orange-50 px-3 py-1.5 rounded-lg border border-orange-200/60 self-start sm:self-auto">
                <Calendar className="w-3.5 h-3.5" />
                <span>Peak Volume: Oct 09 ($294,500.00)</span>
              </div>
            </div>

            {/* SVG Wave Graph */}
            <div className="relative pt-4 pb-4">
              <div className="h-64 sm:h-72 w-full relative">
                {/* Y-axis Guides */}
                <div className="absolute inset-0 flex flex-col justify-between pointer-events-none text-[11px] text-slate-400">
                  <div className="border-b border-slate-100 pb-1 flex justify-between">
                    <span>300k</span>
                  </div>
                  <div className="border-b border-slate-100 pb-1 flex justify-between">
                    <span>225k</span>
                  </div>
                  <div className="border-b border-slate-100 pb-1 flex justify-between">
                    <span>150k</span>
                  </div>
                  <div className="border-b border-slate-100 pb-1 flex justify-between">
                    <span>75k</span>
                  </div>
                  <div className="border-b border-slate-200 pb-1 flex justify-between">
                    <span>0</span>
                  </div>
                </div>

                {/* SVG Curve */}
                <svg
                  className="w-full h-full absolute inset-0 pt-2 pb-5"
                  viewBox="0 0 700 240"
                  preserveAspectRatio="none"
                >
                  <defs>
                    <linearGradient id="dailyGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#f97316" stopOpacity="0.25" />
                      <stop offset="100%" stopColor="#f97316" stopOpacity="0.0" />
                    </linearGradient>
                  </defs>

                  {/* Shaded Area */}
                  <path
                    d="M 20,230 L 320,230 Q 340,225 360,20 Q 375,180 390,230 Q 405,100 420,90 Q 440,200 460,130 Q 490,165 520,175 Q 550,185 580,180 Q 610,130 635,115 Q 655,160 680,170 L 680,230 Z"
                    fill="url(#dailyGrad)"
                  />

                  {/* Stroke Line */}
                  <path
                    d="M 20,230 L 320,230 Q 340,225 360,20 Q 375,180 390,230 Q 405,100 420,90 Q 440,200 460,130 Q 490,165 520,175 Q 550,185 580,180 Q 610,130 635,115 Q 655,160 680,170"
                    fill="none"
                    stroke="#f97316"
                    strokeWidth="3"
                    strokeLinecap="round"
                  />

                  {/* Peak Marker Dot */}
                  <circle cx="360" cy="20" r="5" fill="#ea580c" stroke="#ffffff" strokeWidth="2.5" />
                </svg>
              </div>

              {/* X-axis Timeline Labels */}
              <div className="flex justify-between text-[10px] sm:text-xs font-semibold text-slate-400 pt-3 overflow-x-auto no-scrollbar">
                {dailyDates.map((date, idx) => (
                  <span key={idx} className={idx % 2 === 0 ? "text-slate-700" : "hidden sm:inline text-slate-400"}>
                    {date}
                  </span>
                ))}
              </div>
            </div>

            {/* Explanatory Caption */}
            <div className="mt-6 pt-4 border-t border-slate-100 flex items-start gap-2.5 text-xs text-slate-500">
              <Info className="w-4 h-4 text-slate-400 flex-shrink-0 mt-0.5" />
              <span>
                Timeline charts visualize recorded historical amounts to highlight spending volatility. Saviora does not forecast future behavior, predict upcoming bills, or automatically execute financial transfers.
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
