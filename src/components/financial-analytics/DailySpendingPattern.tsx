"use client";

import React, { useState } from "react";
import {
  Sparkles,
  Calendar,
  TrendingUp,
  Info,
  ArrowUpRight,
  Zap,
  Activity,
  Flame,
} from "lucide-react";
import { AnimatedSection } from "@/components/ui/AnimatedSection";

interface DailyRecord {
  date: string;
  fullDate: string;
  amount: number;
  formattedAmount: string;
  note: string;
  isPeak?: boolean;
}

const dailyData: DailyRecord[] = [
  { date: "Sep 22", fullDate: "Sep 22, 2026", amount: 48.5, formattedAmount: "$48.50", note: "Weekly transit pass & casual coffee" },
  { date: "Sep 24", fullDate: "Sep 24, 2026", amount: 92.0, formattedAmount: "$92.00", note: "Midweek grocery essentials & pharmacy" },
  { date: "Sep 26", fullDate: "Sep 26, 2026", amount: 34.2, formattedAmount: "$34.20", note: "Casual lunch & convenience store" },
  { date: "Sep 28", fullDate: "Sep 28, 2026", amount: 145.0, formattedAmount: "$145.00", note: "Dinner gathering & weekend cinema" },
  { date: "Sep 30", fullDate: "Sep 30, 2026", amount: 188.5, formattedAmount: "$188.50", note: "Streaming subscriptions & gym dues" },
  { date: "Oct 02", fullDate: "Oct 02, 2026", amount: 65.0, formattedAmount: "$65.00", note: "Fuel fill-up & express car wash" },
  { date: "Oct 04", fullDate: "Oct 04, 2026", amount: 112.4, formattedAmount: "$112.40", note: "Farmers market & pantry replenishment" },
  { date: "Oct 06", fullDate: "Oct 06, 2026", amount: 210.0, formattedAmount: "$210.00", note: "Home decor & kitchen storage" },
  { date: "Oct 08", fullDate: "Oct 08, 2026", amount: 175.0, formattedAmount: "$175.00", note: "Annual professional development course" },
  { date: "Oct 09", fullDate: "Oct 09, 2026", amount: 485.0, formattedAmount: "$485.00", note: "Quarterly vehicle maintenance & tires", isPeak: true },
  { date: "Oct 12", fullDate: "Oct 12, 2026", amount: 128.5, formattedAmount: "$128.50", note: "Family weekend dining & entertainment" },
  { date: "Oct 14", fullDate: "Oct 14, 2026", amount: 84.0, formattedAmount: "$84.00", note: "Routine dental checkup co-pay" },
  { date: "Oct 16", fullDate: "Oct 16, 2026", amount: 68.2, formattedAmount: "$68.20", note: "Books & educational supplies" },
  { date: "Oct 18", fullDate: "Oct 18, 2026", amount: 154.0, formattedAmount: "$154.00", note: "Autumn wardrobe & running shoes" },
  { date: "Oct 20", fullDate: "Oct 20, 2026", amount: 55.8, formattedAmount: "$55.80", note: "Active daily groceries & routine needs" },
];

const DAILY_BENCHMARK = 137.10; // $4,250 / 31 days personal finance average

// Dimensions & Scale Constants
const SVG_WIDTH = 750;
const SVG_HEIGHT = 280;
const PADDING_LEFT = 65;
const PADDING_RIGHT = 45;
const Y_BASELINE = 235; // $0
const Y_TOP = 35; // $600 max
const MAX_VALUE = 600;

function getY(val: number): number {
  const ratio = Math.max(0, Math.min(1, val / MAX_VALUE));
  return Y_BASELINE - ratio * (Y_BASELINE - Y_TOP);
}

function getX(index: number, total: number): number {
  const usableWidth = SVG_WIDTH - PADDING_LEFT - PADDING_RIGHT;
  return PADDING_LEFT + (index / (total - 1)) * usableWidth;
}

