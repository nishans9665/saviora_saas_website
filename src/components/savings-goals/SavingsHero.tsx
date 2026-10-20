"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import {
  ArrowRight,
  CheckCircle2,
  Plus,
  Target,
  LayoutDashboard,
  TrendingUp,
  CreditCard,
  PieChart,
  BarChart2,
  Settings,
  Calendar,
  Sun,
  Moon,
  ChevronDown,
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import logoSaviora from "@/assets/logo/logo-saviora-web-tag.svg";

export function SavingsHero() {
  const handlePrimaryCtaClick = () => {
    if (typeof window !== "undefined" && (window as unknown as Record<string, unknown>).gtag) {
      const gtag = (window as unknown as Record<string, (action: string, eventName: string, params: Record<string, string>) => void>).gtag;
      gtag("event", "savings_goals_trial_click", {
        event_category: "conversion",
        event_label: "hero_cta",
      });
    }
  };

  return (
    <section className="relative pt-28 sm:pt-32 md:pt-36 pb-16 sm:pb-24 overflow-hidden bg-gradient-to-b from-purple-50/40 via-slate-50/50 to-white">
      {/* Ambient background glow */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[600px] bg-[radial-gradient(ellipse_75%_55%_at_50%_0%,rgba(147,51,234,0.08),transparent_70%)]" />
        <div className="absolute top-24 right-[-80px] w-96 h-96 bg-[#22c55e]/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute top-48 left-[-100px] w-96 h-96 bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />
      </div>

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-10 items-center">
          {/* Left Column: Heading, Copy & CTAs */}
          <div className="lg:col-span-6 xl:col-span-6 text-left flex flex-col items-start">
            {/* Eyebrow Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-purple-100/80 border border-purple-200/80 text-purple-700 text-xs font-semibold uppercase tracking-wider mb-6 shadow-xs">
              <Target className="w-3.5 h-3.5 text-purple-600 flex-shrink-0" />
              <span>SAVINGS GOALS</span>
            </div>

            {/* H1 Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-[52px] font-extrabold tracking-tight text-slate-900 leading-[1.14] mb-6">
              Set Your Savings Goals and Track Every{" "}
              <span className="text-[#22c55e] relative inline-block">
                Step Forward
              </span>
            </h1>

            {/* Description */}
            <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-xl mb-8">
              Turn your savings plans into clear, trackable goals with Saviora. Set a target amount, organize goals by category, record contributions, and see how far you&apos;ve progressed toward the things that matter to you.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 w-full sm:w-auto mb-8">
              <Button
                asChild
                size="lg"
                className="bg-[#22c55e] hover:bg-[#16a34a] text-white font-semibold rounded-full px-7 py-3.5 shadow-md shadow-[#22c55e]/25 hover:shadow-lg hover:shadow-[#22c55e]/35 hover:-translate-y-0.5 transition-all duration-300 justify-center cursor-pointer"
                onClick={handlePrimaryCtaClick}
              >
                <Link
                  href="https://cloud.saviora.app/register"
                  target="_blank"
                  className="flex items-center justify-center"
                >
                  <span>Start Your 90-Day Pro Trial</span>
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Link>
              </Button>

              <Button
                asChild
                size="lg"
                variant="outline"
                className="bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 hover:border-slate-300 font-semibold rounded-full px-7 py-3.5 shadow-xs transition-all duration-300 justify-center cursor-pointer"
              >
                <Link href="/features">
                  Explore All Features
                </Link>
              </Button>
            </div>

            {/* Verified Trust Indicators */}
            <div className="flex flex-wrap items-center gap-x-6 gap-y-2.5 text-xs sm:text-sm font-medium text-slate-600">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#22c55e] flex-shrink-0" />
                <span>Simple and easy to use</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#22c55e] flex-shrink-0" />
                <span>Works across all your devices</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#22c55e] flex-shrink-0" />
                <span>No credit card required</span>
              </div>
            </div>
          </div>

          {/* Right Column: Accurate Savings Goals Dashboard UI Mockup */}
          <div className="lg:col-span-6 xl:col-span-6 w-full">
            <div className="relative mx-auto max-w-xl lg:max-w-none">
              {/* Subtle ambient gradient aura under card */}
              <div className="absolute -inset-1.5 bg-gradient-to-r from-purple-500/15 via-indigo-500/10 to-[#22c55e]/15 rounded-3xl blur-xl opacity-75 pointer-events-none" />

              {/* Main Card Frame */}
              <div className="relative rounded-2xl sm:rounded-3xl border border-slate-200/90 bg-white shadow-xl shadow-slate-900/5 overflow-hidden flex flex-col sm:flex-row text-left">
                {/* Left Mini Sidebar */}
                <div className="hidden sm:flex flex-col w-44 bg-slate-50/80 border-r border-slate-100 p-3.5 justify-between flex-shrink-0">
                  <div>
                    {/* Brand Header */}
                    <div className="flex items-center justify-between pb-3 mb-2.5 border-b border-slate-200/60">
                      <Image
                        src={logoSaviora}
                        alt="Saviora"
                        className="h-6 w-auto object-contain"
                      />
                      <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
                    </div>

                    {/* Nav List */}
                    <nav className="space-y-1">
                      <div className="flex items-center gap-2 px-2.5 py-1.5 rounded-lg text-xs font-medium text-slate-500">
                        <LayoutDashboard className="w-3.5 h-3.5 text-slate-400" />
                        <span>Dashboard</span>
                      </div>
                      <div className="flex items-center gap-2 px-2.5 py-1.5 rounded-lg text-xs font-medium text-slate-500">
                        <TrendingUp className="w-3.5 h-3.5 text-slate-400" />
                        <span>Income</span>
                      </div>
                      <div className="flex items-center gap-2 px-2.5 py-1.5 rounded-lg text-xs font-medium text-slate-500">
                        <CreditCard className="w-3.5 h-3.5 text-slate-400" />
                        <span>Expenses</span>
                      </div>
                      <div className="flex items-center gap-2 px-2.5 py-1.5 rounded-lg text-xs font-medium text-slate-500">
                        <BarChart2 className="w-3.5 h-3.5 text-slate-400" />
                        <span>Analytics</span>
                      </div>
                      <div className="flex items-center gap-2 px-2.5 py-1.5 rounded-lg text-xs font-medium text-slate-500">
                        <PieChart className="w-3.5 h-3.5 text-slate-400" />
                        <span>Budgets</span>
                      </div>
                      {/* Active Savings Goals Link */}
                      <div className="flex items-center gap-2 px-2.5 py-1.5 rounded-lg text-xs font-bold text-purple-700 bg-purple-50 border border-purple-200/70">
                        <Target className="w-3.5 h-3.5 text-purple-600" />
                        <span>Savings Goals</span>
                      </div>
                      <div className="flex items-center gap-2 px-2.5 py-1.5 rounded-lg text-xs font-medium text-slate-500">
                        <Settings className="w-3.5 h-3.5 text-slate-400" />
                        <span>Settings</span>
                      </div>
                    </nav>
                  </div>

                  {/* Sidebar Bottom: Plan Badge & Status */}
                  <div className="pt-3 border-t border-slate-200/60 space-y-2">
                    <div className="bg-slate-100/70 p-2 rounded-lg">
                      <div className="flex items-center justify-between text-[9px] uppercase font-bold text-slate-500">
                        <span>Current Plan</span>
                        <span className="bg-emerald-100 text-emerald-700 px-1 py-0.5 rounded text-[8px]">Trial</span>
                      </div>
                      <div className="text-[11px] font-bold text-slate-800 mt-0.5">76 Days Remaining</div>
                      <div className="w-full bg-[#22c55e] text-white text-[10px] font-semibold py-1 rounded text-center mt-1.5">
                        Upgrade Now
                      </div>
                    </div>
                    <div className="flex items-center justify-between text-[10px] text-slate-500 px-1 pt-1">
                      <span className="flex items-center gap-1 font-medium"><Sun className="w-3 h-3 text-amber-500" /> Light</span>
                      <span className="flex items-center gap-1 text-slate-400"><Moon className="w-3 h-3" /> Dark</span>
                    </div>
                  </div>
                </div>

                {/* Main Workspace Area */}
                <div className="flex-1 p-4 sm:p-5 flex flex-col justify-between bg-white min-w-0">
                  {/* Top Bar */}
                  <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-100 gap-2.5">
                    <div className="min-w-0 flex-1">
                      <div className="text-sm sm:text-base font-bold text-slate-900 leading-tight truncate">
                        Savings Goals
                      </div>
                      <p className="text-[10px] sm:text-[11px] text-slate-400 truncate">
                        Plan, track, and achieve your financial targets
                      </p>
                    </div>
                    <button
                      type="button"
                      className="inline-flex items-center gap-1.5 bg-[#4f46e5] hover:bg-[#4338ca] text-white text-xs font-semibold px-3 py-1.5 rounded-lg shadow-sm shadow-indigo-500/20 transition-all cursor-default flex-shrink-0 whitespace-nowrap"
                      aria-label="Create Goal"
                    >
                      <Plus className="w-3.5 h-3.5 stroke-[2.5] flex-shrink-0" />
                      <span>Create Goal</span>
                    </button>
                  </div>

                  {/* 4 Metric KPI Cards from real Saviora application */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-3.5">
                    <div className="bg-slate-50/80 border border-slate-100 rounded-xl p-2.5">
                      <span className="text-[10px] font-medium text-slate-500 block leading-tight">Total Saved</span>
                      <span className="text-xs sm:text-sm font-extrabold text-slate-900 mt-1 block truncate">
                        $1,816,190.25
                      </span>
                    </div>

                    <div className="bg-slate-50/80 border border-slate-100 rounded-xl p-2.5">
                      <span className="text-[10px] font-medium text-slate-500 block leading-tight">Overall Target</span>
                      <span className="text-xs sm:text-sm font-extrabold text-slate-900 mt-1 block truncate">
                        $19,350,000.00
                      </span>
                    </div>

                    <div className="bg-slate-50/80 border border-slate-100 rounded-xl p-2.5">
                      <span className="text-[10px] font-medium text-slate-500 block leading-tight">Active Goals</span>
                      <span className="text-xs sm:text-sm font-extrabold text-slate-900 mt-1 block">
                        3
                      </span>
                    </div>

                    <div className="bg-slate-50/80 border border-slate-100 rounded-xl p-2.5">
                      <span className="text-[10px] font-medium text-slate-500 block leading-tight">Completed Goals</span>
                      <span className="text-xs sm:text-sm font-extrabold text-slate-900 mt-1 block">
                        0
                      </span>
                    </div>
                  </div>

                  {/* Filter Tabs */}
                  <div className="flex items-center justify-between mb-2.5">
                    <span className="text-xs font-bold text-slate-800">Active Goals</span>
                    <div className="inline-flex items-center p-0.5 rounded-lg bg-slate-100 text-[10px] font-semibold text-slate-600">
                      <span className="px-2 py-0.5 bg-white rounded-md text-slate-900 shadow-2xs font-bold">Active</span>
                      <span className="px-2 py-0.5 text-slate-500">Paused</span>
                      <span className="px-2 py-0.5 text-slate-500">Completed</span>
                      <span className="px-2 py-0.5 text-slate-500">All</span>
                    </div>
                  </div>

                  {/* Featured Goal Card: Car buy */}
                  <div className="bg-white border border-slate-200/90 rounded-xl p-3.5 shadow-xs mb-2">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <div className="w-7 h-7 rounded-lg bg-purple-100 text-purple-600 flex items-center justify-center flex-shrink-0">
                          <Target className="w-4 h-4" />
                        </div>
                        <div>
                          <div className="flex items-center gap-1.5">
                            <span className="text-xs font-bold text-slate-900">Car buy</span>
                            <span className="text-purple-600 text-[11px] font-bold">↗</span>
                          </div>
                          <div className="flex items-center gap-1 mt-0.5">
                            <span className="text-[9px] bg-slate-100 text-slate-600 px-1.5 py-0.2 rounded font-medium">Car Purchase</span>
                            <span className="text-[9px] bg-amber-50 text-amber-700 border border-amber-200/60 px-1 py-0.2 rounded font-semibold uppercase">MEDIUM</span>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-1 text-slate-400">
                        <span className="text-xs text-purple-600 font-bold">$</span>
                        <span className="text-[10px] bg-purple-50 text-purple-700 p-1 rounded">⟲</span>
                      </div>
                    </div>

                    {/* Progress Bar & Amounts */}
                    <div className="mt-2.5">
                      <div className="flex items-baseline justify-between text-xs mb-1">
                        <span className="font-bold text-slate-900">
                          $389,874.91 <span className="font-normal text-slate-400 text-[11px]">/ $1,000,000.00</span>
                        </span>
                        <span className="font-extrabold text-purple-600 text-xs">39.0%</span>
                      </div>

                      <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
                        <div
                          className="bg-gradient-to-r from-purple-600 to-indigo-600 h-2 rounded-full transition-all duration-700"
                          style={{ width: "39%" }}
                        />
                      </div>

                      <div className="flex items-center justify-between text-[10px] text-slate-400 mt-2">
                        <span className="flex items-center gap-1">
                          <Calendar className="w-3 h-3 text-slate-400" />
                          4/6/2027
                        </span>
                        <span className="bg-purple-50 text-purple-700 font-semibold px-2 py-0.5 rounded-md border border-purple-100">
                          Target: $10,000.00/mo
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Footer note: visual product demonstration */}
                  <div className="text-[10px] text-slate-400 text-center pt-1 border-t border-slate-50">
                    Product preview: representative dashboard interface demonstration
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
