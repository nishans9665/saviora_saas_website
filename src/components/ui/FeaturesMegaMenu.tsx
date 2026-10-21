"use client";

import * as React from "react";
import Link from "next/link";
import {
  Zap,
  Globe,
  Clock,
  TrendingUp,
  Receipt,
  PieChart,
  Target,
  BarChart3,
  ArrowRight,
  RefreshCw,
  LineChart,
  Landmark,
  Sparkles,
} from "lucide-react";
import { cn } from "@/lib/utils";

export interface FeatureItem {
  name: string;
  description: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  badge?: "Popular" | "New";
  iconBg: string;
}

export interface UpcomingFeatureItem {
  name: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  badge: "Coming Soon";
  iconBg: string;
}

export const CORE_FEATURES: FeatureItem[] = [
  {
    name: "Income Tracker",
    description: "Track earnings, sources, and monthly cash flow.",
    href: "/income-tracker",
    icon: TrendingUp,
    badge: "Popular",
    iconBg: "bg-emerald-50 text-emerald-600 dark:bg-emerald-950/60 dark:text-emerald-400 border-emerald-100/80 dark:border-emerald-900/40",
  },
  {
    name: "Expense Tracker",
    description: "Record daily spending, organize categories, and track habits.",
    href: "/expense-tracker",
    icon: Receipt,
    badge: "Popular",
    iconBg: "bg-orange-50 text-orange-600 dark:bg-orange-950/60 dark:text-orange-400 border-orange-100/80 dark:border-orange-900/40",
  },
  {
    name: "Monthly Budget Planning",
    description: "Category spending limits, remaining balances, and strict controls.",
    href: "/monthly-budget-planning",
    icon: PieChart,
    badge: "Popular",
    iconBg: "bg-teal-50 text-teal-600 dark:bg-teal-950/60 dark:text-teal-400 border-teal-100/80 dark:border-teal-900/40",
  },
  {
    name: "Savings Goal Tracker",
    description: "Define targets, record contributions, and track progress.",
    href: "/savings-goals",
    icon: Target,
    badge: "Popular",
    iconBg: "bg-purple-50 text-purple-600 dark:bg-purple-950/60 dark:text-purple-400 border-purple-100/80 dark:border-purple-900/40",
  },
  {
    name: "Financial Analytics & Reports",
    description: "Visual expense reports, category shares, and cash flow trends.",
    href: "/financial-analytics",
    icon: BarChart3,
    iconBg: "bg-amber-50 text-amber-600 dark:bg-amber-950/60 dark:text-amber-400 border-amber-100/80 dark:border-amber-900/40",
  },
];

export const FEATURED_MORE_FEATURE: FeatureItem = {
  name: "Multi-Currency Management",
  description: "Manage finances in your preferred currency with flexible regional settings.",
  href: "/multi-currency-management",
  icon: Globe,
  badge: "New",
  iconBg: "bg-sky-100 text-sky-600 dark:bg-sky-950/70 dark:text-sky-400 border-sky-200/70 dark:border-sky-800/50",
};

export const COMING_SOON_FEATURES: UpcomingFeatureItem[] = [
  {
    name: "Recurring Transactions",
    description: "Automate regular income and expense entries.",
    icon: RefreshCw,
    badge: "Coming Soon",
    iconBg: "bg-rose-50 text-rose-500 dark:bg-rose-950/50 dark:text-rose-400 border-rose-100/80 dark:border-rose-900/40",
  },
  {
    name: "Investment Tracking",
    description: "Track your investments and monitor performance.",
    icon: LineChart,
    badge: "Coming Soon",
    iconBg: "bg-blue-50 text-blue-500 dark:bg-blue-950/50 dark:text-blue-400 border-blue-100/80 dark:border-blue-900/40",
  },
  {
    name: "Debt & Loan Management",
    description: "Manage loans, repayments, and outstanding balances.",
    icon: Landmark,
    badge: "Coming Soon",
    iconBg: "bg-indigo-50 text-indigo-500 dark:bg-indigo-950/50 dark:text-indigo-400 border-indigo-100/80 dark:border-indigo-900/40",
  },
  {
    name: "Financial Insights (AI)",
    description: "Get smart insights and personalized recommendations.",
    icon: Sparkles,
    badge: "Coming Soon",
    iconBg: "bg-amber-50 text-amber-500 dark:bg-amber-950/50 dark:text-amber-400 border-amber-100/80 dark:border-amber-900/40",
  },
];

