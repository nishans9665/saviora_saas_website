"use client";

import React from "react";
import { Copy, Check, Info } from "lucide-react";
import { cn } from "@/lib/utils";

interface SecondaryMetric {
  label: string;
  value: string;
  highlight?: boolean;
  subtext?: string;
}

interface ResultCardProps {
  title: string;
  subtitle?: string;
  primaryValue: string;
  primaryLabel?: string;
  secondaryMetrics?: SecondaryMetric[];
  badge?: string;
  footnote?: string;
  className?: string;
}

export function ResultCard({
  title,
  subtitle,
  primaryValue,
  primaryLabel = "Estimated Net",
  secondaryMetrics,
  badge,
  footnote,
  className,
}: ResultCardProps) {
  const [copied, setCopied] = React.useState(false);

  const handleCopy = () => {
    if (typeof navigator !== "undefined" && navigator.clipboard) {
      navigator.clipboard.writeText(primaryValue);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div
      className={cn(
        "rounded-2xl border border-emerald-200/90 bg-gradient-to-br from-emerald-50/70 via-white to-slate-50 p-6 sm:p-7 shadow-sm relative overflow-hidden",
        className
      )}
    >
      {/* Top Header */}
      <div className="flex items-start justify-between gap-4 mb-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <h3 className="text-xs sm:text-sm font-bold uppercase tracking-wider text-emerald-800">
              {title}
            </h3>
            {badge && (
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-200">
                {badge}
              </span>
            )}
          </div>
          {subtitle && (
            <p className="text-xs text-slate-500 leading-snug">{subtitle}</p>
          )}
        </div>

        <button
          type="button"
          onClick={handleCopy}
          aria-label="Copy result"
          className="p-2 rounded-lg bg-white border border-slate-200 text-slate-600 hover:text-emerald-700 hover:border-emerald-300 hover:bg-emerald-50 transition-all cursor-pointer shadow-2xs"
          title="Copy to clipboard"
        >
          {copied ? (
            <Check className="w-4 h-4 text-emerald-600" />
          ) : (
            <Copy className="w-4 h-4" />
          )}
        </button>
      </div>

      {/* Main Big Number */}
      <div className="mb-6 p-4 rounded-xl bg-white border border-emerald-100/80 shadow-2xs">
        <span className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">
          {primaryLabel}
        </span>
        <div className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#1E104E] tracking-tight">
          {primaryValue}
        </div>
      </div>

      {/* Secondary Metrics Grid */}
      {secondaryMetrics && secondaryMetrics.length > 0 && (
        <div className="grid grid-cols-2 gap-3 mb-4">
          {secondaryMetrics.map((metric, idx) => (
            <div
              key={idx}
              className="p-3 rounded-xl bg-white/90 border border-slate-100 shadow-2xs"
            >
              <div className="text-[11px] font-medium text-slate-500 truncate mb-0.5">
                {metric.label}
              </div>
              <div
                className={cn(
                  "text-sm sm:text-base font-bold truncate",
                  metric.highlight ? "text-emerald-600" : "text-slate-800"
                )}
              >
                {metric.value}
              </div>
              {metric.subtext && (
                <div className="text-[10px] text-slate-400 mt-0.5">
                  {metric.subtext}
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Footnote */}
      {footnote && (
        <div className="flex items-start gap-1.5 text-[11px] text-slate-500 mt-4 pt-3 border-t border-slate-200/60 leading-relaxed">
          <Info className="w-3.5 h-3.5 text-slate-400 flex-shrink-0 mt-0.5" />
          <span>{footnote}</span>
        </div>
      )}
    </div>
  );
}
