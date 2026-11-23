"use client";

import * as React from "react";
import Link from "next/link";
import {
  Wallet,
  Landmark,
  TrendingUp,
  Sparkles,
  ArrowRight,
} from "lucide-react";
import { cn } from "@/lib/utils";

export interface FreeToolsCategoryItem {
  id: string;
  title: string;
  subtitle: string;
  hubHref: string;
  badge: string;
  icon: React.ComponentType<{ className?: string }>;
  headerBg: string;
  headerBorder: string;
  iconColor: string;
}

export const FREE_TOOLS_CATEGORIES: FreeToolsCategoryItem[] = [
  {
    id: "salary-tax",
    title: "Salary & Tax Calculators",
    subtitle: "Gross-to-net pay, income tax, EPF & payroll deductions.",
    hubHref: "/free-tools/salary-tax-calculators",
    badge: "8 Tools",
    icon: Wallet,
    headerBg: "bg-emerald-50 dark:bg-emerald-950/60",
    headerBorder: "border-emerald-200/80 dark:border-emerald-800/60",
    iconColor: "text-emerald-600 dark:text-emerald-400",
  },
  {
    id: "loan-financial",
    title: "Loan & Financial Calculators",
    subtitle: "Loan EMIs, mortgages, auto finance, interest math & debt payoff.",
    hubHref: "/free-tools/loan-financial-tools",
    badge: "9 Tools",
    icon: Landmark,
    headerBg: "bg-blue-50 dark:bg-blue-950/60",
    headerBorder: "border-blue-200/80 dark:border-blue-800/60",
    iconColor: "text-blue-600 dark:text-blue-400",
  },
  {
    id: "investment-savings",
    title: "Investment & Savings Tools",
    subtitle: "SIP forecasts, savings goals, retirement & compound interest.",
    hubHref: "/free-tools/investment-savings-tools",
    badge: "10 Tools",
    icon: TrendingUp,
    headerBg: "bg-amber-50 dark:bg-amber-950/60",
    headerBorder: "border-amber-200/80 dark:border-amber-800/60",
    iconColor: "text-amber-600 dark:text-amber-400",
  },
];

interface FreeToolsMegaMenuProps {
  isOpen: boolean;
  onClose: () => void;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
}

export function FreeToolsMegaMenu({
  isOpen,
  onClose,
  onMouseEnter,
  onMouseLeave,
}: FreeToolsMegaMenuProps) {
  return (
    <div
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      className={cn(
        "absolute left-1/2 -translate-x-1/2 top-full pt-3 w-[390px] sm:w-[420px] max-w-[calc(100vw-32px)] z-50 transition-all duration-200 origin-top",
        isOpen
          ? "opacity-100 visible translate-y-0 pointer-events-auto"
          : "opacity-0 invisible -translate-y-2 pointer-events-none"
      )}
      role="region"
      aria-label="Free Tools Navigation Menu"
    >
      <div className="rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-2xl shadow-slate-900/10 dark:shadow-slate-950/50 p-3.5 sm:p-4 overflow-hidden backdrop-blur-xl">
        
        {/* Header Label */}
        <div className="px-2 pt-1 pb-2 flex items-center justify-between">
          <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
            Free Financial Tools
          </span>
          <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 dark:bg-emerald-950/80 dark:text-emerald-300">
            27 Tools Available
          </span>
        </div>

        {/* Single Column Main Category Hub Links */}
        <div className="space-y-1.5">
          {FREE_TOOLS_CATEGORIES.map((category) => {
            const Icon = category.icon;

            return (
              <Link
                key={category.id}
                href={category.hubHref}
                onClick={onClose}
                className="flex items-center justify-between p-2.5 sm:p-3 rounded-2xl hover:bg-slate-50 dark:hover:bg-slate-800/60 transition-all duration-200 group/item focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div
                    className={cn(
                      "w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 border transition-transform duration-200 group-hover/item:scale-105",
                      category.headerBg,
                      category.headerBorder,
                      category.iconColor
                    )}
                  >
                    <Icon className="w-5 h-5" />
                  </div>

                  <div className="min-w-0">
                    <div className="flex items-center gap-2 mb-0.5">
                      <span className="text-sm font-bold text-slate-900 dark:text-white group-hover/item:text-primary-600 dark:group-hover/item:text-primary-400 transition-colors truncate">
                        {category.title}
                      </span>
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400">
                        {category.badge}
                      </span>
                    </div>
                    <p className="text-xs text-slate-500 dark:text-slate-400 leading-snug line-clamp-1">
                      {category.subtitle}
                    </p>
                  </div>
                </div>

                <ArrowRight className="w-4 h-4 text-slate-300 dark:text-slate-600 group-hover/item:text-primary-600 dark:group-hover/item:text-primary-400 group-hover/item:translate-x-1 transition-all duration-200 flex-shrink-0 ml-2" />
              </Link>
            );
          })}
        </div>

        {/* Directory All Tools Featured Footer */}
        <div className="mt-2.5 pt-2.5 border-t border-slate-100 dark:border-slate-800/80">
          <Link
            href="/free-tools"
            onClick={onClose}
            className="flex items-center justify-between p-2.5 rounded-2xl bg-emerald-50/70 hover:bg-emerald-50 dark:bg-emerald-950/25 dark:hover:bg-emerald-950/40 border border-emerald-200/90 dark:border-emerald-800/60 transition-all duration-200 group/footer shadow-2xs hover:shadow-xs focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500"
          >
            <div className="flex items-center gap-3 min-w-0">
              <div className="w-9 h-9 rounded-xl bg-emerald-100/90 dark:bg-emerald-900/60 flex items-center justify-center text-emerald-700 dark:text-emerald-300 flex-shrink-0 border border-emerald-200/60 dark:border-emerald-800/50 group-hover/footer:scale-105 transition-transform duration-200">
                <Sparkles className="w-4 h-4" />
              </div>
              <div className="min-w-0">
                <div className="flex items-center gap-1.5 mb-0.5">
                  <span className="text-xs font-bold text-slate-900 dark:text-white group-hover/footer:text-primary-700 dark:group-hover/footer:text-emerald-300 transition-colors truncate">
                    Browse All 27 Free Calculators
                  </span>
                  <span className="text-[10px] font-bold px-1.5 py-0.2 rounded-full bg-emerald-200/80 text-emerald-900 dark:bg-emerald-900 dark:text-emerald-200">
                    Directory
                  </span>
                </div>
                <p className="text-[11px] text-slate-500 dark:text-slate-400 truncate">
                  Explore, search & compare all tools in one directory
                </p>
              </div>
            </div>

            <ArrowRight className="w-4 h-4 text-emerald-600 dark:text-emerald-400 group-hover/footer:translate-x-1 transition-all duration-200 flex-shrink-0 ml-2" />
          </Link>
        </div>

      </div>
    </div>
  );
}