interface FeaturesMegaMenuProps {
  isOpen: boolean;
  onClose: () => void;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
}

export function FeaturesMegaMenu({
  isOpen,
  onClose,
  onMouseEnter,
  onMouseLeave,
}: FeaturesMegaMenuProps) {
  return (
    <div
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      className={cn(
        "absolute left-1/2 -translate-x-1/2 top-full pt-3 w-[940px] max-w-[calc(100vw-32px)] z-50 transition-all duration-200 origin-top",
        isOpen
          ? "opacity-100 visible translate-y-0 pointer-events-auto"
          : "opacity-0 invisible -translate-y-2 pointer-events-none"
      )}
      role="region"
      aria-label="Features Mega Menu"
    >
      <div className="rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-2xl shadow-slate-900/10 dark:shadow-slate-950/50 p-6 sm:p-7 overflow-hidden backdrop-blur-xl">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 items-start">
          
          {/* ==================================================== */}
          {/* LEFT COLUMN: Core Features */}
          {/* ==================================================== */}
          <div className="md:border-r md:border-slate-100 md:dark:border-slate-800 md:pr-6 lg:pr-8 flex flex-col justify-between">
            
            {/* Column Header */}
            <div className="mb-4">
              <div className="flex items-center gap-2 mb-1">
                <Zap className="w-4 h-4 text-primary-600 dark:text-primary-400 flex-shrink-0 fill-primary-600/20" />
                <h3 className="font-bold text-slate-900 dark:text-white text-sm tracking-tight">
                  Core Features
                </h3>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Everything you need to track, save and grow your money.
              </p>
            </div>

            {/* List of 5 Core Features */}
            <div className="space-y-1">
              {CORE_FEATURES.map((item) => {
                const Icon = item.icon;
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    onClick={onClose}
                    className="flex items-center justify-between p-2.5 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800/60 transition-all duration-200 group/item focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500"
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      {/* Icon Tile */}
                      <div
                        className={cn(
                          "w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 border transition-transform duration-200 group-hover/item:scale-105",
                          item.iconBg
                        )}
                      >
                        <Icon className="w-5 h-5" />
                      </div>

                      {/* Text */}
                      <div className="min-w-0">
                        <div className="flex items-center gap-2 mb-0.5">
                          <span className="text-sm font-semibold text-slate-900 dark:text-white group-hover/item:text-primary-600 dark:group-hover/item:text-primary-400 transition-colors truncate">
                            {item.name}
                          </span>
                          {item.badge && (
                            <span className="inline-flex items-center text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 dark:bg-emerald-950/80 dark:text-emerald-300">
                              {item.badge}
                            </span>
                          )}
                        </div>
                        <p className="text-xs text-slate-500 dark:text-slate-400 leading-snug line-clamp-1">
                          {item.description}
                        </p>
                      </div>
                    </div>

                    {/* Subtle Right Arrow */}
                    <ArrowRight className="w-4 h-4 text-slate-300 dark:text-slate-600 group-hover/item:text-primary-600 dark:group-hover/item:text-primary-400 group-hover/item:translate-x-1 transition-all duration-200 flex-shrink-0 ml-2" />
                  </Link>
                );
              })}
            </div>

          </div>

          {/* ==================================================== */}
          {/* RIGHT COLUMN: More Features */}
          {/* ==================================================== */}
          <div className="flex flex-col justify-between h-full">
            
            <div>
              {/* Column Header */}
              <div className="mb-3">
                <div className="flex items-center gap-2 mb-1">
                  <Globe className="w-4 h-4 text-primary-600 dark:text-primary-400 flex-shrink-0" />
                  <h3 className="font-bold text-slate-900 dark:text-white text-sm tracking-tight">
                    More Features
                  </h3>
                </div>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Additional tools to make your financial journey easier.
                </p>
              </div>

              {/* Featured Available Feature: Multi-Currency Management */}
              <Link
                href={FEATURED_MORE_FEATURE.href}
                onClick={onClose}
                className="flex items-center justify-between p-3.5 rounded-2xl bg-emerald-50/70 hover:bg-emerald-50 dark:bg-emerald-950/25 dark:hover:bg-emerald-950/40 border border-emerald-200/90 dark:border-emerald-800/60 transition-all duration-200 group/featured shadow-2xs hover:shadow-xs mb-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div
                    className={cn(
                      "w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 border transition-transform duration-200 group-hover/featured:scale-105",
                      FEATURED_MORE_FEATURE.iconBg
                    )}
                  >
                    <Globe className="w-5 h-5" />
                  </div>
                  
                  <div className="min-w-0">
                    <div className="flex items-center gap-2 mb-0.5">
                      <span className="text-sm font-bold text-slate-900 dark:text-white group-hover/featured:text-primary-700 dark:group-hover/featured:text-emerald-300 transition-colors truncate">
                        {FEATURED_MORE_FEATURE.name}
                      </span>
                      {FEATURED_MORE_FEATURE.badge && (
                        <span className="inline-flex items-center text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 dark:bg-emerald-950/80 dark:text-emerald-300">
                          {FEATURED_MORE_FEATURE.badge}
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-slate-600 dark:text-slate-300 leading-snug line-clamp-2">
                      {FEATURED_MORE_FEATURE.description}
                    </p>
                  </div>
                </div>

                <ArrowRight className="w-4 h-4 text-primary-600 dark:text-primary-400 group-hover/featured:translate-x-1 transition-all duration-200 flex-shrink-0 ml-2" />
              </Link>
            </div>

            {/* Coming Soon Section */}
            <div>
              <div className="pt-3 border-t border-slate-100 dark:border-slate-800/80 mb-2.5">
                <div className="flex items-center gap-1.5 mb-0.5">
                  <Clock className="w-3.5 h-3.5 text-slate-400 dark:text-slate-500" />
                  <h4 className="font-bold text-slate-900 dark:text-white text-xs tracking-tight">
                    Coming Soon
                  </h4>
                </div>
                <p className="text-[11px] text-slate-400 dark:text-slate-500">
                  Exciting features in development.
                </p>
              </div>

              {/* 4 Compact Upcoming Features */}
              <div className="space-y-1">
                {COMING_SOON_FEATURES.map((item) => {
                  const Icon = item.icon;
                  return (
                    <div
                      key={item.name}
                      className="flex items-center justify-between p-2 rounded-xl text-slate-400 dark:text-slate-500 cursor-default select-none transition-colors"
                    >
                      <div className="flex items-center gap-2.5 min-w-0">
                        <div
                          className={cn(
                            "w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0 border",
                            item.iconBg
                          )}
                        >
                          <Icon className="w-3.5 h-3.5" />
                        </div>
                        <div className="min-w-0">
                          <span className="text-xs font-semibold text-slate-800 dark:text-slate-200 block truncate">
                            {item.name}
                          </span>
                          <span className="text-[11px] text-slate-400 dark:text-slate-500 block truncate">
                            {item.description}
                          </span>
                        </div>
                      </div>

                      <span className="inline-flex items-center text-[10px] font-medium px-2 py-0.5 rounded-full bg-slate-100 text-slate-500 dark:bg-slate-800 dark:text-slate-400 flex-shrink-0 ml-2">
                        {item.badge}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

          </div>

        </div>
      </div>
    </div>
  );
}