// Generate smooth monotonic cubic Bezier path with strictly forward control points
function createSmoothWavePath(points: { x: number; y: number }[]): string {
  if (points.length === 0) return "";
  if (points.length === 1) return `M ${points[0].x},${points[0].y}`;

  let d = `M ${points[0].x},${points[0].y}`;
  const tension = 0.22;

  for (let i = 0; i < points.length - 1; i++) {
    const p0 = points[i === 0 ? 0 : i - 1];
    const p1 = points[i];
    const p2 = points[i + 1];
    const p3 = points[i + 2 < points.length ? i + 2 : i + 1];

    const cp1x = p1.x + (p2.x - p0.x) * tension;
    const cp1y = p1.y + (p2.y - p0.y) * tension;
    const cp2x = p2.x - (p3.x - p1.x) * tension;
    const cp2y = p2.y - (p3.y - p1.y) * tension;

    d += ` C ${cp1x.toFixed(1)},${cp1y.toFixed(1)} ${cp2x.toFixed(1)},${cp2y.toFixed(1)} ${p2.x.toFixed(1)},${p2.y.toFixed(1)}`;
  }
  return d;
}

export function DailySpendingPattern() {
  const [selectedIndex, setSelectedIndex] = useState<number>(9); // Default to Oct 09 Peak
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const activeIndex = hoveredIndex !== null ? hoveredIndex : selectedIndex;
  const activeRecord = dailyData[activeIndex];

  // Coordinates
  const points = dailyData.map((d, i) => ({
    x: getX(i, dailyData.length),
    y: getY(d.amount),
  }));

  const wavePath = createSmoothWavePath(points);
  const areaPath = `${wavePath} L ${points[points.length - 1].x},${Y_BASELINE} L ${points[0].x},${Y_BASELINE} Z`;

  // Benchmark guideline Y
  const benchmarkY = getY(DAILY_BENCHMARK);

  const diffFromBenchmark = activeRecord.amount - DAILY_BENCHMARK;
  const isAboveBenchmark = diffFromBenchmark >= 0;

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
          <div className="bg-white rounded-3xl border border-slate-200/90 p-5 sm:p-10 shadow-lg shadow-slate-900/5">
            {/* Top Toolbar */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 mb-6 border-b border-slate-100 gap-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-orange-50 text-orange-600 flex items-center justify-center">
                  <TrendingUp className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-slate-900">
                    Daily Spending Pattern
                  </h3>
                  <p className="text-xs text-slate-400">
                    Daily outflow volume across the selected 30-day reporting window
                  </p>
                </div>
              </div>

              {/* Quick Jump Badges */}
              <div className="flex flex-wrap items-center gap-2">
                <button
                  type="button"
                  onClick={() => setSelectedIndex(9)}
                  className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold border transition-all cursor-pointer ${
                    selectedIndex === 9
                      ? "bg-orange-500 border-orange-500 text-white shadow-xs"
                      : "bg-orange-50/80 border-orange-200/80 text-orange-700 hover:bg-orange-100"
                  }`}
                >
                  <Flame className="w-3.5 h-3.5" />
                  <span>Peak Volume: Oct 09 ($485.00)</span>
                </button>

                <button
                  type="button"
                  onClick={() => setSelectedIndex(14)}
                  className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold border transition-all cursor-pointer ${
                    selectedIndex === 14
                      ? "bg-slate-900 border-slate-900 text-white shadow-xs"
                      : "bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100"
                  }`}
                >
                  <Calendar className="w-3.5 h-3.5" />
                  <span>Oct 20 (Latest)</span>
                </button>
              </div>
            </div>

            {/* SVG Visual Graph */}
            <div className="relative pt-2 pb-6">
              <div className="h-72 sm:h-80 w-full relative">
                {/* Y-axis Labels & Gridlines */}
                <div className="absolute inset-0 flex flex-col justify-between pointer-events-none text-[11px] font-medium text-slate-400">
                  <div className="border-b border-slate-100 pb-1 flex justify-between">
                    <span className="w-12">$600</span>
                  </div>
                  <div className="border-b border-slate-100 pb-1 flex justify-between">
                    <span className="w-12">$450</span>
                  </div>
                  <div className="border-b border-slate-100 pb-1 flex justify-between">
                    <span className="w-12">$300</span>
                  </div>
                  <div className="border-b border-slate-100 pb-1 flex justify-between">
                    <span className="w-12">$150</span>
                  </div>
                  <div className="border-b border-slate-200 pb-1 flex justify-between">
                    <span className="w-12">$0</span>
                  </div>
                </div>

                {/* SVG Curve Canvas */}
                <svg
                  className="w-full h-full absolute inset-0"
                  viewBox={`0 0 ${SVG_WIDTH} ${SVG_HEIGHT}`}
                  preserveAspectRatio="none"
                >
                  <defs>
                    {/* Primary Orange Gradient */}
                    <linearGradient id="dailyWaveGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#f97316" stopOpacity="0.28" />
                      <stop offset="60%" stopColor="#f97316" stopOpacity="0.08" />
                      <stop offset="100%" stopColor="#f97316" stopOpacity="0.0" />
                    </linearGradient>

                    {/* Peak Highlight Pulse Filter */}
                    <filter id="peakGlow" x="-30%" y="-30%" width="160%" height="160%">
                      <feGaussianBlur stdDeviation="3.5" result="blur" />
                      <feComposite in="SourceGraphic" in2="blur" operator="over" />
                    </filter>
                  </defs>

                  {/* Benchmark 30-Day Avg Dashed Guideline */}
                  <line
                    x1={PADDING_LEFT}
                    y1={benchmarkY}
                    x2={SVG_WIDTH - PADDING_RIGHT}
                    y2={benchmarkY}
                    stroke="#94a3b8"
                    strokeWidth="1"
                    strokeDasharray="3 3"
                    strokeOpacity="0.7"
                  />
                  <text
                    x={SVG_WIDTH - PADDING_RIGHT - 4}
                    y={benchmarkY - 4}
                    textAnchor="end"
                    fill="#64748b"
                    fontSize="9"
                    fontWeight="600"
                  >
                    Avg: $137.10
                  </text>

                  {/* Active Selected Day Vertical Indicator Band */}
                  <line
                    x1={points[activeIndex].x}
                    y1={Y_TOP}
                    x2={points[activeIndex].x}
                    y2={Y_BASELINE}
                    stroke="#fdba74"
                    strokeWidth="1.5"
                    strokeDasharray="4 4"
                  />
                  <rect
                    x={points[activeIndex].x - 18}
                    y={Y_TOP}
                    width="36"
                    height={Y_BASELINE - Y_TOP}
                    fill="#ea580c"
                    fillOpacity="0.03"
                    rx="6"
                  />

                  {/* Smooth Shaded Area */}
                  <path
                    d={areaPath}
                    fill="url(#dailyWaveGrad)"
                    className="transition-all duration-300"
                  />

                  {/* Smooth Stroke Line */}
                  <path
                    d={wavePath}
                    fill="none"
                    stroke="#ea580c"
                    strokeWidth="3.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />

                  {/* Data Points */}
                  {points.map((pt, idx) => {
                    const isCurrent = activeIndex === idx;
                    const isPeak = dailyData[idx].isPeak;

                    return (
                      <g
                        key={`pt-${idx}`}
                        className="cursor-pointer"
                        onMouseEnter={() => setHoveredIndex(idx)}
                        onMouseLeave={() => setHoveredIndex(null)}
                        onClick={() => setSelectedIndex(idx)}
                      >
                        {/* Larger invisible hitbox */}
                        <circle cx={pt.x} cy={pt.y} r="14" fill="transparent" />

                        {/* Ping animation on active / peak dot */}
                        {(isCurrent || isPeak) && (
                          <circle
                            cx={pt.x}
                            cy={pt.y}
                            r={isCurrent ? "11" : "8"}
                            fill="#f97316"
                            fillOpacity="0.25"
                            className={isCurrent ? "animate-ping" : ""}
                          />
                        )}

                        {/* Visible Data Dot */}
                        <circle
                          cx={pt.x}
                          cy={pt.y}
                          r={isCurrent ? "6.5" : isPeak ? "5.5" : "4"}
                          fill={isPeak ? "#ea580c" : isCurrent ? "#c2410c" : "#f97316"}
                          stroke="#ffffff"
                          strokeWidth={isCurrent ? "3" : "2"}
                          className="transition-all duration-200"
                        />
                      </g>
                    );
                  })}
                </svg>
              </div>

              {/* X-axis Timeline Buttons */}
              <div className="grid grid-cols-5 sm:grid-cols-15 gap-1 pt-3 text-[10px] sm:text-xs font-semibold px-2">
                {dailyData.map((d, idx) => {
                  const isCurrent = activeIndex === idx;
                  const isPeak = d.isPeak;

                  return (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => setSelectedIndex(idx)}
                      onMouseEnter={() => setHoveredIndex(idx)}
                      onMouseLeave={() => setHoveredIndex(null)}
                      className={`text-center py-1.5 px-0.5 rounded-lg transition-all duration-200 cursor-pointer ${
                        isCurrent
                          ? "bg-slate-900 text-white shadow-xs font-bold ring-2 ring-slate-900/10 scale-105"
                          : isPeak
                          ? "bg-orange-100 text-orange-900 font-bold border border-orange-200"
                          : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
                      }`}
                      title={`${d.fullDate}: ${d.formattedAmount}`}
                    >
                      <span className="block truncate">{d.date}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Dynamic Day Detail & Benchmarking Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-6 pt-6 border-t border-slate-100">
              {/* Card 1: Selected Date Outflow */}
              <div className="p-4 rounded-2xl bg-orange-50/70 border border-orange-200/80 flex items-center justify-between">
                <div>
                  <div className="text-xs font-semibold text-orange-800 flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-orange-500" />
                    <span>Recorded Outflow ({activeRecord.date})</span>
                  </div>
                  <div className="text-xl sm:text-2xl font-black text-orange-950 mt-1">
                    {activeRecord.formattedAmount}
                  </div>
                  <div className="text-[11px] text-orange-800/90 mt-0.5 truncate max-w-[200px]">
                    {activeRecord.note}
                  </div>
                </div>
                <div className="w-10 h-10 rounded-xl bg-orange-100 text-orange-700 flex items-center justify-center flex-shrink-0">
                  <ArrowUpRight className="w-5 h-5" />
                </div>
              </div>

              {/* Card 2: 30-Day Benchmark Comparison */}
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 flex items-center justify-between">
                <div>
                  <div className="text-xs font-semibold text-slate-700 flex items-center gap-1.5">
                    <Activity className="w-3.5 h-3.5 text-slate-500" />
                    <span>30-Day Daily Benchmark</span>
                  </div>
                  <div className="text-xl sm:text-2xl font-black text-slate-900 mt-1">
                    $137.10
                  </div>
                  <div className="text-[11px] text-slate-500 mt-0.5">
                    Average calculated daily outflow
                  </div>
                </div>
                <div className="w-10 h-10 rounded-xl bg-slate-100 text-slate-700 flex items-center justify-center flex-shrink-0">
                  <TrendingUp className="w-5 h-5" />
                </div>
              </div>

              {/* Card 3: Volatility & Variance */}
              <div className="p-4 rounded-2xl bg-amber-50/70 border border-amber-200/80 flex items-center justify-between">
                <div>
                  <div className="text-xs font-semibold text-amber-900 flex items-center gap-1.5">
                    <Zap className="w-3.5 h-3.5 text-amber-600" />
                    <span>Daily Activity Variance</span>
                  </div>
                  <div className="text-xl sm:text-2xl font-black text-amber-950 mt-1">
                    {isAboveBenchmark
                      ? `+${((activeRecord.amount / DAILY_BENCHMARK - 1) * 100).toFixed(0)}%`
                      : `-${((1 - activeRecord.amount / DAILY_BENCHMARK) * 100).toFixed(0)}%`}
                  </div>
                  <div className="text-[11px] text-amber-800/90 mt-0.5">
                    {activeRecord.isPeak
                      ? "Monthly maximum peak spike"
                      : isAboveBenchmark
                      ? "Above regular daily baseline"
                      : "Within controlled spending bounds"}
                  </div>
                </div>
                <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center flex-shrink-0">
                  <Flame className="w-5 h-5" />
                </div>
              </div>
            </div>

            {/* Explanatory Caption */}
            <div className="mt-6 pt-4 border-t border-slate-100 flex items-start gap-2.5 text-xs text-slate-500">
              <Info className="w-4 h-4 text-slate-400 flex-shrink-0 mt-0.5" />
              <span>
                Timeline charts visualize recorded historical amounts to highlight spending volatility. Saviora does not forecast future behavior, predict upcoming bills, or automatically execute financial transfers. Click or tap any date to inspect individual spending details.
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
